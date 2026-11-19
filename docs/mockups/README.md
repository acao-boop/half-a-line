# Aesthetic overhaul: three mockups (19 November 2026)

Mockups only. Nothing here is in `site/` or live. Each page loads the real `site/styles.css`, so the card, fonts and spacing are today's; only colours, the backdrop and the Settings picker change. A black bar at the top of each page switches moods (mockup only).

| Direction | File | Screenshot sheet | Moods |
|---|---|---|---|
| A · Seasons: palettes only | `seasons.html` | `shots/a-seasons.jpg` | Follow the season, Winter, Spring, Summer, Autumn, High contrast; each light and dark |
| B · Rooms: a scene behind the card | `rooms.html` | `shots/b-rooms.jpg` | Reading room, Gallery, Library at night, Autumn garden, Plain, High contrast |
| C · Hours: follows the player's clock | `hours.html` | `shots/c-hours.jpg` | Follow the hour, Dawn, Day, Dusk, Night, High contrast |

## What they share
- **High contrast stays** in all three, unchanged from today.
- **Readable on any backdrop:** the line, hints and buttons sit on the solid card. In Rooms and Hours the header and footer sit on solid plates too, so no text ever sits on a scene. `check-contrast.js` checks every text colour against what it sits on, in every mood: 209 pairs, all at least 4.5:1 (lowest 4.91:1, the Reading room's small grey text). Run `node docs/mockups/check-contrast.js`.
- **Fast on phones:** no images at all. Every backdrop is CSS gradients plus a small inline SVG (the bookshelf, leaves, hedge, stars, season motifs), about 1–3 KB each.
- **Art and licences:** all drawn for this project in CSS and SVG in this session. No third-party art, photos or icons, so there is nothing to license or credit. Fonts are today's (Libre Caslon Text and Manrope, SIL Open Font License).
- **No tracking, no paid services.**
- **Storage:** the choice would be saved under `half-a-line-prefs` like today (for example `{"mood":"library"}`); `half-a-line-v3` (stats) is never touched. Old saved palettes map across: Ink → Plain (or Winter), Sepia → Autumn, Sage → Spring, Rose → Dawn or Spring, High contrast → High contrast.
- **Settings picker:** small previews of each mood instead of today's three-dot swatches, which were the "system settings" feel.

## Honest take: rooms or palettes alone?
**Verdict: Rooms (B) is the one worth building. Lean**, because it's a taste call and because of the phone caveat below.

- **Rooms give the game a place.** Seasons and Hours are good colour work, but they're still "a page in a colour". The Library at night and the Reading room make Half a Line feel like somewhere you go to read, which suits a literature game and sits well beside the portfolio's dark, scholarly sites without copying their look.
- **Phone caveat:** on a 375 px phone the card fills most of the screen, so the room shows mainly as a frame at the top, sides and bottom. Most of the effect is on desktop and tablets, and in screenshots people share. If most players are on phones, Seasons gives about 70% of the mood for less work.
- **Cost:** Rooms is the most CSS (about 3 KB per room) and each room needs an evening version for dark mode (Library at night is already dark; the others would dim their lamps). Seasons is the least work. Hours is in between, but it changes the page under the player at 5 pm and takes away the Light/Dark choice, which some players will dislike. Toss-up between Seasons and Hours for second place.
- **Not recommended:** combining two directions now (for example seasonal rooms). It doubles the moods to maintain; add it later if the rooms land well.

## If a direction is picked: build notes
- Replace the five `[data-palette]` blocks in `site/styles.css` with the chosen moods; keep the set-before-paint script in `index.html` and `404.html`, reading `prefs.mood` and falling back to `prefs.palette`.
- Rooms and Hours need one fixed `<div class="page-scene" aria-hidden="true">` behind `.wrap`, and the header/footer plates.
- Keep the Light / Dark / Match my device choice for Seasons and Rooms; Hours replaces it with "Follow the hour".
- Respect reduced motion (nothing in the mockups moves; keep it that way).
- Re-run `check-contrast.js` against the final colours, then the usual checks: desktop and 375 px, keyboard-only, reduced motion, light and dark. Bump `?v=` on styles.css, lines.js and app.js only.

## D · Rooms by architecture (19 November 2026, after Andrew's art direction)
File `architecture.html`, sheet `shots/d-architecture.jpg`. Andrew's three examples, each styling **the clue pieces themselves**:

| Room | Hidden pieces | Newest clue | Card | Evening (dark mode) |
|---|---|---|---|---|
| Renaissance | green marble plaques, gilt edge | gold leaf | hung in a gilt frame; arches and a marble checker floor behind | candlelit; plaques turn to white marble |
| Mid-century / Scandinavian showroom | bent-plywood blocks (teak layers), rounded | mustard block | clean, rounded, no border; a long teak sideboard, a paper globe lamp, a round wall print | the lamp glows; plywood turns to birch |
| Rustic cabin | pine boards with grain | strip of paper tape | pinned with a red tack; log walls, a snowy window | fire glow from the corner; boards turn pale pine |

- **Lighting, not extra rooms:** Day and Evening follow Light / Dark / Match my device. Seasons could tint the same rooms later (an autumn cabin, a winter Renaissance hall) without adding rooms.
- **Themed weeks (optional, later):** a week could suggest a room ("Gothic week: try the candlelit hall") without switching anyone's choice.
- **Same rules:** all text on solid card colours (contrast check now covers 452 pairs, all at least 4.5:1); no images, CSS and inline SVG only, drawn for this project; High contrast keeps plain black bars and yellow highlight. "Mid-century showroom" is a generic style; no shop names or branding.
- **Relation to the Rooms build on this branch (3fa6852):** if Andrew picks architecture, the Reading room, Gallery and Autumn garden become these three (or join them as more eras: a Victorian library fits), and the piece styling moves into `site/styles.css`. The saving, plates, thumbnails and dark versions already built stay as they are.
