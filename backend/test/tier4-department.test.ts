import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let staff: TestSession;
let student: TestSession;

beforeAll(async () => {
  await setupDb();
  staff = await createTestSession("admin@cea.ng");
  student = await createTestSession("student@cea.ng");
});

describe("GET /v1/department-dashboard (Department suite)", () => {
  it("403s students", async () => {
    const denied = await api("/v1/department-dashboard/overview", {
      headers: cookieHeaders(student.cookie),
    });
    expect(denied.status).toBe(403);
  });

  it.each([
    "/v1/department-dashboard/overview",
    "/v1/department-dashboard/reports",
    "/v1/department-dashboard/observations",
    "/v1/department-dashboard/faculty",
    "/v1/department-dashboard/cohorts",
    "/v1/department-dashboard/programs",
    "/v1/department-dashboard/events",
    "/v1/department-dashboard/approvals",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns overview KPIs with value labels", async () => {
    const res = await api("/v1/department-dashboard/overview", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string; delta: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("Reports (year)");
    expect(body.items[0]?.valueLabel).toBe("12");
  });

  it("returns reports with statuses", async () => {
    const res = await api("/v1/department-dashboard/reports", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; detail: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.title).toBe("Student outcomes · Q2 2026");
    expect(body.items[0]?.detail).toBe("92% completion · 84% placement");
    expect(body.items[0]?.status).toBe("Published");
  });

  it("returns quality observations with statuses", async () => {
    const res = await api("/v1/department-dashboard/observations", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; detail: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.title).toBe("Class observation — Mr. Adeyemi");
    expect(body.items[0]?.status).toBe("Scheduled");
    expect(body.items[2]?.status).toBe("Completed");
  });

  it("returns faculty with numeric loads", async () => {
    const res = await api("/v1/department-dashboard/faculty", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; courses: number; students: number; workload: string; rating: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.name).toBe("Mr. Adeyemi");
    expect(body.items[0]?.courses).toBe(4);
    expect(body.items[0]?.students).toBe(62);
    expect(body.items[0]?.workload).toBe("85%");
    expect(body.items[0]?.rating).toBe("4.8");
  });

  it("returns enrollment cohorts with capacity percentages", async () => {
    const res = await api("/v1/department-dashboard/cohorts", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; enrolled: number; capacity: number; pct: number; status: string }>;
      total: number;
    };
    expect(body.items[0]?.name).toBe("Cohort 15 — Full-Stack");
    expect(body.items[0]?.enrolled).toBe(48);
    expect(body.items[0]?.capacity).toBe(50);
    expect(body.items[0]?.pct).toBe(96);
    expect(body.items[0]?.status).toBe("Active");
  });

  it("returns curriculum programs with versions", async () => {
    const res = await api("/v1/department-dashboard/programs", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; version: string; year: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.name).toBe("Full-Stack Software Development");
    expect(body.items[0]?.version).toBe("v3.1");
    expect(body.items[0]?.year).toBe("2026");
    expect(body.items[0]?.status).toBe("Active");
  });

  it("returns calendar events with date labels", async () => {
    const res = await api("/v1/department-dashboard/events", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; dateLabel: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.title).toBe("Mid-term assessments");
    expect(body.items[0]?.dateLabel).toBe("Aug 17–21 · all programs");
    expect(body.items[0]?.status).toBe("Upcoming");
  });

  it("returns approvals queue with requesters", async () => {
    const res = await api("/v1/department-dashboard/approvals", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; requester: string; dateLabel: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.title).toBe("Curriculum update · Frontend track");
    expect(body.items[0]?.requester).toBe("Instructor Adesuwa");
    expect(body.items[0]?.status).toBe("Pending");
  });

  it("404s unknown collections", async () => {
    const res = await api("/v1/department-dashboard/bogus", {
      headers: cookieHeaders(staff.cookie),
    });
    expect(res.status).toBe(404);
  });
});