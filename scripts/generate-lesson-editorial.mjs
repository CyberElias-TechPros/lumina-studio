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
 *   publishedAt  — the git author date of the commit that first introduced the
 *                  lesson's slug into src/data/blog.ts. Where a repository is
 *                  shallow or git is unavailable, the committed generated file is
 *                  left untouched and the record says so.
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
const BLOG_FILE = "src/data/blog.ts";
const REVIEW_CYCLE_DAYS = 180;
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

const { blogPosts } = await import(join(root, "src/data/blog.ts"));

const reviews = existsSync(REVIEWS_FILE) ? JSON.parse(readFileSync(REVIEWS_FILE, "utf8")) : {};

/**
 * The owner may record one evidenced date for the whole series instead of 210
 * individual ones. Set reviews.seriesPublishedAt to the date the notes first went
 * live — only if it can be evidenced. It is applied to lessons with no own record.
 */
const seriesPublishedAt = reviews.seriesPublishedAt ?? null;
const lessonRecords = reviews.lessons ?? {};

function addDays(isoDate, days) {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

const lessons = {};
const unknown = [];
let reviewed = 0;
const reviewers = new Set();

for (const post of blogPosts) {
  const record = lessonRecords[post.slug] ?? {};
  const recorded = record.publishedAt ?? seriesPublishedAt ?? null;
  let publishedAt = recorded ?? firstSeen(post.slug);
  const publishedAtSource = recorded ? "editorial-record" : publishedAt ? "git" : "unresolved";

  if (!publishedAt) {
    unknown.push(post.slug);
    publishedAt = null;
  }

  const reviewedAt = record.reviewedAt ?? null;
  if (reviewedAt) {
    reviewed += 1;
    if (record.reviewer) reviewers.add(record.reviewer);
  }

  const base = reviewedAt ?? publishedAt;
  lessons[post.slug] = {
    publishedAt,
    publishedAtSource,
    reviewedAt,
    reviewer: record.reviewer ?? null,
    reviewDueAt: base ? addDays(base, REVIEW_CYCLE_DAYS) : null,
    note: record.note ?? null,
  };
}

const payload = {
  generatedBy: "scripts/generate-lesson-editorial.mjs",
  method:
    "publishedAt = git author date that first introduced the lesson slug; reviewedAt = hand-written review record only. No date is invented.",
  reviewCycleDays: REVIEW_CYCLE_DAYS,
  shallowHistory: isShallow,
  totals: {
    lessons: blogPosts.length,
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
    `Unresolved publication dates: ${unknown.length}${unknown.length ? ` (${unknown.slice(0, 5).join(", ")}…)` : ""}`,
    `Shallow git history: ${isShallow}${isShallow ? " — dates reflect this clone, not the original publication" : ""}`,
    `Wrote ${OUT_FILE.replace(`${root}/`, "")}`,
  ].join("\n"),
);
