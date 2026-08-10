import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

describe("POST /v1/messages/threads/:id/messages", () => {
  it("returns 401 without a session", async () => {
    const res = await api("/v1/messages/threads/t1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: "Hello" }),
    });
    expect(res.status).toBe(401);
  });

  it("lets a user send a message in their own thread and returns 201", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/messages/threads/t1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({ body: "Quick question about the assignment deadline." }),
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as { text: string; time: string; mine: boolean };
    expect(body.text).toBe("Quick question about the assignment deadline.");
    expect(body.mine).toBe(true);
    expect(body.time).toBeTruthy();
  });

  it("rejects an empty body with 400", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/messages/threads/t1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({ body: "   " }),
    });
    expect(res.status).toBe(400);
  });

  it("returns 404 for an unknown thread", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/messages/threads/nope/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({ body: "Hello" }),
    });
    expect(res.status).toBe(404);
  });
});

describe("GET /v1/messages/threads/:id", () => {
  it("returns the thread detail with its messages", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/messages/threads/t1", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      id: string;
      name: string;
      messages: Array<{ text: string; mine: boolean }>;
    };
    expect(body.id).toBe("t1");
    expect(body.messages.length).toBeGreaterThan(0);
  });
});
