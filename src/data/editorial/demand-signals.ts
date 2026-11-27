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

/* ------------------------------------------------------------------ *
 * Keyword value: the corpus queries, measured internationally
 * ------------------------------------------------------------------ */

/**
 * What each of the site's *own* ranking queries is worth beyond Nigeria.
 *
 * The distinction from `DEMAND_SIGNALS` above matters. Those are national trends
 * about what Nigerians search. These are the specific queries the site already
 * earns impressions for, and the question is whether they travel — because
 * 63.7% of impressions come from outside Nigeria and produce 13% of clicks.
 *
 * ## What "Global interest" means here, precisely
 *
 * Google does not publish absolute volumes, and this data was gathered through
 * secondary sources rather than the Trends API. So each row records a
 * **qualitative band** with the evidence behind it, not a number pretending to be
 * a volume:
 *
 *   - `high`     — the topic has a large, growing commercial market, published
 *                  forecasts, or is named on employer skills lists.
 *   - `moderate` — real, steady interest with no strong growth signal.
 *   - `low`      — thin interest, usually because the query is local, informal,
 *                  or answered by a search feature.
 *   - `declining`— measurable fall from a past peak.
 *
 * ## The finding this table encodes
 *
 * **Three of the site's biggest ranking queries are worth almost nothing
 * internationally, and the fourth is worth a lot.**
 *
 * The KB/MB/GB cluster is the largest theme in the export (82 queries) and scores
 * `low` globally, because the query is answered above the results. The SOC and
 * vulnerability-assessment queries sit in a market growing at double-digit CAGR
 * with millions of unfilled roles — that is `high` — and the site already ranks
 * in the top five for both. The money is in the security terms, not the storage
 * terms, and the storage terms are where 40% of the effort has gone.
 */
export type GlobalInterest = "high" | "moderate" | "low" | "declining";

export type KeywordValue = {
  id: string;
  /** The query as the site actually ranks for it (from the GSC export). */
  query: string;
  /** Impressions this query family earned on this site in six months. */
  impressions: number;
  /** Average position, where the export gives one. */
  position?: number;
  globalInterest: GlobalInterest;
  /** ISO date the band was assessed. A band without a date goes stale silently. */
  assessedOn: string;
  /** Why this band — the market evidence, not vibes. */
  rationale: string;
  /** Related topics worth covering, derived from the same evidence. */
  relatedTopics: string[];
  /** What the site should do, if anything. */
  verdict: string;
};

export const KEYWORD_VALUE: readonly KeywordValue[] = [
  {
    id: "zero-trust",
    query: "what is zero trust security",
    impressions: 189,
    position: 4.13,
    globalInterest: "high",
    assessedOn: "2026-11-25",
    rationale:
      "Zero Trust is the strongest security-market term the site ranks for. Published forecasts put the global zero trust security market between roughly $44bn and $54bn in 2026, growing at CAGRs quoted from 13.6% to 21.4% depending on the house. Adoption surveys report 63–81% of organisations partway through implementation. Any figure here is contested between research firms, so the direction is the claim, not the number.",
    relatedTopics: [
      "zero trust network access (ZTNA) replacing VPN",
      "micro-segmentation",
      "continuous authentication",
      "least privilege and identity",
      "NIST SP 800-207",
    ],
    verdict:
      "Already written and ranking at 4.13. Expand with the related topics rather than starting new pillars.",
  },
  {
    id: "vulnerability-assessment",
    query: "vulnerability assessment",
    impressions: 172,
    position: 2.04,
    globalInterest: "high",
    assessedOn: "2026-11-25",
    rationale:
      "The strongest position on the property and the clearest employer signal. Vulnerability assessment appears by name on published in-demand IT skills lists, in entry-level security job descriptions, and as a named line item in SOC-as-a-service contracts, where vulnerability assessment and threat detection is the largest growth segment. The US BLS projects information security analyst employment up about 29% to 2034.",
    relatedTopics: [
      "penetration testing vs assessment",
      "CVSS scoring",
      "vulnerability management lifecycle",
      "scan tools: Nessus, OpenVAS, Qualys",
      "report writing for engineers",
    ],
    verdict:
      "Position 2.04 is the best ranking owned. The tool now serves it; the next step is the CVSS and reporting topics, which is what employers actually test.",
  },
  {
    id: "soc",
    query: "soc room",
    impressions: 149,
    globalInterest: "high",
    assessedOn: "2026-11-25",
    rationale:
      "SOC analyst is consistently named the most common entry-level security role. The security operations centre market is forecast at roughly $7.7bn–$14.7bn in 2026 depending on the scope of the definition, growing 10–12% a year, and the talent shortage is the stated driver for the SOC-as-a-service segment. The query itself is ambiguous — it also catches people looking for a literal room — and the existing lesson already carries a question-shaped title. Do not create a second page.",
    relatedTopics: [
      "SIEM and what analysts actually watch",
      "alert triage and false positives",
      "SOC tiers and shift handover",
      "SOC analyst career path and salary",
    ],
    verdict:
      "Served already by /blog/the-soc-room. Grow the related topics, never a competing page.",
  },
  {
    id: "digital-signature",
    query: "what is a digital signature",
    impressions: 35,
    position: 3.91,
    globalInterest: "moderate",
    assessedOn: "2026-11-25",
    rationale:
      "Steady and commercially substantial, but slower than the security terms. The digital signature market is put around $9.4bn in 2026 by one house and forecast to grow at a high rate, with banking and insurance the largest buyers. Interest is stable rather than rising.",
    relatedTopics: [
      "digital signature vs electronic signature, which is a legal distinction",
      "digital certificate vs digital signature",
      "PDF signature validation",
      "eIDAS and Nigerian e-signature law",
    ],
    verdict:
      "Written and ranking at 3.91. The highest-value next page is the legal distinction, because that is what people get wrong and what businesses search for.",
  },
  {
    id: "mb-kb-gb",
    query: "megabyte / which is bigger mb or kb",
    impressions: 276,
    globalInterest: "low",
    assessedOn: "2026-11-25",
    rationale:
      "The largest query cluster in the export — 82 distinct queries — and the lowest value. The question is answered in the search result itself by Google's own unit conversion, which is why the site earns 650 impressions on one page and zero clicks. Global interest in the topic is not in question; the click is.",
    relatedTopics: [
      "mobile data bundle calculation",
      "why a 16 GB card shows 14.9 GB",
      "data usage of common activities",
    ],
    verdict:
      "Do not write more. The existing page and the converter tool are the correct ceiling for this cluster.",
  },
  {
    id: "agile",
    query: "agile methodology",
    impressions: 30,
    globalInterest: "declining",
    assessedOn: "2026-11-25",
    rationale:
      "Measurably past its peak. A five-year worldwide comparison puts Agile at about 59 average relative search interest against Scrum at 35 and Kanban at 13; both Agile and Scrum peaked around 2022 and settled lower, with Scrum falling faster in the US and India. Scrum Master roles are being merged or removed from hiring plans. The framework is not dead — it is no longer growing, and process-only roles are the first to go.",
    relatedTopics: [
      "Agile vs Scrum, the relationship",
      "Kanban and flow",
      "how to say no to scope",
      "product ownership without a framework",
    ],
    verdict:
      "Written once, as a comparison, with the decline stated honestly. Do not build a content pillar on a declining term.",
  },
  {
    id: "entry-level-cyber",
    query: "entry level cyber security jobs",
    impressions: 0,
    globalInterest: "high",
    assessedOn: "2026-11-25",
    rationale:
      "Zero impressions on this site because nothing targets it, and the highest commercial intent of anything in this table. An entry-level security job seeker is deciding what to study, which is exactly the person the Academy serves. Evidence: BLS 29% analyst growth to 2034, 33% growth quoted for the wider field, and hundreds of thousands of open US postings reported by workforce trackers, with SOC analyst and vulnerability assessment analyst named as the two realistic first roles.",
    relatedTopics: [
      "SOC analyst vs vulnerability analyst",
      "CompTIA Security+ worth it or not",
      "security portfolio without experience",
      "first 90 days in a SOC",
    ],
    verdict:
      "Written as the strongest unwritten keyword. This is the topic to expand into a series.",
  },
];

/** Keywords whose global interest makes them worth sustaining. */
export function highValueKeywords(): KeywordValue[] {
  return KEYWORD_VALUE.filter((k) => k.globalInterest === "high");
}

/** Keywords measured as falling — recorded so nobody rebuilds them as pillars. */
export function decliningKeywords(): KeywordValue[] {
  return KEYWORD_VALUE.filter((k) => k.globalInterest === "declining");
}

/**
 * Every related topic across the table, grouped by the keyword that motivates it.
 * This is the raw material for "what to write next" once the existing queue clears.
 */
export function relatedTopicMap(): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  for (const keyword of KEYWORD_VALUE) {
    if (keyword.globalInterest === "low" || keyword.globalInterest === "declining") continue;
    map[keyword.id] = [...keyword.relatedTopics];
  }
  return map;
}

/* ------------------------------------------------------------------ *
 * Trend lifecycle: what is rising, what is steady, what is coming
 * ------------------------------------------------------------------ */

/**
 * Every topic classed by where it sits in its life, not just how big it is.
 *
 * This exists because "what is trending" and "what is worth writing" are
 * different questions. A breakout term can be a spike that vanishes in six
 * weeks; a steady term is a page that earns for years. Both are worth knowing,
 * and confusing them produces content that ages badly.
 *
 * ## Sourcing, stated plainly
 *
 * The Google Trends **interface was not reachable** while this was compiled —
 * `trends.google.com` and its internal API both refused. These entries therefore
 * come from dated secondary reporting of Google data (press releases carried by
 * Nigerian tech press, April 2026) plus published market and hiring research.
 * Where a figure comes from that reporting it is quoted with its date; where it
 * is a market forecast it says so.
 *
 * The `forecast` class is different again, and deliberately conservative: it
 * means "the demand is scheduled, not speculative". Exam seasons and school
 * terms are calendar facts. Job forecasts are stated as forecasts.
 */
export type TrendLifecycle = "rising" | "steady" | "emerging" | "forecast" | "cooling";

export type TrendSignal = {
  id: string;
  topic: string;
  lifecycle: TrendLifecycle;
  /** ISO date the evidence was published or gathered — never the date of reading. */
  evidenceDate: string;
  /** What was measured, in the source's own terms. */
  evidence: string;
  /** Where it came from, specific enough to check. */
  source: string;
  /** Nigeria relevance, 1–3. Not a volume, a judgement with a reason below. */
  ngRelevance: 1 | 2 | 3;
  /** The page this should become, if it should become one. */
  contentAction: string;
  /** Why it will or will not still matter in a year. */
  durability: string;
};

export const TREND_SIGNALS: readonly TrendSignal[] = [
  {
    id: "autonomous-agent",
    topic: "Autonomous agents",
    lifecycle: "rising",
    evidenceDate: "2026-04-25",
    evidence:
      "\u201cAutonomous Agent\u201d reported at +390% over 12 months in Google's Nigeria trend data. Same release reports AI literacy +840% and AI Tutor as a breakout term.",
    source:
      "Google Nigeria trend release, March 2026 data, reported by Nigerian tech press April 2026. NOTE: the same release is quoted elsewhere as \u201c84%\u201d for AI literacy \u2014 unusable until resolved, and no figure from it is used in published copy.",
    ngRelevance: 3,
    contentAction:
      "Served by /blog/what-is-an-ai-agent-in-plain-words as the indexable door into the 54 noIndex agent lessons.",
    durability:
      "The term is volatile; the underlying skill is not. Write for the skill, not the phrase.",
  },
  {
    id: "cyber-jobs",
    topic: "Cybersecurity roles and hiring",
    lifecycle: "steady",
    evidenceDate: "2026-04-26",
    evidence:
      "Over 1,300 cybersecurity vacancies listed in Nigeria in May 2025, concentrated in Lagos and Abuja. Nigerian market forecast to grow at roughly 10.7% a year to 2029. 3MTT targets three million trained technical people by 2027 with cybersecurity as a priority discipline.",
    source:
      "Ecofin/TechTrends Africa reporting, April 2026, citing Nigerian job-board counts and market forecasts.",
    ngRelevance: 3,
    contentAction:
      "Served by /blog/cybersecurity-jobs-and-what-they-pay. This is the page that answers the intent behind the site's position-2.04 ranking.",
    durability: "High. Hiring demand moves slowly and the term does not depend on a trend spike.",
  },
  {
    id: "ai-literacy",
    topic: "Learning to use AI (not build it)",
    lifecycle: "rising",
    evidenceDate: "2026-04-25",
    evidence:
      "Searches combining AI with school, university, homework and chemistry all reported rising; \u201cAI Tutor\u201d a breakout term. The release also reports 84% of young Nigerians saying digital and AI skills are critical to their careers.",
    source: "Google Nigeria trend release, March 2026 data, reported April 2026.",
    ngRelevance: 3,
    contentAction:
      "Not yet written as a page. The site's AI Productivity course serves it; a plain-English entry page is the gap, and it should point at the course rather than duplicate it.",
    durability: "Medium-high. The specific queries will churn; the need to learn AI will not.",
  },
  {
    id: "vibe-coding",
    topic: "Vibe coding",
    lifecycle: "emerging",
    evidenceDate: "2026-11-24",
    evidence:
      "Reported as rising while \u201cprompt engineering\u201d falls. No Nigerian source and no Google export obtained, so the only support is secondary commentary.",
    source: "Third-party commentary surfaced in search, November 2026. Not a primary measurement.",
    ngRelevance: 1,
    contentAction:
      "Deliberately not written. A page targeting a phrase with no corpus behind it is the pattern this site's editorial rules forbid.",
    durability:
      "Low confidence. Revisit only if a primary source appears, or if Search Console starts showing the query.",
  },
  {
    id: "prompt-engineering",
    topic: "Prompt engineering as a career",
    lifecycle: "cooling",
    evidenceDate: "2026-11-24",
    evidence:
      "Reported as declining share of AI-related search while task-specific agent queries rise. Consistent with the shift from \u201chow to ask\u201d to \u201cwhat should it do\u201d.",
    source: "Secondary commentary, November 2026. Direction only — no volume obtained.",
    ngRelevance: 1,
    contentAction:
      "Do not build a pillar on it. The skill survives inside other pages; the standalone career framing does not.",
    durability: "The term is fading; the practice is being absorbed elsewhere.",
  },
  {
    id: "jamb-season",
    topic: "Exam season: JAMB preparation",
    lifecycle: "forecast",
    evidenceDate: "2026-11-08",
    evidence:
      "JAMB UTME registration opens January and the exam runs March\u2013April. 2027 UTME provisionally 15\u201325 March. Tutoring and prep enquiry peaks October through March — the season is already open.",
    source:
      "Published Nigerian exam calendars and school calendars, November 2026. Provisional dates flagged as provisional by the source.",
    ngRelevance: 3,
    contentAction:
      "Relevant to the Academy's intake messaging, not to article topics. Use for course-scheduling and enquiry timing, never for a post.",
    durability:
      "Recurs every year. This is the one demand shape that can be planned against with certainty.",
  },
  {
    id: "waec-season",
    topic: "Exam season: WAEC / NECO",
    lifecycle: "forecast",
    evidenceDate: "2026-11-08",
    evidence:
      "WAEC WASSCE 2027 provisionally 11 May \u2013 18 June; school session resumes 11 January 2027. Registration for the May/June exam runs November\u2013January.",
    source: "Published Nigerian exam and school calendars, November 2026.",
    ngRelevance: 2,
    contentAction: "Same as JAMB: intake and enquiry timing, not content topics.",
    durability: "Recurs annually on the same calendar, so it outlives the season it serves.",
  },
  {
    id: "new-year-skills",
    topic: "January resolution and reskilling demand",
    lifecycle: "forecast",
    evidenceDate: "2026-11-08",
    evidence:
      "Second school term resumes 11 January 2027; the same window is the traditional reskilling and enrolment peak. Inferred from the calendar, not measured.",
    source:
      "School calendar reporting, November 2026. The demand inference is an assumption and is labelled as one.",
    ngRelevance: 2,
    contentAction:
      "Have the course pages and the free practice tools ready before the first week of January, when the traffic arrives.",
    durability: "Recurs annually, though the size of the peak is unmeasured.",
  },
];

/**
 * Rising signals — the ones worth new pages.
 *
 * Deliberately excludes `emerging`. An emerging term rests on thinner evidence
 * by definition, and "vibe coding" is in that class precisely because nothing
 * primary supports it. If emerging topics were queued here they would be written
 * the same week they were noticed, which is how a site fills with pages about
 * phrases that vanish. Emerging topics get watched, not written.
 */
export function risingTopics(): TrendSignal[] {
  return TREND_SIGNALS.filter((t) => t.lifecycle === "rising");
}

/** Emerging signals: worth watching, not yet worth a page. */
export function emergingTopics(): TrendSignal[] {
  return TREND_SIGNALS.filter((t) => t.lifecycle === "emerging");
}

/** Durable topics: steady demand that does not depend on a spike. */
export function steadyTopics(): TrendSignal[] {
  return TREND_SIGNALS.filter((t) => t.lifecycle === "steady");
}

/** Calendar-driven demand that can be planned against. */
export function scheduledDemand(): TrendSignal[] {
  return TREND_SIGNALS.filter((t) => t.lifecycle === "forecast");
}

/**
 * The nine AI content clusters, and why each exists.
 *
 * Source: `docs/ai-content-plan-90-topics-2026-09.md`. Recorded here rather than
 * only in the document because the document cannot enforce anything, and this
 * can — a test checks that every cluster names a page that genuinely serves the
 * intent, and that nothing claims a volume.
 *
 * The hiring figures below are year-over-year growth in job postings (Dice 2026,
 * ~7M US postings). They are demand *evidence*, not search volume, and the
 * difference is the whole reason this file exists.
 */
export type AiCluster = {
  id: string;
  label: string;
  /** Why this cluster is worth writing, in one measurable claim. */
  evidence: string;
  /** ISO date of the evidence. */
  evidenceDate: string;
  /** Which existing surface feeds it, so nothing is written into a vacuum. */
  feedsFrom: string;
  /** Position in the publishing order and the reason for it. */
  wave: 1 | 2 | 3 | 4;
};

export const AI_CLUSTERS: readonly AiCluster[] = [
  {
    id: "free-ai-tools",
    label: "Free AI tools",
    evidence:
      "Zapier free is 100 tasks/month across 5 Zaps; Make free is 1,000 operations/month; n8n Community is unlimited self-hosted on a $6-20/month VPS. Stating the limit is the differentiator, because no competing list does.",
    evidenceDate: "2026-10-25",
    feedsFrom: "/classes/ai-productivity",
    wave: 1,
  },
  {
    id: "ai-fundamentals",
    label: "AI fundamentals",
    evidence:
      "AI skills required in 75% of tech job postings in June 2026, up from 15% in January 2024. The beginner question is now a mainstream one.",
    evidenceDate: "2026-07-15",
    feedsFrom: "/ai-engineering",
    wave: 1,
  },
  {
    id: "ai-automation",
    label: "AI automation",
    evidence:
      "Free tiers are genuinely usable for small business volumes: under 500 automations a month fits Zapier or Make. Converts to course enquiries because it describes a business outcome.",
    evidenceDate: "2026-10-25",
    feedsFrom: "/classes/digital-productivity",
    wave: 2,
  },
  {
    id: "ai-workflows",
    label: "AI workflows",
    evidence:
      "Employers now hire for workflow design rather than prompting: the ability to build repeatable multi-step systems. Prompt engineering postings still grew 253% YoY, so the skill did not die, it moved.",
    evidenceDate: "2026-07-15",
    feedsFrom: "/classes/ai-productivity",
    wave: 2,
  },
  {
    id: "ai-skills",
    label: "AI skills and careers",
    evidence:
      "Agentic AI +587%, AI agents +503%, vector databases +353%, RAG +275%, prompt engineering +253% YoY in job postings.",
    evidenceDate: "2026-07-15",
    feedsFrom: "/blog/cybersecurity-jobs-and-what-they-pay",
    wave: 3,
  },
  {
    id: "content-ai",
    label: "Content creation with AI",
    evidence:
      "63% of marketing teams use AI video generation; 82% of that use is social content. The quality question, not the tool list, is the durable angle.",
    evidenceDate: "2026-08-24",
    feedsFrom: "/classes/content-creation",
    wave: 3,
  },
  {
    id: "emerging",
    label: "Emerging this period",
    evidence:
      "Prompt injection reported as the fastest-growing AI risk term (~13x). MCP named across the 2026 tooling landscape with almost no plain-English coverage.",
    evidenceDate: "2026-08-22",
    feedsFrom: "/ai-engineering/13-tools-and-protocols",
    wave: 3,
  },
  {
    id: "code-to-video",
    label: "Code to video",
    evidence:
      "Programmatic video (Remotion, ngram, CoAnimator) is a developer workflow, not a consumer tool. Sora's consumer app was discontinued in April 2026, which invalidates most existing guides.",
    evidenceDate: "2026-08-22",
    feedsFrom: "/ai-engineering/12-multimodal-ai",
    wave: 4,
  },
  {
    id: "ai-models",
    label: "Models",
    evidence:
      "Model choice now turns on cost and latency, not reputation: reasoning modes are slower and dearer, and most tasks do not need them. A capability split survives a release; a ranking does not.",
    evidenceDate: "2026-08-24",
    feedsFrom: "/ai-engineering/11-llm-engineering",
    wave: 4,
  },
];

/** Clusters in publishing order: highest intent and widest audience first. */
export function clustersByWave(): Array<{ wave: number; clusters: AiCluster[] }> {
  return [1, 2, 3, 4].map((wave) => ({
    wave,
    clusters: AI_CLUSTERS.filter((cluster) => cluster.wave === wave),
  }));
}

/**
 * The rule that keeps this honest.
 *
 * Two of the five classes exist precisely so that a spike is never mistaken for
 * durability. If someone adds a topic here without a dated source, this constant
 * is the thing that says why that is not allowed.
 */
export const TREND_CAVEAT =
  "Trend classes come from dated secondary reporting and published calendars, not from " +
  "the Google Trends interface, which was unreachable when this was compiled. A " +
  "\u201crising\u201d class is a direction, not a volume. \u201cForecast\u201d means the demand is " +
  "scheduled by a calendar and is the only class safe to plan capacity against.";

export const KEYWORD_VALUE_CAVEAT =
  "Global interest bands come from secondary sources — research-house forecasts, adoption " +
  "surveys and published employer skills lists — not from the Google Trends API, which was not " +
  "reachable when this was assembled. Market-size figures disagree between houses by up to a " +
  "factor of two, so the direction of growth is the claim, never a specific dollar figure. " +
  "Reassess before repeating any number in published copy.";

export const DEMAND_SOURCE_NOTE =
  "Percentages are year-on-year changes in Nigerian search interest as published " +
  "by Google's trends releases and reported by Nigerian press. They are not " +
  "search volumes, and Google does not publish the base they are measured from. " +
  "Treat them as direction and rough magnitude, never as absolute demand.";
