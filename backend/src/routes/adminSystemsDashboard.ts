import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode, isoNow, randomToken, sha256Hex } from "../lib/crypto";
import { ApiError } from "../lib/errors";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";

const ADM_SYS_COLS: Record<string, { table: string; columns: string }> = {
  overview: {
    table: "adm_hub",
    columns: "id, metric, value_label AS valueLabel, delta",
  },
  keys: {
    table: "adm_keys",
    columns: "id, name, scope, last_used AS lastUsed, status",
  },
  backups: {
    table: "adm_backups",
    columns: "id, name, detail, status",
  },
  integrations: {
    table: "adm_integrations",
    columns: "id, name, detail, status",
  },
  rules: {
    table: "adm_rules",
    columns: "id, name, value_label AS valueLabel, status",
  },
  services: {
    table: "adm_monitor_services",
    columns: "id, name, detail, status",
  },
};

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof ADM_SYS_COLS) {
  for (const [key, { table, columns }] of Object.entries(collections)) {
    router.get(`/${key}`, async (c) => {
      const { cursor, limit } = parsePagination(c);
      const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM ${table}`).first<{
        n: number;
      }>();
      const rows = await c.env.DB.prepare(
        `SELECT ${columns} FROM ${table} ${cursor ? "WHERE id > ?" : ""} ORDER BY sort_order ASC, id ASC LIMIT ?`,
      )
        .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
        .all();
      return c.json(
        paginate(rows.results, total?.n ?? 0, (last) => base64UrlEncode(String(last.id))),
      );
    });
  }
}

export const adminSystemsDashboard = new Hono<{ Bindings: AppEnv }>();
adminSystemsDashboard.use("*", requireAuth, requireAnyRole(["admin"]));
registerLists(adminSystemsDashboard, ADM_SYS_COLS);

/** Queue an audited restore request. The infrastructure performs the actual restore asynchronously. */
adminSystemsDashboard.post("/backups/:id/restore", async (c) => {
  const backupId = c.req.param("id");
  const backup = await c.env.DB.prepare(`SELECT id, name, status FROM adm_backups WHERE id = ?`)
    .bind(backupId)
    .first<{ id: string; name: string; status: string }>();
  if (!backup) throw ApiError.notFound("Backup not found.");
  if (!/verified|complete|success/i.test(backup.status)) {
    throw ApiError.conflict("Only a verified backup can be restored.");
  }

  const existing = await c.env.DB.prepare(
    `SELECT id, status FROM adm_backup_restores
      WHERE backup_id = ? AND status IN ('queued', 'running')
      ORDER BY requested_at DESC LIMIT 1`,
  )
    .bind(backupId)
    .first<{ id: string; status: string }>();
  if (existing) {
    return c.json({
      ok: true,
      alreadyQueued: true,
      id: existing.id,
      backup: backup.name,
      status: existing.status,
    });
  }

  const id = crypto.randomUUID();
  const requestedAt = isoNow();
  await c.env.DB.prepare(
    `INSERT INTO adm_backup_restores (id, backup_id, requested_by, status, requested_at)
     VALUES (?, ?, ?, 'queued', ?)`,
  )
    .bind(id, backupId, c.get("authUser").id, requestedAt)
    .run();
  return c.json(
    { ok: true, alreadyQueued: false, id, backup: backup.name, status: "queued", requestedAt },
    202,
  );
});

/** Rotate a service token. The new plaintext token is returned once and never stored. */
adminSystemsDashboard.post("/keys/:id/rotate", async (c) => {
  const keyId = c.req.param("id");
  const key = await c.env.DB.prepare(`SELECT id FROM adm_keys WHERE id = ?`)
    .bind(keyId)
    .first<{ id: string }>();
  if (!key) throw ApiError.notFound("API key not found.");

  const token = `cea_${randomToken(24)}`;
  const now = isoNow();
  await c.env.DB.prepare(
    `INSERT INTO adm_key_rotations (id, key_id, token_hash, created_at) VALUES (?, ?, ?, ?)`,
  )
    .bind(crypto.randomUUID(), keyId, await sha256Hex(token), now)
    .run();

  return c.json({ ok: true, id: keyId, token, rotatedAt: now });
});

/** Live monitoring summary: service roster + reported app errors from dev_errors. */
adminSystemsDashboard.get("/metrics", async (c) => {
  const services = await c.env.DB.prepare(
    `SELECT name, status FROM adm_monitor_services ORDER BY sort_order ASC`,
  ).all<{ name: string; status: string }>();
  const errors = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM dev_errors`).first<{
    n: number;
  }>();

  const total = services.results.length;
  const healthy = services.results.filter((s) =>
    /healthy|ok|active|connected/i.test(s.status),
  ).length;

  return c.json({
    cards: [
      { label: "Services", value: String(total), delta: `${healthy} healthy` },
      { label: "Healthy", value: String(healthy), delta: `${total - healthy} degraded` },
      { label: "Reported errors", value: String(errors?.n ?? 0), delta: "across all suites" },
      { label: "Database", value: "OK", delta: "D1 reachable" },
    ],
    services: services.results,
    generatedAt: new Date().toISOString(),
  });
});
