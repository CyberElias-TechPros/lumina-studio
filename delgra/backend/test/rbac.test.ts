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

describe("role-based access control", () => {
  let owner: string;

  beforeAll(async () => {
    await migrate();
  });
  beforeEach(async () => {
    await reset();
    owner = await registerOwner({ email: `owner+${Math.random().toString(36).slice(2, 8)}@rbac.test` });
  });

  async function invite(role: "manager" | "staff" | "viewer"): Promise<string> {
    const email = `${role}+${Math.random().toString(36).slice(2, 9)}@rbac.test`;
    const created = await authed(owner, "/v1/users", {
      method: "POST",
      body: { name: `${role} user`, email, role },
    });
    expect(created.status, `invite ${role}`).toBe(201);
    const { temporaryPassword } = await body<{ temporaryPassword: string }>(created);

    const session = await authed("", "/v1/auth/login", {
      method: "POST",
      body: { email, password: temporaryPassword },
    });
    expect(session.status, `login ${role}`).toBe(200);
    return (session.headers.get("set-cookie") ?? "").split(";")[0]!;
  }

  it("issues a temporary password that must be changed", async () => {
    const res = await authed(owner, "/v1/users", {
      method: "POST",
      body: { name: "Staff One", email: "staff1@rbac.test", role: "staff" },
    });
    const payload = await body<{ temporaryPassword: string; mustChangePassword: boolean }>(res);
    expect(payload.temporaryPassword).toBeTruthy();
    expect(payload.mustChangePassword).toBe(true);
    expect(payload.temporaryPassword.length).toBeGreaterThanOrEqual(10);
  });

  it("lets a viewer read but never write", async () => {
    const viewer = await invite("viewer");

    expect((await authed(viewer, "/v1/invoices")).status).toBe(200);
    expect((await authed(viewer, "/v1/dashboard")).status).toBe(200);

    const customerId = await makeCustomer(owner);
    const write = await authed(viewer, "/v1/invoices", {
      method: "POST",
      body: {
        customerId,
        issueDate: new Date().toISOString().slice(0, 10),
        dueDate: new Date().toISOString().slice(0, 10),
        items: [{ description: "x", quantity: 1, unitPrice: NGN(100) }],
      },
    });
    expect(write.status).toBe(403);

    expect((await authed(viewer, "/v1/customers", { method: "POST", body: { name: "Nope" } })).status).toBe(403);
    expect((await authed(viewer, "/v1/settings/business", { method: "PATCH", body: { name: "Hijack" } })).status).toBe(403);
    expect((await authed(viewer, "/v1/users")).status).toBe(403);
    expect((await authed(viewer, "/v1/audit")).status).toBe(403);
  });

  it("lets staff create and be paid, but not delete or void", async () => {
    const staff = await invite("staff");
    const customerId = await makeCustomer(owner);
    const today = new Date().toISOString().slice(0, 10);

    const created = await authed(staff, "/v1/invoices", {
      method: "POST",
      body: {
        customerId,
        issueDate: today,
        dueDate: today,
        status: "sent",
        items: [{ description: "UPS", quantity: 1, unitPrice: NGN(1_000) }],
      },
    });
    expect(created.status).toBe(201);
    const invoice = (await body<{ invoice: { id: string } }>(created)).invoice;

    const pay = await authed(staff, `/v1/invoices/${invoice.id}/payments`, {
      method: "POST",
      body: { amount: NGN(500), method: "cash", paidAt: today },
    });
    expect(pay.status).toBe(201);

    expect((await authed(staff, `/v1/invoices/${invoice.id}`, { method: "DELETE" })).status).toBe(403);
    const voidRes = await authed(staff, `/v1/invoices/${invoice.id}`, {
      method: "PATCH",
      body: { status: "void", voidReason: "staff trying" },
    });
    expect(voidRes.status).toBe(403);
    expect((await authed(staff, "/v1/users")).status).toBe(403);
  });

  it("lets a manager delete and void, but not manage users or settings", async () => {
    const manager = await invite("manager");
    const customerId = await makeCustomer(owner);
    const today = new Date().toISOString().slice(0, 10);

    const created = await authed(manager, "/v1/invoices", {
      method: "POST",
      body: {
        customerId,
        issueDate: today,
        dueDate: today,
        items: [{ description: "UPS", quantity: 1, unitPrice: NGN(1_000) }],
      },
    });
    const invoice = (await body<{ invoice: { id: string } }>(created)).invoice;

    const voided = await authed(manager, `/v1/invoices/${invoice.id}`, {
      method: "PATCH",
      body: { status: "void", voidReason: "duplicate entry" },
    });
    expect(voided.status).toBe(200);

    expect((await authed(manager, "/v1/audit")).status).toBe(200);
    expect((await authed(manager, "/v1/users")).status).toBe(200); // read allowed
    expect(
      (
        await authed(manager, "/v1/users", {
          method: "POST",
          body: { name: "Sneaky", email: "sneaky@rbac.test", role: "staff" },
        })
      ).status,
    ).toBe(403);
    expect((await authed(manager, "/v1/settings/business", { method: "PATCH", body: { name: "Hijack" } })).status).toBe(403);
  });

  it("stops a manager from minting an owner", async () => {
    const manager = await invite("manager");
    const res = await authed(manager, "/v1/users", {
      method: "POST",
      body: { name: "Escalate", email: "escalate@rbac.test", role: "owner" },
    });
    expect(res.status).toBe(403);
  });

  it("refuses to demote or deactivate the last owner", async () => {
    const me = await body<{ user: { id: string } }>(await authed(owner, "/v1/auth/session"));
    const demote = await authed(owner, `/v1/users/${me.user.id}`, { method: "PATCH", body: { role: "staff" } });
    expect(demote.status).toBe(409);

    const deactivate = await authed(owner, `/v1/users/${me.user.id}`, { method: "PATCH", body: { isActive: false } });
    expect(deactivate.status).toBe(409);
  });

  it("refuses self-deactivation", async () => {
    await invite("manager"); // a second active user exists
    const me = await body<{ user: { id: string } }>(await authed(owner, "/v1/auth/session"));
    const res = await authed(owner, `/v1/users/${me.user.id}`, { method: "PATCH", body: { isActive: false } });
    expect(res.status).toBe(409);
  });

  it("reports the caller's capabilities", async () => {
    const viewer = await invite("viewer");
    const payload = await body<{ role: string; capabilities: string[] }>(await authed(viewer, "/v1/settings/capabilities"));
    expect(payload.role).toBe("viewer");
    expect(payload.capabilities).toContain("read:invoices");
    expect(payload.capabilities).not.toContain("write:invoices");
  });

  it("records every state change in the audit log", async () => {
    const customerId = await makeCustomer(owner);
    await makeInvoice(owner, { customerId });

    const log = await body<{ data: Array<{ action: string }> }>(await authed(owner, "/v1/audit"));
    const actions = log.data.map((d) => d.action);
    expect(actions).toContain("customer.create");
    expect(actions).toContain("invoice.create");
    expect(actions).toContain("auth.register");
  });

  it("hides the audit trail from staff", async () => {
    const staff = await invite("staff");
    expect((await authed(staff, "/v1/audit")).status).toBe(403);
  });
});

describe("product and stock rules", () => {
  let cookie: string;

  beforeAll(async () => {
    await migrate();
  });
  beforeEach(async () => {
    await reset();
    cookie = await registerOwner({ email: `stock+${Math.random().toString(36).slice(2, 8)}@ops.test` });
  });

  it("rejects a duplicate SKU", async () => {
    await makeProduct(cookie, { sku: "UPS-45" });
    const res = await authed(cookie, "/v1/products", {
      method: "POST",
      body: { sku: "UPS-45", name: "Another", quantity: 1 },
    });
    expect(res.status).toBe(409);
  });

  it("rejects a SKU with unsafe characters", async () => {
    const res = await authed(cookie, "/v1/products", {
      method: "POST",
      body: { sku: "../etc/passwd", name: "Traversal attempt" },
    });
    expect(res.status).toBe(422);
  });

  it("records opening stock in the ledger", async () => {
    const id = await makeProduct(cookie, { quantity: 7 });
    const detail = await body<{ movements: Array<{ direction: string; quantity: number; note: string }> }>(
      await authed(cookie, `/v1/products/${id}`),
    );
    expect(detail.movements.length).toBe(1);
    expect(detail.movements[0]).toMatchObject({ direction: "in", quantity: 7 });
  });

  it("derives lowStock rather than storing it", async () => {
    await makeProduct(cookie, { sku: "LOW-1", quantity: 1 });
    const list = await body<{ data: Array<{ sku: string; lowStock: boolean }> }>(
      await authed(cookie, "/v1/products?filter=low"),
    );
    expect(list.data.find((p) => p.sku === "LOW-1")?.lowStock).toBe(true);
  });

  it("refuses to take out more stock than exists", async () => {
    const id = await makeProduct(cookie, { quantity: 2 });
    const res = await authed(cookie, `/v1/products/${id}/stock`, {
      method: "POST",
      body: { direction: "out", quantity: 5 },
    });
    expect(res.status).toBe(422);
  });

  it("writes a ledger entry for a manual adjustment", async () => {
    const id = await makeProduct(cookie, { quantity: 5 });
    const res = await authed(cookie, `/v1/products/${id}/stock`, {
      method: "POST",
      body: { direction: "adjust", quantity: 9, note: "Stock count" },
    });
    expect(res.status).toBe(200);
    expect((await body<{ quantity: number }>(res)).quantity).toBe(9);

    const row = await env.DB.prepare(`SELECT quantity FROM products WHERE id = ?`).bind(id).first<{ quantity: number }>();
    expect(row?.quantity).toBe(9);
  });

  it("archives rather than deletes a product that has been invoiced", async () => {
    const customerId = await makeCustomer(cookie);
    const productId = await makeProduct(cookie, { quantity: 5 });
    await makeInvoice(cookie, {
      customerId,
      items: [{ productId, description: "UPS", quantity: 1, unitPrice: NGN(1_000) }],
    });

    const res = await authed(cookie, `/v1/products/${productId}`, { method: "DELETE" });
    expect(res.status).toBe(200);
    expect((await body<{ archived: boolean }>(res)).archived).toBe(true);

    const row = await env.DB.prepare(`SELECT is_active FROM products WHERE id = ?`)
      .bind(productId)
      .first<{ is_active: number }>();
    expect(row).toBeTruthy();
    expect(row?.is_active).toBe(0);
  });
});

describe("customer records", () => {
  let cookie: string;

  beforeAll(async () => {
    await migrate();
  });
  beforeEach(async () => {
    await reset();
    cookie = await registerOwner({ email: `cust+${Math.random().toString(36).slice(2, 8)}@ops.test` });
  });

  it("tracks outstanding balance per customer", async () => {
    const id = await makeCustomer(cookie, "Owing Ltd");
    await makeInvoice(cookie, {
      customerId: id,
      items: [{ description: "x", quantity: 1, unitPrice: NGN(2_000) }],
    });

    const list = await body<{ data: Array<{ id: string; stats: { outstanding: number } }> }>(
      await authed(cookie, "/v1/customers?status=owing"),
    );
    const row = list.data.find((c) => c.id === id);
    expect(row?.stats.outstanding).toBe(NGN(2_000));

    const clear = await body<{ data: Array<{ id: string }> }>(await authed(cookie, "/v1/customers?status=clear"));
    expect(clear.data.map((c) => c.id)).not.toContain(id);
  });

  it("archives instead of deleting a customer with invoices", async () => {
    const id = await makeCustomer(cookie);
    await makeInvoice(cookie, { customerId: id });
    const res = await authed(cookie, `/v1/customers/${id}`, { method: "DELETE" });
    expect((await body<{ archived: boolean }>(res)).archived).toBe(true);
  });

  it("hard-deletes a customer nothing references", async () => {
    const id = await makeCustomer(cookie, "Brand New");
    const res = await authed(cookie, `/v1/customers/${id}`, { method: "DELETE" });
    expect((await body<{ archived: boolean }>(res)).archived).toBe(false);
    expect((await authed(cookie, `/v1/customers/${id}`)).status).toBe(404);
  });

  it("exports customers as CSV with RFC 4180 escaping", async () => {
    await makeCustomer(cookie, 'Acme, "Big" Ltd');
    const res = await authed(cookie, "/v1/customers/export/csv");
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/csv");
    const text = await res.text();
    expect(text.split("\n")[0]).toContain("Outstanding");
    expect(text).toContain('"Acme, ""Big"" Ltd"');
  });

  it("rejects an invalid email", async () => {
    const res = await authed(cookie, "/v1/customers", {
      method: "POST",
      body: { name: "Bad Email", email: "not-an-email" },
    });
    expect(res.status).toBe(422);
  });
});
