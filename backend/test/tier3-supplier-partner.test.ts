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

describe("GET /v1/supplier-dashboard (Supplier dashboard suite)", () => {
  it("403s non-staff roles", async () => {
    const res = await api("/v1/supplier-dashboard/orders", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(403);
  });

  it.each([
    "/v1/supplier-dashboard/orders",
    "/v1/supplier-dashboard/deliveries",
    "/v1/supplier-dashboard/invoices",
    "/v1/supplier-dashboard/performance",
    "/v1/supplier-dashboard/certs",
    "/v1/supplier-dashboard/conversations",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns orders with camelCase fields and numeric amounts", async () => {
    const res = await api("/v1/supplier-dashboard/orders", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; ref: string; items: string; amount: number; dueLabel: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.ref).toBe("PO-2413");
    expect(body.items[0]?.amount).toBeTypeOf("number");
    expect(body.items[0]?.dueLabel).toBeTruthy();
  });

  it("returns invoices with paid labels", async () => {
    const res = await api("/v1/supplier-dashboard/invoices", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; ref: string; amount: number; issuedLabel: string; paidLabel: string; status: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.status).toBe("awaiting payment");
    expect(body.items[0]?.paidLabel).toBeTypeOf("string");
  });

  it("returns performance metrics with value labels", async () => {
    const res = await api("/v1/supplier-dashboard/performance", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; metric: string; valueLabel: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(4);
    expect(body.items[0]?.metric).toBe("Overall");
    expect(body.items[0]?.valueLabel).toBe("4.8");
  });

  it("returns conversation detail with thread for staff", async () => {
    const res = await api("/v1/supplier-dashboard/conversations/sup-conv-01", {
      headers: cookieHeaders(staff.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      id: string;
      name: string;
      thread: Array<{ id: string; fromLabel: string; body: string; timeLabel: string }>;
    };
    expect(body.id).toBe("sup-conv-01");
    expect(body.name).toBe("CEA Procurement");
    expect(body.thread.length).toBeGreaterThanOrEqual(1);
    expect(body.thread[0]?.fromLabel).toBeTruthy();
  });

  it("404s unknown conversation", async () => {
    const res = await api("/v1/supplier-dashboard/conversations/unknown", {
      headers: cookieHeaders(staff.cookie),
    });
    expect(res.status).toBe(404);
  });
});

describe("GET /v1/partner-dashboard (Partner dashboard suite)", () => {
  it("403s non-staff roles", async () => {
    const res = await api("/v1/partner-dashboard/agreements", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(403);
  });

  it.each([
    "/v1/partner-dashboard/agreements",
    "/v1/partner-dashboard/collaborations",
    "/v1/partner-dashboard/referrals",
    "/v1/partner-dashboard/resources",
    "/v1/partner-dashboard/reports",
    "/v1/partner-dashboard/conversations",
  ])("lists %s for staff", async (path) => {
    const res = await api(path, { headers: cookieHeaders(staff.cookie) });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<Record<string, unknown>>; total: number };
    expect(body.total).toBeGreaterThanOrEqual(1);
    expect(body.items[0]?.id).toBeTruthy();
  });

  it("returns agreements with status and renewal labels", async () => {
    const res = await api("/v1/partner-dashboard/agreements", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; detail: string; status: string; renewLabel: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.status).toBe("active");
    expect(body.items[0]?.renewLabel).toBe("renews Feb 2027");
  });

  it("returns referrals with names, status and values", async () => {
    const res = await api("/v1/partner-dashboard/referrals", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; name: string; status: string; valueLabel: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.name).toBe("Tola Bakare");
    expect(body.items[0]?.status).toBe("Enrolled");
    expect(body.items[0]?.valueLabel).toBeTruthy();
  });

  it("returns reports with kinds and value labels", async () => {
    const res = await api("/v1/partner-dashboard/reports", {
      headers: cookieHeaders(staff.cookie),
    });
    const body = (await res.json()) as {
      items: Array<{ id: string; title: string; detail: string; kind: string; valueLabel: string }>;
      total: number;
    };
    expect(body.total).toBeGreaterThanOrEqual(3);
    expect(body.items[0]?.kind).toBe("revenue-share");
    expect(body.items[0]?.valueLabel).toBe("₦1.9m");
  });

  it("returns conversation detail with thread for staff", async () => {
    const res = await api("/v1/partner-dashboard/conversations/ptn-conv-01", {
      headers: cookieHeaders(staff.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      id: string;
      name: string;
      thread: Array<{ id: string; fromLabel: string; body: string; timeLabel: string }>;
    };
    expect(body.id).toBe("ptn-conv-01");
    expect(body.name).toBe("CEA Partnerships team");
    expect(body.thread.length).toBeGreaterThanOrEqual(1);
  });

  it("404s unknown conversation", async () => {
    const res = await api("/v1/partner-dashboard/conversations/unknown", {
      headers: cookieHeaders(staff.cookie),
    });
    expect(res.status).toBe(404);
  });
});
