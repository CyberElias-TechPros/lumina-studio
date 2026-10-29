/**
 * Voice audit for the "Computer skills from scratch" notes.
 *
 * Measures a lesson against the warm-direct teaching standard in
 * docs/notes-rewrite-standard.md: plain English, short sentences, a described
 * screen, reassurance where fear is real, one misconception handled, and a
 * recovery path. Structural checks keep the page usable; warmth checks keep it
 * human. Neither one alone is the standard.
 *
 * Usage:
 *   node scripts/audit-notes-voice.mjs              # summary + failures
 *   node scripts/audit-notes-voice.mjs --next 10    # next 10 lessons in reading order
 *   node scripts/audit-notes-voice.mjs --slug x     # one lesson in detail
 *   node scripts/audit-notes-voice.mjs --strict     # exit 1 while any lesson fails
 */

import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const value = (name, fallback) => {
  const index = argv.indexOf(name);
  return index === -1 ? fallback : argv[index + 1];
};

const { blogPosts } = await import(join(root, "src/data/blog.ts"));

/* ---------- text helpers ---------- */

function blockText(block) {
  if (block.type === "p" || block.type === "h2") return block.text;
  if (block.type === "ul") return block.items.join(" ");
  return `${block.alt ?? ""} ${block.caption ?? ""}`;
}

const HYPE = [
  "robust",
  "cutting-edge",
  "cutting edge",
  "world-class",
  "world class",
  "comprehensive",
  "dynamic",
  "seamless",
  "leverage",
  "delve",
  "unlock the",
  "game-changer",
  "revolutionary",
  "state-of-the-art",
  "best-in-class",
];

const LITERARY = [
  "quiet hour",
  "the compound",
  "the lantern",
  "the cupboard",
  "the workbench",
  "the kitchen stool",
  "like a small ",
  "is not a fire",
  "the gate is",
  "the plate",
];

/** Words that talk down to an adult beginner. */
const CONDESCENDING = ["simply", "obviously", "it is easy", "as you know"];

/** A line that steadies the reader before or after something frightening. */
const REASSURANCE = [
  /\bnot your fault\b/i,
  /\bnormal\b/i,
  /\bdo not worry\b/i,
  /\bdon't worry\b/i,
  /\bnothing (here|you do|in this lesson) can (break|damage)\b/i,
  /\bmost people\b/i,
  /\bnobody was born\b/i,
  /\bnobody needs\b/i,
  /\btake your time\b/i,
  /\bno shame\b/i,
  /\bthat is fine\b/i,
  /\bnobody will\b/i,
  /\bnot stupid\b/i,
  /\bcan wait for you\b/i,
  /\bnone of (these|them|this|it)\b/i,
  /\bcosts? nothing\b/i,
  /\bis common\b/i,
  /\bno need to\b/i,
  /\bnot a sign\b/i,
  /\byou cannot (break|damage|ruin|hurt)\b/i,
  /\bhappens to everyone\b/i,
  /\byou are not (behind|alone|the only)\b/i,
  /\bnobody is judging\b/i,
];

/** The reader is told what the screen will look like. */
const WHAT_YOU_SEE = [
  /\byou will see\b/i,
  /\byou should see\b/i,
  /\byou will notice\b/i,
  /\bshould appear\b/i,
  /\bwill appear\b/i,
  /\bappears where\b/i,
  /\bwhat you will see\b/i,
  /\bthe screen (may|will)\b/i,
  /\bappears? (at|on|under|in|with|beside)\b/i,
  /\b(window|screen|page|menu|box|tab|list) (will )?(show|open|appear)/i,
  /\bopens? with\b/i,
];

/** A thing that looks broken but is not. */
const MISCONCEPTION = [
  /\bit looks like\b/i,
  /\blooks like nothing\b/i,
  /\bmost people (think|assume|believe)\b/i,
  /\bmost beginners\b/i,
  /\bnot because\b/i,
  /\bis usually\b/i,
  /\busually only\b/i,
  /\bnot an error\b/i,
  /\bnot a rejection\b/i,
];

function countMatches(text, patterns) {
  let total = 0;
  for (const pattern of patterns) {
    const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`;
    total += (text.match(new RegExp(pattern.source, flags)) ?? []).length;
  }
  return total;
}

function sentences(text) {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"'“])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function wordsOf(text) {
  return text.split(/\s+/).filter(Boolean);
}

/** Rough Flesch reading ease, with a conservative syllable counter. */
function syllables(word) {
  const clean = word.toLowerCase().replace(/[^a-z]/g, "");
  if (clean.length <= 3) return 1;
  const trimmed = clean.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  const groups = trimmed.match(/[aeiouy]{1,2}/g);
  return Math.max(1, groups ? groups.length : 1);
}

function readingEase(text) {
  const list = sentences(text);
  const words = wordsOf(text);
  if (list.length === 0 || words.length === 0) return 0;
  const syllableCount = words.reduce((sum, w) => sum + syllables(w), 0);
  return 206.835 - 1.015 * (words.length / list.length) - 84.6 * (syllableCount / words.length);
}

/* ---------- one lesson ---------- */

function inspect(post) {
  const prose = post.body
    .filter((b) => b.type === "p" || b.type === "ul")
    .map(blockText)
    .join(" ");
  const all = post.body.map(blockText).join(" ");
  const list = sentences(prose);
  const lengths = list.map((s) => wordsOf(s).length);
  const words = wordsOf(all).length;
  const lower = all.toLowerCase();

  const youHits = (lower.match(/\byou\b|\byour\b/g) ?? []).length;
  const emDashes = (all.match(/—/g) ?? []).length;
  const semicolons = (all.match(/;/g) ?? []).length;
  const exclamations = (all.match(/!/g) ?? []).length;
  const questions = (all.match(/\?/g) ?? []).length;

  const steps = post.body.filter((b) => b.type === "ul" && b.items.length >= 3).length;
  const headings = post.body.filter((b) => b.type === "h2").length;
  const figures = post.body.filter((b) => b.type === "figure").length;
  const firstParagraph = post.body[0]?.type === "p" ? post.body[0].text : "";
  const openingWords = wordsOf(firstParagraph).length;

  const headingText = post.body
    .filter((b) => b.type === "h2")
    .map((b) => b.text)
    .join(" ");
  const hasRecovery =
    /^if\b|wrong|fails|fail\b|missing|does not|will not|troubleshoot/i.test(headingText) ||
    /if it (goes|went) wrong|if (nothing|the screen|the pointer|it) (happens|does not|stays|will not)|what if|when it fails|troubleshoot/i.test(
      all,
    );
  const hasPractice = /practice|try it|do it now|your turn|try this/i.test(all);
  const hype = HYPE.filter((word) => lower.includes(word));
  const literary = LITERARY.filter((word) => lower.includes(word));
  const condescending = CONDESCENDING.filter((word) => lower.includes(word));

  const reassurance = countMatches(all, REASSURANCE);
  const whatYouSee = countMatches(all, WHAT_YOU_SEE);
  const misconception = countMatches(all, MISCONCEPTION);

  const averageSentence = lengths.reduce((a, b) => a + b, 0) / Math.max(1, lengths.length);
  const longestSentence = Math.max(0, ...lengths);
  const longSentenceShare = lengths.filter((l) => l > 28).length / Math.max(1, lengths.length);
  const ease = readingEase(prose);

  const failures = [];
  if (words < 600) failures.push(`only ${words} words`);
  if (averageSentence > 16) failures.push(`average sentence ${averageSentence.toFixed(1)} words`);
  if (longSentenceShare > 0.08)
    failures.push(`${(longSentenceShare * 100).toFixed(0)}% sentences over 28 words`);
  if (emDashes > 0) failures.push(`${emDashes} em dash(es)`);
  if (youHits < Math.max(8, words / 120)) failures.push(`only ${youHits} "you" mentions`);
  if (ease < 55) failures.push(`reading ease ${ease.toFixed(0)}`);
  if (steps < 1) failures.push("no numbered how-to list");
  if (!hasRecovery) failures.push("no recovery path");
  if (!hasPractice) failures.push("no practice step");
  if (figures < 1) failures.push("no figure");
  if (headings < 2) failures.push("fewer than 2 sections");
  if (openingWords > 65) failures.push(`opening paragraph ${openingWords} words`);
  if (hype.length) failures.push(`hype: ${hype.join(", ")}`);
  if (literary.length) failures.push(`literary tic: ${literary.join(", ")}`);
  if (condescending.length) failures.push(`condescending: ${condescending.join(", ")}`);

  // The warmth layer: what makes this teaching rather than a manual.
  if (reassurance < 2) failures.push(`only ${reassurance} reassurance line(s)`);
  if (whatYouSee < 2) failures.push(`screen described ${whatYouSee} time(s)`);
  if (misconception < 1) failures.push("no misconception handled");

  return {
    slug: post.slug,
    order: post.order,
    title: post.title,
    words,
    averageSentence,
    longestSentence,
    emDashes,
    semicolons,
    exclamations,
    questions,
    youHits,
    ease,
    steps,
    headings,
    figures,
    openingWords,
    reassurance,
    whatYouSee,
    misconception,
    firstParagraph,
    hasRecovery,
    hasPractice,
    failures,
  };
}

const rows = blogPosts.map(inspect).sort((a, b) => a.order - b.order);
const failing = rows.filter((row) => row.failures.length > 0);
const passing = rows.length - failing.length;

const detail = value("--slug", null);
if (detail) {
  const row = rows.find((r) => r.slug === detail);
  if (!row) {
    console.error(`No lesson called ${detail}`);
    process.exit(1);
  }
  console.log(`${row.order}. ${row.title} (${row.slug})`);
  console.log(`  words              ${row.words}`);
  console.log(`  average sentence   ${row.averageSentence.toFixed(1)} words`);
  console.log(`  longest sentence   ${row.longestSentence} words`);
  console.log(`  reading ease       ${row.ease.toFixed(0)}`);
  console.log(`  em dashes          ${row.emDashes}`);
  console.log(`  semicolons         ${row.semicolons}`);
  console.log(`  "you" mentions     ${row.youHits}`);
  console.log(`  how-to lists       ${row.steps}`);
  console.log(`  sections/figures   ${row.headings}/${row.figures}`);
  console.log(`  opening paragraph  ${row.openingWords} words`);
  console.log(`  reassurance        ${row.reassurance}`);
  console.log(`  screen described   ${row.whatYouSee}`);
  console.log(`  misconceptions     ${row.misconception}`);
  console.log(`  status             ${row.failures.length ? "FAIL" : "passes"}`);
  for (const failure of row.failures) console.log(`    · ${failure}`);
  process.exit(0);
}

const next = Number(value("--next", "0"));
if (next > 0) {
  const candidates = failing.slice(0, next);
  console.log(`${candidates.length} of ${failing.length} failing lessons still to rewrite:\n`);
  for (const row of candidates)
    console.log(
      `${String(row.order).padStart(3, " ")}. ${row.title}\n     /blog/${row.slug} · ${row.failures.slice(0, 3).join("; ")}`,
    );
  process.exit(0);
}

const average = (pick) => rows.reduce((sum, row) => sum + pick(row), 0) / rows.length;
const total = (pick) => rows.reduce((sum, row) => sum + pick(row), 0);

console.log(`Notes voice audit — ${rows.length} lessons`);
console.log(`  meeting the warm-direct standard: ${passing}`);
console.log(`  still to rewrite:                 ${failing.length}`);
console.log(`  words per lesson: ${Math.round(average((r) => r.words))} average`);
console.log(`  average sentence: ${average((r) => r.averageSentence).toFixed(1)} words`);
console.log(`  mean reading ease: ${average((r) => r.ease).toFixed(0)} (aim 60+)`);
console.log(`  em dashes in corpus: ${total((r) => r.emDashes)}`);
console.log(
  `  warmth: ${total((r) => r.reassurance)} reassurance lines, ${total((r) => r.whatYouSee)} screen descriptions, ${total((r) => r.misconception)} misconceptions handled`,
);
console.log(`  lessons with no how-to list: ${rows.filter((r) => r.steps === 0).length}`);

if (failing.length) {
  console.log(`\nFirst 25 that still need the pass:`);
  for (const row of failing.slice(0, 25))
    console.log(
      `${String(row.order).padStart(3, " ")}. ${row.slug} — ${row.failures.slice(0, 2).join("; ")}`,
    );
  console.log(`\nRun with --next 10 to get the next batch, --slug <slug> for one lesson.`);
}

if (flag("--strict") && failing.length > 0) {
  console.error("\nVoice standard not yet met across the corpus.");
  process.exit(1);
}
