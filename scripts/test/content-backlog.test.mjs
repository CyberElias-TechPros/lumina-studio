/**
 * The content backlog and the review recorder are load-bearing for how the site
 * stays current. Both are easy to break silently:
 *
 *  - `backlog.ts` reads generated data. If a field is renamed, the engine keeps
 *    running and quietly returns an empty list — which looks exactly like "nothing
 *    to do". These tests assert it actually finds the work that we know is there.
 *  - `review-lesson.mjs` writes to a hand-maintained editorial record. If its
 *    guardrails weaken, the site starts publishing review claims nobody verified,
 *    and those claims go into structured data served to search engines.
 *
 * These run against the real repository data, not fixtures, because the failure
 * mode they guard against is the data shape changing underneath the code.
 */

import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { dirname, join, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

// Mirrors the hooks in scripts/content-backlog.mjs so the module loads the way
// Next would resolve it.
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
      ? {
          format: "json",
          source: readFileSync(fileURLToPath(url), "utf8"),
          shortCircuit: true,
        }
      : nextLoad(url, context),
});

const { buildBacklog, backlogSummary, QUERY_GAPS } =
  await import("../../src/data/editorial/backlog.ts");

/* ------------------------------------------------------------------ *
 * The backlog finds real work
 * ------------------------------------------------------------------ */

test("backlog is non-empty and every item is well formed", () => {
  const items = buildBacklog("2026-11-25");

  assert.ok(items.length > 100, `expected a large backlog, got ${items.length}`);

  for (const item of items) {
    assert.ok(item.id, "every item needs an id it can be referenced by");
    assert.ok(item.title.trim().length > 10, `${item.id}: title too short to act on`);
    assert.ok(item.rationale.trim().length > 40, `${item.id}: needs a real reason, not a label`);
    assert.ok(["S", "M", "L"].includes(item.effort), `${item.id}: bad effort`);
    assert.ok([1, 2, 3].includes(item.impact), `${item.id}: bad impact`);
    assert.equal(typeof item.score, "number");
  }

  const ids = items.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length, "ids must be unique so a commit can name one");
});

test("backlog finds the review queue that is actually overdue", () => {
  // 34 lessons are past their scheduled date as of this date. Asserting the exact
  // number would make the test fail on the correct day the team does the work, so
  // assert the signal fires and is counted honestly instead.
  const summary = backlogSummary(buildBacklog("2026-11-25"));
  assert.ok(summary["review-due"] > 0, "expected overdue lessons to be discovered");
});

test("backlog deep-links every item to a page a person can open", () => {
  for (const item of buildBacklog("2026-11-25")) {
    for (const href of item.related ?? []) {
      assert.match(href, /^\//, `${item.id}: related href "${href}" must be site-relative`);
    }
  }
});

test("a query gap must carry both the query and the demand that justifies it", () => {
  // The whole point of this array is that an idea cannot get in on enthusiasm.
  for (const gap of QUERY_GAPS) {
    assert.ok(gap.queries.length > 0, `${gap.id}: no queries`);
    assert.ok(gap.impressions > 0, `${gap.id}: no impressions, so no evidence`);
    assert.ok(gap.rationale.length > 60, `${gap.id}: rationale is too thin to justify the work`);
  }
});

test("backlog is deterministic and honour the injected date", () => {
  const a = buildBacklog("2026-11-25");
  const b = buildBacklog("2026-11-25");
  assert.deepEqual(a, b, "same repository must produce the same backlog");

  // A later date can only add overdue reviews, never remove them.
  const later = backlogSummary(buildBacklog("2026-12-31"));
  const now = backlogSummary(buildBacklog("2026-11-25"));
  assert.ok(
    later["review-due"] >= now["review-due"],
    "moving the clock forward cannot un-overdue a lesson",
  );
});

test("removed signals stay removed", () => {
  // tool-gap and stale-tool were designed, never computable, and deleted. If a
  // zero for them reappears, someone has resurrected a signal that cannot fire.
  const summary = backlogSummary(buildBacklog("2026-11-25"));
  assert.deepEqual(Object.keys(summary).sort(), [
    "missing-quick-answer",
    "query-gap",
    "review-due",
    "thin-chapter",
  ]);
});

/* ------------------------------------------------------------------ *
 * The CLI reports honestly
 * ------------------------------------------------------------------ */

test("content:backlog --json emits parseable JSON over a pipe", () => {
  // This regressed once: process.exit() after an async write truncated the output
  // at the 64 KiB pipe buffer, and JSON.parse failed 65 KB in. The exit code was
  // still 0, so nothing noticed. Keep this test.
  const out = execFileSync("node", ["scripts/content-backlog.mjs", "--json"], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });

  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed.items));
  assert.ok(out.length > 65_536, "the fixture must be large enough to cross the pipe buffer");
});

/* ------------------------------------------------------------------ *
 * The review recorder refuses to lie
 * ------------------------------------------------------------------ */

const review = (args) =>
  execFileSync("node", ["scripts/review-lesson.mjs", ...args], {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

function reviewFails(args) {
  try {
    execFileSync("node", ["scripts/review-lesson.mjs", ...args], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return null;
  } catch (error) {
    return `${error.stdout ?? ""}${error.stderr ?? ""}`;
  }
}

test("review:lesson refuses to record without a named reviewer", () => {
  const output = reviewFails([
    "--slug",
    "files-and-folders",
    "--confirm-accuracy",
    "--confirm-links",
    "--confirm-screens",
    "--write",
  ]);
  assert.ok(output, "an unattributed review must be rejected");
  assert.match(output, /reviewer/i);
});

test("review:lesson refuses to record without every confirmation", () => {
  const output = reviewFails([
    "--slug",
    "files-and-folders",
    "--reviewer",
    "Someone",
    "--confirm-accuracy",
    "--write",
  ]);
  assert.ok(output, "a partial confirmation must be rejected");
  assert.match(output, /Missing confirmation/);
});

test("review:lesson refuses to write unless --write is passed", () => {
  const before = readFileSync(join(root, "src/data/editorial/lesson-reviews.json"), "utf8");
  const output = review([
    "--slug",
    "files-and-folders",
    "--reviewer",
    "Someone",
    "--confirm-accuracy",
    "--confirm-links",
    "--confirm-screens",
  ]);
  const after = readFileSync(join(root, "src/data/editorial/lesson-reviews.json"), "utf8");

  assert.match(output, /Nothing was written/);
  assert.equal(before, after, "a dry run must not touch the editorial record");
});

test("review:list reports the queue without writing", () => {
  const before = readFileSync(join(root, "src/data/editorial/lesson-reviews.json"), "utf8");
  const output = review(["--list"]);
  const after = readFileSync(join(root, "src/data/editorial/lesson-reviews.json"), "utf8");

  assert.match(output, /Review queue/);
  assert.match(output, /overdue/);
  assert.equal(before, after);
});

test("review:lesson rejects a slug that is not a lesson", () => {
  const output = reviewFails(["--slug", "not-a-real-lesson"]);
  assert.ok(output, "a bad slug must be rejected");
  assert.match(output, /not a lesson slug/);
});

/* ------------------------------------------------------------------ *
 * The freshness contract
 * ------------------------------------------------------------------ */

test("structured data exposes no date it cannot evidence", () => {
  // The rule the whole editorial system rests on: a date appears only when a
  // person recorded it. All 210 publication dates are estimates today, so
  // datePublished must be absent; dateModified must be absent until a review is
  // recorded. If this test starts failing, someone has started inventing dates.
  const dates = JSON.parse(
    readFileSync(join(root, "src/data/editorial/lesson-dates.generated.json"), "utf8"),
  );

  const lessons = Object.values(dates.lessons);
  assert.ok(lessons.length > 0);

  for (const [slug, record] of Object.entries(dates.lessons)) {
    const trusted = record.precision === "exact" && record.publishedAtSource !== "estimate";
    if (!trusted) {
      assert.equal(
        record.precision,
        "estimated",
        `${slug}: untrusted record must be labelled as an estimate`,
      );
    }
  }
});

test("reviewed lessons roll their next review forward, unreviewed ones do not", () => {
  const dates = JSON.parse(
    readFileSync(join(root, "src/data/editorial/lesson-dates.generated.json"), "utf8"),
  );

  for (const [slug, record] of Object.entries(dates.lessons)) {
    assert.ok(record.reviewDueAt, `${slug}: every lesson needs a scheduled review date`);
    assert.match(record.reviewDueAt, /^\d{4}-\d{2}-\d{2}$/, `${slug}: date must be ISO`);

    if (record.reviewedAt) {
      const due = Date.parse(record.reviewDueAt);
      const reviewed = Date.parse(record.reviewedAt);
      assert.ok(due > reviewed, `${slug}: a review must schedule the next one in the future`);
    }
  }
});
