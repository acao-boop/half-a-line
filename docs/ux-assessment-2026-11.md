# Half a Line: visibility and functionality assessment

19 November 2026 (second pass; the 18 November pass is summarised at the end). Read-only review of the live site, https://halfaline.andrewcao.org/, which matches `main` at `9832b2b` (SHA-256 of `index.html`, `app.js`, `styles.css`, `lines.js` and `manifest.webmanifest` checked against the repo). Nothing was changed.

**How it was checked:** the in-app browser at 375×812 (phone emulation) and desktop width; dark mode (the browser's own setting) and the Settings page; keyboard-only tab order; headers and files fetched directly; behaviour read from `site/app.js` and `site/styles.css`. **Not checked:** a real phone (so the phone share sheet is still untested), a screen reader, Windows High Contrast, and LinkedIn Post Inspector (it needs a LinkedIn sign-in; see "For Andrew" below).

## Verdict
The game is in good shape for friends and a soft launch: everything from yesterday's list shipped and works, the phone view now shows the puzzle first, and Settings are clean and keyboard-friendly. What stands between it and a wider public launch is mostly outside the code: **the line supply (16 January)**, **Andrew's review of days 11–60**, and **the share preview never having been checked on LinkedIn**. In the code, the one real gap is that **search engines and link previewers that don't run JavaScript see only "Loading today's line…"**.

## What's new since 18 November, checked
- **Settings** (nav, fifth link): five colour sets (Ink, Sepia, Sage, Rose, High contrast), Light / Dark / Match my device, and easy mode. Each is a real radio button or checkbox inside a titled group, so keyboards and screen readers get them right. Choices are saved under `half-a-line-prefs` and applied before the page paints (no flash of the wrong colours). Stats under `half-a-line-v3` are untouched.
- **Easy mode:** six title choices; "Too hard? Pick from six titles" sits under the guess box. A solve through easy mode shares as "(easy mode)".
- **Share:** the result text ends with `halfaline.andrewcao.org`. On touch screens the button says "Share result" and opens the phone's share sheet; elsewhere it copies, with a select-it-yourself fallback.
- **Home Screen:** `manifest.webmanifest` is served, with name, start page, 192 and 512 px icons and the SVG icon. `display: standalone`, so it opens without browser bars.
- **Future days blocked**, **announcements in a small status line**, **"Clear my progress" moved to Stats**: all live.

## Phone (375×812) and desktop
- **Phone first view:** nav at 91–126 px, "How to play" 171–272, the line 365–549, guess box 602–649, Guess button 659–704, the easy-mode link 714–736. The whole puzzle fits on the first screen. No sideways scrolling (page width 375). The nav fits on one line.
- **Desktop:** one centred 720 px column; the line, guess box and both buttons fit well above the fold.
- **Settings on a phone:** the colour buttons wrap to three rows; fine, but the three-dot swatches are 12 px each and hard to tell apart. This is what the aesthetic overhaul replaces (see `docs/mockups/`).

## Keyboard, motion, light and dark
- **Tab order:** skip link → title → Today, Archive, Stats, About, Settings → Got it → guess box → Guess → Next clue → easy-mode link → footer. Logical, and every button and link has a visible 3 px focus ring.
- **Weak spot:** the guess box shows focus only by its border turning blue (1.5 px). It passes, but it's the one control where focus is hard to see, and it's the one people use most.
- **Reduced motion:** turns off the highlight fades (checked in the stylesheet).
- **Dark mode:** fully styled in all five colour sets; the Dark choice in Settings overrides the device.

## Share preview
- `og:image` returns 200, `image/jpeg`, 78 KB, 1200×627, with alt text; `og:` and `twitter:` titles match the page title.
- **Not yet done:** LinkedIn Post Inspector has never been run on the live address (HANDOFF lists it as a next step). It needs Andrew's LinkedIn sign-in.
- **Share sheet:** shares text only. Most apps will turn `halfaline.andrewcao.org` into a link, but passing the address as a proper link as well would give a preview card in Messages and WhatsApp.

## Search basics
| Item | Now | Comment |
|---|---|---|
| Title | "Half a Line" | Fine for people who know the name; says nothing to someone searching "daily literature game". |
| Description | Good, 112 characters | — |
| Canonical | `https://halfaline.andrewcao.org/` | Correct. |
| Robots | No `robots` meta, no `robots.txt` (404) | Both mean "index everything", which is what we want. A sitemap isn't needed for one page. |
| One `<h1>` | Yes | — |
| Page text without JavaScript | **"Loading today's line…"** | Google runs the script, so it sees the game. Bing does sometimes; most link previewers and smaller search engines don't. There's no `<noscript>` text and no plain sentence about the game in the page itself. |
| Structured data | None | Optional. A small `WebApplication` block helps rich results a little. |
| Old address | `acao-boop.github.io/half-a-line/` → 301 to the new one | Correct. |
| 404 | Returns 404 and `noindex` | Correct. |

## Other findings
- **Hidden pieces are in the page as invisible text.** They're hidden from screen readers (`aria-hidden`) and can't be selected, but the browser's Find (Ctrl/Cmd+F) can match them, and **Windows High Contrast mode would very likely show them**, because it overrides the "transparent" text colour. A one-line `forced-colors` style fixes the second; the first would need the hidden words kept out of the page until revealed. Not tested on Windows.
- **Settings say "Saved in this browser"**, the honest version of "no accounts". Good.

## What blocks a wider public launch, ranked
1. **Lines run out on 16 January.** Themed weeks are approved and coded; no themed lines exist yet. Draft week 1 by mid-December. **Strong**: a stalled daily game looks abandoned.
2. **Days 11–60 unreviewed by Andrew.** A wrong literary fact under his name is the main credibility risk. Review about a week ahead. **Strong**
3. **Share preview unchecked on LinkedIn.** Run Post Inspector once (Andrew's sign-in, a few clicks). **Strong**: it's where the portfolio audience will see it first, and a bad card is hard to fix after people have posted.
4. **Non-JavaScript visitors and previewers see "Loading…".** Put one plain sentence about the game (and a `<noscript>` line) in the page, and make the title "Half a Line: a daily literature game". **Lean**: Google is fine already; this mainly helps other engines and previews.
5. **Hidden text can leak** in High Contrast mode and through Find. Add the `forced-colors` rule now; consider keeping hidden words out of the page. **Lean**: few players use either, but it spoils the puzzle when it happens.
6. **Guess box focus is faint.** Give it a focus ring like the buttons'. **Lean**
7. **Share sheet passes text only.** Add the address as a link too. **Toss-up**: most apps already linkify the text.

## For Andrew
- **LinkedIn check (item 3):** open https://www.linkedin.com/post-inspector/, sign in, paste `https://halfaline.andrewcao.org/`, click Inspect. Tell the lead what the card shows.

## 18 November pass (summary)
Found eleven issues. Fixed and live: the share link, the phone first view, Enter on a partial title, the Home Screen icon, blocking future days, screen-reader announcements, and moving "Clear my progress". Still open: lines running out (item 1 above), Andrew's review (item 2), clue order (hint before piece; leave until there's play data, Toss-up), and stats living in one browser only (accept; syncing needs accounts).
