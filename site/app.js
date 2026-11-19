const LINES=window.HAL_LINES||[], WORKS=window.HAL_WORKS||[];
// Day 1 is launch day. Change this date (year, month counted from 0, day) to move the whole calendar.
const EPOCH=new Date(2026,10,18);
const DAY=864e5;
const mid=d=>new Date(d.getFullYear(),d.getMonth(),d.getDate());
const dayNo=d=>Math.round((mid(d)-EPOCH)/DAY)+1;
const TODAY=()=>Math.min(Math.max(dayNo(new Date()),1),LINES.length);
const dateOf=n=>new Date(EPOCH.getFullYear(),EPOCH.getMonth(),EPOCH.getDate()+n-1);
const fmt=(d,long)=>d.toLocaleDateString(undefined,long?{weekday:"long",day:"numeric",month:"long"}:{day:"numeric",month:"short"});
const lineOf=n=>LINES[(n-1)%LINES.length];

// Clue ladder after the two opening pieces: h = hint, p = next piece. Leftover pieces come at the end.
const LADDER="hphph";
function steps(L){const n=L.parts.length,s=[];let p=3,h=0;for(const c of LADDER){if(c==="h"&&h<3)s.push(["h",h++]);else if(c==="p"&&p<=n)s.push(["p",p++])}while(h<3)s.push(["h",h++]);while(p<=n)s.push(["p",p++]);return s}
function view(L,r){const st=steps(L).slice(0,r.step);return{pieces:2+st.filter(x=>x[0]==="p").length,hints:st.filter(x=>x[0]==="h").map(x=>x[1]),last:st[st.length-1]||null}}

const KEY="half-a-line-v3";
const fresh=()=>({days:{},help:false});
let S=null;
try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S||typeof S.days!=="object")S=fresh();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const rec=n=>S.days[n]||(S.days[n]={step:0,misses:[],done:false,won:false,bonus:null,onDay:false});
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm=s=>s.toLowerCase().normalize("NFD").replace(/\p{M}/gu,"").replace(/^the\s+/,"").replace(/[^a-z0-9]/g,"");
const $=id=>document.getElementById(id);
const plural=(k,w)=>k+" "+w+(k===1?"":"s");
const clues=k=>plural(k,"extra clue");

function squares(L,r){const T=steps(L).length+1;if(!r.done)return"";if(!r.won)return"\u{1F7E5}".repeat(T);return"\u{1F7E8}".repeat(r.step)+"\u{1F7E9}"+"⬜".repeat(T-1-r.step)}
function shareText(n,L,r){return "Half a Line #"+n+(L.theme?" \u00b7 "+L.theme:"")+"\n"+(r.won?(r.step?"Solved with "+clues(r.step):"Solved with no extra clues"):"Missed")+"\n"+squares(L,r)}
function shuffle(a,seed){const b=a.slice();let s=seed*9301+49297;for(let k=b.length-1;k>0;k--){s=(s*9301+49297)%233280;const j=Math.floor(s/233280*(k+1));[b[k],b[j]]=[b[j],b[k]]}return b}

function quoteHTML(L,r,blankKey){
  const v=view(L,r);
  return L.parts.map(([t,o])=>{
    const shown=r.done||o<=v.pieces, isFresh=!r.done&&v.last&&v.last[0]==="p"&&v.last[1]===o;
    if(!shown)return '<span class="part hid" aria-hidden="true">'+esc(t)+'</span><span class="sr">(hidden piece)</span>';
    let h=esc(t);
    if(blankKey)h=h.replace(new RegExp("\\b"+blankKey+"\\b"),'<span class="blank">&nbsp;?&nbsp;</span>');
    return '<span class="part'+(isFresh?' fresh':'')+'">'+h+'</span>';
  }).join(" ");
}

function setNav(r){document.querySelectorAll("nav a").forEach(a=>a.toggleAttribute("aria-current",a.dataset.r===r)&&a.setAttribute("aria-current","page"))}

function play(n){
  const today=TODAY(), isToday=n===today, L=lineOf(n), r=rec(n), N=L.parts.length, T=steps(L).length, v=view(L,r);
  setNav(isToday?"today":"archive");
  let h='';
  if(isToday&&!S.help)h+='<div class="help" id="help"><p><b>How to play</b></p><ol><li>A famous line is shown with some pieces hidden.</li><li>Guess which work it’s from. Every wrong guess, or “Next clue,” reveals a hint or another piece.</li><li>Solve it with as few extra clues as you can, then try the bonus word.</li></ol><div><button class="btn ghost" id="gotit">Got it</button></div></div>';
  h+='<div class="meta"><span>No. '+n+' · '+fmt(dateOf(n),true)+'</span><span>'+(r.done?(r.won?(r.step?'Solved with '+clues(r.step):'Solved, no extra clues'):'Missed'):v.pieces+' of '+N+' pieces · '+v.hints.length+' of 3 hints')+'</span></div>';
  if(L.theme)h+='<p class="theme">This week: <b>'+esc(L.theme)+'</b></p>';
  h+='<p class="quote">'+quoteHTML(L,r,r.done&&r.bonus===null?L.key:null)+'</p>';
  if(!r.done&&v.hints.length)h+='<ul class="hints" aria-label="Hints">'+v.hints.map(k=>'<li'+(v.last&&v.last[0]==="h"&&v.last[1]===k?' class="fresh"':'')+'><span>Hint</span>'+esc(L.hints[k])+'</li>').join("")+'</ul>';
  if(!r.done){
    h+='<form class="ask" id="f" autocomplete="off"><label for="g">Which work is this from?</label>'
      +'<div class="row"><div class="combo"><input type="text" id="g" placeholder="Start typing a title or author" role="combobox" aria-expanded="false" aria-controls="sugg" aria-autocomplete="list"><ul class="sugg" id="sugg" role="listbox" hidden></ul></div>'
      +'<button class="btn" type="submit">Guess</button>'
      +(r.step<T?'<button class="btn ghost" type="button" id="more">Next clue</button>':'')+'</div>'
      +'<p class="err" id="err"></p>'
      +(r.misses.length?'<ul class="misses" aria-label="Wrong guesses">'+r.misses.map(m=>'<li>'+esc(m)+'</li>').join("")+'</ul>':'')
      +'</form>';
  }else{
    h+='<p class="verdict '+(r.won?'won':'lost')+'">'+(r.won?(r.step===0?'Straight away. Impressive.':'Got it with '+clues(r.step)+'.'):'Not this time.')+'</p>';
    if(r.misses.length)h+='<ul class="misses" aria-label="Wrong guesses">'+r.misses.map(m=>'<li>'+esc(m)+'</li>').join("")+'</ul>';
    h+='<dl class="facts"><dt>Work</dt><dd><i>'+esc(L.work)+'</i>, '+esc(L.year)+'</dd><dt>Author</dt><dd>'+esc(L.author)+'</dd><dt>Speaker</dt><dd>'+esc(L.who)+'</dd></dl>';
    if(r.bonus===null){
      h+='<div class="bonus"><p><b>Bonus:</b> which word fills the gap?</p><div class="tiles">'+shuffle(L.tiles,n).map(t=>'<button class="tile" data-t="'+esc(t)+'">'+esc(t)+'</button>').join("")+'</div></div>';
    }else{
      h+='<div class="bonus"><p><b>Bonus:</b> '+(r.bonus===L.key?'right, it’s “'+esc(L.key)+'.”':'it was “'+esc(L.key)+',” not “'+esc(r.bonus)+'.”')+'</p></div>';
      h+='<p class="note">'+esc(L.note)+'</p>';
      h+='<div class="share"><pre id="sharetext">'+esc(shareText(n,L,r))+'</pre><div class="row"><button class="btn" id="copy">Copy result</button><a class="btn ghost" href="#stats">Your stats</a>'
        +(isToday?'<a class="btn ghost" href="#archive">Play past lines</a>':nextLink(n))+'</div><p class="err" id="cerr" style="color:var(--muted)"></p>'
        +(isToday?'<p class="next" id="countdown"></p>':'')+'</div>';
    }
  }
  $("card").innerHTML=h;
  wire(n,L,r,T);
  tick();
}
function nextLink(n){for(let k=n+1;k<=TODAY();k++){if(!(S.days[k]&&S.days[k].done))return '<a class="btn ghost" href="'+(k===TODAY()?'#':'#day-'+k)+'">Next unplayed line</a>'}return '<a class="btn ghost" href="#archive">Back to archive</a>'}

function wire(n,L,r,T){
  const g0=$("gotit");if(g0)g0.onclick=()=>{S.help=true;save();$("help").remove()};
  const f=$("f");
  if(f){
    const g=$("g"),list=$("sugg"),err=$("err");let items=[],sel=-1;
    const close=()=>{list.hidden=true;g.setAttribute("aria-expanded","false");sel=-1};
    const draw=()=>{const q=norm(g.value);items=q?WORKS.filter(([t,a])=>norm(t).includes(q)||norm(a).includes(q)).slice(0,8):[];
      if(!items.length)return close();
      list.innerHTML=items.map(([t,a],k)=>'<li role="option" aria-selected="'+(k===sel)+'" data-t="'+esc(t)+'"><span>'+esc(t)+'</span><small>'+esc(a)+'</small></li>').join("");
      list.hidden=false;g.setAttribute("aria-expanded","true")};
    g.addEventListener("input",()=>{err.textContent="";sel=-1;draw()});
    g.addEventListener("keydown",e=>{if(list.hidden)return;
      if(e.key==="ArrowDown"){e.preventDefault();sel=Math.min(sel+1,items.length-1);draw()}
      else if(e.key==="ArrowUp"){e.preventDefault();sel=Math.max(sel-1,0);draw()}
      else if(e.key==="Enter"&&sel>=0){e.preventDefault();g.value=items[sel][0];close()}
      else if(e.key==="Escape")close()});
    list.addEventListener("mousedown",e=>{const li=e.target.closest("li");if(li){e.preventDefault();g.value=li.dataset.t;close();g.focus()}});
    g.addEventListener("blur",()=>setTimeout(close,120));
    f.addEventListener("submit",e=>{e.preventDefault();
      const v=g.value.trim();
      if(!v){err.textContent="Type a title first.";return}
      const hit=WORKS.find(([t])=>norm(t)===norm(v));
      if(!hit){err.textContent="Pick a title from the list. Start typing to see suggestions.";return}
      if(r.misses.includes(hit[0])){err.textContent="You already tried that one.";return}
      if(hit[0]===L.work||(L.alias||[]).includes(hit[0])){finish(n,r,true)}
      else{r.misses.push(hit[0]);if(r.step<T)r.step++;else finish(n,r,false)}
      save();play(n);const ng=$("g");if(ng)ng.focus()});
    const more=$("more");if(more)more.onclick=()=>{r.step++;save();play(n);$("g").focus()};
  }
  document.querySelectorAll(".tile").forEach(b=>b.onclick=()=>{r.bonus=b.dataset.t;save();play(n)});
  const cp=$("copy");if(cp)cp.onclick=()=>{const text=shareText(n,L,r);
    const fall=()=>{const rg=document.createRange();rg.selectNodeContents($("sharetext"));const s=getSelection();s.removeAllRanges();s.addRange(rg);$("cerr").textContent="Copying isn't allowed here. The result is selected, so copy it yourself."};
    try{navigator.clipboard.writeText(text).then(()=>{cp.textContent="Copied"},fall)}catch(e){fall()}};
}
function finish(n,r,won){r.done=true;r.won=won;r.onDay=n===dayNo(new Date())}

function tick(){const el=$("countdown");if(!el)return;const now=new Date(),next=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1),m=Math.max(0,Math.round((next-now)/6e4));
  el.textContent=TODAY()>=LINES.length?"That's every line so far. More are on the way.":"Next line in "+Math.floor(m/60)+"h "+(m%60)+"m."}
setInterval(tick,30000);

function archive(){
  setNav("archive");const t=TODAY();let items="";
  const anyTheme=LINES.slice(0,t).some(L=>L.theme);let prev=null;
  for(let n=t;n>=1;n--){const r=S.days[n];const th=lineOf(n).theme||'A mix of lines';
    if(anyTheme&&th!==prev){items+='<li class="wk">'+esc(th)+'</li>';prev=th}const st=!r||(!r.done&&!r.step&&!r.misses.length)?'<span class="st">Not played</span>':!r.done?'<span class="st open">In progress</span>':r.won?'<span class="st won">Solved'+(r.step?', '+clues(r.step):'')+'</span>':'<span class="st lost">Missed</span>';
    items+='<li><a href="'+(n===t?'#':'#day-'+n)+'"><b>No. '+n+'</b><small>'+fmt(dateOf(n))+(n===t?' · today':'')+'</small>'+st+'</a></li>'}
  $("card").innerHTML='<div class="meta"><span>Archive</span><span>'+plural(t,"line")+' so far</span></div><h2>Every line so far</h2><p style="margin:0;color:var(--muted)">Missed a day? Play any past line here. Past lines count toward your stats but not your streak.</p><ul class="arch">'+items+'</ul>';
}

function stats(){
  setNav("stats");const t=TODAY(),recs=Object.entries(S.days).filter(([n,r])=>r.done&&+n<=LINES.length);
  const played=recs.length,won=recs.filter(([,r])=>r.won),pct=played?Math.round(won.length/played*100):0;
  const avg=won.length?(won.reduce((a,[,r])=>a+r.step,0)/won.length).toFixed(1):"–";
  let cur=0,d=t;const td=S.days[t];if(!(td&&td.done))d--;while(d>=1){const r=S.days[d];if(r&&r.won&&r.onDay){cur++;d--}else break}
  let best=0,run=0;for(let k=1;k<=t;k++){const r=S.days[k];run=(r&&r.won&&r.onDay)?run+1:0;best=Math.max(best,run)}
  const bonus=recs.filter(([n,r])=>r.bonus===lineOf(+n).key).length;
  const dist=[0,1,2,3,4,5,6].map(k=>won.filter(([,r])=>r.step===k).length),miss=played-won.length,mx=Math.max(1,...dist,miss);
  const bar=(label,c,cls)=>'<li><span>'+label+'</span><div class="b '+cls+'" style="width:'+Math.max(8,Math.round(c/mx*100))+'%">'+c+'</div></li>';
  $("card").innerHTML='<div class="meta"><span>Your stats</span><span>Saved in this browser</span></div>'
    +'<div class="nums"><div class="num"><b>'+played+'</b><span>Played</span></div><div class="num"><b>'+pct+'%</b><span>Solved</span></div><div class="num"><b>'+cur+'</b><span>Current streak</span></div><div class="num"><b>'+best+'</b><span>Best streak</span></div><div class="num"><b>'+avg+'</b><span>Avg. extra clues</span></div><div class="num"><b>'+bonus+'</b><span>Bonus words</span></div></div>'
    +'<h2 style="font-size:20px">Extra clues needed</h2><ul class="bars">'+dist.map((c,k)=>bar(k===0?"None":plural(k,"clue"),c,"won")).join("")+bar("Missed",miss,"lost")+'</ul>'
    +'<p style="margin:0;color:var(--muted);font-size:14px">A streak counts days in a row you solved the line on its own day. Stats live in this browser only, so they won’t follow you to another device.</p>';
}

function about(){
  setNav("about");
  $("card").innerHTML='<div class="meta"><span>About</span><span>'+plural(LINES.length,"line")+'</span></div><h2>About Half a Line</h2><div class="prose">'
    +'<p>Each day brings one famous line from literature, shown a few pieces at a time. Name the work it comes from in as few clues as you can, then read why the line matters.</p>'
    +'<p>Every line comes from a work in the public domain. Translations are named where they’re used: Constance Garnett for Tolstoy, Samuel Butler for Homer.</p>'
    +'<p><b>Scoring.</b> You start with two pieces of the line. Each wrong guess, or a press of “Next clue,” gives you a hint or another piece. Your score is the number of extra clues you needed.</p>'
    +'<p>Designed and built by <a href="https://andrewcao.org/">Andrew Cao</a>.</p></div>';
}


function route(){
  const h=location.hash.slice(1);
  if(h==="archive")archive();else if(h==="stats")stats();else if(h==="about")about();
  else if(/^day-\d+$/.test(h)&&+h.slice(4)>=1&&+h.slice(4)<=LINES.length)play(+h.slice(4));
  else play(TODAY());
  window.scrollTo({top:0});
}
addEventListener("hashchange",route);
let armed=false;
$("reset").onclick=()=>{if(!armed){armed=true;$("reset").textContent="Click again to clear every day's progress and stats";setTimeout(()=>{armed=false;$("reset").textContent="Clear my progress"},4000);return}
  S=fresh();save();armed=false;$("reset").textContent="Clear my progress";route()};
const start=()=>{if(!LINES.length){$("card").textContent="The lines didn't load. Refresh the page to try again.";return}route()};
start();
