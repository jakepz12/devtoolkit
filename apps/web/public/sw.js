const CACHE_NAME = "devtoolkit-v1";
const STATIC_ASSETS = [
  "/",
  "/dashboard",
  "/portfolio",
  "/retro",
  "/reader",
  "/login",
  "/register",
];

const ARTICLE_CACHE = "devtoolkit-articles-v1";

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== ARTICLE_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip API requests
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  // Skip WebSocket
  if (url.protocol === "ws:" || url.protocol === "wss:") {
    return;
  }

  // Network first for HTML pages
  if (request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // Cache first for static assets
  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request);
    })
  );
});

// Message event for article caching
self.addEventListener("message", (event) => {
  if (event.data.type === "CACHE_ARTICLE") {
    const { url, content } = event.data;
    caches.open(ARTICLE_CACHE).then((cache) => {
      const response = new Response(JSON.stringify(content), {
        headers: { "Content-Type": "application/json" },
      });
      cache.put(url, response);
    });
  }

  if (event.data.type === "GET_CACHED_ARTICLE") {
    const { url } = event.data;
    caches.open(ARTICLE_CACHE).then((cache) => {
      cache.match(url).then((response) => {
        if (response) {
          response.json().then((content) => {
            self.clients.matchAll().then((clients) => {
              clients.forEach((client) => {
                client.postMessage({
                  type: "CACHED_ARTICLE",
                  url,
                  content,
                });
              });
            });
          });
        }
      });
    });
  }
});
