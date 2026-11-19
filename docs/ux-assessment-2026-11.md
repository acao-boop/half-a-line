# Half a Line: layout, functionality and UX assessment

18 November 2026. Read-only review of the live site, https://halfaline.andrewcao.org/, which matches `main` at `bc9b2d4` (SHA-256 of `index.html`, `app.js`, `styles.css` and `lines.js` checked against the repo). Nothing was changed.

**How it was checked:** the in-app browser at desktop width and at 375×812 (phone emulation); light and dark mode; a cleared browser (first-time player); keyboard tab order read from the page; behaviour read from `site/app.js`. Earlier the same day: a full play-through (wrong guess, solve, bonus, note, results card, stats, archive), the 404 page, and a test copy with two made-up themed days. **Not checked:** a real phone, a screen reader, or slow networks.

**Process note:** `bc9b2d4` (theme support) is live and tagged `published`, but this session committed it locally and did not push it. Someone else published it. It is harmless today, because no line has a theme yet and the page renders exactly as before, but Andrew had not approved that publish in this session.

## Verdict
The core loop works and feels like a real daily game: it's quick, clear once you've played one line, and good on phones and in dark mode. Three things matter most: **the line supply runs out on 16 January**, **first-time players on phones see instructions instead of the puzzle**, and **the results card carries no link back to the game**, so sharing doesn't bring new players.

## Findings, ranked by impact

| # | Area | Finding | Recommendation | Confidence |
|---|---|---|---|---|
| 1 | Function | **Lines run out on 16 January.** After day 60 the game shows day 60 forever, with "That's every line so far". Themed weeks are approved and the code is ready, but no themed lines exist yet. | Draft week 1 (17 January) by mid-December and keep about two weeks ahead after that. | Strong: hard deadline, and a stalled daily game looks abandoned. |
| 2 | UX | **Sharing doesn't bring anyone back.** The results text ("Half a Line #1, Solved with 2 extra clues" and squares) has no link to the game, and on phones it can only be copied, not shared. | Add the address to the results text, and on phones use the phone's own share sheet (falling back to copy). | Strong: this is how daily games spread. |
| 3 | Layout | **On a phone, a first-time player sees the "How to play" box, not the puzzle.** At 375×812 the guess box sits at 850 px, below the bottom of the screen, and the line starts at 613 px. | Shrink "How to play" to one sentence with a "More" link, or show it only after a first wrong guess. Returning players are unaffected. | Strong: measured, and first impressions decide whether people come back. |
| 4 | Function | **Pressing Enter on a partial title fails.** Typing "pride" and pressing Enter gives "Pick a title from the list" even though one obvious match is showing. | Enter submits the top suggestion when nothing is highlighted. | Strong: checked live, and it's the most common way people will type. |
| 5 | Content | **Days 11–60 are unreviewed by Andrew.** Days 1–10 are approved. Claude fact-checked all 60 notes and fixed one error, but a wrong literary fact under Andrew's name is the main credibility risk. | Review about a week ahead of the calendar (days 11–17 by 28 November). | Strong |
| 6 | UX | **Reasons to come back are thin but present:** a countdown, a streak, the archive. There's no way to be reminded, and nothing marks the site as an app. | Add a web app manifest so "Add to Home Screen" gives a proper icon and name. Skip email or notifications: they need a server. | Lean: cheap, but the gain is a guess. |
| 7 | Function | **Future lines are reachable.** `#day-45` plays a line that isn't out yet, and `lines.js` contains every answer. | Block `#day-N` beyond today. Accept that the answers are readable in the code: a static site can't hide them, and puzzle sites live with this. | Lean |
| 8 | Accessibility | **The whole card is a live region**, so after each guess a screen reader may re-read the entire card. | Announce only what changed ("Wrong: Emma. New hint: …") in a small dedicated status area. | Lean: not tested with a real screen reader. |
| 9 | UX | **Clue order shows a hint before the next piece.** Andrew asked about this on day one. | Keep as is until friends' results come in. | Toss-up: it changes how hard the game feels, and only play data settles it. |
| 10 | Layout | **"Clear my progress" sits in the footer beside the tagline.** It needs two clicks, so there's no accident risk, but it's oddly prominent. | Move it to the bottom of the Stats page. | Lean |
| 11 | Function | **Stats live in one browser only.** Switching phone or browser loses the streak. | Accept for now: syncing needs accounts and a server, which the project rules exclude. | Strong (to leave it) |

### Themed weeks: before and after 17 January
- **Before:** no line has a theme, so nothing shows: no label, no archive headings. This was checked live and on the test copy.
- **After:** once themed lines are added, the "This week" label, the results-card theme and the archive grouping all work (tested with two made-up Gothic days). The About page should get one sentence about weekly themes when the first ones go in.

### What works (checked)
- Desktop and 375 px phone: no sideways scrolling, and the nav wraps cleanly. Dark mode is fully styled.
- Daily flow: two pieces to start, then hint, piece, hint and so on, all highlighted; the solve screen with work, author, speaker, bonus word and note; the countdown to the next line.
- Search by title or author, arrow keys and Enter on a highlighted suggestion, and clear errors for an empty or unknown guess.
- Archive, stats (played, solved, streaks, average clues, chart) and the results card with copy and a fallback.
- Keyboard: skip link first, then a sensible order (nav, Got it, guess box, Guess, Next clue, footer), with visible focus rings.
- Reduced motion turns the highlight transitions off.
- 404: styled, one heading, `noindex`, status 404. The old GitHub address forwards to the new domain.

## Decision list for Andrew
1. **Results card:** add the game's address, and on phones share through the phone's share sheet? (Recommended. Strong)
2. **Phone first view:** shrink "How to play" so the puzzle shows first? (Recommended. Strong)
3. **Enter on a partial title** picks the top match? (Recommended. Strong)
4. **Block future days** in the address bar? (Recommended. Lean)
5. **Add to Home Screen** icon and name? (Recommended. Lean)
6. **Screen-reader announcements** and **moving "Clear my progress"**: small fixes worth bundling with the above. (Lean)
7. **Clue order** (hint first): leave until there's play data? (Recommended to leave. Toss-up)

Items 1–6 are one short session together, then one publish with Andrew's yes.
