import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: {
        wrangler: { configPath: "./wrangler.jsonc" },
        miniflare: {
          bindings: {
            // Tests must never look like production: dev conveniences are gated
            // on APP_ENV, and the demo-login shortcut is disabled outside `test`.
            APP_ENV: "test",
            COOKIE_SECURE: "false",
            SESSION_TTL_MINUTES: "60",
            FRONTEND_ORIGINS: "http://localhost:5173",
            MAX_UPLOAD_BYTES: "10485760",
          },
        },
      },
    },
    include: ["test/**/*.test.ts"],
    testTimeout: 30_000,
    hookTimeout: 60_000,
  },
});
