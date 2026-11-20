// Small pencil sketch in the footer: Andrew sets the tile "half" into the row "half a line".
// Redrawn every 180 ms so the lines wobble like sketchbook pages. Lines take the page's ink.
// Reduced motion shows one still frame. Paused while off screen or in a hidden tab.
(function () {
  var svg = document.getElementById('footer-figure');
  if (!svg) return;
  var g = svg.querySelector('g');
  var rr = function (a) { return (Math.random() * 2 - 1) * a; };
  var f1 = function (v) { return (+v).toFixed(1); };
  var INK = 1;

  function pencil(d, cx, cy, passes, wmax) {
    passes = passes || 3; wmax = wmax || 0.7;
    var o = '';
    for (var k = 0; k < passes; k++) {
      var w = ((0.6 + Math.random() * wmax) * INK).toFixed(2), op = (0.35 + Math.random() * 0.4).toFixed(2);
      var dash = [20 + Math.random() * 60, 1 + Math.random() * 5, 10 + Math.random() * 40, 1 + Math.random() * 3].map(function (n) { return n.toFixed(0); }).join(' ');
      o += '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="' + w + '" stroke-opacity="' + op + '" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="' + dash + '" stroke-dashoffset="' + (Math.random() * 40).toFixed(0) + '" transform="translate(' + rr(1.1).toFixed(2) + ',' + rr(1.1).toFixed(2) + ') rotate(' + rr(0.6).toFixed(2) + ' ' + cx + ' ' + cy + ')"/>';
    }
    return o;
  }
  var solid = function (d) { return '<path class="catch" d="' + d + '"/>'; };

  var HEAD = 'M100 150 Q88 118 98 84 Q112 44 160 36 Q164 26 172 24 Q170 30 176 34 Q182 22 194 26 Q186 30 190 36 Q228 44 242 76 Q252 100 246 122 Q244 142 256 164 Q242 160 238 150 Q240 166 230 176 Q224 164 226 150 Q222 172 214 180 Q170 196 126 180 Q118 172 114 150 Q116 166 108 176 Q100 164 102 150 Q98 160 84 164 Q96 156 100 150';
  var BANG = 'M108 118 Q122 112 128 132 Q136 110 146 134 Q152 108 162 122 Q166 92 171 70 Q176 92 180 120 Q190 106 196 134 Q204 108 212 130 Q220 112 232 118';
  var BODY = 'M124 272 Q114 226 156 202 L158 176 L182 176 L184 202 Q206 208 214 222 L214 272 Z';
  var LEG = 'M136 270 Q132 298 138 320 Q148 332 164 324 Q166 316 156 314 Q152 296 156 270 Z';
  var part = function (d, cx, cy, passes, w) { return solid(d) + pencil(d, cx, cy, passes, w); };
  var blob = function (x, y, r) { return 'M' + f1(x - r) + ' ' + f1(y) + ' a' + r + ' ' + f1(r * 0.85) + ' 0 1 0 ' + 2 * r + ' 0 a' + r + ' ' + f1(r * 0.85) + ' 0 1 0 ' + (-2 * r) + ' 0'; };
  var hand = function (x, y, r) { return part(blob(x, y, r || 10), x, y, 3, 0.6); };
  var armLine = function (x0, y0, cx, cy, x1, y1) { return pencil('M' + f1(x0) + ' ' + f1(y0) + ' Q' + f1(cx) + ' ' + f1(cy) + ' ' + f1(x1) + ' ' + f1(y1), (x0 + x1) / 2, (y0 + y1) / 2, 3); };
  var body = function () { return solid(BODY) + pencil('M124 272 Q114 226 156 204 L157 194 M183 192 L184 204 Q206 208 214 222', 170, 230); };
  var leg = function (dx, rot) { return '<g transform="translate(' + dx + ' 0) rotate(' + (rot || 0) + ' 146 270)">' + part(LEG, 150, 298) + '</g>'; };

  function eye(cx, st) {
    if (st === 'closed') return pencil('M' + (cx - 8) + ' 150 Q' + cx + ' 154 ' + (cx + 8) + ' 150', cx, 150, 3, 1.2);
    if (st === 'happy') return pencil('M' + (cx - 8) + ' 152 Q' + cx + ' 144 ' + (cx + 8) + ' 152', cx, 150, 3, 1.2);
    var p = { up: [144, 6, 6.5, 0, 0], away: [147, 5.5, 5.6, 2.6, -1], side: [150, 5.5, 4.8, 3, 0] }[st];
    var y = p[0], rx = p[1], ry = p[2], dx = p[3], dy = p[4];
    return '<g transform="translate(' + (dx + rr(0.5)).toFixed(2) + ',' + (dy + rr(0.5)).toFixed(2) + ')"><ellipse cx="' + cx + '" cy="' + (y + 1) + '" rx="' + rx + '" ry="' + ry + '" fill="currentColor" fill-opacity=".85"/><circle class="catch" cx="' + (cx + 2) + '" cy="' + (y - 1) + '" r="1.3"/></g>' +
      pencil('M' + (cx - 9) + ' ' + (y - ry + 1) + ' Q' + cx + ' ' + (y - ry - 2) + ' ' + (cx + 9) + ' ' + (y - ry + 1), cx, y, 2, 1.1);
  }
  var MOUTH = { flat: 'M166 172 Q170 171 174 172', soft: 'M165 171 Q170 174.5 175 171', smile: 'M163 170 Q170 178 177 170' };
  function head(fr) {
    var h = solid(HEAD) + pencil(HEAD, 170, 110, 4) + pencil(BANG, 170, 110, 3) + pencil('M171 72 Q168 106 174 138', 170, 105, 2);
    h += eye(148, fr.eyes) + eye(194, fr.eyes) + pencil(MOUTH[fr.mouth], 170, 172, 2, 1);
    h += pencil('M133 149 a15 12 0 1 0 30 0 a15 12 0 1 0 -30 0 M179 149 a15 12 0 1 0 30 0 a15 12 0 1 0 -30 0', 171, 149, 3, 0.6);
    h += pencil('M163 147 Q171 142 179 147 M133 147 L112 141 M209 147 L230 141', 171, 145, 2, 0.5);
    return h;
  }
  var word = function (x, y, t, size) { return '<text x="' + x + '" y="' + y + '" font-family="Georgia, \'Times New Roman\', serif" font-style="italic" font-size="' + size + '" text-anchor="middle" fill="currentColor" fill-opacity=".82">' + t + '</text>'; };
  var tile = function (x, w, t) { return part('M' + x + ' 250 h' + w + ' v26 h' + (-w) + ' Z', x + w / 2, 263, 2, 0.6) + word(x + w / 2, 269, t, 17); };

  // the row reads "half a line"; he sets "half" into place
  function scene(fr) {
    var s = part('M84 276 H342 V286 H84 Z', 213, 281, 3) + pencil('M98 286 V340 M328 286 V340', 213, 312, 3);
    var b = tile(270, 20, 'a') + tile(294, 42, 'line');
    var hx = 186, hy = 258;
    if (fr.placed) b += tile(222, 44, 'half');
    if (fr.carry) {
      var up = fr.lift ? -30 : -12;
      hx = 235; hy = 248 + up;
      b += '<g transform="translate(0 ' + up + ') rotate(' + (fr.lift ? -7 : -3) + ' 244 263)">' + tile(222, 44, 'half') + '</g>';
    }
    s += '<g transform="translate(-6 0)">' + leg(2, fr.swing) + leg(38, -fr.swing) + body() + armLine(128, 222, 114, 246, 134, 260) + hand(138, 262) + '</g>';
    s += b + armLine(206, 222, (206 + hx) / 2 + 10, (222 + hy) / 2 + 10, hx, hy) + hand(hx, hy, 9);
    s += '<g transform="translate(-6 0) rotate(' + (fr.eyes === 'side' ? 7 : 3) + ' 170 190)">' + head(fr) + '</g>';
    return s;
  }

  var E = function (eyes, mouth, more) { return Object.assign({ eyes: eyes, mouth: mouth || 'soft' }, more || {}); };
  var SEQ = [
    [E('away', 0, { placed: 1 }), 9], [E('closed', 0, { placed: 1 }), 1], [E('side', 'flat', { carry: 1 }), 2], [E('side', 0, { carry: 1, lift: 1 }), 5],
    [E('away', 0, { carry: 1, lift: 1 }), 5], [E('side', 0, { carry: 1 }), 2], [E('up', 'smile', { placed: 1 }), 6], [E('happy', 'smile', { placed: 1 }), 2]
  ];
  var i = 0, t = 0, k = 0, timer = null, onScreen = true;

  function render(still) {
    var shown = svg.getBoundingClientRect().width || 170;
    INK = Math.min(2.4, Math.max(1, 0.8 * 292 / shown)); // hold the pencil at a steady weight at any size
    var fr = Object.assign({}, SEQ[i][0]);
    fr.swing = still ? 0 : [0, 4, 0, -4][Math.floor(k / 3) % 4];
    g.innerHTML = scene(fr);
  }
  render(true);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function tick() { k++; if (++t >= SEQ[i][1]) { t = 0; i = (i + 1) % SEQ.length; } render(false); }
  function start() { if (!timer && onScreen && !document.hidden) timer = setInterval(tick, 180); }
  function stop() { clearInterval(timer); timer = null; }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { onScreen = es[0].isIntersecting; onScreen ? start() : stop(); }).observe(svg);
  } else start();
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
})();
