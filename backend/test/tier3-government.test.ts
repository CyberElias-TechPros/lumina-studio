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

describe("GET /v1/government-dashboard (Government/compliance suite)", () => {
  it("403s non-staff roles", async () => {
    const res = await api("/v1/government-dashboard/filings", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(403);
  });

  it.each([
    "/v1/government-dashboard/overview",
    "/v1/government-dashboard/calendar",
    "/v1/government-dashboard/changes",
    "/v1/government-dashboard/documents",
    "/v1/government-dashboard/facts",
    "/v1/government-dashboard/reports",
    "/v1/government-dashboard/threads",
    "/v1/government-dashboard/checks",
    "/v1/government-dashboard/audits",
    "/v1/government-dashboard/filings",
    "/v1/government-dashboard/courses",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns overview KPIs with value labels", async () => {
    const res = await api("/v1/government-dashboard/overview", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string; delta: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("Compliance score");
    expect(body.items[0]?.valueLabel).toBe("92");
    expect(body.items[0]?.delta).toBe("of 100");
  });

  it("returns calendar events with dates and status", async () => {
    const res = await api("/v1/government-dashboard/calendar", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; dateLabel: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.title).toBe("Audit inspection");
    expect(body.items[0]?.status).toBe("Scheduled");
  });

  it("returns filings with Filed/Draft statuses", async () => {
    const res = await api("/v1/government-dashboard/filings", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; detail: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.title).toBe("Q2 enrolment census");
    expect(body.items[0]?.status).toBe("Filed");
    expect(body.items[1]?.status).toBe("Draft");
  });

  it("returns institution facts with label/value", async () => {
    const res = await api("/v1/government-dashboard/facts", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; label: string; value: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.label).toBe("Registration");
    expect(body.items[0]?.value).toContain("RC 1423784");
  });

  it("returns messaging threads with sender and status", async () => {
    const res = await api("/v1/government-dashboard/threads", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{
        id: string;
        title: string;
        fromLabel: string;
        timeLabel: string;
        status: string;
      }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.fromLabel).toBe("CEA compliance office");
    expect(body.items[0]?.status).toBe("Open");
  });
});