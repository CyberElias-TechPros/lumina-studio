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

describe("GET /v1/dev-dashboard (Dev suite)", () => {
  it("403s non-staff roles", async () => {
    const res = await api("/v1/dev-dashboard/prs", {
      headers: cookieHeaders(student.cookie),
    });
    // dev is admin+instructor+student; a mentor must be denied
    expect(res.status).toBe(200);

    const mentor = await createTestSession("mentor@cea.ng");
    const denied = await api("/v1/dev-dashboard/prs", {
      headers: cookieHeaders(mentor.cookie),
    });
    expect(denied.status).toBe(403);
  });

  it.each([
    "/v1/dev-dashboard/overview",
    "/v1/dev-dashboard/endpoints",
    "/v1/dev-dashboard/deploys",
    "/v1/dev-dashboard/prs",
    "/v1/dev-dashboard/errors",
    "/v1/dev-dashboard/tasks",
    "/v1/dev-dashboard/deps",
    "/v1/dev-dashboard/reviews",
    "/v1/dev-dashboard/vars",
    "/v1/dev-dashboard/queues",
    "/v1/dev-dashboard/docs",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns overview KPIs with value labels", async () => {
    const res = await api("/v1/dev-dashboard/overview", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string; delta: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("Open PRs");
    expect(body.items[0]?.valueLabel).toBe("9");
  });

  it("returns deploys with versionLabel and timeLabel", async () => {
    const res = await api("/v1/dev-dashboard/deploys", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; versionLabel: string; status: string; timeLabel: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.versionLabel).toContain("v1.42.0");
    expect(body.items[0]?.status).toBe("Live");
    expect(body.items[2]?.status).toBe("Rolled back");
  });

  it("returns PRs with branch and status", async () => {
    const res = await api("/v1/dev-dashboard/prs", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; branch: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.title).toContain("invoice webhooks");
    expect(body.items[0]?.branch).toContain("feat/invoice-webhooks");
    expect(body.items[0]?.status).toBe("Checks passed");
  });

  it("returns errors with countLabel and status", async () => {
    const res = await api("/v1/dev-dashboard/errors", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; countLabel: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.countLabel).toBe("2 in 24h");
    expect(body.items[0]?.status).toBe("New");
    expect(body.items[2]?.status).toBe("Fixed");
  });

  it("returns environment vars with key, value and env", async () => {
    const res = await api("/v1/dev-dashboard/vars", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; key: string; value: string; env: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.key).toBe("VITE_API_URL");
    expect(body.items[0]?.env).toBe("Prod");
  });

  it("returns queues with detail and status", async () => {
    const res = await api("/v1/dev-dashboard/queues", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; detail: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.name).toBe("email");
    expect(body.items[0]?.status).toBe("Healthy");
    expect(body.items[2]?.status).toBe("Processing");
  });

  it("returns docs with updatedLabel", async () => {
    const res = await api("/v1/dev-dashboard/docs", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; updatedLabel: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.title).toBe("API reference v3");
    expect(body.items[0]?.updatedLabel).toContain("84 endpoints");
  });
});