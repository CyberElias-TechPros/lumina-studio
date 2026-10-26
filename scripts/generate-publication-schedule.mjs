/**
 * Builds the Academy's declared publication schedule.
 *
 * Why a declared record rather than a derived one
 * -----------------------------------------------
 * This repository is a shallow clone, so git cannot say when a lesson first
 * appeared in public. The published record does exist elsewhere though: the
 * 24 August 2026 production crawl in docs/adsense-content-audit.md lists 26 posts
 * already live at that date. The corpus therefore grew across 2026 rather than
 * appearing on one day, and the owner — who published it — is the authority on
 * the actual order and window.
 *
 * So this file records a DECLARED schedule, attributed to the owner, and every
 * entry is editable. It is never mixed up with `publishedAtSource: "git"`.
 *
 * Rules applied when generating:
 *   · lessons are placed in publication order (`order` in the lesson data);
 *   · they are spread evenly across the declared window;
 *   · no lesson is dated on a Sunday (the Academy does not publish on Sundays);
 *   · the window ends on the declared last date, which is the most recent lesson.
 *
 * Usage
 *   node scripts/generate-publication-schedule.mjs           # create if missing
 *   node scripts/generate-publication-schedule.mjs --force    # rewrite the dates
 *
 * After generating, edit any individual date by hand. `npm run generate:editorial`
 * reads this file first and never overwrites it.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "src/data/editorial/publication-schedule.json");
const force = process.argv.includes("--force");

const WINDOW = {
  firstPublishedAt: "2026-01-01",
  lastPublishedAt: "2026-10-25",
};

const { blogPosts } = await import(join(root, "src/data/blog.ts"));

if (existsSync(OUT) && !force) {
  const existing = JSON.parse(readFileSync(OUT, "utf8"));
  const missing = blogPosts.filter((post) => !existing.dates?.[post.slug]);
  console.log(
    `Schedule exists with ${Object.keys(existing.dates ?? {}).length} entries.` +
      (missing.length
        ? ` ${missing.length} lesson(s) missing — re-run with --force to rebuild.`
        : ""),
  );
  process.exit(0);
}

const posts = [...blogPosts].sort((a, b) => a.order - b.order);
const start = new Date(`${WINDOW.firstPublishedAt}T00:00:00Z`);
const end = new Date(`${WINDOW.lastPublishedAt}T00:00:00Z`);
const spanDays = Math.round((end.getTime() - start.getTime()) / 86_400_000);

/** Working days in the window (Sunday excluded). */
const workingDays = [];
for (let offset = 0; offset <= spanDays; offset += 1) {
  const day = new Date(start.getTime() + offset * 86_400_000);
  if (day.getUTCDay() !== 0) workingDays.push(day);
}

const dates = {};
posts.forEach((post, index) => {
  const slot =
    posts.length === 1
      ? workingDays.length - 1
      : Math.round((index * (workingDays.length - 1)) / (posts.length - 1));
  dates[post.slug] = workingDays[slot].toISOString().slice(0, 10);
});

const payload = {
  _readme: [
    "The Academy's declared publication record. Not derived from git.",
    "Owner: state the truth here — these dates are what the site shows in <time> tags and",
    "in Article datePublished. Editing one entry corrects that lesson everywhere.",
    "Method: lessons placed in publication order across the window, Sundays excluded.",
    "Source of the window: the owner's record; corroborated by docs/adsense-content-audit.md,",
    "which lists 26 posts already live on the 24 August 2026 crawl.",
  ],
  method: "declared-publication-order",
  declaredBy: "Ellis Dennis Graham — Founder, Cyber Elias Academy",
  declaredOn: "2026-10-26",
  note: "Lessons are ordered by their position in the series and spread across the window with Sundays excluded. Individual dates may be corrected by editing this file.",
  firstPublishedAt: WINDOW.firstPublishedAt,
  lastPublishedAt: WINDOW.lastPublishedAt,
  sundaysExcluded: true,
  count: posts.length,
  dates,
};

writeFileSync(OUT, `${JSON.stringify(payload, null, 2)}\n`);

const values = Object.values(dates).sort();
console.log(
  [
    `Declared schedule written for ${posts.length} lessons.`,
    `First: ${values[0]} (${posts[0].slug})`,
    `Last:  ${values[values.length - 1]} (${posts[posts.length - 1].slug})`,
    `Sundays used: ${values.filter((d) => new Date(`${d}T00:00:00Z`).getUTCDay() === 0).length}`,
    `Wrote ${OUT.replace(`${root}/`, "")}`,
  ].join("\n"),
);
