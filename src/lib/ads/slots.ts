/**
 * Ad slot registry — the placement policy as code.
 *
 * The rule this file enforces is stricter than an ad network's minimum: a unit
 * appears only where the page's primary job is reading, and never where the page
 * exists to take an application, a payment or a booking. Application, payment,
 * checkout, legal, verification, contact and every signed-in surface are
 * permanently ineligible — on transactional pages that is prohibited outright,
 * and on the funnel it is a revenue-negative trade.
 *
 * Nothing here renders. Nothing here loads a script. A slot is a declaration;
 * `src/components/marketing/ngadverts.tsx` may only mount a slot whose
 * declaration matches the current path. `scripts/check-ad-slots.mjs` fails CI if
 * a declaration drifts outside the allowlist, if ad code appears anywhere else,
 * or if a route that must stay clean imports an ad component.
 *
 * ### Why only these pages
 *
 * Only paths that actually resolve can carry an ad. `/glossary`,
 * `/career-guides` and `/resources` are 301 redirects to `/classes` in
 * `vercel.json`, so slot declarations for them would never have rendered — they
 * were removed rather than left looking like coverage.
 *
 * ### One unit per page
 *
 * The ngadverts zone id is baked into the container element id
 * (`adm-container-13225`), so two instances on one page would duplicate an id and
 * fight over the same fill. Each eligible path family therefore declares exactly
 * one `primary` slot — the position the renderer uses — plus alternates that stay
 * declared but do not render. A second unit per page needs a second zone id.
 */

export type AdFormat = "in-article" | "end-of-article" | "sidebar" | "listing";

/**
 * How an allowlist entry matches.
 *
 * - `exact`       the path itself — the blog index, not a lesson.
 * - `descendants` strictly below the path — a lesson, not the index.
 * - `prefix`      the path or anything below it.
 */
export type AdMatch = "exact" | "descendants" | "prefix";

export type AdSlot = {
  id: string;
  /** Only these path prefixes may mount the slot. */
  allow: string[];
  match: AdMatch;
  format: AdFormat;
  /** Reserved height so a late-filling ad cannot shift layout (CLS). */
  minHeightPx: number;
  /**
   * The position rendered for this path family. Exactly one per family; the
   * others document where a second zone would go.
   */
  primary: boolean;
  /** Short human note explaining why the position is defensible. */
  rationale: string;
};

/** Reading surfaces only. Adding a prefix here is an editorial decision, not a layout one. */
export const AD_ELIGIBLE_PREFIXES = ["/blog", "/classes"] as const;

/** Never carry ads, for policy or for product reasons. Checked before any allow match. */
export const AD_INELIGIBLE_PREFIXES = [
  "/apply",
  "/pay",
  "/payment",
  "/shop",
  "/merchant",
  "/cart",
  "/contact",
  "/visit",
  "/partners",
  "/request-project",
  "/certificates",
  "/privacy",
  "/terms",
  "/refunds",
  "/shipping",
  "/accessibility",
  "/about",
  "/schools",
  "/services",
  "/faq",
  "/editorial",
  "/opportunities",
  "/auth",
  "/app",
  "/portal",
  "/status",
] as const;

export const AD_SLOTS: AdSlot[] = [
  {
    id: "lesson-in-article",
    allow: ["/blog"],
    match: "descendants",
    format: "in-article",
    minHeightPx: 280,
    primary: true,
    rationale:
      "After the second section of a lesson, where a reader is pausing anyway and the next step is still below.",
  },
  {
    id: "lesson-end",
    allow: ["/blog"],
    match: "descendants",
    format: "end-of-article",
    minHeightPx: 250,
    primary: false,
    rationale:
      "After the lesson body and before the next-lesson links. Declared for a second zone; not rendered while one zone is configured.",
  },
  {
    id: "blog-index",
    allow: ["/blog"],
    match: "exact",
    format: "listing",
    minHeightPx: 250,
    primary: true,
    rationale:
      "After the first page of lesson cards, below the chapter navigation. A reader who has scrolled the index has found nothing to open yet; the unit is the last thing on the page rather than the first.",
  },
  {
    id: "course-end",
    allow: ["/classes"],
    match: "descendants",
    format: "end-of-article",
    minHeightPx: 250,
    primary: true,
    rationale:
      "Last block on a course page — after the FAQs, after the apply panel, after the closing call to action. Reaches readers who scrolled the whole page and did not apply, without competing with the enrolment action.",
  },
];

/** Hard cap on declarations per page. */
export const MAX_SLOTS_PER_PAGE = 3;

/**
 * Units the renderer may actually place on one page. Constrained by the network
 * zone, not by taste: see the note at the top of this file.
 */
export const MAX_UNITS_PER_PAGE = 1;

/** Trailing slashes are optional in a URL and must not change policy. */
function normalise(pathname: string): string {
  if (!pathname) return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function matchesPrefix(pathname: string, prefix: string): boolean {
  const path = normalise(pathname);
  const base = normalise(prefix);
  if (base === "/") return path === "/";
  return path === base || path.startsWith(`${base}/`);
}

export function adsAllowedOn(pathname: string): boolean {
  const path = normalise(pathname);
  if (AD_INELIGIBLE_PREFIXES.some((prefix) => matchesPrefix(path, prefix))) return false;
  return AD_ELIGIBLE_PREFIXES.some((prefix) => matchesPrefix(path, prefix));
}

function matchesAllow(pathname: string, prefix: string, match: AdMatch): boolean {
  const path = normalise(pathname);
  const base = normalise(prefix);
  if (match === "exact") return path === base;
  if (match === "descendants") return base !== "/" && path.startsWith(`${base}/`);
  return matchesPrefix(path, base);
}

/** The slots a path may mount. Empty array means "no ads on this page". */
export function slotsForPath(pathname: string): AdSlot[] {
  if (!adsAllowedOn(pathname)) return [];
  const matches = AD_SLOTS.filter((slot) =>
    slot.allow.some((prefix) => matchesAllow(pathname, prefix, slot.match)),
  );
  return matches.slice(0, MAX_SLOTS_PER_PAGE);
}

/** Guard used by the renderer: an unknown id or wrong path renders nothing. */
export function slotFor(id: string, pathname: string): AdSlot | null {
  return slotsForPath(pathname).find((slot) => slot.id === id) ?? null;
}

/** The one unit a path actually renders, if any. */
export function primarySlotForPath(pathname: string): AdSlot | null {
  return slotsForPath(pathname).find((slot) => slot.primary) ?? null;
}
