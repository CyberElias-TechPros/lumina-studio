/**
 * Applies rewritten lessons to src/data/blog.ts.
 *
 * The notes corpus is one 1.2 MB module, so rewriting a lesson by hand-editing
 * that file is a good way to break a neighbour you did not mean to touch. This
 * script replaces exactly one object per slug, keeps every field the rewrite
 * does not mention (series, order, author, cover), and refuses to write anything
 * that would fail the published lesson contract.
 *
 * Input: one or more JSON files, each an array of
 *   { slug, title?, excerpt?, cover?, coverAlt?, body: [ ...blocks ] }
 *
 * Usage:
 *   node scripts/apply-note-rewrite.mjs path/to/rewrite.json
 *   node scripts/apply-note-rewrite.mjs path/to/*.json --dry-run
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BLOG_FILE = join(root, "src/data/blog.ts");
const dryRun = process.argv.includes("--dry-run");
const files = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));

if (files.length === 0) {
  console.error("Usage: node scripts/apply-note-rewrite.mjs <file.json> [more.json] [--dry-run]");
  process.exit(1);
}

const rewrites = [];
for (const file of files) {
  const path = resolve(root, file);
  const parsed = JSON.parse(readFileSync(path, "utf8"));
  if (!Array.isArray(parsed)) {
    console.error(`${file}: expected a JSON array of lessons`);
    process.exit(1);
  }
  for (const item of parsed) rewrites.push({ item, file });
}

/* ---------- helpers shared with the corpus ---------- */

const BLOCK_TYPES = new Set(["p", "h2", "ul", "figure"]);

function blockText(block) {
  if (block.type === "p" || block.type === "h2") return block.text ?? "";
  if (block.type === "ul") return (block.items ?? []).join(" ");
  if (block.type === "figure") return `${block.alt ?? ""} ${block.caption ?? ""}`;
  return "";
}

function words(item) {
  return item.body
    .map(blockText)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function quote(text) {
  return JSON.stringify(text);
}

/** Shared constants in the corpus (SERIES, AUTHOR) stay identifiers. */
function emit(value, asCode = false) {
  return asCode && /^[A-Za-z_$][\w$]*$/.test(value) ? value : quote(value);
}

function renderBody(body) {
  const lines = [];
  for (const block of body) {
    if (block.type === "p") lines.push(`        p(${quote(block.text)}),`);
    else if (block.type === "h2") lines.push(`        h2(${quote(block.text)}),`);
    else if (block.type === "ul")
      lines.push(
        `        ul([\n${block.items.map((i) => `          ${quote(i)},`).join("\n")}\n        ]),`,
      );
    else if (block.type === "figure")
      lines.push(
        `        fig(\n          ${quote(block.src)},\n          ${quote(block.alt)},\n          ${quote(block.caption)},\n        ),`,
      );
  }
  return lines.join("\n");
}

/* ---------- validate everything before touching the file ---------- */

const source = readFileSync(BLOG_FILE, "utf8");
const problems = [];
const titlesInUse = new Map();

// Existing titles, so a rewrite cannot create a duplicate.
for (const match of source.matchAll(/^ {4}slug: "([^"]+)",\n {4}title: ("(?:[^"\\]|\\.)*"),/gm)) {
  titlesInUse.set(JSON.parse(match[2]).trim().toLowerCase(), match[1]);
}

const seen = new Set();
for (const { item, file } of rewrites) {
  const where = `${file} → ${item.slug ?? "(no slug)"}`;
  if (!item.slug) {
    problems.push(`${where}: missing slug`);
    continue;
  }
  if (seen.has(item.slug)) problems.push(`${where}: duplicate slug in this run`);
  seen.add(item.slug);

  const body = item.body ?? [];
  if (!Array.isArray(body) || body.length === 0) {
    problems.push(`${where}: empty body`);
    continue;
  }
  if (body[0].type !== "p") problems.push(`${where}: first block must be a paragraph`);

  for (const block of body) {
    if (!BLOCK_TYPES.has(block.type)) problems.push(`${where}: unknown block type ${block.type}`);
    if (block.type === "ul" && (!Array.isArray(block.items) || block.items.length < 2))
      problems.push(`${where}: list needs at least 2 items`);
    if (block.type === "figure") {
      if (!block.src?.startsWith("/")) problems.push(`${where}: figure src must start with /`);
      else if (!existsSync(join(root, "public", block.src)))
        problems.push(`${where}: missing image ${block.src}`);
      if (!block.alt || block.alt.trim().length < 8) problems.push(`${where}: figure needs alt text`);
      if (!block.caption || block.caption.trim().length < 12)
        problems.push(`${where}: figure needs a caption`);
    }
  }

  const figures = body.filter((b) => b.type === "figure");
  if (figures.length === 0) problems.push(`${where}: at least one figure is required`);

  const count = words(item);
  if (count < 600) problems.push(`${where}: ${count} words (contract minimum 600)`);

  if (item.excerpt) {
    if (item.excerpt.length < 40) problems.push(`${where}: excerpt too short`);
    if (item.excerpt.length > 220) problems.push(`${where}: excerpt ${item.excerpt.length} chars (max 220)`);
  }

  if (item.title) {
    const key = item.title.trim().toLowerCase();
    const owner = titlesInUse.get(key);
    if (owner && owner !== item.slug) problems.push(`${where}: title already used by ${owner}`);
  }

  if (!source.includes(`    slug: ${quote(item.slug)},`))
    problems.push(`${where}: slug not found in blog.ts`);
}

if (problems.length > 0) {
  console.error(`Rewrite rejected — ${problems.length} problem(s):`);
  for (const problem of problems) console.error(`  ✗ ${problem}`);
  process.exit(1);
}

/* ---------- replace one object at a time ---------- */

let output = source;
const report = [];

for (const { item } of rewrites) {
  const slugLine = `    slug: ${quote(item.slug)},`;
  const start = output.indexOf(`  {\n${slugLine}`);
  if (start === -1) throw new Error(`could not locate object for ${item.slug}`);

  // The object ends at the close of the body array, followed by `  },` at two-space indent.
  const bodyStart = output.indexOf("    body: [", start);
  if (bodyStart === -1) throw new Error(`could not locate body for ${item.slug}`);
  const endMarker = "\n    ],\n  },";
  const end = output.indexOf(endMarker, bodyStart);
  if (end === -1) throw new Error(`could not locate end of body for ${item.slug}`);

  const existing = output.slice(start, end + endMarker.length);

  /**
   * Reads a field that prettier may have left on one line or wrapped. Returns the
   * value as source text: a quoted literal for strings, and the raw expression
   * (for example `AUTHOR`) when the corpus uses a shared constant.
   */
  const field = (name) => {
    const label = existing.indexOf(`\n    ${name}:`);
    if (label === -1) return null;
    let cursor = label + `\n    ${name}:`.length;
    while (cursor < existing.length && /\s/.test(existing[cursor])) cursor += 1;

    if (existing[cursor] === '"') {
      let end = cursor + 1;
      while (end < existing.length) {
        if (existing[end] === "\\") end += 2;
        else if (existing[end] === '"') break;
        else end += 1;
      }
      return JSON.parse(existing.slice(cursor, end + 1));
    }

    // Identifier or expression: read to the end of the line.
    const lineEnd = existing.indexOf("\n", cursor);
    return existing
      .slice(cursor, lineEnd === -1 ? existing.length : lineEnd)
      .replace(/,$/, "")
      .trim();
  };

  const title = item.title ?? field("title");
  const excerpt = item.excerpt ?? field("excerpt");
  const series = field("series");
  const order = Number((existing.match(/^ {4}order: (\d+),$/m) ?? [])[1]);
  const author = field("author");
  const cover = item.cover ?? field("cover");
  const coverAlt = item.coverAlt ?? field("coverAlt");

  const replacement = [
    "  {",
    `    slug: ${quote(item.slug)},`,
    `    title: ${quote(title)},`,
    `    excerpt:`,
    `      ${quote(excerpt)},`,
    `    series: ${emit(series, true)},`,
    `    order: ${order},`,
    `    author: ${emit(author, true)},`,
    `    cover: ${quote(cover)},`,
    `    coverAlt: ${quote(coverAlt)},`,
    "    body: [",
    renderBody(item.body),
    "    ],",
    "  },",
  ].join("\n");

  output = output.slice(0, start) + replacement + output.slice(end + endMarker.length);
  report.push({
    slug: item.slug,
    order,
    words: words(item),
    figures: item.body.filter((b) => b.type === "figure").length,
  });
}

if (dryRun) {
  console.log("Dry run — nothing written.");
  for (const row of report) console.log(`  · ${row.order}. ${row.slug} — ${row.words} words`);
  process.exit(0);
}

writeFileSync(BLOG_FILE, output, "utf8");

console.log(`Rewrote ${report.length} lesson(s) in src/data/blog.ts`);
for (const row of report)
  console.log(`  · ${String(row.order).padStart(3, " ")}. ${row.slug} — ${row.words} words, ${row.figures} figure(s)`);

const shortest = Math.min(...report.map((r) => r.words));
console.log(`\nShortest rewrite: ${shortest} words. Next: npm run validate:lessons`);
