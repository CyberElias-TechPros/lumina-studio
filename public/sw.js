/* Lumina Studio service worker — app-shell caching + push notification stub. */
const CACHE = "lumina-v1";
const APP_SHELL = ["/", "/manifest.webmanifest", "/icon.svg", "/icon-maskable.svg"];

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
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  /* Never intercept API or cross-origin traffic. */
  if (url.pathname.startsWith("/v1/") || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    /* Network-first for pages: fresh HTML when online, shell when offline. */
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put("/", copy));
          return response;
        })
        .catch(() => caches.match("/")),
    );
    return;
  }

  /* Cache-first for static assets. */
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        }),
    ),
  );
});

/* Push notifications — no-op until the pwa.push flag is on and a subscription
 * endpoint is configured. */
self.addEventListener("push", (event) => {
  if (!event.data) return;
  const payload = event.data.json().catch
    ? event.data.json()
    : { title: "Lumina Studio", body: event.data.text() };
  const { title = "Lumina Studio", body = "", icon = "/icon.svg", badge = "/icon.svg" } = payload;
  event.waitUntil(self.registration.showNotification(title, { body, icon, badge }));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      const target = clients[0];
      if (target) return target.navigate(event.notification.data?.url ?? "/");
      return self.clients.openWindow(event.notification.data?.url ?? "/");
    }),
  );
});
