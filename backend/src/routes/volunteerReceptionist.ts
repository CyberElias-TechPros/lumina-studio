import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { z } from "zod";
import { parseBody } from "../lib/validate";
import { ApiError } from "../lib/errors";

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
    columns: "id, name, host_label AS hostLabel, purpose, time_label AS timeLabel, notified",
  },
  inside: {
    table: "rec_inside",
    columns:
      "id, name, since_label AS sinceLabel, badge_label AS badgeLabel, host_label AS hostLabel, phone, purpose",
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
      const userScoped = key === "signups" || key === "hours";
      const ownershipWhere = userScoped ? " WHERE (user_id = ? OR user_id IS NULL)" : "";
      const cursorWhere = cursor ? `${userScoped ? " AND" : " WHERE"} id > ?` : "";
      const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM ${table}${ownershipWhere}`)
        .bind(...(userScoped ? [c.get("authUser").id] : []))
        .first<{
          n: number;
        }>();
      const rows = await c.env.DB.prepare(
        `SELECT ${columns} FROM ${table}${ownershipWhere}${cursorWhere}
         ORDER BY sort_order ASC, id ASC LIMIT ?`,
      )
        .bind(
          ...(userScoped ? [c.get("authUser").id] : []),
          ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []),
          limit,
        )
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

const signupSchema = z.object({
  opportunityId: z.string().trim().min(1).max(100),
});

const logHoursSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(200),
  hours: z.number().int().min(0, "Hours must be 0 or more.").max(24, "Hours too large."),
  dateLabel: z.string().trim().max(50).optional(),
});

/** Volunteer/admin: reserve one place in an open opportunity. */
volunteerDashboard.post("/signups", requireAnyRole(["volunteer"]), async (c) => {
  const body = await parseBody(c, signupSchema);
  const opportunity = await c.env.DB.prepare(
    `SELECT id, title, date_label, location_label, slots_filled, slots_total
       FROM vol_opportunities WHERE id = ?`,
  )
    .bind(body.opportunityId)
    .first<{
      id: string;
      title: string;
      date_label: string;
      location_label: string;
      slots_filled: number;
      slots_total: number;
    }>();
  if (!opportunity) throw ApiError.notFound("Opportunity not found.");
  if (opportunity.slots_filled >= opportunity.slots_total) {
    throw ApiError.conflict("This opportunity is already full.");
  }
  const userId = c.get("authUser").id;
  const existing = await c.env.DB.prepare(
    `SELECT id FROM vol_signups WHERE opportunity_id = ? AND user_id = ?`,
  )
    .bind(opportunity.id, userId)
    .first<{ id: string }>();
  if (existing) throw ApiError.conflict("You are already signed up for this opportunity.");

  const id = `vol-signup-${crypto.randomUUID()}`;
  const detail = `${opportunity.date_label} · ${opportunity.location_label}`;
  const results = await c.env.DB.batch([
    c.env.DB.prepare(
      `UPDATE vol_opportunities SET slots_filled = slots_filled + 1
        WHERE id = ? AND slots_filled < slots_total
          AND NOT EXISTS (
            SELECT 1 FROM vol_signups WHERE opportunity_id = ? AND user_id = ?
          )`,
    ).bind(opportunity.id, opportunity.id, userId),
    c.env.DB.prepare(
      `INSERT INTO vol_signups (id, title, detail, hours, attended, upcoming, sort_order, user_id, opportunity_id)
       SELECT ?, ?, ?, NULL, 0, 1, ?, ?, ?
       WHERE changes() = 1`,
    ).bind(id, opportunity.title, detail, Date.now(), userId, opportunity.id),
  ]);
  if (results[0]?.meta.changes !== 1 || results[1]?.meta.changes !== 1) {
    throw ApiError.conflict("This opportunity is full or you are already signed up.");
  }
  return c.json({ ok: true, id, title: opportunity.title, detail, upcoming: 1 }, 201);
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
    `INSERT INTO vol_hours (id, title, date_label, hours, status, sort_order, user_id)
     VALUES (?, ?, ?, ?, 'pending', ?, ?)`,
  )
    .bind(
      id,
      body.title,
      body.dateLabel ?? new Date().toISOString().slice(0, 10),
      body.hours,
      count?.n ?? 0,
      user.id,
    )
    .run();
  return c.json({ ok: true, id, title: body.title, hours: body.hours, status: "pending" }, 201);
});

const visitorSchema = z.object({
  fullName: z.string().trim().min(1, "Visitor name is required.").max(160),
  hostLabel: z.string().trim().min(1, "Host name is required.").max(160),
  phone: z.string().trim().max(40).optional(),
  purpose: z.string().trim().min(1, "Visit purpose is required.").max(160),
});

export const receptionistDashboard = new Hono<{ Bindings: AppEnv }>();
receptionistDashboard.use("*", requireAuth, requireAnyRole(["receptionist", "admin"]));
registerLists(receptionistDashboard, REC_COLS);

/** Receptionist/admin: add a visitor to the active on-site register. */
receptionistDashboard.post("/check-in", requireAnyRole(["receptionist", "admin"]), async (c) => {
  const input = await parseBody(c, visitorSchema);
  const id = `visitor-${crypto.randomUUID()}`;
  const sinceLabel = `Today · ${new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
  await c.env.DB.prepare(
    `INSERT INTO rec_inside (id, name, since_label, badge_label, sort_order, host_label, phone, purpose)
       VALUES (?, ?, ?, 'Visitor', ?, ?, ?, ?)`,
  )
    .bind(
      id,
      input.fullName,
      sinceLabel,
      Date.now(),
      input.hostLabel,
      input.phone ?? "",
      input.purpose,
    )
    .run();
  return c.json(
    {
      visitor: {
        id,
        name: input.fullName,
        sinceLabel,
        badgeLabel: "Visitor",
        hostLabel: input.hostLabel,
        phone: input.phone ?? "",
        purpose: input.purpose,
      },
    },
    201,
  );
});

/** Receptionist/admin: mark a visitor as checked out. */
receptionistDashboard.delete(
  "/inside/:id",
  requireAnyRole(["receptionist", "admin"]),
  async (c) => {
    const id = c.req.param("id");
    const result = await c.env.DB.prepare(`DELETE FROM rec_inside WHERE id = ?`).bind(id).run();
    if (result.meta.changes !== 1) throw ApiError.notFound("Visitor not found.");
    return c.json({ ok: true, id });
  },
);

const taskUpdateSchema = z.object({
  done: z
    .union([z.boolean(), z.number().int().min(0).max(1)])
    .transform((value) => (typeof value === "boolean" ? (value ? 1 : 0) : value)),
});

/** Receptionist/admin: update a shift task's completion state. */
receptionistDashboard.patch("/tasks/:id", requireAnyRole(["receptionist", "admin"]), async (c) => {
  const { done } = await parseBody(c, taskUpdateSchema);
  const id = c.req.param("id");
  const result = await c.env.DB.prepare(`UPDATE rec_tasks SET done = ? WHERE id = ?`)
    .bind(done, id)
    .run();
  if (result.meta.changes !== 1) throw ApiError.notFound("Task not found.");
  return c.json({ ok: true, id, done });
});

/** Receptionist/admin: record that a visitor's host has been notified. */
receptionistDashboard.patch(
  "/queue/:id/notify",
  requireAnyRole(["receptionist", "admin"]),
  async (c) => {
    const id = c.req.param("id");
    const result = await c.env.DB.prepare(`UPDATE rec_queue SET notified = 1 WHERE id = ?`)
      .bind(id)
      .run();
    if (result.meta.changes !== 1) throw ApiError.notFound("Queue entry not found.");
    return c.json({ ok: true, id, notified: 1 });
  },
);
