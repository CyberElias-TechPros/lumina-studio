import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    cloudflareTest({
      wrangler: { configPath: "./wrangler.jsonc" },
      // wrangler.jsonc pins APP_ENV="production" so the deployed Worker issues
      // Secure cookies and never returns dev magic-link tokens. The test pool
      // inherits those vars, which silently breaks every suite that signs in
      // through the dev-token flow (the auth route refuses to hand out dev
      // tokens in production). Override APP_ENV for the test environment only;
      // mergeWorkerOptions merges this into the wrangler-derived bindings
      // key-by-key, so D1/KV/R2/DO bindings are preserved.
      miniflare: { bindings: { APP_ENV: "test" } },
    }),
  ],
  test: {
    include: ["test/**/*.test.ts"],
    testTimeout: 15_000,
    hookTimeout: 300_000,
  },
});
