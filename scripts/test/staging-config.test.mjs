import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID, randomBytes } from "node:crypto";
import { buildStaging, productionConfig } from "../staging-config.mjs";
// Synthetic IDs are test fixtures only. No generated test config is written/deployed.
const production = await productionConfig();
const fixture = () => ({
  frontendOrigin: "https://test-site.example.org",
  databaseId: randomUUID(),
  flagsId: randomBytes(16).toString("hex"),
  rateLimitId: randomBytes(16).toString("hex"),
});
test("isolated config retains production auth and has no crons or copied service secrets", () => {
  const c = buildStaging(fixture(), production);
  assert.equal(c.vars.APP_ENV, "production");
  assert.deepEqual(c.triggers.crons, []);
  assert.equal(c.name, "cea-api-staging");
  assert.equal(c.r2_buckets[0].bucket_name, "cea-uploads-staging");
  assert.equal(c.vars.PAYSTACK_SECRET_KEY, undefined);
  assert.equal(c.vars.EMAIL_API_KEY, undefined);
  assert.equal(c.vars.GOOGLE_SHEET_WEBHOOK_URL, "");
  assert.equal(c.env, undefined);
});
test("production URLs and resource IDs are rejected", () => {
  for (const url of production.vars.FRONTEND_ORIGINS.split(","))
    assert.throws(() => buildStaging({ ...fixture(), frontendOrigin: url }, production));
  assert.throws(() =>
    buildStaging({ ...fixture(), databaseId: production.d1_databases[0].database_id }, production),
  );
  assert.throws(() =>
    buildStaging({ ...fixture(), flagsId: production.kv_namespaces[0].id }, production),
  );
  const f = fixture();
  assert.throws(() => buildStaging({ ...f, rateLimitId: f.flagsId }, production));
});
test("bad origins and placeholder IDs cannot produce a config", () => {
  for (const url of [
    "http://example.org",
    "https://example.org/path",
    "https://name:pass@example.org",
    "https://example.org/?key=1",
  ])
    assert.throws(() => buildStaging({ ...fixture(), frontendOrigin: url }, production));
  assert.throws(() =>
    buildStaging({ ...fixture(), databaseId: "00000000-0000-0000-0000-000000000000" }, production),
  );
});
