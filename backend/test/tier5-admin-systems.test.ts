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

describe("GET /v1/admin-systems-dashboard (Admin systems suite)", () => {
  it("403s non-staff roles", async () => {
    const denied = await api("/v1/admin-systems-dashboard/overview", {
      headers: cookieHeaders(student.cookie),
    });
    expect(denied.status).toBe(403);
  });

  it.each([
    "/v1/admin-systems-dashboard/overview",
    "/v1/admin-systems-dashboard/keys",
    "/v1/admin-systems-dashboard/backups",
    "/v1/admin-systems-dashboard/integrations",
    "/v1/admin-systems-dashboard/rules",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns overview KPIs with value labels", async () => {
    const res = await api("/v1/admin-systems-dashboard/overview", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string; delta: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("Users");
    expect(body.items[0]?.valueLabel).toBe("8,412");
    expect(body.items[0]?.delta).toBe("+214 this month");
  });

  it("returns API keys with scopes and last used", async () => {
    const res = await api("/v1/admin-systems-dashboard/keys", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; scope: string; lastUsed: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.name).toBe("ci-deploy");
    expect(body.items[0]?.scope).toBe("deploy:prod");
    expect(body.items[0]?.lastUsed).toBe("Rotated Jul 30");
    expect(body.items[0]?.status).toBe("Active");
  });

  it("returns backups with dates and sizes", async () => {
    const res = await api("/v1/admin-systems-dashboard/backups", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; detail: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(5);
    expect(body.items[0]?.name).toBe("Production · nightly");
    expect(body.items[0]?.detail).toBe("Jul 31 · 02:00 · 8.4 GB");
    expect(body.items[0]?.status).toBe("Verified");
  });

  it("returns integrations with connection statuses", async () => {
    const res = await api("/v1/admin-systems-dashboard/integrations", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; detail: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.name).toBe("GitHub");
    expect(body.items[0]?.detail).toBe("3 repos · 12 workflows");
    expect(body.items[0]?.status).toBe("Connected");
  });

  it("returns rate limit rules with value labels", async () => {
    const res = await api("/v1/admin-systems-dashboard/rules", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; valueLabel: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(6);
    expect(body.items[0]?.name).toBe("Global");
    expect(body.items[0]?.valueLabel).toBe("1,000 req/min");
    expect(body.items[0]?.status).toBe("Active");
  });

  it("paginates with cursor", async () => {
    const first = await api("/v1/admin-systems-dashboard/keys?limit=2", {
      headers: cookieHeaders(staff.cookie),
    });
    const firstBody = (await first.json()) as {
      items: Array<{ id: string }>;
      nextCursor?: string;
    };
    expect(firstBody.items).toHaveLength(2);
    expect(firstBody.nextCursor).toBeTruthy();

    const second = await api(
      `/v1/admin-systems-dashboard/keys?limit=2&cursor=${firstBody.nextCursor ?? ""}`,
      { headers: cookieHeaders(staff.cookie) },
    );
    const secondBody = (await second.json()) as { items: Array<{ id: string }> };
    expect(secondBody.items[0]?.id).not.toBe(firstBody.items[0]?.id);
  });

  it("404s unknown collections", async () => {
    const res = await api("/v1/admin-systems-dashboard/bogus", {
      headers: cookieHeaders(staff.cookie),
    });
    expect(res.status).toBe(404);
  });
});

describe("POST /v1/admin-systems-dashboard/keys/:id/rotate", () => {
  it("rotates a key for admins and returns a one-time token", async () => {
    const res = await api("/v1/admin-systems-dashboard/keys/adm-ky-01/rotate", {
      method: "POST",
      headers: cookieHeaders(staff.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      ok: boolean;
      id: string;
      token: string;
      rotatedAt: string;
    };
    expect(body.ok).toBe(true);
    expect(body.id).toBe("adm-ky-01");
    expect(body.token).toMatch(/^cea_[a-f0-9]{48}$/);
    expect(body.rotatedAt).toBeTruthy();
  });

  it("rejects non-admins and unknown keys", async () => {
    const denied = await api("/v1/admin-systems-dashboard/keys/adm-ky-01/rotate", {
      method: "POST",
      headers: cookieHeaders(student.cookie),
    });
    expect(denied.status).toBe(403);

    const missing = await api("/v1/admin-systems-dashboard/keys/missing/rotate", {
      method: "POST",
      headers: cookieHeaders(staff.cookie),
    });
    expect(missing.status).toBe(404);
  });
});
