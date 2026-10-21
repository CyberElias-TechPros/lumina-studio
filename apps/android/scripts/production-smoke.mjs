import { fileURLToPath } from "node:url";
import path from "node:path";

// Deliberately separate from the write-capable E2E suite. No supplied paths,
// credentials, cookies, POSTs, redirects, account mutations or database assertions.
const checks = Object.freeze([
  { url: "https://www.cea.ng/", kind: "html" },
  { url: "https://www.cea.ng/manifest.webmanifest", kind: "manifest" },
  { url: "https://cea-api.cyber-e54.workers.dev/v1/health", kind: "health" },
]);
export async function productionSmoke(fetcher = fetch) {
  const results = [];
  for (const check of checks) {
    const response = await fetcher(check.url, {
      method: "GET",
      credentials: "omit",
      redirect: "error",
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) {
      await response.body?.cancel();
      throw new Error(`Read-only check ${check.kind}: HTTP ${response.status}`);
    }
    if (check.kind === "html") {
      await response.body?.cancel();
      if (!(response.headers.get("content-type") || "").includes("text/html"))
        throw new Error("Website did not return HTML.");
      results.push({ check: check.kind, status: response.status });
      continue;
    }
    const reader = response.body.getReader();
    const parts = [];
    let bytes = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.length;
      if (bytes > 32768) {
        await reader.cancel();
        throw new Error("Unexpectedly large public check response");
      }
      parts.push(Buffer.from(value));
    }
    const data = JSON.parse(Buffer.concat(parts).toString("utf8"));
    if (check.kind === "health" && data.ok !== true)
      throw new Error("API health did not report ok.");
    if (check.kind === "manifest" && typeof data.name !== "string")
      throw new Error("Invalid public app manifest");
    results.push({
      check: check.kind,
      status: response.status,
      ...(check.kind === "manifest" ? { appName: data.name.slice(0, 120) } : { ok: true }),
    });
  }
  return results;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    console.log(JSON.stringify(await productionSmoke(), null, 2));
  } catch (error) {
    console.error(`::error::${error.message}`);
    process.exitCode = 1;
  }
}
