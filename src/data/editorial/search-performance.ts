/**
 * What Search Console actually said — six months of real data, November 2026.
 *
 * ## Why this file exists
 *
 * Until this export arrived, every content decision rested on inference: our own
 * impressions in `QUERY_GAPS`, national trends in `demand-signals.ts`, and a
 * review queue that had never been run. Those are all proxies. This is the
 * measurement.
 *
 * The raw CSVs are deliberately **not committed** — they are a per-property export
 * that gets regenerated, and they carry per-query performance data that is better
 * kept in a folder than in git history (`gsc-reports.local/`, gitignored). What is
 * committed is what we concluded from them, in a form a test can check.
 *
 * ## The caveat that governs every number here
 *
 * **76% of impressions have no query attribution.** The chart totals 6,609
 * impressions; `Queries.csv` only accounts for 1,614 of them, because Search
 * Console withholds rare queries. So query-level percentages describe the visible
 * quarter of a much larger picture, and any conclusion of the form "nobody
 * searches for X" is unsupported by this data — only "we have no evidence anyone
 * searches for X".
 *
 * Pages are better attributed (103% of chart total, which is normal because a
 * single impression can carry multiple page rows), so page-level conclusions are
 * the trustworthy ones.
 *
 * ## The period
 *
 * 2026-08-07 to 2026-11-23, web search, 109 days.
 */

export type Period = {
  from: string;
  to: string;
  days: number;
  clicks: number;
  impressions: number;
  ctrPct: number;
  avgPosition: number;
};

export type Cohort = {
  label: string;
  /** Why this cohort matters, in one line. */
  note: string;
  clicks: number;
  impressions: number;
  ctrPct: number;
  avgPosition?: number;
};

export type CountryRow = {
  country: string;
  clicks: number;
  impressions: number;
  ctrPct: number;
  avgPosition: number;
};

/** The whole property, six months. */
export const PERIOD: Period = {
  from: "2026-08-07",
  to: "2026-11-23",
  days: 109,
  clicks: 97,
  impressions: 6609,
  ctrPct: 1.47,
  avgPosition: 9.4,
};

/**
 * Weekly impressions. The shape of this series is the most important thing in the
 * audit: the site did not grow gradually, it was flat and then went up by an order
 * of magnitude in three weeks.
 */
export const WEEKLY_TRAJECTORY: readonly {
  weekStart: string;
  clicks: number;
  impressions: number;
}[] = [
  { weekStart: "2026-08-10", clicks: 0, impressions: 7 },
  { weekStart: "2026-08-17", clicks: 0, impressions: 12 },
  { weekStart: "2026-08-24", clicks: 1, impressions: 26 },
  { weekStart: "2026-08-31", clicks: 3, impressions: 301 },
  { weekStart: "2026-09-07", clicks: 1, impressions: 224 },
  { weekStart: "2026-09-14", clicks: 3, impressions: 39 },
  { weekStart: "2026-09-21", clicks: 4, impressions: 71 },
  { weekStart: "2026-09-28", clicks: 5, impressions: 44 },
  { weekStart: "2026-10-05", clicks: 1, impressions: 47 },
  { weekStart: "2026-10-12", clicks: 7, impressions: 78 },
  { weekStart: "2026-10-19", clicks: 22, impressions: 194 },
  { weekStart: "2026-10-26", clicks: 9, impressions: 196 },
  { weekStart: "2026-11-02", clicks: 4, impressions: 422 },
  { weekStart: "2026-11-09", clicks: 9, impressions: 1369 },
  { weekStart: "2026-11-16", clicks: 18, impressions: 2881 },
  { weekStart: "2026-11-23", clicks: 10, impressions: 694 },
];

/**
 * Page cohorts. These are the load-bearing numbers in the audit.
 */
export const COHORTS: readonly Cohort[] = [
  {
    label: "The 210-lesson notes (/blog/)",
    note: "The corpus the whole strategy was built around. Ranks in striking distance and converts almost nobody.",
    clicks: 9,
    impressions: 4016,
    ctrPct: 0.22,
    avgPosition: 9.1,
  },
  {
    label: "Glossary terms (/glossary/)",
    note: "Highest positions on the site, lowest clicks. Every URL is 301'd to /classes by vercel.json, so no entered click can be earned.",
    clicks: 0,
    impressions: 506,
    ctrPct: 0,
    avgPosition: 4.2,
  },
  {
    label: "Legacy trees that 301 to /classes",
    note: "Glossary, programs, library, resources and career guides together. 8.8% of all impressions, 1 click, landing on a page that earned 34 impressions itself.",
    clicks: 1,
    impressions: 601,
    ctrPct: 0.17,
    avgPosition: 19.1,
  },
  {
    label: "AI Engineering lessons (/ai-engineering/)",
    note: "797 impressions and 3 clicks while the lesson routes are noIndex. The visibility is coming from pages deliberately withheld from indexing.",
    clicks: 3,
    impressions: 797,
    ctrPct: 0.38,
  },
  {
    label: "One partner page",
    note: "/opportunities/idice-skills-to-jobs. Not content, not a course, and 57.7% of every click the site received.",
    clicks: 56,
    impressions: 701,
    ctrPct: 7.99,
    avgPosition: 5.47,
  },
  {
    label: "Homepage",
    note: "The only page with a healthy CTR. Tiny volume, which means almost nobody is reaching the site by its own name.",
    clicks: 14,
    impressions: 92,
    ctrPct: 15.22,
    avgPosition: 4,
  },
];

/** Where the impressions come from. Local was the assumption; this is the fact. */
export const COUNTRIES: readonly CountryRow[] = [
  { country: "Nigeria", clicks: 84, impressions: 2399, ctrPct: 3.5, avgPosition: 7.02 },
  { country: "United States", clicks: 1, impressions: 1051, ctrPct: 0.1, avgPosition: 12.89 },
  { country: "India", clicks: 4, impressions: 502, ctrPct: 0.8, avgPosition: 9.15 },
  { country: "United Kingdom", clicks: 0, impressions: 257, ctrPct: 0, avgPosition: 10.3 },
  { country: "Ethiopia", clicks: 0, impressions: 212, ctrPct: 0, avgPosition: 9.33 },
  { country: "Philippines", clicks: 1, impressions: 190, ctrPct: 0.53, avgPosition: 9.63 },
  { country: "Canada", clicks: 0, impressions: 111, ctrPct: 0, avgPosition: 10.34 },
  { country: "Australia", clicks: 0, impressions: 91, ctrPct: 0, avgPosition: 9 },
  { country: "South Africa", clicks: 0, impressions: 84, ctrPct: 0, avgPosition: 10.54 },
  { country: "Brazil", clicks: 0, impressions: 80, ctrPct: 0, avgPosition: 14.65 },
  { country: "Ghana", clicks: 0, impressions: 78, ctrPct: 0, avgPosition: 6.99 },
];

export const DEVICES: readonly {
  device: string;
  clicks: number;
  impressions: number;
  ctrPct: number;
  avgPosition: number;
}[] = [
  { device: "Mobile", clicks: 69, impressions: 3413, ctrPct: 2.02, avgPosition: 7.75 },
  { device: "Desktop", clicks: 28, impressions: 3081, ctrPct: 0.91, avgPosition: 11.19 },
  { device: "Tablet", clicks: 0, impressions: 115, ctrPct: 0, avgPosition: 8.12 },
];

/**
 * The query we rank #1 for, and the page it lands on.
 *
 * Recorded because it is the single clearest illustration in the whole export:
 * first position, 140 impressions, zero clicks, on a URL that 301s.
 */
export const SOC_ROOM = {
  query: "soc room",
  clicks: 0,
  impressions: 140,
  avgPosition: 15.26,
  landingPage: "/glossary/soc",
  landingPagePosition: 71.75,
  /** A variant that did reach position 1. */
  bestPositionQuery: "socroom",
  bestPosition: 1,
} as const;

/**
 * Queries that return the site and cannot be answered by any indexable page.
 *
 * Each one is either a 301ing glossary term, a noIndexed AI lesson, or a lesson
 * that ranks but is not shaped like a question.
 */
export const UNANSWERABLE_CLUSTERS: readonly {
  cluster: string;
  queries: string[];
  impressions: number;
  why: string;
}[] = [
  {
    cluster: "Zero trust",
    queries: ["what is zero trust security"],
    impressions: 189,
    why: "One entry in glossary.ts, and /glossary/zero-trust 301s to /classes. The position is 4.13 — the site already earns the ranking and then throws it away.",
  },
  {
    cluster: "Vulnerability assessment",
    queries: ["vulnerability assessment"],
    impressions: 172,
    why: "Position 2.04 and the page redirects. This is the best ranking in the entire export and it is unconditionally wasted.",
  },
  {
    cluster: "SOC room",
    queries: ["soc room", "soc", "socroom", "what is soc in chat"],
    impressions: 149,
    why: "Ambiguous: could be a literal security-operations room, or 'soc room' as a place. No page distinguishes them, and the glossary entry that might 301s.",
  },
  {
    cluster: "Digital signature",
    queries: ["what is a digital signature"],
    impressions: 35,
    why: "Glossary term at position 3.91 that redirects.",
  },
  {
    cluster: "Agile methodology",
    queries: ["agile methodology"],
    impressions: 30,
    why: "Glossary term at position 10.6 that redirects.",
  },
  {
    cluster: "Masked language modelling",
    queries: [
      "masked language model",
      "what is masked language modeling",
      "masked language modeling",
      "bert masked language model",
    ],
    impressions: 14,
    why: "One AI lesson, /ai-engineering/07-transformers-deep-dive/06-bert-masked-language-modeling, ranks at 16.35 and is noIndex.",
  },
];

/**
 * The megabyte cluster: the largest single content theme in the export.
 *
 * 82 distinct queries, 276 impressions, zero clicks — served by two notes whose
 * titles and meta descriptions are already shaped as the question. This is the
 * one place where the "add a short answer" thesis does not explain the failure,
 * because `kilobytes-and-megabytes` already opens with its answer. It lost the
 * position, not the pitch.
 */
export const MB_CLUSTER = {
  queries: 82,
  impressions: 276,
  clicks: 0,
  topLandingPage: "/blog/kilobytes-and-megabytes",
  topLandingImpressions: 650,
  topLandingPosition: 10.48,
  /** Where a click is plausibly decided before the reader ever arrives. */
  competingFeature: "unit-conversion sitelinks and instant answers",
} as const;

/**
 * Non-English demand that the site has no page in any language for.
 * Small in absolute terms, but it is the only visible evidence of intent outside
 * English, and the queries are all variations of a page that already exists.
 */
export const NON_ENGLISH = [
  { language: "Hindi (romanised + Devanagari)", queries: 8, impressions: 45 },
  { language: "Spanish", queries: 1, impressions: 1 },
  { language: "French", queries: 1, impressions: 5 },
] as const;

/* ------------------------------------------------------------------ *
 * Derived facts used by the report and by tests
 * ------------------------------------------------------------------ */

/**
 * Nigeria's impressions, as reported in `Countries.csv`.
 *
 * Note the trap: `COUNTRIES` above is only the top eleven rows. Summing it to get
 * the international total undercounts badly, because the export has 154 country
 * rows and the long tail is over half of it. The total comes from `PERIOD`, which
 * is the property-wide figure, and Nigeria is subtracted from that.
 */
const NIGERIA_IMPRESSIONS = 2399;

export const nonNigeriaImpressions = PERIOD.impressions - NIGERIA_IMPRESSIONS;

export const nonNigeriaSharePct = (nonNigeriaImpressions / PERIOD.impressions) * 100;

/** Cohort lookup by label, so a caller does not depend on array order. */
export function cohort(label: string): Cohort {
  const found = COHORTS.find((c) => c.label === label);
  if (!found) throw new Error(`No cohort named "${label}"`);
  return found;
}

/**
 * The single sentence that should be quoted from this audit, if only one can be.
 *
 * Kept as data so the report and any summary cannot drift from each other.
 */
export const HEADLINE =
  "The site does not have a traffic problem. It has a destination problem: 8.8% of its " +
  "impressions land on URLs that are permanently redirected, and the corpus that holds " +
  "61% of the rest converts at 0.22%.";
