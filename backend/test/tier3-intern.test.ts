import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let student: TestSession;
let mentor: TestSession;

beforeAll(async () => {
  await setupDb();
  student = await createTestSession("student@cea.ng");
  mentor = await createTestSession("mentor@cea.ng");
});

describe("GET /v1/intern-dashboard (Intern dashboard suite)", () => {
  it("403s non-student staff roles", async () => {
    const res = await api("/v1/intern-dashboard/tasks", { headers: cookieHeaders(mentor.cookie) });
    expect(res.status).toBe(403);
  });

  it.each([
    "/v1/intern-dashboard/tasks",
    "/v1/intern-dashboard/timesheets",
    "/v1/intern-dashboard/mentor-sessions",
    "/v1/intern-dashboard/milestones",
    "/v1/intern-dashboard/skills",
    "/v1/intern-dashboard/resources",
    "/v1/intern-dashboard/evaluations",
    "/v1/intern-dashboard/projects",
    "/v1/intern-dashboard/conversations",
  ])("lists %s for an intern", async (path) => {
    const res = await api(path, { headers: cookieHeaders(student.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns tasks with camelCase fields", async () => {
    const res = await api("/v1/intern-dashboard/tasks", {
      headers: cookieHeaders(student.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; status: string; dueLabel: string; category: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.dueLabel).toBeTruthy();
    expect(body.items[0]?.category).toBeTruthy();
  });

  it("returns timesheets with hours as numbers", async () => {
    const res = await api("/v1/intern-dashboard/timesheets", {
      headers: cookieHeaders(student.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; weekLabel: string; hours: number; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.hours).toBeTypeOf("number");
  });

  it("returns evaluations with scores", async () => {
    const res = await api("/v1/intern-dashboard/evaluations", {
      headers: cookieHeaders(student.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; kind: string; score: number; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.kind).toBe("self");
    expect(body.items[0]?.score).toBeTypeOf("number");
  });

  it("returns projects with artifacts and views", async () => {
    const res = await api("/v1/intern-dashboard/projects", {
      headers: cookieHeaders(student.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; category: string; artifacts: number; views: number }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.artifacts).toBeTypeOf("number");
    expect(body.items[0]?.views).toBeTypeOf("number");
  });

  it("returns conversation detail with thread for an intern", async () => {
    const res = await api("/v1/intern-dashboard/conversations/itc-01", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      id: string;
      name: string;
      preview: string;
      timeLabel: string;
      unread: number;
      thread: Array<{ id: string; fromLabel: string; body: string; timeLabel: string }>;
    };
    expect(body.id).toBe("itc-01");
    expect(body.name).toBe("Ms. Chidera · Supervisor");
    expect(body.thread.length).toBeGreaterThanOrEqual(1);
    expect(body.thread[0]?.fromLabel).toBeTruthy();
  });

  it("404s unknown conversation", async () => {
    const res = await api("/v1/intern-dashboard/conversations/unknown", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(404);
  });
});