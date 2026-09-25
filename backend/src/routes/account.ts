/**
 * Self-service account management — available to every signed-in user,
 * regardless of role.
 *
 *   GET    /v1/account                       profile + security summary
 *   PATCH  /v1/account                       update name / phone
 *   POST   /v1/account/password              change (or set) password; revokes other sessions
 *   POST   /v1/account/verify-email/send     (re)send a 6-digit verification code
 *   POST   /v1/account/verify-email          confirm the code
 *   GET    /v1/account/export                NDPR/GDPR data-portability export (JSON)
 *   POST   /v1/account/delete                right to erasure (anonymise + revoke)
 */
import { Hono } from "hono";
import type { Context } from "hono";
import { z } from "zod";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";
import { clearSessionCookie } from "../lib/auth";
import { rateLimit, hashIdentifier } from "../lib/rate-limit";
import {
  hashPassword,
  isoInMinutes,
  isoNow,
  sha256Hex,
  timingSafeEqualHex,
  verifyPassword,
  verifyTotpCode,
} from "../lib/crypto";
import { sendEmail } from "../lib/email";
import { emailLayout, escapeHtml } from "../lib/email-templates";

export const VERIFY_CODE_TTL_MINUTES = 10;
const PASSWORD_MIN = 8;

function sixDigitCode(): string {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return String((buf[0] ?? 0) % 1_000_000).padStart(6, "0");
}

/** Codes are short, so the hash is bound to the user id (no cross-user reuse). */
async function codeHash(userId: string, code: string): Promise<string> {
  return sha256Hex(`verify-email:${userId}:${code}`);
}

/**
 * Issue a fresh email-verification code (invalidating earlier unused ones)
 * and email it. Returns the raw code only outside production (dev/test).
 */
export async function issueEmailVerification(
  c: { env: AppEnv },
  user: { id: string; email: string; name: string },
): Promise<{ sent: boolean; devCode?: string }> {
  const now = isoNow();
  await c.env.DB.prepare(
    `UPDATE magic_links SET consumed_at = ?
      WHERE email = ? AND kind = 'verify-email' AND consumed_at IS NULL`,
  )
    .bind(now, user.email)
    .run();
  const code = sixDigitCode();
  await c.env.DB.prepare(
    `INSERT INTO magic_links (id, email, token_hash, kind, created_at, expires_at)
     VALUES (?, ?, ?, 'verify-email', ?, ?)`,
  )
    .bind(
      crypto.randomUUID(),
      user.email,
      await codeHash(user.id, code),
      now,
      isoInMinutes(VERIFY_CODE_TTL_MINUTES),
    )
    .run();
  let sent = false;
  try {
    const result = await sendEmail(c, {
      to: user.email,
      subject: `${code} is your CEA verification code`,
      html: emailLayout({
        heading: "Confirm your email",
        bodyHtml: `<p>Hi ${escapeHtml(user.name)},</p><p>Your verification code is:</p>
<p style="font-size:28px;font-weight:800;letter-spacing:6px">${code}</p>
<p>It expires in ${VERIFY_CODE_TTL_MINUTES} minutes.</p>`,
        footnote: "If you didn't create a CEA account, you can ignore this email.",
      }),
    });
    sent = result.sent;
  } catch {
    sent = false;
  }
  return { sent, ...(c.env.APP_ENV !== "production" ? { devCode: code } : {}) };
}

interface AccountRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role_key: string;
  status: string;
  avatar_url: string | null;
  email_verified_at: string | null;
  mfa_enabled: number;
  password_hash: string | null;
  mfa_secret: string | null;
  created_at: string;
}

async function loadAccount(c: Context<{ Bindings: AppEnv }>): Promise<AccountRow> {
  const userId = c.get("authUser").id;
  const row = await c.env.DB.prepare(
    `SELECT id, name, email, phone, role_key, status, avatar_url, email_verified_at,
            mfa_enabled, password_hash, mfa_secret, created_at
       FROM users WHERE id = ?`,
  )
    .bind(userId)
    .first<AccountRow>();
  if (!row) throw ApiError.notFound("Account not found.");
  return row;
}

function toAccount(row: AccountRow) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    roleKey: row.role_key,
    avatarUrl: row.avatar_url,
    emailVerified: Boolean(row.email_verified_at),
    emailVerifiedAt: row.email_verified_at,
    mfaEnabled: row.mfa_enabled === 1,
    hasPassword: Boolean(row.password_hash),
    createdAt: row.created_at,
  };
}

export type AccountResponse = ReturnType<typeof toAccount>;

const updateSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters.").max(120).optional(),
    phone: z
      .string()
      .trim()
      .max(32, "Phone number is too long.")
      .regex(/^[+0-9 ()-]*$/, "Use digits, spaces and + only.")
      .optional()
      .nullable(),
  })
  .refine((v) => v.name !== undefined || v.phone !== undefined, {
    message: "Nothing to update.",
  });

const passwordSchema = z.object({
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .min(PASSWORD_MIN, `Password must be at least ${PASSWORD_MIN} characters.`)
    .max(256),
});

const verifySchema = z.object({
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter the 6-digit code."),
});

const deleteSchema = z.object({
  confirm: z.literal("DELETE", { message: 'Type "DELETE" to confirm.' }),
  password: z.string().optional(),
  code: z.string().optional(),
});

export const account = new Hono<{ Bindings: AppEnv }>();

account.get("/", async (c) => c.json(toAccount(await loadAccount(c))));

account.patch("/", async (c) => {
  const input = await parseBody(c, updateSchema);
  const row = await loadAccount(c);
  const name = input.name ?? row.name;
  const phone = input.phone === undefined ? row.phone : input.phone || null;
  await c.env.DB.prepare(`UPDATE users SET name = ?, phone = ?, updated_at = ? WHERE id = ?`)
    .bind(name, phone, isoNow(), row.id)
    .run();
  return c.json(toAccount({ ...row, name, phone }));
});

account.post("/password", async (c) => {
  const input = await parseBody(c, passwordSchema);
  const row = await loadAccount(c);
  await rateLimit(c.env.RATE_LIMIT, "change-password", await hashIdentifier(row.id), {
    limit: 5,
    windowSeconds: 900,
  });
  if (row.password_hash) {
    if (
      !input.currentPassword ||
      !(await verifyPassword(input.currentPassword, row.password_hash))
    ) {
      throw new ApiError(400, "INVALID_PASSWORD", "Your current password is incorrect.", {
        currentPassword: ["Your current password is incorrect."],
      });
    }
  }
  const now = isoNow();
  await c.env.DB.prepare(`UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?`)
    .bind(await hashPassword(input.newPassword), now, row.id)
    .run();
  // Sign out every other device; keep the current session alive.
  await c.env.DB.prepare(
    `UPDATE sessions SET revoked_at = ? WHERE user_id = ? AND id != ? AND revoked_at IS NULL`,
  )
    .bind(now, row.id, c.get("authSession").id)
    .run();
  try {
    await sendEmail(c, {
      to: row.email,
      subject: "Your CEA password was changed",
      html: emailLayout({
        heading: "Password changed",
        bodyHtml: `<p>Hi ${escapeHtml(row.name)}, the password on your CEA account was just changed and other devices were signed out.</p>`,
        footnote: "If this wasn't you, reset your password immediately and contact support@cea.ng.",
      }),
    });
  } catch {
    /* notification best-effort */
  }
  return c.json({ ok: true });
});

account.post("/verify-email/send", async (c) => {
  const row = await loadAccount(c);
  if (row.email_verified_at) return c.json({ ok: true, alreadyVerified: true, sent: false });
  await rateLimit(c.env.RATE_LIMIT, "verify-email-send", await hashIdentifier(row.id), {
    limit: 5,
    windowSeconds: 3600,
  });
  const result = await issueEmailVerification(c, row);
  return c.json({ ok: true, alreadyVerified: false, ...result }, 201);
});

account.post("/verify-email", async (c) => {
  const { code } = await parseBody(c, verifySchema);
  const row = await loadAccount(c);
  if (row.email_verified_at) return c.json(toAccount(row));
  await rateLimit(c.env.RATE_LIMIT, "verify-email", await hashIdentifier(row.id), {
    limit: 10,
    windowSeconds: 900,
  });
  const now = isoNow();
  const hash = await codeHash(row.id, code);
  const link = await c.env.DB.prepare(
    `SELECT id, token_hash FROM magic_links
      WHERE email = ? AND kind = 'verify-email' AND consumed_at IS NULL AND expires_at > ?
      ORDER BY created_at DESC LIMIT 1`,
  )
    .bind(row.email, now)
    .first<{ id: string; token_hash: string }>();
  if (!link || !timingSafeEqualHex(link.token_hash, hash)) {
    throw new ApiError(400, "INVALID_CODE", "That code is invalid or has expired.", {
      code: ["That code is invalid or has expired."],
    });
  }
  const consumed = await c.env.DB.prepare(
    `UPDATE magic_links SET consumed_at = ? WHERE id = ? AND consumed_at IS NULL`,
  )
    .bind(now, link.id)
    .run();
  if (consumed.meta.changes !== 1) {
    throw new ApiError(400, "INVALID_CODE", "That code is invalid or has expired.");
  }
  await c.env.DB.prepare(`UPDATE users SET email_verified_at = ?, updated_at = ? WHERE id = ?`)
    .bind(now, now, row.id)
    .run();
  return c.json(toAccount({ ...row, email_verified_at: now }));
});

/** Tables with a direct `user_id` column that belong in a personal export. */
const EXPORT_TABLES = [
  "enrollments",
  "lesson_progress",
  "gradebook",
  "assignments",
  "assessments",
  "attendance",
  "certificates",
  "payments",
  "invoices",
  "notifications",
  "notification_preferences",
  "push_subscriptions",
] as const;

account.get("/export", async (c) => {
  const row = await loadAccount(c);
  await rateLimit(c.env.RATE_LIMIT, "account-export", await hashIdentifier(row.id), {
    limit: 5,
    windowSeconds: 3600,
  });
  const data: Record<string, unknown[]> = {};
  for (const table of EXPORT_TABLES) {
    try {
      const res = await c.env.DB.prepare(`SELECT * FROM ${table} WHERE user_id = ? LIMIT 5000`)
        .bind(row.id)
        .all();
      data[table] = (res.results ?? []).map((r) => {
        const copy = { ...(r as Record<string, unknown>) };
        // Never export credentials/secrets, even the user's own.
        delete copy.endpoint_auth;
        delete copy.p256dh;
        delete copy.auth;
        return copy;
      });
    } catch {
      data[table] = [];
    }
  }
  const regs = await c.env.DB.prepare(`SELECT * FROM registrations WHERE email = ? LIMIT 500`)
    .bind(row.email)
    .all()
    .catch(() => ({ results: [] }));
  data.registrations = regs.results ?? [];
  const apps = await c.env.DB.prepare(`SELECT * FROM applications WHERE user_id = ? OR email = ?`)
    .bind(row.id, row.email)
    .all()
    .catch(() => ({ results: [] }));
  data.applications = apps.results ?? [];
  const sessions = await c.env.DB.prepare(
    `SELECT id, device_label, created_ip, created_at, expires_at, revoked_at
       FROM sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT 200`,
  )
    .bind(row.id)
    .all();
  data.sessions = sessions.results ?? [];

  await c.env.DB.prepare(
    `INSERT INTO data_requests (id, user_id, kind, created_at) VALUES (?, ?, 'export', ?)`,
  )
    .bind(crypto.randomUUID(), row.id, isoNow())
    .run();

  const body = JSON.stringify({ exportedAt: isoNow(), account: toAccount(row), data }, null, 2);
  return new Response(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="cea-account-export-${row.id.slice(0, 8)}.json"`,
      "Cache-Control": "no-store",
    },
  });
});

account.post("/delete", async (c) => {
  const input = await parseBody(c, deleteSchema);
  const row = await loadAccount(c);
  if (row.role_key === "admin") {
    const admins = await c.env.DB.prepare(
      `SELECT COUNT(*) AS n FROM users WHERE role_key = 'admin' AND status = 'active'`,
    ).first<{ n: number }>();
    if ((admins?.n ?? 0) <= 1) {
      throw new ApiError(
        409,
        "LAST_ADMIN",
        "You are the last active admin. Promote another admin first.",
      );
    }
  }
  if (row.password_hash) {
    if (!input.password || !(await verifyPassword(input.password, row.password_hash))) {
      throw new ApiError(400, "INVALID_PASSWORD", "Your password is incorrect.", {
        password: ["Your password is incorrect."],
      });
    }
  }
  if (row.mfa_enabled === 1 && row.mfa_secret) {
    if (!input.code || !(await verifyTotpCode(row.mfa_secret, input.code))) {
      throw new ApiError(400, "INVALID_CODE", "Enter a valid authenticator code.", {
        code: ["Enter a valid authenticator code."],
      });
    }
  }

  const now = isoNow();
  const originalEmail = row.email;
  const tombstone = `deleted+${row.id}@deleted.invalid`;
  // Anonymise instead of hard-deleting: payments/invoices/certificates must
  // stay intact for accounting and certificate verification.
  await c.env.DB.batch([
    c.env.DB.prepare(
      `UPDATE users SET name = 'Deleted user', email = ?, phone = NULL, password_hash = NULL,
              avatar_url = NULL, mfa_secret = NULL, mfa_enabled = 0, recovery_codes = '[]',
              status = 'deleted', deleted_at = ?, updated_at = ?
        WHERE id = ?`,
    ).bind(tombstone, now, now, row.id),
    c.env.DB.prepare(
      `UPDATE sessions SET revoked_at = ? WHERE user_id = ? AND revoked_at IS NULL`,
    ).bind(now, row.id),
    c.env.DB.prepare(`DELETE FROM push_subscriptions WHERE user_id = ?`).bind(row.id),
    c.env.DB.prepare(`DELETE FROM notification_preferences WHERE user_id = ?`).bind(row.id),
    c.env.DB.prepare(
      `UPDATE magic_links SET consumed_at = ? WHERE email = ? AND consumed_at IS NULL`,
    ).bind(now, originalEmail),
    c.env.DB.prepare(
      `INSERT INTO data_requests (id, user_id, kind, created_at) VALUES (?, ?, 'erasure', ?)`,
    ).bind(crypto.randomUUID(), row.id, now),
  ]);
  clearSessionCookie(c);
  try {
    await sendEmail(c, {
      to: originalEmail,
      subject: "Your CEA account has been deleted",
      html: emailLayout({
        heading: "Account deleted",
        bodyHtml: `<p>Your Cyber Elias Academy account and personal profile data have been removed. Payment and certificate records are retained as required by law, without your contact details.</p>`,
      }),
    });
  } catch {
    /* best-effort */
  }
  return c.json({ ok: true });
});
