import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { RealtimeRoom } from "../src/durable/realtime-room";
import { sha256Hex } from "../src/lib/crypto";
import type { AppEnv } from "../src/types";
import { setupDb } from "./helpers";

const roomId = crypto.randomUUID();
beforeAll(async () => {
  await setupDb();
  await env.DB.prepare("INSERT INTO realtime_rooms(id,name,kind,created_at) VALUES (?,?,'chat',?)")
    .bind(roomId, "Test", new Date().toISOString())
    .run();
});
async function session(email: string) {
  const user = await env.DB.prepare("SELECT id, name, role_key FROM users WHERE email = ?")
    .bind(email)
    .first<{ id: string; name: string; role_key: string }>();
  if (!user) throw new Error("Missing test user");
  const sessionId = crypto.randomUUID();
  const hash = await sha256Hex(crypto.randomUUID());
  await env.DB.prepare("INSERT INTO sessions(id,user_id,token_hash,expires_at) VALUES (?,?,?,?)")
    .bind(sessionId, user.id, hash, new Date(Date.now() + 86400000).toISOString())
    .run();
  const now = new Date().toISOString();
  await env.DB.prepare(
    "INSERT INTO chat_room_members(room_id,user_id,active,expires_at,changed_at,changed_by,operation_id) VALUES (?,?,1,?,?,?,?) ON CONFLICT(room_id,user_id) DO UPDATE SET active=1, expires_at=excluded.expires_at",
  )
    .bind(
      roomId,
      user.id,
      new Date(Date.now() + 86400000).toISOString(),
      now,
      user.id,
      crypto.randomUUID(),
    )
    .run();
  return {
    roomId,
    sessionId,
    userId: user.id,
    roleKey: user.role_key,
    userName: user.name,
    channel: "chat",
  };
}
async function persisted(user: { userId: string; userName: string }, targetRoom = roomId) {
  const id = crypto.randomUUID();
  await env.DB.prepare(
    "INSERT INTO realtime_messages(id,room_id,channel,user_id,user_name,body,created_at,sort_order) VALUES (?,?,'chat',?,?,?, ?,0)",
  )
    .bind(id, targetRoom, user.userId, user.userName, "persisted", new Date().toISOString())
    .run();
  return JSON.stringify({ type: "message", messageId: id, body: "forged" });
}
function peer(meta: unknown) {
  return {
    deserializeAttachment: () => meta,
    send: vi.fn(),
    close: vi.fn(),
  } as unknown as WebSocket;
}
function room(...peers: WebSocket[]) {
  return new RealtimeRoom(
    { getWebSockets: () => peers } as unknown as DurableObjectState,
    env as AppEnv,
  );
}

describe("socket sessions are revalidated for every fan-out", () => {
  it("sends to a valid recipient only while both sessions remain valid", async () => {
    const one = await session("student@cea.ng"),
      two = await session("instructor@cea.ng");
    const a = peer(one),
      b = peer(two),
      r = room(a, b);
    await r.webSocketMessage(a, await persisted(one));
    expect(b.send).toHaveBeenCalledTimes(1);
    await env.DB.prepare("UPDATE sessions SET revoked_at = ? WHERE id = ?")
      .bind(new Date().toISOString(), two.sessionId)
      .run();
    await r.webSocketMessage(a, await persisted(one));
    expect(b.send).toHaveBeenCalledTimes(1);
    expect(b.close).toHaveBeenCalled();
  });
  it("rejects revoked senders and legacy sockets with no bound session", async () => {
    const one = await session("student@cea.ng"),
      two = await session("instructor@cea.ng");
    const a = peer(one),
      b = peer(two),
      old = peer({ userId: one.userId, userName: one.userName });
    await env.DB.prepare("UPDATE sessions SET revoked_at = ? WHERE id = ?")
      .bind(new Date().toISOString(), one.sessionId)
      .run();
    const r = room(a, b, old);
    await r.webSocketMessage(a, await persisted(one));
    await r.webSocketMessage(old, JSON.stringify({ type: "message", body: "hello" }));
    expect(b.send).not.toHaveBeenCalled();
    expect(a.close).toHaveBeenCalled();
    expect(old.close).toHaveBeenCalled();
  });
  it("rejects expired sessions, changed roles and suspended accounts", async () => {
    const original = await session("student@cea.ng");
    const other = await session("instructor@cea.ng");
    const b = peer(other);
    const expired = peer({ ...original, sessionId: original.sessionId });
    await env.DB.prepare("UPDATE sessions SET expires_at = ? WHERE id = ?")
      .bind("2000-01-01T00:00:00.000Z", original.sessionId)
      .run();
    await room(expired, b).webSocketMessage(
      expired,
      JSON.stringify({ type: "message", body: "test" }),
    );
    expect(expired.close).toHaveBeenCalled();
    const valid = await session("student@cea.ng");
    const wrongRole = peer({ ...valid, roleKey: "admin" });
    await room(wrongRole, b).webSocketMessage(
      wrongRole,
      JSON.stringify({ type: "message", body: "test" }),
    );
    expect(wrongRole.close).toHaveBeenCalled();
    const suspended = peer(valid);
    await env.DB.prepare("UPDATE users SET status = 'suspended' WHERE id = ?")
      .bind(valid.userId)
      .run();
    try {
      await room(suspended, b).webSocketMessage(
        suspended,
        JSON.stringify({ type: "message", body: "test" }),
      );
      expect(suspended.close).toHaveBeenCalled();
      expect(b.send).not.toHaveBeenCalled();
    } finally {
      await env.DB.prepare("UPDATE users SET status = 'active' WHERE id = ?")
        .bind(valid.userId)
        .run();
    }
  });

  it("does not fan out to a revoked chat participant with an open socket", async () => {
    const one = await session("student@cea.ng"),
      two = await session("instructor@cea.ng");
    const roomId = crypto.randomUUID(),
      now = new Date().toISOString(),
      expires = new Date(Date.now() + 86400000).toISOString();
    await env.DB.prepare(
      "INSERT INTO realtime_rooms(id,name,kind,created_at,created_by) VALUES (?,?,'chat',?,?)",
    )
      .bind(roomId, "Test", now, one.userId)
      .run();
    for (const user of [one, two])
      await env.DB.prepare(
        "INSERT INTO chat_room_members(room_id,user_id,active,expires_at,changed_at,changed_by,operation_id) VALUES (?,?,1,?,?,?,?)",
      )
        .bind(roomId, user.userId, expires, now, one.userId, crypto.randomUUID())
        .run();
    const a = peer({ ...one, roomId, channel: "chat" }),
      b = peer({ ...two, roomId, channel: "chat" }),
      r = room(a, b);
    await r.webSocketMessage(a, await persisted(one, roomId));
    expect(b.send).toHaveBeenCalledTimes(1);
    await env.DB.prepare("UPDATE chat_room_members SET active=0 WHERE room_id = ? AND user_id = ?")
      .bind(roomId, two.userId)
      .run();
    await r.webSocketMessage(a, await persisted(one, roomId));
    expect(b.send).toHaveBeenCalledTimes(1);
    expect(b.close).toHaveBeenCalled();
  });

  it("only broadcasts an author's persisted chat message, using stored content", async () => {
    const one = await session("student@cea.ng"),
      two = await session("instructor@cea.ng");
    const a = peer(one),
      b = peer(two),
      r = room(a, b);
    await r.webSocketMessage(a, JSON.stringify({ type: "message", body: "unsaved" }));
    await r.webSocketMessage(a, await persisted(two));
    expect(b.send).not.toHaveBeenCalled();
    await r.webSocketMessage(a, await persisted(one));
    expect(JSON.parse(vi.mocked(b.send).mock.calls[0]![0] as string)).toMatchObject({
      body: "persisted",
      user: { id: one.userId },
    });
  });
  it("closes old live sockets", async () => {
    const one = await session("student@cea.ng"),
      a = peer({ ...one, channel: "live" });
    await room(a).webSocketMessage(a, JSON.stringify({ type: "message", body: "x" }));
    expect(a.close).toHaveBeenCalled();
  });
  it("rejects invalid frames and type impersonation", async () => {
    const one = await session("student@cea.ng"),
      two = await session("instructor@cea.ng");
    const a = peer(one),
      b = peer(two),
      r = room(a, b);
    for (const message of [
      "bad json",
      JSON.stringify({ type: "connected", body: "x" }),
      JSON.stringify({ type: "message", body: "x".repeat(5001) }),
      JSON.stringify({ type: "message", body: { bad: true } }),
    ])
      await r.webSocketMessage(a, message);
    expect(b.send).not.toHaveBeenCalled();
  });
});
