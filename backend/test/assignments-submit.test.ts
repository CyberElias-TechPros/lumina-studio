import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

describe("POST /v1/assignments/:id/submit", () => {
  it("returns 401 without a session", async () => {
    const res = await api("/v1/assignments/a1/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: "repo-link" }),
    });
    expect(res.status).toBe(401);
  });

  it("returns 403 for non-students", async () => {
    const { cookie } = await createTestSession("instructor@cea.ng");
    const res = await api("/v1/assignments/a1/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({ file: "repo-link" }),
    });
    expect(res.status).toBe(403);
  });

  it("lets a student submit work and returns 201", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/assignments/a2/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({ file: "https://github.com/student/repo", size: "GitHub" }),
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as {
      id: string;
      assignmentId: string;
      status: string;
      submittedAt: string;
      file: string;
    };
    expect(body.assignmentId).toBe("a2");
    expect(body.status).toBe("submitted");
    expect(body.file).toBe("https://github.com/student/repo");
    expect(body.submittedAt).toBeTruthy();
  });

  it("returns 404 for an unknown assignment", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/assignments/nope/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({ file: "x" }),
    });
    expect(res.status).toBe(404);
  });

  it("returns 409 when the assignment is already graded", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/assignments/a4/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({ file: "late-work.zip" }),
    });
    expect(res.status).toBe(409);
  });
});

describe("GET /v1/assignments/:id/submission", () => {
  it("returns 401 without a session", async () => {
    const res = await api("/v1/assignments/a1/submission");
    expect(res.status).toBe(401);
  });

  it("returns 404 when the student has not submitted yet", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/assignments/a3/submission", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(404);
  });

  it("returns the submission state after a submit", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const submitRes = await api("/v1/assignments/a3/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({ file: "my-submission.zip", size: "2.1 MB" }),
    });
    expect(submitRes.status).toBe(201);
    const res = await api("/v1/assignments/a3/submission", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      id: string;
      status: string;
      submittedAt: string;
      file: string;
    };
    expect(body.status).toBe("submitted");
    expect(body.file).toBe("my-submission.zip");
    expect(body.submittedAt).toBeTruthy();
  });
});
