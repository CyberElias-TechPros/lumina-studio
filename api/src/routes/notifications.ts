import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth } from "../lib/auth";

export interface ApiNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  engine: string;
}

interface NotificationRow {
  id: string;
  title: string;
  body: string;
  time: string;
  engine: string;
}

export const notifications = new Hono<{ Bindings: AppEnv }>();

notifications.use("*", requireAuth);

notifications.get("/", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const userId = c.get("authUser").id;
  const total = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM notifications WHERE user_id = ? OR user_id IS NULL`,
  )
    .bind(userId)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, title, body, time, engine FROM notifications
      WHERE (user_id = ? OR user_id IS NULL) ${cursor ? "AND id > ?" : ""}
      ORDER BY id ASC LIMIT ?`,
  )
    .bind(userId, ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<NotificationRow>();
  const items: ApiNotification[] = rows.results.map((r) => ({ ...r }));
  const result: Paginated<ApiNotification> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});
