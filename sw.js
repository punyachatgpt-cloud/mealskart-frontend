// Simmer Service Worker — v6
// Strategy per endpoint:
//   recipe endpoints  → stale-while-revalidate (instant cached response + bg refresh)
//   ai / tts / track  → network-only (never cache dynamic AI responses)
//   static shell      → cache-first with network fallback
//   external images   → cache-first (fonts, Unsplash, TheMealDB thumbnails)

const CACHE_NAME = "simmer-v6";
const API_CACHE  = "simmer-api-v6";

const STATIC_ASSETS = ["/", "/index.html", "/manifest.json", "/icon.svg"];

// Paths that get stale-while-revalidate treatment.
// Matched as prefix against request.url pathname.
const SWR_PATHS = [
  "/api/recommend",
  "/api/browse",
  "/api/recipe/",
  "/api/search",
  "/api/meal-plan",
];

// Paths that must always go to the network (no caching).
const NETWORK_ONLY_PATHS = [
  "/api/ai-chat",
  "/api/tts",
  "/api/track",
  "/api/auth/",
];

// Max age we'll serve a stale API response while revalidating (24 h)
const SWR_MAX_STALE_MS = 24 * 60 * 60 * 1000;

// ── Install ───────────────────────────────────────────────────────────────────
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// ── Activate ──────────────────────────────────────────────────────────────────
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== API_CACHE)
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch ─────────────────────────────────────────────────────────────────────
self.addEventListener("fetch", event => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const path = url.pathname;

  // Network-only: AI, TTS, tracking, auth
  if (NETWORK_ONLY_PATHS.some(p => path.startsWith(p))) return;

  // Stale-while-revalidate: recipe endpoints
  if (SWR_PATHS.some(p => path.startsWith(p))) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // External assets: fonts, Unsplash, TheMealDB — cache-first
  if (
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com" ||
    url.hostname === "images.unsplash.com" ||
    url.hostname === "www.themealdb.com"
  ) {
    event.respondWith(cacheFirstExternal(request));
    return;
  }

  // Static shell — cache-first, but never serve stale HTML
  event.respondWith(cacheFirstStatic(request));
});

// ── Stale-while-revalidate ────────────────────────────────────────────────────
async function staleWhileRevalidate(request) {
  const cache = await caches.open(API_CACHE);
  const cached = await cache.match(request);

  // Always kick off a background fetch to keep the cache warm
  const networkFetch = fetch(request.clone(), { signal: AbortSignal.timeout(45000) })
    .then(async response => {
      if (response.ok) {
        const headers = new Headers(response.headers);
        headers.set("x-sw-cached-at", Date.now().toString());
        const tagged = new Response(await response.clone().blob(), {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
        cache.put(request, tagged);
      }
      return response;
    })
    .catch(() => null);

  if (cached) {
    const cachedAt = Number(cached.headers.get("x-sw-cached-at") || 0);
    const age = Date.now() - cachedAt;

    if (age < SWR_MAX_STALE_MS) {
      // Respond with cached data immediately — network fetch updates cache in bg
      return cached;
    }
  }

  // No usable cache — wait for the network
  const response = await networkFetch;
  if (response) return response;

  // Network failed + no cache → graceful offline response
  return new Response(
    JSON.stringify({
      error: "offline",
      message: "No cached data available. Connect to the internet to load recipes.",
    }),
    { status: 503, headers: { "Content-Type": "application/json" } }
  );
}

// ── Static shell (cache-first, never stale HTML) ──────────────────────────────
async function cacheFirstStatic(request) {
  const url = new URL(request.url);
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

// ── External assets (cache-first) ─────────────────────────────────────────────
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

// ── Push notifications ────────────────────────────────────────────────────────
self.addEventListener("push", event => {
  const data = event.data?.json() || {};
  event.waitUntil(self.registration.showNotification(data.title || "Simmer 🔥", {
    body:     data.body    || "Your personalised recipe picks are waiting.",
    icon:     "/icon.svg",
    badge:    "/icon.svg",
    data:     { url: data.url || "/" },
    vibrate:  [100, 50, 100],
    tag:      "simmer-daily",
    renotify: true,
  }));
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
