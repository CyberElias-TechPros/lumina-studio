import { Hono } from "hono";
import { z } from "zod";
import { parseBody } from "../lib/validate";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth, requireAdmin } from "../lib/auth";
import { ApiError } from "../lib/errors";

export interface ApiRealtimeRoom {
  id: string;
  name: string;
  kind: string;
  createdAt: string;
}

export interface ApiRealtimeMessage {
  id: string;
  roomId: string;
  channel: string;
  userId: string | null;
  userName: string;
  body: string;
  createdAt: string;
}

interface RoomRow {
  id: string;
  name: string;
  kind: string;
  created_at: string;
}

interface MessageRow {
  id: string;
  room_id: string;
  channel: string;
  user_id: string | null;
  user_name: string;
  body: string;
  created_at: string;
}

export const realtime = new Hono<{ Bindings: AppEnv }>();

realtime.use("*", requireAuth);
realtime.use("*", async (c, next) => {
  c.header("Cache-Control", "no-store");
  await next();
});

function isoNow(): string {
  return new Date().toISOString();
}

realtime.post("/chat/rooms", async (c) => {
  const input = await parseBody(
    c,
    z
      .object({
        name: z.string().trim().min(1).max(120),
        kind: z.enum(["chat", "live"]).optional(),
      })
      .strict(),
  );
  const name = input.name;
  const id = crypto.randomUUID();
  const now = isoNow();
  const userId = c.get("authUser").id;
  const expiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
  await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO realtime_rooms (id, name, kind, created_at, created_by, sort_order) VALUES (?, ?, ?, ?, ?, 0)`,
    ).bind(id, name, input.kind === "live" ? "live" : "chat", now, userId),
    c.env.DB.prepare(
      `INSERT INTO chat_room_members (room_id, user_id, active, expires_at, changed_at, changed_by, operation_id) VALUES (?, ?, 1, ?, ?, ?, ?)`,
    ).bind(id, userId, expiry, now, userId, crypto.randomUUID()),
    c.env.DB.prepare(
      `INSERT INTO chat_room_member_events (id, room_id, user_id, active, expires_at, changed_at, changed_by) VALUES (?, ?, ?, 1, ?, ?, ?)`,
    ).bind(crypto.randomUUID(), id, userId, expiry, now, userId),
  ]);
  const room: ApiRealtimeRoom = {
    id,
    name,
    kind: input.kind === "live" ? "live" : "chat",
    createdAt: now,
  };
  return c.json(room, 201);
});

realtime.get("/chat/rooms", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const userId = c.get("authUser").id;
  const now = isoNow();
  const total = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM realtime_rooms r JOIN chat_room_members m ON m.room_id = r.id WHERE m.user_id = ? AND m.active = 1 AND m.expires_at > ?`,
  )
    .bind(userId, now)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT r.id, r.name, r.kind, r.created_at FROM realtime_rooms r JOIN chat_room_members m ON m.room_id = r.id WHERE m.user_id = ? AND m.active = 1 AND m.expires_at > ? ${cursor ? "AND r.id > ?" : ""} ORDER BY r.id ASC LIMIT ?`,
  )
    .bind(userId, now, ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<RoomRow>();
  const items: ApiRealtimeRoom[] = rows.results.map((r) => ({
    id: r.id,
    name: r.name,
    kind: r.kind,
    createdAt: r.created_at,
  }));
  const result: Paginated<ApiRealtimeRoom> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  if (items.length < limit) delete result.nextCursor;
  return c.json(result);
});

async function requireRoomMember(env: AppEnv, roomId: string, userId: string) {
  const row = await env.DB.prepare(
    `SELECT 1 AS ok FROM chat_room_members m JOIN realtime_rooms r ON r.id = m.room_id WHERE m.room_id = ? AND m.user_id = ? AND m.active = 1 AND m.expires_at > ?`,
  )
    .bind(roomId, userId, isoNow())
    .first<{ ok: number }>();
  if (!row) throw ApiError.notFound("Room not found.");
}

realtime.get("/chat/rooms/:id/messages", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const roomId = c.req.param("id");
  await requireRoomMember(c.env, roomId, c.get("authUser").id);
  let afterRow: number | undefined;
  if (cursor) {
    const decoded = base64UrlDecode(cursor);
    if (!decoded) throw ApiError.validation({ cursor: ["Invalid cursor."] });
    const row = await c.env.DB.prepare(
      "SELECT rowid AS position FROM realtime_messages WHERE id = ? AND room_id = ? AND channel = 'chat'",
    )
      .bind(decoded, roomId)
      .first<{ position: number }>();
    if (!row) throw ApiError.validation({ cursor: ["Invalid cursor."] });
    afterRow = row.position;
  }
  const total = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM realtime_messages WHERE room_id = ? AND channel = 'chat'`,
  )
    .bind(roomId)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, room_id, channel, user_id, user_name, body, created_at FROM realtime_messages
      WHERE room_id = ? AND channel = 'chat' ${afterRow !== undefined ? "AND rowid > ?" : ""} ORDER BY rowid ASC LIMIT ?`,
  )
    .bind(roomId, ...(afterRow !== undefined ? [afterRow] : []), limit)
    .all<MessageRow>();
  const items: ApiRealtimeMessage[] = rows.results.map((r) => ({
    id: r.id,
    roomId: r.room_id,
    channel: r.channel,
    userId: r.user_id,
    userName: r.user_name,
    body: r.body,
    createdAt: r.created_at,
  }));
  const result: Paginated<ApiRealtimeMessage> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  if (items.length < limit) delete result.nextCursor;
  return c.json(result);
});

realtime.post("/chat/rooms/:id/messages", async (c) => {
  const roomId = c.req.param("id");
  await requireRoomMember(c.env, roomId, c.get("authUser").id);
  const { body } = await parseBody(
    c,
    z.object({ body: z.string().trim().min(1).max(5000) }).strict(),
  );

  const room = await c.env.DB.prepare(`SELECT id FROM realtime_rooms WHERE id = ?`)
    .bind(roomId)
    .first<{ id: string }>();
  if (!room) throw ApiError.notFound("Room not found.");

  const user = c.get("authUser");
  const id = crypto.randomUUID();
  const now = isoNow();
  const saved = await c.env.DB.prepare(
    `INSERT INTO realtime_messages (id, room_id, channel, user_id, user_name, body, created_at, sort_order)
     SELECT ?, ?, 'chat', ?, ?, ?, ?, 0 WHERE EXISTS (SELECT 1 FROM chat_room_members WHERE room_id = ? AND user_id = ? AND active = 1 AND expires_at > ?)`,
  )
    .bind(id, roomId, user.id, user.name, body, now, roomId, user.id, now)
    .run();
  if (!saved.meta.changes) throw ApiError.notFound("Room not found.");
  const message: ApiRealtimeMessage = {
    id,
    roomId,
    channel: "chat",
    userId: user.id,
    userName: user.name,
    body,
    createdAt: now,
  };
  return c.json(message, 201);
});

/** WebSocket upgrade — plain HTTP requests get 426 so clients fall back to REST. */
realtime.get("/chat/rooms/:id/ws", async (c) => {
  await requireRoomMember(c.env, c.req.param("id"), c.get("authUser").id);
  if (c.req.header("upgrade")?.toLowerCase() !== "websocket") {
    return c.json(
      { error: { code: "UPGRADE_REQUIRED", message: "A WebSocket upgrade is required." } },
      426,
    );
  }
  const roomId = c.req.param("id");
  const user = c.get("authUser");
  const id = c.env.REALTIME_ROOMS.idFromName(`chat:${roomId}`);
  const stub = c.env.REALTIME_ROOMS.get(id);
  const url = new URL(c.req.url);
  url.pathname = "/ws";
  url.searchParams.set("channel", "chat");
  const upgrade = new Request(url.toString(), {
    method: "GET",
    headers: {
      upgrade: "websocket",
      connection: "Upgrade",
      "x-cea-user-id": user.id,
      "x-cea-user-name": user.name,
      "x-cea-session-id": c.get("authSession").id,
      "x-cea-role-key": user.roleKey,
      "x-cea-room-id": roomId,
    },
  });
  return stub.fetch(upgrade);
});

// Admin-only membership management. Legacy rooms are never automatically assigned.
realtime.get("/admin/rooms", requireAdmin, async (c) => {
  c.header("Cache-Control", "no-store");
  const { cursor, limit } = parsePagination(c);
  const rows = await c.env.DB.prepare(
    `SELECT id, name, kind, created_at FROM realtime_rooms ${cursor ? "WHERE id > ?" : ""} ORDER BY id LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<RoomRow>();
  const total = await c.env.DB.prepare("SELECT COUNT(*) AS n FROM realtime_rooms").first<{
    n: number;
  }>();
  return c.json(
    paginate(
      rows.results.map((r) => ({ id: r.id, name: r.name, kind: r.kind, createdAt: r.created_at })),
      total?.n ?? 0,
      (r) => base64UrlEncode(r.id),
    ),
  );
});
realtime.get("/admin/rooms/:id/members", requireAdmin, async (c) => {
  c.header("Cache-Control", "no-store");
  const room = await c.env.DB.prepare("SELECT id FROM realtime_rooms WHERE id = ?")
    .bind(c.req.param("id"))
    .first();
  if (!room) throw ApiError.notFound("Room not found.");
  const { cursor, limit } = parsePagination(c);
  const rows = await c.env.DB.prepare(
    `SELECT m.user_id AS userId, m.active, m.expires_at AS expiresAt, m.changed_at AS changedAt, m.changed_by AS changedBy FROM chat_room_members m WHERE m.room_id = ? ${cursor ? "AND m.user_id > ?" : ""} ORDER BY m.user_id LIMIT ?`,
  )
    .bind(c.req.param("id"), ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<{
      userId: string;
      active: number;
      expiresAt: string;
      changedAt: string;
      changedBy: string;
    }>();
  const total = await c.env.DB.prepare(
    "SELECT COUNT(*) AS n FROM chat_room_members WHERE room_id = ?",
  )
    .bind(c.req.param("id"))
    .first<{ n: number }>();
  return c.json(paginate(rows.results, total?.n ?? 0, (r) => base64UrlEncode(r.userId)));
});
const grantSchema = z
  .object({ userId: z.string().uuid(), expiresAt: z.string().datetime() })
  .strict();
realtime.put("/admin/rooms/:id/members", requireAdmin, async (c) => {
  const { userId, expiresAt } = await parseBody(c, grantSchema);
  const expires = Date.parse(expiresAt),
    nowMs = Date.now();
  if (!Number.isFinite(expires) || expires <= nowMs || expires > nowMs + 365 * 24 * 60 * 60 * 1000)
    throw ApiError.validation({ expiresAt: ["Choose an expiry within one year."] });
  const roomId = c.req.param("id"),
    actor = c.get("authUser").id,
    now = new Date(nowMs).toISOString(),
    expiry = new Date(expires).toISOString();
  const room = await c.env.DB.prepare("SELECT id FROM realtime_rooms WHERE id = ?")
    .bind(roomId)
    .first();
  const user = await c.env.DB.prepare("SELECT id FROM users WHERE id = ? AND status = 'active'")
    .bind(userId)
    .first();
  if (!room || !user) throw ApiError.notFound("Room or active user not found.");
  await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO chat_room_members (room_id,user_id,active,expires_at,changed_at,changed_by,operation_id) VALUES (?,?,1,?,?,?,?) ON CONFLICT(room_id,user_id) DO UPDATE SET active=1,expires_at=excluded.expires_at,changed_at=excluded.changed_at,changed_by=excluded.changed_by,operation_id=excluded.operation_id`,
    ).bind(roomId, userId, expiry, now, actor, crypto.randomUUID()),
    c.env.DB.prepare(
      "INSERT INTO chat_room_member_events (id,room_id,user_id,active,expires_at,changed_at,changed_by) VALUES (?,?,?,1,?,?,?)",
    ).bind(crypto.randomUUID(), roomId, userId, expiry, now, actor),
  ]);
  return c.json({ ok: true });
});
realtime.delete("/admin/rooms/:id/members/:userId", requireAdmin, async (c) => {
  const room = c.req.param("id"),
    user = c.req.param("userId"),
    actor = c.get("authUser").id,
    now = isoNow(),
    op = crypto.randomUUID();
  const results = await c.env.DB.batch([
    c.env.DB.prepare(
      "UPDATE chat_room_members SET active = 0, changed_at = ?, changed_by = ?, operation_id = ? WHERE room_id = ? AND user_id = ? AND active = 1",
    ).bind(now, actor, op, room, user),
    c.env.DB.prepare(
      "INSERT INTO chat_room_member_events (id,room_id,user_id,active,expires_at,changed_at,changed_by) SELECT ?,room_id,user_id,0,expires_at,?,? FROM chat_room_members WHERE room_id = ? AND user_id = ? AND active = 0 AND operation_id = ?",
    ).bind(crypto.randomUUID(), now, actor, room, user, op),
  ]);
  if (!results[0]?.meta.changes) throw ApiError.notFound("Active membership not found.");
  return c.json({ ok: true });
});
