const CACHE_NAME = "kits-one-v4";

const APP_SHELL = [
  "./",
  "./index.html",
  "./css/output.css",
  "./js/app.js",
  "./js/attendance.js",
  "./js/calculator.js",
  "./js/data.js",
  "./js/data-urr26.js",
  "./js/ese-calculator.js",
  "./js/gestures.js",
  "./js/help.js",
  "./site.webmanifest",
  "./manifest.json",
  "./favicon.ico",
  "./assets/brand/icon-192.png",
  "./assets/brand/icon-512.png",
  "./assets/brand/maskable-icon-192.png",
  "./assets/brand/maskable-icon-512.png",
  "./assets/brand/favicon-32.png",
  "./assets/brand/favicon-16.png",
  "./assets/brand/apple-touch-icon-180.png",
  "./assets/brand/favicon-source.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  // Don't intercept analytics or external trackers
  if (request.url.includes("google-analytics.com") || request.url.includes("googletagmanager.com") || request.url.includes("tracker.js")) {
    return;
  }

  // Data files: stale-while-revalidate
  if (request.url.includes("/data") || request.url.endsWith(".json")) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cached) => {
          const fetchPromise = fetch(request)
            .then((response) => {
              if (response && response.status === 200) {
                cache.put(request, response.clone());
              }
              return response;
            })
            .catch(() => cached);
          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  // App shell: cache-first, fall back to network
  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response && response.status === 200 && response.type === "basic") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      });
    })
  );
});
