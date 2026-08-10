import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

describe("PATCH /v1/instructor/submissions/:id (grade)", () => {
  it("returns 401 without a session", async () => {
    const res = await api("/v1/instructor/submissions/s1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score: 80 }),
    });
    expect(res.status).toBe(401);
  });

  it("returns 403 for non-instructor/non-admin", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/instructor/submissions/s1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({ score: 80 }),
    });
    expect(res.status).toBe(403);
  });

  it("lets an instructor grade a submission and returns graded state", async () => {
    const { cookie } = await createTestSession("instructor@cea.ng");
    const res = await api("/v1/instructor/submissions/s1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({ score: 88, feedback: "Great work on auth rotation." }),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      id: string;
      score: number;
      status: string;
      feedback?: string;
      gradedAt: string;
    };
    expect(body.id).toBe("s1");
    expect(body.score).toBe(88);
    expect(body.status).toBe("graded");
    expect(body.feedback).toBe("Great work on auth rotation.");
    expect(body.gradedAt).toBeTruthy();
  });

  it("returns 404 for an unknown submission", async () => {
    const { cookie } = await createTestSession("instructor@cea.ng");
    const res = await api("/v1/instructor/submissions/nope", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({ score: 50 }),
    });
    expect(res.status).toBe(404);
  });
});
