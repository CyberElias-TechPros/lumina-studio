import { Hono } from "hono";
import { changePasswordSchema, loginSchema, registerSchema } from "../lib/validate.ts";
import {
  createUser,
  currentUser,
  demoLoginEnabled,
  login,
  logout,
  readSession,
  requireSession,
  revokeAllSessions,
} from "../lib/auth.ts";
import { AppError } from "../lib/errors.ts";
import { checkRateLimit } from "../lib/rate-limit.ts";
import { clientIp } from "../lib/auth.ts";
import { writeAudit } from "../lib/audit.ts";
import { capabilitiesFor } from "../lib/permissions.ts";
import { isoNow, newId } from "../lib/ids.ts";
import { passwordIssue } from "../lib/crypto.ts";
import type { Env, SessionUser } from "../lib/env.ts";

type AppEnv = { Bindings: Env; Variables: { user: SessionUser; requestId: string } };

const auth = new Hono<AppEnv>();

/**
 * Who am I? Also the frontend's session probe: 401 when signed out, which is a
 * normal state rather than an error, so the UI can route to /login quietly.
 */
auth.get("/session", async (c) => {
  const user = await readSession(c, c.env);
  if (!user) throw AppError.unauthorized();
  return c.json({ user: { ...user, capabilities: capabilitiesFor(user.role) } });
});

auth.post("/register", async (c) => {
  // Signup is only open while the workspace has no active user. This makes the
  // first-run experience possible without leaving a permanent public signup
  // endpoint that anyone could use to mint an owner account.
  const existing = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM users WHERE is_active = 1`).first<{
    n: number;
  }>();
  if ((existing?.n ?? 0) > 0) {
    throw AppError.forbidden("This workspace already has an owner. Ask them to invite you.");
  }

  const ip = clientIp(c) ?? "unknown";
  const rl = await checkRateLimit(c.env, "register", ip);
  if (!rl.allowed) throw AppError.rateLimited(rl.resetSeconds);

  const input = registerSchema.parse(await c.req.json());

  const issue = passwordIssue(input.password);
  if (issue) throw AppError.validation(issue, { password: issue });

  const duplicate = await c.env.DB.prepare(`SELECT id FROM users WHERE email = ?`)
    .bind(input.email)
    .first();
  if (duplicate) throw AppError.conflict("That email address is already registered.", { email: "Already registered." });

  const userId = await createUser(c.env, {
    name: input.name,
    email: input.email,
    password: input.password,
    role: "owner",
  });

  // Stamp the business name onto the profile so the first invoice is not blank.
  await c.env.DB.prepare(`UPDATE business SET name = ?, updated_at = ? WHERE id = 'business'`)
    .bind(input.businessName, isoNow())
    .run();

  await writeAudit(c.env, {
    actor: { id: userId, name: input.name, email: input.email, role: "owner" },
    action: "auth.register",
    entityType: "user",
    entityId: userId,
    summary: "Workspace owner created",
    ip,
  });

  const { user } = await login(c.env, c, input.email, input.password);
  return c.json({ user: { ...user, capabilities: capabilitiesFor(user.role) } }, 201);
});

auth.post("/login", async (c) => {
  const ip = clientIp(c) ?? "unknown";
  const rl = await checkRateLimit(c.env, "login", ip);
  if (!rl.allowed) throw AppError.rateLimited(rl.resetSeconds);

  const input = loginSchema.parse(await c.req.json());

  // Non-production convenience for tests and local demos. Gated in one place
  // and unreachable when APP_ENV=production.
  if (demoLoginEnabled(c.env) && input.email === "demo@delgra.test" && input.password === "demo-password-123") {
    const existing = await c.env.DB.prepare(`SELECT id FROM users WHERE email = ?`)
      .bind(input.email)
      .first<{ id: string }>();
    if (!existing) {
      await createUser(c.env, {
        name: "Demo Owner",
        email: input.email,
        password: input.password,
        role: "owner",
      });
    }
  }

  const { user } = await login(c.env, c, input.email, input.password);

  await writeAudit(c.env, {
    actor: user,
    action: "auth.login",
    entityType: "user",
    entityId: user.id,
    ip,
  });

  return c.json({ user: { ...user, capabilities: capabilitiesFor(user.role) } });
});

auth.post("/logout", async (c) => {
  const user = await readSession(c, c.env);
  await logout(c.env, c);
  if (user) {
    await writeAudit(c.env, {
      actor: user,
      action: "auth.logout",
      entityType: "user",
      entityId: user.id,
      ip: clientIp(c),
    });
  }
  return c.json({ ok: true });
});

/* ------------------------------------------------- authenticated self-service */

const self = new Hono<AppEnv>();
self.use("*", requireSession());

self.post("/change-password", async (c) => {
  const user = currentUser(c);
  const input = changePasswordSchema.parse(await c.req.json());

  const row = await c.env.DB.prepare(`SELECT password_hash FROM users WHERE id = ?`)
    .bind(user.id)
    .first<{ password_hash: string }>();
  if (!row) throw AppError.notFound("Account");

  // Import the verifier lazily to avoid a cycle; verifyPassword is pure.
  const { verifyPassword, hashPassword } = await import("../lib/crypto.ts");
  const ok = await verifyPassword(input.currentPassword, row.password_hash);
  if (!ok) throw AppError.unauthorized("Your current password is incorrect.");

  const issue = passwordIssue(input.newPassword);
  if (issue) throw AppError.validation(issue, { newPassword: issue });

  await c.env.DB.prepare(
    `UPDATE users SET password_hash = ?, must_change_password = 0, failed_attempts = 0, locked_until = NULL, updated_at = ? WHERE id = ?`,
  )
    .bind(await hashPassword(input.newPassword), isoNow(), user.id)
    .run();

  // Changing a password invalidates every other device.
  await revokeAllSessions(c.env, user.id);
  await writeAudit(c.env, {
    actor: user,
    action: "auth.change_password",
    entityType: "user",
    entityId: user.id,
    ip: clientIp(c),
  });

  // Open a fresh session so the caller is not immediately signed out.
  await login(c.env, c, user.email, input.newPassword);
  return c.json({ ok: true });
});

self.patch("/profile", async (c) => {
  const user = currentUser(c);
  const body = (await c.req.json()) as { name?: unknown; phone?: unknown };
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : null;
  const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 32) : null;
  if (name !== null && name.length < 2) {
    throw AppError.validation("Name must be at least 2 characters.", { name: "Too short." });
  }

  await c.env.DB.prepare(
    `UPDATE users SET
       name = COALESCE(?, name),
       phone = COALESCE(?, phone),
       updated_at = ?
     WHERE id = ?`,
  )
    .bind(name, phone, isoNow(), user.id)
    .run();

  await writeAudit(c.env, { actor: user, action: "user.update_profile", entityType: "user", entityId: user.id, ip: clientIp(c) });
  const updated = await c.env.DB.prepare(`SELECT id, name, email, role, phone FROM users WHERE id = ?`)
    .bind(user.id)
    .first();
  return c.json({ user: updated });
});

/** Active sessions for this user, so they can spot an unfamiliar device. */
self.get("/sessions", async (c) => {
  const user = currentUser(c);
  const rows = await c.env.DB.prepare(
    `SELECT created_at AS createdAt, last_seen_at AS lastSeenAt, expires_at AS expiresAt, user_agent AS userAgent, ip
       FROM sessions WHERE user_id = ? ORDER BY last_seen_at DESC LIMIT 25`,
  )
    .bind(user.id)
    .all();
  // Token hashes are never returned — not even to the owning user.
  return c.json({ sessions: rows.results });
});

self.post("/sessions/revoke-all", async (c) => {
  const user = currentUser(c);
  await revokeAllSessions(c.env, user.id);
  await writeAudit(c.env, { actor: user, action: "auth.revoke_sessions", entityType: "user", entityId: user.id, ip: clientIp(c) });
  return c.json({ ok: true });
});

auth.route("/", self);

export default auth;
export { newId };
