import { Hono } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { parseBody } from "../lib/validate";
import { requireAuth, requireAnyRole } from "../lib/auth";
import { ApiError } from "../lib/errors";
import { isoNow, isoInDays, randomToken } from "../lib/crypto";
import { invitationTokenKey } from "../lib/invitation-token";

/** Parent invitations are bound to an administrator-selected parent account. */
const createSchema = z.object({
  studentId: z.string().trim().min(1, "Student is required.").max(200),
  guardianUserId: z.string().trim().min(1, "Select the intended parent account.").max(200),
  note: z.string().trim().max(300).optional().default(""),
  expiresInDays: z.number().int().min(1).max(365).optional().default(30),
});

interface InvitationRow {
  id: string;
  student_id: string;
  student_name: string;
  guardian_user_id: string | null;
  status: string;
  expires_at: string;
}

export const invitations = new Hono<{ Bindings: AppEnv }>();

async function findInvitation(c: { env: AppEnv }, token: string): Promise<InvitationRow | null> {
  if (!/^[0-9a-f]{48}$/.test(token)) return null;
  const key = await invitationTokenKey(token);
  return c.env.DB.prepare(
    `SELECT id, student_id, student_name, guardian_user_id, status, expires_at
       FROM parent_invitations WHERE token = ? OR (token = ? AND guardian_user_id IS NULL) LIMIT 1`,
  )
    .bind(key, token)
    .first<InvitationRow>();
}

/** Public token preview does not disclose names or private notes. */
invitations.get("/:token", async (c) => {
  const row = await findInvitation(c, c.req.param("token"));
  if (!row) throw ApiError.notFound("This invitation link is invalid.");
  const expiry = Date.parse(row.expires_at);
  const status =
    row.status === "pending" && (!Number.isFinite(expiry) || expiry <= Date.now())
      ? "expired"
      : row.status;
  c.header("Cache-Control", "no-store");
  return c.json({ status, expiresAt: row.expires_at });
});

/** Only the intended verified, active parent can claim a single-use invitation. */
invitations.post("/:token/accept", requireAuth, async (c) => {
  const user = c.get("authUser");
  const row = await findInvitation(c, c.req.param("token"));
  if (!row) throw ApiError.notFound("This invitation link is invalid.");
  if (row.student_id === user.id)
    throw ApiError.forbidden("A learner cannot accept their own guardian invitation.");
  if (!row.guardian_user_id) {
    throw new ApiError(
      409,
      "INVITATION_REISSUE_REQUIRED",
      "This invitation must be reissued to an intended parent account.",
    );
  }
  if (row.guardian_user_id !== user.id || user.roleKey !== "parent") {
    throw ApiError.forbidden("Sign in with the parent account named by the academy.");
  }
  const recipient = await c.env.DB.prepare(
    "SELECT email_verified_at FROM users WHERE id = ? AND role_key = 'parent' AND status = 'active'",
  )
    .bind(user.id)
    .first<{ email_verified_at: string | null }>();
  if (!recipient?.email_verified_at) {
    throw ApiError.forbidden(
      "Verify the email on your parent account before accepting this invitation.",
    );
  }
  const expiry = Date.parse(row.expires_at);
  if (row.status === "accepted")
    throw ApiError.conflict("This invitation has already been accepted.");
  if (row.status === "revoked") throw ApiError.forbidden("This invitation was revoked.");
  if (row.status !== "pending" || !Number.isFinite(expiry) || expiry <= Date.now()) {
    throw ApiError.conflict("This invitation has expired or is unavailable.");
  }
  const now = isoNow();
  const claimId = crypto.randomUUID();
  // A D1 batch runs as one transaction. The claim rechecks the account,
  // token and expiry in SQL before the relationship is conditionally created.
  const results = await c.env.DB.batch([
    c.env.DB.prepare(
      `UPDATE parent_invitations SET status = 'accepted', accepted_by = ?, accepted_at = ?, updated_at = ?, accepted_claim_id = ?
       WHERE id = ? AND status = 'pending' AND guardian_user_id = ? AND julianday(expires_at) > julianday(?)
         AND EXISTS (SELECT 1 FROM users WHERE id = ? AND role_key = 'parent'
           AND status = 'active' AND email_verified_at IS NOT NULL)
         AND EXISTS (SELECT 1 FROM users WHERE id = parent_invitations.student_id
           AND role_key = 'student' AND status = 'active')`,
    ).bind(user.id, now, now, claimId, row.id, user.id, now, user.id),
    c.env.DB.prepare(
      `INSERT INTO parent_students (parent_id, student_id, verified_invitation_id)
       SELECT ?, student_id, id FROM parent_invitations
       WHERE id = ? AND status = 'accepted' AND accepted_by = ? AND accepted_claim_id = ?
       ON CONFLICT (parent_id, student_id) DO UPDATE SET verified_invitation_id = excluded.verified_invitation_id`,
    ).bind(user.id, row.id, user.id, claimId),
  ]);
  if (results[0]?.meta.changes !== 1)
    throw ApiError.conflict("This invitation is no longer available.");
  return c.json({
    ok: true,
    studentId: row.student_id,
    studentName: row.student_name,
    roleUpdated: false,
    linked: (results[1]?.meta.changes ?? 0) > 0,
  });
});

/** Admin: issue an invitation after independently verifying the relationship. */
invitations.post("/", requireAuth, requireAnyRole(["admin"]), async (c) => {
  const creator = c.get("authUser");
  const body = await parseBody(c, createSchema);
  const student = await c.env.DB.prepare(
    "SELECT id, name, role_key, status FROM users WHERE id = ?",
  )
    .bind(body.studentId)
    .first<{ id: string; name: string; role_key: string; status: string }>();
  if (!student) throw ApiError.notFound("Student not found.");
  if (student.role_key !== "student" || student.status !== "active") {
    throw ApiError.validation({ studentId: ["Select an active student account."] });
  }
  const guardian = await c.env.DB.prepare(
    "SELECT id, name FROM users WHERE id = ? AND role_key = 'parent' AND status = 'active'",
  )
    .bind(body.guardianUserId)
    .first<{ id: string; name: string }>();
  if (!guardian || guardian.id === student.id)
    throw ApiError.validation({ guardianUserId: ["Select a separate active parent account."] });
  const id = crypto.randomUUID();
  const token = randomToken(24);
  const now = isoNow();
  const expiresAt = isoInDays(body.expiresInDays);
  await c.env.DB.prepare(
    `INSERT INTO parent_invitations
       (id, token, student_id, student_name, guardian_name, guardian_user_id, note, status,
        expires_at, created_by, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?)`,
  )
    .bind(
      id,
      await invitationTokenKey(token),
      student.id,
      student.name,
      guardian.name,
      guardian.id,
      body.note,
      expiresAt,
      creator.id,
      now,
      now,
    )
    .run();
  const origins = (c.env.FRONTEND_ORIGINS ?? "")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);
  const origin = c.env.APP_URL || origins[0] || "";
  const url = `${origin.replace(/\/+$/, "")}/app/parent/invitation/accept?token=${token}`;
  c.header("Cache-Control", "no-store");
  return c.json({ ok: true, token, url, expiresAt }, 201);
});
