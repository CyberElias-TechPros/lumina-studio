import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let student: TestSession;
let admin: TestSession;
let itStaff: TestSession;

beforeAll(async () => {
  await setupDb();
  student = await createTestSession("student@cea.ng");
  admin = await createTestSession("admin@cea.ng");
  itStaff = await createTestSession("it@cea.ng");
});

describe("GET /v1/it (IT support suite)", () => {
  it("403s non-staff roles", async () => {
    const res = await api("/v1/it/tickets", { headers: cookieHeaders(student.cookie) });
    expect(res.status).toBe(403);
  });

  it.each([
    "/v1/it/tickets",
    "/v1/it/articles",
    "/v1/it/assets",
    "/v1/it/licenses",
    "/v1/it/services",
    "/v1/it/windows",
    "/v1/it/sessions",
    "/v1/it/templates",
    "/v1/it/accounts",
  ])("lists %s for an admin", async (path) => {
    const res = await api(path, { headers: cookieHeaders(admin.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns the ticket detail with camelCase events for an IT user", async () => {
    const res = await api("/v1/it/tickets/TKT-1042", {
      headers: cookieHeaders(itStaff.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      id: string;
      subject: string;
      priority: string;
      events: Array<{ event: string; whenText: string }>;
    };
    expect(body.subject).toBe("Projector fails in Lab 2");
    expect(body.priority).toBe("P1");
    expect(body.events.length).toBeGreaterThanOrEqual(1);
    expect(body.events[0]?.whenText).toBeTruthy();
  });

  it("404s for an unknown ticket", async () => {
    const res = await api("/v1/it/tickets/TKT-9999", {
      headers: cookieHeaders(admin.cookie),
    });
    expect(res.status).toBe(404);
  });
});
