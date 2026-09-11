/** Runtime bindings and variables available to the Worker. */
export interface Env {
  /** Cloudflare D1 database. */
  DB: D1Database;
  /** R2 bucket for attachments and generated PDFs. */
  UPLOADS: R2Bucket;
  /** KV namespace backing the distributed rate limiter. */
  RATE_LIMIT: KVNamespace;

  APP_ENV?: "development" | "test" | "staging" | "production";
  FRONTEND_ORIGINS?: string;
  APP_URL?: string;
  COOKIE_SECURE?: string;
  SESSION_TTL_MINUTES?: string;
  MAX_UPLOAD_BYTES?: string;

  /** Optional: outbound mail for invoice delivery. Absent => mail is skipped, not failed. */
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
}

export type Role = "owner" | "manager" | "staff" | "viewer";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface RequestContext {
  env: Env;
  user: SessionUser;
  requestId: string;
  ip: string | null;
}

export function isProduction(env: Env): boolean {
  return (env.APP_ENV ?? "production") === "production";
}

/**
 * The CORS allowlist, from `FRONTEND_ORIGINS` (comma-separated).
 *
 * Entries are compared to the raw `Origin` header, which never carries a path or
 * a trailing slash — so a trailing slash on an entry can only ever be a typo (it
 * is easy to paste `APP_URL`, which does carry one). Normalise it away rather
 * than silently shipping a frontend that gets no CORS headers.
 *
 * Matching is exact and case-sensitive by design: `*` is treated as a literal
 * entry that matches nothing, never as a wildcard, because credentials are sent.
 */
export function allowedOrigins(env: Env): string[] {
  return (env.FRONTEND_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean);
}

/** Is this request's `Origin` allowed to read the response with credentials? */
export function isAllowedOrigin(env: Env, origin: string | undefined): boolean {
  if (!origin) return false;
  return allowedOrigins(env).includes(origin.replace(/\/+$/, ""));
}

export function sessionTtlMinutes(env: Env): number {
  const parsed = Number.parseInt(env.SESSION_TTL_MINUTES ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 10_080; // 7 days
}

export function maxUploadBytes(env: Env): number {
  const parsed = Number.parseInt(env.MAX_UPLOAD_BYTES ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 10 * 1024 * 1024;
}
