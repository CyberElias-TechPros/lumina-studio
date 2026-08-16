import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let student: TestSession;

beforeAll(async () => {
  await setupDb();
  student = await createTestSession("student@cea.ng");
});

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

  it("rejects empty message bodies", async () => {
    const res = await api("/v1/realtime/chat/rooms/no-such-room/messages", {
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
    const res = await api("/v1/realtime/chat/rooms/room-1/ws", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(426);
  });

  it("requires auth before upgrading", async () => {
    const res = await api("/v1/realtime/chat/rooms/room-1/ws", {
      headers: { upgrade: "websocket", connection: "Upgrade" },
    });
    expect(res.status).toBe(401);
  });

  it("upgrades to a WebSocket and reports the connection", async () => {
    const res = await api("/v1/realtime/chat/rooms/room-1/ws", {
      headers: { upgrade: "websocket", connection: "Upgrade", ...cookieHeaders(student.cookie) },
    });
    expect(res.status).toBe(101);
    expect(res.webSocket).toBeTruthy();
  });
});
