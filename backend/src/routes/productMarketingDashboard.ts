import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";

const PM_COLS: Record<string, { table: string; columns: string }> = {
  overview: {
    table: "pm_hub",
    columns: "id, metric, value_label AS valueLabel, delta",
  },
  phases: {
    table: "pm_phases",
    columns: "id, launch, phase, pct, status",
  },
  tasks: {
    table: "pm_tasks",
    columns: "id, title, owner, status",
  },
  gates: {
    table: "pm_gates",
    columns: "id, phase, gate, owner, due_label AS dueLabel, status",
  },
  statements: {
    table: "pm_statements",
    columns: "id, product, statement, audience, pain, benefit",
  },
  messagehouse: {
    table: "pm_messagehouse",
    columns: "id, label, value",
  },
  competitors: {
    table: "pm_competitors",
    columns: "id, name, focus, strength, weakness, notes",
  },
  features: {
    table: "pm_features",
    columns: "id, capability, cea, skilledge, aptbridge",
  },
  launches: {
    table: "pm_launches",
    columns: "id, name, date_label AS dateLabel, phase, owner, status",
  },
  readiness: {
    table: "pm_readiness",
    columns: "id, label, pct, status",
  },
  studies: {
    table: "pm_studies",
    columns: "id, title, detail, sample, method, status",
  },
  findings: {
    table: "pm_findings",
    columns: "id, title, tag",
  },
  matrix: {
    table: "pm_matrix",
    columns: "id, product, audience, message, proof, status",
  },
  briefs: {
    table: "pm_briefs",
    columns: "id, title, objective, audience, channels, metric, status",
  },
  months: {
    table: "pm_months",
    columns: "id, month, roi, win_rate AS winRate, pipeline, pct",
  },
};

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof PM_COLS) {
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

export const productMarketingDashboard = new Hono<{ Bindings: AppEnv }>();
productMarketingDashboard.use(
  "*",
  requireAuth,
  requireAnyRole(["admin", "instructor", "student"]),
);
registerLists(productMarketingDashboard, PM_COLS);