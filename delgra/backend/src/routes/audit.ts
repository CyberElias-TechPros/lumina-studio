import { Hono } from "hono";
import { requireCap } from "../lib/auth.ts";
import { listMeta, pickSort } from "../lib/list.ts";
import type { Env, SessionUser } from "../lib/env.ts";

type AppEnv = { Bindings: Env; Variables: { user: SessionUser; requestId: string } };

const audit = new Hono<AppEnv>();

const SORTABLE = ["created_at", "actor_name", "action"] as const;

/**
 * Read-only audit trail. Owner/manager only — it exposes who did what, which is
 * exactly what a junior staff member should not be able to enumerate.
 */
audit.get("/", requireCap("read:audit"), async (c) => {
  const page = Math.max(1, Number.parseInt(c.req.query("page") ?? "1", 10) || 1);
  const limit = Math.min(200, Math.max(1, Number.parseInt(c.req.query("limit") ?? "50", 10) || 50));
  const q = (c.req.query("q") ?? "").trim().slice(0, 120).replace(/[%_\\]/g, " ");
  const action = (c.req.query("action") ?? "").trim();
  const entityType = (c.req.query("entityType") ?? "").trim();
  const actorId = (c.req.query("actorId") ?? "").trim();
  const from = (c.req.query("from") ?? "").trim();
  const to = (c.req.query("to") ?? "").trim();
  const sort = pickSort(c.req.query("sort") ?? undefined, SORTABLE, "created_at");
  const dir = c.req.query("dir") === "asc" ? "ASC" : "DESC";

  const where: string[] = [];
  const params: (string | number)[] = [];
  if (q) {
    where.push(`(a.summary LIKE ? OR a.action LIKE ? OR a.actor_name LIKE ?)`);
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }
  if (action) {
    where.push(`a.action LIKE ?`);
    params.push(`${action}%`);
  }
  if (entityType) {
    where.push(`a.entity_type = ?`);
    params.push(entityType);
  }
  if (actorId) {
    where.push(`a.actor_id = ?`);
    params.push(actorId);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(from)) {
    where.push(`a.created_at >= ?`);
    params.push(`${from}T00:00:00.000Z`);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(to)) {
    where.push(`a.created_at <= ?`);
    params.push(`${to}T23:59:59.999Z`);
  }
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const countRow = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM audit_log a ${whereSql}`)
    .bind(...params)
    .first<{ n: number }>();

  const rows = await c.env.DB.prepare(
    `SELECT a.id, a.actor_id, a.actor_name, a.action, a.entity_type, a.entity_id, a.summary, a.ip, a.created_at
       FROM audit_log a ${whereSql}
      ORDER BY a.${sort} ${dir}, a.rowid ${dir} LIMIT ? OFFSET ?`,
  )
    .bind(...params, limit, (page - 1) * limit)
    .all<Record<string, unknown>>();

  return c.json({
    data: rows.results.map((r) => ({
      id: r.id,
      actorId: r.actor_id,
      actorName: r.actor_name,
      action: r.action,
      entityType: r.entity_type,
      entityId: r.entity_id,
      summary: r.summary,
      ip: r.ip,
      createdAt: r.created_at,
    })),
    meta: listMeta(page, limit, countRow?.n ?? 0),
  });
});

/** Distinct action prefixes, for the filter dropdown. */
audit.get("/actions", requireCap("read:audit"), async (c) => {
  const rows = await c.env.DB.prepare(
    `SELECT DISTINCT substr(action, 1, instr(action || '.', '.') - 1) AS group_name, COUNT(*) AS n
       FROM audit_log GROUP BY group_name ORDER BY group_name`,
  ).all();
  return c.json({ actions: rows.results });
});

export default audit;
