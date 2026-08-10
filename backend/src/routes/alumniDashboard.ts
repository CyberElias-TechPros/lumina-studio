import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";

const ALU_COLS: Record<string, { table: string; columns: string }> = {
  overview: {
    table: "alu_hub",
    columns: "id, metric, value_label AS valueLabel, delta",
  },
  events: {
    table: "alu_events",
    columns: "id, title, date_label AS dateLabel, location, going, status",
  },
  members: {
    table: "alu_members",
    columns: "id, name, cohort, role_label AS roleLabel, city, conn",
  },
  stories: {
    table: "alu_stories",
    columns: "id, name, cohort, company, role, excerpt, initials, tone",
  },
  milestones: {
    table: "alu_milestones",
    columns: "id, label, value",
  },
  jobs: {
    table: "alu_jobs",
    columns: "id, role, company, period, place, current, description",
  },
  achievements: {
    table: "alu_achievements",
    columns: "id, title, org, year",
  },
  skills: {
    table: "alu_skills",
    columns: "id, name",
  },
  commitments: {
    table: "alu_commitments",
    columns: "id, mentee, track, cadence, next_label AS nextLabel, status",
  },
  ways: {
    table: "alu_ways",
    columns: "id, title, detail",
  },
  impact: {
    table: "alu_impact",
    columns: "id, value, label",
  },
};

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof ALU_COLS) {
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

export const alumniDashboard = new Hono<{ Bindings: AppEnv }>();
alumniDashboard.use("*", requireAuth, requireAnyRole(["alumni", "admin"]));
registerLists(alumniDashboard, ALU_COLS);