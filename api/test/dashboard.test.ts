import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

describe("GET /v1/dashboard/student", () => {
  it("returns 401 without a session", async () => {
    const res = await api("/v1/dashboard/student");
    expect(res.status).toBe(401);
    const body = (await res.json()) as { error: { code: string } };
    expect(body.error.code).toBe("UNAUTHORIZED");
  });

  it("returns the demo student's full dashboard shape", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/dashboard/student", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      kpis: {
        enrolled: number;
        overallProgress: number;
        lessonsThisWeek: number;
        lessonsGoal: number;
        studyHours: string;
        streakDays: number;
      };
      summary: { doneLessons: number; totalLessons: number };
      weeklyGoal: { done: number; goal: number; note: string };
      nextDeadline: { due: string; title: string } | null;
      courses: Array<{ slug: string; pct: number; nextUp?: string }>;
    };

    expect(body.kpis.enrolled).toBe(3);
    expect(body.kpis.overallProgress).toBe(54);
    expect(body.kpis.lessonsThisWeek).toBe(5);
    expect(body.kpis.lessonsGoal).toBe(8);
    expect(body.kpis.studyHours).toBe("18.5h");
    expect(body.kpis.streakDays).toBe(9);

    expect(body.summary.doneLessons).toBe(12);
    expect(body.summary.totalLessons).toBe(26);

    expect(body.weeklyGoal.done).toBe(5);
    expect(body.weeklyGoal.goal).toBe(8);
    expect(body.weeklyGoal.note.length).toBeGreaterThan(0);

    expect(body.nextDeadline).toEqual({
      due: "Today 23:59",
      title: "Build: REST API assignment",
    });

    expect(body.courses).toHaveLength(3);
    const full = body.courses.find((c) => c.slug === "full-stack");
    expect(full?.pct).toBe(78);
    expect(full?.nextUp).toBe("Auth, sessions & JWT");
    const cloud = body.courses.find((c) => c.slug === "cloud-devops");
    expect(cloud?.nextUp).toBe("Docker images & registries");
    const uiux = body.courses.find((c) => c.slug === "uiux-design");
    expect(uiux?.nextUp).toBe("Color & contrast");
  });

  it("returns empty defaults for a fresh student", async () => {
    const { cookie } = await createTestSession("fresh.student@cea.ng");
    const res = await api("/v1/dashboard/student", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      kpis: {
        enrolled: number;
        overallProgress: number;
        lessonsThisWeek: number;
        lessonsGoal: number;
        studyHours: string;
        streakDays: number;
      };
      summary: { doneLessons: number; totalLessons: number };
      nextDeadline: unknown;
      courses: unknown[];
    };
    expect(body.kpis.enrolled).toBe(0);
    expect(body.kpis.overallProgress).toBe(0);
    expect(body.kpis.lessonsThisWeek).toBe(0);
    expect(body.kpis.lessonsGoal).toBe(8);
    expect(body.kpis.studyHours).toBe("0h");
    expect(body.kpis.streakDays).toBe(0);
    expect(body.summary).toEqual({ doneLessons: 0, totalLessons: 0 });
    expect(body.nextDeadline).toBeNull();
    expect(body.courses).toEqual([]);
  });

  it("returns 403 for non-students", async () => {
    const { cookie } = await createTestSession("instructor@cea.ng");
    const res = await api("/v1/dashboard/student", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(403);
    const body = (await res.json()) as { error: { code: string } };
    expect(body.error.code).toBe("FORBIDDEN");
  });
});
