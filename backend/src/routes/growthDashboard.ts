import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";

const GRW_COLS: Record<string, { table: string; columns: string }> = {
  overview: {
    table: "grw_hub",
    columns: "id, metric, value_label AS valueLabel, delta",
  },
  simulations: {
    table: "grw_simulations",
    columns: "id, name, spend, conversion_pct AS conversionPct, learners, cac, revenue",
  },
  funnel: {
    table: "grw_funnel",
    columns: "id, name, visitors, percentage, delta",
  },
  experiments: {
    table: "grw_experiments",
    columns: "id, title, hypothesis, variant, result, status",
  },
  cohorts: {
    table: "grw_cohorts",
    columns: "id, name, w1, w2, w3, w4, w5, w6",
  },
  channels: {
    table: "grw_channels",
    columns: "id, name, cac, ltv, roas, spend",
  },
  referrals: {
    table: "grw_referrals",
    columns: "id, name, reward, invites, conversions, paid_out AS paidOut, status",
  },
  seo: {
    table: "grw_seo",
    columns: "id, keyword, volume, rank, trend, priority",
  },
};

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof GRW_COLS) {
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

export const growthDashboard = new Hono<{ Bindings: AppEnv }>();
growthDashboard.use("*", requireAuth, requireAnyRole(["admin", "instructor", "student"]));
registerLists(growthDashboard, GRW_COLS);
