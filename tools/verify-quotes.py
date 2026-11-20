#!/usr/bin/env python3
"""Check draft quotations against independent printed sources.

Usage: python3 tools/verify-quotes.py docs/drafts/lines-061-151.json CACHE_DIR OUT.json [day ...]

For each draft line it looks for the exact words in:
  - Project Gutenberg texts (via the pglaf.org mirror, catalog CSV),
  - scanned books on archive.org (OCR text of each scan; one source per edition),
  - Wikisource pages found by full-text search.
Matching ignores case and punctuation (so it checks words and word order);
OCR slips are allowed up to a similarity of 0.9 and reported as "near".
The source's own wording is saved as a snippet so punctuation can be read by eye.
"""
import csv, difflib, html, json, os, re, sys, time, hashlib, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor

UA = "HalfALineQuoteCheck/1.0 (literature game fact-check)"
data_path, CACHE, out_path = sys.argv[1], sys.argv[2], sys.argv[3]
only = set(int(d) for d in sys.argv[4:] if d.isdigit())
os.makedirs(CACHE, exist_ok=True)

def fetch(url, binary=False, timeout=60):
    key = os.path.join(CACHE, hashlib.sha1(url.encode()).hexdigest())
    if os.path.exists(key):
        b = open(key, "rb").read()
    else:
        b = b""
        for attempt in range(3):
            try:
                req = urllib.request.Request(url, headers={"User-Agent": UA})
                with urllib.request.urlopen(req, timeout=timeout) as r:
                    b = r.read()
                break
            except Exception as e:
                if getattr(e, "code", None) in (401, 403, 404):
                    break
                time.sleep(2 + attempt * 3)
        open(key, "wb").write(b)
    return b if binary else b.decode("utf-8", "replace")

WORD = re.compile(r"[A-Za-zÀ-ÖØ-öø-ÿſæœÆŒ]+")
def norm_word(w):
    w = w.lower().replace("ſ", "s").replace("æ", "ae").replace("œ", "oe")
    return w
def tokens(raw):
    raw = re.sub(r"-\s*\n\s*", "", raw)  # join words hyphenated across lines
    return raw, [(norm_word(m.group()), m.start(), m.end()) for m in WORD.finditer(raw)]

def line_text(l):
    return " ".join(p[0] for p in l["parts"]).replace(" / ", " ").replace("/ ", "")

def best_match(raw, want):
    raw, toks = tokens(raw)
    words = [t[0] for t in toks]
    target = [w for w, _, _ in tokens(want)[1]]
    if not target or not words: return 0, ""
    n = len(target)
    # exact
    joined = " " + " ".join(words) + " "
    tj = " " + " ".join(target) + " "
    pos = joined.find(tj)
    if pos >= 0:
        idx = joined[:pos].count(" ")
        s, e = toks[idx][1], toks[min(idx + n - 1, len(toks) - 1)][2]
        return 1.0, raw[max(0, s - 0):e]
    # fuzzy around anchors (the two longest words)
    anchors = sorted(set(target), key=len, reverse=True)[:3]
    best, bi = 0, None
    for a in anchors:
        ai = target.index(a)
        for i, w in enumerate(words):
            if w == a:
                st = max(0, i - ai - 3)
                cand = words[st:st + n + 6]
                sm = difflib.SequenceMatcher(None, target, cand, autojunk=False)
                blocks = [b for b in sm.get_matching_blocks() if b.size]
                if not blocks: continue
                r = sum(b.size for b in blocks) / n
                if r > best:
                    best = r
                    first, last = blocks[0].b + st, blocks[-1].b + blocks[-1].size - 1 + st
                    bi = (first, last)
    if bi:
        return round(best, 3), raw[toks[bi[0]][1]:toks[bi[1]][2]]
    return 0, ""

# ---- Gutenberg catalog
CAT = None
def gutenberg_ids(title, creator):
    global CAT
    if CAT is None:
        txt = fetch("https://gutenberg.pglaf.org/cache/epub/feeds/pg_catalog.csv")
        CAT = [r for r in csv.reader(txt.splitlines(keepends=True)) if len(r) > 5]
        # csv with embedded newlines: reparse properly
        import io
        CAT = [r for r in csv.reader(io.StringIO(txt)) if len(r) > 5]
    tw = [w for w in re.findall(r"[a-z]+", title.lower()) if w not in ("the", "a", "of", "and", "poems")]
    out = []
    for r in CAT:
        if r[1] != "Text" or r[4] != "en": continue
        t, a = r[3].lower(), r[5].lower()
        if creator.lower() in a and all(w in t for w in tw):
            out.append(r[0])
    return out[:4]

def gutenberg_sources(title, creator):
    res = []
    for gid in gutenberg_ids(title, creator):
        url = f"https://gutenberg.pglaf.org/cache/epub/{gid}/pg{gid}.txt"
        res.append(("Project Gutenberg #" + gid, f"https://www.gutenberg.org/ebooks/{gid}", url, "gutenberg"))
    return res

def archive_sources(title, creator, rows=80, q=None):
    q = q or f'title:({title}) AND creator:({creator}) AND mediatype:texts'
    url = "https://archive.org/advancedsearch.php?" + urllib.parse.urlencode(
        {"q": q, "fl[]": ["identifier", "date", "publisher", "title", "access-restricted-item"], "rows": rows, "output": "json", "sort[]": "date asc"}, doseq=True)
    try:
        docs = json.loads(fetch(url))["response"]["docs"]
    except Exception:
        return []
    res = []
    for d in docs:
        if str(d.get("access-restricted-item")).lower() == "true": continue
        ident = d["identifier"]
        year = (d.get("date") or "")[:4]
        pub = d.get("publisher") or ""
        if isinstance(pub, list): pub = pub[0]
        res.append((f"archive.org scan: {d.get('title','')} ({pub} {year})".replace("  ", " "), f"https://archive.org/details/{ident}", ident, "archive", year, pub))
    return res

def archive_text(ident):
    try:
        meta = json.loads(fetch(f"https://archive.org/metadata/{ident}"))
    except Exception:
        return ""
    names = [f["name"] for f in meta.get("files", []) if f["name"].endswith("_djvu.txt")]
    if not names:
        names = [f["name"] for f in meta.get("files", []) if f["name"].endswith(".txt") and f.get("source") != "metadata"]
    if not names: return ""
    return fetch(f"https://archive.org/download/{ident}/{urllib.parse.quote(names[0])}", timeout=120)

def wikisource_sources(phrase):
    url = "https://en.wikisource.org/w/api.php?" + urllib.parse.urlencode(
        {"action": "query", "list": "search", "srsearch": f'"{phrase}"', "format": "json", "srlimit": 15, "srnamespace": "0|104"})
    try:
        hits = json.loads(fetch(url))["query"]["search"]
    except Exception:
        return []
    return [("Wikisource: " + h["title"], "https://en.wikisource.org/wiki/" + urllib.parse.quote(h["title"].replace(" ", "_")), h["title"], "wikisource") for h in hits]

def wikisource_text(title):
    t = fetch("https://en.wikisource.org/w/index.php?" + urllib.parse.urlencode({"title": title, "action": "render"}))
    t = re.sub(r"(?s)<(script|style).*?</\1>", " ", t)
    t = re.sub(r"<br\s*/?>", "\n", t)
    return html.unescape(re.sub(r"<[^>]+>", " ", t))

def wikisource_text_from_html(t):
    t = re.sub(r"(?s)<(script|style).*?</\1>", " ", t)
    t = re.sub(r"<br\s*/?>", "\n", t)
    return html.unescape(re.sub(r"<[^>]+>", " ", t))

def check_line(l):
    want = line_text(l)
    if "TO CONFIRM" in want:
        return {"day": l["day"], "skipped": "quotation not drafted yet"}
    s = l["search"]
    found, tried = [], 0
    editions = set()
    # longest piece as the Wikisource search phrase
    longest = max((p[0] for p in l["parts"]), key=len).strip(" /;:,.!?—“”\"")
    longest = re.sub(r"[“”\"]", "", longest)
    gut = [("Project Gutenberg #" + g, f"https://www.gutenberg.org/ebooks/{g}", f"https://gutenberg.pglaf.org/cache/epub/{g}/pg{g}.txt", "gutenberg") for g in s.get("gutenberg", [])] or gutenberg_sources(s["title"], s["creator"])
    urls = [("Web: " + u.split("/")[2], u, u, "url") for u in s.get("urls", [])]
    cands = urls + gut + wikisource_sources(longest)[:10] + archive_sources(s["title"], s["creator"], q=s.get("q"))
    for c in cands:
        if len([f for f in found if f["ratio"] >= 0.9]) >= 8: break
        label, link, ref, kind = c[:4]
        if kind == "archive":
            ed = (c[4], c[5].lower()[:20])
            if ed in editions and ed != ("", ""): continue
            if tried > 40: continue
            tried += 1
            text = archive_text(ref)
        elif kind == "url":
            text = wikisource_text_from_html(fetch(ref))
        elif kind == "gutenberg":
            text = fetch(ref)
        else:
            text = wikisource_text(ref)
        if not text: continue
        r, snip = best_match(text, want)
        if r >= 0.75:
            found.append({"label": label, "url": link, "kind": kind, "ratio": r, "snippet": re.sub(r"\s+", " ", snip)[:400]})
            if kind == "archive": editions.add((c[4], c[5].lower()[:20]))
    good = [f for f in found if f["ratio"] >= 0.9]
    return {"day": l["day"], "work": l["work"], "line": want,
            "exact": sum(1 for f in found if f["ratio"] == 1.0), "near": sum(1 for f in good if f["ratio"] < 1.0),
            "sources": found}

lines = json.load(open(data_path))
if only: lines = [l for l in lines if l["day"] in only]
gutenberg_ids("x", "x")  # load catalog once
prev = {}
if os.path.exists(out_path):
    prev = {r["day"]: r for r in json.load(open(out_path))}
with ThreadPoolExecutor(10) as ex:
    results = list(ex.map(check_line, lines))
for r in results:
    prev[r["day"]] = r
    print(r["day"], r.get("work", ""), "exact", r.get("exact"), "near", r.get("near"), r.get("skipped", ""), flush=True)
json.dump([prev[k] for k in sorted(prev)], open(out_path, "w"), indent=1, ensure_ascii=False)
