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

describe("GET /v1/conversion-copy-dashboard (Conversion copy suite)", () => {
  it("403s students", async () => {
    const denied = await api("/v1/conversion-copy-dashboard/overview", {
      headers: cookieHeaders(student.cookie),
    });
    expect(denied.status).toBe(403);
  });

  it.each([
    "/v1/conversion-copy-dashboard/overview",
    "/v1/conversion-copy-dashboard/assets",
    "/v1/conversion-copy-dashboard/rules",
    "/v1/conversion-copy-dashboard/sequences",
    "/v1/conversion-copy-dashboard/briefs",
    "/v1/conversion-copy-dashboard/analytics",
    "/v1/conversion-copy-dashboard/ads",
    "/v1/conversion-copy-dashboard/tests",
    "/v1/conversion-copy-dashboard/sections",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns overview KPIs with value labels", async () => {
    const res = await api("/v1/conversion-copy-dashboard/overview", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string; delta: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("Assets");
    expect(body.items[0]?.valueLabel).toBe("214");
    expect(body.items[0]?.delta).toBe("112 email · 64 page");
  });

  it("returns library assets with variant counts", async () => {
    const res = await api("/v1/conversion-copy-dashboard/assets", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; category: string; variants: number; lastUsed: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.title).toBe("Enrolment page H1 set");
    expect(body.items[0]?.variants).toBe(12);
    expect(body.items[0]?.lastUsed).toBe("Jul 28");
    expect(body.items[2]?.status).toBe("Draft");
  });

  it("returns style-guide rules with categories", async () => {
    const res = await api("/v1/conversion-copy-dashboard/rules", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; category: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.name).toBe("Tone");
    expect(body.items[0]?.category).toBe("Voice");
    expect(body.items[0]?.status).toBe("Enforced");
  });

  it("returns email sequences with open/click rates", async () => {
    const res = await api("/v1/conversion-copy-dashboard/sequences", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; emails: number; openRate: string; clickRate: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.title).toBe("Application follow-up");
    expect(body.items[0]?.emails).toBe(5);
    expect(body.items[0]?.openRate).toBe("42%");
    expect(body.items[0]?.clickRate).toBe("9.1%");
    expect(body.items[0]?.status).toBe("Live");
  });

  it("returns briefs with requesters and dates", async () => {
    const res = await api("/v1/conversion-copy-dashboard/briefs", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; requester: string; dateLabel: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.title).toBe("Cohort 17 landing refresh");
    expect(body.items[0]?.requester).toBe("Marketing");
    expect(body.items[0]?.dateLabel).toBe("Jul 31");
    expect(body.items[0]?.status).toBe("In progress");
  });

  it("returns conversion analytics with deltas", async () => {
    const res = await api("/v1/conversion-copy-dashboard/analytics", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; stage: string; visits: string; conversion: string; delta: string }>;
      total: number;
    };
    expect(body.items[0]?.stage).toBe("Organic → application");
    expect(body.items[0]?.visits).toBe("18.4k");
    expect(body.items[0]?.conversion).toBe("5.4%");
    expect(body.items[0]?.delta).toBe("+0.8 pts");
  });

  it("returns ad sets with channels and CTR", async () => {
    const res = await api("/v1/conversion-copy-dashboard/ads", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; channel: string; ctr: string; variants: number; status: string }>;
      total: number;
    };
    expect(body.items[0]?.name).toBe("Cohort 17 launch");
    expect(body.items[0]?.channel).toBe("Meta");
    expect(body.items[0]?.ctr).toBe("2.1%");
    expect(body.items[0]?.variants).toBe(4);
    expect(body.items[0]?.status).toBe("Running");
  });

  it("returns A/B tests with results", async () => {
    const res = await api("/v1/conversion-copy-dashboard/tests", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; result: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.title).toBe("Enrolment H1 · A vs B");
    expect(body.items[0]?.result).toBe("B wins +12% · deployed");
    expect(body.items[0]?.status).toBe("Winner");
  });

  it("returns landing-page sections with copy", async () => {
    const res = await api("/v1/conversion-copy-dashboard/sections", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; copy: string; conversion: string }>;
      total: number;
    };
    expect(body.items[0]?.title).toBe("Hero");
    expect(body.items[0]?.copy).toContain("Cohort 17 applications open");
    expect(body.items[0]?.conversion).toBe("6.2%");
  });

  it("404s unknown collections", async () => {
    const res = await api("/v1/conversion-copy-dashboard/bogus", {
      headers: cookieHeaders(staff.cookie),
    });
    expect(res.status).toBe(404);
  });
});