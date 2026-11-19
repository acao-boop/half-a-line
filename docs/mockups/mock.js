// Mockup helper only (not for the live site). Builds the mood switcher and reads #mood=…&theme=…&shot from the address.
(function(){
  const d=document.documentElement, attr=d.dataset.attr||"mood", moods=window.MOODS||[];
  const q=new URLSearchParams(location.hash.slice(1));
  function set(m){d.dataset[attr]=m;const t=(moods.find(x=>x[0]===m)||[])[2];if(t)d.dataset.theme=t;
    document.querySelectorAll(".mockbar button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.m===m));
    document.querySelectorAll("[data-pick]").forEach(r=>{r.checked=r.value===m})}
  if(q.has("shot"))d.classList.add("shot");
  if(q.get("theme"))d.dataset.theme=q.get("theme");
  const bar=document.createElement("div");bar.className="mockbar";bar.innerHTML="<span>Mockup · try a mood:</span>";
  moods.forEach(([m,label])=>{const b=document.createElement("button");b.type="button";b.dataset.m=m;b.textContent=label;b.onclick=()=>set(m);bar.appendChild(b)});
  if(!d.dataset.fixedTheme){const t=document.createElement("button");t.type="button";t.textContent="Light / dark";t.onclick=()=>{d.dataset.theme=d.dataset.theme==="dark"?"light":"dark"};bar.appendChild(t)}
  document.body.prepend(bar);
  document.querySelectorAll("[data-pick]").forEach(r=>r.addEventListener("change",()=>set(r.value)));
  set(q.get(attr)||q.get("mood")||d.dataset[attr]||(moods[0]||[])[0]);
})();
