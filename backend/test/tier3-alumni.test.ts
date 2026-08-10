import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let staff: TestSession;
let alumni: TestSession;

beforeAll(async () => {
  await setupDb();
  staff = await createTestSession("admin@cea.ng");
  alumni = await createTestSession("alumni@cea.ng");
});

describe("GET /v1/alumni-dashboard (Alumni suite)", () => {
  it("403s non-staff roles", async () => {
    const res = await api("/v1/alumni-dashboard/events", {
      headers: cookieHeaders(alumni.cookie),
    });
    // alumni + admin are allowed; an unrelated role must be denied
    expect(res.status).toBe(200);

    const mentor = await createTestSession("mentor@cea.ng");
    const denied = await api("/v1/alumni-dashboard/events", {
      headers: cookieHeaders(mentor.cookie),
    });
    expect(denied.status).toBe(403);
  });

  it.each([
    "/v1/alumni-dashboard/overview",
    "/v1/alumni-dashboard/events",
    "/v1/alumni-dashboard/members",
    "/v1/alumni-dashboard/stories",
    "/v1/alumni-dashboard/milestones",
    "/v1/alumni-dashboard/jobs",
    "/v1/alumni-dashboard/achievements",
    "/v1/alumni-dashboard/skills",
    "/v1/alumni-dashboard/commitments",
    "/v1/alumni-dashboard/ways",
    "/v1/alumni-dashboard/impact",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns overview KPIs with value labels", async () => {
    const res = await api("/v1/alumni-dashboard/overview", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string; delta: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("Connections");
    expect(body.items[0]?.valueLabel).toBe("86");
  });

  it("returns events with location, going and status", async () => {
    const res = await api("/v1/alumni-dashboard/events", {
      headers: cookieHeaders(alumni.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; location: string; going: number; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.title).toBe("Cohort 12 reunion");
    expect(body.items[0]?.going).toBe(74);
    expect(body.items[0]?.status).toBe("Going");
  });

  it("returns members with cohort, roleLabel and city", async () => {
    const res = await api("/v1/alumni-dashboard/members", {
      headers: cookieHeaders(alumni.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; roleLabel: string; city: string; conn: number }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.name).toBe("Amina Suleiman");
    expect(body.items[0]?.roleLabel).toBe("SRE @ Paystack");
    expect(body.items[0]?.conn).toBe(1);
  });

  it("returns stories with company, role and excerpt", async () => {
    const res = await api("/v1/alumni-dashboard/stories", {
      headers: cookieHeaders(alumni.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; company: string; role: string; excerpt: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(6);
    expect(body.items[0]?.name).toBe("Tunde Bakare");
    expect(body.items[0]?.company).toBe("Paystack");
    expect(body.items[0]?.excerpt).toContain("offer");
  });

  it("returns jobs with period, place and current flag", async () => {
    const res = await api("/v1/alumni-dashboard/jobs", {
      headers: cookieHeaders(alumni.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; role: string; company: string; period: string; current: number }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.role).toBe("Frontend Engineer");
    expect(body.items[0]?.company).toBe("Kuda");
    expect(body.items[0]?.current).toBe(1);
  });

  it("returns commitments with mentee and cadence", async () => {
    const res = await api("/v1/alumni-dashboard/commitments", {
      headers: cookieHeaders(alumni.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; mentee: string; cadence: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.mentee).toBe("Ada Okafor");
    expect(body.items[0]?.cadence).toBe("Fortnightly 1:1");
    expect(body.items[0]?.status).toBe("Active");
  });

  it("returns impact rows with value and label", async () => {
    const res = await api("/v1/alumni-dashboard/impact", {
      headers: cookieHeaders(alumni.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; value: string; label: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.value).toBe("2");
    expect(body.items[0]?.label).toBe("scholarships funded");
  });
});