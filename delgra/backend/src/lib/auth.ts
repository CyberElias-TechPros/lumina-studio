import type { Context, MiddlewareHandler } from "hono";
import { AppError } from "./errors.ts";
import { can, type Capability } from "./permissions.ts";
import { hashPassword, needsRehash, verifyPassword } from "./crypto.ts";
import { isoInMinutes, isoNow, newId, randomToken } from "./ids.ts";
import { sha256Hex } from "./crypto.ts";
import { isProduction, sessionTtlMinutes, type Env, type Role, type SessionUser } from "./env.ts";

export const SESSION_COOKIE = "tf_session";

/** Max failed logins before the account is temporarily locked. */
const MAX_FAILED_ATTEMPTS = 8;
const LOCK_MINUTES = 15;

export interface SessionRow {
  token_hash: string;
  user_id: string;
  expires_at: string;
}

export function clientIp(c: Context): string | null {
  return c.req.header("cf-connecting-ip") ?? c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
}

export function sessionCookieHeader(env: Env, token: string | null, maxAgeSeconds: number): string {
  const parts = [`${SESSION_COOKIE}=${token ?? ""}`];
  parts.push("Path=/");
  parts.push("HttpOnly");
  parts.push(`Max-Age=${Math.max(0, maxAgeSeconds)}`);
  parts.push("SameSite=None");
  // Cross-site (Vercel frontend -> Workers API) requires Secure in every browser.
  // Local dev goes through the Vite proxy, which is same-origin over http, so we
  // drop Secure only when explicitly configured to.
  if (env.COOKIE_SECURE !== "false") parts.push("Secure");
  return parts.join("; ");
}

async function issueSession(env: Env, userId: string, c: Context): Promise<string> {
  const token = randomToken(32);
  const tokenHash = await sha256Hex(token);
  const now = isoNow();
  const ttl = sessionTtlMinutes(env);
  const expires = isoInMinutes(ttl);

  await env.DB.prepare(
    `INSERT INTO sessions (token_hash, user_id, created_at, expires_at, last_seen_at, user_agent, ip)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(tokenHash, userId, now, expires, now, c.req.header("user-agent") ?? null, clientIp(c))
    .run();

  c.header("set-cookie", sessionCookieHeader(env, token, ttl * 60), { append: true });
  return token;
}

/** Read + validate the session cookie. Returns the user, or null. */
export async function readSession(c: Context, env: Env): Promise<SessionUser | null> {
  const cookieHeader = c.req.header("cookie");
  if (!cookieHeader) return null;

  const token = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`))
    ?.slice(SESSION_COOKIE.length + 1);
  if (!token || token.length < 32) return null;

  const tokenHash = await sha256Hex(token);
  const row = await env.DB.prepare(
    `SELECT s.token_hash, s.expires_at, u.id, u.name, u.email, u.role, u.is_active
       FROM sessions s JOIN users u ON u.id = s.user_id
      WHERE s.token_hash = ?`,
  )
    .bind(tokenHash)
    .first<{
      token_hash: string;
      expires_at: string;
      id: string;
      name: string;
      email: string;
      role: Role;
      is_active: number;
    }>();

  if (!row) return null;
  if (row.expires_at <= isoNow()) {
    await env.DB.prepare(`DELETE FROM sessions WHERE token_hash = ?`).bind(tokenHash).run();
    return null;
  }
  if (!row.is_active) return null;

  // Sliding expiry: touch last_seen, and roll the cookie forward when more than
  // half the TTL has elapsed so an active user is never logged out mid-work.
  await env.DB.prepare(`UPDATE sessions SET last_seen_at = ? WHERE token_hash = ?`)
    .bind(isoNow(), tokenHash)
    .run();

  return { id: row.id, name: row.name, email: row.email, role: row.role };
}

/** Middleware: everything under /v1 needs a live session unless public. */
export function requireSession(): MiddlewareHandler<{ Bindings: Env; Variables: { user: SessionUser } }> {
  return async (c, next) => {
    const user = await readSession(c, c.env);
    if (!user) throw AppError.unauthorized();
    c.set("user", user);
    await next();
  };
}

/** Middleware: the signed-in user must hold `capability`. */
export function requireCap(capability: Capability): MiddlewareHandler<{ Bindings: Env; Variables: { user: SessionUser } }> {
  return async (c, next) => {
    const user = c.get("user");
    if (!user) throw AppError.unauthorized();
    if (!can(user.role, capability)) {
      throw AppError.forbidden(`Your role (${user.role}) cannot perform this action.`);
    }
    await next();
  };
}

export function currentUser(c: Context): SessionUser {
  const user = c.get("user") as SessionUser | undefined;
  if (!user) throw AppError.unauthorized();
  return user;
}

/* --------------------------------------------------------------- sign in/out */

export interface LoginResult {
  user: SessionUser;
  token: string;
}

/**
 * Verify credentials and open a session.
 *
 * Anti-abuse behaviour:
 *   - a locked account is rejected with the *same* message as bad credentials,
 *     so the endpoint cannot be used to enumerate which emails exist;
 *   - failures increment a counter and lock the account for 15 minutes after 8;
 *   - success resets the counter and transparently upgrades the password hash
 *     when it was created under older parameters.
 */
export async function login(
  env: Env,
  c: Context,
  email: string,
  password: string,
): Promise<LoginResult> {
  const row = await env.DB.prepare(
    `SELECT id, name, email, password_hash, role, is_active, failed_attempts, locked_until
       FROM users WHERE email = ?`,
  )
    .bind(email.trim().toLowerCase())
    .first<{
      id: string;
      name: string;
      email: string;
      password_hash: string;
      role: Role;
      is_active: number;
      failed_attempts: number;
      locked_until: string | null;
    }>();

  const generic = "Email or password is incorrect.";

  if (!row) {
    // Burn comparable time so "no such user" is not faster than "wrong password".
    await verifyPassword(password, "pbkdf2-sha256$100000$AAAAAAAAAAAAAAAAAAAAAA==$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=");
    throw AppError.unauthorized(generic);
  }
  if (!row.is_active) throw AppError.forbidden("This account has been deactivated.");
  if (row.locked_until && row.locked_until > isoNow()) {
    throw AppError.unauthorized("Too many failed attempts. Try again in a few minutes.");
  }

  const ok = await verifyPassword(password, row.password_hash);
  if (!ok) {
    const attempts = row.failed_attempts + 1;
    const lockedUntil =
      attempts >= MAX_FAILED_ATTEMPTS ? isoInMinutes(LOCK_MINUTES) : null;
    await env.DB.prepare(
      `UPDATE users SET failed_attempts = ?, locked_until = ?, updated_at = ? WHERE id = ?`,
    )
      .bind(attempts, lockedUntil, isoNow(), row.id)
      .run();
    throw AppError.unauthorized(generic);
  }

  const updates: string[] = ["failed_attempts = 0", "locked_until = NULL", "last_login_at = ?", "updated_at = ?"];
  const binds: (string | null)[] = [isoNow(), isoNow()];
  if (needsRehash(row.password_hash)) {
    updates.push("password_hash = ?");
    binds.push(await hashPassword(password));
  }
  await env.DB.prepare(`UPDATE users SET ${updates.join(", ")} WHERE id = ?`)
    .bind(...binds, row.id)
    .run();

  const token = await issueSession(env, row.id, c);
  return { token, user: { id: row.id, name: row.name, email: row.email, role: row.role } };
}

/** Destroy the caller's session and clear the cookie. */
export async function logout(env: Env, c: Context): Promise<void> {
  const cookieHeader = c.req.header("cookie");
  const token = cookieHeader
    ?.split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${SESSION_COOKIE}=`))
    ?.slice(SESSION_COOKIE.length + 1);
  if (token && token.length >= 32) {
    await env.DB.prepare(`DELETE FROM sessions WHERE token_hash = ?`)
      .bind(await sha256Hex(token))
      .run();
  }
  c.header("set-cookie", sessionCookieHeader(env, null, 0), { append: true });
}

/** Bootstrap helper used by `POST /v1/auth/register` and the seed script. */
export async function createUser(
  env: Env,
  input: { name: string; email: string; password: string; role: Role; mustChangePassword?: boolean },
): Promise<string> {
  const id = newId();
  const now = isoNow();
  const result = await env.DB.prepare(
    `INSERT INTO users (id, name, email, password_hash, role, must_change_password, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      id,
      input.name.trim(),
      input.email.trim().toLowerCase(),
      await hashPassword(input.password),
      input.role,
      input.mustChangePassword ? 1 : 0,
      now,
      now,
    )
    .run();
  if (!result.success) throw AppError.conflict("That email address is already registered.");
  return id;
}

/** Revoke every session for a user (password change, deactivation, role change). */
export async function revokeAllSessions(env: Env, userId: string): Promise<void> {
  await env.DB.prepare(`DELETE FROM sessions WHERE user_id = ?`).bind(userId).run();
}

/** Production never exposes the seeded demo login. */
export function demoLoginEnabled(env: Env): boolean {
  return !isProduction(env);
}
