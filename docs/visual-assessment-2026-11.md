# Half a Line: visual assessment

20 November 2026. Review of the live site (`f50669d`, the three looks), on a local copy at 1440 px desktop and 375 px phone, every page (Today fresh, mid-puzzle and solved; Archive; Stats; About; Settings), in Library, Coast and Night. Before/after screenshots: `docs/mockups/shots/m-before-after-frame.jpg`.

## Verdict
The photographs are the strongest thing on the site and should stay. The frame around them was the problem: it used the stock ingredients of generated web design, so the page read as "made by a template" rather than "made by someone". The fix is restraint: solid paper surfaces, hairline rules, one corner shape per look, no glows or gradients, and type doing the work.

## What read as generic, and what changed (on branch `claude/aesthetic-rooms`)
| # | Problem | Fix |
|---|---|---|
| 1 | **Frosted glass** on the top bar, the card and two footer pills. Over a busy photo it leaves muddy blotches inside the card, and it is the single most recognisable "AI design" signature. | Solid paper card and top bar, a soft shadow, a hairline border. |
| 2 | **Rounded pills everywhere** (menu, buttons, input, footer, wrong guesses). | One corner shape per look: Library almost square (2–3 px, like a book plate), Coast soft (10–18 px), Night in between. Current page shown by an underline, not a pill. |
| 3 | **Gradients and glows** on the clue pieces and highlights (sea-glass gradient, night glow, fading hint highlight). | Flat colours: sea-glass is one colour with a fine inner line; night pieces are a quiet slate pane; highlights are solid. |
| 4 | **Code-style result box** (monospace text). | The result reads in the page's own type inside a hairline box. The copied text is unchanged. |
| 5 | **Dashboard stats** (grey boxes, mint and pink bars). | Big numerals on hairline rules, three by two; bars in the look's own tint. |
| 6 | **Mixed type** on the solved screen (a bold green sans "Got it" next to a small serif note). | "Got it with 2 extra clues." is set in the look's display serif; the note is larger and easier to read; Library uses modern numerals so "No. 1" no longer reads "No. I". |
| 7 | **Wrong guesses as pink struck-through pills.** | Plain "Not Hamlet · Not King Lear" in grey. |
| 8 | **Two stacked footer pills.** | One quiet strip with both lines. |
| 9 | The newest hint lost its highlighter in the last change. | The newest hint gets the same highlighter as the newest piece of the line, as in the original design. |

## Image resolution
| Look | Live source | Now | Sizes (desktop / sharp desktop / phone) |
|---|---|---|---|
| Library | 2600 px | **3600 px** Library of Congress copy | 235 / 344 / 117 KB |
| Coast | 2400 px | **3600 px** Library of Congress copy | 96 / 142 / 47 KB |
| Night | **1920 px** (stretched on phones) | **5724 px** NASA original | 203 / 376 / 107 KB |
Desktops now get a 1920 px backdrop, and high-resolution screens (most laptops) get a 2880 px one; phones get a 750 × 1625 crop. Every image is the same public-domain photograph as before. The sharper versions weigh more; they load behind the card, so the game itself still appears at once.

## Should we add more images, or go back to the gallery?
**Recommendation: keep the three photographs, refine them, and add curated art later through themed weeks, not now. Lean**, because it rests on a guess about players.
- **What players want:** most never open Settings, so the default look *is* the game for them. They want the line first, quick to read, and a sense of place; a beautiful, calm Library default delivers that. A wider menu of looks mostly pleases the few who explore.
- **Why not more photos now:** each new look multiplies fonts, colours, pieces, dark versions and checks. Three done well beats eight done loosely, and more choice makes the site feel less curated, not more.
- **Where the gallery idea fits best:** a *painting of the week* that matches the themed week (for example a Gothic ruin for Gothic week), shown small on the solved screen or as the week's backdrop. That is genuinely curated, ties the art to the literature, and reuses the public-domain sources we already use. It needs about one image a week, chosen with each week's lines. Start with week 1 (17 January).
- **Not recommended:** going back to drawn gallery walls; real photographs read as real, drawings read as a game background.

## Checks run on the fixes
Contrast check 560 pairs ≥ 4.5:1 (all surfaces are now solid, so the frosted worst case no longer applies); `node tools/check-lines.js` 0 problems; every look at 1440 and 375 px, fresh, mid-puzzle and solved, Archive, Stats, Settings. Assets at v=8.
