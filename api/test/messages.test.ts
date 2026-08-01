import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

interface ThreadShape {
  id: string;
  name: string;
  role: string;
  unread: number;
  last: { text: string; time: string; mine: boolean };
  messages: Array<{ text: string; time: string; mine: boolean }>;
}

describe("GET /v1/messages/threads", () => {
  it("returns 401 without a session", async () => {
    const res = await api("/v1/messages/threads");
    expect(res.status).toBe(401);
  });

  it("returns the demo student's threads as Paginated<MessageThread>", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/messages/threads", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: ThreadShape[]; total: number };
    expect(body.total).toBe(4);
    const t1 = body.items.find((t) => t.id === "t1");
    expect(t1).toBeDefined();
    expect(t1!.name).toBe("Emeka Nwosu");
    expect(t1!.unread).toBe(2);
    expect(t1!.last.text).toContain("strongest in the cohort");
    expect(t1!.last.mine).toBe(false);
    expect(t1!.messages).toHaveLength(3);
    expect(t1!.messages[1]!.mine).toBe(true);
  });

  it("returns an empty list for a fresh user", async () => {
    const { cookie } = await createTestSession("fresh.student@cea.ng");
    const res = await api("/v1/messages/threads", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: unknown[]; total: number };
    expect(body.items).toEqual([]);
  });
});

describe("GET /v1/messages/threads/:id", () => {
  it("returns a full thread with message history", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/messages/threads/t4", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as ThreadShape;
    expect(body.name).toBe("Mentor Circle — Adaeze");
    expect(body.role).toBe("Group · 6 members");
    expect(body.messages[0]!.text).toContain("Saturday session moved");
  });

  it("returns 404 for unknown ids", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/messages/threads/nope", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(404);
    const body = (await res.json()) as { error: { code: string } };
    expect(body.error.code).toBe("NOT_FOUND");
  });
});
