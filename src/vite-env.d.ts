/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the Cloudflare Worker API. Empty/undefined = mock mode. */
  readonly VITE_API_URL?: string;
  /** WebSocket base URL (wss://…). Used by the realtime layer (Phase 5). */
  readonly VITE_WS_URL?: string;
  /** Cloudflare Turnstile site key (public). */
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  /** Paystack public key (PK key). */
  readonly VITE_PAYSTACK_PUBLIC_KEY?: string;
  /** "dev" | "staging" | "prod". */
  readonly VITE_APP_ENV?: string;
  /** Safety valve; production mocks require the literal string "true". */
  readonly VITE_ENABLE_MOCKS?: string;
  /** VAPID public key (Web Push). */
  readonly VITE_VAPID_PUBLIC_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
