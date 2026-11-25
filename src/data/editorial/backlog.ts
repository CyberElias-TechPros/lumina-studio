/**
 * The content backlog — computed from the site, not typed by hand.
 *
 * ## The problem this solves
 *
 * "What should we publish next?" was answered by reading Search Console, then
 * guessing. That works once, badly. Every real gap the site already knows about
 * is sitting in data we generate: which lessons have no short answer, which have
 * passed their review date, which lessons are missing from a chapter, which
 * question people typed that no page answers. None of it was being read.
 *
 * This module turns those signals into a ranked list. It is deliberately
 * **deterministic**: same repository, same backlog. There is no model call, no
 * telemetry, nothing that can silently change. If the list is wrong, the source
 * data is wrong, and the fix is in the data.
 *
 * ## The six signals, and why each one earns its place
 *
 * | Signal | Where it comes from | Why it ranks |
 * |---|---|---|
 * | `missing-quick-answer` | `blog.ts` vs `quickAnswer` | 199 lessons still open with a catalogue line. This is the single largest known click-through defect. |
 * | `review-due` | `lesson-dates.generated.json` | 34 lessons are past their 180-day review date **today**. A stale instruction is worse than none. |
 * | `query-gap` | hand-entered GSC exports | Real demand the corpus does not answer. Highest intent per unit of effort. |
 * | `thin-chapter` | `blog.ts` grouped by chapter | A 9-lesson chapter has a hole where the tenth was meant to be. |
 *
 * Two signals were designed and then removed: `tool-gap` and `stale-tool`. Both
 * depended on a practice-tool registry with a "last checked" field, and this
 * repository has no such registry — tools are pages, not data. Keeping the signal
 * would have meant printing a permanent zero, which reads as "no work needed"
 * when the truth is "not measured". A signal that cannot be computed is deleted,
 * not stubbed.
 *
 * ## What this file is NOT
 *
 * It is not a publishing queue. Nothing here publishes itself. It estimates
 * effort and impact so a person can choose; it does not choose. The editorial
 * standard in `docs/editorial-content-operations.md` still governs what may go
 * live, and `npm run content:backlog` only *reports*.
 */

import { blogPosts } from "../blog";
import { noteChapters } from "../note-chapters";
import { lessonEditorial } from "./index";

/* ------------------------------------------------------------------ *
 * Types
 * ------------------------------------------------------------------ */

export type BacklogSignal = "query-gap" | "review-due" | "missing-quick-answer" | "thin-chapter";

export type BacklogKind = "article" | "lesson-revision" | "review" | "chapter-completion";

export type Effort = "S" | "M" | "L";
export type Impact = 1 | 2 | 3;

export type BacklogItem = {
  /** Stable across runs so it can be referenced in a commit or an issue. */
  id: string;
  kind: BacklogKind;
  signal: BacklogSignal;
  title: string;
  /** Why this is on the list — the evidence, in one sentence. */
  rationale: string;
  /** Search queries this serves, when the signal is demand-driven. */
  queries?: string[];
  /** Impressions in the source export, when known. */
  impressions?: number;
  /** Rough size: S ≈ under an hour, M ≈ half a day, L ≈ a day or more. */
  effort: Effort;
  /** 3 = do next, 2 = this month, 1 = when there is room. */
  impact: Impact;
  /** Existing pages this would touch or should link to. */
  related?: string[];
  /** Popularity-based ordering key; higher first. Computed, never typed. */
  score: number;
};

/* ------------------------------------------------------------------ *
 * Input: the demand list
 * ------------------------------------------------------------------ */

/**
 * Queries from a Search Console export that the corpus does not answer.
 *
 * **This is the one hand-maintained input in the file, and it must stay small.**
 * It is replaced wholesale after each export; it is not appended to. Every entry
 * needs both the query text and the impressions that justify the work, so an
 * idea with no demand cannot sneak in on enthusiasm.
 *
 * Source: 2026-11-25 export (see `docs/gsc-audit-2026-11.md`).
 */
const QUERY_GAPS: {
  id: string;
  title: string;
  queries: string[];
  impressions: number;
  kind: BacklogKind;
  effort: Effort;
  impact: Impact;
  rationale: string;
  related?: string[];
}[] = [
  {
    id: "whisper-fine-tuning",
    title: "Whisper fine-tuning, in plain English",
    queries: ["whisper fine tuning", "fine-tune whisper", "fine tune whisper model"],
    impressions: 13,
    kind: "article",
    effort: "M",
    impact: 3,
    rationale:
      "13 impressions for a page that does not exist. The deep technical lesson is already written but noindexed, so a CEA-original companion can rank without duplicating upstream prose.",
    related: ["/ai-engineering/06-speech-and-audio/05-whisper-architecture-finetuning"],
  },
  {
    id: "speaking-pipeline",
    title: "How to build a speaking pipeline",
    queries: ["how to build a speaking pipeline", "build a speaking pipeline"],
    impressions: 7,
    kind: "article",
    effort: "M",
    impact: 3,
    rationale:
      "7 impressions. The listen → transcribe → reason → speak chain exists in phase 6 but is not discoverable; ITL and TPOT, both in the export, are what decide whether it feels human.",
    related: ["/ai-engineering/06-speech-and-audio/12-voice-assistant-pipeline"],
  },
  {
    id: "mb-or-kb-standalone",
    title: "Which is bigger, MB or KB? — the question-shaped page",
    queries: ["which is bigger mb or kb", "which is bigger kb or mb", "mb ya kb kaun bada hai"],
    impressions: 9,
    kind: "article",
    effort: "S",
    impact: 3,
    rationale:
      "The largest cluster in the export is served by a lesson whose title is editorial ('What KB, MB and GB actually mean'). A page titled as the question, embedding the converter, competes for the query the lesson cannot match.",
    related: ["/blog/kilobytes-and-megabytes", "/tools/data-size-converter"],
  },
  {
    id: "what-is-a-dataset",
    title: "What a dataset actually is",
    queries: ["which of the statement below defines a dataset", "what is a dataset"],
    impressions: 5,
    kind: "article",
    effort: "S",
    impact: 2,
    rationale:
      "9 impressions across quiz-shaped queries. Written as a concept explainer, not an answer key — the honest version of what that traffic is looking for.",
    related: ["/tools/sql-datalab"],
  },
  {
    id: "canva-interface",
    title: "A tour of the Canva interface",
    queries: ["canva interface", "canva interface tour"],
    impressions: 1,
    kind: "article",
    effort: "S",
    impact: 1,
    rationale:
      "No lesson covers Canva at all, though the Graphic Design course teaches it. One impression today, but the gap is real and the course needs a landing page for it.",
    related: ["/classes"],
  },
  {
    id: "switch-vs-router",
    title: "Switch vs router: what each box in your house does",
    queries: ["elias wifi", "switch vs router"],
    impressions: 2,
    kind: "article",
    effort: "S",
    impact: 1,
    rationale:
      "The networking chapter (orders 181–190) never covers the two boxes themselves. Home wifi questions land on the hub and bounce.",
    related: ["/blog/wifi-at-home-without-mystery"],
  },
];

/* ------------------------------------------------------------------ *
 * Builders
 * ------------------------------------------------------------------ */

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Lessons that still open with a catalogue line because no short answer exists. */
function quickAnswerGaps(): BacklogItem[] {
  const gaps = blogPosts.filter((post) => !post.quickAnswer);

  return gaps.map((post, index) => ({
    id: `qa:${post.slug}`,
    kind: "lesson-revision" as const,
    signal: "missing-quick-answer" as const,
    title: `Add a short answer to “${post.title}”`,
    rationale:
      "This lesson still opens with a catalogue line. A reader arriving from a search result gets no answer in the first sentence, which is the measured defect behind the site's 0% click-through on 400+ impressions.",
    effort: "S" as const,
    // Earlier lessons are met by more new readers, so they are worth more.
    impact: (post.order <= 20 ? 3 : post.order <= 60 ? 2 : 1) as Impact,
    related: [`/blog/${post.slug}`],
    // Listed in reading order; earlier lessons sort ahead of later ones.
    score: 100 - index * 0.1,
  }));
}

/** Lessons past their scheduled review date. */
function reviewDue(today: string): BacklogItem[] {
  return blogPosts
    .map((post): BacklogItem | null => {
      const editorial = lessonEditorial(post.slug);
      if (!editorial.reviewDueAtIso || editorial.reviewedAt || editorial.reviewDueAtIso >= today) {
        return null;
      }
      const daysLate = Math.floor(
        (Date.parse(today) - Date.parse(editorial.reviewDueAtIso)) / 86_400_000,
      );
      return {
        id: `review:${post.slug}`,
        kind: "review" as const,
        signal: "review-due" as const,
        title: `Review “${post.title}” (${daysLate} days overdue)`,
        rationale: `Scheduled for review on ${editorial.reviewDueAtIso}, which has passed. A software step that has quietly stopped working is worse than a missing page, because it wastes the reader's afternoon and they do not know why.`,
        effort: "S" as const,
        impact: (daysLate > 60 ? 3 : 2) as Impact,
        related: [`/blog/${post.slug}`],
        score: 90 + Math.min(daysLate, 120) / 10,
      };
    })
    .filter((item): item is BacklogItem => item !== null);
}

/** Chapters with fewer than ten lessons — a hole where one was planned. */
function thinChapters(): BacklogItem[] {
  return noteChapters
    .map((chapter): BacklogItem | null => {
      const members = blogPosts.filter((p) => p.order >= chapter.from && p.order <= chapter.to);
      const expected = chapter.to - chapter.from + 1;
      const missing = expected - members.length;
      if (missing <= 0) return null;
      return {
        id: `chapter:${chapter.slug}`,
        kind: "chapter-completion" as const,
        signal: "thin-chapter" as const,
        title: `${chapter.title}: ${missing} lesson${missing === 1 ? "" : "s"} short`,
        rationale: `The chapter intends orders ${chapter.from}–${chapter.to} (${expected} lessons) but publishes ${members.length}. “${chapter.blurb.split(".")[0]}” is an incomplete promise.`,
        effort: "L" as const,
        impact: 2 as Impact,
        related: [],
        score: 40 + missing * 5,
      };
    })
    .filter((item): item is BacklogItem => item !== null);
}

/** Query gaps, scored by the demand that justifies them. */
function queryGaps(): BacklogItem[] {
  return QUERY_GAPS.map((gap) => ({
    id: `query:${gap.id}`,
    kind: gap.kind,
    signal: "query-gap" as const,
    title: gap.title,
    rationale: gap.rationale,
    queries: gap.queries,
    impressions: gap.impressions,
    effort: gap.effort,
    impact: gap.impact,
    related: gap.related,
    // Demand-led work outranks everything of the same impact: these are queries
    // Google has already shown the site for.
    score: 200 + gap.impressions,
  }));
}

/* ------------------------------------------------------------------ *
 * Assembly
 * ------------------------------------------------------------------ */

/**
 * Build the ranked backlog.
 *
 * `today` is injectable so the output is testable and so a scheduled run is
 * reproducible. Defaults to the real date only when called without one.
 */
export function buildBacklog(today = new Date().toISOString().slice(0, 10)): BacklogItem[] {
  const items = [...queryGaps(), ...reviewDue(today), ...quickAnswerGaps(), ...thinChapters()];

  // Impact dominates, then the signal's own score, then effort as a tie-break so
  // quick wins surface ahead of long jobs of equal worth.
  const effortRank: Record<Effort, number> = { S: 3, M: 2, L: 1 };

  return items.sort((a, b) => {
    if (b.impact !== a.impact) return b.impact - a.impact;
    if (b.score !== a.score) return b.score - a.score;
    return effortRank[b.effort] - effortRank[a.effort];
  });
}

/** Counts by signal, for the summary line at the top of the report. */
export function backlogSummary(items: BacklogItem[]): Record<BacklogSignal, number> {
  const summary: Record<BacklogSignal, number> = {
    "query-gap": 0,
    "review-due": 0,
    "missing-quick-answer": 0,
    "thin-chapter": 0,
  };
  for (const item of items) summary[item.signal] += 1;
  return summary;
}

export { QUERY_GAPS, slugify };
