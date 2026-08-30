import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let finance: TestSession;
let student: TestSession;

beforeAll(async () => {
  await setupDb();
  finance = await createTestSession("finance@cea.ng");
  student = await createTestSession("student@cea.ng");
});

describe("finance invoice actions", () => {
  it("creates an invoice for finance staff and rejects other roles", async () => {
    const party = `Invoice customer ${Date.now()}`;
    const created = await api("/v1/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(finance.cookie) },
      body: JSON.stringify({ party, amount: 125000, due: "2026-09-15" }),
    });

    expect(created.status).toBe(201);
    expect(await created.json()).toEqual({
      invoice: expect.objectContaining({
        id: expect.stringMatching(/^INV-/),
        party,
        amount: 125000,
        due: "2026-09-15",
        status: "Draft",
      }),
    });

    const forbidden = await api("/v1/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(student.cookie) },
      body: JSON.stringify({ party, amount: 125000, due: "2026-09-15" }),
    });
    expect(forbidden.status).toBe(403);
  });

  it("registers a payment batch for reconciliation", async () => {
    const batch = `Batch ${Date.now()}`;
    const response = await api("/v1/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(finance.cookie) },
      body: JSON.stringify({ batch, amount: 480000, count: 8, date: "2026-08-29" }),
    });

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({
      batch: expect.objectContaining({
        id: expect.stringMatching(/^BATCH-/),
        batch,
        amount: 480000,
        count: 8,
        date: "2026-08-29",
        status: "Pending approval",
      }),
    });
  });

  it("validates the required invoice fields", async () => {
    const response = await api("/v1/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...cookieHeaders(finance.cookie) },
      body: JSON.stringify({ party: "", amount: 0, due: "tomorrow" }),
    });

    expect(response.status).toBe(400);
    expect((await response.json()) as { error: { code: string } }).toEqual({
      error: expect.objectContaining({ code: "FIELD_VALIDATION" }),
    });
  });
});
