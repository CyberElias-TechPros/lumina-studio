import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

interface AssignmentShape {
  id: string;
  title: string;
  course: string;
  description: string;
  due: string;
  status: string;
  score?: number;
  max: number;
  weight: number;
  submissions: unknown[];
  rubric: Array<{ criterion: string; detail: string; weight: number }>;
}

describe("GET /v1/assignments", () => {
  it("returns 401 without a session", async () => {
    const res = await api("/v1/assignments");
    expect(res.status).toBe(401);
  });

  it("returns the demo student's assignments as Paginated<StudentAssignment>", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/assignments", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: AssignmentShape[]; total: number };
    expect(body.total).toBe(4);
    const a1 = body.items.find((a) => a.id === "a1");
    expect(a1).toBeDefined();
    expect(a1!.status).toBe("submitted");
    expect(a1!.course).toBe("Backend & APIs");
    expect(a1!.weight).toBe(25);
    expect(a1!.submissions).toHaveLength(1);
    expect(a1!.rubric).toHaveLength(5);
    const a4 = body.items.find((a) => a.id === "a4");
    expect(a4!.status).toBe("graded");
    expect(a4!.score).toBe(87);
  });

  it("returns an empty list for a fresh user", async () => {
    const { cookie } = await createTestSession("fresh.student@cea.ng");
    const res = await api("/v1/assignments", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: unknown[]; total: number };
    expect(body.items).toEqual([]);
    expect(body.total).toBe(0);
  });

  it("returns 403 for non-students", async () => {
    const { cookie } = await createTestSession("instructor@cea.ng");
    const res = await api("/v1/assignments", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(403);
    const body = (await res.json()) as { error: { code: string } };
    expect(body.error.code).toBe("FORBIDDEN");
  });
});

describe("GET /v1/assignments/:id", () => {
  it("returns a full assignment with rubric and submissions", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/assignments/a1", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as AssignmentShape;
    expect(body.title).toBe("Build: REST API assignment");
    expect(body.due).toBe("Today 23:59");
    expect(body.submissions).toEqual([
      { file: "api-submission.zip", size: "4.2 MB", uploaded: "Today 18:31" },
    ]);
  });

  it("returns 404 for unknown or foreign ids", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/assignments/nope", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(404);
    const body = (await res.json()) as { error: { code: string } };
    expect(body.error.code).toBe("NOT_FOUND");
  });
});
