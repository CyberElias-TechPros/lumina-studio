import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let student: TestSession;
let admin: TestSession;
let ops: TestSession;

beforeAll(async () => {
  await setupDb();
  student = await createTestSession("student@cea.ng");
  admin = await createTestSession("admin@cea.ng");
  ops = await createTestSession("ops@cea.ng");
});

describe("GET /v1/ops (operations suite)", () => {
  it("403s non-staff roles", async () => {
    const res = await api("/v1/ops/inventory", { headers: cookieHeaders(student.cookie) });
    expect(res.status).toBe(403);
  });

  it.each([
    "/v1/ops/inventory",
    "/v1/ops/purchase-orders",
    "/v1/ops/branches",
    "/v1/ops/rooms",
    "/v1/ops/maintenance",
    "/v1/ops/vendors",
    "/v1/ops/contracts",
    "/v1/ops/tasks",
    "/v1/ops/workflows",
  ])("lists %s for an admin", async (path) => {
    const res = await api(path, { headers: cookieHeaders(admin.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns camelCase fields for branches", async () => {
    const res = await api("/v1/ops/branches", { headers: cookieHeaders(ops.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; occupied: number; costSeatDay: number }>;
    };
    const ikeja = body.items.find((b) => b.id === "br-01");
    expect(ikeja?.name).toBe("Ikeja HQ");
    expect(ikeja?.occupied).toBe(342);
    expect(ikeja?.costSeatDay).toBe(8200);
  });

  it("paginates with a cursor", async () => {
    const first = (await api("/v1/ops/tasks?limit=2", {
      headers: cookieHeaders(admin.cookie),
    })) as Response;
    expect(first.status).toBe(200);
    const page1 = (await first.json()) as { items: Array<{ id: string }>; nextCursor?: string };
    expect(page1.items).toHaveLength(2);
    if (page1.nextCursor) {
      const second = await api(`/v1/ops/tasks?cursor=${page1.nextCursor}`, {
        headers: cookieHeaders(admin.cookie),
      });
      expect(second.status).toBe(200);
      const page2 = (await second.json()) as { items: Array<{ id: string }> };
      expect(page2.items.length).toBeGreaterThanOrEqual(1);
      expect(page2.items[0]?.id).not.toBe(page1.items[0]?.id);
    }
  });
});
