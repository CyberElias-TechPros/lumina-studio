/**
 * Admin-only operational endpoints.
 *
 *   GET  /v1/system/readiness        which integrations are configured (booleans only — never values)
 *   GET  /v1/system/jobs             recent scheduled-job runs
 *   POST /v1/system/jobs/:job/run    trigger a job on demand
 */
import { Hono } from "hono";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { isJobName, runJob, CRON_SCHEDULE } from "../jobs/scheduled";
import { z } from "zod";
import { parseBody } from "../lib/validate";
import { sendSms, normalizePhone } from "../lib/sms";

export const system = new Hono<{ Bindings: AppEnv }>();

export function readiness(env: AppEnv) {
  const emailProvider = (env.EMAIL_PROVIDER || "console").toLowerCase();
  const checks = {
    email: emailProvider !== "console" && Boolean(env.EMAIL_API_KEY),
    payments: Boolean(env.PAYSTACK_SECRET_KEY),
    turnstile: Boolean(env.TURNSTILE_SECRET_KEY),
    push: Boolean(env.VAPID_PUBLIC_KEY && env.VAPID_PRIVATE_KEY),
    ai: Boolean(env.AI_API_KEY),
    errorReporting: Boolean(env.SENTRY_DSN),
    sms: Boolean(env.SMS_API_KEY),
    contactInbox: Boolean(env.CONTACT_INBOX || env.EMAIL_REPLY_TO),
    leadsSheet: Boolean(env.GOOGLE_SHEET_WEBHOOK_URL),
    uploads: Boolean(env.UPLOADS),
    realtime: Boolean(env.REALTIME_ROOMS),
  };
  const required: (keyof typeof checks)[] = ["email", "payments"];
  return {
    appEnv: env.APP_ENV,
    emailProvider,
    checks,
    missingRequired: required.filter((k) => !checks[k]),
    ready: required.every((k) => checks[k]),
  };
}

system.get("/readiness", (c) => c.json(readiness(c.env)));

system.get("/jobs", async (c) => {
  const rows = await c.env.DB.prepare(
    `SELECT id, job, status, detail, started_at, finished_at FROM job_runs
      ORDER BY started_at DESC LIMIT 50`,
  ).all<{
    id: string;
    job: string;
    status: string;
    detail: string;
    started_at: string;
    finished_at: string;
  }>();
  return c.json({
    schedule: CRON_SCHEDULE,
    items: (rows.results ?? []).map((r) => ({
      id: r.id,
      job: r.job,
      status: r.status,
      detail: r.detail,
      startedAt: r.started_at,
      finishedAt: r.finished_at,
    })),
  });
});

system.post("/jobs/:job/run", async (c) => {
  const job = c.req.param("job");
  if (!isJobName(job)) throw ApiError.notFound("Unknown job.");
  const result = await runJob(c.env, job);
  return c.json({ job, ...result });
});

/** Send a test SMS to verify provider credentials and sender ID. */
system.post("/sms/test", async (c) => {
  const { to } = await parseBody(c, z.object({ to: z.string().trim().min(6).max(32) }));
  if (!normalizePhone(to)) throw ApiError.validation({ to: ["Enter a valid phone number."] });
  const result = await sendSms(c.env, {
    to,
    body: "CEA: test message from the operations console.",
    userId: c.get("authUser").id,
  });
  return c.json(result);
});
