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

describe("GET /v1/admissions-extras-dashboard (Admissions extras suite)", () => {
  it("403s non-staff roles", async () => {
    const denied = await api("/v1/admissions-extras-dashboard/docOverview", {
      headers: cookieHeaders(student.cookie),
    });
    expect(denied.status).toBe(403);
  });

  it.each([
    "/v1/admissions-extras-dashboard/docOverview",
    "/v1/admissions-extras-dashboard/checks",
    "/v1/admissions-extras-dashboard/commOverview",
    "/v1/admissions-extras-dashboard/templates",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns document overview KPIs with value labels", async () => {
    const res = await api("/v1/admissions-extras-dashboard/docOverview", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string; delta: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("Verified");
    expect(body.items[0]?.valueLabel).toBe("1,206");
    expect(body.items[0]?.delta).toBe("of 1,322 docs");
  });

  it("returns document checks with statuses", async () => {
    const res = await api("/v1/admissions-extras-dashboard/checks", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; detail: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.name).toBe("National ID verification");
    expect(body.items[0]?.detail).toBe("92% complete · 9 pending");
    expect(body.items[0]?.status).toBe("On track");
  });

  it("returns communication overview KPIs with value labels", async () => {
    const res = await api("/v1/admissions-extras-dashboard/commOverview", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string; delta: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("Sent (30d)");
    expect(body.items[0]?.valueLabel).toBe("412");
    expect(body.items[0]?.delta).toBe("10 templates");
  });

  it("returns communication templates with usage", async () => {
    const res = await api("/v1/admissions-extras-dashboard/templates", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; usage: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.title).toBe("Offer letter — full-time");
    expect(body.items[0]?.usage).toBe("Sent 24x this month");
    expect(body.items[0]?.status).toBe("Published");
  });

  it("paginates with cursor", async () => {
    const first = await api("/v1/admissions-extras-dashboard/templates?limit=2", {
      headers: cookieHeaders(staff.cookie),
    });
    const firstBody = (await first.json()) as {
      items: Array<{ id: string }>;
      nextCursor?: string;
    };
    expect(firstBody.items).toHaveLength(2);
    expect(firstBody.nextCursor).toBeTruthy();

    const second = await api(
      `/v1/admissions-extras-dashboard/templates?limit=2&cursor=${firstBody.nextCursor ?? ""}`,
      { headers: cookieHeaders(staff.cookie) },
    );
    const secondBody = (await second.json()) as { items: Array<{ id: string }> };
    expect(secondBody.items[0]?.id).not.toBe(firstBody.items[0]?.id);
  });

  it("404s unknown collections", async () => {
    const res = await api("/v1/admissions-extras-dashboard/bogus", {
      headers: cookieHeaders(staff.cookie),
    });
    expect(res.status).toBe(404);
  });
});
