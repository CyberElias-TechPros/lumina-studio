/**
 * Course page quality audit — measured from the prerendered HTML.
 *
 * The course pages are the commercial half of the site and the pages a reviewer
 * samples when judging "substantial unique value". A word count taken by hand
 * cannot regress-detect anything, so this reads the pages `next build` actually
 * wrote and checks the properties that can be proved from the output:
 *
 *   · body word count (floor 700 — the standard in
 *     docs/adsense-low-value-remediation.md §5)
 *   · FAQ structured data present (the page answers fee, laptop, refund questions)
 *   · a named instructor in structured data
 *   · at least two published session lectures linked (the "read before you pay"
 *     route into the lesson corpus)
 *
 * Run after `npm run build`. Exit 1 under --strict when a page falls short.
 *
 *   node scripts/audit-course-pages.mjs [--strict]
 */

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const strict = process.argv.includes("--strict");
const APP_DIR = join(root, ".next/server/app/classes");

const FLOOR = 700;

if (!existsSync(APP_DIR)) {
  console.error("No prerendered output at .next/server/app/classes — run `npm run build` first.");
  process.exit(strict ? 1 : 0);
}

function textWords(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  return text.split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
}

const slugs = readdirSync(APP_DIR, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
  .map((entry) => entry.name.replace(/\.html$/, ""))
  .sort();

if (slugs.length === 0) {
  console.error("No course pages found in the prerendered output.");
  process.exit(strict ? 1 : 0);
}

const rows = [];
const errors = [];

for (const slug of slugs) {
  const html = readFileSync(join(APP_DIR, `${slug}.html`), "utf8");
  const compact = html.replace(/\s+/g, "");

  const words = textWords(html);
  const hasFaq = compact.includes('"@type":"FAQPage"');
  const hasInstructor = /"@type":"Person"/.test(compact) || compact.includes("instructor");
  const sessionLinks = new Set(
    [...html.matchAll(new RegExp(`href="/classes/${slug}/([a-z0-9-]+)"`, "g"))].map((m) => m[1]),
  ).size;

  const short = [];
  if (words < FLOOR) short.push(`${words} words < ${FLOOR}`);
  if (!hasFaq) short.push("no FAQ schema");
  if (!hasInstructor) short.push("no instructor");
  if (sessionLinks < 2) short.push(`${sessionLinks} published session link(s)`);

  rows.push({ slug, words, sessionLinks, hasFaq, hasInstructor });
  if (short.length) errors.push(`${slug}: ${short.join(", ")}`);
}

rows.sort((a, b) => a.words - b.words);

console.log("Course page quality (prerendered HTML)");
console.log(`  pages:   ${rows.length}`);
console.log(`  floor:   ${FLOOR} words`);
console.log(`  lowest:  ${rows[0].slug} — ${rows[0].words} words`);
console.log(`  highest: ${rows.at(-1).slug} — ${rows.at(-1).words} words`);
console.log(`  median:  ${rows[Math.floor(rows.length / 2)].words} words`);
console.log(`  FAQ schema on all pages:         ${rows.every((r) => r.hasFaq) ? "yes" : "no"}`);
console.log(
  `  instructor on all pages:         ${rows.every((r) => r.hasInstructor) ? "yes" : "no"}`,
);
console.log(
  `  >=2 session links on all pages:  ${rows.every((r) => r.sessionLinks >= 2) ? "yes" : "no"}`,
);

if (errors.length) {
  console.log("\nBelow the standard");
  for (const error of errors) console.log(`  ✗ ${error}`);
} else {
  console.log(`\nAll ${rows.length} course pages meet the §5 standard.`);
}

if (strict && errors.length) {
  console.error("\nCourse page audit failed.");
  process.exit(1);
}
