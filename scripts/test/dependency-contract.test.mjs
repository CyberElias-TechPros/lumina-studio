import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = fileURLToPath(new URL("../../", import.meta.url));
test("dependency guard accepts the repaired lock and rejects stale overrides without rewriting files", () => {
  const dir = mkdtempSync(join(tmpdir(), "cea-lock-test-"));
  try {
    mkdirSync(join(dir, "scripts"));
    for (const name of [
      "package.json",
      "package-lock.json",
      "bun.lock",
      "bunfig.toml",
      ".bun-version",
      "scripts/sync-bun-lock.mjs",
    ]) {
      copyFileSync(join(root, name), join(dir, name));
    }
    const run = () =>
      spawnSync(process.execPath, [join(dir, "scripts/sync-bun-lock.mjs"), "--check"], {
        encoding: "utf8",
      });
    const valid = run();
    assert.equal(valid.status, 0, valid.stderr);
    const manifest = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
    manifest.overrides.postcss = "8.5.24";
    writeFileSync(join(dir, "package.json"), JSON.stringify(manifest));
    const before = readFileSync(join(dir, "bun.lock"), "utf8");
    const stale = run();
    assert.notEqual(stale.status, 0);
    assert.match(stale.stderr, /bun.lock differs from the npm dependency graph/);
    assert.equal(readFileSync(join(dir, "bun.lock"), "utf8"), before);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
