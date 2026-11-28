/**
 * A browser storage state with consent already decided.
 *
 * ## Why this is a config-level fixture and not a per-spec helper
 *
 * `e2e/helpers.ts` already has a `dismissConsent` fixture that writes
 * `cea:consent:v2` before first paint, and it works — but only for the eight
 * specs that import `./helpers`. Nineteen specs import `@playwright/test`
 * directly and therefore never get it, so the fallback cookie banner mounts on
 * every page and covers the bottom band of the viewport.
 *
 * That asymmetry is not a test-authoring mistake to fix one spec at a time. It
 * is a structural gap: whether a test suite can click a button should not depend
 * on which of two module specifiers its first line happens to use. Doing it once
 * in the config makes all 27 specs behave the same way, and matches what a
 * returning visitor has already done.
 *
 * The value written here is a *refusal* — ads false, analytics false — which is
 * the safe default and the one the production banner records for a visitor who
 * declines. No spec is being given permission it should not have.
 */
import type { FullConfig } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

export const CONSENT_STORAGE_FILE = "e2e/.consent-state.json";

/** The storage state a visitor who refused optional cookies would have. */
export const consentStorageState = {
  cookies: [],
  origins: [
    {
      origin: "http://127.0.0.1:3000",
      localStorage: [
        {
          name: "cea:consent:v2",
          value: JSON.stringify({
            ads: false,
            analytics: false,
            decidedAt: new Date(0).toISOString(),
            version: 2,
          }),
        },
      ],
    },
  ],
};

/**
 * Write the state, retargeted at whatever origin the run is using.
 *
 * `E2E_BASE_URL` is asserted to be a loopback address by e2e/safety.ts, so the
 * origin is always local — this cannot point a test at a live site.
 */
export default function globalSetup(config: FullConfig): void {
  const baseURL = config.projects[0]?.use?.baseURL;
  const origin = typeof baseURL === "string" ? new URL(baseURL).origin : "http://127.0.0.1:3000";
  const state = {
    ...consentStorageState,
    origins: consentStorageState.origins.map((o) => ({ ...o, origin })),
  };
  writeFileSync(join(process.cwd(), CONSENT_STORAGE_FILE), JSON.stringify(state, null, 2));
}
