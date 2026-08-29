import { env, isMockMode } from "@/lib/env";
import { apiFetch } from "@/lib/api/client";

const SW_URL = "/sw.js";

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let bin = "";
  for (const byte of bytes) bin += String.fromCharCode(byte);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToArrayBuffer(value: string): ArrayBuffer {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes.buffer as ArrayBuffer;
}

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

/**
 * Subscribes the browser to push notifications and stores the subscription on
 * the backend. No-ops in mock mode, without a VAPID public key, when the
 * `pwa.push` flag is off, or if the user denies permission. Safe to call on
 * every load — it reuses an existing subscription.
 */
export async function subscribeToPush(enabled: boolean): Promise<void> {
  if (!enabled || isMockMode) return;
  if (!env.vapidPublicKey) return;
  if (
    !("serviceWorker" in navigator) ||
    !("PushManager" in window) ||
    !("Notification" in window)
  ) {
    return;
  }
  if (Notification.permission === "denied") return;
  if (Notification.permission === "default") {
    const granted = await Notification.requestPermission();
    if (granted !== "granted") return;
  }
  try {
    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: base64UrlToArrayBuffer(env.vapidPublicKey),
      });
    }
    const p256dh = subscription.getKey("p256dh");
    const auth = subscription.getKey("auth");
    if (!p256dh || !auth) return;
    await apiFetch("/v1/push/subscriptions", {
      method: "POST",
      body: {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: arrayBufferToBase64Url(p256dh),
          auth: arrayBufferToBase64Url(auth),
        },
      },
    });
  } catch (error) {
    console.warn("Push subscription failed:", error);
  }
}
