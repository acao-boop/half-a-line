# Half a Line: content and craft audit

20 November 2026, by Claude (Fable). Stage 1: a proposal for Andrew to pick from. Nothing in `site/` has changed.

What was read: all 60 live lines (`site/lines.js`) and all 91 drafted themed lines for days 61–151 (branch `claude/lines-061-151`, `docs/drafts/lines-061-151.json`), each with its hints, bonus word and note. What was looked at: a local copy identical to the live site (the three main files match the live ones by checksum), on a 375 × 812 phone and on desktop, Library look, dark: first visit, a win, a loss, the share box, Archive, Stats.

Limits, stated plainly: attributions, dates and notes were judged from my own knowledge. Two doubts were checked online (one cleared, one confirmed in part); one could not be checked because the source was down. The quotations themselves were not re-verified, since earlier sessions matched them to named editions character by character.

## Verdict
- **Content:** sound. In 151 lines I found no wrong attribution and nothing embarrassing. There are four factual slips in notes and hints, a handful of weaker ones, and one structural gap (fair answers that would be marked wrong).
- **Craft:** the frame is clean after the visual pass, but the moments are flat. Solving the line changes almost nothing on screen, the answer sits in a small table, and the Archive never shows you the lines you earned.

## Craft proposal, ranked

| # | What | Why | Confidence |
|---|---|---|---|
| 1 | **The answer as a title page.** On a win or a loss, the work's title appears large in the look's serif, with author, year and speaker beneath; the result is said once. The hidden pieces lift in reading order (no motion when the device asks for reduced motion). | The title is what the player was hunting, and today it is 16 px text in a table below the fold. "Solved with 2 extra clues" currently appears three times on one screen. Mockup: `docs/mockups/shots/p-solved-proposed.jpg` (now: `p-solved-now.jpg`). | **Strong**: fixes a real flaw, uses only type and rules. |
| 2 | **Archive as "your lines so far".** A ruled list. A played day shows the line's opening and the work; an unplayed day stays as bars. | Today every day is an identical box reading "No. 3 · Solved". After a month it should read like a commonplace book the player built. Also removes a tile grid, one of the listed tells. Mockup: `p-archive-proposed.jpg` (now: `p-archive-now.jpg`). | **Strong** |
| 3 | **First visit on a phone.** Shrink "How to play" to one sentence and put the two counters on one row, so the guess box is on screen. | Measured today: the line starts at 393 px and the guess box ends at 924 px on an 812 px screen. A new player sees no way to answer. This was fixed on 19 Nov and came back with the larger type. Shot: `p-first-run-now.jpg`. | **Strong** |
| 4 | **Accept fair answers.** Where a line lives inside a larger work, either title counts (see the list under Content). | Marking "Dubliners" wrong for the last line of "The Dead" feels like the game is wrong, not the player. | **Strong** |
| 5 | **Share box tidy.** One row of actions instead of three stacked buttons of different widths; keep the copied text as it is. | The box repeats what is already above it and the buttons look unplanned. Replacing the coloured squares is not recommended: players know what they mean. | **Lean**: mostly taste. |
| 6 | **Stats: no boxes for zero.** Rows with a count of 0 show a plain "0", no chip. | Seven dark chips reading 0 is the last dashboard habit left. | **Lean**: small. |
| 7 | **An opening animation, like the temple on andrewcao.org.** | Not recommended. The line being uncovered piece by piece already is the opening; a second show in front of it would delay the game. | **Toss-up**, leaning no. |

Checked against the no-vibe-coded list: no frosted glass, gradients, glow or decorative monospace remain. Still present: the Archive tile grid (item 2), the zero chips (item 6), the highlighted pill behind the theme name ("This week: …"), and three different corner sizes in one look (hints 8 px, share box 12 px, pieces 3 px in the base styles, partly overridden). One radius per look should be finished when items 1–2 are built.

## Content findings

### Fix (each is wording under Andrew's name, so each needs his yes)
| Day | Work | Problem | Suggested change | Confidence |
|---|---|---|---|---|
| 12 (live) | Ode on a Grecian Urn | Hint says "scenes painted on an ancient vase". Keats's urn is carved marble ("marble men and maidens"). | "carved on an ancient urn" | Strong |
| 70 | Peter Pan | Note says "Five words give away the whole story". "All children, except one, grow up" is six words. | "Six words" | Strong |
| 112 | I'm Nobody! Who are you? | Note says her editors changed "the last word of this line from 'advertise' to 'banish'". Both readings are Dickinson's own (she wrote "banish us" and "advertise" as alternatives), and the word is not last in the line. | Rewrite: she left two versions, and editors have chosen differently. | Strong, from memory; check the Dickinson Archive before changing |
| 93 | The Passionate Shepherd | Year says 1599, note says "the oldest printed text (England's Helicon, 1600)". A shorter version was printed in 1599, so the 1600 text is not the oldest. | "the first full printed text" | Strong |
| 105 | Great Expectations | Dated 1861, but "I saw no shadow of another parting from her" is the later revised wording; the first edition read differently. | Add "(text of the revised edition)" with the year, as days 28, 30 and 32 do. | Lean: the variant is confirmed, the edition year is not |
| 146 | The Souls of Black Folk | The capitals ("Twentieth Century") and full stop match the Forethought; the speaker line says chapter two, where I believe it is lower-case and runs on. Also hint 3 and the note both rest on "double-consciousness". | Say "in the Forethought", and vary the note. | Lean: could not check, source was down |

### Ask Andrew
- **Day 139, the Rubáiyát:** the note says "This game takes its name from this verse." Is that true? If so it is the best note in the set and worth a line on About. If not, it must go.
- **Order of the weeks:** the first themed week, "New to the public domain", is by far the hardest (the drafts mark 1 line of 7 as well known; Shakespeare week has 5). It is also the players' first sight of themes. Opening with "First lines" and running the public-domain week second is safer. **Lean.** If weeks move, six notes that cite a day number ("day 68", "day 22"…) need updating.
- **Last lines week:** the five hard lines come first and the two famous ones (Frost, Eliot) last. Moving one to the Monday gives the week a way in. **Lean.**

### Weaker points
- **Second hints that say nothing:** "Author: traditionally called H." (days 22, 96), "known in English as C." (141), "Author's initial: A." (143). An initial for Homer or Aesop is either useless or a giveaway. A different second hint would be fairer. Also "Lord B." and "Lord T." (92, 150) against "A. T." on day 42.
- **Day 35, The Sign of Four:** the excerpt ends in a question mark because the sentence began earlier ("How often have I said to you that…"). Alone it reads like a typo. Adding the opening words as a piece would fix it.
- **Day 49, David Copperfield:** "David doubts he'll be the hero". He leaves it open; he doesn't doubt it.
- **Days 37 and 94, Dickinson:** "edited by her friends" and "her first editor". The first two books had two editors, Mabel Loomis Todd and T. W. Higginson.
- **Day 118, the Bible:** the solved screen will read "Author: King James Version".
- **Day 147, Wordsworth:** "A poem from the 1800s" reads as the whole century. The note says his wife wrote "the two best lines" without saying they are the first two shown.
- **Day 62, The Good Earth:** "the bestselling novel in America that year" never says which year.
- **Day 60 (live):** the bonus choice "Rescue" is the odd one out among Summer and Morning.

### Fair answers to accept (craft item 4)
The Dead / Dubliners (104) · Sonnets from the Portuguese / "How do I love thee?" (89) · The Bible / Ecclesiastes (118) · The Divine Comedy / Inferno (97) · The Arabian Nights / Ali Baba and the Forty Thieves / One Thousand and One Nights (138) · Aesop's Fables / The Hare and the Tortoise (143) · Just So Stories / The Elephant's Child (127) · I Wandered Lonely as a Cloud / Daffodils (147) · The River-Merchant's Wife / Cathay (142) · Devotions upon Emergent Occasions / Meditation XVII (45, live). The drafts add several of these as separate titles in the guess list, which today would make them wrong answers.

### Looked at and left alone
- Period titles shown as published: "The Negro Mother" (65), "How It Feels to Be Colored Me" (113), "The Negro Speaks of Rivers" (122). The notes handle them with respect. The share text never includes a title.
- Swift's "A Modest Proposal" (53), Faulkner's *Sanctuary* (63), and "topless" as the bonus word for Doctor Faustus (137): all the authors' own words, all explained by their notes.
- Day 143, Aesop: the note says the famous moral is not in Townsend's text. Checked online: correct.
- Day 51, Gray's Elegy: Hardy's *Far from the Madding Crowd* is in the guess list and is a deliberate trap. Fair, since the note explains it.

## Stage 2
Build only what Andrew picks, on this branch, as a pull request. Nothing merges or publishes without his yes in this chat. Content fixes to live lines (days 12, 35, 49, 60) go in the same pull request only if he approves each wording; fixes to days 61–151 are handed to the session that owns that branch.
