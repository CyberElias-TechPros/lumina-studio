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

describe("GET /v1/director-dashboard (Director suite)", () => {
  it("403s non-staff roles", async () => {
    const denied = await api("/v1/director-dashboard/overview", {
      headers: cookieHeaders(student.cookie),
    });
    expect(denied.status).toBe(403);
  });

  it.each([
    "/v1/director-dashboard/overview",
    "/v1/director-dashboard/okrs",
    "/v1/director-dashboard/branches",
    "/v1/director-dashboard/modules",
    "/v1/director-dashboard/saved",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns overview KPIs with value labels", async () => {
    const res = await api("/v1/director-dashboard/overview", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string; delta: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("Objectives");
    expect(body.items[0]?.valueLabel).toBe("3");
    expect(body.items[0]?.delta).toBe("2 on track");
  });

  it("returns OKRs with objectives and progress", async () => {
    const res = await api("/v1/director-dashboard/okrs", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; objectiveLabel: string; krLabel: string; pct: number }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(6);
    expect(body.items[0]?.objectiveLabel).toContain("O1");
    expect(body.items[0]?.krLabel).toBe("Complete fall admissions cycle");
    expect(body.items[0]?.pct).toBe(92);
  });

  it("returns branch locations with utilization", async () => {
    const res = await api("/v1/director-dashboard/branches", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; utilization: string; cost: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.name).toBe("Ikeja HQ");
    expect(body.items[0]?.utilization).toBe("86%");
    expect(body.items[0]?.cost).toBe("₦8.2/seat-day");
    expect(body.items[0]?.status).toBe("High");
  });

  it("returns dashboard modules", async () => {
    const res = await api("/v1/director-dashboard/modules", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; detail: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(6);
    expect(body.items[0]?.name).toBe("Finance");
    expect(body.items[0]?.detail).toBe("P&L · cash flow · budget");
  });

  it("returns saved reports", async () => {
    const res = await api("/v1/director-dashboard/saved", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; detail: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.name).toBe("Board pack — Q3");
    expect(body.items[0]?.detail).toBe("Generated Aug 1 · PDF");
  });

  it("paginates with cursor", async () => {
    const first = await api("/v1/director-dashboard/okrs?limit=2", {
      headers: cookieHeaders(staff.cookie),
    });
    const firstBody = (await first.json()) as {
      items: Array<{ id: string }>;
      nextCursor?: string;
    };
    expect(firstBody.items).toHaveLength(2);
    expect(firstBody.nextCursor).toBeTruthy();

    const second = await api(
      `/v1/director-dashboard/okrs?limit=2&cursor=${firstBody.nextCursor ?? ""}`,
      { headers: cookieHeaders(staff.cookie) },
    );
    const secondBody = (await second.json()) as { items: Array<{ id: string }> };
    expect(secondBody.items[0]?.id).not.toBe(firstBody.items[0]?.id);
  });

  it("404s unknown collections", async () => {
    const res = await api("/v1/director-dashboard/bogus", {
      headers: cookieHeaders(staff.cookie),
    });
    expect(res.status).toBe(404);
  });
});
