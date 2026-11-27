import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const GEN = readFileSync(join(ROOT, "src/lib/next-compat/routes.gen.ts"), "utf8");

test("a route that declares noIndex is carried into the manifest", () => {
  // The bug this locks: the metadata adapter built its `noIndex` purely from
  // hardcoded path rules and never read the route's own head(). Seven routes
  // declared noindex and were served as indexable — /search, /merchant,
  // /partners/apply and others among them.
  const declared = ["/ad-placements", "/search", "/merchant", "/partners/apply"];
  for (const path of declared) {
    const row = GEN.split("\n").find((line) => line.includes(`path: "${path}"`));
    assert.ok(row, `${path} missing from the manifest`);
    assert.match(row, /noIndex: true/, `${path} declares noIndex but the manifest lost it`);
  }
});

test("indexable pages are not accidentally marked noindex", () => {
  // Each manifest row starts with `{ path: "..."`. Anchor on that so a dynamic
  // prefix like /classes/$courseSlug cannot match a longer sibling row.
  const rows = GEN.split("\n").filter((line) => line.trimStart().startsWith("{ path: "));
  // Index routes carry a trailing slash in the manifest (`/classes/$courseSlug/`),
  // because that is how createFileRoute declares them.
  for (const path of ["/", "/blog/$slug", "/classes/$courseSlug/"]) {
    const row = rows.find((line) => line.includes(`path: "${path}",`));
    assert.ok(row, `${path} missing from the manifest`);
    assert.match(row, /noIndex: false/, `${path} should stay indexable`);
  }
});

test("the adapter treats noindex as one-way", () => {
  // Any source can force it; none can cancel it. If this becomes a plain
  // OR-chain reassignment, a later branch can quietly re-enable indexing.
  const src = readFileSync(join(ROOT, "src/lib/next-compat/metadata.ts"), "utf8");
  assert.match(src, /entry\.noIndex === true/, "the adapter must read the manifest flag");
  assert.match(
    src,
    /One-way: any source may force noindex, none may cancel another/,
    "the one-way comment documents the invariant and must stay with it",
  );
});
