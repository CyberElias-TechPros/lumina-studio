import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode, isoNow } from "../lib/crypto";
import { paginate, parsePagination } from "../lib/pagination";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";
import { z } from "zod";

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

const eventRsvpSchema = z.object({});

const availabilitySchema = z.object({
  skill: z.string().trim().min(1).max(80),
  weeklyHours: z.number().int().min(1).max(40),
  format: z.enum(["video", "group", "async", "onsite"]),
  bio: z.string().trim().min(10).max(2_000),
  status: z.enum(["draft", "published"]),
});

/** Alumni: load the authenticated user's mentorship availability. */
alumniDashboard.get("/mentorship/availability", async (c) => {
  const userId = c.get("authUser").id;
  const row = await c.env.DB.prepare(
    `SELECT skill, weekly_hours AS weeklyHours, format, bio, status, updated_at AS updatedAt
       FROM alu_mentor_availability WHERE user_id = ?`,
  )
    .bind(userId)
    .first();
  if (!row) throw ApiError.notFound("Mentorship availability not found.");
  return c.json(row);
});

/** Alumni: save or publish the authenticated user's mentorship availability. */
alumniDashboard.put("/mentorship/availability", async (c) => {
  const userId = c.get("authUser").id;
  const input = await parseBody(c, availabilitySchema);
  const now = isoNow();
  const existing = await c.env.DB.prepare(
    `SELECT user_id FROM alu_mentor_availability WHERE user_id = ?`,
  )
    .bind(userId)
    .first<{ user_id: string }>();
  if (existing) {
    await c.env.DB.prepare(
      `UPDATE alu_mentor_availability
          SET skill = ?, weekly_hours = ?, format = ?, bio = ?, status = ?, updated_at = ?
        WHERE user_id = ?`,
    )
      .bind(input.skill, input.weeklyHours, input.format, input.bio, input.status, now, userId)
      .run();
  } else {
    await c.env.DB.prepare(
      `INSERT INTO alu_mentor_availability
        (user_id, skill, weekly_hours, format, bio, status, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(userId, input.skill, input.weeklyHours, input.format, input.bio, input.status, now)
      .run();
  }
  return c.json({ ...input, updatedAt: now });
});

/** Alumni: request a connection with a directory member once per account. */
alumniDashboard.post("/members/:id/connect", async (c) => {
  const memberId = c.req.param("id");
  const userId = c.get("authUser").id;
  const member = await c.env.DB.prepare(`SELECT id, name FROM alu_members WHERE id = ?`)
    .bind(memberId)
    .first<{ id: string; name: string }>();
  if (!member) throw ApiError.notFound("Alumni member not found.");
  const existing = await c.env.DB.prepare(
    `SELECT id, status FROM alu_connections WHERE user_id = ? AND member_id = ?`,
  )
    .bind(userId, memberId)
    .first<{ id: string; status: string }>();
  if (existing) {
    return c.json({ ok: true, alreadyConnected: true, id: existing.id, member: member.name });
  }
  const id = crypto.randomUUID();
  await c.env.DB.prepare(
    `INSERT INTO alu_connections (id, user_id, member_id, status, created_at)
     VALUES (?, ?, ?, 'pending', ?)`,
  )
    .bind(id, userId, memberId, isoNow())
    .run();
  await c.env.DB.prepare(`UPDATE alu_members SET conn = conn + 1 WHERE id = ?`)
    .bind(memberId)
    .run();
  return c.json({ ok: true, alreadyConnected: false, id, member: member.name }, 201);
});

/** Alumni: RSVP to an event once per account. */
alumniDashboard.post("/events/:id/rsvp", async (c) => {
  const eventId = c.req.param("id");
  const userId = c.get("authUser").id;
  await parseBody(c, eventRsvpSchema);
  const event = await c.env.DB.prepare(`SELECT id, title FROM alu_events WHERE id = ?`)
    .bind(eventId)
    .first<{ id: string; title: string }>();
  if (!event) throw ApiError.notFound("Event not found.");
  const existing = await c.env.DB.prepare(
    `SELECT id FROM alu_event_rsvps WHERE event_id = ? AND user_id = ?`,
  )
    .bind(eventId, userId)
    .first<{ id: string }>();
  if (existing) return c.json({ ok: true, alreadyRsvpd: true, eventId, title: event.title });

  await c.env.DB.prepare(
    `INSERT INTO alu_event_rsvps (id, event_id, user_id, created_at) VALUES (?, ?, ?, ?)`,
  )
    .bind(crypto.randomUUID(), eventId, userId, isoNow())
    .run();
  await c.env.DB.prepare(`UPDATE alu_events SET going = going + 1 WHERE id = ?`)
    .bind(eventId)
    .run();
  return c.json({ ok: true, alreadyRsvpd: false, eventId, title: event.title }, 201);
});
