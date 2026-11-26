#!/usr/bin/env node
/**
 * review:lesson — record that a person actually reviewed a lesson.
 *
 * ## Why this exists
 *
 * The site promises a 180-day review cycle. It has 210 lessons, none of them ever
 * marked reviewed, and 34 already past their scheduled date. The cycle was a
 * schedule with no way to discharge it: `lesson-reviews.json` says "add only after
 * a person has actually read and checked the lesson", and then gives that person
 * no tool. So nobody did, `reviewedAt` stayed empty, and — because
 * `lessonEditorialIso()` only emits `dateModified` from `reviewedAt` — **the whole
 * site has been publishing zero freshness signal in its structured data.**
 *
 * This closes the loop. It is deliberately awkward in one specific way: it will
 * not record a review unless the reviewer ticks every item, and it refuses to
 * write a date in the future or a reviewer name it cannot attribute. A tool that
 * makes it easy to claim a review happened is worse than no tool, because the
 * claim then ends up in machine-readable markup served to Google.
 *
 * ## Usage
 *
 *   node scripts/review-lesson.mjs --list
 *       Show what is due, oldest first.
 *
 *   node scripts/review-lesson.mjs --slug what-is-a-file --reviewer "Elias" --check
 *       Run the pre-flight checks on one lesson and print what to verify.
 *
 *   node scripts/review-lesson.mjs --slug what-is-a-file --reviewer "Elias" \
 *       --confirm-accuracy --confirm-links --confirm-screens --write
 *       Record the review. `--write` is required; without it nothing changes.
 *
 * ## What a review is, and is not
 *
 * A review is: a person opened the page, followed the steps against a current
 * device or account, and corrected what was wrong. It is **not** a spell-check, a
 * re-read for tone, or a "looks fine". The confirm flags correspond to the three
 * things that actually rot: the instructions, the links, and the screenshots.
 *
 * If a lesson did not need a change, that is still a review — record it. The date
 * is the point: it tells a reader the page was checked, not that it was edited.
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REVIEWS_FILE = join(root, "src/data/editorial/lesson-reviews.json");
const DATES_FILE = join(root, "src/data/editorial/lesson-dates.generated.json");
const BLOG_FILE = join(root, "src/data/blog.ts");

/* ------------------------------------------------------------------ *
 * Argument parsing
 * ------------------------------------------------------------------ */

const argv = process.argv.slice(2);
const has = (flag) => argv.includes(flag);
const valueOf = (flag) => {
  const at = argv.indexOf(flag);
  return at === -1 ? null : (argv[at + 1] ?? null);
};

const CONFIRM_FLAGS = {
  "--confirm-accuracy": "accuracy",
  "--confirm-links": "links",
  "--confirm-screens": "screens",
};

/* ------------------------------------------------------------------ *
 * Load
 * ------------------------------------------------------------------ */

function loadJson(path) {
  if (!existsSync(path)) {
    console.error(`Missing ${path}. Run \`npm run generate:editorial\` first.`);
    process.exit(2);
  }
  return JSON.parse(readFileSync(path, "utf8"));
}

const reviews = loadJson(REVIEWS_FILE);
const dates = loadJson(DATES_FILE);

/** Slugs, in reading order, straight from the lesson source. */
function lessonSlugs() {
  const source = readFileSync(BLOG_FILE, "utf8");
  return [...source.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
}

const slugs = lessonSlugs();
const today = new Date().toISOString().slice(0, 10);

/* ------------------------------------------------------------------ *
 * --list
 * ------------------------------------------------------------------ */

if (has("--list")) {
  const due = slugs
    .map((slug) => {
      const record = dates.lessons[slug];
      if (!record) return null;
      return {
        slug,
        due: record.reviewDueAt ?? "unknown",
        reviewed: record.reviewedAt ?? null,
        overdue: !record.reviewedAt && record.reviewDueAt && record.reviewDueAt < today,
      };
    })
    .filter(Boolean)
    .sort((a, b) => String(a.due).localeCompare(String(b.due)));

  const overdue = due.filter((item) => item.overdue);
  const pending = due.filter((item) => !item.reviewed);

  console.log(`\nReview queue — ${today}\n`);
  console.log(
    `  ${overdue.length} overdue · ${pending.length} never reviewed · ${slugs.length} total\n`,
  );

  if (overdue.length === 0) {
    console.log("  Nothing is overdue. Work through the rest as their dates arrive.\n");
  } else {
    console.log("  Overdue, oldest first:\n");
    for (const item of overdue) {
      console.log(`    ${item.due}  ${item.slug}`);
    }
    console.log("");
  }

  console.log("  Next due (not yet overdue):\n");
  for (const item of due.filter((d) => !d.overdue && !d.reviewed).slice(0, 10)) {
    console.log(`    ${item.due}  ${item.slug}`);
  }
  console.log("");
  process.exit(0);
}

/* ------------------------------------------------------------------ *
 * Review one lesson
 * ------------------------------------------------------------------ */

const slug = valueOf("--slug");
if (!slug) {
  console.error(
    "Pass --slug <lesson-slug>. Use --list to see the queue.\n" +
      'Example: node scripts/review-lesson.mjs --slug what-is-a-file --reviewer "Elias" --check',
  );
  process.exit(2);
}

if (!slugs.includes(slug)) {
  console.error(`"${slug}" is not a lesson slug. Use --list to see the queue.`);
  process.exit(2);
}

const record = dates.lessons[slug];
const reviewer = valueOf("--reviewer");

console.log(`\nLesson: ${slug}`);
console.log(`Last reviewed: ${record?.reviewedAt ?? "never"}`);
console.log(`Scheduled for review: ${record?.reviewDueAt ?? "unscheduled"}`);
console.log(`Recorded reviewer: ${record?.reviewer ?? "none"}\n`);

/* ---- --check: print what a reviewer must actually verify ---- */

if (has("--check")) {
  console.log("Before recording a review, confirm all three:\n");
  console.log("  1. Accuracy   — follow every step on a current device or account. Does it");
  console.log("                  still work, in the order written? Pay attention to menus,");
  console.log("                  button labels and settings paths, which move most often.");
  console.log("  2. Links      — open every external link. Is it still live, still correct,");
  console.log("                  and still the official source rather than a reseller?");
  console.log("  3. Screens    — check every screenshot against the current interface. A");
  console.log("                  screenshot of a menu that no longer exists is worse than none.\n");
  console.log("If something was wrong, fix the lesson first, then record the review.");
  console.log("If nothing was wrong, record it anyway — the date is the point.\n");
  console.log("Then re-run with:");
  console.log(
    `  --reviewer "<your name>" --confirm-accuracy --confirm-links --confirm-screens --write\n`,
  );
  process.exit(0);
}

/* ---- guardrails ---- */

if (!reviewer || reviewer.trim().length < 2) {
  console.error('Pass --reviewer "<name>". An unattributed review is not a review.');
  process.exit(2);
}

const missing = Object.keys(CONFIRM_FLAGS).filter((flag) => !has(flag));
if (missing.length > 0) {
  console.error(
    `Missing confirmation: ${missing.join(", ")}\n` +
      "This will not record a review you have not done. Run --check to see what each one means.",
  );
  process.exit(2);
}

if (!has("--write")) {
  console.log("Every check passed. Nothing was written — add --write to record the review.");
  process.exit(0);
}

/* ---- write ---- */

const lessons = { ...(reviews.lessons ?? {}) };
const existing = lessons[slug] ?? {};

lessons[slug] = {
  ...existing,
  reviewedAt: today,
  reviewer: reviewer.trim(),
  note:
    valueOf("--note") ??
    existing.note ??
    "Read and checked against a current device; steps, links and screens verified.",
};

const updated = {
  ...reviews,
  lessons: Object.fromEntries(Object.entries(lessons).sort(([a], [b]) => a.localeCompare(b))),
};

writeFileSync(REVIEWS_FILE, `${JSON.stringify(updated, null, 2)}\n`, "utf8");

console.log(`Recorded review of "${slug}" on ${today} by ${reviewer.trim()}.`);
console.log("Now run `npm run generate:editorial` so the dates and schema pick it up.");

/* ---- keep the generated dates in step ---- */

try {
  execFileSync("node", [join(root, "scripts/generate-lesson-editorial.mjs")], {
    cwd: root,
    stdio: "inherit",
  });
} catch {
  console.error(
    "Could not regenerate the editorial dates. Run `npm run generate:editorial` by hand.",
  );
  process.exit(1);
}
