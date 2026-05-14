// Simmer Service Worker — cache-first static, network-first API
const CACHE_NAME = "simmer-v5";
const API_CACHE  = "simmer-api-v5";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json"
];

// ── Install: pre-cache static shell ──────────────────────────────────────────
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// ── Activate: delete old caches ───────────────────────────────────────────────
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== API_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: strategy by request type ──────────────────────────────────────────
self.addEventListener("fetch", event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin + api requests
  if (request.method !== "GET") return;

  // API calls → network-first, cache fallback (5 min TTL)
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirstAPI(request));
    return;
  }

  // Google Fonts, Unsplash images, TheMealDB images → cache-first
  if (
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com" ||
    url.hostname === "images.unsplash.com" ||
    url.hostname === "www.themealdb.com"
  ) {
    event.respondWith(cacheFirstExternal(request));
    return;
  }

  // Static shell → cache-first with network fallback
  event.respondWith(cacheFirstStatic(request));
});

async function networkFirstAPI(request) {
  const cache = await caches.open(API_CACHE);
  try {
    const response = await fetch(request.clone(), { signal: AbortSignal.timeout(35000) });
    if (response.ok) {
      // Tag with timestamp header for TTL check
      const headers = new Headers(response.headers);
      headers.set("x-sw-cached-at", Date.now().toString());
      const tagged = new Response(await response.clone().blob(), {
        status: response.status,
        statusText: response.statusText,
        headers
      });
      cache.put(request, tagged);
    }
    return response;
  } catch {
    // Offline or timeout — try cache
    const cached = await cache.match(request);
    if (cached) {
      const cachedAt = Number(cached.headers.get("x-sw-cached-at") || 0);
      const age = Date.now() - cachedAt;
      if (age < 60 * 60 * 1000) return cached; // accept if < 1 hour old
    }
    // Return a graceful offline JSON
    return new Response(
      JSON.stringify({ error: "offline", message: "No cached data available yet. Connect to the internet to load recipes." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }
}

async function cacheFirstStatic(request) {
  const url = new URL(request.url);
  // Never serve index.html from cache — always fetch fresh so JS updates deploy immediately
  const isHtml = url.pathname === "/" || url.pathname === "/index.html" || !url.pathname.includes(".");
  if (isHtml) {
    try {
      return await fetch(request);
    } catch {
      const fallback = await caches.match("/index.html");
      return fallback || new Response("Offline", { status: 503 });
    }
  }
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const fallback = await caches.match("/index.html");
    return fallback || new Response("Offline", { status: 503 });
  }
}

// ── Push notifications ────────────────────────────────────────────────────────
self.addEventListener("push", event => {
  const data = event.data?.json() || {};
  const title   = data.title || "Simmer 🔥";
  const options = {
    body:    data.body    || "Your personalised recipe picks are waiting.",
    icon:    "/icons/icon-192.png",
    badge:   "/icons/badge-72.png",
    data:    { url: data.url || "/" },
    vibrate: [100, 50, 100],
    tag:     "simmer-daily",
    renotify: true,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

async function cacheFirstExternal(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response("", { status: 503 });
  }
}
