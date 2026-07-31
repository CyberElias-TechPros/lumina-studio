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
  get stripePublishableKey() {
    return import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? "";
  },
  get appEnv() {
    return import.meta.env.VITE_APP_ENV ?? "dev";
  },
  get isProd() {
    return this.appEnv === "prod";
  },
} as const;

/** True when no API URL is configured: all API calls resolve against src/data mocks. */
export const isMockMode = env.apiUrl.length === 0;
