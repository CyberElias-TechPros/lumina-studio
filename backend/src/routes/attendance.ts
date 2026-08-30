import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../types";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { ApiError } from "../lib/errors";
import { isoNow, sha256Hex } from "../lib/crypto";
import { parseBody } from "../lib/validate";

const attendance = new Hono<{ Bindings: AppEnv }>();
const requireStudent = requireAnyRole(["student"]);
const requireInstructorOrAdmin = requireAnyRole(["instructor", "admin"]);

attendance.use("*", requireAuth);

const createSessionSchema = z.object({
  course: z.string().trim().min(1, "Course is required.").max(160),
  durationMinutes: z.number().int().min(1).max(120).default(15),
});

const checkInSchema = z.object({
  sessionCode: z.string().trim().min(6, "Enter the class code.").max(80),
});

/** Instructor/admin: create a short-lived class code for student check-in. */
attendance.post("/sessions", requireInstructorOrAdmin, async (c) => {
  const body = await parseBody(c, createSessionSchema);
  const startsAt = isoNow();
  const closesAt = new Date(Date.now() + body.durationMinutes * 60_000).toISOString();
  const code = crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
  const id = `attendance-session-${crypto.randomUUID()}`;

  await c.env.DB.prepare(
    `INSERT INTO attendance_sessions
      (id, course, code_hash, starts_at, closes_at, created_by)
     VALUES (?, ?, ?, ?, ?, ?)`,
  )
    .bind(id, body.course, await sha256Hex(code), startsAt, closesAt, c.get("authUser").id)
    .run();

  return c.json({ id, course: body.course, code, startsAt, closesAt }, 201);
});

/** Student: record one present attendance entry for an active class code. */
attendance.post("/check-in", requireStudent, async (c) => {
  const body = await parseBody(c, checkInSchema);
  const now = isoNow();
  const session = await c.env.DB.prepare(
    `SELECT id, course, starts_at, closes_at
       FROM attendance_sessions
      WHERE code_hash = ? AND starts_at <= ? AND closes_at >= ?`,
  )
    .bind(await sha256Hex(body.sessionCode.toUpperCase()), now, now)
    .first<{ id: string; course: string; starts_at: string; closes_at: string }>();
  if (!session) {
    throw ApiError.validation({ sessionCode: ["That class code is invalid or has expired."] });
  }

  const userId = c.get("authUser").id;
  const existing = await c.env.DB.prepare(
    `SELECT a.id, a.date, a.status, a.note
       FROM attendance_checkins c
       JOIN attendance a ON a.id = c.attendance_id
      WHERE c.session_id = ? AND c.user_id = ?`,
  )
    .bind(session.id, userId)
    .first<{ id: string; date: string; status: string; note: string }>();
  if (existing) {
    return c.json({
      ok: true,
      alreadyCheckedIn: true,
      attendance: existing,
      course: session.course,
      closesAt: session.closes_at,
    });
  }

  const attendanceId = `attendance-${crypto.randomUUID()}`;
  const date = session.starts_at.slice(0, 10);
  await c.env.DB.prepare(
    `INSERT INTO attendance (id, user_id, date, status, note) VALUES (?, ?, ?, 'present', ?)`,
  )
    .bind(attendanceId, userId, date, `QR check-in · ${session.course}`)
    .run();
  await c.env.DB.prepare(
    `INSERT INTO attendance_checkins (session_id, user_id, attendance_id, checked_in_at)
     VALUES (?, ?, ?, ?)`,
  )
    .bind(session.id, userId, attendanceId, now)
    .run();

  return c.json(
    {
      ok: true,
      alreadyCheckedIn: false,
      attendance: {
        id: attendanceId,
        date,
        status: "present",
        note: `QR check-in · ${session.course}`,
      },
      course: session.course,
      closesAt: session.closes_at,
    },
    201,
  );
});

export { attendance };
