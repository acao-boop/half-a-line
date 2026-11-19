// Contrast check for the mockups: every text colour against what it sits on. Run: node docs/mockups/check-contrast.js
const fs=require("fs"),path=require("path");
const L=h=>{h=h.replace("#","");const c=[0,2,4].map(i=>parseInt(h.substr(i,2),16)/255).map(v=>v<=.03928?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]};
const ratio=(a,b)=>{const x=L(a),y=L(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const mix=(a,b,t)=>"#"+[0,2,4].map(i=>Math.round(parseInt(a.slice(1).substr(i,2),16)*t+parseInt(b.slice(1).substr(i,2),16)*(1-t)).toString(16).padStart(2,"0")).join("");
const base={light:{good:"#1C7A4B","good-bg":"#DDF2E6",bad:"#B3261E","bad-bg":"#FBE3E1"},dark:{good:"#6FD39C","good-bg":"#173527",bad:"#FF9A90","bad-bg":"#3C1C1B"}};
const pairs=[["ink","card","line text"],["muted","card","small grey text"],["ink","paper","hint and input text"],["muted","paper","hint label, placeholder"],["hl-ink","hl","newest clue"],["accent","card","links"],["card","ink","Guess button"],["bad","bad-bg","wrong guesses"],["good","card","solved"]];
let fails=0,rows=0;
for(const f of ["seasons.html","rooms.html","hours.html"]){
  const css=fs.readFileSync(path.join(__dirname,f),"utf8").replace(/\/\*[^]*?\*\//g,"");
  for(const m of css.matchAll(/([^{}]+)\{([^{}]*--ink:[^{}]*)\}/g)){
    const sel=m[1].trim().split(",").pop().replace(/\s+/g," "),v={};
    for(const d of m[2].matchAll(/--([\w-]+):(#[0-9A-Fa-f]{6})/g))v[d[1]]=d[2];
    const dark=/dark/.test(sel)||/"(library|night)"/.test(sel),t=Object.assign({},base[dark?"dark":"light"],v);
    const name=f.replace(".html","")+" "+(sel.match(/"(\w+)"\]/g)||[]).pop().replace(/"|\]/g,"")+(/dark/.test(sel)?" (dark)":"");
    const bad=[];
    for(const [fg,bg,what] of pairs){const r=ratio(t[fg],t[bg]);rows++;if(r<4.5){bad.push(`${what} ${r.toFixed(2)}`);fails++}}
    if(f==="seasons.html"&&t.wash){// nav and footer text sit straight on the wash (and, top right, on the faint motif)
      for(const bgc of [t.wash,t.motif&&t.motif!=="transparent"?mix(t.motif,t.wash,.16):t.wash]){const r=ratio(t.muted,bgc);rows++;if(r<4.5){bad.push(`nav on backdrop ${r.toFixed(2)}`);fails++}}}
    console.log((bad.length?"FAIL ":"ok   ")+name.padEnd(26)+(bad.join("; ")||"min "+Math.min(...pairs.map(([a,b])=>ratio(t[a],t[b]))).toFixed(2)+":1"));
  }
}
console.log(`${rows} pairs checked, ${fails} below 4.5:1`);process.exit(fails?1:0);
