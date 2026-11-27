# Redesign research: what the best daily games do (27 Nov 2026)

Andrew's brief: "that clean mix of contemporary and vintage", thinking about the game as well as the look, with the top daily games as the benchmark. Mock-ups in this folder; nothing in `site/` changes.

Open question for Andrew: "krillion" is not a game I can place. Candidates: **Connections** (NYT), **Costcodle**, **Crossclimb** (LinkedIn), **Quordle**. The notes below cover Connections; tell me if you meant another.

## The games, in one line each

| Game | Core loop | What makes it land |
|---|---|---|
| **Wordle** (NYT) | 6 guesses, 5 letters, colour feedback per letter | One screen, no scroll, no instructions needed after one game. The grid *is* the share: 🟩🟨⬜ with no spoilers. Tiles flip in sequence on submit (the only animation that matters). Stats are a small modal: played, win %, streak, a guess-distribution bar chart. Type is plain bold sans (Clear Sans / Karnak). |
| **Connections** (NYT) | 16 words, find four groups of four, 4 mistakes allowed | Mistakes shown as four dots that empty, a quiet, visible budget. Solved groups collapse into a coloured band with the category name. Share is the coloured rows in the order you guessed them, so the story of your game reads at a glance. |
| **Strands / Mini** (NYT) | Find themed words in a grid / a 5×5 crossword | Strands names the theme up front ("Today's theme"), which turns a puzzle into a small subject; Mini's timer is the whole score. Both use the NYT mix: a newspaper serif (Karnak/Cheltenham) for headings, a clean sans for the controls. That serif-for-the-title, sans-for-the-tool split is the exact contemporary–vintage mix in its most familiar form. |
| **Framed** | Name the film from 6 stills, one more each wrong guess | Same loop as ours (progressive reveal, name the work). The reveal is the image: big, centred. Below it, six small numbered squares show where you are. Share: 🎥 🟥🟥🟩⬛⬛⬛. |
| **Worldle / Bandle / Heardle** | Country silhouette / song layers / song clip | Bandle adds one instrument per wrong guess, closest cousin to ours: the clue *accumulates*. Each shows the progress as a row of segments filling left to right, and the end screen gives you the answer big plus one sentence of context. |
| **Costcodle, Gamedle, Bookle-type clones** | Guess X from clues | Show the failure mode: busy cards, gradients, ads, emoji everywhere. What we avoid. |

## The patterns that matter

1. **One screen, no scroll, at 375 × 812.** Every top game fits the whole play state above the fold on a phone. The input is always in thumb reach. Ours: fits now (guess box ends at 662 px), but the card, photo background, nav and meta row compete for the eye.
2. **A visible budget.** Wordle's empty rows, Connections' dots, Framed's six squares. The player always knows how many tries are left. Ours: "2 of 4 pieces · 0 of 3 hints" in small text. Make it a row of marks.
3. **The share is a picture of your game, not a sentence.** Ours already has squares (🟨 per extra clue, 🟩 for the solve, ⬜ for unused, 🟥 for a miss), plus a line of words. Keep the squares; shorten the words.
4. **One moment of motion that shows a state.** Wordle's flip, Connections' collapse. Ours: the bars lifting one at a time. It is our flip; it should be the best-made thing on the page.
5. **The end screen gives the answer big and one sentence of why.** Ours does this well already (the title page and the note); it is our strongest asset over every game above.
6. **Onboarding is one sentence or three pictures, once.** Ours: one sentence, fine.
7. **Chrome is quiet.** A thin top bar with the name centred and two or three icon-free text links. No photographs behind the board. The NYT games use flat colour and a single hairline under the header.
8. **Type does the branding.** Every NYT game uses a serif display face for its name and a sans for everything you touch. Nobody uses a photo.

## Half a Line today, against that

- **Borrow:** the visible budget (a row of marks for pieces and hints), a quieter header, the one-screen rule, a single signature motion (the lift), flat surfaces.
- **Drop:** the photographs behind the card (they are the main reason it reads as a "theme" rather than a designed object, and the source of the glassy feel even now that the glass is gone); the three-looks switch as a front-door choice (keep one designed look, plus dark and High contrast); the meta row of small counts.
- **Keep, ours alone:** the line itself set large in a book serif; the title-page end screen; the note; the bonus word; the painting of the week. Nothing else in the genre ends with a paragraph of literary criticism, and that is the point of the game.

## What "contemporary meets vintage" can mean here

Three readings, one per mock-up:

- **A. Title page.** Printed book: the line set like a frontispiece epigraph, small caps replaced by spaced italics, a single rule, an ornament-free colophon. Contemporary in the controls (clean sans, flat buttons, a progress row of short rules). Closest to the NYT model.
- **B. Index card.** Library catalogue card: ruled lines, a typewriter-era serif for data (not monospace as decoration; a slab used as the house face), a red margin rule, the share text styled as a catalogue stamp. More character, more risk.
- **C. Broadsheet.** Newspaper puzzle page: a tight masthead with the date and number, two-column on desktop (line left, guess and hints right), heavy-and-hairline rule pairs. Most contemporary, the most "daily".
