import type { Context, MiddlewareHandler } from "hono";
import { isAllowedOrigin, type Env, type SessionUser } from "./env.ts";
import { AppError } from "./errors.ts";

/**
 * CORS + security headers.
 *
 * The frontend (Vercel) and the API (Workers) are different origins, and the
 * session travels in a cookie, so this must be an exact allowlist with
 * `credentials: true`. A reflected wildcard (`*`) combined with credentials is
 * both invalid per spec and a cross-site data-theft hole; we never emit it.
 *
 * Mounted on `*` rather than `/v1/*`: an unmatched path still has to answer the
 * preflight and carry the headers, or the browser hides a plain 404 behind a CORS
 * error message. See the mount in `index.ts`.
 */
export function corsMiddleware(): MiddlewareHandler<{ Bindings: Env }> {
  return async (c, next) => {
    const origin = c.req.header("origin");
    const allowed = isAllowedOrigin(c.env, origin);

    if (origin && allowed) {
      c.header("access-control-allow-origin", origin);
      c.header("access-control-allow-credentials", "true");
      c.header("access-control-allow-methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
      c.header("access-control-allow-headers", "Content-Type,Idempotency-Key,X-Requested-With");
      c.header("access-control-max-age", "86400");
    }

    // Emitted whether or not the origin is allowed: the answer differs by Origin,
    // so a cache that ignores this header can serve one origin's reply to another
    // (including a "denied" reply to the real frontend).
    c.header("vary", "Origin", { append: true });

    // A preflight carries no cookie and must never reach the session gate, so
    // it is answered here for every path, allowed origin or not.
    if (c.req.method === "OPTIONS") return c.body(null, 204);
    await next();
  };
}

/** Baseline hardening headers on every response. */
export function securityHeaders(): MiddlewareHandler {
  return async (c, next) => {
    await next();
    c.header("x-content-type-options", "nosniff");
    c.header("x-frame-options", "DENY");
    c.header("referrer-policy", "strict-origin-when-cross-origin");
    c.header("permissions-policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
    // A route may set a stricter policy (the attachment download adds `sandbox`),
    // so this is a floor rather than an override.
    if (!c.res.headers.has("content-security-policy")) {
      c.header(
        "content-security-policy",
        "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
      );
    }
    // Never let an API response or an attachment be interpreted as a page.
    if (!c.res.headers.has("cache-control")) c.header("cache-control", "no-store");
  };
}

/** Attach a per-request id used in logs and error payloads. */
export function requestId(): MiddlewareHandler<{ Variables: { requestId: string } }> {
  return async (c, next) => {
    const id = c.req.header("x-request-id") ?? crypto.randomUUID();
    c.set("requestId", id);
    c.header("x-request-id", id);
    await next();
  };
}

/**
 * Idempotency support for unsafe requests. A client that retries a POST with the
 * same `Idempotency-Key` gets the first response replayed instead of a duplicate
 * invoice — the guard against the double-click / flaky-network duplicate.
 */
export function idempotency(): MiddlewareHandler<{ Bindings: Env; Variables: { user?: SessionUser } }> {
  return async (c, next) => {
    if (c.req.method === "GET" || c.req.method === "HEAD" || c.req.method === "OPTIONS") {
      return next();
    }
    const key = c.req.header("idempotency-key");
    if (!key || key.length < 8 || key.length > 128) return next();

    const userId = c.get("user")?.id ?? "anon";
    const storeKey = `idem:${userId}:${c.req.path}:${key}`;

    try {
      const cached = await c.env.RATE_LIMIT?.get(storeKey);
      if (cached) {
        const parsed = JSON.parse(cached) as { status: number; body: unknown };
        c.header("idempotent-replay", "true");
        return c.json(parsed.body as object, parsed.status as 200);
      }
    } catch {
      // Unparseable cache entry: fall through and execute normally.
    }

    await next();

    if (c.res.status >= 200 && c.res.status < 300) {
      try {
        const cloned = c.res.clone();
        const body = await cloned.json();
        await c.env.RATE_LIMIT?.put(storeKey, JSON.stringify({ status: c.res.status, body }), {
          expirationTtl: 86_400,
        });
      } catch {
        // Caching a replay is best-effort; never fail the request for it.
      }
    }
  };
}

/** Parse `?page=` / `?limit=` into a bounded, safe pagination window. */
export function parsePagination(c: Context, defaults = { page: 1, limit: 25, max: 200 }) {
  const page = clampInt(c.req.query("page"), defaults.page, 1, 100_000);
  const limit = clampInt(c.req.query("limit"), defaults.limit, 1, defaults.max);
  return { page, limit, offset: (page - 1) * limit };
}

function clampInt(value: string | undefined, fallback: number, min: number, max: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

/** Bounded text search term (prevents pathological LIKE patterns). */
export function searchTerm(c: Context, field = "q"): string | null {
  const raw = c.req.query(field)?.trim();
  if (!raw) return null;
  return raw.slice(0, 120).replace(/[%_\\]/g, " ");
}

/**
 * Read a JSON body with a hard size cap. Hono parses the body for us, but an
 * attacker can still send a multi-megabyte payload, so we check the advertised
 * length first and reject before buffering.
 */
export async function jsonBody<T>(c: Context, maxBytes: number): Promise<T> {
  const declared = Number.parseInt(c.req.header("content-length") ?? "0", 10);
  if (Number.isFinite(declared) && declared > maxBytes) {
    throw new AppError("payload_too_large", `Request body exceeds ${maxBytes} bytes.`);
  }
  try {
    return (await c.req.json()) as T;
  } catch {
    throw AppError.validation("Request body must be valid JSON.");
  }
}
