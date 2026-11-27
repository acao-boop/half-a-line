# Redesign mock-ups (27 Nov 2026), not for merge

Research: `research.md`. Open each page in a browser; add `#end` to the address to see the solved screen. Contact sheets: `shots/sheet-*.jpg` (phone play, phone end, phone dark, then desktop play and end). Example day: No. 2, Macbeth, one wrong guess in.

All three share the same game changes, borrowed from the top daily games:
- **A visible clue budget** (five marks; one fills per extra clue), replacing "2 of 4 pieces · 0 of 3 hints".
- **No photograph behind the game,** and one designed look instead of three (dark mode and High contrast stay). This undoes the Library / Coast / Night choice from 20 Nov, so it is Andrew's call.
- **Whole play state on one phone screen** (390 × 844), guess box in thumb reach.
- **End screen:** verdict small, the work's title large, the note, then the share slip with the streak beside it.
- **Share text unchanged** (same squares, same wording), so nothing breaks for players.

| | Type | Hidden pieces | Corner | Character |
|---|---|---|---|---|
| **A. Title page** | EB Garamond + Instrument Sans | letterpress blanks (a hairline under the missing words) | 3px | a book's frontispiece; quietest, closest to the NYT games |
| **B. Index card** | Libre Caslon Text + IBM Plex Sans | ink bars on a ruled catalogue card | 2px | most vintage; end screen adds a stamped "clues this week" slip |
| **C. Broadsheet** | Source Serif 4 + Archivo | solid black bars, newest clue in the existing yellow | 0 | newspaper puzzle page; most contemporary, two columns on desktop |

Not covered yet: Archive, Stats, About, Settings, easy mode, the bonus word, the painting of the week, the lift animation. Those follow the picked direction.

## Second pass (27 Nov): Andrew picked A
A now has named ranks (By heart → Last page; a miss is Still reading) leading the end screen and the share text, tinted blanks that ink in on "Next clue" (open the page and press it), and no themed-week chrome. Reasons and the Krillion / Pinpoint / Bracket City notes: end of `research.md`.

## Clean-slate prototype (27 Nov): `prototype.html`
Playable on days 1–10 (real lines from `site/lines.js`; nothing is saved). Every word starts as a blank at its real length, and small linking words show from the start, except in the giveaway piece. Each clue, or wrong guess, inks in the next piece, using the reveal order already in `lines.js`. No trivia hints; "Pick from six" stays as the lifeline. Ranks and share as in A. Open it through a local server (it loads `../../site/lines.js`).
Second round (27 Nov): hidden words are now plain underlines (the tinted boxes looked like fields to type in), and the bonus is typed: after the solve, one word of the line is blank (its length shown), one try, forgiving of capitals and one slip; getting it adds ✒ to the share text.
