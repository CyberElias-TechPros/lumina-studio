#!/usr/bin/env node
/**
 * content:backlog — print what to publish next, and why.
 *
 * The list is computed by `src/data/editorial/backlog.ts` from signals the site
 * already holds. This script is a thin reporter: it imports that module and
 * prints a ranked table, or writes a Markdown file a person can work from.
 *
 * ## Usage
 *
 *   node scripts/content-backlog.mjs               # human table
 *   node scripts/content-backlog.mjs --json        # machine-readable
 *   node scripts/content-backlog.mjs --write       # also write docs/content-backlog.md
 *   node scripts/content-backlog.mjs --top 10      # limit rows
 *   node scripts/content-backlog.mjs --check       # nudge about impact-3 work
 *
 * ## Why `--check` does not fail the build
 *
 * There is always more good work than time. If this exited non-zero whenever
 * something remained undone, it would be red forever and people would learn to
 * ignore it — which is worse than not having it. It reports and exits 0.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

/*
 * Node strips TypeScript types natively from 22.18, but it resolves imports the
 * way a browser does: strictly and by exact path. Next.js lets `./blog` mean
 * `./blog.ts`, so every source file in the repo is written that way and cannot be
 * imported as-is. These two hooks restore the conventions the source already uses.
 *
 * Both are scoped narrowly: relative extensionless specifiers, and `.json` files.
 * Bare package specifiers pass straight through.
 */
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
        /* fall through so the original specifier produces the real error */
      }
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    // Next lets `import dates from "./x.json"` stand alone; Node demands an
    // import attribute. Teach the loader the Next behaviour rather than changing
    // the source, which has to keep importing the way the bundler expects.
    if (url.endsWith(".json")) {
      return {
        format: "json",
        source: readFileSync(fileURLToPath(url), "utf8"),
        shortCircuit: true,
      };
    }
    return nextLoad(url, context);
  },
});

let mod;
try {
  mod = await import("../src/data/editorial/backlog.ts");
} catch (error) {
  console.error(
    "content:backlog could not load the backlog module.\n" +
      "It needs Node >= 22.18 for native TypeScript type stripping.\n" +
      `Underlying error: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exit(2);
}

const { buildBacklog, backlogSummary } = mod;

/* ------------------------------------------------------------------ *
 * Arguments
 * ------------------------------------------------------------------ */

const args = process.argv.slice(2);
const has = (flag) => args.includes(flag);
const valueOf = (flag, fallback) => {
  const at = args.indexOf(flag);
  return at === -1 ? fallback : (args[at + 1] ?? fallback);
};

const today = valueOf("--today", new Date().toISOString().slice(0, 10));
const top = Number(valueOf("--top", "25"));

const items = buildBacklog(today);
const summary = backlogSummary(items);

/* ------------------------------------------------------------------ *
 * Shared vocabulary
 * ------------------------------------------------------------------ */

const SIGNAL_LABEL = {
  "query-gap": "Search demand with no page",
  "review-due": "Past its review date",
  "missing-quick-answer": "No short answer",
  "thin-chapter": "Chapter is short a lesson",
};

const EFFORT_LABEL = { S: "under an hour", M: "half a day", L: "a day or more" };

const pad = (text, width) =>
  String(text).length >= width ? String(text) : String(text).padEnd(width);

const listed = items.slice(0, top);

/* ------------------------------------------------------------------ *
 * JSON — machine-readable, for a CI job or another script
 * ------------------------------------------------------------------ */

if (has("--json")) {
  // Assign rather than call process.exit(): exit() does not flush an async write
  // to a pipe, which silently truncated this ~130 KB payload at 64 KiB.
  process.stdout.write(`${JSON.stringify({ today, summary, items }, null, 2)}\n`);
  process.exitCode = 0;
} else {
  /* ---------------------------------------------------------------- *
   * Human output
   * ---------------------------------------------------------------- */

  console.log(`\nContent backlog — ${today}\n`);

  for (const [signal, count] of Object.entries(summary)) {
    if (count === 0) continue;
    console.log(`  ${pad(count, 4)}  ${SIGNAL_LABEL[signal]}`);
  }

  console.log(`\n  ${items.length} items total. Next ${listed.length} by impact:\n`);

  listed.forEach((item, index) => {
    console.log(`${String(index + 1).padStart(2)}. [${item.impact}] ${item.title}`);
    console.log(`    ${item.kind} · ${item.effort} (${EFFORT_LABEL[item.effort]}) · id ${item.id}`);
    if (item.queries?.length) {
      console.log(
        `    queries: ${item.queries.join(", ")}${item.impressions ? ` (${item.impressions} impressions)` : ""}`,
      );
    }
    console.log(`    why: ${item.rationale}`);
    if (item.related?.length) console.log(`    touches: ${item.related.join("  ")}`);
    console.log("");
  });

  /* ---------------------------------------------------------------- *
   * Markdown report
   * ---------------------------------------------------------------- */

  const counts = Object.entries(summary)
    .filter(([, count]) => count > 0)
    .map(([signal, count]) => `- **${count}** — ${SIGNAL_LABEL[signal]}`)
    .join("\n");

  const table = listed
    .map(
      (item, index) =>
        `| ${index + 1} | ${item.title} | ${item.kind} | ${item.effort} | ${item.impact} | ${item.signal} |`,
    )
    .join("\n");

  const detail = listed
    .map((item) => {
      const lines = [`### ${item.title}`, "", `\`${item.id}\` — ${SIGNAL_LABEL[item.signal]}`, ""];
      lines.push(item.rationale, "");
      if (item.queries?.length) {
        const impressions = item.impressions
          ? ` — ${item.impressions} impressions in the source export`
          : "";
        lines.push(`Queries: ${item.queries.map((q) => `\`${q}\``).join(", ")}${impressions}.`, "");
      }
      if (item.related?.length) {
        lines.push(`Existing pages: ${item.related.map((r) => `\`${r}\``).join(", ")}`, "");
      }
      return lines.join("\n");
    })
    .join("\n");

  const markdown = `# Content backlog

Generated by \`npm run content:backlog -- --write\` on ${today}.

**Do not edit by hand.** This file is regenerated from
\`src/data/editorial/backlog.ts\`, which reads the lessons, the editorial dates and
the review queue. If a line here is wrong, the fix belongs in that source — or in
\`QUERY_GAPS\` inside it — not in this file.

${counts}

## What to do next

| # | Item | Kind | Effort | Impact | Signal |
|---|---|---|---|---|---|
${table}

## Why each item is on the list

${detail}

## How this list should be used

1. Pick **one** item. Not five.
2. Write it to the standard in \`docs/editorial-content-operations.md\`: name the
   learner's task, state the assumptions, say what is uncertain, show how to
   practise, and record a real review date.
3. Add a \`changelog.ts\` entry only if the month's work warrants one — that file
   asks for one entry per month of real work, not per deploy.
4. If the item closes a \`query-gap\`, quote the query on the page so the next
   export can show whether it worked.
5. Re-run this command next month. Items that no longer appear are done.

## Signals this list cannot see

- **Search demand not yet in \`QUERY_GAPS\`.** Paste the next export into that array.
- **Whether a lesson is correct.** A review date is a schedule, not evidence that
  somebody read the page. Clearing a \`review-due\` item takes a person.
- **What competitors rank for.** Everything here is computed from our own data.
`;

  if (has("--write")) {
    const target = resolve(root, "docs/content-backlog.md");
    writeFileSync(target, markdown, "utf8");
    console.log(`Wrote ${target}`);
  }

  /* ---------------------------------------------------------------- *
   * Nudge
   * ---------------------------------------------------------------- */

  if (has("--check")) {
    const urgent = items.filter((item) => item.impact === 3).length;
    if (urgent === 0) {
      console.log("No impact-3 work outstanding. The backlog is clear.");
    } else {
      console.log(
        `\n${urgent} impact-3 item(s) outstanding. This is not a build failure — ` +
          "it is a reminder that the highest-value work is rarely the next deploy.\n",
      );
    }
  }
}
