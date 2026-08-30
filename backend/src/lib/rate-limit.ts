/**
 * KV-backed fixed-window rate limiting for Cloudflare Workers.
 * Keys: `rl:<bucket>:<identifier>` → JSON { windowStart, count }.
 * A `RATE_LIMIT` KV namespace must be bound in wrangler.jsonc.
 */

export interface RateLimitConfig {
  /** Max requests allowed per window. */
  limit: number;
  /** Window length in seconds. */
  windowSeconds: number;
}

export class RateLimitExceeded extends Error {
  retryAfterSeconds: number;
  constructor(retryAfterSeconds: number) {
    super("Too many requests.");
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

/** Check + consume one unit. Throws RateLimitExceeded when over the limit. */
export async function rateLimit(
  kv: KVNamespace,
  bucket: string,
  identifier: string,
  { limit, windowSeconds }: RateLimitConfig,
): Promise<void> {
  const key = `rl:${bucket}:${identifier}`;
  const now = Date.now();
  const windowStart = Math.floor(now / 1000 / windowSeconds) * windowSeconds * 1000;
  const raw = await kv.get(key);
  let count = 0;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as { windowStart?: number; count?: number };
      if (typeof parsed.windowStart === "number" && parsed.windowStart === windowStart) {
        count = typeof parsed.count === "number" ? parsed.count : 0;
      }
    } catch {
      count = 0;
    }
  }
  if (count >= limit) {
    const retryAfter = Math.max(1, Math.ceil((windowStart + windowSeconds * 1000 - now) / 1000));
    throw new RateLimitExceeded(retryAfter);
  }
  await kv.put(key, JSON.stringify({ windowStart, count: count + 1 }), {
    expirationTtl: windowSeconds + 60,
  });
}

/** Safe identifier hashing so raw emails/IPs are not stored in KV. */
export async function hashIdentifier(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`rl:${value}`));
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 16);
}
