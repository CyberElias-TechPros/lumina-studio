import { env, isMockMode } from "@/lib/env";
import { apiFetch } from "@/lib/api/client";
import { ApiError } from "@/lib/errors";

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

export type PushRegistrationStatus =
  "registered" | "permission-required" | "denied" | "conflict" | "unavailable" | "error";

/** Background refresh never prompts; permission is requested only by an explicit user action. */
export async function subscribeToPush(
  enabled: boolean,
  requestPermission = false,
): Promise<PushRegistrationStatus> {
  if (!enabled || isMockMode || !env.vapidPublicKey) return "unavailable";
  if (!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window))
    return "unavailable";
  if (document.documentElement.dataset.noServiceWorker === "true") return "unavailable";
  if (Notification.permission === "denied") return "denied";
  if (Notification.permission === "default") {
    if (!requestPermission) return "permission-required";
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted")
        return permission === "denied" ? "denied" : "permission-required";
    } catch {
      return "error";
    }
  }
  try {
    const registration = await navigator.serviceWorker.register(SW_URL);
    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: base64UrlToArrayBuffer(env.vapidPublicKey),
      });
    }
    const p256dh = subscription.getKey("p256dh");
    const auth = subscription.getKey("auth");
    if (!p256dh || !auth) return "error";
    await apiFetch("/v1/push/subscriptions", {
      method: "POST",
      body: {
        endpoint: subscription.endpoint,
        keys: { p256dh: arrayBufferToBase64Url(p256dh), auth: arrayBufferToBase64Url(auth) },
      },
    });
    return "registered";
  } catch (error) {
    return error instanceof ApiError && error.status === 409 ? "conflict" : "error";
  }
}

/** Explicit shared-browser recovery. This changes only this browser's local subscription;
 * it never deletes or reassigns another account's server-side record. */
export async function resetBrowserPush(enabled: boolean): Promise<PushRegistrationStatus> {
  if (
    !enabled ||
    isMockMode ||
    !env.vapidPublicKey ||
    !("serviceWorker" in navigator) ||
    document.documentElement.dataset.noServiceWorker === "true"
  )
    return "unavailable";
  if (!("PushManager" in window) || !("Notification" in window)) return "unavailable";
  if (Notification.permission === "denied") return "denied";
  if (Notification.permission !== "granted") return "permission-required";
  try {
    const registration = await navigator.serviceWorker.getRegistration("/");
    const existing = await registration?.pushManager.getSubscription();
    if (existing && !(await existing.unsubscribe())) return "error";
  } catch {
    return "error";
  }
  return subscribeToPush(enabled, false);
}
