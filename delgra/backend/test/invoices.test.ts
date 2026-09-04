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

describe("invoices", () => {
  let cookie: string;
  let customerId: string;

  beforeAll(async () => {
    await migrate();
  });
  beforeEach(async () => {
    await reset();
    cookie = await registerOwner({ email: `inv+${Math.random().toString(36).slice(2, 8)}@delgra.test` });
    customerId = await makeCustomer(cookie, "Delta Power Ltd");
  });

  const today = () => new Date().toISOString().slice(0, 10);

  it("creates an invoice, allocates a number and computes totals", async () => {
    const invoice = await makeInvoice(cookie, {
      customerId,
      items: [
        { description: "Fairly Used UPS 45kVA", quantity: 2, unitPrice: NGN(450_000) },
        { description: "Delivery to Ikeja", quantity: 1, unitPrice: NGN(25_000) },
      ],
    });

    expect(invoice.number).toMatch(/^[A-Z0-9]+-\d{4}-[A-Z0-9]+-\d{2,}$/);
    expect(invoice.subtotal).toBe(NGN(925_000));
    expect(invoice.total).toBe(NGN(925_000));
    expect(invoice.balance).toBe(NGN(925_000));
    expect(invoice.currency).toBe("NGN");
  });

  it("issues sequential numbers within a year", async () => {
    const first = await makeInvoice(cookie, { customerId });
    const second = await makeInvoice(cookie, { customerId });
    const seq = (n: string) => Number.parseInt(n.split("-").pop()!, 10);
    expect(seq(second.number)).toBe(seq(first.number) + 1);
    expect(first.number.slice(0, -2)).toBe(second.number.slice(0, -2));
  });

  it("honours the configured prefix, matching the owner's DEL-YYYY-TF-NN format", async () => {
    const res = await authed(cookie, "/v1/settings/business", {
      method: "PATCH",
      body: { invoicePrefix: "DEL", invoiceSeries: "TF" },
    });
    expect(res.status).toBe(200);

    const invoice = await makeInvoice(cookie, {
      customerId,
      issueDate: "2026-03-14",
      dueDate: "2026-03-28",
    });
    expect(invoice.number).toBe("DEL-2026-TF-01");
  });

  it("rejects an invoice with no line items", async () => {
    const res = await authed(cookie, "/v1/invoices", {
      method: "POST",
      body: { customerId, issueDate: today(), dueDate: today(), items: [] },
    });
    expect(res.status).toBe(422);
  });

  it("rejects a due date before the issue date", async () => {
    const res = await authed(cookie, "/v1/invoices", {
      method: "POST",
      body: {
        customerId,
        issueDate: "2026-05-10",
        dueDate: "2026-05-01",
        items: [{ description: "x", quantity: 1, unitPrice: NGN(10) }],
      },
    });
    expect(res.status).toBe(422);
  });

  it("rejects an unknown customer", async () => {
    const res = await authed(cookie, "/v1/invoices", {
      method: "POST",
      body: {
        customerId: "00000000-0000-0000-0000-000000000000",
        issueDate: today(),
        dueDate: today(),
        items: [{ description: "x", quantity: 1, unitPrice: NGN(10) }],
      },
    });
    expect(res.status).toBe(422);
  });

  it("rejects a negative or absurd line quantity", async () => {
    const res = await authed(cookie, "/v1/invoices", {
      method: "POST",
      body: {
        customerId,
        issueDate: today(),
        dueDate: today(),
        items: [{ description: "x", quantity: -3, unitPrice: 1000 }],
      },
    });
    expect(res.status).toBe(422);
  });

  it("stores money as integer kobo, never a float", async () => {
    const invoice = await makeInvoice(cookie, {
      customerId,
      items: [{ description: "x", quantity: 3, unitPrice: NGN(33_333) }],
    });
    const row = await env.DB.prepare(`SELECT total FROM invoices WHERE id = ?`)
      .bind(invoice.id)
      .first<{ total: number }>();
    expect(Number.isInteger(row?.total)).toBe(true);
    expect(row?.total).toBe(NGN(99_999));
  });

  it("applies tax on the discounted subtotal when enabled", async () => {
    const invoice = await makeInvoice(cookie, {
      customerId,
      items: [{ description: "x", quantity: 1, unitPrice: NGN(100_000) }],
      discount: NGN(20_000),
      taxEnabled: true,
      taxRateBp: 750,
    });
    expect(invoice.taxAmount).toBe(NGN(6_000));
    expect(invoice.total).toBe(NGN(86_000));
  });

  it("leaves tax off by default, per the owner's configuration", async () => {
    const invoice = await makeInvoice(cookie, { customerId });
    expect(invoice.taxEnabled).toBe(false);
    expect(invoice.taxAmount).toBe(0);
  });

  it("records a payment, moves the invoice to partial then paid", async () => {
    const invoice = await makeInvoice(cookie, {
      customerId,
      items: [{ description: "x", quantity: 1, unitPrice: NGN(100_000) }],
    });

    const part = await authed(cookie, `/v1/invoices/${invoice.id}/payments`, {
      method: "POST",
      body: { amount: NGN(40_000), method: "transfer", reference: "GTB/12345", paidAt: today() },
    });
    expect(part.status).toBe(201);
    const partial = (await body<{ invoice: any }>(part)).invoice;
    expect(partial.status).toBe("partial");
    expect(partial.paidAmount).toBe(NGN(40_000));
    expect(partial.balance).toBe(NGN(60_000));

    const rest = await authed(cookie, `/v1/invoices/${invoice.id}/payments`, {
      method: "POST",
      body: { amount: NGN(60_000), method: "cash", paidAt: today() },
    });
    const paid = (await body<{ invoice: any }>(rest)).invoice;
    expect(paid.status).toBe("paid");
    expect(paid.balance).toBe(0);
  });

  it("refuses a payment larger than the balance", async () => {
    const invoice = await makeInvoice(cookie, {
      customerId,
      items: [{ description: "x", quantity: 1, unitPrice: NGN(10_000) }],
    });
    const res = await authed(cookie, `/v1/invoices/${invoice.id}/payments`, {
      method: "POST",
      body: { amount: NGN(99_999), method: "cash", paidAt: today() },
    });
    expect(res.status).toBe(422);
  });

  it("refuses to pay a draft invoice", async () => {
    const invoice = await makeInvoice(cookie, { customerId, status: "draft" });
    const res = await authed(cookie, `/v1/invoices/${invoice.id}/payments`, {
      method: "POST",
      body: { amount: NGN(10), method: "cash", paidAt: today() },
    });
    expect(res.status).toBe(409);
  });

  it("reverses the invoice status when a payment is deleted", async () => {
    const invoice = await makeInvoice(cookie, {
      customerId,
      items: [{ description: "x", quantity: 1, unitPrice: NGN(10_000) }],
    });
    const payRes = await authed(cookie, `/v1/invoices/${invoice.id}/payments`, {
      method: "POST",
      body: { amount: NGN(10_000), method: "cash", paidAt: today() },
    });
    expect((await body<{ invoice: any }>(payRes)).invoice.status).toBe("paid");

    const detail = await authed(cookie, `/v1/invoices/${invoice.id}`);
    const payments = (await body<{ payments: Array<{ id: string }> }>(detail)).payments;
    const del = await authed(cookie, `/v1/invoices/${invoice.id}/payments/${payments[0]!.id}`, {
      method: "DELETE",
    });
    expect(del.status).toBe(200);
    expect((await body<{ invoice: any }>(del)).invoice.status).toBe("sent");
  });

  it("decrements stock when an invoice is sent", async () => {
    const productId = await makeProduct(cookie, { quantity: 5, salePrice: 450_000 });
    await makeInvoice(cookie, {
      customerId,
      items: [{ productId, description: "UPS 45kVA", quantity: 2, unitPrice: NGN(450_000) }],
      status: "sent",
    });

    const product = await env.DB.prepare(`SELECT quantity FROM products WHERE id = ?`)
      .bind(productId)
      .first<{ quantity: number }>();
    expect(product?.quantity).toBe(3);

    const movements = await env.DB.prepare(
      `SELECT direction, quantity FROM stock_movements WHERE product_id = ? AND reference_type = 'invoice'`,
    )
      .bind(productId)
      .all();
    expect(movements.results.length).toBeGreaterThan(0);
  });

  it("does not touch stock while an invoice is still a draft", async () => {
    const productId = await makeProduct(cookie, { quantity: 5 });
    await makeInvoice(cookie, {
      customerId,
      items: [{ productId, description: "UPS", quantity: 2, unitPrice: NGN(450_000) }],
      status: "draft",
    });
    const product = await env.DB.prepare(`SELECT quantity FROM products WHERE id = ?`)
      .bind(productId)
      .first<{ quantity: number }>();
    expect(product?.quantity).toBe(5);
  });

  it("returns stock to the shelf when an invoice is voided", async () => {
    const productId = await makeProduct(cookie, { quantity: 5 });
    const invoice = await makeInvoice(cookie, {
      customerId,
      items: [{ productId, description: "UPS", quantity: 2, unitPrice: NGN(450_000) }],
      status: "sent",
    });

    const voided = await authed(cookie, `/v1/invoices/${invoice.id}`, {
      method: "PATCH",
      body: { status: "void", voidReason: "Customer cancelled the order" },
    });
    expect(voided.status).toBe(200);
    expect((await body<{ invoice: any }>(voided)).invoice.status).toBe("void");

    const product = await env.DB.prepare(`SELECT quantity FROM products WHERE id = ?`)
      .bind(productId)
      .first<{ quantity: number }>();
    expect(product?.quantity).toBe(5);
  });

  it("requires a reason to void", async () => {
    const invoice = await makeInvoice(cookie, { customerId });
    const res = await authed(cookie, `/v1/invoices/${invoice.id}`, {
      method: "PATCH",
      body: { status: "void" },
    });
    expect(res.status).toBe(422);
  });

  it("refuses to edit a voided invoice", async () => {
    const invoice = await makeInvoice(cookie, { customerId });
    await authed(cookie, `/v1/invoices/${invoice.id}`, {
      method: "PATCH",
      body: { status: "void", voidReason: "duplicate" },
    });
    const res = await authed(cookie, `/v1/invoices/${invoice.id}`, {
      method: "PATCH",
      body: { notes: "trying to edit" },
    });
    expect(res.status).toBe(409);
  });

  it("deletes a draft but refuses to delete an issued invoice", async () => {
    const draft = await makeInvoice(cookie, { customerId, status: "draft" });
    expect((await authed(cookie, `/v1/invoices/${draft.id}`, { method: "DELETE" })).status).toBe(200);

    const sent = await makeInvoice(cookie, { customerId });
    const res = await authed(cookie, `/v1/invoices/${sent.id}`, { method: "DELETE" });
    expect(res.status).toBe(409);
  });

  it("recomputes totals when line items are edited", async () => {
    const invoice = await makeInvoice(cookie, {
      customerId,
      items: [{ description: "x", quantity: 1, unitPrice: NGN(100) }],
    });
    const res = await authed(cookie, `/v1/invoices/${invoice.id}`, {
      method: "PATCH",
      body: {
        items: [
          { description: "x", quantity: 4, unitPrice: NGN(100) },
          { description: "y", quantity: 1, unitPrice: NGN(50) },
        ],
      },
    });
    const updated = (await body<{ invoice: any }>(res)).invoice;
    expect(updated.subtotal).toBe(NGN(450));
    expect(updated.total).toBe(NGN(450));
  });

  it("derives the overdue flag instead of storing it", async () => {
    const past = new Date(Date.now() - 40 * 86_400_000).toISOString().slice(0, 10);
    const invoice = await makeInvoice(cookie, {
      customerId,
      issueDate: past,
      dueDate: past,
    });
    expect(invoice.status).toBe("sent");
    expect(invoice.isOverdue).toBe(true);
    expect(invoice.displayStatus).toBe("overdue");

    const filtered = await authed(cookie, "/v1/invoices?status=overdue");
    const list = await body<{ data: Array<{ id: string }> }>(filtered);
    expect(list.data.map((i) => i.id)).toContain(invoice.id);
  });

  it("does not mark a paid invoice overdue", async () => {
    const past = new Date(Date.now() - 40 * 86_400_000).toISOString().slice(0, 10);
    const invoice = await makeInvoice(cookie, {
      customerId,
      issueDate: past,
      dueDate: past,
      items: [{ description: "x", quantity: 1, unitPrice: NGN(50) }],
    });
    await authed(cookie, `/v1/invoices/${invoice.id}/payments`, {
      method: "POST",
      body: { amount: NGN(50), method: "cash", paidAt: past },
    });
    const detail = await authed(cookie, `/v1/invoices/${invoice.id}`);
    const fresh = (await body<{ invoice: any }>(detail)).invoice;
    expect(fresh.status).toBe("paid");
    expect(fresh.isOverdue).toBe(false);
  });

  it("searches by number, customer and PO", async () => {
    const invoice = await makeInvoice(cookie, { customerId, poNumber: "PO-778" });
    const byNumber = await body<{ data: any[] }>(
      await authed(cookie, `/v1/invoices?q=${encodeURIComponent(invoice.number)}`),
    );
    expect(byNumber.data.length).toBe(1);

    const byPo = await body<{ data: any[] }>(await authed(cookie, "/v1/invoices?q=PO-778"));
    expect(byPo.data.length).toBe(1);

    const byCustomer = await body<{ data: any[] }>(
      await authed(cookie, "/v1/invoices?q=Delta"),
    );
    expect(byCustomer.data.length).toBeGreaterThanOrEqual(1);
  });

  it("paginates with stable metadata", async () => {
    for (let i = 0; i < 5; i++) await makeInvoice(cookie, { customerId });
    const page = await body<{ data: any[]; meta: any }>(await authed(cookie, "/v1/invoices?limit=2&page=2"));
    expect(page.data.length).toBe(2);
    expect(page.meta.total).toBe(5);
    expect(page.meta.totalPages).toBe(3);
    expect(page.meta.hasPrev).toBe(true);
    expect(page.meta.hasNext).toBe(true);
  });

  it("renders a PDF", async () => {
    const invoice = await makeInvoice(cookie, {
      customerId,
      items: [{ description: "Fairly Used UPS 45kVA", quantity: 1, unitPrice: NGN(450_000) }],
    });
    const res = await authed(cookie, `/v1/invoices/${invoice.id}/pdf`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("application/pdf");

    const bytes = new Uint8Array(await res.arrayBuffer());
    // A real PDF starts with the %PDF magic bytes and ends with %%EOF.
    expect(String.fromCharCode(...bytes.slice(0, 5))).toBe("%PDF-");
    expect(bytes.byteLength).toBeGreaterThan(1000);
    const tail = new TextDecoder().decode(bytes.slice(-1024));
    expect(tail).toContain("%%EOF");
  });

  it("returns 404 for an unknown invoice id", async () => {
    const res = await authed(cookie, "/v1/invoices/does-not-exist");
    expect(res.status).toBe(404);
  });
});
