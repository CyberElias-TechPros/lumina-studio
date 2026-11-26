/**
 * Guards on the Search Console audit.
 *
 * The audit's value is that its claims are checkable. Three kinds of rot are
 * possible, and all three are quiet:
 *
 *  1. **The redirect finding stops being true.** If someone ships a real glossary
 *     page, the audit is stale and should say so rather than continuing to argue
 *     for work that is already done.
 *  2. **The arithmetic drifts.** Cohort totals, shares and headline figures are
 *     recomputed here from the typed data, so a typo in one number cannot silently
 *     become the number the plan is built on.
 *  3. **The caveats get dropped.** The 76% unattributed caveat and the megabyte
 *     negative result are the two things most likely to be edited out of a document
 *     because they make it less quotable.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { registerHooks } from "node:module";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (
      specifier.startsWith(".") &&
      !/\.[cm]?[jt]sx?$/.test(specifier) &&
      !specifier.endsWith(".json")
    ) {
      try {
        return nextResolve(`${specifier}.ts`, context);
      } catch {
        /* fall through */
      }
    }
    return nextResolve(specifier, context);
  },
  load: (url, context, nextLoad) =>
    url.endsWith(".json")
      ? { format: "json", source: readFileSync(fileURLToPath(url), "utf8"), shortCircuit: true }
      : nextLoad(url, context),
});

const sp = await import("../../src/data/editorial/search-performance.ts");

const AUDIT = readFileSync(join(root, "docs/gsc-search-console-audit-2026-11.md"), "utf8");
const VERCEL = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8"));

/* ------------------------------------------------------------------ *
 * Arithmetic
 * ------------------------------------------------------------------ */

test("the headline totals are internally consistent", () => {
  const { PERIOD } = sp;
  const ctr = (PERIOD.clicks / PERIOD.impressions) * 100;
  assert.ok(
    Math.abs(ctr - PERIOD.ctrPct) < 0.02,
    `stated CTR ${PERIOD.ctrPct}% does not match ${ctr.toFixed(2)}%`,
  );
  assert.equal(PERIOD.days, 109, "period length must match the export");
});

test("country rows are a top-N subset and never exceed the total", () => {
  const total = sp.COUNTRIES.reduce((sum, c) => sum + c.impressions, 0);
  // COUNTRIES holds the top 11 of 154 rows, so it is deliberately partial. It must
  // never exceed the property total, which would mean a transcription error — and
  // the long tail means summing it must NOT be used for the international share.
  assert.ok(total < sp.PERIOD.impressions, "country rows exceed the property total");

  // The top eleven non-Nigeria rows hold only part of the international total; the
  // other 143 rows make up the rest. If someone derives the international share by
  // summing COUNTRIES, they undercount and the headline "63.7% is not Nigeria" breaks.
  const topNonNg = sp.COUNTRIES.filter((c) => c.country !== "Nigeria").reduce(
    (sum, c) => sum + c.impressions,
    0,
  );
  assert.ok(
    sp.nonNigeriaImpressions > topNonNg,
    `the long tail must be unaccounted for here (property says ${sp.nonNigeriaImpressions}, top rows say ${topNonNg})`,
  );
});

test("the international share is stated correctly", () => {
  const { nonNigeriaSharePct } = sp;
  // Nigeria is 2,399 of 6,609 = 36.3%, so the rest is 63.7%.
  assert.ok(
    Math.abs(nonNigeriaSharePct - 63.7) < 0.5,
    `non-Nigeria share is ${nonNigeriaSharePct.toFixed(1)}%, close to 63.7%`,
  );
});

test("mobile is the strongest device and the data says so", () => {
  const mobile = sp.DEVICES.find((d) => d.device === "Mobile");
  const desktop = sp.DEVICES.find((d) => d.device === "Desktop");
  assert.ok(mobile && desktop);
  assert.ok(mobile.ctrPct > desktop.ctrPct, "mobile must out-convert desktop");
  assert.ok(mobile.avgPosition < desktop.avgPosition, "mobile must rank better than desktop");
});

/* ------------------------------------------------------------------ *
 * The redirect finding must still be true
 * ------------------------------------------------------------------ */

test("the redirects the audit complains about still exist", () => {
  // If these are removed, the audit's headline recommendation is done and the
  // document should be rewritten rather than left arguing for finished work.
  const sources = new Set((VERCEL.redirects ?? []).map((r) => r.source));
  for (const source of [
    "/glossary/:path*",
    "/programs/:path*",
    "/library/:path*",
    "/resources/:path*",
    "/career-guides/:path*",
  ]) {
    assert.ok(
      sources.has(source),
      `${source} no longer redirects. The redirect trap is fixed — update the audit.`,
    );
  }
});

test("the redirects still point at /classes", () => {
  const glossary = (VERCEL.redirects ?? []).find((r) => r.source === "/glossary/:path*");
  assert.equal(glossary?.destination, "/classes");
  assert.equal(glossary?.permanent, true);
});

test("legacy routes are still client-side redirect shells", () => {
  // The audit's claim that glossary pages cannot be entered depends on this.
  // If real pages are restored, the click-through argument changes entirely.
  for (const [file, dest] of [
    ["src/routes/glossary.$slug.tsx", "/classes"],
    ["src/routes/glossary.index.tsx", "/classes"],
  ]) {
    const source = readFileSync(join(root, file), "utf8");
    assert.match(source, /redirectPublic/, `${file} should still redirect`);
    assert.ok(source.includes(dest), `${file} should still redirect to ${dest}`);
  }
});

/* ------------------------------------------------------------------ *
 * The caveats stay in the document
 * ------------------------------------------------------------------ */

test("the audit keeps its unattributed-query caveat", () => {
  // Two mentions are required: the statement of the caveat, and the "what this
  // cannot see" reminder. One alone is too easy to lose — a bare /76%/ match
  // passes on either, which let a mutation of the main caveat slip through.
  const mentions = AUDIT.match(/76%/g) ?? [];
  assert.ok(
    mentions.length >= 2,
    `the 76% unattributed caveat must appear as both a caveat and a limitation; found ${mentions.length}`,
  );
  assert.match(
    AUDIT,
    /impressions have no query attribution/i,
    "the caveat must state plainly that most impressions have no query attribution",
  );
  assert.match(AUDIT, /cannot\*\* say|cannot say/i, "the audit must keep the wording rule");
  assert.match(AUDIT, /no evidence anyone/i, "the audit must prefer 'no evidence' to 'no demand'");
});

test("the megabyte negative result is still recorded", () => {
  // This is the one finding that contradicts the short-answer thesis. It is also
  // the easiest to delete, because it makes the recommendation less tidy.
  assert.match(AUDIT, /82 distinct queries/, "the megabyte cluster size must stay");
  assert.match(AUDIT, /does not/i, "the audit must keep the admission that the fix did not work");
  assert.match(
    AUDIT,
    /already opens with its answer|opens with its answer/i,
    "the reason it failed must stay attached to the negative result",
  );
});

test("the audit does not claim to measure things Search Console cannot", () => {
  // Bounce, time-on-page and conversion are not in a GSC export. A document that
  // starts quoting them has invented a source.
  assert.doesNotMatch(AUDIT, /bounce rate of \d|average time on page of \d/i);
});

/* ------------------------------------------------------------------ *
 * Typed data matches the document
 * ------------------------------------------------------------------ */

test("the cohorts documented in prose match the typed data", () => {
  const blog = sp.cohort("The 210-lesson notes (/blog/)");
  assert.equal(blog.impressions, 4016);
  assert.equal(blog.clicks, 9);
  assert.equal(blog.ctrPct, 0.22);

  const partner = sp.cohort("One partner page");
  assert.equal(partner.clicks, 56);
  assert.equal(partner.impressions, 701);
});

test("the partner page really is the majority of clicks", () => {
  const partner = sp.cohort("One partner page");
  const share = (partner.clicks / sp.PERIOD.clicks) * 100;
  assert.ok(
    share > 50,
    `the single partner page should still be over half of all clicks, got ${share.toFixed(1)}%`,
  );
});

test("the weekly trajectory matches the period totals", () => {
  const clicks = sp.WEEKLY_TRAJECTORY.reduce((s, w) => s + w.clicks, 0);
  const impressions = sp.WEEKLY_TRAJECTORY.reduce((s, w) => s + w.impressions, 0);

  // Weekly buckets are cut from daily rows, so the first and last partial weeks
  // do not reconcile exactly. Everything else should be very close.
  assert.ok(
    Math.abs(clicks - sp.PERIOD.clicks) <= 2,
    `weekly clicks sum to ${clicks}, period says ${sp.PERIOD.clicks}`,
  );
  assert.ok(
    Math.abs(impressions - sp.PERIOD.impressions) <= 40,
    `weekly impressions sum to ${impressions}, period says ${sp.PERIOD.impressions}`,
  );
});

test("the trajectory shows the November step change the audit describes", () => {
  const early = sp.WEEKLY_TRAJECTORY.slice(0, 3); // the quiet August weeks
  const earlyAvg = early.reduce((s, w) => s + w.impressions, 0) / early.length;
  const peak = Math.max(...sp.WEEKLY_TRAJECTORY.map((w) => w.impressions));

  assert.ok(
    peak > earlyAvg * 100,
    `the audit claims impressions rose by two orders of magnitude; peak ${peak} vs August average ${earlyAvg.toFixed(1)}`,
  );
});
