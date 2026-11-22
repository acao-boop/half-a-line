# Half a Line: second craft audit

22 November 2026, by Claude: played and drafted on Opus, then reviewed, re-tested and revised on Fable the same day. Stage 1: a proposal for Andrew to pick from. Nothing in `site/` has changed.

Builds on `docs/fable-audit-2026-11.md` (20 Nov; all six craft items and the four content fixes are live) and does not repeat it, `docs/visual-assessment-2026-11.md` or `docs/ux-assessment-2026-11.md`.

**How it was checked:** a local copy of `main` (`f48ec43`, the commit tagged `published`), played in headless Chrome at 375 × 812 and 1440 × 900, with the clock set to pretend days: today (day 5), 17–23 January 2027 (the first themed week), and that Saturday with the whole week played. Library, Coast, Night and High contrast, light and dark; keyboard only; reduced motion on. Wrong guesses, Next clue, running out of clues, a win, the bonus, the share text, Stats, Settings, and a page left open past midnight. The title box was tested with 38 things a player might type. **Not checked:** a real phone, a screen reader, Windows High Contrast.

## Verdict
The game now looks finished; what's left is how it *answers* you. The title box rejects ordinary misspellings and everyday names, a wrong guess is acknowledged at the bottom of the card, the last guess arrives without warning, a page left open overnight never shows the new line, and a themed week never feels like a week. All of it is small, and none of it is a new feature.

## Proposal, ranked

| # | What | Why | Confidence |
|---|---|---|---|
| 1 | **The title box forgives typos and everyday names.** When nothing matches, offer the closest title ("Closest match: Frankenstein"). Accept common short names ("Alice in Wonderland", "Huck Finn", "War & Peace", "Tale of 2 Cities"). List titles that *start* with what you typed before author matches. | Of 38 test entries, these found nothing and showed "No title matches": frankenstien, mary shelly, pride and predjudice, odysey, alice in wonderland, huck finn, war & peace, tale of 2 cities. A player who knows the answer and is told "no match" feels the game is wrong. Also "anna" lists *Black Beauty* (Anna Sewell) above *Anna Karenina*. A spelling slip is not counted as a wrong guess today, and still wouldn't be. Mockup: `docs/mockups/shots/q-title-box.jpg`. | **Strong**: fixes a real flaw, no new look. |
| 2 | **A wrong guess answers where you're looking, and the last guess is named.** Show "Not *Dracula*. A new hint is above." directly under the title box, not at the bottom of the card below the easy-mode link. When the clues run out, the label reads "Last guess. Which work is this from?" | Today the only sign of a wrong guess is a small grey "Not Dracula" under "Too hard?". And when "Next clue" disappears, nothing says the next wrong guess ends the game: in testing, the fifth wrong guess went straight to "Not this time." Losing without warning is the sharpest moment to get wrong. Mockup: `q-wrong-and-last-guess.jpg`. | **Strong** |
| 3 | **A themed week reads as a week.** Replace the yellow highlighted "This week: **New to the public domain**" with a quiet running head in the look's italic: "*New to the public domain* · Tuesday, 3 of 7". On Saturday's solved screen, gather the week: seven days, seven works, your result for each, and "Tomorrow starts a new week: First lines." | The highlighted pill is one of the no-vibe-coded tells, and its yellow is the yellow that means "new piece" in the game, so it reads like a clue. More importantly, nothing tells a player where they are in the week or rounds it off; the theme only shows in Archive headings. The Saturday list is the one reward that spans days, and a reason to come back on Sunday. Mockup: `q-themed-week.jpg`. | **Strong** for the running head; **Lean** for the Saturday list (small, but new). |
| 4 | **The new line arrives by itself.** When midnight passes, or the player comes back to an open tab or the Home Screen app, a finished screen offers “Today’s line is ready” and Today shows the new day. | Tested with the clock: solve at 11:58 pm, wait, and at 12:08 am the page still shows yesterday’s line, and the countdown has restarted at “Next line in 23h 52m”, which is false; the new line is already there. Phones keep tabs and Home Screen apps open for days, so a returning player can meet yesterday’s screen and a wrong clock. | **Strong**: a real fault on the return visit. |
| 5 | **Your streak on the solved screen.** Above "Next line in 14h", one line: "3 days in a row." (only when the streak is 2 or more). | The streak is the main thing that pulls people back to a daily game, and here it lives only on the Stats page. One plain line, no flame or badge. | **Lean**: some players dislike streak pressure; it shows only to those who have one. |
| 6 | **Right author, wrong work.** "Not *Bleak House*, though you have the right author." Still counts as a wrong guess. | Shakespeare has 19 works in the list, Dickens 10, the Brontës 5, Poe 4. Naming the right writer is half an "aha", and today it earns the same grey "Not …" as a wild guess. | **Lean**: a small free nudge, so the game gets slightly easier. |
| 7 | **Share text with a taste of the line.** Add the opening pieces the receiver will see anyway, hidden ones as bars, and a full `https://` link (example below). | As received now, the message is a number, a score and squares; nothing makes a friend want to try. The opening pieces are exactly what everyone sees before guessing, so nothing is spoiled. A full link makes more apps show a preview card. | **Toss-up**: longer text, and long lines need trimming. New wording under Andrew's name. |
| 8 | **Tidy-up: corners, keyboard focus, High Contrast.** The suggestion list under the title box has 10 px corners next to a 2 px box in Library; the Settings look tiles use 14, 9, 10 and 8 px in every look; the skip link 8 px. Set all to the look's own two sizes. After a win or the bonus, move keyboard focus to the work's title or the note. Add one rule so Windows High Contrast can't show hidden pieces. | The first audit asked for one radius per look; these are the last ones (measured on every visible element in all four looks). Measured: after the winning guess and after the bonus, keyboard focus falls back to the page, so a keyboard player must Tab from the top again. The High Contrast leak was flagged on 19 Nov and is still open. | **Strong**: tidy-up; it just reads as more finished. |

Each item is one session's work: plain HTML/CSS/JS, no new services or tracking, no change to `EPOCH` or the `half-a-line-v3` key. Items 1, 2 and 4 touch only `app.js` plus a few lines of CSS; 3 and 5 read progress that is already saved.

### Item 7, as a friend would receive it
Now:
```
Half a Line #5
Solved with 1 extra clue
🟨🟩⬜⬜⬜
halfaline.andrewcao.org
```
Proposed:
```
Half a Line #5
▇▇▇ for I am fearless, and therefore powerful.
Named it with 1 extra clue 🟨🟩⬜⬜⬜
https://halfaline.andrewcao.org
```

## New wording under Andrew's name (needs his yes)
Only for the items he picks, and added to `docs/for-andrew-to-read.md` when built: "Closest match" (1); "Not *X*. A new hint is above." and "Last guess." (2); the running head and "Tomorrow starts a new week: …" (3); "Today's line is ready" (4); "3 days in a row." (5); "though you have the right author" (6); the share text (7). About five minutes of reading in all.

## Not recommended
- **A celebration on a win** (confetti, sound, a bigger animation). The pieces lifting and the title arriving are the moment; more would undo the visual pass.
- **Saying whether "Next clue" gives a hint or a piece.** It adds a decision to every turn for little gain.
- **Hard mode, a timer, or a leaderboard.** New features; a leaderboard needs accounts and a server.
- **Reminders or notifications to come back.** Needs permissions and a service; item 5 does the same job quietly.
- **A streak "freeze" or catch-up days.** Archive already lets people play missed days; changing what counts as a streak would change past stats.
- **Changing the coloured squares.** Players know them; item 7 adds to the message instead.
- **Showing the painting of the week only once a week.** It is the week's plate; repeating it daily is consistent, not noise.

## Checks run for this audit
Played as above; no console errors on any page. Measured: a page left open from 11:58 pm to the next morning (stays on yesterday; countdown restarts); focus after a win and after the bonus (falls back to the page); clue count before a loss (no warning); corner sizes of every visible element in all four looks; 38 title-box entries against the 302 titles. Mockups were made by changing a local page in the browser only, never `site/`.

## Stage 2
Build only what Andrew picks, on a branch, as a pull request. Nothing merges or publishes without his yes.
