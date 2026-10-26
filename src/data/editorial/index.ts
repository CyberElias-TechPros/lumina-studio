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
  publishedAtSource: "editorial-record" | "declared-schedule" | "estimate" | "git" | "unresolved";
  precision: "exact" | "estimated" | null;
  reviewedAt: string | null;
  reviewer: string | null;
  reviewDueAt: string | null;
  note: string | null;
};

const dates = generated as unknown as {
  reviewCycleDays: number;
  scheduleDeclaredBy?: string | null;
  scheduleWindow?: string | null;
  shallowHistory: boolean;
  totals: { lessons: number; reviewed: number; unreviewed: number; unresolvedPublishedAt: number };
  lessons: Record<string, LessonRecord>;
};

export const REVIEW_CYCLE_DAYS = dates.reviewCycleDays;
export const EDITORIAL_TOTALS = dates.totals;

/**
 * A date from a shallow clone tells us when *this checkout* first contained the
 * lesson, not when the site published it. Dates are asserted when the Academy has
 * recorded them (its own declaration or a hand-written per-lesson entry), and from
 * git only when the history is complete enough to know.
 */
const CAN_TRUST_GIT_DATES = !dates.shallowHistory;

export const PUBLICATIONS_ARE_DECLARED = Object.values(dates.lessons).some(
  (record) => record.publishedAtSource === "declared-schedule",
);
export const SCHEDULE_DECLARED_BY = dates.scheduleDeclaredBy ?? null;
export const SCHEDULE_WINDOW = dates.scheduleWindow ?? null;

/**
 * A publication date is only ever *stated* when the Academy holds the real day.
 * An estimated day may order the review rotation, but presenting it as a
 * publication date would be a misrepresentation — so it is never displayed and
 * never emitted as schema.
 */
function isExact(
  source: LessonRecord["publishedAtSource"] | undefined,
  precision: LessonRecord["precision"],
): boolean {
  if (precision !== "exact") return false;
  if (source === "editorial-record" || source === "declared-schedule") return true;
  if (source === "git") return CAN_TRUST_GIT_DATES;
  return false;
}

/**
 * What we can honestly say about how the corpus was released: 26 lessons were
 * live on the 24 August 2026 crawl and the series was complete by 24 October
 * 2026. Stated as a range, because per-lesson days were not recorded.
 */
export const SERIES_RELEASE = {
  window: "2026",
  evidenced:
    "26 lessons were already live at our 24 August 2026 audit; the series was complete by 24 October 2026.",
  hasExactDates: false,
} as const;

export type LessonEditorial = {
  /** Human-facing, shown only when the day is actually held (precision = exact). */
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

  const publishedTrusted = isExact(record.publishedAtSource, record.precision);

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
  const trusted = isExact(record.publishedAtSource, record.precision);
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
