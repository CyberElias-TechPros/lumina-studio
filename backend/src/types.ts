export interface AppEnv {
  DB: D1Database;
  APP_ENV: string;
  FRONTEND_ORIGINS: string;
  PAYSTACK_SECRET_KEY: string;
  TURNSTILE_SECRET_KEY?: string;
  GOOGLE_SHEET_WEBHOOK_URL?: string;
  AI_API_KEY: string;
  UPLOADS_PRESIGN_URL: string;
  UPLOADS: R2Bucket;
  REALTIME_ROOMS: DurableObjectNamespace;
  FLAGS: KVNamespace;
  RATE_LIMIT: KVNamespace;
  VAPID_PUBLIC_KEY: string;
  VAPID_PRIVATE_KEY: string;
  EMAIL_PROVIDER: string;
  EMAIL_API_KEY: string;
  EMAIL_FROM: string;
  EMAIL_DOMAIN: string;
  /** Reply-To for transactional mail (e.g. help@cea.ng). */
  EMAIL_REPLY_TO?: string;
  APP_URL: string;
  AI_BASE_URL: string;
  AI_MODEL: string;
  /** Optional Sentry/GlitchTip DSN — enables server error reporting. */
  SENTRY_DSN?: string;
  /** Optional notification inbox; business intake also falls back to EMAIL_REPLY_TO/help@cea.ng. */
  CONTACT_INBOX?: string;
  /** Protects GET /v1/cron/run for manual job triggering (optional). */
  CRON_SECRET?: string;
  /** SMS provider: "termii" (default, Nigeria), "twilio", or "console". */
  SMS_PROVIDER?: string;
  /** Termii API key, or Twilio "ACCOUNT_SID:AUTH_TOKEN". */
  SMS_API_KEY?: string;
  /** Sender ID (Termii, registered) or sending number (Twilio, E.164). */
  SMS_SENDER?: string;
}
