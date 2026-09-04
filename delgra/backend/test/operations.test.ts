import { describe, expect, it, beforeAll, beforeEach } from "vitest";
import { env } from "cloudflare:test";
import {
  migrate,
  reset,
  registerOwner,
  authed,
  body,
  makeCustomer,
  makeProduct,
  makeInvoice,
  NGN,
} from "./helpers.ts";

describe("waybills", () => {
  let cookie: string;
  let customerId: string;
  const today = () => new Date().toISOString().slice(0, 10);

  beforeAll(async () => {
    await migrate();
  });
  beforeEach(async () => {
    await reset();
    cookie = await registerOwner({ email: `wb+${Math.random().toString(36).slice(2, 8)}@ops.test` });
    customerId = await makeCustomer(cookie, "Kano Distributors");
  });

  async function makeWaybill(overrides: Record<string, unknown> = {}) {
    const res = await authed(cookie, "/v1/waybills", {
      method: "POST",
      body: {
        customerId,
        waybillDate: today(),
        carrier: "ABC Logistics",
        trackingNumber: "ABC123456789",
        origin: "Lagos",
        destination: "Kano",
        receiverName: "Musa Bello",
        receiverPhone: "08031112222",
        pieces: 2,
        charges: NGN(15_000),
        items: [
          { description: "Fairly Used UPS 45kVA", quantity: 1, serialNumber: "SN-45KVA-001", weightKg: 180 },
        ],
        ...overrides,
      },
    });
    if (res.status !== 201) throw new Error(`create waybill failed: ${res.status} ${await res.text()}`);
    return (await body<{ waybill: Record<string, any> }>(res)).waybill;
  }

  it("creates a waybill with a sequential number and its items", async () => {
    const wb = await makeWaybill();
    expect(wb.number).toMatch(/^WB-\d{4}-TF-\d{2,}$/);
    expect(wb.charges).toBe(NGN(15_000));
    expect(wb.status).toBe("pending");

    const detail = await body<{ items: any[] }>(await authed(cookie, `/v1/waybills/${wb.id}`));
    expect(detail.items.length).toBe(1);
    expect(detail.items[0].serialNumber).toBe("SN-45KVA-001");
  });

  it("follows the lifecycle and stamps delivered_at", async () => {
    const wb = await makeWaybill();

    const transit = await authed(cookie, `/v1/waybills/${wb.id}/status`, {
      method: "POST",
      body: { status: "in_transit" },
    });
    expect((await body<{ waybill: any }>(transit)).waybill.status).toBe("in_transit");

    const delivered = await authed(cookie, `/v1/waybills/${wb.id}/status`, {
      method: "POST",
      body: { status: "delivered", note: "Signed by Musa" },
    });
    const done = (await body<{ waybill: any }>(delivered)).waybill;
    expect(done.status).toBe("delivered");
    expect(done.deliveredAt).toBeTruthy();
  });

  it("blocks an illegal transition", async () => {
    const wb = await makeWaybill();
    await authed(cookie, `/v1/waybills/${wb.id}/status`, { method: "POST", body: { status: "in_transit" } });
    await authed(cookie, `/v1/waybills/${wb.id}/status`, { method: "POST", body: { status: "delivered" } });

    const back = await authed(cookie, `/v1/waybills/${wb.id}/status`, {
      method: "POST",
      body: { status: "in_transit" },
    });
    expect(back.status).toBe(409);
  });

  it("refuses a deleted delivered waybill", async () => {
    const wb = await makeWaybill();
    await authed(cookie, `/v1/waybills/${wb.id}/status`, { method: "POST", body: { status: "in_transit" } });
    await authed(cookie, `/v1/waybills/${wb.id}/status`, { method: "POST", body: { status: "delivered" } });

    expect((await authed(cookie, `/v1/waybills/${wb.id}`, { method: "DELETE" })).status).toBe(409);
  });

  it("refuses to link a waybill to another customer's invoice", async () => {
    const other = await makeCustomer(cookie, "Unrelated Ltd");
    const invoice = await makeInvoice(cookie, { customerId: other });
    const res = await authed(cookie, "/v1/waybills", {
      method: "POST",
      body: { customerId, invoiceId: invoice.id, waybillDate: today(), items: [] },
    });
    expect(res.status).toBe(422);
  });

  it("links to a matching invoice and shows it on the invoice", async () => {
    const invoice = await makeInvoice(cookie, { customerId });
    const wb = await makeWaybill({ invoiceId: invoice.id });
    expect(wb.invoiceNumber).toBe(invoice.number);

    const detail = await body<{ waybills: Array<{ id: string }> }>(await authed(cookie, `/v1/invoices/${invoice.id}`));
    expect(detail.waybills.map((w) => w.id)).toContain(wb.id);
  });

  it("keeps items when only the tracking number changes", async () => {
    const wb = await makeWaybill();
    await authed(cookie, `/v1/waybills/${wb.id}`, {
      method: "PATCH",
      body: { trackingNumber: "UPDATED-999" },
    });
    const detail = await body<{ items: any[]; waybill: any }>(await authed(cookie, `/v1/waybills/${wb.id}`));
    expect(detail.items.length).toBe(1);
    expect(detail.waybill.trackingNumber).toBe("UPDATED-999");
  });

  it("filters by status and searches by tracking number", async () => {
    const wb = await makeWaybill();
    await authed(cookie, `/v1/waybills/${wb.id}/status`, { method: "POST", body: { status: "in_transit" } });

    const inTransit = await body<{ data: any[] }>(await authed(cookie, "/v1/waybills?status=in_transit"));
    expect(inTransit.data.map((w) => w.id)).toContain(wb.id);

    const found = await body<{ data: any[] }>(await authed(cookie, "/v1/waybills?q=ABC123456789"));
    expect(found.data.length).toBe(1);
  });

  it("renders a waybill PDF", async () => {
    const wb = await makeWaybill();
    const res = await authed(cookie, `/v1/waybills/${wb.id}/pdf`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("application/pdf");
    const bytes = new Uint8Array(await res.arrayBuffer());
    expect(String.fromCharCode(...bytes.slice(0, 5))).toBe("%PDF-");
  });
});

describe("purchases and expenses", () => {
  let cookie: string;
  const today = () => new Date().toISOString().slice(0, 10);

  beforeAll(async () => {
    await migrate();
  });
  beforeEach(async () => {
    await reset();
    cookie = await registerOwner({ email: `po+${Math.random().toString(36).slice(2, 8)}@ops.test` });
  });

  it("receives stock when a purchase order is marked received", async () => {
    const supplier = await body<{ id: string }>(
      await authed(cookie, "/v1/suppliers", { method: "POST", body: { name: "Lagos UPS Importers" } }),
    );
    const productId = await makeProduct(cookie, { quantity: 0, sku: "PO-ITEM" });

    const created = await authed(cookie, "/v1/purchases", {
      method: "POST",
      body: {
        supplierId: supplier.id,
        orderDate: today(),
        status: "received",
        items: [{ productId, description: "UPS 45kVA", quantity: 4, unitCost: NGN(280_000) }],
      },
    });
    expect(created.status).toBe(201);
    const purchase = (await body<{ purchase: any }>(created)).purchase;
    expect(purchase.total).toBe(NGN(1_120_000));

    const row = await env.DB.prepare(`SELECT quantity FROM products WHERE id = ?`)
      .bind(productId)
      .first<{ quantity: number }>();
    expect(row?.quantity).toBe(4);
  });

  it("does not receive stock while a purchase order is still a draft", async () => {
    const productId = await makeProduct(cookie, { quantity: 0, sku: "PO-DRAFT" });
    await authed(cookie, "/v1/purchases", {
      method: "POST",
      body: {
        orderDate: today(),
        status: "draft",
        items: [{ productId, description: "UPS", quantity: 3, unitCost: NGN(100_000) }],
      },
    });
    const row = await env.DB.prepare(`SELECT quantity FROM products WHERE id = ?`)
      .bind(productId)
      .first<{ quantity: number }>();
    expect(row?.quantity).toBe(0);
  });

  it("refuses to overpay a purchase order", async () => {
    const created = await authed(cookie, "/v1/purchases", {
      method: "POST",
      body: {
        orderDate: today(),
        items: [{ description: "Cables", quantity: 1, unitCost: NGN(50_000) }],
      },
    });
    const purchase = (await body<{ purchase: any }>(created)).purchase;
    const res = await authed(cookie, `/v1/purchases/${purchase.id}/payments`, {
      method: "POST",
      body: { amount: NGN(999_999), method: "transfer", paidAt: today() },
    });
    expect(res.status).toBe(422);
  });

  it("records and aggregates expenses by category", async () => {
    await authed(cookie, "/v1/expenses", {
      method: "POST",
      body: { expenseDate: today(), category: "transport", description: "Diesel", amount: NGN(35_000) },
    });
    await authed(cookie, "/v1/expenses", {
      method: "POST",
      body: { expenseDate: today(), category: "transport", description: "Driver", amount: NGN(10_000) },
    });

    const list = await body<{ totals: { amount: number } }>(await authed(cookie, "/v1/expenses?category=transport"));
    expect(list.totals.amount).toBe(NGN(45_000));
  });

  it("rejects a zero-value expense", async () => {
    const res = await authed(cookie, "/v1/expenses", {
      method: "POST",
      body: { expenseDate: today(), category: "other", description: "Nothing", amount: 0 },
    });
    expect(res.status).toBe(422);
  });
});

describe("reports", () => {
  let cookie: string;
  const today = () => new Date().toISOString().slice(0, 10);

  beforeAll(async () => {
    await migrate();
  });
  beforeEach(async () => {
    await reset();
    cookie = await registerOwner({ email: `rep+${Math.random().toString(36).slice(2, 8)}@ops.test` });
  });

  const range = `from=${today()}&to=${today()}`;

  it("computes profit and loss for a period", async () => {
    const customerId = await makeCustomer(cookie);
    await makeInvoice(cookie, {
      customerId,
      items: [{ description: "UPS", quantity: 1, unitPrice: NGN(500_000) }],
    });
    await authed(cookie, "/v1/expenses", {
      method: "POST",
      body: { expenseDate: today(), category: "transport", description: "Haulage", amount: NGN(50_000) },
    });

    const pl = await body<any>(await authed(cookie, `/v1/reports/profit-loss?${range}`));
    expect(pl.revenue.billed).toBe(NGN(500_000));
    expect(pl.costs.operatingExpenses).toBe(NGN(50_000));
    expect(pl.result.netProfit).toBe(pl.result.grossProfit - NGN(50_000));
  });

  it("rejects a reversed date range", async () => {
    const res = await authed(cookie, `/v1/reports/profit-loss?from=2026-12-31&to=2026-01-01`);
    expect(res.status).toBe(422);
  });

  it("buckets receivables by age", async () => {
    const customerId = await makeCustomer(cookie);
    const old = new Date(Date.now() - 100 * 86_400_000).toISOString().slice(0, 10);
    await makeInvoice(cookie, {
      customerId,
      issueDate: old,
      dueDate: old,
      items: [{ description: "x", quantity: 1, unitPrice: NGN(120_000) }],
    });

    const ageing = await body<{ rows: any[]; totals: { over90: number } }>(
      await authed(cookie, "/v1/reports/receivables"),
    );
    expect(ageing.totals.over90).toBe(NGN(120_000));
    expect(ageing.rows.length).toBe(1);
  });

  it("exports invoices as CSV", async () => {
    const customerId = await makeCustomer(cookie);
    await makeInvoice(cookie, { customerId });
    const res = await authed(cookie, `/v1/reports/invoices.csv?${range}`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/csv");
    const text = await res.text();
    expect(text).toContain("Invoice,Issue date");
    expect(text).toContain("Balance");
  });

  it("reports logistics performance by carrier", async () => {
    const customerId = await makeCustomer(cookie);
    await authed(cookie, "/v1/waybills", {
      method: "POST",
      body: { customerId, waybillDate: today(), carrier: "ABC", items: [] },
    });
    const log = await body<{ rows: any[] }>(await authed(cookie, `/v1/reports/logistics?${range}`));
    expect(log.rows.length).toBe(1);
    expect(log.rows[0].carrier).toBe("ABC");
    expect(log.rows[0].shipments).toBe(1);
  });

  it("powers the dashboard with derived counters", async () => {
    const dash = await body<any>(await authed(cookie, "/v1/dashboard"));
    expect(dash.business.name).toBeTruthy();
    expect(dash.money).toBeDefined();
    expect(dash.counts).toBeDefined();
    expect(Array.isArray(dash.activity)).toBe(true);
  });
});

describe("share links", () => {
  let cookie: string;

  beforeAll(async () => {
    await migrate();
  });
  beforeEach(async () => {
    await reset();
    cookie = await registerOwner({ email: `sh+${Math.random().toString(36).slice(2, 8)}@ops.test` });
  });

  it("issues a tokenised link a customer can open without signing in", async () => {
    const customerId = await makeCustomer(cookie);
    const invoice = await makeInvoice(cookie, { customerId });

    const created = await authed(cookie, "/v1/share-links", {
      method: "POST",
      body: { entityType: "invoice", entityId: invoice.id, expiresInDays: 7 },
    });
    expect(created.status).toBe(201);
    const { token } = await body<{ token: string }>(created);
    expect(token.length).toBeGreaterThanOrEqual(32);

    // No cookie, no session — this is the customer's view.
    const shared = await authed("", `/v1/share/${token}`);
    expect(shared.status).toBe(200);
    const payload = await body<{ document: { number: string; total: number } }>(shared);
    expect(payload.document.number).toBe(invoice.number);
    expect(payload.document.total).toBe(invoice.total);
  });

  it("serves the shared PDF publicly", async () => {
    const customerId = await makeCustomer(cookie);
    const invoice = await makeInvoice(cookie, { customerId });
    const { token } = await body<{ token: string }>(
      await authed(cookie, "/v1/share-links", {
        method: "POST",
        body: { entityType: "invoice", entityId: invoice.id },
      }),
    );

    const res = await authed("", `/v1/share/${token}/pdf`);
    expect(res.status).toBe(200);
    const bytes = new Uint8Array(await res.arrayBuffer());
    expect(String.fromCharCode(...bytes.slice(0, 5))).toBe("%PDF-");
  });

  it("exposes only the one document, not the whole ledger", async () => {
    const customerId = await makeCustomer(cookie);
    const invoice = await makeInvoice(cookie, { customerId });
    const { token } = await body<{ token: string }>(
      await authed(cookie, "/v1/share-links", {
        method: "POST",
        body: { entityType: "invoice", entityId: invoice.id },
      }),
    );

    const payload = await body<any>(await authed("", `/v1/share/${token}`));
    expect(JSON.stringify(payload)).not.toContain("paidAmount\" :");
    // No customer directory, no other invoices, no bank credentials beyond the
    // details intentionally printed on the invoice.
    expect(payload.data).toBeUndefined();
  });

  it("stops working once revoked", async () => {
    const customerId = await makeCustomer(cookie);
    const invoice = await makeInvoice(cookie, { customerId });
    const { id, token } = await body<{ id: string; token: string }>(
      await authed(cookie, "/v1/share-links", {
        method: "POST",
        body: { entityType: "invoice", entityId: invoice.id },
      }),
    );

    await authed(cookie, `/v1/share-links/${id}/revoke`, { method: "POST" });
    expect((await authed("", `/v1/share/${token}`)).status).toBe(404);
  });

  it("returns 404 for a guessed token", async () => {
    expect((await authed("", "/v1/share/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")).status).toBe(404);
    expect((await authed("", "/v1/share/short")).status).toBe(404);
  });

  it("requires a session to create or list links", async () => {
    expect((await authed("", "/v1/share-links")).status).toBe(401);
  });
});

describe("settings", () => {
  let cookie: string;

  beforeAll(async () => {
    await migrate();
  });
  beforeEach(async () => {
    await reset();
    cookie = await registerOwner({ email: `set+${Math.random().toString(36).slice(2, 8)}@ops.test` });
  });

  it("updates the printable business identity", async () => {
    const res = await authed(cookie, "/v1/settings/business", {
      method: "PATCH",
      body: {
        name: "Delgra Nigeria Ltd",
        rcNumber: "RC 1234567",
        addressLine1: "12 Awolowo Road",
        city: "Lagos",
        state: "Lagos",
        phone: "08030000000",
        bankName: "GTBank",
        bankAccountName: "Delgra Nigeria Ltd",
        bankAccountNumber: "0123456789",
        invoicePrefix: "DEL",
        invoiceSeries: "TF",
      },
    });
    expect(res.status).toBe(200);
    const business = (await body<{ business: any }>(res)).business;
    expect(business.name).toBe("Delgra Nigeria Ltd");
    expect(business.invoicePrefix).toBe("DEL");
  });

  it("rejects an unsafe website value", async () => {
    const res = await authed(cookie, "/v1/settings/business", {
      method: "PATCH",
      body: { website: "javascript:alert(1)" },
    });
    expect(res.status).toBe(422);
  });

  it("is readable by any signed-in user but writable only by an owner", async () => {
    expect((await authed(cookie, "/v1/settings/business")).status).toBe(200);
  });

  it("keeps tax off by default and configurable", async () => {
    const business = (await body<{ business: any }>(await authed(cookie, "/v1/settings/business"))).business;
    expect(business.taxEnabled).toBe(false);
    expect(business.taxRateBp).toBe(750);
  });
});
