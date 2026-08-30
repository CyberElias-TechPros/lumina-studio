import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";

const DEV_COLS: Record<string, { table: string; columns: string }> = {
  overview: {
    table: "dev_hub",
    columns: "id, metric, value_label AS valueLabel, delta",
  },
  endpoints: {
    table: "dev_endpoints",
    columns: "id, endpoint, description",
  },
  deploys: {
    table: "dev_deploys",
    columns: "id, version_label AS versionLabel, status, time_label AS timeLabel",
  },
  prs: {
    table: "dev_prs",
    columns: "id, title, branch, status",
  },
  errors: {
    table: "dev_errors",
    columns: "id, title, count_label AS countLabel, status",
  },
  tasks: {
    table: "dev_tasks",
    columns: "id, title, detail, status",
  },
  deps: {
    table: "dev_deps",
    columns: "id, name, version, status",
  },
  reviews: {
    table: "dev_reviews",
    columns: "id, title, detail, status",
  },
  vars: {
    table: "dev_vars",
    columns: "id, key, value, env",
  },
  queues: {
    table: "dev_queues",
    columns: "id, name, detail, status",
  },
  docs: {
    table: "dev_docs",
    columns: "id, title, updated_label AS updatedLabel",
  },
};

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof DEV_COLS) {
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

export const devDashboard = new Hono<{ Bindings: AppEnv }>();
devDashboard.use("*", requireAuth, requireAnyRole(["dev", "admin"]));
registerLists(devDashboard, DEV_COLS);
