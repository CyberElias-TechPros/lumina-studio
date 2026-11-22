import { beforeAll, describe, expect, it } from "vitest";
import { env } from "cloudflare:workers";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let student: TestSession;

beforeAll(async () => {
  await setupDb();
  student = await createTestSession("student@cea.ng");
});

async function createRoomForTest(): Promise<string> {
  const res = await api("/v1/realtime/chat/rooms", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
    body: JSON.stringify({ name: "Test room" }),
  });
  expect(res.status).toBe(201);
  return ((await res.json()) as { id: string }).id;
}

describe("realtime chat rooms", () => {
  it("creates a room and lists it", async () => {
    const created = await api("/v1/realtime/chat/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ name: "Cohort 15 — project sync", kind: "chat" }),
    });
    expect(created.status).toBe(201);
    const room = (await created.json()) as {
      id: string;
      name: string;
      kind: string;
      createdAt: string;
    };
    expect(room).toMatchObject({
      name: "Cohort 15 — project sync",
      kind: "chat",
    });

    const list = await api("/v1/realtime/chat/rooms", {
      headers: cookieHeaders(student.cookie),
    });
    const body = (await list.json()) as { items: { id: string }[]; total: number };
    expect(body.items.some((r) => r.id === room.id)).toBe(true);
  });

  it("rejects rooms without a name", async () => {
    const res = await api("/v1/realtime/chat/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ name: "   " }),
    });
    expect(res.status).toBe(400);
  });

  it("persists messages and returns them in order", async () => {
    const room = await api("/v1/realtime/chat/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ name: "Messages test room" }),
    });
    const { id } = (await room.json()) as { id: string };

    for (const body of ["first message", "second message"]) {
      const sent = await api(`/v1/realtime/chat/rooms/${id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
        body: JSON.stringify({ body }),
      });
      expect(sent.status).toBe(201);
    }

    const history = await api(`/v1/realtime/chat/rooms/${id}/messages`, {
      headers: cookieHeaders(student.cookie),
    });
    const page = (await history.json()) as {
      items: { body: string; userName: string; channel: string }[];
      total: number;
    };
    expect(page.total).toBe(2);
    expect(page.items.map((m) => m.body)).toEqual(["first message", "second message"]);
    expect(page.items[0]).toMatchObject({ userName: expect.any(String), channel: "chat" });
  });

  it("paginates in insertion order even when UUIDs are not ordered, and isolates channels", async () => {
    const id = await createRoomForTest();
    for (const [messageId, channel] of [
      ["z-" + id, "chat"],
      ["live-" + id, "live"],
      ["a-" + id, "chat"],
      ["b-" + id, "chat"],
    ]) {
      await env.DB.prepare(
        "INSERT INTO realtime_messages (id, room_id, channel, user_name, body, created_at) VALUES (?, ?, ?, ?, ?, ?)",
      )
        .bind(messageId, id, channel, "Tester", messageId, new Date().toISOString())
        .run();
    }
    const headers = cookieHeaders(student.cookie);
    const first = (await (
      await api(`/v1/realtime/chat/rooms/${id}/messages?limit=2`, { headers })
    ).json()) as { items: { id: string }[]; nextCursor?: string; total: number };
    expect(first.items.map((m) => m.id)).toEqual(["z-" + id, "a-" + id]);
    expect(first.total).toBe(3);
    const second = (await (
      await api(
        `/v1/realtime/chat/rooms/${id}/messages?limit=2&cursor=${encodeURIComponent(first.nextCursor!)}`,
        { headers },
      )
    ).json()) as { items: { id: string }[]; nextCursor?: string };
    expect(second.items.map((m) => m.id)).toEqual(["b-" + id]);
    expect(second.nextCursor).toBeUndefined();
  });
  it("rejects malformed and excessively long room or message input", async () => {
    const headers = { "Content-Type": "application/json", ...cookieHeaders(student.cookie) };
    for (const name of [123, "x".repeat(121)])
      expect(
        (
          await api("/v1/realtime/chat/rooms", {
            method: "POST",
            headers,
            body: JSON.stringify({ name }),
          })
        ).status,
      ).toBe(400);
    const roomId = await createRoomForTest();
    for (const body of [123, "x".repeat(5001)])
      expect(
        (
          await api(`/v1/realtime/chat/rooms/${roomId}/messages`, {
            method: "POST",
            headers,
            body: JSON.stringify({ body }),
          })
        ).status,
      ).toBe(400);
  });

  it("rejects empty message bodies", async () => {
    const roomId = await createRoomForTest();
    const res = await api(`/v1/realtime/chat/rooms/${roomId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ body: "  " }),
    });
    expect(res.status).toBe(400);
  });

  it("404s messages for unknown rooms", async () => {
    const res = await api("/v1/realtime/chat/rooms/no-such-room/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ body: "hello" }),
    });
    expect(res.status).toBe(404);
  });
});

describe("realtime WebSocket upgrade", () => {
  it("answers 426 to plain HTTP requests", async () => {
    const roomId = await createRoomForTest();
    const res = await api(`/v1/realtime/chat/rooms/${roomId}/ws`, {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(426);
  });

  it("requires auth before upgrading", async () => {
    const res = await api("/v1/realtime/chat/rooms/room-1/ws", {
      headers: { upgrade: "websocket", connection: "Upgrade", origin: "https://cea.ng" },
    });
    expect(res.status).toBe(401);
  });

  it("upgrades to a WebSocket and reports the connection", async () => {
    const roomId = await createRoomForTest();
    const res = await api(`/v1/realtime/chat/rooms/${roomId}/ws`, {
      headers: {
        upgrade: "websocket",
        connection: "Upgrade",
        origin: "https://cea.ng",
        ...cookieHeaders(student.cookie),
      },
    });
    expect(res.status).toBe(101);
    expect(res.webSocket).toBeTruthy();
  });
  it.each(["/v1/realtime/chat/rooms/room-1/ws", "/v1/live/classes/live-1/ws"])(
    "rejects cross-site and missing-origin websocket connections: %s",
    async (path) => {
      for (const origin of [
        undefined,
        "https://attacker.example",
        "null",
        "https://cea.ng.attacker.example",
      ]) {
        const headers = {
          upgrade: "websocket",
          connection: "Upgrade",
          ...cookieHeaders(student.cookie),
          ...(origin ? { origin } : {}),
        };
        expect((await api(path, { headers })).status, origin ?? "missing").toBe(403);
      }
    },
  );
  it("rejects live websocket when student is not enrolled in the class course", async () => {
    const res = await api("/v1/live/classes/live-1/ws", {
      headers: {
        upgrade: "websocket",
        connection: "Upgrade",
        origin: "https://cea.ng",
        ...cookieHeaders(student.cookie),
      },
    });
    expect(res.status).toBe(403);
  });
});
