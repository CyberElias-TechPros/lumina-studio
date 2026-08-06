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

describe("GET /v1/client-dashboard (Client engagement suite)", () => {
  it("403s students", async () => {
    const denied = await api("/v1/client-dashboard/tickets", {
      headers: cookieHeaders(student.cookie),
    });
    expect(denied.status).toBe(403);
  });

  it.each([
    "/v1/client-dashboard/tickets",
    "/v1/client-dashboard/proposals",
    "/v1/client-dashboard/documents",
    "/v1/client-dashboard/contracts",
    "/v1/client-dashboard/invoices",
    "/v1/client-dashboard/threads",
    "/v1/client-dashboard/milestones",
    "/v1/client-dashboard/tasks",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns support tickets with references and SLA", async () => {
    const res = await api("/v1/client-dashboard/tickets", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; reference: string; dateLabel: string; sla: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.title).toBe("Can't access project repo");
    expect(body.items[0]?.reference).toBe("TK-2214");
    expect(body.items[0]?.dateLabel).toBe("Aug 3 · 09:12");
    expect(body.items[0]?.sla).toBe("SLA: 4h");
    expect(body.items[0]?.status).toBe("Open");
  });

  it("returns proposals with amounts and scopes", async () => {
    const res = await api("/v1/client-dashboard/proposals", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; amount: string; scope: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.title).toBe("Learning platform rebuild");
    expect(body.items[0]?.amount).toBe("₦8.4m");
    expect(body.items[0]?.scope).toBe("12 weeks · scope v2");
    expect(body.items[0]?.status).toBe("Open");
  });

  it("returns documents with types and sizes", async () => {
    const res = await api("/v1/client-dashboard/documents", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; type: string; size: string; updated: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.title).toBe("SOW · Platform rebuild v2");
    expect(body.items[0]?.type).toBe("PDF");
    expect(body.items[0]?.size).toBe("2.4 MB");
    expect(body.items[0]?.updated).toBe("Jul 28");
    expect(body.items[0]?.status).toBe("Shared");
  });

  it("returns contracts with references and dates", async () => {
    const res = await api("/v1/client-dashboard/contracts", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; reference: string; amount: string; dateLabel: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.name).toBe("Platform rebuild · MS-2026-014");
    expect(body.items[0]?.reference).toBe("MS-2026-014");
    expect(body.items[0]?.amount).toBe("₦8.4m");
    expect(body.items[0]?.dateLabel).toBe("ends Nov 30");
    expect(body.items[0]?.status).toBe("Active");
    expect(body.items[1]?.status).toBe("Renewing");
  });

  it("returns invoices with references and amounts", async () => {
    const res = await api("/v1/client-dashboard/invoices", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; reference: string; amount: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.title).toBe("Deposit — OrderPadi build");
    expect(body.items[0]?.reference).toBe("INV-ST-0142-1");
    expect(body.items[0]?.amount).toBe("₦350k");
    expect(body.items[0]?.status).toBe("Paid");
    expect(body.items[2]?.status).toBe("Due Aug 25");
  });

  it("returns messaging threads with labels", async () => {
    const res = await api("/v1/client-dashboard/threads", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; fromLabel: string; timeLabel: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.title).toBe("Landing page build — review needed");
    expect(body.items[0]?.fromLabel).toBe("Project manager · Simi");
    expect(body.items[0]?.timeLabel).toBe("Aug 2 · 16:20");
    expect(body.items[0]?.status).toBe("New");
  });

  it("returns project milestones with statuses", async () => {
    const res = await api("/v1/client-dashboard/milestones", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; dateLabel: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(5);
    expect(body.items[0]?.title).toBe("Kickoff & discovery");
    expect(body.items[0]?.dateLabel).toBe("Jul 1");
    expect(body.items[0]?.status).toBe("Done");
    expect(body.items[2]?.status).toBe("In progress");
    expect(body.items[4]?.status).toBe("Upcoming");
  });

  it("returns project tasks with kinds", async () => {
    const res = await api("/v1/client-dashboard/tasks", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; kind: string; detail: string; status: string }>;
      total: number;
    };
    expect(body.items[0]?.title).toBe("Design system handoff");
    expect(body.items[0]?.kind).toBe("Deliverable");
    expect(body.items[0]?.detail).toBe("v2 in review");
    expect(body.items[0]?.status).toBe("Approved");
  });

  it("paginates with cursor", async () => {
    const first = await api("/v1/client-dashboard/milestones?limit=2", {
      headers: cookieHeaders(staff.cookie),
    });
    const firstBody = (await first.json()) as {
      items: Array<{ id: string }>;
      nextCursor?: string;
    };
    expect(firstBody.items).toHaveLength(2);
    expect(firstBody.nextCursor).toBeTruthy();

    const second = await api(
      `/v1/client-dashboard/milestones?limit=2&cursor=${firstBody.nextCursor ?? ""}`,
      { headers: cookieHeaders(staff.cookie) },
    );
    const secondBody = (await second.json()) as { items: Array<{ id: string }> };
    expect(secondBody.items[0]?.id).not.toBe(firstBody.items[0]?.id);
  });

  it("404s unknown collections", async () => {
    const res = await api("/v1/client-dashboard/bogus", {
      headers: cookieHeaders(staff.cookie),
    });
    expect(res.status).toBe(404);
  });
});