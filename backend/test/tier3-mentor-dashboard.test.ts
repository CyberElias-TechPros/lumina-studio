import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let student: TestSession;
let admin: TestSession;
let instructor: TestSession;
let mentor: TestSession;

beforeAll(async () => {
  await setupDb();
  student = await createTestSession("student@cea.ng");
  admin = await createTestSession("admin@cea.ng");
  instructor = await createTestSession("instructor@cea.ng");
  mentor = await createTestSession("mentor@cea.ng");
});

describe("GET /v1/mentor-dashboard (Mentor dashboard suite)", () => {
  it("403s non-staff roles", async () => {
    const res = await api("/v1/mentor-dashboard/mentees", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(403);
  });

  it.each([
    "/v1/mentor-dashboard/mentees",
    "/v1/mentor-dashboard/sessions",
    "/v1/mentor-dashboard/goals",
    "/v1/mentor-dashboard/requests",
    "/v1/mentor-dashboard/availability",
    "/v1/mentor-dashboard/conversations",
    "/v1/mentor-dashboard/resources",
  ])("lists %s for a mentor", async (path) => {
    const res = await api(path, { headers: cookieHeaders(mentor.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns mentee overview with goals for a mentor", async () => {
    const res = await api("/v1/mentor-dashboard/mentees/mn-ada", {
      headers: cookieHeaders(mentor.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      id: string;
      name: string;
      track: string;
      goals: Array<{
        id: string;
        title: string;
        progressPct: number;
        dueDate: string;
        status: string;
      }>;
    };
    expect(body.id).toBe("mn-ada");
    expect(body.name).toBe("Ada Okafor");
    expect(body.goals.length).toBeGreaterThanOrEqual(1);
    expect(body.goals[0]?.progressPct).toBeTypeOf("number");
  });

  it("returns session detail with actions for a mentor", async () => {
    const res = await api("/v1/mentor-dashboard/sessions/ms-01", {
      headers: cookieHeaders(mentor.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      id: string;
      title: string;
      datetimeText: string;
      mode: string;
      status: string;
      notes: string;
      actions: Array<{ id: string; title: string; done: number }>;
    };
    expect(body.id).toBe("ms-01");
    expect(body.actions.length).toBeGreaterThanOrEqual(1);
    expect(body.actions[0]?.done).toBeTypeOf("number");
  });

  it("returns portfolio items for a mentee", async () => {
    const res = await api("/v1/mentor-dashboard/mentees/mn-ada/portfolio", {
      headers: cookieHeaders(mentor.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      items: Array<{
        id: string;
        projectName: string;
        status: string;
        stars: number;
        feedback: string;
      }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.projectName).toBeTruthy();
  });

  it("returns skills for a mentee", async () => {
    const res = await api("/v1/mentor-dashboard/mentees/mn-ada/skills", {
      headers: cookieHeaders(mentor.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      items: Array<{ id: string; skillName: string; endorsed: number }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.skillName).toBeTruthy();
  });

  it("returns career applications for a mentee", async () => {
    const res = await api("/v1/mentor-dashboard/mentees/mn-ada/career", {
      headers: cookieHeaders(mentor.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      items: Array<{
        id: string;
        role: string;
        company: string;
        stage: string;
        appliedDate: string;
      }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.role).toBeTruthy();
  });

  it("returns conversation detail with thread for a mentor", async () => {
    const res = await api("/v1/mentor-dashboard/conversations/mc-01", {
      headers: cookieHeaders(mentor.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      id: string;
      name: string;
      track: string;
      preview: string;
      timeLabel: string;
      unread: number;
      thread: Array<{ id: string; fromLabel: string; body: string; timeLabel: string }>;
    };
    expect(body.id).toBe("mc-01");
    expect(body.name).toBe("Ada Okafor");
    expect(body.thread.length).toBeGreaterThanOrEqual(1);
    expect(body.thread[0]?.fromLabel).toBeTruthy();
  });

  it("404s unknown mentee", async () => {
    const res = await api("/v1/mentor-dashboard/mentees/unknown", {
      headers: cookieHeaders(mentor.cookie),
    });
    expect(res.status).toBe(404);
  });
});
