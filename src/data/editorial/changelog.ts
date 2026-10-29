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
    date: "2026-10-29",
    kind: "revised",
    title: "The notes are being rewritten as direct teaching, in plain English",
    detail:
      "We are rewriting the series from literary prose into straightforward teaching: what you will be able to do, the steps in the order you do them, what to do when it goes wrong, and a short practice task. Longer sentences, metaphor, em dashes and invented characters are being removed, and the local detail, figures and technical honesty are kept. The first one hundred lessons, chapters one to ten, are live in the new voice. The remaining chapters follow in reading order, and the standard we are writing to is published in docs/notes-rewrite-standard.md.",
    affected: [
      { label: "Start at lesson one", href: "/blog/sitting-down-at-a-computer" },
      { label: "Where your work lives", href: "/blog/files-and-folders" },
      { label: "Backup before the light goes", href: "/blog/backup-before-the-light-goes" },
      { label: "Asking for help safely", href: "/blog/asking-for-help-without-the-password" },
      { label: "Copy and paste between programs", href: "/blog/copy-and-paste-between-programs" },
    ],
  },
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
    kind: "correction",
    title: "We stopped showing a publication date we could not evidence",
    detail:
      "Until today every lesson carried the same build date, which was not a publication date at all. Our first fix spread invented per-lesson dates across 2026 — also wrong, because we do not hold the real days. We have removed both. Lessons now say the series was released during 2026, which we can evidence: 26 lessons were live at our 24 August 2026 audit and the series was complete by 24 October 2026. From today, a lesson published with a recorded day will show that day.",
    affected: [
      { label: "What we can and cannot date", href: "/editorial/corrections" },
      { label: "Start at lesson one", href: "/blog/sitting-down-at-a-computer" },
    ],
  },
  {
    date: "2026-10-26",
    kind: "infrastructure",
    title: "A 180-day review cycle, staggered into a weekly rotation",
    detail:
      "Each lesson is now scheduled for review every six months. The first cycle is staggered so the team checks roughly eight lessons a week rather than all 210 at once; the cycle starts today, so a lesson published in January is not treated as late on a rule adopted in October. A reviewer's name appears only after a person has read and signed the page.",
    affected: [{ label: "The review record", href: "/editorial/corrections" }],
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
    date: "2026-10-24",
    kind: "published",
    title: "The notes completed: 210 lessons across twenty-one chapters",
    detail:
      "The beginner-to-independent series finished, covering the machine, files, typing, the internet, email, documents, spreadsheets, phones, safety, repairs, freelancing and teaching online. It was written and released through 2026, not in a single sitting: 26 of these lessons were already live at our August audit. Every lesson is written to be read without a screenshot, with a self-check and an 'if this went wrong' section.",
    affected: [{ label: "Start at lesson one", href: "/blog/sitting-down-at-a-computer" }],
  },
];

export const changelogTotals = changelog.reduce<Record<ChangeKind, number>>(
  (acc, entry) => ({ ...acc, [entry.kind]: (acc[entry.kind] ?? 0) + 1 }),
  { published: 0, revised: 0, merged: 0, retired: 0, correction: 0, infrastructure: 0 },
);
