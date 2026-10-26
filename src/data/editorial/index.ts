import generated from "./lesson-dates.generated.json";
import reviews from "./lesson-reviews.json";
import { changelog, changelogTotals, type ChangeEntry, type ChangeKind } from "./changelog";
import {
  corrections,
  CORRECTIONS_POLICY,
  correctionsOpened,
  type CorrectionEntry,
} from "./corrections";

export { changelog, changelogTotals, corrections, CORRECTIONS_POLICY, correctionsOpened };
export type { ChangeEntry, ChangeKind, CorrectionEntry };

type LessonRecord = {
  publishedAt: string | null;
  publishedAtSource: "editorial-record" | "git" | "unresolved";
  reviewedAt: string | null;
  reviewer: string | null;
  reviewDueAt: string | null;
  note: string | null;
};

const dates = generated as unknown as {
  reviewCycleDays: number;
  shallowHistory: boolean;
  totals: { lessons: number; reviewed: number; unreviewed: number; unresolvedPublishedAt: number };
  lessons: Record<string, LessonRecord>;
};

export const REVIEW_CYCLE_DAYS = dates.reviewCycleDays;
export const EDITORIAL_TOTALS = dates.totals;

/**
 * A derived publication date from a shallow clone tells us when *this checkout*
 * first contained the lesson, not when the site published it. We only assert a
 * publication date when it came from the hand-written editorial record, or when
 * the repository history is complete enough for git to know.
 */
const CAN_TRUST_GIT_DATES = !dates.shallowHistory;

export type LessonEditorial = {
  /** Human-facing, shown only when the date is evidenced (see CAN_TRUST_GIT_DATES). */
  publishedAt: string | null;
  reviewedAt: string | null;
  reviewer: string | null;
  /** Forward-looking schedule; never a claim that a review happened. */
  reviewDueAt: string | null;
  /** ISO 8601 forms for <time datetime> and structured data. */
  publishedAtIso: string | null;
  reviewedAtIso: string | null;
  reviewDueAtIso: string | null;
  isReviewed: boolean;
  isOverdue: boolean;
};

function fmt(date: string | null): string | null {
  if (!date) return null;
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function lessonEditorial(slug: string): LessonEditorial {
  const record = dates.lessons[slug];
  const today = new Date().toISOString().slice(0, 10);

  if (!record) {
    return {
      publishedAt: null,
      reviewedAt: null,
      reviewer: null,
      reviewDueAt: null,
      publishedAtIso: null,
      reviewedAtIso: null,
      reviewDueAtIso: null,
      isReviewed: false,
      isOverdue: false,
    };
  }

  const publishedTrusted =
    record.publishedAtSource === "editorial-record" ||
    (record.publishedAtSource === "git" && CAN_TRUST_GIT_DATES);

  return {
    publishedAt: publishedTrusted ? fmt(record.publishedAt) : null,
    reviewedAt: fmt(record.reviewedAt),
    reviewer: record.reviewer,
    reviewDueAt: fmt(record.reviewDueAt),
    publishedAtIso: publishedTrusted ? record.publishedAt : null,
    reviewedAtIso: record.reviewedAt,
    reviewDueAtIso: record.reviewDueAt,
    isReviewed: Boolean(record.reviewedAt),
    isOverdue: Boolean(record.reviewDueAt && !record.reviewedAt && record.reviewDueAt < today),
  };
}

/** ISO forms for structured data — omitted entirely when unevidenced. */
export function lessonEditorialIso(slug: string): {
  datePublished?: string;
  dateModified?: string;
  reviewedBy?: string;
} {
  const record = dates.lessons[slug];
  if (!record) return {};
  const trusted =
    record.publishedAtSource === "editorial-record" ||
    (record.publishedAtSource === "git" && CAN_TRUST_GIT_DATES);
  return {
    ...(trusted && record.publishedAt ? { datePublished: record.publishedAt } : {}),
    ...(record.reviewedAt ? { dateModified: record.reviewedAt } : {}),
    ...(record.reviewer ? { reviewedBy: record.reviewer } : {}),
  };
}

export const REVIEWED_LESSONS = Object.entries(dates.lessons)
  .filter(([, record]) => record.reviewedAt)
  .map(([slug, record]) => ({ slug, ...record }))
  .sort((a, b) => (b.reviewedAt ?? "").localeCompare(a.reviewedAt ?? ""));

export const HAND_WRITTEN_REVIEWS = Object.keys(reviews).length;
