// FlashDeck service worker: makes the app open offline.
// Bump VERSION whenever you change files, so phones fetch the new copies.
const VERSION = "flashdeck-v4";
const CORE = [
  "./", "index.html", "jokes.json", "manifest.json",
  "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Serve from cache straight away, then refresh the cache in the background
// (stale-while-revalidate), so the app opens instantly even with no signal.
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (url.origin !== location.origin && !isFont) return;

  // Your synced cards: always try the network first so new syncs show up right away.
  if (url.origin === location.origin && url.pathname.endsWith("/my-deck.json")) {
    e.respondWith(caches.open(VERSION).then(cache =>
      fetch(req).then(res => { if (res.ok) cache.put(req, res.clone()); return res; })
        .catch(() => cache.match(req, { ignoreSearch: true }))
    ));
    return;
  }

  e.respondWith(
    caches.open(VERSION).then(async cache => {
      const key = req.mode === "navigate" ? "./" : req;
      const cached = await cache.match(key, { ignoreSearch: true });
      const network = fetch(req)
        .then(res => { if (res && (res.ok || res.type === "opaque")) cache.put(key, res.clone()); return res; })
        .catch(() => cached);
      return cached || network;
    })
  );
});
