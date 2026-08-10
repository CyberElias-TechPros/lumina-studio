import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

describe("POST /v1/recruitment/postings", () => {
  it("returns 401 without a session", async () => {
    const res = await api("/v1/recruitment/postings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Test Role" }),
    });
    expect(res.status).toBe(401);
  });

  it("returns 403 for non-employer/hr/admin roles", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/recruitment/postings", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({ title: "Test Role" }),
    });
    expect(res.status).toBe(403);
  });

  it("lets an employer publish a posting and returns 201", async () => {
    const { cookie } = await createTestSession("employer@cea.ng");
    const res = await api("/v1/recruitment/postings", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({
        title: "Senior Frontend Engineer",
        detail: "React + TypeScript · 5+ years",
        tone: "Senior",
      }),
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as {
      ok: boolean;
      id: string;
      title: string;
      status: string;
      posted: string;
    };
    expect(body.ok).toBe(true);
    expect(body.title).toBe("Senior Frontend Engineer");
    expect(body.status).toBe("open");
    expect(body.posted).toBeTruthy();
  });

  it("rejects an empty title with 400", async () => {
    const { cookie } = await createTestSession("employer@cea.ng");
    const res = await api("/v1/recruitment/postings", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({ title: "   " }),
    });
    expect(res.status).toBe(400);
  });
});
