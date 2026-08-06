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

describe("GET /v1/volunteer-dashboard (Volunteer dashboard suite)", () => {
  it("allows students but 403s other roles on volunteer lists", async () => {
    const studentRes = await api("/v1/volunteer-dashboard/opportunities", {
      headers: cookieHeaders(student.cookie),
    });
    expect(studentRes.status).toBe(200);

    const mentor = await createTestSession("mentor@cea.ng");
    const mentorRes = await api("/v1/volunteer-dashboard/opportunities", {
      headers: cookieHeaders(mentor.cookie),
    });
    expect(mentorRes.status).toBe(403);
  });

  it.each([
    "/v1/volunteer-dashboard/opportunities",
    "/v1/volunteer-dashboard/signups",
    "/v1/volunteer-dashboard/impact",
    "/v1/volunteer-dashboard/hours",
    "/v1/volunteer-dashboard/groups",
    "/v1/volunteer-dashboard/certs",
    "/v1/volunteer-dashboard/months",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns opportunities with slots and camelCase fields", async () => {
    const res = await api("/v1/volunteer-dashboard/opportunities", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{
        id: string;
        title: string;
        dateLabel: string;
        locationLabel: string;
        slotsFilled: number;
        slotsTotal: number;
        priority: number;
      }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.title).toBe("Career fair booth support");
    expect(body.items[0]?.slotsFilled).toBeTypeOf("number");
    expect(body.items[0]?.slotsTotal).toBe(6);
  });

  it("returns impact metrics with value labels", async () => {
    const res = await api("/v1/volunteer-dashboard/impact", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string; detail: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("Learners mentored");
    expect(body.items[0]?.valueLabel).toBe("14");
  });

  it("returns hours entries with hours numeric and status", async () => {
    const res = await api("/v1/volunteer-dashboard/hours", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; dateLabel: string; hours: number; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.hours).toBeTypeOf("number");
    expect(body.items[0]?.status).toBe("approved");
  });

  it("returns monthly hours bars", async () => {
    const res = await api("/v1/volunteer-dashboard/months", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; month: string; pct: number }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.month).toBe("July");
    expect(body.items[0]?.pct).toBe(34);
  });
});

describe("GET /v1/receptionist-dashboard (Receptionist dashboard suite)", () => {
  it("403s non-staff roles", async () => {
    const res = await api("/v1/receptionist-dashboard/appointments", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(403);
  });

  it.each([
    "/v1/receptionist-dashboard/appointments",
    "/v1/receptionist-dashboard/queue",
    "/v1/receptionist-dashboard/inside",
    "/v1/receptionist-dashboard/deliveries",
    "/v1/receptionist-dashboard/inquiries",
    "/v1/receptionist-dashboard/calls",
    "/v1/receptionist-dashboard/staff",
    "/v1/receptionist-dashboard/tasks",
    "/v1/receptionist-dashboard/handover",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns appointments with visitor and status", async () => {
    const res = await api("/v1/receptionist-dashboard/appointments", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; detail: string; who: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.who).toBe("Oluwaseun Adebayo");
    expect(body.items[0]?.status).toBe("arrived");
  });

  it("returns deliveries with carrier, item and status", async () => {
    const res = await api("/v1/receptionist-dashboard/deliveries", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{
        id: string;
        carrier: string;
        item: string;
        timeLabel: string;
        status: string;
      }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.carrier).toBe("OfficeMate Ltd");
    expect(body.items[0]?.status).toBe("awaiting pickup");
  });

  it("returns calls with kind answered/missed", async () => {
    const res = await api("/v1/receptionist-dashboard/calls", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; topic: string; timeLabel: string; kind: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.kind).toBe("answered");
    expect(body.items[2]?.kind).toBe("missed");
  });

  it("returns tasks with done flags and handover notes", async () => {
    const res = await api("/v1/receptionist-dashboard/tasks", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; timeLabel: string; done: number }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.done).toBe(1);
    expect(body.items[1]?.done).toBe(0);

    const handoverRes = await api("/v1/receptionist-dashboard/handover", {
      headers: cookieHeaders(staff.cookie),
    });
    const handover = (await handoverRes.json()) as {
      items: Array<{ id: string; note: string }>;
      total: number;
    };
    expect(handover.total).toBeGreaterThanOrEqual(3);
    expect(handover.items[0]?.note).toBeTruthy();
  });
});
