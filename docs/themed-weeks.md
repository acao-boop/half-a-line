# Themed weeks: plan (draft, not built)

Drafted 18 November 2026. Nothing here is live. The current 60 lines are a deliberate mix and run to Saturday 16 January 2027. Themed weeks would start with day 61, **Sunday 17 January 2027**, one theme per Sunday-to-Saturday week.

## Why
- A theme gives players a reason to come back all week ("what's the next Gothic line?").
- It makes each weekly batch easier to draft and review: seven lines on one thread.
- It solves the run-out: without new lines the game sits on day 60 after 16 January.

## The cost to plan for
A theme narrows the answer. In a Shakespeare week, "A play from the 1600s" and "Author's initials: W. S." give nothing away and help no one. Themed weeks need **hints written for the theme**: for Shakespeare, comedy/tragedy/history and the plot; for "In translation", the original language and the translator. The data check (`tools/check-lines.js`) stays the same.

## Proposed schedule (eight weeks, days 61 to 116)

| Week of | Days | Theme | Candidate works (not yet in the game unless marked) |
|---|---|---|---|
| 17 Jan | 61–67 | **New to the public domain** (works from 1931, free in the US from 1 January 2027) | Woolf, *The Waves*; Faulkner, *Sanctuary*; Buck, *The Good Earth*; Hammett, *The Glass Key*; Cather, *Shadows on the Rock*; O'Neill, *Mourning Becomes Electra*; Hughes, *The Negro Mother*. Check each one's US public-domain status and first-publication year before drafting. |
| 24 Jan | 68–74 | **First lines** | Bulwer-Lytton, *Paul Clifford* ("It was a dark and stormy night"); Ford, *The Good Soldier*; Barrie, *Peter Pan*; Cervantes, *Don Quixote* (Ormsby, 1885); Sabatini, *Scaramouche*; Burnett, *The Secret Garden*; Forster, *A Passage to India* |
| 31 Jan | 75–81 | **The Gothic** | Walpole, *The Castle of Otranto*; Radcliffe, *The Mysteries of Udolpho*; Austen, *Northanger Abbey* (the parody); Le Fanu, *Carmilla*; Poe, *The Fall of the House of Usher*; James, *The Turn of the Screw*; Collins, *The Woman in White* |
| 7 Feb | 82–88 | **Shakespeare** | *A Midsummer Night's Dream*; *The Merchant of Venice*; *Richard III*; *Henry V*; *Much Ado About Nothing*; *Antony and Cleopatra*; *The Winter's Tale* ("Exit, pursued by a bear") |
| 14 Feb | 89–95 | **Love** (Valentine's week) | E. B. Browning, Sonnet 43; Shakespeare, Sonnet 116; Burns, "A Red, Red Rose"; Byron, "She Walks in Beauty"; Marlowe, "The Passionate Shepherd to His Love"; Dickinson, "Wild nights – Wild nights!"; Rostand, *Cyrano de Bergerac* (Hooker, 1923) |
| 21 Feb | 96–102 | **In translation** | Homer, *The Iliad* (Butler, 1898); Dante, *Inferno* (Longfellow, 1867); Flaubert, *Madame Bovary* (Eleanor Marx-Aveling, 1886); Hugo, *Les Misérables* (Hapgood, 1887); Dostoevsky, *Crime and Punishment* (Garnett, 1914); Voltaire, *Candide* (a pre-1931 translation); Goethe, *Faust* (Bayard Taylor, 1870) |
| 28 Feb | 103–109 | **Last lines** | Hemingway, *The Sun Also Rises* ("Isn't it pretty to think so?"); Hemingway, *A Farewell to Arms*; Joyce, "The Dead"; Dickens, *Great Expectations*; plus last lines of works already played: *A Tale of Two Cities*, *Moby-Dick*, *Frankenstein* |
| 7 Mar | 110–116 | **Women writers** (International Women's Day is 8 March) | Woolf, *A Room of One's Own*; Wollstonecraft, *A Vindication of the Rights of Woman*; Dickinson, "I'm Nobody! Who are you?"; Hurston, "How It Feels to Be Colored Me"; Cather, *O Pioneers!*; Wharton, *The House of Mirth*; Gaskell, *North and South* |

After 13 March: either more themes (first loves of poetry, America, the sea, war, childhood, Russian week) or a return to a mixed fortnight between themes.

## What the game needs (small, build when approved)
1. A `theme` field on each line, and the week's name shown above the line: "This week: The Gothic".
2. The theme in the results card: "Half a Line #75 · The Gothic".
3. Archive grouped by week, so a theme reads as a set.
4. Every work used must be in the title list; add the new ones.

Effort: the code is under an hour. Each week of lines takes a drafting session from Claude plus about 20 minutes of Andrew's review.

## Decisions only Andrew can make
1. **The themes and their order.** The table is a proposal.
2. **Repeats in "Last lines" week.** Three of its works (*A Tale of Two Cities*, *Moby-Dick*, *Frankenstein*) were already answers. Different lines, but players who remember will get them fast. Allow, or swap for new works?
3. **Show the theme to players?** Showing it is the point, but it narrows every guess. The alternative is keeping it hidden and revealing it with the answer.
4. **Start date.** 17 January follows straight on from the current lines; starting later would need a short mixed bridge.

## Recommendation
Go with the eight weeks as listed, show the theme, swap the Last-lines repeats for new works. **Lean**: the schedule is sound and seasonal (public-domain day in January, Valentine's, Women's Day), but whether themes keep players more than a mix does is a guess until there are players to watch.
