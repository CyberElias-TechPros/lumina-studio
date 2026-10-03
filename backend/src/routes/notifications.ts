import { Hono } from "hono";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { base64UrlDecode, base64UrlEncode, isoNow } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth } from "../lib/auth";
import { parseBody } from "../lib/validate";
import { z } from "zod";

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

const preferencesPatchSchema = z.object({
  appEnabled: z.boolean().optional(),
  emailEnabled: z.boolean().optional(),
  smsEnabled: z.boolean().optional(),
  quietStart: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use HH:MM format.")
    .optional(),
  quietEnd: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use HH:MM format.")
    .optional(),
});

interface NotificationPreferencesRow {
  app_enabled: number;
  email_enabled: number;
  sms_enabled: number;
  quiet_start: string;
  quiet_end: string;
}

function formatPreferences(row?: NotificationPreferencesRow | null) {
  return {
    appEnabled: row?.app_enabled !== 0,
    emailEnabled: row?.email_enabled !== 0,
    smsEnabled: row?.sms_enabled === 1,
    quietStart: row?.quiet_start ?? "21:00",
    quietEnd: row?.quiet_end ?? "08:00",
  };
}

notifications.get("/preferences", async (c) => {
  const row = await c.env.DB.prepare(
    `SELECT app_enabled, email_enabled, sms_enabled, quiet_start, quiet_end
       FROM notification_preferences WHERE user_id = ?`,
  )
    .bind(c.get("authUser").id)
    .first<NotificationPreferencesRow>();
  return c.json(formatPreferences(row));
});

notifications.patch("/preferences", async (c) => {
  const userId = c.get("authUser").id;
  const body = await parseBody(c, preferencesPatchSchema);
  const current = await c.env.DB.prepare(
    `SELECT app_enabled, email_enabled, sms_enabled, quiet_start, quiet_end
       FROM notification_preferences WHERE user_id = ?`,
  )
    .bind(userId)
    .first<NotificationPreferencesRow>();
  const next = {
    appEnabled: body.appEnabled ?? current?.app_enabled !== 0,
    emailEnabled: body.emailEnabled ?? current?.email_enabled !== 0,
    smsEnabled: body.smsEnabled ?? current?.sms_enabled === 1,
    quietStart: body.quietStart ?? current?.quiet_start ?? "21:00",
    quietEnd: body.quietEnd ?? current?.quiet_end ?? "08:00",
  };
  await c.env.DB.prepare(
    `INSERT INTO notification_preferences
      (user_id, app_enabled, email_enabled, sms_enabled, quiet_start, quiet_end, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(user_id) DO UPDATE SET
       app_enabled = excluded.app_enabled,
       email_enabled = excluded.email_enabled,
       sms_enabled = excluded.sms_enabled,
       quiet_start = excluded.quiet_start,
       quiet_end = excluded.quiet_end,
       updated_at = excluded.updated_at`,
  )
    .bind(
      userId,
      next.appEnabled ? 1 : 0,
      next.emailEnabled ? 1 : 0,
      next.smsEnabled ? 1 : 0,
      next.quietStart,
      next.quietEnd,
      isoNow(),
    )
    .run();
  return c.json(next);
});

notifications.get("/unread-count", async (c) => {
  const userId = c.get("authUser").id;
  const result = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n
       FROM notifications n
       LEFT JOIN notification_reads nr
         ON nr.notification_id = n.id AND nr.user_id = ?
      WHERE (n.user_id = ? AND n.read_at IS NULL)
         OR (n.user_id IS NULL AND nr.read_at IS NULL)`,
  )
    .bind(userId, userId)
    .first<{ n: number }>();
  return c.json({ count: result?.n ?? 0 });
});

notifications.get("/", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const userId = c.get("authUser").id;
  const total = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM notifications WHERE user_id = ? OR user_id IS NULL`,
  )
    .bind(userId)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT n.id, n.title, n.body, n.time, n.engine,
            CASE WHEN n.user_id IS NULL THEN nr.read_at ELSE n.read_at END AS read_at
       FROM notifications n
       LEFT JOIN notification_reads nr ON nr.notification_id = n.id AND nr.user_id = ?
      WHERE (n.user_id = ? OR n.user_id IS NULL) ${cursor ? "AND n.id > ?" : ""}
      ORDER BY n.id ASC LIMIT ?`,
  )
    .bind(userId, userId, ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit + 1)
    .all<NotificationRow>();
  const hasNextPage = rows.results.length > limit;
  const pageRows = rows.results.slice(0, limit);
  const items: ApiNotification[] = pageRows.map((r) => ({
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
  if (!hasNextPage) delete result.nextCursor;
  return c.json(result);
});

/** Mark one of your own notifications as read. */
notifications.post("/:id/read", async (c) => {
  const user = c.get("authUser");
  const id = c.req.param("id");
  const row = await c.env.DB.prepare(
    `SELECT id, user_id FROM notifications WHERE id = ? AND (user_id = ? OR user_id IS NULL)`,
  )
    .bind(id, user.id)
    .first<{ id: string; user_id: string | null }>();
  if (!row) throw ApiError.notFound("Notification not found.");
  const readAt = isoNow();
  if (row.user_id === null) {
    await c.env.DB.prepare(
      `INSERT INTO notification_reads (notification_id, user_id, read_at) VALUES (?, ?, ?)
       ON CONFLICT(notification_id, user_id) DO UPDATE SET read_at = excluded.read_at`,
    )
      .bind(id, user.id, readAt)
      .run();
  } else {
    await c.env.DB.prepare(`UPDATE notifications SET read_at = ? WHERE id = ? AND user_id = ?`)
      .bind(readAt, id, user.id)
      .run();
  }
  return c.json({ ok: true, read: true });
});

/** Mark all of your notifications as read. */
notifications.post("/read-all", async (c) => {
  const user = c.get("authUser");
  const readAt = isoNow();
  await c.env.DB.prepare(
    `UPDATE notifications SET read_at = ? WHERE user_id = ? AND read_at IS NULL`,
  )
    .bind(readAt, user.id)
    .run();
  await c.env.DB.prepare(
    `INSERT OR IGNORE INTO notification_reads (notification_id, user_id, read_at)
     SELECT id, ?, ? FROM notifications WHERE user_id IS NULL`,
  )
    .bind(user.id, readAt)
    .run();
  return c.json({ ok: true });
});
