/** Write-capable suites must never default to CEA's production services. */
export function assertIsolatedTestUrl(value: string): string {
  const url = new URL(value);
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  const production =
    /(^|\.)cea\.ng$/.test(url.hostname) || url.hostname === "cea-api.cyber-e54.workers.dev";
  if (production || (!local && process.env.E2E_ALLOW_STAGING !== "true")) {
    throw new Error(
      `Refusing write-capable browser tests on ${url.hostname}. Use isolated local services, or explicitly acknowledge a non-production staging host with E2E_ALLOW_STAGING=true.`,
    );
  }
  return value;
}
