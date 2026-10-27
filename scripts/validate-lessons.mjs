/**
 * Lesson contract validator.
 *
 * The editorial standard in docs/adsense-low-value-remediation.md only works if
 * something enforces it. This is that something: it checks every published
 * lesson against the contract that makes a page defensible to a reader and to a
 * reviewer, and every referenced image against the files actually on disk.
 *
 * Errors block (`--strict`); warnings never do. Run without `--strict` for a
 * report, with `--strict` in CI.
 *
 * Checks
 *   ERRORS
 *     · body under 600 words
 *     · no figure, or a figure missing alt/caption
 *     · duplicate slug or duplicate title
 *     · excerpt missing or over 220 characters
 *     · reading time not derivable (empty body)
 *     · an image referenced by the lesson does not exist on disk
 *     · an editorial record is missing a lesson, or names a slug that is gone
 *   WARNINGS
 *     · no hand-written review recorded (the 180-day cycle has not completed)
 *     · fewer than 3 figures (deeper lessons carry more)
 *     · a body under 700 words (depth target for new lessons)
 *     · no "if this went wrong" style recovery paragraph
 *     · an image appears in more than 3 lessons
 *
 * Usage: node scripts/validate-lessons.mjs [--strict]
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const strict = process.argv.includes("--strict");

const { blogPosts } = await import(join(root, "src/data/blog.ts"));
const editorial = JSON.parse(
  readFileSync(join(root, "src/data/editorial/lesson-dates.generated.json"), "utf8"),
);

const errors = [];
const warnings = [];

function text(block) {
  if (block.type === "p" || block.type === "h2") return block.text;
  if (block.type === "ul") return block.items.join(" ");
  return `${block.alt ?? ""} ${block.caption ?? ""}`;
}

function words(post) {
  return post.body.map(text).join(" ").split(/\s+/).filter(Boolean).length;
}

function imageExists(src) {
  if (!src.startsWith("/")) return true;
  return existsSync(join(root, "public", src));
}

const seenSlugs = new Map();
const seenTitles = new Map();
const imageUse = new Map();

for (const post of blogPosts) {
  const where = `lesson "${post.slug}"`;
  const count = words(post);
  const figures = post.body.filter((b) => b.type === "figure");

  if (seenSlugs.has(post.slug)) errors.push(`${where}: duplicate slug`);
  seenSlugs.set(post.slug, true);

  const titleKey = post.title.trim().toLowerCase();
  if (seenTitles.has(titleKey))
    errors.push(`${where}: duplicate title (also ${seenTitles.get(titleKey)})`);
  seenTitles.set(titleKey, post.slug);

  if (count < 600) errors.push(`${where}: ${count} words (minimum 600)`);
  else if (count < 700) warnings.push(`${where}: ${count} words (new lessons target 700+)`);

  if (figures.length === 0) errors.push(`${where}: no figure`);
  if (figures.length > 0 && figures.length < 3)
    warnings.push(`${where}: ${figures.length} figure(s) — 3+ reads as teaching material`);

  for (const figure of figures) {
    if (!figure.alt || figure.alt.trim().length < 8)
      errors.push(`${where}: figure ${figure.src} has no instructive alt text`);
    if (!figure.caption || figure.caption.trim().length < 12)
      errors.push(`${where}: figure ${figure.src} has no caption`);
    if (!imageExists(figure.src)) errors.push(`${where}: missing image file ${figure.src}`);
    imageUse.set(figure.src, (imageUse.get(figure.src) ?? 0) + 1);
  }

  if (!imageExists(post.cover)) errors.push(`${where}: missing cover image ${post.cover}`);

  if (!post.excerpt || post.excerpt.trim().length < 40)
    errors.push(`${where}: excerpt missing or too short`);
  if (post.excerpt && post.excerpt.length > 220)
    errors.push(`${where}: excerpt ${post.excerpt.length} chars (max 220)`);

  if (!post.author || post.author.trim().length === 0) errors.push(`${where}: no author`);

  const body = post.body.map(text).join(" ").toLowerCase();
  const hasRecovery =
    /if this went wrong|if it goes wrong|if nothing happens|if the .* does not|troubleshoot/.test(
      body,
    );
  if (!hasRecovery) warnings.push(`${where}: no recovery paragraph ("if this went wrong")`);

  const record = editorial.lessons[post.slug];
  if (!record) errors.push(`${where}: no editorial record (run npm run generate:editorial)`);
  if (record && !record.reviewedAt)
    warnings.push(
      `${where}: review due ${record.reviewDueAt ?? "unknown"} — no review recorded yet`,
    );
}

for (const slug of Object.keys(editorial.lessons)) {
  if (!seenSlugs.has(slug)) errors.push(`editorial record "${slug}": lesson no longer exists`);
}

for (const [src, count] of imageUse) {
  if (count > 3)
    warnings.push(`image ${src} appears in ${count} lessons (wear on a returning reader)`);
}

/* ---------- report ---------- */
console.log(`Lesson contract — ${blogPosts.length} lessons`);
console.log(`  errors:   ${errors.length}`);
console.log(`  warnings: ${warnings.length}`);

if (warnings.length) {
  console.log("\nWarnings");
  for (const warning of warnings.slice(0, 40)) console.log(`  · ${warning}`);
  if (warnings.length > 40) console.log(`  …and ${warnings.length - 40} more`);
}

if (errors.length) {
  console.log("\nErrors");
  for (const error of errors) console.log(`  ✗ ${error}`);
}

if (errors.length > 0 && strict) {
  console.error("\nLesson contract failed. Fix the errors above before shipping.");
  process.exit(1);
}

if (errors.length === 0) console.log("\nNo contract errors.");
if (!strict && errors.length > 0)
  console.log("\n(report only — run with --strict to fail the build)");
