#!/usr/bin/env python3
"""Exact-text check to the standard in docs/line-check-2026-11-19.md.

Usage: python3 tools/exact-check.py LINES.json SOURCE_CHECK.json CACHE_DIR OUT.json

For each draft line, every source already found by tools/verify-quotes.py (Gutenberg, Wikisource,
web pages; OCR scans are skipped because their punctuation is unreliable) is searched for the
passage, and the passage is cut out with the punctuation that follows its last word.
A source passes ("exact") when it equals the draft character for character, allowing only:
  - a capital on the first word,
  - straight vs curly quotation marks and apostrophes,
  - " / " in the draft for a line break in the source,
  - transcription marks that are not text: Gutenberg's "--" for a dash, _underscores_ for italics,
    and the space some printings put before ; : ! ? (each noted in the result).
When no source passes, the closest named-edition passage is reported as the proposed correction.
"""
import json, re, sys, os, hashlib, html, unicodedata

CACHE = sys.argv[3] if len(sys.argv) > 3 else os.environ.get("HAL_CACHE", "")

def cached(url):
    k = os.path.join(CACHE, hashlib.sha1(url.encode()).hexdigest())
    return open(k, "rb").read().decode("utf-8", "replace") if os.path.exists(k) else None

def source_text(s):
    if s["kind"] == "gutenberg":
        gid = s["url"].rsplit("/", 1)[1]
        return cached(f"https://gutenberg.pglaf.org/cache/epub/{gid}/pg{gid}.txt")
    if s["kind"] == "wikisource":
        import urllib.parse
        title = urllib.parse.unquote(s["url"].split("/wiki/", 1)[1]).replace("_", " ")
        t = cached("https://en.wikisource.org/w/index.php?" + urllib.parse.urlencode({"title": title, "action": "render"}))
    elif s["kind"] == "url":
        t = cached(s["url"])
    else:
        return None
    if t is None:
        return None
    t = re.sub(r"(?s)<(script|style).*?</\1>", " ", t)
    t = re.sub(r"<br\s*/?>|</p>|</div>|</li>", "\n", t)
    return html.unescape(re.sub(r"<[^>]+>", "", t))

QUOTES = str.maketrans({"‘": "'", "’": "'", "“": '"', "”": '"', "′": "'"})

def canon(s, notes):
    """Reduce to what the standard treats as the same text; record transcription differences."""
    s = unicodedata.normalize("NFC", s).translate(QUOTES)
    s2 = re.sub(r"\[\d+\]|(?<=\s)\d{1,4}(?=\s)", " ", s)
    if s2 != s:
        notes.add("line numbers or footnote marks in the source"); s = s2
    s = s.rstrip("]").strip()
    if len(s) > 1 and s[0] in "\"'" and s[-1] in "\"'":
        notes.add("the source sets the words in quotation marks (dialogue lifted out)"); s = s[1:-1]
    elif s[:1] in "\"'" and s.count(s[0]) % 2 == 1:
        notes.add("the source opens a quotation here"); s = s[1:]
    elif s[-1:] in "\"'" and s.count(s[-1]) % 2 == 1:
        notes.add("the source closes a quotation here"); s = s[:-1]
    if "--" in s:
        notes.add("dash written as -- in the source"); s = s.replace("--", "—")
    if "_" in s:
        notes.add("underscores (italics) in the source"); s = s.replace("_", "")
    s = re.sub(r"\s*/\s*", " ", s)            # " / " line-break mark
    s3 = re.sub(r"([,;:.!?])(?=[A-Z])", r"\1 ", s)
    if s3 != s:
        notes.add("line breaks lost in the page's markup"); s = s3
    s = re.sub(r"\s+", " ", s).strip()
    s2 = re.sub(r" ([;:!?])", r"\1", s)
    if s2 != s:
        notes.add("space before ; : ! ? in the source")
    s = re.sub(r"\s*—\s*", "—", s2)  # spaced vs closed dashes are typography
    return s

WORD = re.compile(r"[A-Za-zÀ-ɏſ]+")

def passage(raw, draft):
    """Cut the passage whose words match the draft's words, plus trailing punctuation."""
    raw = re.sub(r"-\s*\n\s*(?=[a-z])", "", raw)
    want = [w.lower() for w in WORD.findall(draft)]
    toks = [(m.group().lower(), m.start(), m.end()) for m in WORD.finditer(raw)]
    words = [t[0] for t in toks]
    n = len(want)
    found = []
    for i in range(len(words) - n + 1):
        if words[i] == want[0] and words[i:i + n] == want:
            s, e = toks[i][1], toks[i + n - 1][2]
            m = re.match(r"[^\sA-Za-z]*", raw[e:])       # trailing punctuation as printed
            lead = re.search(r"[\"'‘“(]*$", raw[max(0, s - 3):s])
            found.append(raw[s - len(lead.group()):e + len(m.group())])
    if not found:
        return None
    d = canon(draft, set())
    for f in found:                                      # prefer an occurrence that matches exactly
        if same_text(canon(f, set()), d):
            return f
    return found[0]

def same_text(q, d):
    """Equal, allowing case differences in opening words set in capitals or small capitals."""
    if q == d:
        return True
    qw, dw = q.split(" "), d.split(" ")
    if len(qw) != len(dw):
        return False
    i = 0
    while i < len(qw) and (i == 0 or qw[i].isupper()) and qw[i].lower() == dw[i].lower():
        i += 1
    return i > 0 and qw[i:] == dw[i:]

def main():
    lines_path, check_path, _, out_path = sys.argv[1:5]
    lines = json.load(open(lines_path))
    checks = {(c["work"], c["line"]): c for c in json.load(open(check_path))}
    def text(l): return " ".join(p[0] for p in l["parts"]).replace(" / ", " ").replace("/ ", "")
    results = []
    for l in lines:
        draft = " ".join(p[0] for p in l["parts"])
        c = checks.get((l["work"], text(l)), {"sources": []})
        exact, same, cands = [], [], []
        dn = set(); d = canon(draft, dn)
        for s in c["sources"]:
            if s["kind"] == "archive":
                same.append(s); continue
            t = source_text(s)
            if not t:
                same.append(s); continue
            p = passage(t, draft)
            if p is None:
                same.append(s); continue
            notes = set(); q = canon(p, notes)
            ok = same_text(q, d)
            rec = dict(label=s["label"], url=s["url"], passage=re.sub(r"\s+", " ", p), notes=sorted(notes))
            (exact if ok else cands).append(rec)
            if not ok:
                same.append(s)
        results.append(dict(day=l.get("day"), work=l["work"], draft=draft, exact=exact,
                            same=[dict(label=s["label"], url=s["url"]) for s in same], candidates=cands))
    json.dump(results, open(out_path, "w"), indent=1, ensure_ascii=False)
    for r in results:
        print(r["day"], r["work"][:34], "EXACT" if r["exact"] else "----", len(r["exact"]), "exact,", len(r["same"]), "same words")

if __name__ == "__main__":
    main()
