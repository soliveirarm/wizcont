const CACHE_NAME = "v1_cache"
// Minimal offline fallback: cache the main page and entry points
const ASSETS_TO_CACHE = ["/", "/index.html"]

// Install event: cache initial resources
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE)
    }),
  )
})

// Activate event: clean up old caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache)
          }
        }),
      )
    }),
  )
})

// Fetch event: network-first or cache-fallback strategy
self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request)
    }),
  )
})
