/**
 * The public change log for the learning notes.
 *
 * Every entry must be true and dated. This page exists because AdSense's site
 * quality check explicitly looks for "ongoing curation and structural
 * maintenance" — and a policy page is a promise, while a dated log is evidence.
 *
 * Rules for adding an entry:
 *  · one entry per month of real work, not per deploy;
 *  · link the lessons or URLs affected;
 *  · when a page was merged or retired, say where it went;
 *  · never back-date an entry, and never log a review that did not happen.
 */

export type ChangeKind =
  "published" | "revised" | "merged" | "retired" | "correction" | "infrastructure";

export type ChangeEntry = {
  /** ISO date, the day the change was published. */
  date: string;
  kind: ChangeKind;
  title: string;
  detail: string;
  /** Lessons or pages touched. Empty for site-wide work. */
  affected?: { label: string; href?: string }[];
};

export const CHANGELOG_STARTED = "2026-10-26";

export const changelog: ChangeEntry[] = [
  {
    date: "2026-10-26",
    kind: "infrastructure",
    title: "Editorial maintenance record opened",
    detail:
      "We began publishing a visible record of what is added, revised, merged and retired on this site, together with a 180-day review cycle for every lesson. Every lesson now shows when it is next due for review, and a reviewer is named only when a person has actually read and checked the page. Nothing here is back-dated.",
    affected: [
      { label: "Editorial standards", href: "/editorial" },
      { label: "Corrections log", href: "/editorial/corrections" },
    ],
  },
  {
    date: "2026-10-26",
    kind: "infrastructure",
    title: "Lesson review schedule and authorship made explicit",
    detail:
      "Each lesson page now carries its authorship, reading time and review status. Where a publication date cannot be evidenced from our own records, we show the review schedule instead of inventing a date.",
    affected: [{ label: "The notes", href: "/blog" }],
  },
  {
    date: "2026-10-26",
    kind: "retired",
    title: "Two thin pages closed rather than padded",
    detail:
      "The library and stories pages were redirecting to nothing useful, so they remain permanently retired: /library now goes to the course catalogue and /stories to the About page. We would rather remove an empty page than fill it with filler.",
    affected: [
      { label: "Courses", href: "/classes" },
      { label: "About", href: "/about" },
    ],
  },
  {
    date: "2026-10-22",
    kind: "published",
    title: "The notes: 210 lessons in one series",
    detail:
      "The complete beginner-to-independent series was published: twenty-one chapters covering the machine, files, typing, the internet, email, documents, spreadsheets, phones, safety, repairs, freelancing and teaching online. Every lesson is written to be read without a screenshot, with a self-check and a 'if this went wrong' section.",
    affected: [{ label: "Start at lesson one", href: "/blog/sitting-down-at-a-computer" }],
  },
];

export const changelogTotals = changelog.reduce<Record<ChangeKind, number>>(
  (acc, entry) => ({ ...acc, [entry.kind]: (acc[entry.kind] ?? 0) + 1 }),
  { published: 0, revised: 0, merged: 0, retired: 0, correction: 0, infrastructure: 0 },
);
