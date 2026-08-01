import { Hono } from "hono";
import type { AppEnv } from "../types";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth } from "../lib/auth";
import { ApiError } from "../lib/errors";

export interface ApiRealtimeRoom {
  id: string;
  name: string;
  kind: string;
  createdAt: string;
  connected: number;
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

function isoNow(): string {
  return new Date().toISOString();
}

realtime.post("/chat/rooms", async (c) => {
  const input = (await c.req.json().catch(() => ({}))) as { name?: string; kind?: string };
  const name = (input.name ?? "").trim();
  if (name.length === 0) throw ApiError.validation({ name: ["Name is required."] });
  const id = crypto.randomUUID();
  const now = isoNow();
  await c.env.DB.prepare(
    `INSERT INTO realtime_rooms (id, name, kind, created_at, created_by, sort_order)
     VALUES (?, ?, ?, ?, ?, 0)`,
  )
    .bind(id, name, input.kind === "live" ? "live" : "chat", now, c.get("authUser").id)
    .run();
  const room: ApiRealtimeRoom = {
    id,
    name,
    kind: input.kind === "live" ? "live" : "chat",
    createdAt: now,
    connected: 0,
  };
  return c.json(room, 201);
});

realtime.get("/chat/rooms", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM realtime_rooms`).first<{
    n: number;
  }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, name, kind, created_at FROM realtime_rooms
      ${cursor ? "WHERE id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<RoomRow>();
  const items: ApiRealtimeRoom[] = rows.results.map((r) => ({
    id: r.id,
    name: r.name,
    kind: r.kind,
    createdAt: r.created_at,
    connected: 0,
  }));
  const result: Paginated<ApiRealtimeRoom> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});

realtime.get("/chat/rooms/:id/messages", async (c) => {
  const { cursor, limit } = parsePagination(c);
  const roomId = c.req.param("id");
  const total = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM realtime_messages WHERE room_id = ?`,
  )
    .bind(roomId)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, room_id, channel, user_id, user_name, body, created_at FROM realtime_messages
      WHERE room_id = ? ${cursor ? "AND id > ?" : ""} ORDER BY rowid ASC LIMIT ?`,
  )
    .bind(roomId, ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
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
  return c.json(result);
});

realtime.post("/chat/rooms/:id/messages", async (c) => {
  const roomId = c.req.param("id");
  const input = (await c.req.json().catch(() => ({}))) as { body?: string };
  const body = (input.body ?? "").trim();
  if (body.length === 0) throw ApiError.validation({ body: ["Message body is required."] });

  const room = await c.env.DB.prepare(`SELECT id FROM realtime_rooms WHERE id = ?`)
    .bind(roomId)
    .first<{ id: string }>();
  if (!room) throw ApiError.notFound("Room not found.");

  const user = c.get("authUser");
  const id = crypto.randomUUID();
  const now = isoNow();
  await c.env.DB.prepare(
    `INSERT INTO realtime_messages (id, room_id, channel, user_id, user_name, body, created_at, sort_order)
     VALUES (?, ?, 'chat', ?, ?, ?, ?, 0)`,
  )
    .bind(id, roomId, user.id, user.name, body, now)
    .run();
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
    },
  });
  return stub.fetch(upgrade);
});
