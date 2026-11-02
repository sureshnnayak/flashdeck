# FlashDeck

Pocket flashcards for jokes, poems and shayari. Swipe up for the next card, tap to reveal the back, rate with stars. Installable on Android as an app and works offline.

## Install on your phone

1. Open `https://sureshnnayak.github.io/flashdeck/` in Chrome.
2. Tap **⋮ → Install app** (or **Add to Home screen → Install**).
3. Open it from the home-screen icon from now on. It works without internet.

## Using it

- **☰** opens the menu: sections → categories → subcategories. Tap ▶ to fold, **+** to add a category or subcategory, **+ New section** for Poems, Shayari, etc.
- **Edit** in the menu deletes your own empty sections and categories and marks them 18+.
- **Clean only** hides 18+ categories (Dirty, Pickup lines and any you mark).
- The yellow **+** adds a card. Leave **Back** empty for poems, so the full text shows.
- **Export backup / Import backup** at the bottom of the menu. Your cards and ratings are stored on the phone, so export now and then.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app (HTML, CSS, JS) |
| `jokes.json` | The 138 built-in jokes: `{id, cat, q, a, t}`. `t` holds tags; `clean` means it shows in Clean only |
| `manifest.json` | Name, icons and colors used when installing |
| `sw.js` | Service worker that caches the app for offline use |
| `icons/` | App icons |

## Hosting (GitHub Pages)

Repo **Settings → Pages → Build and deployment**: Source *Deploy from a branch*, Branch `main`, folder `/ (root)`. The site appears at `https://sureshnnayak.github.io/flashdeck/` within a minute or two.

## Making changes

Edit files, then bump `VERSION` in `sw.js` (e.g. `flashdeck-v2`) and push. The installed app picks up the change the next time it opens with internet, and shows it on the launch after that. Your cards and ratings are not touched.

Run locally with any static server, e.g. `python3 -m http.server` and open `http://localhost:8000`.
