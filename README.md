# Half a Line

A daily literature game: one famous line, revealed a piece at a time. Name the work in as few clues as you can.

Public: https://halfaline.andrewcao.org/ (repo acao-boop/half-a-line; the old address https://acao-boop.github.io/half-a-line/ forwards there). Designed and built by Andrew Cao, listed on https://andrewcao.org/.

- `site/` is the whole website, published by GitHub Pages on every push to `main`. Plain HTML, CSS and JavaScript; no build step.
- `site/lines.js` holds the 60 daily lines and the list of titles players guess from. Day 1 is set in `site/app.js` (`EPOCH`).
- `docs/art/` holds what drew the share card and the hub screenshots (`card.html`, `seed.html`, `icon.html`).
- The review copy of the lines is a Claude spreadsheet: https://claude.ai/artifact/AWQKS9gvRRQYG7ygEKAWRu
