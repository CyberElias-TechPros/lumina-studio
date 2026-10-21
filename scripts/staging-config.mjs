import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ts from "typescript";
const root = fileURLToPath(new URL("../", import.meta.url));
export async function productionConfig() {
  const parsed = ts.parseConfigFileTextToJson(
    "wrangler.jsonc",
    await readFile(path.join(root, "backend/wrangler.jsonc"), "utf8"),
  );
  if (parsed.error)
    throw new Error("Cannot parse production config; refusing to generate staging.");
  return parsed.config;
}
export function buildStaging(input, production) {
  if (!input || typeof input !== "object")
    throw new Error("A staging resource JSON file is required.");
  const origin = new URL(input.frontendOrigin);
  const productionOrigins = production.vars.FRONTEND_ORIGINS.split(",").map(
    (v) => new URL(v).origin,
  );
  if (
    origin.protocol !== "https:" ||
    origin.username ||
    origin.password ||
    origin.pathname !== "/" ||
    origin.search ||
    origin.hash ||
    productionOrigins.includes(origin.origin) ||
    origin.hostname === "cea.ng" ||
    origin.hostname === "www.cea.ng"
  )
    throw new Error("Use a distinct HTTPS staging frontend origin, not a production site.");
  const { databaseId, flagsId, rateLimitId } = input;
  if (
    typeof databaseId !== "string" ||
    !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(databaseId) ||
    /^0+-0+-0+-0+-0+$/.test(databaseId)
  )
    throw new Error("Use the real new staging D1 ID.");
  for (const id of [flagsId, rateLimitId])
    if (typeof id !== "string" || !/^[0-9a-f]{32}$/i.test(id) || /^0+$/.test(id))
      throw new Error("Use real staging KV IDs.");
  const forbidden = new Set([
    ...production.d1_databases.map((v) => v.database_id.toLowerCase()),
    ...production.kv_namespaces.map((v) => v.id.toLowerCase()),
    ...Object.values(production.env || {}).flatMap((env) => [
      ...(env.d1_databases || []).map((v) => v.database_id.toLowerCase()),
      ...(env.kv_namespaces || []).map((v) => v.id.toLowerCase()),
    ]),
  ]);
  if (
    [databaseId, flagsId, rateLimitId].some((id) => forbidden.has(id.toLowerCase())) ||
    flagsId.toLowerCase() === rateLimitId.toLowerCase()
  )
    throw new Error("Staging must use distinct resources, never production/dev binding IDs.");
  return {
    $schema: "node_modules/wrangler/config-schema.json",
    name: "cea-api-staging",
    main: "src/index.ts",
    account_id: production.account_id,
    compatibility_date: production.compatibility_date,
    workers_dev: true,
    observability: { enabled: true },
    // Keep production auth/cookie/CSRF behaviour; do not expose dev magic-link tokens.
    vars: {
      APP_ENV: "production",
      APP_URL: origin.origin,
      FRONTEND_ORIGINS: origin.origin,
      UPLOADS_PRESIGN_URL: "",
      EMAIL_PROVIDER: "console",
      EMAIL_FROM: "CEA Test <test@cea.ng>",
      EMAIL_REPLY_TO: "help@cea.ng",
      GOOGLE_SHEET_WEBHOOK_URL: "",
      SMS_PROVIDER: "console",
    },
    // No schedules, production secrets, payment keys, mail API keys or Sheets hooks are copied.
    triggers: { crons: [] },
    d1_databases: [
      {
        binding: "DB",
        database_name: "cea-db-staging",
        database_id: databaseId,
        migrations_dir: "migrations",
      },
    ],
    kv_namespaces: [
      { binding: "FLAGS", id: flagsId },
      { binding: "RATE_LIMIT", id: rateLimitId },
    ],
    r2_buckets: [{ binding: "UPLOADS", bucket_name: "cea-uploads-staging" }],
    durable_objects: { bindings: [{ name: "REALTIME_ROOMS", class_name: "RealtimeRoom" }] },
    migrations: [{ tag: "v1", new_sqlite_classes: ["RealtimeRoom"] }],
  };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const inputPath = process.argv[2];
  if (!inputPath)
    throw new Error("Usage: node scripts/staging-config.mjs path/to/real-staging-resources.json");
  const config = buildStaging(
    JSON.parse(await readFile(inputPath, "utf8")),
    await productionConfig(),
  );
  const output = path.join(root, "backend/wrangler.staging.json");
  await writeFile(output, JSON.stringify(config, null, 2) + "\n");
  console.log("Wrote backend/wrangler.staging.json for review. Nothing was deployed or migrated.");
}
