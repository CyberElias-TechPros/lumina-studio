/**
 * Demand signals — what people in Nigeria are actually searching for, and
 * whether this site is in a position to answer it.
 *
 * ## Where the numbers come from, and how much to trust them
 *
 * Every figure here is a **year-on-year percentage change in Google search
 * interest in Nigeria** as published by Google's own trends releases and
 * reported by the Nigerian press that attended them. The sources are listed on
 * each entry in `source`.
 *
 * They are not search volumes. A +160% change on a small base is not the same
 * opportunity as +160% on a large one, and Google does not publish the base. This
 * file therefore stores direction and magnitude, and marks anything uncertain
 * with `confidence`, rather than pretending to know absolute demand.
 *
 * ## The contradiction that is deliberately preserved
 *
 * Two Google releases describe the same metric — AI literacy growth in Nigeria —
 * as **+84%** (March 2026 release) and **+840%** (a release reported in April
 * 2026, quoting a Google executive). One of those is wrong, or they measure
 * different things and both descriptions lost that detail in reporting.
 *
 * We do not know which. So this file records both and sets `confidence: "low"`
 * for the decimal-place claim specifically. It is tempting to quote +840% — it is
 * the more impressive number and it appears in more outlets — and quoting it
 * without the caveat would be the exact behaviour the editorial standard forbids.
 * **Any page citing this must say "+84% or +840%, sources disagree" or cite the
 * lower figure.** A trend statistic is a time-sensitive claim, so it needs a
 * primary link and a review date like any other.
 *
 * ## Why this is data and not prose
 *
 * A paragraph about search trends goes stale in a week and cannot be tested. A
 * typed table can be checked: does the course slug still exist, does the lesson
 * still exist, is the gap still open. `scripts/test/demand-signals.test.mjs`
 * enforces exactly that, so this file fails loudly when the site moves on and the
 * reasoning does not.
 */

/* ------------------------------------------------------------------ *
 * Types
 * ------------------------------------------------------------------ */

/** How sure we are of the direction and size of the change. */
export type SignalConfidence = "high" | "medium" | "low";

/**
 * Whether the site can honestly serve this demand today.
 *
 * - `strong`   — we have the course page and the lessons, and the on-ramp is at
 *                the right level for the person searching.
 * - `partial`  — we have the material, but only at the wrong level or behind an
 *                entry point that assumes more than the searcher has.
 * - `gap`      — the demand points at something we do not teach.
 * - `declined` — real demand, weighed and deliberately not served. Recorded so the
 *                decision can be re-examined instead of rediscovered.
 */
export type Coverage = "strong" | "partial" | "gap" | "declined";

export type DemandSignal = {
  id: string;
  /** The query shape people actually type, not the topic name. */
  query: string;
  /** Year-on-year change in Nigerian search interest, as a percentage. */
  changePct: number;
  /** The release this came from — enough detail to find it again. */
  source: string;
  /** ISO date of the publication we read it in. */
  reportedOn: string;
  confidence: SignalConfidence;
  /** What the site can currently do about it. */
  coverage: Coverage;
  /** Evidence for the coverage verdict — slugs, or the reason it is a gap. */
  evidence: string;
  /** What, if anything, to do. Empty for signals we should leave alone. */
  action: string;
  /**
   * Set when the same metric has a conflicting published figure. Forces the
   * writer to notice instead of picking the flattering number.
   */
  conflict?: string;
};

/* ------------------------------------------------------------------ *
 * The signals
 * ------------------------------------------------------------------ */

/**
 * Ordered by how strongly the demand meets something we can actually deliver —
 * not by the size of the percentage. A +840% trend we cannot serve is worth less
 * to this site than a +110% trend we can serve tomorrow.
 */
export const DEMAND_SIGNALS: readonly DemandSignal[] = [
  {
    id: "learn-ai-beginner",
    query: "how to learn ai",
    changePct: 160,
    source:
      "Google Nigeria search trends, 12 months to Sept 2025 (Techeconomy, TechCabal, BusinessDay)",
    reportedOn: "2025-07-31",
    confidence: "high",
    coverage: "partial",
    evidence:
      "The site owns 542 AI lessons across 20 phases, but the entry point is phase 00 'setup-and-tooling', lesson 01 'Dev Environment' — Git, GPU setup, API keys, Jupyter. That assumes a laptop, a budget and developer intent. The person typing 'how to learn AI' in 2026 is most often a student or a small-business owner on a phone. There is no beginner article and no non-developer on-ramp, and the AI lesson pages are noIndex, so none of the 542 can rank regardless.",
    action:
      "Write one CEA-original beginner explainer — 'what AI actually is, and the first thing to try' — that a phone user can finish, and link it to /classes/ai-productivity as the practical next step. Do not flip noIndex on the AI lessons: they duplicate the upstream MIT-derived project and would compete with it. A landing page that is ours is the honest route.",
  },
  {
    id: "ai-literacy",
    query: "ai for school / homework / chemistry",
    changePct: 84,
    source: "Google Nigeria trends, March 2026 (Technext, 2026-04-24; The Nation, 2026-04-28)",
    reportedOn: "2026-04-24",
    confidence: "low",
    coverage: "partial",
    evidence:
      "Confirmed direction: AI-literacy searches surged, AI tutors became a breakout term, and 'AI + chemistry' doubled. The site teaches AI productivity for work but nothing aimed at students using AI for study, which is where the demand is.",
    action:
      "A companion piece on using AI for study without outsourcing the thinking — grounded in the site's existing critical-AI-usage material, honesty rules, and a practice task. The credibility constraint is that this site must not teach cheating.",
    conflict:
      "A Google executive is reported in April 2026 as saying AI literacy grew 'by 840 per cent', while the March 2026 release says 84%. One is wrong or they measure different things. Cite the lower figure, or state the disagreement. Never quote +840% alone.",
  },
  {
    id: "learn-computer-step-by-step",
    query: "how to learn computer step by step",
    changePct: 160,
    source: "Google Nigeria search trends, 12 months to Sept 2025 (Techeconomy)",
    reportedOn: "2025-07-31",
    confidence: "high",
    coverage: "strong",
    evidence:
      "This is the single best-served signal in the list. 210 notes across 21 chapters start at 'sitting down at a computer', the chapter structure is an explicit learning order, and /classes/computer-basics-typing is live and indexed. The demand and the asset already match.",
    action:
      "No new content. This is a discoverability problem: 199 lessons still open with a catalogue line instead of an answer, so the pages that should win this query do not earn the click. Fix the short answers before writing anything new.",
  },
  {
    id: "learn-excel",
    query: "how to learn microsoft excel / excel for beginners",
    changePct: 160,
    source: "Google Nigeria search trends, 12 months to Sept 2025 (Techeconomy)",
    reportedOn: "2025-07-31",
    confidence: "high",
    coverage: "strong",
    evidence:
      "/classes/microsoft-office and /classes/data-entry are both live and indexed, the spreadsheet chapter exists in the notes, and /tools/excel-formula-lab is a working practice tool. Two separate query families ('excel' and 'excel for beginners') both landed in the top ten.",
    action:
      "No new course. Point the spreadsheet lessons at the formula lab, which is the thing a competitor with video cannot offer.",
  },
  {
    id: "learn-photoshop",
    query: "how to learn photoshop",
    changePct: 180,
    source: "Google Nigeria search trends, 12 months to Sept 2025 (Techeconomy)",
    reportedOn: "2025-07-31",
    confidence: "high",
    coverage: "partial",
    evidence:
      "/classes/graphic-design exists and teaches design, but the demand is for a specific proprietary tool. Teaching Photoshop properly means licensing, version drift and screenshots that rot quarterly — a maintenance cost the review cycle is not ready for.",
    action:
      "Serve the intent, not the brand: a piece on the design skills that transfer across tools, linking to /classes/graphic-design and /classes/content-creation. Do not claim to teach Photoshop.",
  },
  {
    id: "start-freelancing",
    query: "how to start freelancing with no experience",
    changePct: 90,
    source: "Google Nigeria search trends, 12 months to Sept 2025 (TechCabal, Techbuild)",
    reportedOn: "2025-10-23",
    confidence: "high",
    coverage: "strong",
    evidence:
      "/classes/business-freelancing describes its outcome as 'A freelance business plan and portfolio' — which is literally this query. The course already answers it; the query just has no page shaped like it.",
    action:
      "No new course. Write the answer-first article that leads into the course, and make sure the freelancing lessons carry a short answer in the first sentence.",
  },
  {
    id: "start-business-home",
    query: "how to start a business from home / with no money",
    changePct: 90,
    source: "Google Nigeria search trends, January 2026 (Business Times NG, Business AM Live)",
    reportedOn: "2026-01-25",
    confidence: "high",
    coverage: "partial",
    evidence:
      "The site teaches the freelance and digital-product version of this, not the general version. The specific business ideas people searched (real estate, cocoa export, importation, clothing) are outside what CEA can teach credibly, and covering them would be exactly the thin, demand-chasing page the editorial standard forbids.",
    action:
      "Stay in lane: write for the digital-service version — starting with a skill you already have. Do not write 'how to start a cocoa export business'.",
  },
  {
    id: "start-content-creation",
    query: "how to start creating content / youtube channel / podcast",
    changePct: 80,
    source: "Google Nigeria search trends, January 2026 (Business Times NG)",
    reportedOn: "2026-01-25",
    confidence: "high",
    coverage: "strong",
    evidence:
      "/classes/content-creation ('A complete short-form video') and /classes/social-media-management are live and indexed, with a content chapter in the notes.",
    action:
      "No new course. The opportunity is a tutorial with a finished artefact, since the site's whole method is 'produce the thing, not watch a video about it'.",
  },
  {
    id: "learn-coding-free",
    query: "how to learn coding for beginners free",
    changePct: 110,
    source: "Google Nigeria search trends, 12 months to Sept 2025 (Techeconomy)",
    reportedOn: "2025-07-31",
    confidence: "high",
    coverage: "strong",
    evidence:
      "The 210 notes are free, /classes/web-development exists, and /tools/code-studio plus /open-curriculum give a free practice path. 'Free' is the operative word in the query and it is met.",
    action:
      "No new content. Link the free practice tools from the coding lessons; the tools are the differentiator, not another tutorial.",
  },
  {
    id: "learn-ai-tools-creative",
    query: "ai music tools / lyria / ai art",
    changePct: 90,
    source: "Google Nigeria trends, March 2026 (Technext, The Nation)",
    reportedOn: "2026-04-24",
    confidence: "medium",
    coverage: "gap",
    evidence:
      "Breakout trend, but CEA has no music or audio-creation course or lesson. The only adjacent asset is the AI-engineering speech phase, which is engineering, not creative use.",
    action:
      "None now. Recording it here prevents someone later presenting it as new insight. Revisit only if a music or audio course is actually built.",
  },
  {
    id: "learn-languages",
    query: "learn italian / japanese / german",
    changePct: 130,
    source: "Google Nigeria trends, March 2026 (Technext, The Nation)",
    reportedOn: "2026-04-24",
    confidence: "medium",
    coverage: "gap",
    evidence:
      "Italian +130%, Japanese doubled, Arabic +80% month-on-month. CEA teaches no language. This is a large, fast-growing, genuinely adjacent market with zero capability behind it.",
    action:
      "Decline, and say so. The honest version of 'where else could we go' is that languages are a real market this site cannot serve today, and pretending otherwise produces the thin pages that AdSense already flagged.",
  },
  {
    id: "learn-forex",
    query: "how to learn forex trade",
    changePct: 300,
    source: "Google Nigeria search trends, 12 months to Sept 2025 (Techeconomy)",
    reportedOn: "2025-07-31",
    confidence: "high",
    coverage: "declined",
    evidence:
      "The single fastest-growing 'how to learn' query in the dataset at +300%, and the highest intent-per-searcher of anything here. It is also a regulated financial activity where the plausible reader outcome is losing money to a scheme. CEA is not a licensed financial adviser and has no verified track record.",
    action:
      "Deliberately declined. The defensible adjacent move is not a trading course but a consumer-protection piece — how to recognise a forex or investment scheme that is designed to take your money — which serves the same searcher honestly. That belongs with the existing scam-and-safety material, not with a 'learn forex' page.",
  },
  {
    id: "learn-makeup",
    query: "how to learn make up",
    changePct: 270,
    source: "Google Nigeria search trends, 12 months to Sept 2025 (Techeconomy)",
    reportedOn: "2025-07-31",
    confidence: "high",
    coverage: "declined",
    evidence:
      "+270%. Real, large, and completely outside the Academy's subject matter and its instructors' verified competence.",
    action:
      "Deliberately declined. No article. Chasing it would be the clearest possible case of a page whose only purpose is a search phrase.",
  },
];

/* ------------------------------------------------------------------ *
 * Derived views
 * ------------------------------------------------------------------ */

/** Signals worth acting on, strongest fit first. */
export function actionableSignals(): DemandSignal[] {
  const rank: Record<Coverage, number> = { strong: 0, partial: 1, gap: 2, declined: 3 };
  return [...DEMAND_SIGNALS].sort((a, b) => {
    if (rank[a.coverage] !== rank[b.coverage]) return rank[a.coverage] - rank[b.coverage];
    return b.changePct - a.changePct;
  });
}

/**
 * Growth the site cannot serve yet, in one sentence.
 *
 * Used by the backlog report so the "where else could we go" question has an
 * answer that is computed rather than remembered.
 */
export function unservedGrowth(): DemandSignal[] {
  return DEMAND_SIGNALS.filter((s) => s.coverage === "gap" || s.coverage === "declined").sort(
    (a, b) => b.changePct - a.changePct,
  );
}

/**
 * Signals where the published figure is contested.
 *
 * Exists so a writer cannot quote a trend number without meeting the caveat.
 */
export function contestedSignals(): DemandSignal[] {
  return DEMAND_SIGNALS.filter((s) => Boolean(s.conflict));
}

export const DEMAND_SOURCE_NOTE =
  "Percentages are year-on-year changes in Nigerian search interest as published " +
  "by Google's trends releases and reported by Nigerian press. They are not " +
  "search volumes, and Google does not publish the base they are measured from. " +
  "Treat them as direction and rough magnitude, never as absolute demand.";
