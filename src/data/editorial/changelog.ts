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
    date: "2026-11-27",
    kind: "published",
    title: "Four doors on the front page, and a hero that moves",
    detail:
      "The homepage now opens with a row of four plain intentions — a course and its fee, some advice, a tool to try now, or an answer to a specific question — placed before any scrolling content, because that is where a first-time visitor decides whether the site has what they came for. The hero gained a slow constellation field drawn in a 2D canvas, headings that rise into place word by word, and buttons that lean toward a fine pointer. None of it hides content before the script runs, all of it is disabled when a visitor asks for reduced motion, and the page is fully readable with JavaScript switched off. Separately, seven routes that declared themselves non-indexable were being served as indexable because the metadata layer ignored the declaration; that is fixed.",
    affected: [
      { label: "The centre", href: "/" },
      { label: "Every course and fee", href: "/classes" },
      { label: "Find a starting point", href: "/learning-trail" },
      { label: "Practice labs", href: "/tools" },
    ],
  },
  {
    date: "2026-11-26",
    kind: "correction",
    title: "Ranked pages stopped redirecting readers away",
    detail:
      "Search Console showed 506 impressions and zero clicks across twenty-nine glossary URLs, including a page ranking second for its term and another ranking fourth. The cause was a redirect: every term went to a course list, whatever it was about. Each term now goes to the article that answers it. Five new articles cover the questions the export showed we were appearing for and not answering: what a SOC room is, where files go when they are in the cloud, what KB and GB stand for, how to type the naira sign, and what agile actually means. One page was retitled because its title did not contain the words the query uses.",
    affected: [
      { label: "What a SOC room is", href: "/blog/what-a-soc-room-is" },
      { label: "Where your files actually are", href: "/blog/where-your-files-actually-are" },
      { label: "What KB, MB and GB stand for", href: "/blog/what-kb-mb-gb-stand-for" },
      { label: "How to type the naira sign", href: "/blog/how-to-type-the-naira-sign" },
      { label: "What agile methodology means", href: "/blog/what-agile-methodology-means" },
      { label: "Zero Trust, without the vendor slides", href: "/blog/zero-trust-in-plain-words" },
    ],
  },
  {
    date: "2026-11-25",
    kind: "published",
    title: "Two new explainers: what an AI agent is, and the cybersecurity jobs",
    detail:
      "Two companion articles, both written in the plain voice and both answering a question the site was already being found for without satisfying. The first explains what an AI agent is by describing the loop it runs and the test that separates it from a chatbot or a script, then hands the reader to the agent-engineering lessons. The second explains that cybersecurity is not a job title, describes the four roles that hire, and gives no salary figure — there is no source for one, and an invented number is worse than none. Thirty-two pages also had their headings corrected so a screen reader announces them in order, and twelve form fields on the practice screens gained labels.",
    affected: [
      {
        label: "What an AI agent is, in plain words",
        href: "/blog/what-is-an-ai-agent-in-plain-words",
      },
      {
        label: "The cybersecurity jobs, and what to learn for each",
        href: "/blog/cybersecurity-jobs-and-what-they-pay",
      },
      { label: "Agent engineering lessons", href: "/ai-engineering" },
      { label: "Cybersecurity classes", href: "/classes/cybersecurity" },
    ],
  },
  {
    date: "2026-10-29",
    kind: "revised",
    title: "Every lesson rewritten as direct teaching, in plain English",
    detail:
      "The rewrite is finished. All two hundred and ten lessons, chapters one to twenty-one, are now in the plain, direct voice: what you will be able to do, the steps in the order you do them, what your screen should look like, one common misunderstanding, what to do when it fails, and a short practice task. Metaphor, invented characters and em dashes are gone, and the local detail, the figures and the honest limits are kept. The shortest lesson is 608 words and the longest is 1,062, averaging 781. The standard we wrote to is published in docs/notes-rewrite-standard.md.",
    affected: [
      { label: "Start at lesson one", href: "/blog/sitting-down-at-a-computer" },
      { label: "Where your work lives", href: "/blog/files-and-folders" },
      { label: "Backup before the light goes", href: "/blog/backup-before-the-light-goes" },
      { label: "Asking for help safely", href: "/blog/asking-for-help-without-the-password" },
      { label: "Copy and paste between programs", href: "/blog/copy-and-paste-between-programs" },
      { label: "The last lesson", href: "/blog/the-road-ahead" },
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
