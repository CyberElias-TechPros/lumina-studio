/**
 * Glossary term destinations — pure data, no framework imports.
 *
 * Kept separate from `legacy-public.ts` so the redirect table can be tested
 * without pulling the router into a Node test context, and so the reasoning
 * below sits next to the table it explains.
 */

/** The neutral fallback, mirrored from SchoolDest in `legacy-public.ts`. */
export type SchoolDest = "/classes" | "/about" | "/contact" | "/visit" | "/admissions";

/**
 * Where a term's knowledge actually lives now.
 *
 * ## Why this file exists
 *
 * Every `/glossary/$slug` URL used to 301 unconditionally to `/classes`: a
 * course list that answers none of the questions the glossary pages rank for.
 * In the six months to 23 November 2026 those URLs were served, indexed and
 * ranked — **506 impressions and 0 clicks**, including position 2.04 for
 * "vulnerability assessment" (172 impressions) and position 4.13 for "what is
 * zero trust security" (189 impressions). A page that Google ranks and then
 * refuses to show is worse than a page that never ranked.
 *
 * ## Why not simply un-redirect the glossary
 *
 * Because the removal was deliberate quality control, not an accident. The
 * glossary was retired as an SEO farm during the AdSense low-value remediation,
 * and re-publishing 62 short term pages to catch impressions would restore the
 * problem that removal fixed.
 *
 * ## The rule this implements
 *
 * Keep the redirect, change the destination. A term with a real page behind it
 * goes there; a term without one keeps the neutral fallback. This is also why
 * the map is explicit rather than generated: auto-mapping every slug to a
 * generic hub would produce a wall of irrelevant redirects, which is the same
 * defect wearing a different hat.
 *
 * Before adding a line here, check three things:
 *   1. the database row (this map) and the route (a page file) both exist;
 *   2. the destination actually answers the query — not "is loosely related";
 *   3. the destination is indexable and linked from somewhere real.
 */

/** Slugs whose route may be rendered rather than redirected. */
const RENDERED_GLOSSARY = new Set<string>();

export function isGlossaryRouteRendered(slug: string): boolean {
  return RENDERED_GLOSSARY.has(slug);
}

/**
 * Term → the page that answers it.
 *
 * Only terms with evidence in Search Console of ranking on page one are listed,
 * plus a small number whose query is unambiguous. Everything else falls through
 * to the neutral destination below.
 */
export const GLOSSARY_DESTINATIONS: Record<string, { to: string; why: string }> = {
  // 189 impressions at position 4.13 for "what is zero trust security".
  "zero-trust": {
    to: "/blog/zero-trust-in-plain-words",
    why: "A dedicated companion article written for exactly this query, already indexable.",
  },
  // 172 impressions at position 2.04 for "vulnerability assessment" — the best
  // ranking this property owns, going to a course list that answers none of it.
  "vulnerability-assessment": {
    to: "/blog/what-a-vulnerability-assessment-is",
    why: "Dedicated companion article: what an assessment is, how to rank findings, what it is not.",
  },
  // 35 impressions at position 3.91 for "what is a digital signature".
  "digital-signature": {
    to: "/blog/signed-or-just-a-picture",
    why: "Companion article on signature image vs scan vs cryptographic signature.",
  },
  // 5 impressions at position 5.2; the same distinction, argued for a buyer.
  pki: {
    to: "/blog/digital-vs-electronic-signature",
    why: "The legal-vs-cryptographic distinction is the whole subject of that article.",
  },
  // 5 impressions at position 15.2, and the SOC article is the long-form answer.
  siem: {
    to: "/blog/the-soc-room",
    why: "SIEM is defined and contextualised inside the SOC article.",
  },
  // 8 impressions at position 71.75 — a weak page, but the intent is "what is a
  // SOC", which the SOC article answers directly.
  soc: {
    to: "/blog/the-soc-room",
    why: "The SOC article is the long-form answer to this term.",
  },
};

/**
 * Terms that rank and have no honest destination yet.
 *
 * These are the ones worth writing for. Until they exist, the redirect stays
 * neutral — pointing them somewhere merely adjacent would repeat the defect.
 */
export const GLOSSARY_DESTINATIONS_TODO = [
  {
    slug: "agile-methodology",
    impressions: 30,
    position: 10.6,
    note: "Companion page /blog/agile-without-the-ceremony exists but was not yet indexed in this window.",
  },
  {
    slug: "rag",
    impressions: 10,
    position: 4.8,
    note: "Retrieval-augmented generation; no dedicated page.",
  },
  { slug: "bug-bounty", impressions: 9, position: 11.44, note: "Career-intent query; no page." },
  {
    slug: "captcha",
    impressions: 5,
    position: 5.4,
    note: "Basic-literacy query; no page explains it.",
  },
  { slug: "owasp", impressions: 2, position: 9.5, note: "No page covering the OWASP Top 10." },
] as const;

/** Used when a term has no meaningful destination. Kept neutral on purpose. */
export const GLOSSARY_FALLBACK: SchoolDest = "/classes";

export function glossaryDestination(slug: string): string {
  return GLOSSARY_DESTINATIONS[slug]?.to ?? GLOSSARY_FALLBACK;
}
