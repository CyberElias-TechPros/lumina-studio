import type { AppEnv } from "../types";
import { ApiError } from "./errors";

/**
 * Cloudflare Turnstile server-side verification (free human-check service).
 *
 * Enforcement is key-driven: when `TURNSTILE_SECRET_KEY` is configured every
 * protected public form must send a valid token; when it is absent the check
 * is skipped so local/dev/test flows keep working. Rate limits still apply in
 * both modes. Returns `true` when a token was verified.
 */
export async function verifyTurnstile(
  c: { env: AppEnv },
  token: string | undefined | null,
  ip: string,
): Promise<boolean> {
  const secret = c.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;
  if (!token) {
    throw new ApiError(400, "CAPTCHA_REQUIRED", "Please confirm you are human first.");
  }
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      response: token,
      ...(ip && ip !== "unknown" ? { remoteip: ip } : {}),
    }),
  }).catch(() => null);
  const payload = (await res?.json().catch(() => null)) as { success?: boolean } | null;
  if (!payload?.success) {
    throw new ApiError(400, "CAPTCHA_FAILED", "Human verification failed. Please try again.");
  }
  return true;
}

export function clientIpOf(c: { req: { header: (name: string) => string | undefined } }): string {
  return (
    c.req.header("CF-Connecting-IP") ??
    c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
