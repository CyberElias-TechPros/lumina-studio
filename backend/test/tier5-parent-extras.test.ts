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

describe("GET /v1/parent-extras-dashboard (Parent extras suite)", () => {
  it("403s non-staff roles", async () => {
    const res = await api("/v1/parent-extras-dashboard/contacts", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(200);

    const mentor = await createTestSession("mentor@cea.ng");
    const denied = await api("/v1/parent-extras-dashboard/contacts", {
      headers: cookieHeaders(mentor.cookie),
    });
    expect(denied.status).toBe(403);
  });

  it.each([
    "/v1/parent-extras-dashboard/contacts",
    "/v1/parent-extras-dashboard/meetings",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns contacts with names and roles", async () => {
    const res = await api("/v1/parent-extras-dashboard/contacts", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; role: string; kind: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.name).toBe("Mr. Adeyemi");
    expect(body.items[0]?.role).toBe("Full-Stack instructor");
    expect(body.items[0]?.kind).toBe("Message");
  });

  it("returns meetings with dates and statuses", async () => {
    const res = await api("/v1/parent-extras-dashboard/meetings", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; dateLabel: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.title).toBe("Parent–teacher meeting");
    expect(body.items[0]?.dateLabel).toBe("Sep 5–9, 2026");
    expect(body.items[0]?.status).toBe("Booking open");
  });

  it("paginates with cursor", async () => {
    const first = await api("/v1/parent-extras-dashboard/contacts?limit=2", {
      headers: cookieHeaders(staff.cookie),
    });
    const firstBody = (await first.json()) as {
      items: Array<{ id: string }>;
      nextCursor?: string;
    };
    expect(firstBody.items).toHaveLength(2);
    expect(firstBody.nextCursor).toBeTruthy();

    const second = await api(
      `/v1/parent-extras-dashboard/contacts?limit=2&cursor=${firstBody.nextCursor ?? ""}`,
      { headers: cookieHeaders(staff.cookie) },
    );
    const secondBody = (await second.json()) as { items: Array<{ id: string }> };
    expect(secondBody.items[0]?.id).not.toBe(firstBody.items[0]?.id);
  });

  it("404s unknown collections", async () => {
    const res = await api("/v1/parent-extras-dashboard/bogus", {
      headers: cookieHeaders(staff.cookie),
    });
    expect(res.status).toBe(404);
  });
});
