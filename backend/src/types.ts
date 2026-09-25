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
  APP_URL: string;
  AI_BASE_URL: string;
  AI_MODEL: string;
}
