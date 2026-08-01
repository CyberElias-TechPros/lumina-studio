import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

describe("GET /v1/calendar/events", () => {
  it("returns 401 without a session", async () => {
    const res = await api("/v1/calendar/events");
    expect(res.status).toBe(401);
  });

  it("returns seeded calendar events as Paginated<CalendarEvent>", async () => {
    const { cookie } = await createTestSession("student@cea.ng");
    const res = await api("/v1/calendar/events", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      items: Array<{
        id: string;
        date: string;
        day: string;
        title: string;
        kind: string;
        time: string;
        location: string;
      }>;
      total: number;
    };
    expect(body.total).toBe(10);
    expect(body.items.length).toBe(10);
    const c1 = body.items.find((e) => e.id === "c1");
    expect(c1?.kind).toBe("class");
    expect(c1?.time).toBe("10:00–12:00");
    const c10 = body.items.find((e) => e.id === "c10");
    expect(c10?.kind).toBe("exam");
    const kinds = new Set(body.items.map((e) => e.kind));
    expect(kinds).toEqual(new Set(["class", "deadline", "mentor", "event", "exam"]));
  });

  it("is available to any authenticated role", async () => {
    const { cookie } = await createTestSession("instructor@cea.ng");
    const res = await api("/v1/calendar/events", { headers: cookieHeaders(cookie) });
    expect(res.status).toBe(200);
  });
});
