/**
 * Ad slot registry — the placement policy as code.
 *
 * The rule this file enforces is stricter than AdSense's minimum: ads appear only
 * where the page's primary job is reading. Course pages, application, payment,
 * legal, verification and every signed-in surface are permanently ineligible,
 * because an ad there competes with the reason the page exists (and, on
 * transactional pages, is prohibited outright).
 *
 * Nothing here renders. Nothing here loads a script. A slot is a declaration; the
 * renderer (added after approval) may only mount a slot whose declaration matches
 * the current path. `scripts/check-ad-slots.mjs` fails CI if a declaration drifts
 * outside the allowlist, or if ad code appears anywhere else.
 */

export type AdFormat = "in-article" | "end-of-article" | "sidebar" | "listing";

export type AdSlot = {
  id: string;
  /** Only these path prefixes may mount the slot. */
  allow: string[];
  format: AdFormat;
  /** Reserved height so a late-filling ad cannot shift layout (CLS). */
  minHeightPx: number;
  /** Short human note explaining why the position is defensible. */
  rationale: string;
};

/** Reading surfaces only. Adding a prefix here is an editorial decision, not a layout one. */
export const AD_ELIGIBLE_PREFIXES = ["/blog", "/glossary", "/career-guides", "/resources"] as const;

/** Never carry ads, for policy or for product reasons. Checked before any allow match. */
export const AD_INELIGIBLE_PREFIXES = [
  "/apply",
  "/pay",
  "/payment",
  "/classes",
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
  "/accessibility",
  "/editorial",
  "/auth",
  "/app",
  "/portal",
  "/status",
] as const;

export const AD_SLOTS: AdSlot[] = [
  {
    id: "lesson-in-article",
    allow: ["/blog/"],
    format: "in-article",
    minHeightPx: 280,
    rationale:
      "After the second section of a lesson, where a reader is pausing anyway and the next step is still below.",
  },
  {
    id: "lesson-end",
    allow: ["/blog/"],
    format: "end-of-article",
    minHeightPx: 250,
    rationale:
      "After the lesson body and before the next-lesson links, so it never interrupts the task.",
  },
  {
    id: "blog-index",
    allow: ["/blog"],
    format: "listing",
    minHeightPx: 250,
    rationale: "After the first eight lessons in the index, never above the chapter navigation.",
  },
  {
    id: "glossary-term",
    allow: ["/glossary/"],
    format: "end-of-article",
    minHeightPx: 250,
    rationale: "After a definition and its worked example; the page's job is reference reading.",
  },
  {
    id: "guide-sidebar",
    allow: ["/career-guides/", "/resources/"],
    format: "sidebar",
    minHeightPx: 600,
    rationale: "Desktop only, in the margin, never within the reading column.",
  },
];

function matchesPrefix(pathname: string, prefix: string): boolean {
  if (prefix === "/") return pathname === "/";
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function adsAllowedOn(pathname: string): boolean {
  if (AD_INELIGIBLE_PREFIXES.some((prefix) => matchesPrefix(pathname, prefix))) return false;
  return AD_ELIGIBLE_PREFIXES.some((prefix) => matchesPrefix(pathname, prefix));
}

/** The slots a path may mount. Empty array means "no ads on this page". */
export function slotsForPath(pathname: string): AdSlot[] {
  if (!adsAllowedOn(pathname)) return [];
  return AD_SLOTS.filter((slot) => slot.allow.some((prefix) => matchesPrefix(pathname, prefix)));
}

/** Guard used by the future renderer: an unknown id or wrong path renders nothing. */
export function slotFor(id: string, pathname: string): AdSlot | null {
  return slotsForPath(pathname).find((slot) => slot.id === id) ?? null;
}

export const MAX_SLOTS_PER_PAGE = 3;
