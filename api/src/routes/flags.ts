import { Hono } from "hono";

/**
 * Feature flags. Keep in sync with src/lib/flags.ts FLAG_DEFAULTS — this is the
 * Phase 1 static version; Phase 5 replaces it with KV-backed flags.
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

export const flags = new Hono().get("/", (c) => c.json(FLAG_DEFAULTS));
