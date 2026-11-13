import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

function check(overrides) {
  const env = {
    ...process.env,
    VERCEL_ENV: "production",
    NEXT_PUBLIC_API_URL: "https://cea-api.cyber-e54.workers.dev",
    NEXT_PUBLIC_ENABLE_MOCKS: "false",
    ...overrides,
  };
  return spawnSync(process.execPath, ["scripts/check-production-env.mjs"], {
    env,
    encoding: "utf8",
  });
}

test("production requires an HTTPS API origin and disallows mocks", () => {
  assert.equal(check({}).status, 0);
  for (const invalid of [
    "",
    "http://localhost:8787",
    "https://example.com/v1",
    "https://user:pass@example.com",
    "https://example.com/?key=value",
  ]) {
    assert.notEqual(check({ NEXT_PUBLIC_API_URL: invalid }).status, 0, invalid);
  }
  assert.notEqual(check({ NEXT_PUBLIC_ENABLE_MOCKS: "true" }).status, 0);
});

test("non-production builds can use local mock mode", () => {
  assert.equal(check({ VERCEL_ENV: "preview", NEXT_PUBLIC_API_URL: "" }).status, 0);
});
