import { registerMock, registerMockPattern } from "@/lib/api/client";
import type { ApiRequestInit } from "@/lib/api/client";
import { ApiError } from "@/lib/errors";
import type { RealtimeMessage, RealtimeRoom, RoomMember } from "@/lib/api/realtime";

function delay(milliseconds = 120): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/** Reads a path segment relative to /v1/<domain>/..., e.g. index 0 = "realtime". */
function segmentAt(path: string, index: number): string {
  return path.split("/").filter(Boolean)[index] ?? "";
}

const roomMembers = new Map<string, RoomMember[]>([
  [
    "room-cohort-15",
    [
      {
        userId: "00000000-0000-4000-8000-000000000001",
        active: 1,
        expiresAt: new Date(Date.now() + 30 * 86_400_000).toISOString(),
        changedAt: new Date(Date.now() - 2 * 86_400_000).toISOString(),
        changedBy: "admin-1",
      },
    ],
  ],
]);

const rooms: RealtimeRoom[] = [
  {
    id: "room-cohort-15",
    name: "Cohort 15 — project sync",
    kind: "chat",
    createdAt: new Date(Date.now() - 3 * 86_400_000).toISOString(),
  },
  {
    id: "room-qna",
    name: "Week 12 Q&A — Backend",
    kind: "chat",
    createdAt: new Date(Date.now() - 86_400_000).toISOString(),
  },
];

const messages: RealtimeMessage[] = [
  {
    id: "msg-1",
    roomId: "room-cohort-15",
    channel: "chat",
    userId: "instructor-1",
    userName: "Mr. Adeyemi",
    body: "Welcome to the project sync. Drop your blockers here.",
    createdAt: new Date(Date.now() - 30 * 60_000).toISOString(),
  },
  {
    id: "msg-2",
    roomId: "room-cohort-15",
    channel: "chat",
    userId: "00000000-0000-4000-8000-000000000001",
    userName: "Adaeze Okafor",
    body: "Deploying to Cloudflare later today — migrations are ready.",
    createdAt: new Date(Date.now() - 20 * 60_000).toISOString(),
  },
];

export function registerRealtimeMocks(): void {
  registerMock("GET", "/v1/realtime/chat/rooms", async () => {
    await delay();
    return { items: rooms, total: rooms.length };
  });

  registerMock("POST", "/v1/realtime/chat/rooms", async (init: ApiRequestInit) => {
    await delay();
    const input = (init.body ?? {}) as { name?: string; kind?: string };
    const name = (input.name ?? "").trim();
    if (name.length === 0) {
      throw new ApiError(400, "FIELD_VALIDATION", "Name is required.", {
        name: ["Name is required."],
      });
    }
    const room: RealtimeRoom = {
      id: `room-${Math.random().toString(36).slice(2, 8)}`,
      name,
      kind: input.kind === "live" ? "live" : "chat",
      createdAt: new Date().toISOString(),
    };
    rooms.unshift(room);
    return room;
  });

  registerMockPattern("GET", "/v1/realtime/chat/rooms/*/messages", async (init: ApiRequestInit) => {
    await delay();
    const path = init.path ?? "";
    const roomId = segmentAt(path, 4);
    const page = messages.filter((m) => m.roomId === roomId).map((m) => ({ ...m }));
    return { items: page, total: page.length };
  });

  registerMockPattern(
    "POST",
    "/v1/realtime/chat/rooms/*/messages",
    async (init: ApiRequestInit) => {
      await delay();
      const path = init.path ?? "";
      const roomId = segmentAt(path, 4);
      const input = (init.body ?? {}) as { body?: string };
      const body = (input.body ?? "").trim();
      if (body.length === 0) {
        throw new ApiError(400, "FIELD_VALIDATION", "Message body is required.", {
          body: ["Message body is required."],
        });
      }
      if (!rooms.some((r) => r.id === roomId)) {
        throw new ApiError(404, "NOT_FOUND", "Room not found.");
      }
      const message: RealtimeMessage = {
        id: `msg-${Math.random().toString(36).slice(2, 10)}`,
        roomId,
        channel: "chat",
        userId: "00000000-0000-4000-8000-000000000001",
        userName: "Adaeze Okafor",
        body,
        createdAt: new Date().toISOString(),
      };
      messages.push(message);
      return message;
    },
  );

  registerMockPattern("GET", "/v1/realtime/admin/rooms/*/members", async (init: ApiRequestInit) => {
    await delay();
    const roomId = segmentAt(init.path ?? "", 4);
    const items = roomMembers.get(roomId) ?? [];
    return { items, total: items.length };
  });

  registerMockPattern("PUT", "/v1/realtime/admin/rooms/*/members", async (init: ApiRequestInit) => {
    await delay();
    const roomId = segmentAt(init.path ?? "", 4);
    const input = (init.body ?? {}) as { userId?: string; expiresAt?: string };
    const userId = (input.userId ?? "").trim();
    const expiresAt = (input.expiresAt ?? "").trim();
    if (!userId || !expiresAt) {
      throw new ApiError(400, "FIELD_VALIDATION", "userId and expiresAt are required.");
    }
    const existing = roomMembers.get(roomId) ?? [];
    const next = existing.filter((m) => m.userId !== userId);
    next.unshift({
      userId,
      active: 1,
      expiresAt,
      changedAt: new Date().toISOString(),
      changedBy: "00000000-0000-4000-8000-000000000001",
    });
    roomMembers.set(roomId, next);
    return { ok: true };
  });

  registerMockPattern(
    "DELETE",
    "/v1/realtime/admin/rooms/*/members/*",
    async (init: ApiRequestInit) => {
      await delay();
      const path = init.path ?? "";
      const roomId = segmentAt(path, 4);
      const userId = segmentAt(path, 6);
      const existing = roomMembers.get(roomId) ?? [];
      roomMembers.set(
        roomId,
        existing.map((m) => (m.userId === userId ? { ...m, active: 0 } : m)),
      );
      return { ok: true };
    },
  );
}
