import { Hono } from "hono";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { base64UrlDecode, base64UrlEncode, isoNow } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth } from "../lib/auth";

export interface ApiNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  engine: string;
  read?: boolean;
}

interface NotificationRow {
  id: string;
  title: string;
  body: string;
  time: string;
  engine: string;
  read_at: string | null;
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
    `SELECT id, title, body, time, engine, read_at FROM notifications
      WHERE (user_id = ? OR user_id IS NULL) ${cursor ? "AND id > ?" : ""}
      ORDER BY id ASC LIMIT ?`,
  )
    .bind(userId, ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<NotificationRow>();
  const items: ApiNotification[] = rows.results.map((r) => ({
    id: r.id,
    title: r.title,
    body: r.body,
    time: r.time,
    engine: r.engine,
    ...(r.read_at ? { read: true } : {}),
  }));
  const result: Paginated<ApiNotification> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

/** Mark one of your own notifications as read. */
notifications.post("/:id/read", async (c) => {
  const user = c.get("authUser");
  const id = c.req.param("id");
  const row = await c.env.DB.prepare(`SELECT id FROM notifications WHERE id = ? AND user_id = ?`)
    .bind(id, user.id)
    .first<{ id: string }>();
  if (!row) throw ApiError.notFound("Notification not found.");
  await c.env.DB.prepare(`UPDATE notifications SET read_at = ? WHERE id = ?`)
    .bind(isoNow(), id)
    .run();
  return c.json({ ok: true, read: true });
});

/** Mark all of your notifications as read. */
notifications.post("/read-all", async (c) => {
  const user = c.get("authUser");
  await c.env.DB.prepare(`UPDATE notifications SET read_at = ? WHERE user_id = ? AND read_at IS NULL`)
    .bind(isoNow(), user.id)
    .run();
  return c.json({ ok: true });
});
