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

## Syncing your own cards

Cards, sections and ratings you add live on the device. To keep them safe and get them on every device:

1. In the app: **☰ → Export backup**. A `flashdeck-backup-<date>.json` lands in Downloads.
2. Give that file to Claude (or run `python3 tools/merge_backup.py <backup.json>` yourself), then commit and push `my-deck.json`.
3. Every device that opens the app adds anything from `my-deck.json` it doesn't have yet. Cards you deleted on a device stay deleted there.

Ratings in the backup overwrite the stored ones. Anything you deleted before exporting is removed from `my-deck.json` too.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app (HTML, CSS, JS) |
| `my-deck.json` | Your own cards, sections, categories and ratings, merged from backups |
| `tools/merge_backup.py` | Merges an exported backup into `my-deck.json` |
| `jokes.json` | The built-in jokes (about 30 per category): `{id, cat, q, a, t}`. `t` holds tags; `clean` means it shows in Clean only |
| `manifest.json` | Name, icons and colors used when installing |
| `sw.js` | Service worker that caches the app for offline use |
| `icons/` | App icons |

## Hosting (GitHub Pages)

Repo **Settings → Pages → Build and deployment**: Source *Deploy from a branch*, Branch `main`, folder `/ (root)`. The site appears at `https://sureshnnayak.github.io/flashdeck/` within a minute or two.

## Making changes

Edit files, then bump `VERSION` in `sw.js` (e.g. `flashdeck-v2`) and push. The installed app picks up the change the next time it opens with internet, and shows it on the launch after that. Your cards and ratings are not touched.

Run locally with any static server, e.g. `python3 -m http.server` and open `http://localhost:8000`.
