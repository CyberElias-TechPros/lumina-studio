import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";

const CCP_COLS: Record<string, { table: string; columns: string }> = {
  overview: {
    table: "ccp_hub",
    columns: "id, metric, value_label AS valueLabel, delta",
  },
  assets: {
    table: "ccp_assets",
    columns: "id, title, category, variants, last_used AS lastUsed, status",
  },
  rules: {
    table: "ccp_rules",
    columns: "id, name, category, detail, status",
  },
  sequences: {
    table: "ccp_sequences",
    columns: "id, title, emails, open_rate AS openRate, click_rate AS clickRate, status",
  },
  briefs: {
    table: "ccp_briefs",
    columns: "id, title, requester, date_label AS dateLabel, status",
  },
  analytics: {
    table: "ccp_analytics",
    columns: "id, stage, visits, conversion, delta",
  },
  ads: {
    table: "ccp_ads",
    columns: "id, name, channel, ctr, variants, status",
  },
  tests: {
    table: "ccp_tests",
    columns: "id, title, result, status",
  },
  sections: {
    table: "ccp_sections",
    columns: "id, title, copy, conversion, status",
  },
};

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof CCP_COLS) {
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

export const conversionCopyDashboard = new Hono<{ Bindings: AppEnv }>();
conversionCopyDashboard.use("*", requireAuth, requireAnyRole(["admin", "instructor"]));
registerLists(conversionCopyDashboard, CCP_COLS);
