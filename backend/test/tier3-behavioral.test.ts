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

describe("GET /v1/behavioral-dashboard (Behavioral design suite)", () => {
  it("allows students on behavioral lists", async () => {
    const res = await api("/v1/behavioral-dashboard/interventions", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(200);
  });

  it.each([
    "/v1/behavioral-dashboard/overview",
    "/v1/behavioral-dashboard/interventions",
    "/v1/behavioral-dashboard/flows",
    "/v1/behavioral-dashboard/flow-steps",
    "/v1/behavioral-dashboard/campaigns",
    "/v1/behavioral-dashboard/tests",
    "/v1/behavioral-dashboard/results",
    "/v1/behavioral-dashboard/stages",
    "/v1/behavioral-dashboard/segments",
    "/v1/behavioral-dashboard/programs",
    "/v1/behavioral-dashboard/checkins",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns overview KPIs with value labels", async () => {
    const res = await api("/v1/behavioral-dashboard/overview", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string; delta: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("Live experiments");
    expect(body.items[0]?.valueLabel).toBe("7");
  });

  it("returns interventions with effort, evidence and testsRun", async () => {
    const res = await api("/v1/behavioral-dashboard/interventions", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{
        id: string;
        title: string;
        effort: string;
        testsRun: number;
        status: string;
      }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.title).toBe("Streak & streak-saver");
    expect(body.items[0]?.testsRun).toBe(100);
    expect(body.items[0]?.status).toBe("Live");
  });

  it("returns campaigns with channel, sends and optOut", async () => {
    const res = await api("/v1/behavioral-dashboard/campaigns", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; channel: string; sends: string; optOut: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.channel).toBe("WhatsApp");
    expect(body.items[0]?.sends).toBe("1,240");
    expect(body.items[0]?.optOut).toBe("0.8%");
  });

  it("returns funnel stages with users and percent", async () => {
    const res = await api("/v1/behavioral-dashboard/stages", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; users: number; percent: number }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(5);
    expect(body.items[0]?.name).toBe("Signup");
    expect(body.items[0]?.users).toBe(8400);
    expect(body.items[0]?.percent).toBe(100);
    expect(body.items[2]?.percent).toBe(46);
  });

  it("returns checkins with learner and streak", async () => {
    const res = await api("/v1/behavioral-dashboard/checkins", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; learner: string; streak: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.learner).toBe("Ada Obi");
    expect(body.items[0]?.streak).toBe("21d");
  });
});