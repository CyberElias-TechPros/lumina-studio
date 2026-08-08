import { Hono } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { parseBody } from "../lib/validate";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { ApiError } from "../lib/errors";
import { isoNow, isoInDays, randomToken } from "../lib/crypto";

/**
 * Parent portal invitations — token-based guardian links.
 *
 * - GET  /v1/invitations/:token  public — verify an invitation link.
 * - POST /v1/invitations/:token/accept — signed-in guardian links the student.
 * - POST /v1/invitations — admin/instructor create an invitation for a student.
 */

const INVITE_STATUSES = ["pending", "accepted", "revoked", "expired"] as const;

const createSchema = z.object({
  studentId: z.string().trim().min(1, "Student is required."),
  guardianName: z.string().trim().min(1, "Guardian name is required."),
  note: z.string().trim().max(300).optional().default(""),
  expiresInDays: z.number().int().min(1).max(365).optional().default(30),
});

interface InvitationRow {
  id: string;
  token: string;
  student_id: string;
  student_name: string;
  guardian_name: string;
  note: string;
  status: string;
  accepted_by: string | null;
  accepted_at: string | null;
  expires_at: string;
  created_by: string | null;
  created_at: string;
}

export const invitations = new Hono<{ Bindings: AppEnv }>();

async function findInvitation(c: { env: AppEnv }, token: string): Promise<InvitationRow | null> {
  return c.env.DB.prepare(
    `SELECT id, token, student_id, student_name, guardian_name, note, status,
            accepted_by, accepted_at, expires_at, created_by, created_at
       FROM parent_invitations WHERE token = ?`,
  )
    .bind(token)
    .first<InvitationRow>();
}

/** Public — verify an invitation link without auth. */
invitations.get("/:token", async (c) => {
  const row = await findInvitation(c, c.req.param("token"));
  if (!row) throw ApiError.notFound("This invitation link is invalid.");

  const now = Date.now();
  const expiresAt = new Date(row.expires_at).getTime();
  const status =
    row.status === "pending" && now > expiresAt ? "expired" : (row.status as (typeof INVITE_STATUSES)[number]);

  return c.json({
    status,
    studentName: row.student_name,
    guardianName: row.guardian_name,
    note: row.note,
    expiresAt: row.expires_at,
  });
});

/** Signed-in guardian accepts the invitation and links the student. */
invitations.post("/:token/accept", requireAuth, async (c) => {
  const user = c.get("authUser");
  const row = await findInvitation(c, c.req.param("token"));
  if (!row) throw ApiError.notFound("This invitation link is invalid.");

  const now = Date.now();
  if (row.status === "accepted") throw ApiError.conflict("This invitation has already been accepted.");
  if (row.status === "revoked") throw ApiError.forbidden("This invitation was revoked.");
  if (row.status === "expired" || (row.status === "pending" && now > new Date(row.expires_at).getTime())) {
    throw ApiError.conflict("This invitation has expired.");
  }

  const linked = await c.env.DB.prepare(
    `INSERT OR IGNORE INTO parent_students (parent_id, student_id) VALUES (?, ?)`,
  )
    .bind(user.id, row.student_id)
    .run();

  let roleUpdated = false;
  if (user.roleKey === "student") {
    await c.env.DB.prepare(`UPDATE users SET role_key = 'parent', updated_at = ? WHERE id = ?`)
      .bind(isoNow(), user.id)
      .run();
    roleUpdated = true;
  }

  const nowIso = isoNow();
  await c.env.DB.prepare(
    `UPDATE parent_invitations
        SET status = 'accepted', accepted_by = ?, accepted_at = ?, updated_at = ?
      WHERE id = ?`,
  )
    .bind(user.id, nowIso, nowIso, row.id)
    .run();

  return c.json({
    ok: true,
    studentId: row.student_id,
    studentName: row.student_name,
    roleUpdated,
    linked: linked.meta.changes > 0,
  });
});

/** Admin/instructor — create an invitation for a student. */
invitations.post("/", requireAuth, requireAnyRole(["admin", "instructor"]), async (c) => {
  const creator = c.get("authUser");
  const body = await parseBody(c, createSchema);

  const student = await c.env.DB.prepare(`SELECT id, name, role_key FROM users WHERE id = ?`)
    .bind(body.studentId)
    .first<{ id: string; name: string; role_key: string }>();
  if (!student) throw ApiError.notFound("Student not found.");
  if (student.role_key === "admin" || student.role_key === "instructor") {
    throw ApiError.validation({ studentId: ["That user is not a student."] });
  }

  const id = crypto.randomUUID();
  const token = randomToken(24);
  const now = isoNow();
  const expiresAt = isoInDays(body.expiresInDays);

  await c.env.DB.prepare(
    `INSERT INTO parent_invitations
       (id, token, student_id, student_name, guardian_name, note, status,
        expires_at, created_by, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?)`,
  )
    .bind(id, token, student.id, student.name, body.guardianName, body.note, expiresAt, creator.id, now, now)
    .run();

  const origins = (c.env.FRONTEND_ORIGINS ?? "").split(",").map((s: string) => s.trim()).filter(Boolean);
  const origin = origins[0] ?? "";
  const url = `${origin}/app/parent/invitation/accept?token=${token}`;

  return c.json({ ok: true, token, url, expiresAt }, 201);
});
