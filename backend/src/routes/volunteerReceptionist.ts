import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode, isoNow } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { z } from "zod";
import { parseBody } from "../lib/validate";

const VOL_COLS: Record<string, { table: string; columns: string }> = {
  opportunities: {
    table: "vol_opportunities",
    columns:
      "id, title, date_label AS dateLabel, location_label AS locationLabel, slots_filled AS slotsFilled, slots_total AS slotsTotal, priority",
  },
  signups: {
    table: "vol_signups",
    columns: "id, title, detail, hours, attended, upcoming",
  },
  impact: {
    table: "vol_metrics",
    columns: "id, metric, value_label AS valueLabel, detail",
  },
  hours: {
    table: "vol_hours",
    columns: "id, title, date_label AS dateLabel, hours, status",
  },
  groups: {
    table: "vol_groups",
    columns: "id, name, members, online",
  },
  certs: {
    table: "vol_certs",
    columns: "id, title, detail",
  },
  months: {
    table: "vol_months",
    columns: "id, month, pct",
  },
};

const REC_COLS: Record<string, { table: string; columns: string }> = {
  appointments: {
    table: "rec_appointments",
    columns: "id, title, detail, who, status",
  },
  queue: {
    table: "rec_queue",
    columns: "id, name, host_label AS hostLabel, purpose, time_label AS timeLabel",
  },
  inside: {
    table: "rec_inside",
    columns: "id, name, since_label AS sinceLabel, badge_label AS badgeLabel",
  },
  deliveries: {
    table: "rec_deliveries",
    columns: "id, carrier, item, time_label AS timeLabel, status",
  },
  inquiries: {
    table: "rec_inquiries",
    columns: "id, name, topic, time_label AS timeLabel, stage",
  },
  calls: {
    table: "rec_calls",
    columns: "id, name, topic, time_label AS timeLabel, kind",
  },
  staff: {
    table: "rec_staff",
    columns: "id, name, role, extension, office",
  },
  tasks: {
    table: "rec_tasks",
    columns: "id, title, time_label AS timeLabel, done",
  },
  handover: {
    table: "rec_handover",
    columns: "id, note",
  },
};

function registerLists(router: Hono<{ Bindings: AppEnv }>, collections: typeof VOL_COLS) {
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

export const volunteerDashboard = new Hono<{ Bindings: AppEnv }>();
volunteerDashboard.use("*", requireAuth, requireAnyRole(["volunteer", "admin"]));
registerLists(volunteerDashboard, VOL_COLS);

const logHoursSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(200),
  hours: z.number().int().min(0, "Hours must be 0 or more.").max(24, "Hours too large."),
  dateLabel: z.string().trim().max(50).optional(),
});

/** Volunteer/admin: log volunteer hours. */
volunteerDashboard.post("/hours", async (c) => {
  const user = c.get("authUser");
  const body = await parseBody(c, logHoursSchema);
  const id = crypto.randomUUID();
  const count = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM vol_hours`).first<{
    n: number;
  }>();
  await c.env.DB.prepare(
    `INSERT INTO vol_hours (id, title, date_label, hours, status, sort_order)
     VALUES (?, ?, ?, ?, 'pending', ?)`,
  )
    .bind(id, body.title, body.dateLabel ?? new Date().toISOString().slice(0, 10), body.hours, count?.n ?? 0)
    .run();
  return c.json({ ok: true, id, title: body.title, hours: body.hours, status: "pending" }, 201);
});

export const receptionistDashboard = new Hono<{ Bindings: AppEnv }>();
receptionistDashboard.use("*", requireAuth, requireAnyRole(["receptionist", "admin"]));
registerLists(receptionistDashboard, REC_COLS);
