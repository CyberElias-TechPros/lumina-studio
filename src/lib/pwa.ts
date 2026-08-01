import { isMockMode } from "@/lib/env";

const SW_URL = "/sw.js";

/**
 * Registers the service worker (offline app shell + push notifications).
 * Skipped in mock mode (no API URL — local/preview without backend), when the
 * browser doesn't support service workers, or when opted out via
 * data-no-service-worker, so local previews are never surprised by caching.
 */
export function registerServiceWorker(): void {
  if (!("serviceWorker" in navigator)) return;
  if (isMockMode) return;
  if (document.documentElement.dataset.noServiceWorker === "true") return;
  void navigator.serviceWorker.register(SW_URL).catch((error) => {
    console.warn("Service worker registration failed:", error);
  });
}
