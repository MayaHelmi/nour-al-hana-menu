// Service worker — lets the menu open without internet (the order itself still needs WhatsApp / internet).
// Page, styles and scripts: network first, so changes show right away; the saved copy is used when offline.
// Photos, icons and fonts: saved copy first (they rarely change), refreshed in the background.
// Bump VERSION when the list below changes.
const VERSION = "nah-v1";
const SHELL = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/tokens/tokens.css",
  "assets/css/styles.css",
  "assets/js/i18n.js",
  "assets/js/menu-data.js",
  "assets/js/icons.js",
  "assets/js/app.js",
  "assets/images/logo.jpg",
  "assets/images/menu/p-pizza.jpg",
  "assets/icons/icon-192x192.png",
  "assets/icons/favicon.png",
  "assets/icons/google-maps.svg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const isShell = (url) => url.origin === location.origin && (url.pathname.endsWith("/") || /\.(html|css|js|webmanifest)$/.test(url.pathname));
const isAsset = (url) => /\.(jpg|jpeg|png|webp|svg|woff2?)$/.test(url.pathname) || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.pathname.endsWith(".mp4")) return;   // the hero video streams normally (not saved)

  if (isShell(url)) {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match("index.html")))
    );
    return;
  }

  if (isAsset(url)) {
    e.respondWith(
      caches.match(req).then((hit) => {
        const fresh = fetch(req)
          .then((res) => { if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); } return res; })
          .catch(() => hit);
        return hit || fresh;
      })
    );
  }
});
