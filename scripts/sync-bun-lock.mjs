// npm is the canonical dependency graph; Bun remains supported by hosted builds.
import { mkdtempSync, readFileSync, copyFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const version = readFileSync(join(root, ".bun-version"), "utf8").trim();
const check = process.argv.includes("--check");
const temp = mkdtempSync(join(tmpdir(), "cea-lock-"));
try {
  for (const name of ["package.json", "package-lock.json", "bunfig.toml"]) {
    copyFileSync(join(root, name), join(temp, name));
  }
  // No existing Bun lock: import npm's exact graph, rather than resolve updates.
  const result = spawnSync(
    process.platform === "win32" ? "npm.cmd" : "npm",
    ["exec", "--yes", `--package=bun@${version}`, "--", "bun", "install", "--lockfile-only"],
    { cwd: temp, stdio: "inherit", shell: process.platform === "win32" },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error("Bun lock import failed");
  const generated = readFileSync(join(temp, "bun.lock"));
  if (check) {
    if (!generated.equals(readFileSync(join(root, "bun.lock")))) {
      throw new Error(
        "bun.lock differs from the npm dependency graph. Run npm run deps:sync-bun and commit both lockfiles.",
      );
    }
    console.log("Bun lock matches the canonical npm dependency graph.");
  } else {
    copyFileSync(join(temp, "bun.lock"), join(root, "bun.lock"));
    console.log("Updated bun.lock from package-lock.json; review and commit it.");
  }
} finally {
  rmSync(temp, { recursive: true, force: true });
}
