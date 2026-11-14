import { beforeAll, describe, expect, it } from "vitest";
import { env } from "cloudflare:workers";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

describe("legacy mentor request isolation", () => {
  it("does not create a request for a seeded profile", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const before = await env.DB.prepare("SELECT count(*) AS n FROM mentor_requests").first<{
      n: number;
    }>();
    const res = await api("/v1/mentor/requests", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ mentorId: "mentor-2", goal: "Need help" }),
    });
    expect(res.status).toBe(409);
    const after = await env.DB.prepare("SELECT count(*) AS n FROM mentor_requests").first<{
      n: number;
    }>();
    expect(after?.n).toBe(before?.n);
  });
  it("still rejects unauthorized roles", async () => {
    const { cookie } = await createTestSession("instructor@cea.ng");
    const res = await api("/v1/mentor/requests", {
      method: "POST",
      headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ mentorId: "mentor-2", goal: "Need help" }),
    });
    expect(res.status).toBe(403);
  });
});
