import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let staff: TestSession;
let growth: TestSession;

beforeAll(async () => {
  await setupDb();
  staff = await createTestSession("admin@cea.ng");
  growth = await createTestSession("growth@cea.ng");
});

describe("GET /v1/growth-dashboard (Growth suite)", () => {
  it("403s non-staff roles", async () => {
    const res = await api("/v1/growth-dashboard/overview", {
      headers: cookieHeaders(growth.cookie),
    });
    expect(res.status).toBe(200);

    const mentor = await createTestSession("mentor@cea.ng");
    const denied = await api("/v1/growth-dashboard/overview", {
      headers: cookieHeaders(mentor.cookie),
    });
    expect(denied.status).toBe(403);
  });

  it.each([
    "/v1/growth-dashboard/overview",
    "/v1/growth-dashboard/simulations",
    "/v1/growth-dashboard/funnel",
    "/v1/growth-dashboard/experiments",
    "/v1/growth-dashboard/cohorts",
    "/v1/growth-dashboard/channels",
    "/v1/growth-dashboard/referrals",
    "/v1/growth-dashboard/seo",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns overview KPIs with value labels", async () => {
    const res = await api("/v1/growth-dashboard/overview", {
      headers: cookieHeaders(growth.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string; delta: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("New learners");
    expect(body.items[0]?.valueLabel).toBe("148");
    expect(body.items[0]?.delta).toBe("+22% MoM");
  });

  it("returns simulator scenarios with numeric conversion", async () => {
    const res = await api("/v1/growth-dashboard/simulations", {
      headers: cookieHeaders(growth.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{
        id: string;
        name: string;
        conversionPct: number;
        learners: number;
      }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.name).toBe("Base case");
    expect(body.items[0]?.conversionPct).toBe(16);
    expect(body.items[0]?.learners).toBe(612);
    expect(body.items[1]?.name).toBe("Referral push");
  });

  it("returns funnel stages with visitors and deltas", async () => {
    const res = await api("/v1/growth-dashboard/funnel", {
      headers: cookieHeaders(growth.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; visitors: number; delta: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(5);
    expect(body.items[0]?.name).toBe("Visitors");
    expect(body.items[0]?.visitors).toBe(14200);
    expect(body.items[4]?.name).toBe("Paying");
    expect(body.items[4]?.visitors).toBe(891);
  });

  it("returns experiments with hypotheses and statuses", async () => {
    const res = await api("/v1/growth-dashboard/experiments", {
      headers: cookieHeaders(growth.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; hypothesis: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.title).toBe("WhatsApp onboarding nudges");
    expect(body.items[0]?.hypothesis).toBe("WhatsApp nudges lift week-1 activation");
    expect(body.items[0]?.status).toBe("Winning");
  });

  it("returns cohort retention grid with nullable weeks", async () => {
    const res = await api("/v1/growth-dashboard/cohorts", {
      headers: cookieHeaders(growth.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; w1: number; w6: number | null }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(5);
    expect(body.items[0]?.name).toBe("W1");
    expect(body.items[0]?.w1).toBe(100);
    expect(body.items[0]?.w6).toBe(68);
    expect(body.items[4]?.w6).toBeNull();
  });

  it("returns channel attribution with CAC/LTV/ROAS", async () => {
    const res = await api("/v1/growth-dashboard/channels", {
      headers: cookieHeaders(growth.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; cac: string; ltv: string; roas: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(5);
    expect(body.items[0]?.name).toBe("Referral");
    expect(body.items[0]?.cac).toBe("₦42k");
    expect(body.items[0]?.roas).toBe("7.4x");
  });

  it("returns referral campaigns with paid amounts", async () => {
    const res = await api("/v1/growth-dashboard/referrals", {
      headers: cookieHeaders(growth.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{
        id: string;
        name: string;
        invites: number;
        conversions: number;
        paidOut: string;
        status: string;
      }>;
      total: number;
    };
    expect(body.items[0]?.name).toBe("Learner invites learner");
    expect(body.items[0]?.invites).toBe(412);
    expect(body.items[0]?.paidOut).toBe("₦1.2m");
    expect(body.items[2]?.status).toBe("Scheduled");
  });

  it("returns SEO keyword clusters with priorities", async () => {
    const res = await api("/v1/growth-dashboard/seo", {
      headers: cookieHeaders(growth.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; keyword: string; volume: number; priority: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(5);
    expect(body.items[0]?.keyword).toBe("Bootcamps in Lagos");
    expect(body.items[0]?.volume).toBe(4800);
    expect(body.items[0]?.priority).toBe("High");
  });

  it("paginates with cursor", async () => {
    const first = await api("/v1/growth-dashboard/experiments?limit=2", {
      headers: cookieHeaders(staff.cookie),
    });
    const firstBody = (await first.json()) as {
      items: Array<{ id: string }>;
      nextCursor?: string;
    };
    expect(firstBody.items).toHaveLength(2);
    expect(firstBody.nextCursor).toBeTruthy();

    const second = await api(
      `/v1/growth-dashboard/experiments?limit=2&cursor=${firstBody.nextCursor ?? ""}`,
      { headers: cookieHeaders(staff.cookie) },
    );
    const secondBody = (await second.json()) as { items: Array<{ id: string }> };
    expect(secondBody.items[0]?.id).not.toBe(firstBody.items[0]?.id);
  });

  it("404s unknown collections", async () => {
    const res = await api("/v1/growth-dashboard/bogus", {
      headers: cookieHeaders(staff.cookie),
    });
    expect(res.status).toBe(404);
  });
});
