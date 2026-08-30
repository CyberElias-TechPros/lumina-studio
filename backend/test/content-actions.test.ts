import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

describe("content authoring and recruitment actions", () => {
  it("lets an instructor create a published lesson in their course", async () => {
    const { cookie } = await createTestSession("instructor@cea.ng");
    const response = await api("/v1/instructor/courses/backend-apis/lessons", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({
        moduleId: "m3",
        title: "Session hardening workshop",
        type: "lab",
        duration: "45m",
        materials: "Threat model checklist",
        published: true,
      }),
    });

    expect(response.status).toBe(201);
    const body = (await response.json()) as {
      ok: boolean;
      courseId: string;
      moduleId: string;
      lesson: { title: string; type: string; status: string };
    };
    expect(body.ok).toBe(true);
    expect(body.courseId).toBe("backend-apis");
    expect(body.moduleId).toBe("m3");
    expect(body.lesson).toMatchObject({
      title: "Session hardening workshop",
      type: "lab",
      status: "published",
    });
  });

  it("allows an employer to edit and close an owned posting", async () => {
    const { cookie } = await createTestSession("employer@cea.ng");
    const response = await api("/v1/recruitment/postings/post-1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({
        title: "DevOps instructor — evening cohort",
        detail: "Three evenings per week",
        status: "closed",
      }),
    });

    expect(response.status).toBe(200);
    const body = (await response.json()) as {
      ok: boolean;
      id: string;
      title: string;
      detail: string;
      status: string;
    };
    expect(body).toMatchObject({
      ok: true,
      id: "post-1",
      title: "DevOps instructor — evening cohort",
      detail: "Three evenings per week",
      status: "closed",
    });
  });

  it("rejects lesson creation from students", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const response = await api("/v1/instructor/courses/backend-apis/lessons", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(cookie) },
      body: JSON.stringify({ moduleId: "m1", title: "Not allowed", type: "reading" }),
    });
    expect(response.status).toBe(403);
  });
});
