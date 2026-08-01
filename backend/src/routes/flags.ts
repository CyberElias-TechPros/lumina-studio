import { Hono } from "hono";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";

/**
 * KV-backed feature flags. `GET /v1/flags` merges the static defaults with
 * per-key overrides stored in the FLAGS KV namespace (single JSON blob keyed
 * "overrides"). Admins toggle flags with PUT and reset with DELETE.
 * Keep FLAG_DEFAULTS in sync with src/lib/flags.ts.
 */
export const FLAG_DEFAULTS: Record<string, boolean> = {
  "ai.grading": false,
  "ai.recommendations": false,
  "ai.assistant": false,
  "ai.content-gen": false,
  "realtime.chat": false,
  "realtime.live-class": false,
  "payments.paystack": false,
  "uploads.r2": false,
  "pwa.push": false,
  "onboarding.tours": true,
};

const OVERRIDES_KEY = "overrides";

function isBooleanRecord(value: unknown): value is Record<string, boolean> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((v) => typeof v === "boolean")
  );
}

async function readOverrides(c: { env: AppEnv }): Promise<Record<string, boolean>> {
  const raw = await c.env.FLAGS.get(OVERRIDES_KEY, "json");
  return isBooleanRecord(raw) ? raw : {};
}

export const flags = new Hono<{ Bindings: AppEnv }>();

flags.get("/", async (c) => {
  const overrides = await readOverrides(c);
  return c.json({ ...FLAG_DEFAULTS, ...overrides });
});

/** Admin-only: set a flag override. */
flags.put("/:key", async (c) => {
  const key = c.req.param("key");
  if (!(key in FLAG_DEFAULTS)) throw ApiError.notFound(`Unknown flag "${key}".`);
  const body = (await c.req.json().catch(() => null)) as { enabled?: unknown } | null;
  const enabled = body?.enabled;
  if (typeof enabled !== "boolean") {
    throw ApiError.validation({ enabled: ["enabled must be a boolean."] });
  }
  const overrides = await readOverrides(c);
  overrides[key] = enabled;
  await c.env.FLAGS.put(OVERRIDES_KEY, JSON.stringify(overrides));
  return c.json({ key, enabled, mock: false });
});

/** Admin-only: remove a flag override, falling back to the default. */
flags.delete("/:key", async (c) => {
  const key = c.req.param("key");
  if (!(key in FLAG_DEFAULTS)) throw ApiError.notFound(`Unknown flag "${key}".`);
  const overrides = await readOverrides(c);
  if (key in overrides) {
    delete overrides[key];
    if (Object.keys(overrides).length === 0) {
      await c.env.FLAGS.delete(OVERRIDES_KEY);
    } else {
      await c.env.FLAGS.put(OVERRIDES_KEY, JSON.stringify(overrides));
    }
  }
  return c.json({ key, enabled: FLAG_DEFAULTS[key] });
});
