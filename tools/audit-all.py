#!/usr/bin/env python3
"""Re-check every line in site/lines.js against freshly downloaded sources (20 Nov 2026 audit).

Usage: python3 tools/audit-all.py REPO_ROOT CACHE_DIR OUT.json
Sources: the 19 Nov report (days 1-60) and docs/drafts/source-check-061-151.json (days 61-151).
Comparison: tools/exact-check.py. See docs/line-check-2026-11-20.md.
"""
import json,re,sys,os,hashlib,urllib.parse,urllib.request,time,importlib.util,subprocess
from concurrent.futures import ThreadPoolExecutor
root,CACHE,out=sys.argv[1],sys.argv[2],sys.argv[3]
spec=importlib.util.spec_from_file_location("ec",root+"/tools/exact-check.py");ec=importlib.util.module_from_spec(spec)
sys.argv=[sys.argv[0],"","",CACHE];spec.loader.exec_module(ec);ec.CACHE=CACHE
UA="HalfALineQuoteCheck/1.0 (literature game fact-check)"
def fetch(url):
    k=os.path.join(CACHE,hashlib.sha1(url.encode()).hexdigest())
    if os.path.exists(k) and os.path.getsize(k)>0: return
    b=b""
    for a in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url,headers={"User-Agent":UA}),timeout=60) as r: b=r.read()
            break
        except Exception as e:
            if getattr(e,"code",None) in (401,403,404): break
            time.sleep(2+3*a)
    open(k,"wb").write(b)
def raw_url(s):
    if s["kind"]=="gutenberg":
        g=s["url"].rstrip("/").rsplit("/",1)[1];return f"https://gutenberg.pglaf.org/cache/epub/{g}/pg{g}.txt"
    if s["kind"]=="wikisource":
        t=urllib.parse.unquote(s["url"].split("/wiki/",1)[1]).replace("_"," ")
        return "https://en.wikisource.org/w/index.php?"+urllib.parse.urlencode({"title":t,"action":"render"})
    return s["url"]
def kind(u):
    if "gutenberg.org/ebooks/" in u: return "gutenberg"
    if "wikisource.org/wiki/" in u: return "wikisource"
    if "archive.org/details" in u: return "archive"
    return "url"
node=subprocess.run(["node","-e",'global.window={};require("./site/lines.js");console.log(JSON.stringify(window.HAL_LINES))'],cwd=root,capture_output=True,text=True).stdout
lines=json.loads(node)
srcs={}
rep=open(root+"/docs/line-check-2026-11-19.md").read()
for row in rep.splitlines():
    m=re.match(r"\| (\d+) \|",row)
    if m and int(m.group(1))<=60:
        d=int(m.group(1));srcs.setdefault(d,[])
        for lab,u in re.findall(r"\[([^\]]+)\]\((https?://(?:[^()\s]|\([^()\s]*\))+)\)",row):
            if not any(x["url"]==u for x in srcs[d]): srcs[d].append(dict(label=lab,url=u,kind=kind(u)))
sc=json.load(open(root+"/docs/drafts/source-check-061-151.json"))
for c in sc:
    d=c.get("day")
    if not d or d<61: continue
    if any(l2["work"]==c["work"] for l2 in [lines[d-1]]):
        for s in c["sources"]:
            if s.get("ratio",0)>=0.9: srcs.setdefault(d,[]).append(dict(label=s["label"],url=s["url"],kind=s["kind"]))
dr=json.load(open(root+"/docs/drafts/lines-061-151.json"))
for x in dr:
    for u in x.get("search",{}).get("urls",[]):
        if not any(s["url"]==u for s in srcs.get(x["day"],[])): srcs.setdefault(x["day"],[]).append(dict(label="Web: "+urllib.parse.urlparse(u).netloc,url=u,kind=kind(u)))
urls=sorted({raw_url(s) for v in srcs.values() for s in v if s["kind"]!="archive"})
print(len(urls),"texts to fetch",flush=True)
with ThreadPoolExecutor(3) as ex: list(ex.map(fetch,urls))
res=[]
for i,l in enumerate(lines):
    d=i+1;draft=" ".join(p[0] for p in l["parts"]);dc=ec.canon(draft,set())
    exact,other,missing,arch=[],[],[],[]
    for s in srcs.get(d,[]):
        if s["kind"]=="archive": arch.append(s);continue
        t=ec.source_text(dict(s,url=s["url"])) if s["kind"]!="url" else ec.source_text(s)
        if not t: missing.append(s);continue
        p=ec.passage(t,draft)
        if p is None: missing.append(dict(s,why="words not found"));continue
        notes=set();q=ec.canon(p,notes)
        rec=dict(label=s["label"],url=s["url"],passage=re.sub(r"\s+"," ",p),notes=sorted(notes))
        (exact if ec.same_text(q,dc) else other).append(rec)
    probs=[]
    for p in l["parts"]:
        if p[0]!=p[0].strip() or "  " in p[0]: probs.append("piece has stray spaces: %r"%p[0])
    if not re.search(r"(?<![\w’'])"+re.escape(l["key"])+r"(?![\w’'])",draft): probs.append("bonus word not a whole word in the line")
    res.append(dict(day=d,work=l["work"],draft=draft,exact=exact,words_other=other,unreadable=missing,archive=len(arch),pieces=probs))
json.dump(res,open(out,"w"),indent=1,ensure_ascii=False)
for r in res:
    print(r["day"],r["work"][:30],"EXACT" if r["exact"] else "-----",len(r["exact"]),"exact",len(r["words_other"]),"differ",len(r["unreadable"]),"unread",r["archive"],"scans",("PIECES:"+";".join(r["pieces"])) if r["pieces"] else "")
