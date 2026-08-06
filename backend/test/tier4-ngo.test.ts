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

describe("GET /v1/ngo-dashboard (NGO partnership suite)", () => {
  it("403s non-staff roles", async () => {
    const res = await api("/v1/ngo-dashboard/overview", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(200);

    const mentor = await createTestSession("mentor@cea.ng");
    const denied = await api("/v1/ngo-dashboard/overview", {
      headers: cookieHeaders(mentor.cookie),
    });
    expect(denied.status).toBe(403);
  });

  it.each([
    "/v1/ngo-dashboard/overview",
    "/v1/ngo-dashboard/funds",
    "/v1/ngo-dashboard/programs",
    "/v1/ngo-dashboard/expenses",
    "/v1/ngo-dashboard/teams",
    "/v1/ngo-dashboard/transactions",
    "/v1/ngo-dashboard/reports",
    "/v1/ngo-dashboard/metrics",
    "/v1/ngo-dashboard/threads",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns overview KPIs with value labels", async () => {
    const res = await api("/v1/ngo-dashboard/overview", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string; delta: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("Scholarships funded");
    expect(body.items[0]?.valueLabel).toBe("38");
    expect(body.items[0]?.delta).toBe("₦12.4m disbursed");
  });

  it("returns scholarship funds with statuses", async () => {
    const res = await api("/v1/ngo-dashboard/funds", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; scholars: string; amount: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.name).toBe("Girls in Tech · Cohort 16");
    expect(body.items[0]?.scholars).toBe("18 scholars");
    expect(body.items[0]?.amount).toBe("₦1.2m in tuition");
    expect(body.items[0]?.status).toBe("Active");
  });

  it("returns community programs with locations", async () => {
    const res = await api("/v1/ngo-dashboard/programs", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; location: string; beneficiaries: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.name).toBe("STEM Saturdays");
    expect(body.items[0]?.location).toBe("Lagos");
    expect(body.items[0]?.beneficiaries).toBe("480 beneficiaries");
    expect(body.items[0]?.status).toBe("Ongoing");
  });

  it("returns program budget expense lines", async () => {
    const res = await api("/v1/ngo-dashboard/expenses", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; amount: string; pct: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.title).toBe("Facilitator stipends");
    expect(body.items[0]?.amount).toBe("₦1.8m");
    expect(body.items[0]?.pct).toBe("36%");
    expect(body.items[0]?.status).toBe("On track");
  });

  it("returns volunteer teams with slots", async () => {
    const res = await api("/v1/ngo-dashboard/teams", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; volunteers: number; slots: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.name).toBe("STEM Saturdays · facilitators");
    expect(body.items[0]?.volunteers).toBe(12);
    expect(body.items[0]?.slots).toBe("8 slots left");
    expect(body.items[0]?.status).toBe("Recruiting");
  });

  it("returns donation transactions with directions", async () => {
    const res = await api("/v1/ngo-dashboard/transactions", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; amount: string; dateLabel: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.title).toBe("Global Giving grant");
    expect(body.items[0]?.amount).toBe("₦18.0m inbound");
    expect(body.items[0]?.dateLabel).toBe("Jul 14");
    expect(body.items[0]?.status).toBe("Received");
  });

  it("returns impact reports with statuses", async () => {
    const res = await api("/v1/ngo-dashboard/reports", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; detail: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.title).toBe("Impact report · H1 2026");
    expect(body.items[0]?.detail).toBe("740 beneficiaries · ₦8.2m deployed");
    expect(body.items[0]?.status).toBe("Published");
  });

  it("returns partner metrics with values", async () => {
    const res = await api("/v1/ngo-dashboard/metrics", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; label: string; value: string; delta: string }>;
      total: number;
    };
    expect(body.items[0]?.label).toBe("Cost per beneficiary");
    expect(body.items[0]?.value).toBe("₦6,600");
    expect(body.items[0]?.delta).toBe("down 12% YoY");
  });

  it("returns messaging threads with labels", async () => {
    const res = await api("/v1/ngo-dashboard/threads", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; fromLabel: string; timeLabel: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.title).toBe("Scholarship cohort 16 disbursement");
    expect(body.items[0]?.fromLabel).toBe("CEA finance");
    expect(body.items[0]?.timeLabel).toBe("Jul 29 · 11:02");
    expect(body.items[0]?.status).toBe("Open");
  });

  it("404s unknown collections", async () => {
    const res = await api("/v1/ngo-dashboard/bogus", {
      headers: cookieHeaders(staff.cookie),
    });
    expect(res.status).toBe(404);
  });
});