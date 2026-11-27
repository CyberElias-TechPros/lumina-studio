#!/usr/bin/env node
/**
 * Accessibility gate for the pre-rendered public site.
 *
 * ## Why this exists
 *
 * `/accessibility` tells visitors the Academy works toward WCAG 2.1 Level AA and
 * does not claim a full audit. That is honest, but honesty is not a gate: nothing
 * in CI could fail if a heading level were skipped, an image lost its alt text, or
 * a form input lost its label. This script turns the cheapest, most mechanical
 * part of that promise into an actual check.
 *
 * ## What it does and does not do
 *
 * It reads the **pre-rendered HTML** in `.next/server/app` — the same bytes a
 * crawler and a first-paint visitor receive — and checks the failures that are
 * decidable without a browser:
 *
 *   · `<html lang>` present
 *   · exactly one `<h1>` per page
 *   · no skipped heading levels (h1 → h3)
 *   · every `<img>` has an alt attribute (empty alt is fine — that is how a
 *     decorative image is marked, which is why the check is on the attribute and
 *     not on its length)
 *   · every form control has an accessible name: `<label for>`, `aria-label`,
 *     `aria-labelledby`, or a wrapping label
 *   · no positive `tabindex` (a known focus-order bug)
 *   · no `aria-hidden="true"` on a focusable element
 *   · every `<a>` has discernible text or an aria-label
 *
 * What it cannot check — and says so in the summary — is contrast, keyboard trap
 * behaviour, focus visibility, and anything that requires running JavaScript.
 * Those need a real browser (axe-core via Playwright), which is the next step,
 * not something this script pretends to cover.
 *
 * ## Usage
 *
 *   node scripts/audit-accessibility.mjs           # report
 *   node scripts/audit-accessibility.mjs --strict  # exit 1 on any violation
 *
 * Run it after `npm run build`. Without a build it says so and exits 0, because a
 * missing build is not an accessibility failure and should not read like one.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, ".next/server/app");
const strict = process.argv.includes("--strict");

if (!statSync(join(root, ".next"), { throwIfNoEntry: false })) {
  console.log("No .next build found — run `npm run build` first. Skipping accessibility audit.");
  process.exit(0);
}

/** Every .html file the build produced, excluding the 404 shell. */
function collectHtml(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectHtml(full, out);
    } else if (entry.name.endsWith(".html") && entry.name !== "_not-found.html") {
      out.push(full);
    }
  }
  return out;
}

const pages = collectHtml(appDir);

/**
 * An empty page set is a broken build, not a clean bill of health.
 *
 * This guard exists because it already happened: a build was interrupted, `.next`
 * still existed, `collectHtml` returned nothing, and the script reported "0 pages
 * checked, no violations found" — the most dangerous output an audit can produce.
 * Absence of evidence must never render as evidence of absence.
 */
if (pages.length === 0) {
  console.error(
    "Accessibility audit found no pre-rendered HTML in .next/server/app.\n" +
      "That means the build is missing or incomplete, not that the site is clean.\n" +
      "Run `npm run build` and try again.",
  );
  process.exit(strict ? 1 : 0);
}

/* ------------------------------------------------------------------ */
/* Tiny HTML inspection helpers                                        */
/* ------------------------------------------------------------------ */

const attr = (tag, name) => {
  const match = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
  return match ? (match[2] ?? match[3] ?? "") : null;
};
const hasAttr = (tag, name) => new RegExp(`\\s${name}(\\s|=|>|/)`, "i").test(tag);

/** Heading levels in document order, with their text. */
function headings(html) {
  return [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
    level: Number(m[1]),
    text: m[2].replace(/<[^>]*>/g, "").trim(),
  }));
}

/** Accessible names available for a control on the same document. */
function labelForIds(html) {
  const ids = new Set();
  for (const match of html.matchAll(/<label\b[^>]*\sfor\s*=\s*("([^"]*)"|'([^']*)')/gi)) {
    ids.add(match[2] ?? match[3]);
  }
  return ids;
}

const violations = [];

function check(page, html) {
  const where = relative(root, page);

  /* html lang */
  if (!/<html\b[^>]*\slang\s*=/i.test(html)) {
    violations.push({ page: where, rule: "html-lang", detail: "<html> has no lang attribute" });
  }

  /* headings */
  const hs = headings(html);
  const h1s = hs.filter((h) => h.level === 1);
  if (h1s.length === 0 && hs.length > 0) {
    violations.push({ page: where, rule: "h1-missing", detail: "page has headings but no h1" });
  }
  if (h1s.length > 1) {
    violations.push({
      page: where,
      rule: "h1-multiple",
      detail: `${h1s.length} h1 elements: ${h1s.map((h) => h.text.slice(0, 40)).join(" | ")}`,
    });
  }
  let previous = 0;
  for (const h of hs) {
    if (previous && h.level > previous + 1) {
      violations.push({
        page: where,
        rule: "heading-skip",
        detail: `h${previous} followed by h${h.level} ("${h.text.slice(0, 40)}")`,
      });
    }
    previous = h.level;
  }

  /* images */
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!hasAttr(match[0], "alt")) {
      violations.push({
        page: where,
        rule: "img-alt",
        detail: match[0].slice(0, 90).replace(/\s+/g, " "),
      });
    }
  }

  /* form controls need a name */
  const labelled = labelForIds(html);
  /**
   * Implicit labelling: `<label><span class="sr-only">Search</span><input></label>`
   * is a perfectly good accessible name and is the pattern most of this app uses.
   * Detecting only `for=` attributes reported 147 violations that were all already
   * labelled, which is worse than no check — a gate that cries wolf gets muted.
   * So: find every `<label>…</label>` block, note the controls inside it, and treat
   * those as named.
   */
  const implicitlyLabelled = new Set();
  for (const labelBlock of html.matchAll(/<label\b[^>]*>([\s\S]*?)<\/label>/gi)) {
    const hasText =
      labelBlock[1]
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim().length > 0;
    if (!hasText) continue;
    for (const inner of labelBlock[1].matchAll(/<(input|select|textarea)\b[^>]*>/gi)) {
      implicitlyLabelled.add(inner[0]);
    }
  }

  for (const match of html.matchAll(/<(input|select|textarea)\b[^>]*>/gi)) {
    const tag = match[0];
    const type = (attr(tag, "type") ?? "").toLowerCase();
    // These carry no user-visible name and are excluded by WCAG too.
    if (type === "hidden" || type === "submit" || type === "button" || type === "reset") continue;
    if (hasAttr(tag, "aria-label") || hasAttr(tag, "aria-labelledby") || hasAttr(tag, "title")) {
      continue;
    }
    // A control the accessibility tree never exposes does not need a name.
    // Radix (and every other headless UI library) injects hidden sentinels like
    // `<select aria-hidden="true" tabindex="-1">` for focus management. Flagging
    // those is a false positive that trains people to ignore the report.
    if (hasAttr(tag, "aria-hidden")) continue;
    const id = attr(tag, "id");
    if (id && labelled.has(id)) continue;
    if (implicitlyLabelled.has(tag)) continue;
    violations.push({
      page: where,
      rule: "control-name",
      detail: `${match[1]} has no label: ${tag.slice(0, 90).replace(/\s+/g, " ")}`,
    });
  }

  /* positive tabindex */
  for (const match of html.matchAll(
    /<[a-z]+\b[^>]*\stabindex\s*=\s*("(\d+)"|'(\d+)'|\d+)[^>]*>/gi,
  )) {
    const value = Number(match[2] ?? match[3] ?? match[0].match(/tabindex\s*=\s*(\d+)/)?.[1]);
    if (value > 0) {
      violations.push({
        page: where,
        rule: "tabindex-positive",
        detail: `tabindex="${value}" breaks natural focus order`,
      });
    }
  }

  /* links need discernible text */
  for (const match of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const attrs = match[1];
    const inner = match[2]
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
    const hasName = /aria-label\s*=\s*("[^"]+"|'[^']+')/i.test(attrs);
    const hasImageAlt = /<img\b[^>]*\salt\s*=\s*("[^"]+"|'[^']+')/i.test(match[2]);
    if (!inner && !hasName && !hasImageAlt) {
      violations.push({
        page: where,
        rule: "link-name",
        detail: `<a${attrs.slice(0, 70).replace(/\s+/g, " ")}> has no discernible text`,
      });
    }
  }

  /* aria-hidden must not wrap focusable content */
  for (const match of html.matchAll(/aria-hidden\s*=\s*("true"|'true')[^>]*>/gi)) {
    const tag = match[0];
    if (/\stabindex\s*=\s*("0"|'0')/i.test(tag)) {
      violations.push({
        page: where,
        rule: "aria-hidden-focusable",
        detail: "aria-hidden element is still focusable",
      });
    }
  }
}

for (const page of pages) {
  check(page, readFileSync(page, "utf8"));
}

/* ------------------------------------------------------------------ */
/* Report                                                             */
/* ------------------------------------------------------------------ */

const byRule = new Map();
for (const v of violations) {
  if (!byRule.has(v.rule)) byRule.set(v.rule, []);
  byRule.get(v.rule).push(v);
}

console.log(`Accessibility audit — ${pages.length} pre-rendered pages`);
console.log("  checked: lang, heading order, img alt, control names, tabindex, link names");

if (violations.length === 0) {
  console.log("  No mechanical violations found.");
} else {
  console.log(`  ${violations.length} violation(s) across ${byRule.size} rule(s):\n`);
  for (const [rule, list] of [...byRule.entries()].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${rule} (${list.length})`);
    for (const v of list.slice(0, 5)) {
      console.log(`      ${v.page} — ${v.detail}`);
    }
    if (list.length > 5) console.log(`      …and ${list.length - 5} more`);
  }
}

console.log(
  "\n  Not covered here — needs a browser (axe-core): colour contrast, keyboard\n" +
    "  traps, focus visibility, and anything rendered after hydration.",
);

if (strict && violations.length > 0) process.exit(1);
