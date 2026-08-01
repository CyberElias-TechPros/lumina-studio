import { Hono } from "hono";
import type { AppEnv } from "../types";
import { z } from "zod";
import { base64UrlDecode, base64UrlEncode, isoNow } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth, requireAdmin } from "../lib/auth";
import { ApiError } from "../lib/errors";
import { parseBody } from "../lib/validate";
import { normalizeEmail } from "../db/client";
import { ROLE_PERMISSIONS } from "../lib/permissions";

export interface ApiAdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastSeen: string;
}

export interface ApiAuditEntry {
  id: string;
  actor: string;
  action: string;
  time: string;
  severity: string;
}

interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  last_seen: string;
}

interface AuditRow {
  id: string;
  actor: string;
  action: string;
  time: string;
  severity: string;
}

export const admin = new Hono<{ Bindings: AppEnv }>();

admin.use("*", requireAuth, requireAdmin);

admin.get("/users", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM admin_users`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, name, email, role, status, last_seen FROM admin_users
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<AdminUserRow>();
  const items: ApiAdminUser[] = rows.results.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    role: r.role,
    status: r.status,
    lastSeen: r.last_seen,
  }));
  const result: Paginated<ApiAdminUser> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

admin.get("/audit-log", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM audit_log`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, actor, action, time, severity FROM audit_log
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<AuditRow>();
  const items: ApiAuditEntry[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiAuditEntry> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

/** Admin: real accounts from the `users` table (name, email, role, status). */
admin.get("/accounts", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM users`).first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, name, email, role_key, status, created_at FROM users
      ${cursor ? "WHERE id > ?" : ""} ORDER BY created_at ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<{
      id: string;
      name: string;
      email: string;
      role_key: string;
      status: string;
      created_at: string;
    }>();
  const items = rows.results.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    roleKey: r.role_key,
    status: r.status,
    createdAt: r.created_at,
  }));
  const result: Paginated<unknown> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode((last as { id: string }).id),
  );
  return c.json(result);
});

async function writeAudit(c: { env: AppEnv }, actor: string, action: string): Promise<void> {
  await c.env.DB.prepare(
    `INSERT INTO audit_log (id, actor, action, time, severity, sort_order) VALUES (?, ?, ?, ?, 'info', 0)`,
  )
    .bind(crypto.randomUUID(), actor, action, isoNow())
    .run();
}

const createUserSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(120),
  email: z.string().trim().email("Enter a valid email address."),
  roleKey: z.string().trim().min(1, "Role is required."),
  status: z.enum(["active", "suspended"]).optional().default("active"),
});

const updateUserSchema = z.object({
  status: z.enum(["active", "suspended"]).optional(),
  roleKey: z.string().trim().min(1).optional(),
});

/** Admin: provision an account (user signs in via magic link with their seeded role). */
admin.post("/users", async (c) => {
  const adminUser = c.get("authUser");
  const body = await parseBody(c, createUserSchema);
  const email = normalizeEmail(body.email);
  if (!(body.roleKey in ROLE_PERMISSIONS) && body.roleKey !== "*") {
    throw ApiError.validation({ roleKey: ["Unknown role."] });
  }
  const existing = await c.env.DB.prepare(`SELECT id FROM users WHERE email = ?`)
    .bind(email)
    .first<{ id: string }>();
  if (existing) throw ApiError.conflict("An account with this email already exists.");

  const now = isoNow();
  await c.env.DB.prepare(
    `INSERT INTO users (id, name, email, role_key, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(crypto.randomUUID(), body.name, email, body.roleKey, body.status, now, now)
    .run();
  await writeAudit(c, adminUser.email, `Created user ${email} (${body.roleKey})`);
  return c.json({ ok: true, email, roleKey: body.roleKey, status: body.status }, 201);
});

/** Admin: suspend/activate or change a user's role. */
admin.patch("/users/:id", async (c) => {
  const adminUser = c.get("authUser");
  const id = c.req.param("id");
  const body = await parseBody(c, updateUserSchema);
  if (body.roleKey !== undefined && !(body.roleKey in ROLE_PERMISSIONS) && body.roleKey !== "*") {
    throw ApiError.validation({ roleKey: ["Unknown role."] });
  }
  const row = await c.env.DB.prepare(`SELECT id, email FROM users WHERE id = ?`)
    .bind(id)
    .first<{ id: string; email: string }>();
  if (!row) throw ApiError.notFound("User not found.");

  if (body.status) {
    await c.env.DB.prepare(`UPDATE users SET status = ?, updated_at = ? WHERE id = ?`)
      .bind(body.status, isoNow(), id)
      .run();
    if (body.status === "suspended") {
      await c.env.DB.prepare(
        `UPDATE sessions SET revoked_at = ? WHERE user_id = ? AND revoked_at IS NULL`,
      )
        .bind(isoNow(), id)
        .run();
    }
  }
  if (body.roleKey) {
    await c.env.DB.prepare(`UPDATE users SET role_key = ?, updated_at = ? WHERE id = ?`)
      .bind(body.roleKey, isoNow(), id)
      .run();
  }
  await writeAudit(
    c,
    adminUser.email,
    `Updated user ${row.email}: status=${body.status ?? "unchanged"} role=${body.roleKey ?? "unchanged"}`,
  );
  return c.json({ ok: true, id });
});
