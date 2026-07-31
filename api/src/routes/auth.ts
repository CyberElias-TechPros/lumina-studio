import { Hono } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";
import { requireAuth, sessionResponse } from "../lib/auth";
import { permissionsForRole } from "../lib/permissions";
import { isoInDays, isoInMinutes, isoNow, randomToken, sha256Hex } from "../lib/crypto";
import { normalizeEmail } from "../db/client";

const MAGIC_LINK_TTL_MINUTES = 15;
const SESSION_TTL_DAYS = 7;

const magicLinkSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  remember: z.boolean().optional().default(true),
});

const signUpSchema = signInSchema.extend({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  roleKey: z.string().trim().optional().default("student"),
});

function nameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "Student";
  return local
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export const auth = new Hono<{ Bindings: AppEnv }>();

auth.post("/magic-link", async (c) => {
  const { email } = await parseBody(c, magicLinkSchema);
  const normalized = normalizeEmail(email);
  const token = randomToken(32);
  const tokenHash = await sha256Hex(token);

  await c.env.DB.prepare(
    `INSERT INTO magic_links (id, email, token_hash, created_at, expires_at)
     VALUES (?, ?, ?, ?, ?)`,
  )
    .bind(crypto.randomUUID(), normalized, tokenHash, isoNow(), isoInMinutes(MAGIC_LINK_TTL_MINUTES))
    .run();

  const body: Record<string, unknown> = { ok: true };
  if (c.env.APP_ENV !== "production") {
    body.devToken = token;
  }
  return c.json(body, 201);
});

auth.get("/magic-link/verify", async (c) => {
  const token = c.req.query("token");
  if (!token) throw ApiError.validation({ token: ["Missing magic link token."] });
  const tokenHash = await sha256Hex(token);
  const now = isoNow();

  const link = await c.env.DB.prepare(
    `SELECT id, email, expires_at, consumed_at FROM magic_links WHERE token_hash = ?`,
  )
    .bind(tokenHash)
    .first<{ id: string; email: string; expires_at: string; consumed_at: string | null }>();

  if (!link || link.consumed_at || link.expires_at <= now) {
    throw new ApiError(400, "INVALID_MAGIC_TOKEN", "This sign-in link is invalid or has expired.");
  }

  await c.env.DB.prepare(`UPDATE magic_links SET consumed_at = ? WHERE id = ?`)
    .bind(now, link.id)
    .run();

  const email = normalizeEmail(link.email);
  const existing = await c.env.DB.prepare(`SELECT id, name, email, avatar_url, role_key FROM users WHERE email = ?`)
    .bind(email)
    .first<{ id: string; name: string; email: string; avatar_url: string | null; role_key: string }>();

  const userId = existing?.id ?? crypto.randomUUID();
  if (!existing) {
    await c.env.DB.prepare(
      `INSERT INTO users (id, name, email, role_key, status, created_at, updated_at)
       VALUES (?, ?, ?, 'student', 'active', ?, ?)`,
    )
      .bind(userId, nameFromEmail(email), email, now, now)
      .run();
  }

  const sessionId = crypto.randomUUID();
  const expiresAt = isoInDays(SESSION_TTL_DAYS);
  await c.env.DB.prepare(
    `INSERT INTO sessions (id, user_id, token_hash, created_at, expires_at) VALUES (?, ?, ?, ?, ?)`,
  )
    .bind(sessionId, userId, tokenHash, now, expiresAt)
    .run();

  return c.json({
    ...sessionResponse(
      {
        id: userId,
        name: existing?.name ?? nameFromEmail(email),
        email,
        avatarUrl: existing?.avatar_url ?? undefined,
        roleKey: existing?.role_key ?? "student",
        permissions: permissionsForRole(existing?.role_key ?? "student"),
      },
      expiresAt,
    ),
    token,
  });
});

auth.get("/session", requireAuth, (c) => {
  const user = c.get("authUser");
  return c.json(sessionResponse(user, c.get("authSession").expiresAt));
});

auth.post("/refresh", requireAuth, async (c) => {
  const user = c.get("authUser");
  const session = c.get("authSession");
  const expiresAt = isoInDays(SESSION_TTL_DAYS);
  await c.env.DB.prepare(`UPDATE sessions SET expires_at = ? WHERE id = ? AND revoked_at IS NULL`)
    .bind(expiresAt, session.id)
    .run();
  return c.json(sessionResponse(user, expiresAt));
});

auth.post("/sign-out", requireAuth, async (c) => {
  await c.env.DB.prepare(`UPDATE sessions SET revoked_at = ? WHERE id = ?`)
    .bind(isoNow(), c.get("authSession").id)
    .run();
  return c.json({ ok: true });
});

auth.post("/sign-in", async (c) => {
  await parseBody(c, signInSchema);
  throw new ApiError(
    501,
    "PASSWORD_NOT_ENABLED",
    "Password sign-in is not enabled yet — use the magic link flow.",
  );
});

auth.post("/sign-up", async (c) => {
  await parseBody(c, signUpSchema);
  throw new ApiError(
    501,
    "PASSWORD_NOT_ENABLED",
    "Password accounts are not enabled yet — use the magic link flow.",
  );
});
