#!/usr/bin/env node

/**
 * Keep pull requests small enough for automated and human review.
 *
 * Usage:
 *   node scripts/check-pr-size.mjs [base] [head]
 *
 * In GitHub Actions, PR_BASE_SHA and PR_HEAD_SHA are supplied by the workflow.
 * Locally, the base defaults to origin/main and the head defaults to HEAD.
 */

import { execFileSync } from "node:child_process";

const MAX_FILES = 150;
const SOFT_LIMIT = 140;

function gitRef(command, fallback) {
  try {
    return execFileSync("git", command, { encoding: "utf8" }).trim() || fallback;
  } catch {
    return fallback;
  }
}

const base =
  process.argv[2] ||
  process.env.PR_BASE_SHA ||
  process.env.GITHUB_BASE_SHA ||
  gitRef(["rev-parse", "origin/main"], "");
const head = process.argv[3] || process.env.PR_HEAD_SHA || process.env.GITHUB_SHA || "HEAD";

if (!base) {
  console.error(
    "Unable to determine the PR base. Pass it explicitly: node scripts/check-pr-size.mjs <base> [head]",
  );
  process.exit(2);
}

const range = `${base}...${head}`;
let changedFiles;

try {
  const output = execFileSync(
    "git",
    ["diff", "--name-only", "--diff-filter=ACDMRTUXB", "-z", range],
    { encoding: "buffer" },
  );
  changedFiles = output.toString("utf8").split("\0").filter(Boolean);
} catch (error) {
  console.error(`Unable to inspect ${range}. Make sure both refs are available locally.`);
  if (error instanceof Error && error.message) console.error(error.message);
  process.exit(2);
}

const areas = new Map();
for (const file of changedFiles) {
  const area = file.includes("/") ? file.split("/")[0] : "root";
  areas.set(area, (areas.get(area) || 0) + 1);
}

const areaSummary = [...areas.entries()]
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([area, count]) => `${area}=${count}`)
  .join(", ");

console.log(`PR size: ${changedFiles.length}/${MAX_FILES} changed files (${range})`);
if (areaSummary) console.log(`By top-level area: ${areaSummary}`);

if (changedFiles.length > MAX_FILES) {
  console.error(
    `PR is ${changedFiles.length - MAX_FILES} file(s) over the ${MAX_FILES}-file limit. Split the change into cohesive PRs.`,
  );
  process.exit(1);
}

if (changedFiles.length > SOFT_LIMIT) {
  console.warn(
    `PR is above the ${SOFT_LIMIT}-file review target. Leave room for follow-up fixes before reaching ${MAX_FILES}.`,
  );
}

console.log("PR file-count check passed.");
