import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let student: TestSession;
let admin: TestSession;
let instructor: TestSession;
let mentor: TestSession;
let otherMentor: TestSession;

beforeAll(async () => {
  await setupDb();
  student = await createTestSession("student@cea.ng");
  admin = await createTestSession("admin@cea.ng");
  instructor = await createTestSession("instructor@cea.ng");
  mentor = await createTestSession("mentor@cea.ng");
  // Attach the legacy fixtures only inside the isolated test database.
  for (const table of [
    "mnt_mentees",
    "mnt_sessions",
    "mnt_goals",
    "mnt_requests",
    "mnt_availability",
    "mnt_resources",
    "mnt_conversations",
  ]) {
    await env.DB.prepare(`UPDATE ${table} SET mentor_id = ? WHERE mentor_id = 'mentor-1'`)
      .bind(mentor.session.user.id)
      .run();
  }
  await env.DB.prepare("INSERT INTO users (id, name, email, role_key) VALUES (?, ?, ?, ?)")
    .bind("other-mentor", "Other mentor", "other-mentor@example.test", "mentor")
    .run();
  otherMentor = await createTestSession("other-mentor@example.test");
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

  it.each([
    "mentees",
    "sessions",
    "goals",
    "requests",
    "availability",
    "conversations",
    "resources",
  ])("does not list another mentor's %s", async (collection) => {
    const res = await api(`/v1/mentor-dashboard/${collection}`, {
      headers: cookieHeaders(otherMentor.cookie),
    });
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ items: [], total: 0 });
  });

  it.each([
    "mentees/mn-ada",
    "mentees/mn-ada/portfolio",
    "mentees/mn-ada/skills",
    "mentees/mn-ada/career",
    "sessions/ms-01",
    "conversations/mc-01",
  ])("does not expose another mentor's %s", async (path) => {
    const res = await api(`/v1/mentor-dashboard/${path}`, {
      headers: cookieHeaders(otherMentor.cookie),
    });
    expect(res.status).toBe(404);
  });
  it("404s unknown mentee", async () => {
    const res = await api("/v1/mentor-dashboard/mentees/unknown", {
      headers: cookieHeaders(mentor.cookie),
    });
    expect(res.status).toBe(404);
  });
});
