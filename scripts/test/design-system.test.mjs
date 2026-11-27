/**
 * Design-system guard tests: radius scale, focus visibility, heading discipline.
 *
 * These exist because the defect they catch is invisible. A page with seven
 * corner radii does not throw an error; it just reads as assembled. A text field
 * with no focus ring is not broken for mouse users; it is broken only for the
 * people least likely to be asked. Neither shows up in a screenshot review.
 *
 * Written after a false positive: an earlier audit reported "17 primary CTAs
 * missing a focus ring" when a global `:where(...):focus-visible` rule already
 * covered them. The rule is real (see styles.css) but sits at zero specificity,
 * so it is silently defeated by any utility that sets `outline: none`. Test 2
 * therefore checks the *defeat* condition, not the mere absence of a ring.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.tsx$/.test(entry)) out.push(p);
  }
  return out;
}
const files = walk(join(root, "src"));
const read = (f) => readFileSync(f, "utf8");

/**
 * Every class list in every .tsx file.
 *
 * Deliberately scans ALL double-quoted strings, not just className attributes.
 * Component variants are defined with cva() in a plain string literal
 * (`cva("... rounded-full ...")`), so a className-only scan silently skips the
 * shared building blocks — which is where drift concentrates. This was the bug
 * in the first version of these tests: they passed against a seeded
 * `rounded-3xl` inside badge.tsx because the scan never looked there.
 */
function classNames() {
  const out = [];
  for (const f of files) {
    for (const m of read(f).matchAll(/"([^"\n]*)"/g)) {
      const cls = m[1];
      // Only strings that look like Tailwind class lists.
      if (!/\b(rounded|focus|text-|bg-|border)/.test(cls)) continue;
      out.push({ file: f.replace(`${root}/`, ""), cls });
    }
  }
  return out;
}

test("the radius scale has one step per job, not one per component", () => {
  const seen = new Set();
  for (const { cls } of classNames()) {
    for (const m of cls.matchAll(
      /\brounded(?:-[trbl]{1,2})?(?:-(none|sm|md|lg|xl|2xl|3xl|full))?\b/g,
    )) {
      seen.add(m[1] ?? "lg");
    }
  }
  // full = pills and avatars · xl = large containers · lg = cards, buttons,
  // inputs · md = inline chips and legal prose. Anything else is drift.
  const allowed = new Set(["full", "xl", "lg", "md", "none"]);
  const stray = [...seen].filter((s) => !allowed.has(s));
  assert.deepEqual(stray, [], `radii outside the scale: ${stray.join(", ")}`);
});

test("no control suppresses its focus ring without replacing it", () => {
  // The global rule in styles.css is `:where(a, button, [role=button], [tabindex])`
  // with zero specificity. It wins only when nothing else sets outline on focus.
  // So `focus:outline-none` is the thing that breaks it — and it must always be
  // accompanied by a replacement indicator.
  const offenders = [];
  for (const { file, cls } of classNames()) {
    if (!/(?<!-)\bfocus:outline-none\b/.test(cls)) continue;
    const replaced = /focus(-visible)?:ring|focus(-visible)?:outline-(?!none)/.test(cls);
    if (!replaced) offenders.push(file);
  }
  assert.deepEqual(
    [...new Set(offenders)],
    [],
    "these set focus:outline-none with no ring of their own, so keyboard users see nothing",
  );
});

test("the global focus rule still exists and still targets the right things", () => {
  const css = read(join(root, "src/styles.css"));
  assert.match(
    css,
    /:where\(a, ?button, ?\[role="button"\], ?\[tabindex\]\):focus-visible/,
    "the zero-specificity global focus rule was removed",
  );
  // A rule that uses `outline: none` anywhere globally reopens the whole gap.
  assert.doesNotMatch(css, /^\s*\*:focus\s*\{[^}]*outline:\s*none/m, "global outline suppression");
});

test("editorial headings use the display face; UI labels do not", () => {
  // This is a two-tier system on purpose, not an inconsistency:
  //   font-display  — page and section headings, the reading voice
  //   sans          — card chrome, dialog titles, eyebrows, legal subheads
  // A *large* heading (>= text-xl) without font-display is drift.
  const drift = [];
  for (const f of files) {
    const src = read(f);
    for (const m of src.matchAll(/<h[12]\b([^>]*)>/g)) {
      const attrs = m[1];
      if (/sr-only/.test(attrs)) continue;
      if (/font-display/.test(attrs)) continue;
      if (/className="([^"]*)"/.test(attrs)) {
        const cls = attrs.match(/className="([^"]*)"/)[1];
        // Only page-level headings without the display face matter.
        if (/\bt-ext-xl|text-2xl|text-3xl|text-4xl/.test(cls)) {
          drift.push(`${f.replace(`${root}/`, "")}: ${cls}`);
        }
      }
    }
  }
  assert.deepEqual(drift, [], `page headings missing font-display: ${drift.join(" | ")}`);
});
