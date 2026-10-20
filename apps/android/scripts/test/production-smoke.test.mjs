import { test } from "node:test";
import assert from "node:assert/strict";
import { productionSmoke } from "../production-smoke.mjs";
test("live checks are limited to three credential-free GET requests", async () => {
  const calls = [];
  const results = await productionSmoke(async (url, options) => {
    calls.push({ url, options });
    if (url.endsWith("/health")) return Response.json({ ok: true, db: "ok" });
    if (url.endsWith("webmanifest")) return Response.json({ name: "CEA" });
    return new Response("<html></html>", { headers: { "content-type": "text/html" } });
  });
  assert.equal(results.length, 3);
  assert.deepEqual(
    calls.map((c) => c.url),
    [
      "https://www.cea.ng/",
      "https://www.cea.ng/manifest.webmanifest",
      "https://cea-api.cyber-e54.workers.dev/v1/health",
    ],
  );
  for (const c of calls) {
    assert.equal(c.options.method, "GET");
    assert.equal(c.options.credentials, "omit");
    assert.equal(c.options.redirect, "error");
    assert.equal(c.options.body, undefined);
    assert.equal(c.options.headers, undefined);
  }
});
test("failed public health fails without retrying or mutating anything", async () => {
  await assert.rejects(
    productionSmoke(async () => new Response("", { status: 503 })),
    /HTTP 503/,
  );
});
