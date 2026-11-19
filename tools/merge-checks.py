#!/usr/bin/env python3
"""Merge source-check runs (later runs win, matched by work and quotation) into one file with a summary per line.

Usage: python3 tools/merge-checks.py LINES.json OUT.json RUN1.json [RUN2.json ...]
"""
import json, re, sys

lines_path, out_path, runs = sys.argv[1], sys.argv[2], sys.argv[3:]
reserve_path = lines_path.replace("lines-061-151.json", "lines-reserve.json")
lines = json.load(open(lines_path)) + json.load(open(reserve_path))

def text(l):
    return " ".join(p[0] for p in l["parts"]).replace(" / ", " ").replace("/ ", "")

by = {}
for path in runs:
    for r in json.load(open(path)):
        if "line" in r:
            k = (r["work"], r["line"])
            n = lambda x: sum(1 for s in x["sources"] if s["ratio"] >= 0.9)
            if k not in by or n(r) >= n(by[k]):
                by[k] = r

SKIP = ("International Jew",)  # never cite antisemitic tracts, even when they quote the line

def words(s):
    return set(w for w in re.findall(r"[a-z]+", s.lower()) if len(w) > 3)

out = []
for l in lines:
    r = by.get((l["work"], text(l)))
    if not r:
        out.append({"work": l["work"], "day": l.get("day"), "line": text(l), "sources": [], "summary": "not checked", "count": 0})
        continue
    tw = words(l["work"]) | words(l["author"]) | words(" ".join(l.get("alias", [])))
    good, seen = [], set()
    for s in sorted(r["sources"], key=lambda x: -x["ratio"]):
        if s["ratio"] < 0.9 or any(k in s["label"] for k in SKIP):
            continue
        key = s["url"]
        if key in seen:
            continue
        seen.add(key)
        s = dict(s)
        s["edition"] = s["kind"] in ("gutenberg", "archive", "url") or bool(tw & words(s["label"]))
        good.append(s)
    good.sort(key=lambda s: (not s["edition"], -s["ratio"]))
    ed = [s for s in good if s["edition"]]
    exact = sum(1 for s in good if s["ratio"] == 1.0)
    summary = f"{len(good)} independent sources match ({exact} word-for-word, the rest differ only by scanning errors)"
    if len(ed) < len(good):
        summary += f"; {len(ed)} are printings of the work itself, {len(good) - len(ed)} quote it"
    out.append({"work": l["work"], "day": l.get("day"), "line": text(l), "sources": good, "summary": summary, "count": len(good)})
json.dump(out, open(out_path, "w"), indent=1, ensure_ascii=False)
for o in out:
    flag = "" if o["count"] >= 5 else "  <-- under 5"
    print(o["day"], o["work"][:40], o["count"], flag)
