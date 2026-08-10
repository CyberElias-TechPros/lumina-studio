import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";

const BD_COLS: Record<string, { table: string; columns: string }> = {
  overview: {
    table: "bd_hub",
    columns: "id, metric, value_label AS valueLabel, delta",
  },
  interventions: {
    table: "bd_interventions",
    columns:
      "id, title, goal, mechanism, effort, evidence, tests_run AS testsRun, status",
  },
  flows: {
    table: "bd_flows",
    columns: "id, name, stage, status",
  },
  "flow-steps": {
    table: "bd_flow_steps",
    columns: "id, flow_id AS flowId, step_no AS stepNo, title, subtitle",
  },
  campaigns: {
    table: "bd_campaigns",
    columns: "id, title, trigger, channel, sends, opt_out AS optOut, status",
  },
  tests: {
    table: "bd_tests",
    columns:
      "id, name, variants, sample_label AS sampleLabel, lift_label AS liftLabel, sig_label AS sigLabel, status",
  },
  results: {
    table: "bd_results",
    columns: "id, metric, baseline, change_label AS changeLabel, status",
  },
  stages: {
    table: "bd_funnel_stages",
    columns: "id, name, users, percent, status",
  },
  segments: {
    table: "bd_segments",
    columns: "id, name, size, traits, status",
  },
  programs: {
    table: "bd_programs",
    columns: "id, name, goal, streak, status",
  },
  checkins: {
    table: "bd_checkins",
    columns: "id, learner, cycle, streak, status",
  },
};

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof BD_COLS) {
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

export const behavioralDashboard = new Hono<{ Bindings: AppEnv }>();
behavioralDashboard.use("*", requireAuth, requireAnyRole(["behavioral-design", "admin"]));
registerLists(behavioralDashboard, BD_COLS);