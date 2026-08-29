import { Hono } from "hono";
import type { Context } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";
import {
  requireAuth,
  sessionResponse,
  setSessionCookie,
  clearSessionCookie,
  type AuthUser,
} from "../lib/auth";
import { permissionsForRole } from "../lib/permissions";
import { sendEmail, appUrl } from "../lib/email";
import { rateLimit, hashIdentifier } from "../lib/rate-limit";
import {
  generateRecoveryCode,
  generateTotpSecret,
  hashPassword,
  isoInDays,
  isoInMinutes,
  isoNow,
  randomToken,
  sha256Hex,
  timingSafeEqualHex,
  verifyPassword,
  verifyTotpCode,
} from "../lib/crypto";
import { normalizeEmail } from "../db/client";

const MAGIC_LINK_TTL_MINUTES = 15;
const SESSION_TTL_DAYS = 7;
const RESET_TTL_MINUTES = 30;
const PASSWORD_MIN = 8;

const magicLinkSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  remember: z.boolean().optional().default(true),
});

const signUpSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(PASSWORD_MIN, `Password must be at least ${PASSWORD_MIN} characters.`),
});

const resetPasswordSchema = z.object({
  token: z.string().min(16, "Reset token is required."),
  password: z.string().min(PASSWORD_MIN, `Password must be at least ${PASSWORD_MIN} characters.`),
});

const mfaCodeSchema = z.object({
  code: z.string().trim().min(6, "Enter your 6-digit code.").max(32, "Invalid code."),
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

function deviceLabelFromUserAgent(ua: string | null): string {
  if (!ua) return "Unknown device";
  const browser = /edg\//i.test(ua)
    ? "Edge"
    : /firefox\//i.test(ua)
      ? "Firefox"
      : /chrome\//i.test(ua)
        ? "Chrome"
        : /safari\//i.test(ua)
          ? "Safari"
          : /curl|wget|fetch/i.test(ua)
            ? "CLI"
            : "Browser";
  const os = /windows/i.test(ua)
    ? "Windows"
    : /android/i.test(ua)
      ? "Android"
      : /iphone|ipad/i.test(ua)
        ? "iOS"
        : /mac os/i.test(ua)
          ? "macOS"
          : /linux/i.test(ua)
            ? "Linux"
            : "OS";
  return `${browser} on ${os}`;
}

function clientIp(c: Context): string {
  return (
    c.req.header("CF-Connecting-IP") ??
    c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

interface SessionUserRow {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  role_key: string;
}

async function createSession(
  c: Context,
  user: SessionUserRow,
  opts: { mfaPending?: boolean; rawToken?: string; remember?: boolean } = {},
): Promise<{ token: string; expiresAt: string; user: AuthUser }> {
  const token = opts.rawToken ?? randomToken(32);
  const tokenHash = await sha256Hex(token);
  const now = isoNow();
  const expiresAt = opts.remember === false ? isoInMinutes(60 * 24) : isoInDays(SESSION_TTL_DAYS);
  await c.env.DB.prepare(
    `INSERT INTO sessions (id, user_id, token_hash, created_at, expires_at, device_label, created_ip, mfa_pending)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      crypto.randomUUID(),
      user.id,
      tokenHash,
      now,
      expiresAt,
      deviceLabelFromUserAgent(c.req.header("user-agent") ?? null),
      clientIp(c),
      opts.mfaPending ? 1 : 0,
    )
    .run();
  setSessionCookie(c, token, expiresAt);
  return {
    token,
    expiresAt,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatar_url ?? undefined,
      roleKey: user.role_key,
      permissions: permissionsForRole(user.role_key),
    },
  };
}

export const auth = new Hono<{ Bindings: AppEnv }>();

/* ---------------- Magic link ---------------- */

auth.post("/magic-link", async (c) => {
  const email = normalizeEmail((await parseBody(c, magicLinkSchema)).email);
  const idHash = await hashIdentifier(email);
  await rateLimit(c.env.RATE_LIMIT, "magic-link", idHash, { limit: 5, windowSeconds: 600 });

  const token = randomToken(32);
  const tokenHash = await sha256Hex(token);
  await c.env.DB.prepare(
    `INSERT INTO magic_links (id, email, token_hash, kind, created_at, expires_at)
     VALUES (?, ?, ?, 'magic-link', ?, ?)`,
  )
    .bind(crypto.randomUUID(), email, tokenHash, isoNow(), isoInMinutes(MAGIC_LINK_TTL_MINUTES))
    .run();

  const link = appUrl(c, `/auth/magic-link?token=${token}`);
  const sent = await sendEmail(c, {
    to: email,
    subject: "Your sign-in link for CEA",
    html: `<p>Click to sign in to your CEA account:</p>
<p><a href="${link}">Sign in</a></p>
<p>This link expires in ${MAGIC_LINK_TTL_MINUTES} minutes and can only be used once.</p>`,
  });

  const body: Record<string, unknown> = { ok: true, sent: sent.sent };
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
    `SELECT id, email, kind, expires_at, consumed_at FROM magic_links WHERE token_hash = ?`,
  )
    .bind(tokenHash)
    .first<{
      id: string;
      email: string;
      kind: string;
      expires_at: string;
      consumed_at: string | null;
    }>();

  if (!link || link.consumed_at || link.expires_at <= now) {
    throw new ApiError(400, "INVALID_MAGIC_TOKEN", "This sign-in link is invalid or has expired.");
  }
  if (link.kind !== "magic-link") {
    throw new ApiError(400, "INVALID_MAGIC_TOKEN", "This link type cannot be used to sign in.");
  }

  // Consume atomically so two requests using the same link cannot both create
  // sessions. D1's affected-row count is the single-use guard.
  const consumed = await c.env.DB.prepare(
    `UPDATE magic_links SET consumed_at = ?
      WHERE id = ? AND consumed_at IS NULL AND expires_at > ?`,
  )
    .bind(now, link.id, now)
    .run();
  if (consumed.meta.changes !== 1) {
    throw new ApiError(400, "INVALID_MAGIC_TOKEN", "This sign-in link is invalid or has expired.");
  }

  const email = normalizeEmail(link.email);
  const existing = await c.env.DB.prepare(
    `SELECT id, name, email, avatar_url, role_key, status, email_verified_at, mfa_enabled FROM users WHERE email = ?`,
  )
    .bind(email)
    .first<SessionUserRow & {
      status: string;
      email_verified_at: string | null;
      mfa_enabled: number;
    }>();

  if (existing && existing.status !== "active") {
    throw new ApiError(403, "FORBIDDEN", "This account has been suspended.");
  }

  const userId = existing?.id ?? crypto.randomUUID();
  if (!existing) {
    await c.env.DB.prepare(
      `INSERT INTO users (id, name, email, role_key, status, email_verified_at, created_at, updated_at)
       VALUES (?, ?, ?, 'student', 'active', ?, ?, ?)`,
    )
      .bind(userId, nameFromEmail(email), email, now, now, now)
      .run();
  } else if (!existing.email_verified_at) {
    await c.env.DB.prepare(`UPDATE users SET email_verified_at = ?, updated_at = ? WHERE id = ?`)
      .bind(now, now, userId)
      .run();
  }

  const {
    token: sessionToken,
    expiresAt,
    user,
  } = await createSession(c, {
    id: userId,
    name: existing?.name ?? nameFromEmail(email),
    email,
    avatar_url: existing?.avatar_url ?? null,
    role_key: existing?.role_key ?? "student",
  }, {
    mfaPending: existing?.mfa_enabled === 1,
  });
  if (existing?.mfa_enabled === 1) {
    return c.json({ mfaRequired: true, expiresAt });
  }
  return c.json(sessionResponse(user, expiresAt));
});

/* ---------------- Session ---------------- */

auth.get("/session", requireAuth, (c) => {
  const user = c.get("authUser");
  return c.json(sessionResponse(user, c.get("authSession").expiresAt));
});

auth.post("/refresh", requireAuth, async (c) => {
  const user = c.get("authUser");
  const session = c.get("authSession");
  const expiresAt = isoInDays(SESSION_TTL_DAYS);
  const nextToken = randomToken(32);
  const nextTokenHash = await sha256Hex(nextToken);
  await c.env.DB.prepare(
    `UPDATE sessions SET token_hash = ?, expires_at = ? WHERE id = ? AND revoked_at IS NULL`,
  )
    .bind(nextTokenHash, expiresAt, session.id)
    .run();
  setSessionCookie(c, nextToken, expiresAt);
  return c.json(sessionResponse(user, expiresAt));
});

auth.post("/sign-out", requireAuth, async (c) => {
  await c.env.DB.prepare(`UPDATE sessions SET revoked_at = ? WHERE id = ?`)
    .bind(isoNow(), c.get("authSession").id)
    .run();
  clearSessionCookie(c);
  return c.json({ ok: true });
});

/* ---------------- Password auth ---------------- */

auth.post("/sign-up", async (c) => {
  const body = await parseBody(c, signUpSchema);
  const email = normalizeEmail(body.email);
  const ipHash = await hashIdentifier(clientIp(c));
  await rateLimit(c.env.RATE_LIMIT, "sign-up", ipHash, { limit: 10, windowSeconds: 3600 });

  const existing = await c.env.DB.prepare(`SELECT id FROM users WHERE email = ?`)
    .bind(email)
    .first<{ id: string }>();
  if (existing) {
    throw ApiError.conflict("An account with this email already exists. Sign in instead.");
  }

  const now = isoNow();
  const userId = crypto.randomUUID();
  const passwordHash = await hashPassword(body.password);
  await c.env.DB.prepare(
    `INSERT INTO users (id, name, email, password_hash, role_key, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, 'student', 'active', ?, ?)`,
  )
    .bind(userId, body.name, email, passwordHash, now, now)
    .run();

  const { expiresAt, user } = await createSession(c, {
    id: userId,
    name: body.name,
    email,
    avatar_url: null,
    role_key: "student",
  });
  return c.json(sessionResponse(user, expiresAt), 201);
});

auth.post("/sign-in", async (c) => {
  const body = await parseBody(c, signInSchema);
  const email = normalizeEmail(body.email);
  const idHash = await hashIdentifier(`${email}|${clientIp(c)}`);
  await rateLimit(c.env.RATE_LIMIT, "sign-in", idHash, { limit: 10, windowSeconds: 900 });

  const row = await c.env.DB.prepare(
    `SELECT id, name, email, avatar_url, role_key, password_hash, status, mfa_enabled
       FROM users WHERE email = ?`,
  )
    .bind(email)
    .first<{
      id: string;
      name: string;
      email: string;
      avatar_url: string | null;
      role_key: string;
      password_hash: string | null;
      status: string;
      mfa_enabled: number;
    }>();

  const invalid = new ApiError(401, "UNAUTHORIZED", "Incorrect email or password.");
  if (!row || !row.password_hash || row.status !== "active") throw invalid;
  if (!(await verifyPassword(body.password, row.password_hash))) throw invalid;

  const { expiresAt, user } = await createSession(c, row, {
    mfaPending: row.mfa_enabled === 1,
    remember: body.remember,
  });
  if (row.mfa_enabled === 1) {
    return c.json({ mfaRequired: true, expiresAt });
  }
  return c.json(sessionResponse(user, expiresAt));
});

/* ---------------- Password reset ---------------- */

auth.post("/forgot-password", async (c) => {
  const email = normalizeEmail((await parseBody(c, magicLinkSchema)).email);
  const idHash = await hashIdentifier(email);
  await rateLimit(c.env.RATE_LIMIT, "forgot-password", idHash, { limit: 3, windowSeconds: 600 });

  const token = randomToken(32);
  const tokenHash = await sha256Hex(token);
  await c.env.DB.prepare(
    `INSERT INTO magic_links (id, email, token_hash, kind, created_at, expires_at)
     VALUES (?, ?, ?, 'reset', ?, ?)`,
  )
    .bind(crypto.randomUUID(), email, tokenHash, isoNow(), isoInMinutes(RESET_TTL_MINUTES))
    .run();

  const link = appUrl(c, `/auth/reset-password?token=${token}`);
  const sent = await sendEmail(c, {
    to: email,
    subject: "Reset your CEA password",
    html: `<p>Click to reset your CEA password:</p>
<p><a href="${link}">Reset password</a></p>
<p>This link expires in ${RESET_TTL_MINUTES} minutes and can only be used once.</p>`,
  });

  const body: Record<string, unknown> = { ok: true, sent: sent.sent };
  if (c.env.APP_ENV !== "production") {
    body.devToken = token;
  }
  return c.json(body, 201);
});

auth.post("/reset-password", async (c) => {
  const { token, password } = await parseBody(c, resetPasswordSchema);
  const tokenHash = await sha256Hex(token);
  const tokenHashId = await hashIdentifier(token);
  await rateLimit(c.env.RATE_LIMIT, "reset-password", tokenHashId, {
    limit: 5,
    windowSeconds: 600,
  });

  const link = await c.env.DB.prepare(
    `SELECT id, email, expires_at, consumed_at FROM magic_links WHERE token_hash = ? AND kind = 'reset'`,
  )
    .bind(tokenHash)
    .first<{ id: string; email: string; expires_at: string; consumed_at: string | null }>();

  if (!link || link.consumed_at || link.expires_at <= isoNow()) {
    throw new ApiError(400, "INVALID_MAGIC_TOKEN", "This reset link is invalid or has expired.");
  }

  const email = normalizeEmail(link.email);
  const user = await c.env.DB.prepare(`SELECT id FROM users WHERE email = ?`)
    .bind(email)
    .first<{ id: string }>();
  if (!user) throw ApiError.notFound("No account found for this email.");

  const now = isoNow();
  // Consume before changing the password. This closes the check-then-use race
  // where concurrent requests could both redeem a reset token.
  const consumed = await c.env.DB.prepare(
    `UPDATE magic_links SET consumed_at = ?
      WHERE id = ? AND consumed_at IS NULL AND expires_at > ?`,
  )
    .bind(now, link.id, now)
    .run();
  if (consumed.meta.changes !== 1) {
    throw new ApiError(400, "INVALID_MAGIC_TOKEN", "This reset link is invalid or has expired.");
  }

  const passwordHash = await hashPassword(password);
  await c.env.DB.prepare(`UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?`)
    .bind(passwordHash, now, user.id)
    .run();
  await c.env.DB.prepare(
    `UPDATE sessions SET revoked_at = ? WHERE user_id = ? AND revoked_at IS NULL`,
  )
    .bind(now, user.id)
    .run();
  return c.json({ ok: true });
});

/* ---------------- MFA ---------------- */

auth.post("/mfa/setup", requireAuth, async (c) => {
  const user = c.get("authUser");
  const secret = generateTotpSecret();
  const codes = Array.from({ length: 8 }, generateRecoveryCode);
  const hashed = await Promise.all(codes.map((code) => sha256Hex(code)));
  await c.env.DB.prepare(
    `UPDATE users SET mfa_secret = ?, recovery_codes = ?, updated_at = ? WHERE id = ?`,
  )
    .bind(secret, JSON.stringify(hashed), isoNow(), user.id)
    .run();

  const otpauth = `otpauth://totp/CEA:${encodeURIComponent(user.email)}?secret=${secret}&issuer=CEA&digits=6&period=30`;
  return c.json({ secret, otpauth, recoveryCodes: codes, enabled: false });
});

auth.post("/mfa/enable", requireAuth, async (c) => {
  const user = c.get("authUser");
  const { code } = await parseBody(c, mfaCodeSchema);
  const row = await c.env.DB.prepare(`SELECT mfa_secret FROM users WHERE id = ?`)
    .bind(user.id)
    .first<{ mfa_secret: string | null }>();
  if (!row?.mfa_secret) throw ApiError.conflict("Run MFA setup first.");
  if (!(await verifyTotpCode(row.mfa_secret, code))) {
    throw ApiError.validation({ code: ["That code is invalid or expired."] });
  }
  await c.env.DB.prepare(`UPDATE users SET mfa_enabled = 1, updated_at = ? WHERE id = ?`)
    .bind(isoNow(), user.id)
    .run();
  return c.json({ ok: true, enabled: true });
});

auth.post("/mfa/disable", requireAuth, async (c) => {
  const user = c.get("authUser");
  const { code } = await parseBody(c, mfaCodeSchema);
  const row = await c.env.DB.prepare(`SELECT mfa_secret FROM users WHERE id = ?`)
    .bind(user.id)
    .first<{ mfa_secret: string | null }>();
  if (!row?.mfa_secret) throw ApiError.conflict("MFA is not configured.");
  if (!(await verifyTotpCode(row.mfa_secret, code))) {
    throw ApiError.validation({ code: ["That code is invalid or expired."] });
  }
  await c.env.DB.prepare(
    `UPDATE users SET mfa_secret = NULL, mfa_enabled = 0, recovery_codes = '[]', updated_at = ? WHERE id = ?`,
  )
    .bind(isoNow(), user.id)
    .run();
  return c.json({ ok: true, enabled: false });
});

auth.post("/mfa/verify", async (c) => {
  const { code } = await parseBody(c, mfaCodeSchema);
  const token = getSessionTokenRaw(c);
  if (!token) throw ApiError.unauthorized();
  const tokenHash = await sha256Hex(token);
  const now = isoNow();

  const row = await c.env.DB.prepare(
    `SELECT s.id AS session_id, s.expires_at, s.revoked_at, s.mfa_pending,
            u.id AS user_id, u.name, u.email, u.avatar_url, u.role_key, u.status,
            u.mfa_secret, u.recovery_codes
       FROM sessions s JOIN users u ON u.id = s.user_id
      WHERE s.token_hash = ?`,
  )
    .bind(tokenHash)
    .first<{
      session_id: string;
      expires_at: string;
      revoked_at: string | null;
      mfa_pending: number;
      user_id: string;
      name: string;
      email: string;
      avatar_url: string | null;
      role_key: string;
      status: string;
      mfa_secret: string | null;
      recovery_codes: string;
    }>();

  if (!row || row.revoked_at || row.status !== "active" || row.expires_at <= now) {
    throw ApiError.unauthorized();
  }
  if (!row.mfa_secret || row.mfa_pending !== 1) {
    throw ApiError.conflict("No pending MFA challenge for this session.");
  }

  await rateLimit(c.env.RATE_LIMIT, "mfa-verify", await hashIdentifier(token), {
    limit: 10,
    windowSeconds: 900,
  });

  let verified = await verifyTotpCode(row.mfa_secret, code);
  if (!verified) {
    let recoveryCodes: string[] = [];
    try {
      const parsed = JSON.parse(row.recovery_codes);
      if (Array.isArray(parsed) && parsed.every((value) => typeof value === "string")) {
        recoveryCodes = parsed;
      }
    } catch {
      // Treat malformed recovery-code storage as no available recovery codes,
      // rather than turning an invalid user record into a server error.
    }
    const codeHash = await sha256Hex(code.trim());
    const idx = recoveryCodes.findIndex((h) => timingSafeEqualHex(h, codeHash));
    if (idx >= 0) {
      verified = true;
      recoveryCodes.splice(idx, 1);
      await c.env.DB.prepare(`UPDATE users SET recovery_codes = ? WHERE id = ?`)
        .bind(JSON.stringify(recoveryCodes), row.user_id)
        .run();
    }
  }
  if (!verified) {
    throw ApiError.validation({ code: ["That code is invalid or expired."] });
  }

  const expiresAt = isoInDays(SESSION_TTL_DAYS);
  await c.env.DB.prepare(
    `UPDATE sessions SET mfa_pending = 0, expires_at = ? WHERE id = ? AND revoked_at IS NULL`,
  )
    .bind(expiresAt, row.session_id)
    .run();
  return c.json(
    sessionResponse(
      {
        id: row.user_id,
        name: row.name,
        email: row.email,
        avatarUrl: row.avatar_url ?? undefined,
        roleKey: row.role_key,
        permissions: permissionsForRole(row.role_key),
      },
      expiresAt,
    ),
  );
});

/* ---------------- Devices ---------------- */

auth.get("/devices", requireAuth, async (c) => {
  const user = c.get("authUser");
  const current = c.get("authSession").id;
  const now = isoNow();
  const rows = await c.env.DB.prepare(
    `SELECT id, device_label, created_ip, created_at, expires_at, revoked_at, mfa_pending
       FROM sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT 50`,
  )
    .bind(user.id)
    .all<{
      id: string;
      device_label: string;
      created_ip: string;
      created_at: string;
      expires_at: string;
      revoked_at: string | null;
      mfa_pending: number;
    }>();
  const items = rows.results.map((r) => ({
    id: r.id,
    deviceLabel: r.device_label,
    ip: r.created_ip,
    createdAt: r.created_at,
    expiresAt: r.expires_at,
    active: !r.revoked_at && r.expires_at > now,
    mfaPending: r.mfa_pending === 1,
    current: r.id === current,
  }));
  return c.json({ items, total: items.length });
});

auth.post("/devices/:id/revoke", requireAuth, async (c) => {
  const user = c.get("authUser");
  const current = c.get("authSession").id;
  const id = c.req.param("id");
  const row = await c.env.DB.prepare(`SELECT id FROM sessions WHERE id = ? AND user_id = ?`)
    .bind(id, user.id)
    .first<{ id: string }>();
  if (!row) throw ApiError.notFound("Device not found.");
  if (id === current) throw ApiError.conflict("You cannot revoke the current session.");
  await c.env.DB.prepare(`UPDATE sessions SET revoked_at = ? WHERE id = ?`)
    .bind(isoNow(), id)
    .run();
  return c.json({ ok: true });
});

function getSessionTokenRaw(c: {
  req: { header: (name: string) => string | undefined };
}): string | null {
  const cookie = c.req.header("cookie");
  if (cookie) {
    for (const part of cookie.split(";")) {
      const [name, ...rest] = part.trim().split("=");
      if (name === "cea_session") return rest.join("=");
    }
  }
  const header = c.req.header("authorization");
  if (header?.startsWith("Bearer ")) return header.slice(7).trim() || null;
  return null;
}
