/**
 * Derives editorial dates for every published lesson and merges them with the
 * human-maintained review record.
 *
 * Why this exists
 * ---------------
 * AdSense's current "low value content" rejection asks for "ongoing curation and
 * structural maintenance". A corpus with no dates anywhere reads as generated or
 * abandoned. But invented dates are worse than none: they are a misrepresentation.
 *
 * So every date this script writes is traceable:
 *
 *   publishedAt  — in priority order: a per-lesson entry in lesson-reviews.json;
 *                  the owner's declared schedule in publication-schedule.json; a
 *                  single evidenced seriesPublishedAt; then the git author date of
 *                  the commit that first introduced the lesson's slug. A shallow
 *                  clone cannot evidence publication, so git dates are suppressed
 *                  for display rather than asserted.
 *   reviewedAt   — ONLY from src/data/editorial/lesson-reviews.json, which an
 *                  editor writes by hand after actually reading and correcting
 *                  the lesson. This script never invents a review.
 *   reviewDueAt  — reviewedAt + REVIEW_CYCLE_DAYS, or publishedAt + the same
 *                  cycle when a lesson has never been reviewed. It is a schedule,
 *                  not a claim: the UI labels it "review due".
 *
 * Output: src/data/editorial/lesson-dates.generated.json (committed).
 *
 * Usage: node scripts/generate-lesson-editorial.mjs [--check]
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(root, "src/data/editorial");
const OUT_FILE = join(OUT_DIR, "lesson-dates.generated.json");
const REVIEWS_FILE = join(OUT_DIR, "lesson-reviews.json");
const SCHEDULE_FILE = join(OUT_DIR, "publication-schedule.json");
const BLOG_FILE = "src/data/blog.ts";
const REVIEW_CYCLE_DAYS = 180;

/**
 * The day the 180-day review cycle was adopted. A lesson published in January
 * cannot be "late" on a rule that did not exist until October — so the clock
 * starts here, not at publication. The first-cycle due dates are then staggered
 * across the cycle so the team reviews a few lessons each week instead of facing
 * 210 reviews on one day. A due date is a plan, never a claim that a review
 * happened.
 */
const REVIEW_POLICY_STARTED = "2026-10-26";
const checkOnly = process.argv.includes("--check");

function git(args) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

/** First commit that introduced `"slug"` into the blog data file. */
function firstSeen(slug) {
  try {
    const out = git(["log", "-S", `"${slug}"`, "--reverse", "--format=%aI", "--", BLOG_FILE]);
    const first = out.split("\n").filter(Boolean)[0];
    return first ? first.slice(0, 10) : null;
  } catch {
    return null;
  }
}

const isShallow = (() => {
  try {
    return git(["rev-parse", "--is-shallow-repository"]) === "true";
  } catch {
    return false;
  }
})();

// Native TypeScript type-stripping is only unflagged from Node 22.18 / 23.6.
// On Node 20 the import below throws ERR_UNKNOWN_FILE_EXTENSION, which reads like a
// bug in this script rather than a runtime that is too old. Say which it is.
const [nodeMajor, nodeMinor] = process.versions.node.split(".").map(Number);
if (nodeMajor < 22 || (nodeMajor === 22 && nodeMinor < 18)) {
  console.error(
    `This script imports ${BLOG_FILE} directly and needs Node >= 22.18 for native ` +
      `TypeScript type-stripping. Running ${process.versions.node}.`,
  );
  process.exit(1);
}

const { blogPosts } = await import(join(root, "src/data/blog.ts"));

const reviews = existsSync(REVIEWS_FILE) ? JSON.parse(readFileSync(REVIEWS_FILE, "utf8")) : {};

/**
 * The owner may record one evidenced date for the whole series instead of 210
 * individual ones. Set reviews.seriesPublishedAt to the date the notes first went
 * live — only if it can be evidenced. It is applied to lessons with no own record.
 */
const seriesPublishedAt = reviews.seriesPublishedAt ?? null;
const lessonRecords = reviews.lessons ?? {};

/**
 * The owner's declared publication schedule. This is an editorial record, not a
 * derivation: the Academy states when it published, and the site displays that.
 */
const schedule = existsSync(SCHEDULE_FILE) ? JSON.parse(readFileSync(SCHEDULE_FILE, "utf8")) : null;
const scheduledDates = schedule?.dates ?? {};

function addDays(isoDate, days) {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

const lessons = {};
const unknown = [];
let reviewed = 0;
const reviewers = new Set();

/** Publication order, used to stagger the first review rotation. */
const byOrder = [...blogPosts].sort((a, b) => a.order - b.order);
const rotationIndex = new Map(byOrder.map((post, index) => [post.slug, index]));

for (const post of blogPosts) {
  const record = lessonRecords[post.slug] ?? {};
  const handRecorded = record.publishedAt ?? null;
  const handPrecision = record.precision ?? (handRecorded ? "exact" : null);
  const scheduled = scheduledDates[post.slug] ?? null;
  const schedulePrecision = schedule?.precision ?? "estimated";

  let publishedAt;
  let publishedAtSource;
  /**
   * "exact" means the Academy holds the real day and the site may state it.
   * "estimated" means the day exists only to order the review rotation: it is
   * never displayed and never emitted as schema datePublished.
   */
  let precision;

  if (handRecorded && handPrecision === "exact") {
    publishedAt = handRecorded;
    publishedAtSource = "editorial-record";
    precision = "exact";
  } else if (handRecorded) {
    publishedAt = handRecorded;
    publishedAtSource = "estimate";
    precision = "estimated";
  } else if (scheduled) {
    publishedAt = scheduled;
    publishedAtSource = schedulePrecision === "exact" ? "declared-schedule" : "estimate";
    precision = schedulePrecision === "exact" ? "exact" : "estimated";
  } else if (seriesPublishedAt) {
    publishedAt = seriesPublishedAt;
    publishedAtSource = "estimate";
    precision = "estimated";
  } else {
    publishedAt = firstSeen(post.slug);
    publishedAtSource = publishedAt ? "git" : "unresolved";
    precision = publishedAt ? "exact" : null;
  }

  if (!publishedAt) {
    unknown.push(post.slug);
    publishedAt = null;
  }

  const reviewedAt = record.reviewedAt ?? null;
  if (reviewedAt) {
    reviewed += 1;
    if (record.reviewer) reviewers.add(record.reviewer);
  }

  let reviewDueAt;
  if (reviewedAt) {
    reviewDueAt = addDays(reviewedAt, REVIEW_CYCLE_DAYS);
  } else {
    const index = rotationIndex.get(post.slug) ?? 0;
    const slots = Math.max(1, blogPosts.length - 1);
    const offset = Math.round((index * (REVIEW_CYCLE_DAYS - 1)) / slots) + 1;
    reviewDueAt = addDays(REVIEW_POLICY_STARTED, offset);
  }

  lessons[post.slug] = {
    publishedAt,
    publishedAtSource,
    precision,
    reviewedAt,
    reviewer: record.reviewer ?? null,
    reviewDueAt,
    note: record.note ?? null,
  };
}

const exactCount = Object.values(lessons).filter((l) => l.precision === "exact").length;

const payload = {
  generatedBy: "scripts/generate-lesson-editorial.mjs",
  method: schedule
    ? "publishedAt = the Academy's declared publication schedule (publication-schedule.json), with per-lesson overrides in lesson-reviews.json taking priority; git history is used only as a fallback when no record exists. reviewedAt = a hand-written review record only."
    : "publishedAt = git author date that first introduced the lesson slug; reviewedAt = hand-written review record only.",
  scheduleDeclaredBy: schedule?.declaredBy ?? null,
  scheduleWindow: schedule ? `${schedule.firstPublishedAt} → ${schedule.lastPublishedAt}` : null,
  reviewCycleDays: REVIEW_CYCLE_DAYS,
  reviewPolicyStarted: REVIEW_POLICY_STARTED,
  shallowHistory: isShallow,
  totals: {
    lessons: blogPosts.length,
    exactPublicationDates: exactCount,
    estimatedDates: blogPosts.length - exactCount,
    reviewed,
    unreviewed: blogPosts.length - reviewed,
    unresolvedPublishedAt: unknown.length,
  },
  lessons,
};

const serialised = `${JSON.stringify(payload, null, 2)}\n`;

if (checkOnly) {
  const current = existsSync(OUT_FILE) ? readFileSync(OUT_FILE, "utf8") : "";
  if (current !== serialised) {
    console.error("lesson-dates.generated.json is stale. Run: npm run generate:editorial");
    process.exit(1);
  }
  console.log("Editorial dates are current.");
  process.exit(0);
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, serialised);

console.log(
  [
    `Lessons: ${blogPosts.length}`,
    `Reviewed: ${reviewed} · unreviewed: ${blogPosts.length - reviewed}`,
    `Exact publication dates: ${exactCount} · estimates (not displayed): ${blogPosts.length - exactCount}`,
    `Unresolved publication dates: ${unknown.length}${unknown.length ? ` (${unknown.slice(0, 5).join(", ")}…)` : ""}`,
    `Shallow git history: ${isShallow}${isShallow ? " — dates reflect this clone, not the original publication" : ""}`,
    `Wrote ${OUT_FILE.replace(`${root}/`, "")}`,
  ].join("\n"),
);
