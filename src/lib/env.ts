export const env = {
  get apiUrl() {
    return (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
  },
  get wsUrl() {
    return (import.meta.env.VITE_WS_URL ?? "").replace(/\/$/, "");
  },
  get turnstileSiteKey() {
    return import.meta.env.VITE_TURNSTILE_SITE_KEY ?? "";
  },
  get vapidPublicKey() {
    return import.meta.env.VITE_VAPID_PUBLIC_KEY ?? "";
  },
  get paystackPublicKey() {
    return import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ?? "";
  },
  get appEnv() {
    return import.meta.env.VITE_APP_ENV ?? "dev";
  },
  get isProd() {
    return this.appEnv === "prod";
  },
  /** Explicit opt-in for using the local mock registry in a production build. */
  get mocksEnabled() {
    return import.meta.env.VITE_ENABLE_MOCKS === "true";
  },
} as const;

/**
 * Mocks are useful during local development, but must never silently become
 * the production data layer when an environment variable is missing.
 */
export const isMockMode = env.apiUrl.length === 0 && (!import.meta.env.PROD || env.mocksEnabled);
