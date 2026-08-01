import { env } from "@/lib/env";

const SW_URL = "/sw.js";

/**
 * Registers the service worker (offline app shell + push notifications).
 * Skipped in mock/dev mode and when the browser doesn't support service
 * workers, so local previews are never surprised by caching.
 */
export function registerServiceWorker(): void {
  if (!("serviceWorker" in navigator)) return;
  if (env.appEnv === "dev") return;
  if (document.documentElement.dataset.noServiceWorker === "true") return;
  void navigator.serviceWorker.register(SW_URL).catch((error) => {
    console.warn("Service worker registration failed:", error);
  });
}
