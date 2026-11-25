/**
 * Guards on the demand signals.
 *
 * `demand-signals.ts` records what Google says Nigerians are searching for and
 * what this site can honestly do about it. Two things can go wrong with a file
 * like that, and both are quiet:
 *
 *  1. **The evidence rots.** A course is renamed, a route is retired, and the
 *     file keeps claiming we cover something we no longer teach. The verdict then
 *     drives content decisions with no basis.
 *  2. **The numbers get laundered.** A contested statistic is cited once with the
 *     caveat, then quoted forever after at its most flattering value. Trend
 *     figures are time-sensitive claims, and the editorial standard requires
 *     primary links for those.
 *
 * These tests hit the filesystem and the sitemap, so they fail when the site moves
 * and the reasoning does not.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

// Load through the same resolver hooks the other scripts use.
import { registerHooks } from "node:module";
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

const { DEMAND_SIGNALS, actionableSignals, unservedGrowth, contestedSignals } =
  await import("../../src/data/editorial/demand-signals.ts");
const { buildBacklog, backlogSummary } = await import("../../src/data/editorial/backlog.ts");

const COURSE_SLUGS = new Set(
  [
    ...readFileSync(join(root, "src/data/academy/catalog.ts"), "utf8").matchAll(
      /slug:\s*"([a-z0-9-]+)"/g,
    ),
  ].map((m) => m[1]),
);

const SITEMAP = readFileSync(join(root, "public/sitemap.xml"), "utf8");

/* ------------------------------------------------------------------ *
 * Shape
 * ------------------------------------------------------------------ */

test("every signal is complete enough to act on or argue with", () => {
  for (const signal of DEMAND_SIGNALS) {
    assert.ok(signal.id, "signal needs an id");
    assert.ok(signal.query.trim().length > 3, `${signal.id}: needs a real query`);
    assert.equal(typeof signal.changePct, "number", `${signal.id}: needs a measured change`);
    assert.ok(signal.source.length > 20, `${signal.id}: needs a source someone can find again`);
    assert.match(signal.reportedOn, /^\d{4}-\d{2}-\d{2}$/, `${signal.id}: needs the report date`);
    assert.ok(signal.evidence.length > 40, `${signal.id}: coverage verdict needs evidence`);
    assert.ok(["high", "medium", "low"].includes(signal.confidence));
    assert.ok(["strong", "partial", "gap", "declined"].includes(signal.coverage));
  }
});

test("ids are unique so a commit or issue can name one", () => {
  const ids = DEMAND_SIGNALS.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
});

/* ------------------------------------------------------------------ *
 * Evidence still holds
 * ------------------------------------------------------------------ */

test("every course cited as evidence actually exists", () => {
  for (const signal of DEMAND_SIGNALS) {
    for (const slug of signal.evidence.matchAll(/\/classes\/([a-z0-9-]+)/g)) {
      assert.ok(
        COURSE_SLUGS.has(slug[1]),
        `${signal.id} cites /classes/${slug[1]}, which is not in the course catalogue`,
      );
    }
  }
});

test("every course cited as evidence is publicly listed in the sitemap", () => {
  // A course that exists but is noindex cannot carry a discoverability argument.
  for (const signal of DEMAND_SIGNALS) {
    for (const slug of signal.evidence.matchAll(/\/classes\/([a-z0-9-]+)/g)) {
      assert.ok(
        SITEMAP.includes(`https://www.cea.ng/classes/${slug[1]}<`),
        `${signal.id} cites /classes/${slug[1]} as if it were live, but it is not in the sitemap`,
      );
    }
  }
});

test("tools cited as evidence exist as routes", () => {
  for (const signal of DEMAND_SIGNALS) {
    for (const slug of signal.evidence.matchAll(/\/tools\/([a-z0-9-]+)/g)) {
      assert.ok(
        SITEMAP.includes(`https://www.cea.ng/tools/${slug[1]}<`),
        `${signal.id} cites /tools/${slug[1]}, which is not a live page`,
      );
    }
  }
});

/* ------------------------------------------------------------------ *
 * The contradiction stays visible
 * ------------------------------------------------------------------ */

test("the contested AI-literacy figure is still flagged", () => {
  // +84% and +840% describe the same metric in two Google releases. If someone
  // quietly settles on the bigger number, this fails.
  const contested = contestedSignals();
  assert.ok(
    contested.length > 0,
    "the AI-literacy +84%/+840% contradiction has disappeared from the data",
  );

  const ai = DEMAND_SIGNALS.find((s) => s.id === "ai-literacy");
  assert.ok(ai?.conflict, "ai-literacy must keep its conflict note");
  assert.match(ai.conflict, /840/, "the conflicting figure must still be named");
  assert.match(ai.conflict, /84/, "the lower figure must still be named");
  assert.equal(ai.confidence, "low", "a contested number cannot be marked high confidence");
});

test("no signal claims absolute search volume", () => {
  // Google publishes relative change, not volumes. A file that starts carrying
  // "N searches per month" has imported a number from a tool we do not pay for.
  for (const signal of DEMAND_SIGNALS) {
    const text = `${signal.evidence} ${signal.action} ${signal.source}`;
    assert.doesNotMatch(
      text,
      /searches per month|monthly searches|\d{2,},\d{3} searches/i,
      `${signal.id}: claims a search volume we cannot source`,
    );
  }
});

/* ------------------------------------------------------------------ *
 * Derived views behave
 * ------------------------------------------------------------------ */

test("actionable signals put what we can serve before what we cannot", () => {
  const ranked = actionableSignals();
  const coverageOf = (signal) => signal.coverage;
  const firstDeclined = ranked.findIndex((s) => coverageOf(s) === "declined");
  const lastStrong = ranked.map(coverageOf).lastIndexOf("strong");

  if (firstDeclined !== -1 && lastStrong !== -1) {
    assert.ok(
      lastStrong < firstDeclined,
      "something we serve well must rank above something we have declined",
    );
  }
});

test("unserved growth is exactly the gap and declined set", () => {
  const unserved = unservedGrowth();
  assert.ok(unserved.length > 0, "there is real growth this site cannot serve");
  for (const signal of unserved) {
    assert.ok(
      signal.coverage === "gap" || signal.coverage === "declined",
      `${signal.id}: unservedGrowth leaked a served signal`,
    );
  }
});

test("declined signals record why, not just that", () => {
  for (const signal of DEMAND_SIGNALS.filter((s) => s.coverage === "declined")) {
    assert.ok(
      signal.action.length > 60,
      `${signal.id}: a refusal needs a reason that survives the next argument about it`,
    );
  }
});

/* ------------------------------------------------------------------ *
 * It reaches the backlog
 * ------------------------------------------------------------------ */

test("half-served trends become real backlog items", () => {
  const items = buildBacklog("2026-11-25");
  const summary = backlogSummary(items);

  assert.equal(
    summary["market-signal"],
    DEMAND_SIGNALS.filter((s) => s.coverage === "partial").length,
    "every partially-served trend should appear exactly once",
  );

  for (const item of items.filter((i) => i.signal === "market-signal")) {
    assert.match(item.id, /^market:/);
    assert.match(item.rationale, /year-on-year in Nigeria/);
  }
});

test("deprioritised trends never become backlog items", () => {
  const ids = buildBacklog("2026-11-25").map((item) => item.id);

  for (const signal of unservedGrowth()) {
    assert.ok(
      !ids.includes(`market:${signal.id}`),
      `${signal.id} is ${signal.coverage} but still appears as work to do`,
    );
  }
});
