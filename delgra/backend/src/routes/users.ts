import { Hono } from "hono";
import { userCreateSchema, userUpdateSchema } from "../lib/validate.ts";
import { clientIp, requireCap, revokeAllSessions } from "../lib/auth.ts";
import { AppError } from "../lib/errors.ts";
import { createUser } from "../lib/auth.ts";
import { isoNow } from "../lib/ids.ts";
import { writeAudit } from "../lib/audit.ts";
import { hashPassword, passwordIssue } from "../lib/crypto.ts";
import { randomToken } from "../lib/ids.ts";
import { listMeta } from "../lib/list.ts";
import type { Env, SessionUser } from "../lib/env.ts";

type AppEnv = { Bindings: Env; Variables: { user: SessionUser; requestId: string } };

const users = new Hono<AppEnv>();

users.get("/", requireCap("read:users"), async (c) => {
  const page = Math.max(1, Number.parseInt(c.req.query("page") ?? "1", 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(c.req.query("limit") ?? "50", 10) || 50));

  const countRow = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM users`).first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT u.id, u.name, u.email, u.role, u.phone, u.is_active, u.must_change_password,
            u.last_login_at, u.created_at,
            (SELECT COUNT(*) FROM sessions s WHERE s.user_id = u.id) AS active_sessions
       FROM users u ORDER BY u.created_at ASC LIMIT ? OFFSET ?`,
  )
    .bind(limit, (page - 1) * limit)
    .all<Record<string, unknown>>();

  return c.json({
    data: rows.results.map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      role: r.role,
      phone: r.phone,
      isActive: Boolean(r.is_active),
      mustChangePassword: Boolean(r.must_change_password),
      lastLoginAt: r.last_login_at,
      createdAt: r.created_at,
      activeSessions: r.active_sessions,
    })),
    meta: listMeta(page, limit, countRow?.n ?? 0),
  });
});

users.post("/", requireCap("manage:users"), async (c) => {
  const input = userCreateSchema.parse(await c.req.json());
  const actor = c.get("user");

  // Only an owner may create another owner — otherwise a manager could mint an
  // equal-privileged account and escalate past the role model.
  if (input.role === "owner" && actor.role !== "owner") {
    throw AppError.forbidden("Only an owner can create another owner account.");
  }

  const dupe = await c.env.DB.prepare(`SELECT id FROM users WHERE email = ?`).bind(input.email).first();
  if (dupe) throw AppError.conflict("That email is already registered.", { email: "Already exists." });

  // No password supplied => generate one and require a change at first sign-in.
  // The temporary password is returned once, in this response only.
  const generated = !input.password;
  const password = input.password || `Tf-${randomToken(9)}`;
  const issue = passwordIssue(password);
  if (issue) throw AppError.validation(issue, { password: issue });

  const id = await createUser(c.env, {
    name: input.name,
    email: input.email,
    password,
    role: input.role,
    mustChangePassword: generated,
  });

  await writeAudit(c.env, {
    actor,
    action: "user.create",
    entityType: "user",
    entityId: id,
    summary: `${input.email} as ${input.role}`,
    ip: clientIp(c),
  });

  return c.json({ id, temporaryPassword: generated ? password : null, mustChangePassword: generated }, 201);
});

users.patch("/:id", requireCap("manage:users"), async (c) => {
  const id = c.req.param("id");
  const actor = c.get("user");

  const current = await c.env.DB.prepare(`SELECT id, name, email, role, is_active FROM users WHERE id = ?`)
    .bind(id)
    .first<{ id: string; name: string; email: string; role: string; is_active: number }>();
  if (!current) throw AppError.notFound("User");

  const input = userUpdateSchema.parse(await c.req.json());

  // Guard against locking everyone out of the workspace.
  const owners = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM users WHERE role = 'owner' AND is_active = 1`).first<{
    n: number;
  }>();
  const demotingOwner = current.role === "owner" && (input.role && input.role !== "owner");
  const deactivatingOwner = current.is_active === 1 && input.isActive === false;
  if ((demotingOwner || deactivatingOwner) && (owners?.n ?? 0) <= 1) {
    throw AppError.conflict("This is the last active owner. Promote another owner first.");
  }
  if (input.role === "owner" && actor.role !== "owner") {
    throw AppError.forbidden("Only an owner can grant the owner role.");
  }
  if (id === actor.id && input.isActive === false) {
    throw AppError.conflict("You cannot deactivate your own account.");
  }

  await c.env.DB.prepare(
    `UPDATE users SET
       name = COALESCE(?, name),
       role = COALESCE(?, role),
       is_active = COALESCE(?, is_active),
       updated_at = ?
     WHERE id = ?`,
  )
    .bind(
      input.name ?? null,
      input.role ?? null,
      input.isActive === undefined ? null : input.isActive ? 1 : 0,
      isoNow(),
      id,
    )
    .run();

  // A role change or deactivation must take effect on existing devices at once.
  if (input.role || input.isActive === false) {
    await revokeAllSessions(c.env, id);
  }

  await writeAudit(c.env, {
    actor,
    action: "user.update",
    entityType: "user",
    entityId: id,
    summary: [input.role ? `role → ${input.role}` : null, input.isActive === false ? "deactivated" : null]
      .filter(Boolean)
      .join(", "),
    ip: clientIp(c),
  });

  return c.json({ ok: true });
});

/** Owner-issued password reset. The new password is shown once. */
users.post("/:id/reset-password", requireCap("manage:users"), async (c) => {
  const id = c.req.param("id");
  const actor = c.get("user");

  const current = await c.env.DB.prepare(`SELECT id, name, role FROM users WHERE id = ?`)
    .bind(id)
    .first<{ id: string; name: string; role: string }>();
  if (!current) throw AppError.notFound("User");
  if (current.role === "owner" && actor.role !== "owner") {
    throw AppError.forbidden("Only an owner can reset another owner's password.");
  }

  const password = `Tf-${randomToken(9)}`;
  await c.env.DB.prepare(
    `UPDATE users SET password_hash = ?, must_change_password = 1, failed_attempts = 0,
       locked_until = NULL, updated_at = ? WHERE id = ?`,
  )
    .bind(await hashPassword(password), isoNow(), id)
    .run();

  await revokeAllSessions(c.env, id);
  await writeAudit(c.env, {
    actor,
    action: "user.reset_password",
    entityType: "user",
    entityId: id,
    summary: current.name,
    ip: clientIp(c),
  });

  return c.json({ temporaryPassword: password });
});

users.delete("/:id", requireCap("manage:users"), async (c) => {
  const id = c.req.param("id");
  const actor = c.get("user");
  if (id === actor.id) throw AppError.conflict("You cannot delete your own account.");

  const current = await c.env.DB.prepare(`SELECT id, name, role, is_active FROM users WHERE id = ?`)
    .bind(id)
    .first<{ id: string; name: string; role: string; is_active: number }>();
  if (!current) throw AppError.notFound("User");

  if (current.role === "owner") {
    const owners = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM users WHERE role = 'owner' AND is_active = 1`).first<{
      n: number;
    }>();
    if ((owners?.n ?? 0) <= 1) throw AppError.conflict("Cannot remove the last owner.");
  }

  // Deactivate rather than delete: audit rows and `created_by` references must
  // keep resolving to a real person.
  await c.env.DB.prepare(`UPDATE users SET is_active = 0, updated_at = ? WHERE id = ?`)
    .bind(isoNow(), id)
    .run();
  await revokeAllSessions(c.env, id);

  await writeAudit(c.env, {
    actor,
    action: "user.deactivate",
    entityType: "user",
    entityId: id,
    summary: current.name,
    ip: clientIp(c),
  });
  return c.json({ ok: true, deactivated: true });
});

export default users;
