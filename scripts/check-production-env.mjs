/**
 * Fail closed on Vercel production rather than publishing a half-configured app.
 *
 * ## Why the checks are grouped the way they are
 *
 * A missing variable fails in one of two ways, and they need opposite handling:
 *
 * **Hard failure — the site is wrong for everyone.** A build with no API URL, a
 * non-HTTPS API URL, or mocks switched on in production ships an academy whose
 * applications silently vanish. Nothing about that is recoverable at runtime, so
 * the build stops.
 *
 * **Loud warning — the site is degraded but honest.** A build with no GA4 id, no
 * Clarity id, no Turnstile site key or no VAPID key works correctly; it simply
 * cannot measure, cannot block bot sign-ups, or cannot send push notifications.
 * Failing the build for those would mean a content deploy was blocked by a
 * marketing decision. They print a clearly-labelled banner instead, so the gap is
 * visible in the deploy log without being fatal.
 *
 * This distinction did not exist before: everything was either unchecked or
 * fatal, which is how the ad tag ended up dead in production without anybody
 * noticing for an entire release cycle.
 */

const isProduction = process.env.VERCEL_ENV === "production";

const warnings = [];
const failures = [];

/* ------------------------------------------------------------------ *
 * Hard failures — only in a real production deploy
 * ------------------------------------------------------------------ */

if (isProduction) {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
  let url;
  try {
    url = new URL(raw);
  } catch {
    failures.push("Vercel production requires a valid NEXT_PUBLIC_API_URL.");
  }

  if (url) {
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      url.pathname !== "/"
    ) {
      failures.push(
        "NEXT_PUBLIC_API_URL must be an HTTPS API origin without credentials, path, query or fragment.",
      );
    }
  }

  if (process.env.NEXT_PUBLIC_ENABLE_MOCKS === "true") {
    failures.push("Mock mode must not be enabled in Vercel production.");
  }

  if (process.env.NEXT_PUBLIC_APP_ENV !== "prod") {
    warnings.push(
      `NEXT_PUBLIC_APP_ENV is "${process.env.NEXT_PUBLIC_APP_ENV ?? ""}", not "prod". The /status page will show that value to visitors.`,
    );
  }
}

/* ------------------------------------------------------------------ *
 * Soft checks — degraded but functional, warn everywhere
 * ------------------------------------------------------------------ */

const appEnv = process.env.NEXT_PUBLIC_APP_ENV ?? "dev";
if (!["dev", "staging", "prod"].includes(appEnv)) {
  failures.push(`NEXT_PUBLIC_APP_ENV must be dev | staging | prod (received "${appEnv}").`);
}

if (!process.env.NEXT_PUBLIC_GA4_ID) {
  warnings.push(
    "NEXT_PUBLIC_GA4_ID is unset — Google Analytics will not load even after a visitor consents to analytics.",
  );
}

if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && isProduction) {
  warnings.push(
    "NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset — sign-up and application forms will ship without bot protection.",
  );
}

if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY && isProduction) {
  warnings.push(
    "NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY is unset — the payment step will be unavailable in this build.",
  );
}

if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
  warnings.push(
    "NEXT_PUBLIC_VAPID_PUBLIC_KEY is unset — push notifications will not be offered.",
  );
}

if (process.env.NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING !== undefined) {
  warnings.push(
    "NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING is set but no longer read. Tracking and the consent banner are now gated on the visitor's decision, not an env flag. Remove it from the hosting environment.",
  );
}

/* ------------------------------------------------------------------ *
 * Report
 * ------------------------------------------------------------------ */

if (warnings.length > 0) {
  console.warn(`\n[env] ${warnings.length} configuration warning(s) — the build will continue:`);
  for (const warning of warnings) console.warn(`  · ${warning}`);
  console.warn("");
}

if (failures.length > 0) {
  console.error(`\n[env] ${failures.length} configuration error(s) — refusing to build:`);
  for (const failure of failures) console.error(`  · ${failure}`);
  console.error("");
  process.exit(1);
}

// Deliberately silent on success: a clean deploy log should be readable, and a
// check that always prints "OK" trains people to ignore the output entirely.
