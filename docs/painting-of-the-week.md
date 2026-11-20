# Painting of the week: plan

Drafted 20 November 2026 (Andrew: "Yes, plan it"). Nothing is in the game. Goes with the themed weeks in `docs/themed-weeks.md`, which start Sunday 17 January 2027.

## The idea
Each themed week gets one public-domain painting or print that fits its theme. It makes the site feel curated, ties the art to the literature, and gives returning players something new each week without adding more "looks".

## Where it goes (recommended)
**A small plate at the end of the solved screen**, under the note: the painting at about 210 px wide, its title in the look's serif, one sentence on why it fits the week, and "The Metropolitan Museum of Art · public domain · see it at the Met". Mockup: `docs/mockups/painting-of-week.html`, screenshot `docs/mockups/shots/n-painting-placement.jpg`.
- It appears only after solving (or missing), so it is a reward and never a clue.
- It never fights the player's chosen look (Library, Coast, Night) or the line.
- It costs nothing for players who don't scroll there: the image loads only on the solved screen (about 40 KB, 600 px webp).

Also possible, not recommended now: the painting as the whole week's backdrop (it would override the player's chosen look and most paintings are too busy to sit behind text); a thumbnail on each week's heading in the Archive (a nice small addition later, once there are a few weeks).

**Confidence: Lean.** The placement is safe; whether players notice it is a guess until there are players.

## Candidates (first = recommended, second = backup)
All from The Met's Open Access collection: the object record says Public Domain and the image is CC0, free for any use; we credit anyway. Sheet: `docs/mockups/shots/n-painting-candidates.jpg`.

| Week of | Theme | Recommended | Why | Backup |
|---|---|---|---|---|
| 17 Jan | New to the public domain | Vilhelm Hammershøi, *Moonlight, Strandgade 30*, 1900–06 · [Met 441933](https://www.metmuseum.org/art/collection/search/441933) | A closed room, a door, light coming in: works entering the commons. | J. C. Dahl, *Mother and Child by the Sea*, 1830 · [Met 438954](https://www.metmuseum.org/art/collection/search/438954) |
| 24 Jan | First lines | William Bradford, *Shipwreck off Nantucket*, c. 1860–61 · [Met 10209](https://www.metmuseum.org/art/collection/search/10209) | "It was a dark and stormy night": every story starts in weather. | Jean Pillement, *A Shipwreck in a Storm*, 1782 · [Met 437292](https://www.metmuseum.org/art/collection/search/437292) |
| 31 Jan | The Gothic | Caspar David Friedrich, *Two Men Contemplating the Moon*, c. 1825–30 · [Met 438417](https://www.metmuseum.org/art/collection/search/438417) | Romantic moonlight, bare trees, figures from behind: the Gothic mood exactly. | J. C. Dahl, *Two Men before a Waterfall at Sunset*, 1823 · [Met 439344](https://www.metmuseum.org/art/collection/search/439344) |
| 7 Feb | Shakespeare | Peter Simon after Francis Wheatley, *The Enchanted Island before the Cell of Prospero* (Boydell Shakespeare Gallery), 1797 · [Met 365591](https://www.metmuseum.org/art/collection/search/365591) | From the 18th-century gallery built to illustrate every play. | Caroline Watson, *Miranda*, 1784 · [Met 431240](https://www.metmuseum.org/art/collection/search/431240) |
| 14 Feb | Love | Jean Honoré Fragonard, *The Love Letter*, early 1770s · [Met 436322](https://www.metmuseum.org/art/collection/search/436322) | A woman caught reading a letter: love as something read. | Jacob Ochtervelt, *The Love Letter*, early 1670s · [Met 437227](https://www.metmuseum.org/art/collection/search/437227) |
| 21 Feb | In translation | William Blake, *The Circle of the Lustful: Paolo and Francesca* (Dante's *Inferno*), c. 1825–27 · [Met 367367](https://www.metmuseum.org/art/collection/search/367367) | An English poet illustrating an Italian one: translation in pictures. | John Flaxman, *Dante and Virgil in the Suicidal Wood*, 1792–93 · [Met 341693](https://www.metmuseum.org/art/collection/search/341693) |
| 28 Feb | Last lines | John Frederick Kensett, *Twilight on the Sound, Darien, Connecticut*, 1872 · [Met 11329](https://www.metmuseum.org/art/collection/search/11329) | An ending, quietly: the last light on water. | J. F. Kensett, *Sunset Sky*, 1872 · [Met 11326](https://www.metmuseum.org/art/collection/search/11326) |
| 7 Mar | Women writers | Berthe Morisot, *Young Woman Knitting*, c. 1883 · [Met 437159](https://www.metmuseum.org/art/collection/search/437159) | A painting by a woman, of a woman at her own work. | Berthe Morisot, *The Pink Dress*, c. 1870 · [Met 438009](https://www.metmuseum.org/art/collection/search/438009) |

Each line in the "Why" column is a draft caption; Andrew edits the wording before it goes live.

## How it would be built (small, after Andrew picks)
1. A short list in `site/lines.js` beside the lines: for each theme, the image file, title, artist, date, Met link, one-sentence caption, and alt text.
2. Images in `site/weeks/`, 600 px wide webp, about 40 KB each, made from the Met's full-size files. Lazy-loaded.
3. The plate on the solved screen when the day's line has a theme with a painting; nothing changes for lines without one.
4. About page: one sentence that weekly paintings come from the Met's public-domain collection.
5. Checks: contrast, phone width, keyboard, a description for screen readers, the line check.

## Process each week
Pick the painting while drafting that week's lines, so the caption can echo them. Andrew approves the painting and caption with the week's lines. About 10 minutes of his time per week.
