import { isoNow } from "./lib/ids.ts";
import type { Env } from "./lib/env.ts";

/**
 * Scheduled handler (`triggers.crons` in wrangler.jsonc, 06:15 UTC daily).
 *
 * Three housekeeping jobs that would otherwise need a human to remember them.
 * Each is wrapped so one failure cannot stop the others, and each returns a count
 * that lands in Workers logs for observability.
 */
export async function scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
  ctx.waitUntil(runMaintenance(env));
}

export interface MaintenanceResult {
  expiredSessions: number;
  orphanedObjects: number;
  overdueInvoices: number;
  overdueValueKobo: number;
  lowStockProducts: number;
  durationMs: number;
}

/**
 * Exported separately from `scheduled` so the test suite can drive the real
 * maintenance code against a real D1 instance rather than asserting on a mock.
 */
export async function runMaintenance(env: Env): Promise<MaintenanceResult> {
  const started = Date.now();
  const now = isoNow();

  const expiredSessions = await safe(async () => {
    const result = await env.DB.prepare(`DELETE FROM sessions WHERE expires_at < ?`).bind(now).run();
    return result.meta.changes ?? 0;
  }, "expire-sessions");

  const orphanedObjects = await safe(async () => {
    // Find R2 objects whose `documents` row is gone (e.g. a failed delete) and
    // remove the bytes. Listing is paginated; one pass per run is enough since
    // orphans accumulate slowly.
    let deleted = 0;
    let cursor: string | undefined;
    for (let page = 0; page < 5; page++) {
      const listed = await env.UPLOADS.list({ cursor, limit: 500 });
      for (const object of listed.objects) {
        // Branding is stored outside the document tree and is never an orphan.
        if (object.key.startsWith("branding/")) continue;
        const row = await env.DB.prepare(`SELECT id FROM documents WHERE stored_key = ?`)
          .bind(object.key)
          .first();
        if (!row) {
          await env.UPLOADS.delete(object.key);
          deleted += 1;
        }
      }
      if (listed.truncated) cursor = listed.cursor;
      else break;
    }
    return deleted;
  }, "prune-orphaned-objects");

  const overdue = await safe(async () => {
    const row = await env.DB.prepare(
      `SELECT COUNT(*) AS n, COALESCE(SUM(MAX(total - paid_amount, 0)), 0) AS value
         FROM invoices
        WHERE status IN ('sent','partial') AND due_date < ? AND paid_amount < total`,
    )
      .bind(now.slice(0, 10))
      .first<{ n: number; value: number }>();
    return { count: row?.n ?? 0, value: row?.value ?? 0 };
  }, "overdue-scan");

  const lowStock = await safe(async () => {
    const row = await env.DB.prepare(
      `SELECT COUNT(*) AS n FROM products WHERE track_stock = 1 AND is_active = 1 AND quantity <= reorder_level`,
    ).first<{ n: number }>();
    return row?.n ?? 0;
  }, "low-stock-scan");

  const result: MaintenanceResult = {
    expiredSessions,
    orphanedObjects,
    overdueInvoices: overdue.count,
    overdueValueKobo: overdue.value,
    lowStockProducts: lowStock,
    durationMs: Date.now() - started,
  };

  // Structured log line — searchable in Workers observability. No secrets, no
  // customer identifiers, just operational counts.
  console.log(JSON.stringify({ event: "maintenance", ...result }));
  return result;
}

/** Run a job, log and swallow its failure so siblings still run. */
async function safe<T>(job: () => Promise<T>, name: string): Promise<T> {
  try {
    return await job();
  } catch (err) {
    console.error(JSON.stringify({ event: "maintenance_job_failed", job: name, message: String(err) }));
    return (name === "overdue-scan" ? { count: 0, value: 0 } : 0) as T;
  }
}
