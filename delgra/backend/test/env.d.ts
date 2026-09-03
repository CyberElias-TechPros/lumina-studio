/// <reference types="@cloudflare/vitest-pool-workers" />

import type { Env } from "../src/lib/env.ts";

/**
 * Tells `cloudflare:test` that `env` is our real `Env`, so `env.DB`, `env.UPLOADS`
 * and `env.RATE_LIMIT` are typed in tests exactly as they are in the Worker.
 */
declare module "cloudflare:test" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface ProvidedEnv extends Env {}
}
