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

describe("GET /v1/instructor-extras-dashboard (Instructor extras suite)", () => {
  it("403s non-staff roles", async () => {
    const denied = await api("/v1/instructor-extras-dashboard/overview", {
      headers: cookieHeaders(student.cookie),
    });
    expect(denied.status).toBe(403);
  });

  it.each([
    "/v1/instructor-extras-dashboard/overview",
    "/v1/instructor-extras-dashboard/classes",
    "/v1/instructor-extras-dashboard/announcements",
    "/v1/instructor-extras-dashboard/queue",
    "/v1/instructor-extras-dashboard/revisions",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns overview KPIs with value labels", async () => {
    const res = await api("/v1/instructor-extras-dashboard/overview", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string; delta: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("Active students");
    expect(body.items[0]?.valueLabel).toBe("128");
    expect(body.items[0]?.delta).toBe("+9 this week");
  });

  it("returns classes with times and locations", async () => {
    const res = await api("/v1/instructor-extras-dashboard/classes", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; timeLabel: string; title: string; place: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.timeLabel).toBe("09:00");
    expect(body.items[0]?.title).toBe("Backend & APIs · live lab");
    expect(body.items[0]?.place).toBe("Lab B3 · Yaba campus");
  });

  it("returns announcements with audience and pin status", async () => {
    const res = await api("/v1/instructor-extras-dashboard/announcements", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{
        id: string;
        title: string;
        audience: string;
        dateLabel: string;
        pinned: number;
        status: string;
      }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(5);
    expect(body.items[0]?.title).toBe("Mid-term exam format & schedule");
    expect(body.items[0]?.audience).toBe("Cohort 15");
    expect(body.items[0]?.pinned).toBe(1);
    expect(body.items[0]?.status).toBe("Published");
  });

  it("returns grading queue items", async () => {
    const res = await api("/v1/instructor-extras-dashboard/queue", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{
        id: string;
        student: string;
        item: string;
        course: string;
        submitted: string;
        due: string;
      }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(5);
    expect(body.items[0]?.student).toBe("Chiamaka Eze");
    expect(body.items[0]?.item).toBe("REST API Assignment 3");
    expect(body.items[0]?.course).toBe("Backend & APIs");
    expect(body.items[0]?.due).toBe("Due today");
  });

  it("returns course revisions with versions and authors", async () => {
    const res = await api("/v1/instructor-extras-dashboard/revisions", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{
        id: string;
        version: string;
        title: string;
        author: string;
        dateLabel: string;
      }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.version).toBe("v3");
    expect(body.items[0]?.title).toBe("Fixed middleware demo bug");
    expect(body.items[0]?.author).toBe("Ada Obi");
  });

  it("paginates with cursor", async () => {
    const first = await api("/v1/instructor-extras-dashboard/announcements?limit=2", {
      headers: cookieHeaders(staff.cookie),
    });
    const firstBody = (await first.json()) as {
      items: Array<{ id: string }>;
      nextCursor?: string;
    };
    expect(firstBody.items).toHaveLength(2);
    expect(firstBody.nextCursor).toBeTruthy();

    const second = await api(
      `/v1/instructor-extras-dashboard/announcements?limit=2&cursor=${firstBody.nextCursor ?? ""}`,
      { headers: cookieHeaders(staff.cookie) },
    );
    const secondBody = (await second.json()) as { items: Array<{ id: string }> };
    expect(secondBody.items[0]?.id).not.toBe(firstBody.items[0]?.id);
  });

  it("404s unknown collections", async () => {
    const res = await api("/v1/instructor-extras-dashboard/bogus", {
      headers: cookieHeaders(staff.cookie),
    });
    expect(res.status).toBe(404);
  });
});
