# For Andrew to read

New wording that goes out under Andrew's name, written by Claude and not yet read by him. Tick each off (or change it) and tell any Half a Line session; nothing here blocks the site.

## Live now (looks, rooms and the visual pass, 19–20 November 2026)
- **About page, "Looks." paragraph:** "The photographs are in the public domain: the Main Reading Room of the Library of Congress and the Big Sur coast, both by Carol M. Highsmith, and the Milky Way over Spruce Knob, West Virginia by Bill Ingalls for NASA." (`site/app.js`, about())
- **About page, easy-mode paragraph:** last sentence now reads "Looks and light or dark are there too." (`site/app.js`)
- **Settings, "Look" hint:** "A photograph to read in, with its own type and clue pieces. Library and Coast dim to evening in dark mode; Night is always dark." (`site/app.js`, settings())
- **Settings tiles:** Library, "The Library of Congress reading room"; Coast, "Big Sur at dawn"; Night, "The Milky Way; always dark"; High contrast, "No photo, strongest colours".
- **Solved screen:** wrong guesses now read "Not Hamlet" (was a struck-through name).

## Craft pass (live since 20 November 2026)
- **First visit, under the guess box:** "Name the work this line is from. Each wrong guess, or “Next clue,” shows a hint or more of the line." (the old "How to play" sentence without its label and "Got it" button; `site/app.js`, play())
- **Date on the top row:** now short, "Fri, Nov 20".
- **Day 45 (Donne):** "Meditation XVII" is a new title in the guess list and counts as a right answer.
- Still waiting for Andrew's yes, not changed: the line and note fixes listed in `docs/fable-audit-2026-11.md`.

## Painting of the week
Done: Andrew approved plainer, museum-label captions for all ten weeks on 20 Nov 2026 (`site/weeks.js`). The paintings themselves stand as listed in `docs/painting-of-the-week.md`.

## Themed weeks (in branch `claude/lines-151-audit`, not live yet)
- **About page, new second paragraph:** "Some weeks have a theme, such as first lines or the Gothic. The theme is named above the line, and a public-domain painting for the week appears once you solve it." (`site/app.js`, about())
- **New right answers:** "How Do I Love Thee?" (day 89) and "The Elephant's Child" (day 127) count as right, from the craft audit's fair-answers list.

## Credit wording (approved by Andrew 20 Nov 2026, in branch `claude/lines-151-audit`)
- **Footer credit:** "Designed and edited by Andrew Cao" (was "Designed and built by Andrew Cao"); mark and link unchanged (`site/index.html`).
- **About page, last paragraph:** "Designed and edited by Andrew Cao. Drafted with AI assistance and checked against the sources cited." (replaces "Designed and built by Andrew Cao."; the name still links to andrewcao.org; `site/app.js`, about())
