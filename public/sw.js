const CACHE_NAME = "haja-clean-v3";
const ASSETS = [
  "/",
  "/manifest.json",
  "/icon.png",
  "/apple-icon.png",
  "/favicon.ico",
  "/images/logo.png",
  "/images/gym-tatame.jpeg",
  "/images/tatame-antes.jpeg",
  "/images/tatame-depois.jpeg",
  "/images/cleaning-worker.jpeg",
  "/images/gym-equipment.jpeg",
  "/images/gym-floor-clean.jpeg",
  "/images/products/prod1.jpg",
  "/images/products/prod2.jpg",
  "/images/products/prod3.jpg",
  "/images/products/prod4.jpg",
  "/images/products/prod5.jpg",
  "/images/equipments/eq1.png",
  "/images/equipments/eq2.png",
  "/images/equipments/eq3.png",
  "/images/equipments/eq4.png",
  "/images/equipments/eq5.png"
];

// Install Event
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching static assets");
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[Service Worker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event (Cache-first with network fallback)
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).then((networkResponse) => {
        // Cache newly requested assets if they belong to our origin and are static assets
        if (
          e.request.url.startsWith(self.location.origin) &&
          e.request.method === "GET" &&
          (e.request.url.includes("/_next/static/") || e.request.url.includes("/images/"))
        ) {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, networkResponse.clone());
            return networkResponse;
          });
        }
        return networkResponse;
      });
    }).catch(() => {
      // Fallback for offline mode if asset is not cached
      if (e.request.mode === "navigate") {
        return caches.match("/");
      }
    })
  );
});
