import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth, requireAdmin } from "../lib/auth";

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
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM admin_users`)
    .first<{ n: number }>();
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
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM audit_log`)
    .first<{ n: number }>();
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
