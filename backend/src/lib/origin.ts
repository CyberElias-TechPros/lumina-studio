import type { AppEnv } from "../types";

/** Return the explicitly configured browser origins for this deployment. */
export function configuredOrigins(env: Pick<AppEnv, "FRONTEND_ORIGINS">): string[] {
  return (env.FRONTEND_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

/**
 * CORS must never reflect arbitrary origins while credentials are enabled.
 * Development keeps the convenient permissive fallback when no origins were
 * configured; production deliberately fails closed.
 */
export function corsOrigin(
  origin: string | undefined,
  env: Pick<AppEnv, "APP_ENV" | "FRONTEND_ORIGINS">,
): string {
  if (!origin) return "";
  const allowed = configuredOrigins(env);
  if (allowed.length > 0) return allowed.includes(origin) ? origin : "";
  return env.APP_ENV === "production" ? "" : origin;
}

/** Validate browser-originated state-changing requests independently of CORS. */
export function isTrustedOrigin(
  origin: string | undefined,
  env: Pick<AppEnv, "APP_ENV" | "FRONTEND_ORIGINS">,
): boolean {
  if (!origin) return true;
  return corsOrigin(origin, env) === origin;
}
