const CACHE_NAME = "haja-clean-v6";
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
  "/images/equipments/eq1.jpg",
  "/images/equipments/eq2.jpg",
  "/images/equipments/eq3.jpg",
  "/images/equipments/eq4.jpg",
  "/images/equipments/eq5.jpg",
  "/images/equipments/eq6.jpg",
  "/images/equipments/eq7.jpg",
  "/images/equipments/eq8.jpg",
  "/images/equipments/eq9.jpg"
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

// Fetch Event
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // 1. Bypass Service Worker cache for Next.js hot-reloading (HMR) and development requests
  if (url.pathname.includes("/_next/webpack-hmr") || e.request.method !== "GET") {
    return;
  }

  // 2. Network-first strategy for navigation (HTML) and Next.js static files to prevent outdated assets and blank screens
  if (e.request.mode === "navigate" || url.pathname.startsWith("/_next/")) {
    e.respondWith(
      fetch(e.request)
        .then((networkResponse) => {
          // Cache the latest copy of the page/assets for offline fallback
          if (networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Offline fallback
          return caches.match(e.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            if (e.request.mode === "navigate") {
              return caches.match("/");
            }
          });
        })
    );
    return;
  }

  // 3. Cache-first strategy for local static assets (images, icons, manifest)
  if (
    url.origin === self.location.origin &&
    (url.pathname.startsWith("/images/") ||
      url.pathname.startsWith("/fonts/") ||
      url.pathname === "/manifest.json" ||
      url.pathname.endsWith(".ico") ||
      url.pathname.endsWith(".png"))
  ) {
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(e.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }
});
