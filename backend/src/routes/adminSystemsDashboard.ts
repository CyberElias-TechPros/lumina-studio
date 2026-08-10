import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
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

/** Live monitoring summary: service roster + reported app errors from dev_errors. */
adminSystemsDashboard.get("/metrics", async (c) => {
  const services = await c.env.DB.prepare(
    `SELECT name, status FROM adm_monitor_services ORDER BY sort_order ASC`,
  ).all<{ name: string; status: string }>();
  const errors = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM dev_errors`).first<{
    n: number;
  }>();

  const total = services.results.length;
  const healthy = services.results.filter((s) => /healthy|ok|active|connected/i.test(s.status)).length;

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
