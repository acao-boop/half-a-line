#!/usr/bin/env python3
"""Turn the draft lines and the merged source check into review tables.

Usage: python3 tools/draft-tables.py
Reads docs/drafts/lines-061-151.json, lines-reserve.json and source-check-061-151.json;
writes docs/drafts/lines-061-151.md and docs/drafts/sources-061-151.md.
"""
import json, datetime

D = "docs/drafts/"
lines = json.load(open(D + "lines-061-151.json"))
reserve = json.load(open(D + "lines-reserve.json"))
checks = {(c["work"], c["line"]): c for c in json.load(open(D + "source-check-061-151.json"))}
EPOCH = datetime.date(2026, 11, 18)

def text(l):
    return " ".join(p[0] for p in l["parts"]).replace(" / ", " ").replace("/ ", "")

def check(l):
    return checks.get((l["work"], text(l)), {"sources": [], "count": 0, "summary": "not checked"})

def date(day):
    return (EPOCH + datetime.timedelta(days=day - 1)).strftime("%a %-d %b")

def pieces(l):
    return "  ".join(f"[{o}] {t}" for t, o in l["parts"])

def esc(s):
    return str(s).replace("|", "\\|").replace("\n", " ")

def row(l, first):
    c = check(l)
    return "| " + " | ".join(esc(x) for x in [
        first,
        f"{l['author']}, *{l['work']}*",
        pieces(l),
        " · ".join(l["hints"]),
        f"{l['key']} ({', '.join(t for t in l['tiles'] if t != l['key'])})",
        l["note"],
        f"{l['who']} · {l['year']}",
        f"{c['count']}" + (" (see note)" if c.get("finding") else ""),
    ]) + " |"

HEAD = ["| Day | Work | Line, by piece | Hints (weak to strong) | Bonus word (wrong choices) | Note | Speaker · year | Sources |",
        "|---|---|---|---|---|---|---|---|"]
out = ["# Half a Line: draft lines for days 61 to 151", "",
       "Drafted 19 November 2026 for Andrew's review. **Not in the game.** The same lines are in the review sheet (rows 62–152) with Status \"To review\".", "",
       "- Pieces show the reveal order in brackets: 1 and 2 show first.",
       "- \"Easy\" marks the one or two lines a week that most players will know.",
       "- Sources: how many independent printings or copies match the quotation word for word. Every link is in `sources-061-151.md`. Lines with fewer than five say why there.",
       "- New titles to add to the guess list when these go in are listed at the end.", ""]
week = None
for l in lines:
    wk = (l["day"] - 61) // 7
    if wk != week:
        week = wk
        out += ["", f"## {date(61 + wk * 7)} to {date(67 + wk * 7)} 2027: {l['theme'] or 'Mixed week'}", ""] + HEAD
    out.append(row(l, f"{l['day']} · {date(l['day'])}" + (" · Easy" if l.get("known") else "")))
out += ["", "## Reserve: drafted and checked, not scheduled", "",
        "Lines moved out when Andrew widened the pool on 19 November (the Spring and Sea weeks were replaced by Childhood and Around the world). Ready for later weeks.", ""] + HEAD
for l in reserve:
    out.append(row(l, "Reserve" + (f": {l['reserve_reason']}" if l.get("reserve_reason") else "")))
import re
global_titles = set()
try:
    src = open("site/lines.js").read()
    global_titles = set(re.findall(r'\["([^"]+)","[^"]+"\]', src[src.find("HAL_WORKS"):]))
except Exception:
    pass
new = []
for l in lines + reserve:
    for t in [l["work"]] + l.get("alias", []):
        if t not in global_titles and (t, l["author"]) not in new:
            new.append((t, l["author"]))
out += ["", "## Titles to add to the guess list", "",
        "Not yet in `HAL_WORKS` in `site/lines.js` (answers and their aliases):", ""]
out += [f"- {t} ({a})" for t, a in new]
open(D + "lines-061-151.md", "w").write("\n".join(out) + "\n")

s = ["# Source check for days 61 to 151", "",
     "How it was checked (19 November 2026, script `tools/verify-quotes.py`): each quotation was compared word for word, ignoring case and punctuation, with the full text of each source. Sources are Project Gutenberg texts, Wikisource transcriptions, scans of different printings on archive.org (one per edition), and, for works still in copyright until 2027, independent web copies.",
     "\"Exact\" means every word in order. \"Near\" means the only differences are scanning errors (such as *bad* for *had*) or a word cut at a line break; the snippet shows the source's own wording and punctuation, so spelling and punctuation can be read against the draft.", ""]
for l in lines + reserve:
    c = check(l)
    title = f"Day {l['day']}" if "day" in l else "Reserve"
    s += [f"## {title}: {l['author']}, *{l['work']}*", "", f"Draft: {text(l)}", "", f"Result: {c['summary']}", ""]
    if c.get("finding"):
        s += [f"Why fewer than five, or what to know: {c['finding']}", ""]
    for x in c["sources"]:
        tag = "exact" if x["ratio"] == 1.0 else f"near ({x['ratio']:.2f})"
        s.append(f"- [{x['label']}]({x['url']}) · {tag} · \u201c{x['snippet'][:300]}\u201d")
    s.append("")
open(D + "sources-061-151.md", "w").write("\n".join(s) + "\n")
print("written", len(new), "new titles")
