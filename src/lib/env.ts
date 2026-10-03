/** Public environment values are inlined by Next.js at build time. Keep secrets in the Worker. */
export const env = {
  get apiUrl() {
    return (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");
  },
  get wsUrl() {
    return (process.env.NEXT_PUBLIC_WS_URL ?? "").replace(/\/$/, "");
  },
  get turnstileSiteKey() {
    return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  },
  get vapidPublicKey() {
    return process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "";
  },
  get paystackPublicKey() {
    return process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "";
  },
  get appEnv() {
    return process.env.NEXT_PUBLIC_APP_ENV ?? "dev";
  },
  get isProd() {
    return this.appEnv === "prod";
  },
  /** Explicit opt-in for using the local mock registry in a production build. */
  get mocksEnabled() {
    return process.env.NEXT_PUBLIC_ENABLE_MOCKS === "true";
  },
} as const;

/**
 * Mocks are useful during local development, but must never silently become
 * the production data layer when an environment variable is missing.
 */
export const isMockMode = env.apiUrl.length === 0 && (process.env.NODE_ENV !== "production" || env.mocksEnabled);
