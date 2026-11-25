/**
 * The only module that may inject an optional third-party script.
 *
 * Every loader here obeys the same three rules, in this order:
 *
 *   1. **Never on a signed-in or transactional surface.** `/apply`, `/app`,
 *      `/portal`, `/auth`, `/pay`, `/payment`, `/checkout`, `/certificates` and
 *      `/contact` are checked by prefix before anything else. A session-replay
 *      tool that records a payment form or a support thread is a liability, not
 *      a metric.
 *   2. **Never before consent.** Reads `src/lib/consent.ts`, which is the single
 *      record. No caller may pass "assume yes".
 *   3. **Exactly once.** Each host carries a `data-cea-<tool>` attribute so a
 *      re-render, a client-side navigation or a change of consent cannot append
 *      a second copy of the same tag.
 *
 * Adding a new tool means adding one function here and one entry to
 * `PROCESSORS` below, which is what `src/routes/privacy.tsx` reads to generate
 * the processor table. The two can no longer drift apart, which is how the old
 * AdSense loader ended up running un-declared.
 */

import { readConsent } from "@/lib/consent";

/* ------------------------------------------------------------------ *
 * Route policy
 * ------------------------------------------------------------------ */

/**
 * Prefixes where no optional third party may run, whatever the visitor
 * consented to. Deliberately stricter than the ad registry in
 * `src/lib/ads/slots.ts`: that file governs *placement*, this one governs
 * *execution*, and execution is the riskier of the two.
 */
const PRIVATE_PREFIXES = [
  "/app",
  "/portal",
  "/auth",
  "/apply",
  "/pay",
  "/payment",
  "/checkout",
  "/cart",
  "/certificates",
  "/contact",
  "/editorial/corrections",
] as const;

export function trackingAllowedOnPath(pathname: string): boolean {
  const path = pathname.replace(/\/+$/, "") || "/";
  return !PRIVATE_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

function currentPath(): string {
  return typeof window === "undefined" ? "/" : window.location.pathname;
}

function alreadyLoaded(attribute: string): boolean {
  return Boolean(document.querySelector(`script[${attribute}]`));
}

/* ------------------------------------------------------------------ *
 * Microsoft Clarity — session replay and heatmaps
 * ------------------------------------------------------------------ */

/** Public project id from the Clarity dashboard. Not a secret. */
export const CLARITY_PROJECT_ID = "zj04tsoszk";

const CLARITY_ATTR = "data-cea-clarity";

/**
 * Load Clarity.
 *
 * Clarity is a session-replay product: it records mouse movement, clicks,
 * scroll depth and — depending on configuration — the text on the page. That is
 * materially more invasive than a page-view counter, so it has three additional
 * precautions the original pasted snippet did not have:
 *
 *  - it only runs on consent-clicked analytics;
 *  - it never runs on the private prefixes above, so a learner's payment or
 *    support thread is never recorded;
 *  - **it masks all text by default.** `clarity('set', 'maskText', true)` plus
 *    the `mask-all` bootstrap setting means recordings show layout, clicks and
 *    scroll behaviour but not what anybody typed or read. For a training site
 *    whose pages discuss real fees and account problems, unmasked replay would
 *    be indefensible.
 *
 * Clarity's own snippet installs a queueing stub before the async script lands,
 * which is reproduced here. Without the stub, any `clarity()` call made between
 * mount and script-load is silently dropped.
 */
export function loadClarity(): void {
  if (typeof window === "undefined") return;
  if (readConsent()?.analytics !== true) return;
  if (!trackingAllowedOnPath(currentPath())) return;
  if (alreadyLoaded(CLARITY_ATTR)) return;
  if (!CLARITY_PROJECT_ID) return;

  // Queueing stub: identical contract to the vendor snippet, so calls made
  // before the real script arrives are replayed in order.
  type ClarityQueue = ((...args: unknown[]) => void) & { q?: unknown[][] };
  const w = window as unknown as { clarity?: ClarityQueue };
  if (!w.clarity) {
    const stub: ClarityQueue = (...args: unknown[]) => {
      stub.q = stub.q ?? [];
      stub.q.push(args);
    };
    w.clarity = stub;
  }

  w.clarity("set", "maskText", true);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}?ref=bwt`;
  script.setAttribute(CLARITY_ATTR, CLARITY_PROJECT_ID);
  script.setAttribute("data-clarity-mask", "true");
  document.head.appendChild(script);

  // The vendor script replaces `window.clarity`, so re-assert masking after it
  // has had a chance to initialise.
  script.addEventListener("load", () => {
    try {
      (window as unknown as { clarity?: (...a: unknown[]) => void }).clarity?.(
        "set",
        "maskText",
        true,
      );
    } catch {
      /* masking is also set by the data attribute above */
    }
  });
}

/* ------------------------------------------------------------------ *
 * Google Analytics 4
 * ------------------------------------------------------------------ */

const GA4_ATTR = "data-cea-ga4";

/**
 * Load GA4 for the given measurement id.
 *
 * Consent-mode signals are pushed explicitly. Google's default when a tag loads
 * without them is permissive, so relying on the "we only load after consent"
 * ordering alone would still allow a first hit to fire before the tag's own
 * consent defaults are established.
 */
export function loadGA4(measurementId: string): void {
  if (typeof window === "undefined" || !measurementId) return;
  if (readConsent()?.analytics !== true) return;
  if (!trackingAllowedOnPath(currentPath())) return;
  if (alreadyLoaded(`${GA4_ATTR}="${measurementId}"`)) return;

  type GtagWindow = {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  const w = window as unknown as GtagWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.gtag = (...args: unknown[]) => {
    (w.dataLayer as unknown[]).push(args);
  };

  w.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  w.gtag("js", new Date());
  w.gtag("config", measurementId, {
    anonymize_ip: true,
    allow_google_signals: false,
    cookie_flags: "SameSite=None;Secure",
    send_page_view: true,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.setAttribute(GA4_ATTR, measurementId);
  document.head.appendChild(script);
}

/* ------------------------------------------------------------------ *
 * Google AdSense
 * ------------------------------------------------------------------ */

/** Same publisher id as `ads.txt` and the `google-adsense-account` meta tag. */
export const ADSENSE_CLIENT = "ca-pub-9124992249317290";

const ADSENSE_ATTR = "data-cea-adsense";

/**
 * Load the AdSense tag.
 *
 * Gated on the **ads** category specifically, not analytics: a visitor who
 * allows analytics and declines advertising must not receive ad cookies.
 */
export function loadAdSense(): void {
  if (typeof window === "undefined" || !ADSENSE_CLIENT) return;
  if (readConsent()?.ads !== true) return;
  if (!trackingAllowedOnPath(currentPath())) return;
  if (alreadyLoaded(ADSENSE_ATTR)) return;
  if (document.querySelector(`script[src*="adsbygoogle.js"][src*="${ADSENSE_CLIENT}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  script.setAttribute(ADSENSE_ATTR, ADSENSE_CLIENT);
  document.head.appendChild(script);
}

/* ------------------------------------------------------------------ *
 * Processor register — rendered by /privacy
 * ------------------------------------------------------------------ */

export type Processor = {
  name: string;
  purpose: string;
  category: "analytics" | "advertising";
  /** Where the processor says it stores data. */
  data: string;
  /** Public policy URL, so a reader can verify rather than trust us. */
  policyUrl: string;
  /** Route the loader lives in, so this table can be checked against code. */
  loader: string;
};

/**
 * The authoritative list. `/privacy` renders this directly, so adding a script
 * above without adding it here leaves the policy incomplete — and the
 * `audit:privacy` check fails the build if `load*` functions and this array
 * disagree in count.
 */
export const PROCESSORS: Processor[] = [
  {
    name: "Google Analytics 4",
    purpose: "Counting page views and which pages lead to an application.",
    category: "analytics",
    data: "Google LLC, United States. IP addresses anonymised; advertising signals disabled.",
    policyUrl: "https://policies.google.com/privacy",
    loader: "lib/tracking.ts · loadGA4",
  },
  {
    name: "Microsoft Clarity",
    purpose:
      "Heatmaps and session replay used to find pages where readers get stuck. All page text is masked in recordings.",
    category: "analytics",
    data: "Microsoft Corporation, United States and EU.",
    policyUrl: "https://privacy.microsoft.com/privacystatement",
    loader: "lib/tracking.ts · loadClarity",
  },
  {
    name: "Vercel Web Analytics",
    purpose: "Aggregate page and referrer counts. No cookies, no cross-site tracking.",
    category: "analytics",
    data: "Vercel Inc., United States. Query strings and private routes are stripped before sending.",
    policyUrl: "https://vercel.com/legal/privacy-policy",
    loader: "components/public-analytics.tsx",
  },
  {
    name: "Google AdSense",
    purpose: "Serving the advertisements that fund the free lessons.",
    category: "advertising",
    data: "Google LLC. Uses cookies for ad personalisation unless declined.",
    policyUrl: "https://policies.google.com/technologies/ads",
    loader: "lib/tracking.ts · loadAdSense",
  },
  {
    name: "ngadverts",
    purpose: "Serving Nigerian-market display advertising in lesson and course slots.",
    category: "advertising",
    data: "ngadverts (Nigeria). Cookies set by the network for frequency capping.",
    policyUrl: "https://www.ngadverts.com/",
    loader: "components/marketing/ngadverts.tsx",
  },
];
