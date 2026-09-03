import type { Env } from "./env.ts";

/**
 * Fixed-window rate limiter on Cloudflare KV.
 *
 * KV writes are eventually consistent and not cheap, so this is a coarse
 * abuse brake rather than a precise quota: it stops credential-stuffing and
 * runaway scripts, and it degrades *open* — if KV is unavailable the request
 * proceeds. Failing closed here would turn a KV blip into a full outage.
 */
export interface RateLimitRule {
  limit: number;
  windowSeconds: number;
}

export const RULES = {
  login: { limit: 10, windowSeconds: 300 },
  register: { limit: 5, windowSeconds: 3600 },
  passwordReset: { limit: 5, windowSeconds: 900 },
  shareView: { limit: 60, windowSeconds: 300 },
  upload: { limit: 60, windowSeconds: 600 },
  write: { limit: 240, windowSeconds: 60 },
  export: { limit: 20, windowSeconds: 300 },
} satisfies Record<string, RateLimitRule>;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
}

export async function checkRateLimit(
  env: Env,
  bucket: keyof typeof RULES | string,
  identifier: string,
  override?: RateLimitRule,
): Promise<RateLimitResult> {
  const rule: RateLimitRule =
    override ?? (RULES as Record<string, RateLimitRule>)[bucket] ?? RULES.write;

  if (!env.RATE_LIMIT) {
    // Binding absent (e.g. a bare local run): allow, do not silently block.
    return { allowed: true, remaining: rule.limit, resetSeconds: rule.windowSeconds };
  }

  const windowStart = Math.floor(Date.now() / 1000 / rule.windowSeconds);
  const key = `rl:${bucket}:${windowStart}:${identifier}`;

  try {
    const current = Number((await env.RATE_LIMIT.get(key)) ?? "0");
    if (current >= rule.limit) {
      const resetSeconds = rule.windowSeconds - (Math.floor(Date.now() / 1000) % rule.windowSeconds);
      return { allowed: false, remaining: 0, resetSeconds: Math.max(1, resetSeconds) };
    }
    await env.RATE_LIMIT.put(key, String(current + 1), { expirationTtl: rule.windowSeconds * 2 });
    return { allowed: true, remaining: rule.limit - current - 1, resetSeconds: rule.windowSeconds };
  } catch {
    return { allowed: true, remaining: rule.limit, resetSeconds: rule.windowSeconds };
  }
}
