/* CEA: cache only explicit public assets, never workspace HTML or Next.js data. */
const CACHE = "cea-public-v3";
const APP_SHELL = ["/offline.html", "/manifest.webmanifest", "/icon.svg", "/icon-maskable.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key !== CACHE && (key.startsWith("lumina-") || key.startsWith("cea-public-")),
            )
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (
    request.method !== "GET" ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith("/v1/")
  )
    return;
  if (request.mode === "navigate") {
    // Never look up an old private page, even when connectivity disappears.
    event.respondWith(
      fetch(request).catch(async () =>
        (await caches.open(CACHE))
          .match("/offline.html")
          .then(
            (fallback) =>
              fallback ||
              new Response("Connection interrupted. Reconnect to access your account.", {
                status: 503,
                headers: { "Content-Type": "text/plain; charset=utf-8" },
              }),
          ),
      ),
    );
    return;
  }
  const publicAsset = APP_SHELL.includes(url.pathname) || url.pathname.startsWith("/_next/static/");
  if (
    !publicAsset ||
    url.search ||
    request.headers.has("RSC") ||
    request.headers.has("Authorization") ||
    request.headers.has("Range") ||
    (request.headers.get("Accept") || "").includes("text/x-component")
  )
    return;
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      const policy = response.headers.get("Cache-Control") || "";
      const type = response.headers.get("Content-Type") || "";
      if (
        response.status === 200 &&
        !response.redirected &&
        response.type !== "opaque" &&
        !/no-store|private/i.test(policy) &&
        !/text\/html|text\/x-component/i.test(type)
      ) {
        event.waitUntil(cache.put(request, response.clone()).catch(() => {}));
      }
      return response;
    }),
  );
});

// Align browser and Android privacy: push is a hint, not a private message preview.
self.addEventListener("push", (event) => {
  event.waitUntil(
    self.registration.showNotification("CEA update", {
      body: "Open CEA to check your notifications.",
      icon: "/icon.svg",
      badge: "/icon.svg",
      data: { url: "/app/notifications" },
    }),
  );
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = new URL("/app/notifications", self.location.origin).href;
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(async (clients) => {
      const target = clients.find((client) => new URL(client.url).origin === self.location.origin);
      if (target) {
        await target.navigate(url);
        return target.focus();
      }
      return self.clients.openWindow(url);
    }),
  );
});
