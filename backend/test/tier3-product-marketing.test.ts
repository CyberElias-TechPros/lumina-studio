import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let staff: TestSession;
let productMarketing: TestSession;

beforeAll(async () => {
  await setupDb();
  staff = await createTestSession("admin@cea.ng");
  productMarketing = await createTestSession("product-marketing@cea.ng");
});

describe("GET /v1/product-marketing-dashboard (Product marketing suite)", () => {
  it("403s non-staff roles on launch gates", async () => {
    const res = await api("/v1/product-marketing-dashboard/gates", {
      headers: cookieHeaders(productMarketing.cookie),
    });
    // product-marketing + admin are allowed; a mentor must be denied
    expect(res.status).toBe(200);

    const mentor = await createTestSession("mentor@cea.ng");
    const denied = await api("/v1/product-marketing-dashboard/gates", {
      headers: cookieHeaders(mentor.cookie),
    });
    expect(denied.status).toBe(403);
  });

  it.each([
    "/v1/product-marketing-dashboard/overview",
    "/v1/product-marketing-dashboard/phases",
    "/v1/product-marketing-dashboard/tasks",
    "/v1/product-marketing-dashboard/gates",
    "/v1/product-marketing-dashboard/statements",
    "/v1/product-marketing-dashboard/messagehouse",
    "/v1/product-marketing-dashboard/competitors",
    "/v1/product-marketing-dashboard/features",
    "/v1/product-marketing-dashboard/launches",
    "/v1/product-marketing-dashboard/readiness",
    "/v1/product-marketing-dashboard/studies",
    "/v1/product-marketing-dashboard/findings",
    "/v1/product-marketing-dashboard/matrix",
    "/v1/product-marketing-dashboard/briefs",
    "/v1/product-marketing-dashboard/months",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns overview KPIs with value labels", async () => {
    const res = await api("/v1/product-marketing-dashboard/overview", {
      headers: cookieHeaders(productMarketing.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string; delta: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("Launches in flight");
    expect(body.items[0]?.valueLabel).toBe("3");
  });

  it("returns launch phases with pct and status", async () => {
    const res = await api("/v1/product-marketing-dashboard/phases", {
      headers: cookieHeaders(productMarketing.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; launch: string; pct: number; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.launch).toContain("Parent app");
    expect(body.items[0]?.pct).toBe(100);
    expect(body.items[1]?.pct).toBe(64);
  });

  it("returns tasks with owner and status", async () => {
    const res = await api("/v1/product-marketing-dashboard/tasks", {
      headers: cookieHeaders(productMarketing.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; owner: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.owner).toBe("Chiamaka Eze");
    expect(body.items[0]?.status).toBe("Done");
    expect(body.items[3]?.status).toBe("Todo");
  });

  it("returns positioning statements with pain and benefit", async () => {
    const res = await api("/v1/product-marketing-dashboard/statements", {
      headers: cookieHeaders(productMarketing.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; product: string; pain: string; benefit: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.product).toBe("CEA-OS core LMS");
    expect(body.items[0]?.benefit).toBe("Hire-ready in 9 months");
  });

  it("returns competitor matrix features as 0/1 flags", async () => {
    const res = await api("/v1/product-marketing-dashboard/features", {
      headers: cookieHeaders(productMarketing.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; capability: string; cea: number; skilledge: number; aptbridge: number }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(5);
    expect(body.items[0]?.cea).toBe(1);
    expect(body.items[0]?.aptbridge).toBe(0);
    expect(body.items[3]?.aptbridge).toBe(0);
  });

  it("returns monthly performance bars", async () => {
    const res = await api("/v1/product-marketing-dashboard/months", {
      headers: cookieHeaders(productMarketing.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; month: string; roi: string; winRate: number; pct: number }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(6);
    expect(body.items[0]?.month).toBe("Feb");
    expect(body.items[0]?.pct).toBe(62);
    expect(body.items[5]?.pct).toBe(86);
  });
});