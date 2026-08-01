export interface AppEnv {
  DB: D1Database;
  APP_ENV: string;
  FRONTEND_ORIGINS: string;
  PAYSTACK_SECRET_KEY: string;
  AI_API_KEY: string;
  UPLOADS_PRESIGN_URL: string;
  UPLOADS: R2Bucket;
  REALTIME_ROOMS: DurableObjectNamespace;
  FLAGS: KVNamespace;
  VAPID_PUBLIC_KEY: string;
  VAPID_PRIVATE_KEY: string;
}
