import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const config = readFileSync(resolve(root, "next.config.mjs"), "utf8");

/**
 * These headers were entirely absent until 2026-11-25, which is the point: a
 * config file has no way to fail loudly when a header it should set is missing.
 * These tests turn "we meant to add that" into a build failure.
 */

const REQUIRED = [
  ["X-Frame-Options", "DENY"],
  ["X-Content-Type-Options", "nosniff"],
  ["Strict-Transport-Security", "max-age=63072000"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["Permissions-Policy", "camera=()"],
];

test("baseline security headers are declared", () => {
  for (const [key] of REQUIRED) {
    assert.match(
      config,
      new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      `${key} is missing`,
    );
  }
});

test("each header carries the intended value, not just its name", () => {
  // A header present with the wrong value passes a name-only check and protects
  // nothing: `X-Frame-Options: ALLOW` or HSTS with max-age=0 are both no-ops.
  for (const [key, value] of REQUIRED) {
    const re = new RegExp(`"${key}"\\s*,\\s*value:\\s*"${value}`);
    assert.match(config, re, `${key} does not carry "${value}"`);
  }
});

test("baseline headers apply to every route", () => {
  // Attaching them to individual routes is how they disappear again: the next
  // page someone adds simply will not have them.
  const match = config.match(/source:\s*"\/:path\*",\s*headers:\s*baselineSecurityHeaders/);
  assert.ok(match, 'the catch-all "/:path*" rule must apply baselineSecurityHeaders');
});

test("private routes still override the referrer policy", () => {
  // Baseline sets strict-origin-when-cross-origin; /app, /auth and /apply must
  // keep no-referrer, because a leaked application URL is a privacy incident.
  assert.match(config, /value:\s*"no-referrer"/);
  assert.match(config, /privateRobotsHeader/);
});

test("no X-Powered-By leak", () => {
  assert.match(config, /poweredByHeader:\s*false/);
});
