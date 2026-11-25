/**
 * One consent record for every optional third party.
 *
 * ## What was wrong before this file existed
 *
 * There were two independent consent stores:
 *
 *   `cea-cookie-consent`  — written by the banner in
 *                           `components/marketing/cookie-consent.tsx`
 *   `cea:consent`         — written by `lib/ga4.ts`, and the only key that
 *                           AdSense and ngadverts ever read
 *
 * The banner wrote both, so the happy path worked and nobody noticed. But the
 * banner itself is only mounted when `NEXT_PUBLIC_ENABLE_PUBLIC_TRACKING` is
 * `"true"` (`app/providers.tsx`). With the flag off — which is the shipped
 * default, and the only configuration in which a new visitor sees no banner —
 * `lib/ga4.ts` bails before it ever touches storage, so `cea:consent` is never
 * written and no ad unit can ever fill.
 *
 * The result was a site that shows ads to nobody, in either configuration:
 *
 *   flag off → no banner → no consent key → ad units stay invisible
 *   flag on  → banner → consent   → loading is still gated elsewhere
 *
 * ## What this file fixes
 *
 * 1. **The banner is no longer optional.** It mounts unconditionally, because
 *    EEA/UK visitors are legally entitled to refuse, and because a site that
 *    loads nothing optional needs no banner to say so — it simply records the
 *    answer and shows one.
 * 2. **One key.** `cea:consent:v2` is the only thing any loader reads.
 * 3. **Granular.** A visitor may accept analytics and decline advertising, or
 *    the reverse. Both are legitimate choices and the old banner forced them
 *    together.
 * 4. **Survives corridor flakiness.** Storage can throw in private mode or when
 *    the quota is full; the read path falls back to "no decision" rather than
 *    crashing a page.
 * 5. **Re-openable.** A visitor can change their mind from the footer without
 *    clearing site data by hand.
 */

export type ConsentState = {
  /** Advertising (Google AdSense, ngadverts). */
  ads: boolean;
  /** Analytics (GA4, Vercel page analytics). */
  analytics: boolean;
  /** ISO timestamp of the decision — the audit trail a DPIA needs. */
  decidedAt: string;
  /** The policy revision the visitor actually agreed to. */
  version: number;
};

export const CONSENT_STORAGE_KEY = "cea:consent:v2";

/**
 * Bump when the categories or the named processors change. A stored decision
 * from an older version is treated as undecided, so the visitor is asked again
 * rather than silently held to terms they never saw.
 */
export const CONSENT_VERSION = 2;

/** Fired whenever the decision changes so loaders can react without polling. */
export const CONSENT_CHANGED_EVENT = "cea:consent-changed";

/** Fired by the footer button to re-open the banner. */
export const CONSENT_OPEN_EVENT = "cea:consent-open";

/** Legacy keys, read once for migration and then ignored. */
const LEGACY_KEYS = ["cea-cookie-consent", "cea:consent"] as const;

function parse(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<ConsentState>;
    if (typeof value.ads !== "boolean" || typeof value.analytics !== "boolean") return null;
    if (value.version !== CONSENT_VERSION) return null;
    return {
      ads: value.ads,
      analytics: value.analytics,
      decidedAt: typeof value.decidedAt === "string" ? value.decidedAt : new Date(0).toISOString(),
      version: CONSENT_VERSION,
    };
  } catch {
    return null;
  }
}

/**
 * Read the current decision, or null when the visitor has not made one.
 *
 * Safe to call during render only on the client. Everything here is guarded
 * because storage access throws rather than returning null in some browsers,
 * and because a marketing page must never crash over a preference read.
 */
export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const current = parse(window.localStorage.getItem(CONSENT_STORAGE_KEY));
    if (current) return current;

    // Migrate a v1 record: the old key held the literal string "granted".
    for (const key of LEGACY_KEYS) {
      const legacy = window.localStorage.getItem(key);
      if (!legacy) continue;
      if (legacy === "granted" || legacy === "accepted") {
        const migrated: ConsentState = {
          ads: true,
          analytics: true,
          decidedAt: new Date().toISOString(),
          version: CONSENT_VERSION,
        };
        writeConsent(migrated);
        return migrated;
      }
      if (legacy === "denied" || legacy === "dismissed") {
        const migrated: ConsentState = {
          ads: false,
          analytics: false,
          decidedAt: new Date().toISOString(),
          version: CONSENT_VERSION,
        };
        writeConsent(migrated);
        return migrated;
      }
    }
    return null;
  } catch {
    return null;
  }
}

function writeConsent(state: ConsentState) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Private mode or a full quota. The decision still applies for this page
    // view via the event below; it simply will not survive a reload.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: state }));
}

/** Record a decision. Pass `false` for both categories to refuse everything. */
export function saveConsent(choice: { ads: boolean; analytics: boolean }): ConsentState {
  const state: ConsentState = {
    ads: choice.ads,
    analytics: choice.analytics,
    decidedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  if (typeof window !== "undefined") writeConsent(state);
  return state;
}

/** Withdraw everything. Equivalent to `saveConsent({ads:false, analytics:false})`. */
export function denyAllConsent(): ConsentState {
  return saveConsent({ ads: false, analytics: false });
}

export function adsAllowed(): boolean {
  return readConsent()?.ads === true;
}

export function analyticsAllowed(): boolean {
  return readConsent()?.analytics === true;
}

/** Footer affordance: re-open the banner so a decision can be changed. */
export function openConsentPreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}

/** Subscribe to changes. Returns an unsubscribe function. */
export function onConsentChange(handler: (state: ConsentState) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const listener = (event: Event) => {
    const detail = (event as CustomEvent<ConsentState>).detail;
    if (detail) handler(detail);
    else {
      const current = readConsent();
      if (current) handler(current);
    }
  };
  window.addEventListener(CONSENT_CHANGED_EVENT, listener);
  return () => window.removeEventListener(CONSENT_CHANGED_EVENT, listener);
}
