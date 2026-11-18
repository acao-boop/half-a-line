// Checks site/lines.js. Run from the repo root: node tools/check-lines.js
global.window = {};
require("../site/lines.js");
const L = window.HAL_LINES, W = window.HAL_WORKS, titles = new Set(W.map(w => w[0]));
let bad = 0;
const seen = new Set();
W.forEach(w => { if (seen.has(w[0])) { console.log("Duplicate title:", w[0]); bad++; } seen.add(w[0]); });
L.forEach((l, i) => {
  const e = [], orders = l.parts.map(p => p[1]).sort((a, b) => a - b), text = l.parts.map(p => p[0]).join(" ");
  if (!orders.every((v, k) => v === k + 1)) e.push("reveal order is not 1.." + l.parts.length);
  if (l.parts.length < 3) e.push("fewer than 3 pieces");
  if (!titles.has(l.work)) e.push("work missing from the title list");
  (l.alias || []).forEach(a => { if (!titles.has(a)) e.push("alias missing from the title list: " + a); });
  if (!new RegExp("\\b" + l.key + "\\b").test(text)) e.push("bonus word not in the line");
  if (!l.tiles.includes(l.key)) e.push("bonus choices lack the bonus word");
  if (!l.hints || l.hints.length !== 3) e.push("needs exactly 3 hints");
  if (!l.note) e.push("no note");
  if (e.length) { bad++; console.log("Day " + (i + 1) + " (" + l.work + "): " + e.join("; ")); }
});
console.log(L.length + " lines, " + W.length + " titles, " + bad + " problems");
process.exit(bad ? 1 : 0);
