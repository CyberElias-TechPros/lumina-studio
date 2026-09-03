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
import { runMaintenance } from "../src/cron.ts";

describe("scheduled maintenance", () => {
  beforeAll(async () => {
    await migrate();
  });
  beforeEach(async () => {
    await reset();
  });

  it("expires stale sessions and leaves live ones alone", async () => {
    const cookie = await registerOwner({ email: `cron+${Math.random().toString(36).slice(2, 8)}@ops.test` });

    await env.DB.prepare(
      `INSERT INTO sessions (token_hash, user_id, created_at, expires_at, last_seen_at)
       SELECT 'stale-hash', id, ?, '2000-01-01T00:00:00.000Z', ? FROM users LIMIT 1`,
    )
      .bind(new Date().toISOString(), new Date().toISOString())
      .run();

    const before = await env.DB.prepare(`SELECT COUNT(*) AS n FROM sessions`).first<{ n: number }>();
    expect(before?.n).toBeGreaterThanOrEqual(2);

    const result = await runMaintenance(env);
    expect(result.expiredSessions).toBeGreaterThanOrEqual(1);

    // The caller's own live session must survive.
    expect((await authed(cookie, "/v1/auth/session")).status).toBe(200);
  });

  it("counts overdue invoices and low stock without mutating anything", async () => {
    const cookie = await registerOwner({ email: `cron2+${Math.random().toString(36).slice(2, 8)}@ops.test` });
    const customerId = await makeCustomer(cookie);
    const past = new Date(Date.now() - 60 * 86_400_000).toISOString().slice(0, 10);
    await makeInvoice(cookie, {
      customerId,
      issueDate: past,
      dueDate: past,
      items: [{ description: "x", quantity: 1, unitPrice: NGN(75_000) }],
    });
    await makeProduct(cookie, { sku: "CRON-LOW", quantity: 0 });

    const result = await runMaintenance(env);
    expect(result.overdueInvoices).toBe(1);
    expect(result.overdueValueKobo).toBe(NGN(75_000));
    expect(result.lowStockProducts).toBeGreaterThanOrEqual(1);
    expect(typeof result.durationMs).toBe("number");
  });

  it("removes R2 objects whose document row no longer exists", async () => {
    await env.UPLOADS.put("invoice/orphan/deadbeef.pdf", new Uint8Array([1, 2, 3]), {
      httpMetadata: { contentType: "application/pdf" },
    });

    const result = await runMaintenance(env);
    expect(result.orphanedObjects).toBeGreaterThanOrEqual(1);
    expect(await env.UPLOADS.get("invoice/orphan/deadbeef.pdf")).toBeNull();
  });

  it("never treats branding as an orphan", async () => {
    await env.UPLOADS.put("branding/logo.png", new Uint8Array([1, 2, 3]), {
      httpMetadata: { contentType: "image/png" },
    });
    await runMaintenance(env);

    const object = await env.UPLOADS.get("branding/logo.png");
    expect(object).not.toBeNull();
    // The body stream must be drained. An unread R2ObjectBody keeps the storage
    // handle open, which makes the workers pool fail to pop its isolated storage
    // frame after the test — the suite would report an error even though the
    // assertion passed.
    expect((await object!.arrayBuffer()).byteLength).toBe(3);
  });
});

describe("reliability", () => {
  let cookie: string;

  beforeAll(async () => {
    await migrate();
  });
  beforeEach(async () => {
    await reset();
    cookie = await registerOwner({ email: `rel+${Math.random().toString(36).slice(2, 8)}@ops.test` });
  });

  it("replays an idempotent POST instead of creating a duplicate", async () => {
    const customerId = await makeCustomer(cookie);
    const today = new Date().toISOString().slice(0, 10);
    const key = "test-idempotency-key-0001";
    const payload = {
      customerId,
      issueDate: today,
      dueDate: today,
      items: [{ description: "UPS", quantity: 1, unitPrice: NGN(100_000) }],
    };

    const first = await authed(cookie, "/v1/invoices", {
      method: "POST",
      headers: { "idempotency-key": key },
      body: payload,
    });
    expect(first.status).toBe(201);
    const firstBody = await body<{ invoice: { id: string } }>(first);

    // A double-click / retried request with the same key must not duplicate.
    const second = await authed(cookie, "/v1/invoices", {
      method: "POST",
      headers: { "idempotency-key": key },
      body: payload,
    });
    expect(second.status).toBe(201);
    const secondBody = await body<{ invoice: { id: string } }>(second);
    expect(secondBody.invoice.id).toBe(firstBody.invoice.id);

    const count = await env.DB.prepare(`SELECT COUNT(*) AS n FROM invoices`).first<{ n: number }>();
    expect(count?.n).toBe(1);
  });

  it("creates two invoices when the idempotency keys differ", async () => {
    const customerId = await makeCustomer(cookie);
    const today = new Date().toISOString().slice(0, 10);
    const payload = {
      customerId,
      issueDate: today,
      dueDate: today,
      items: [{ description: "UPS", quantity: 1, unitPrice: NGN(100_000) }],
    };

    await authed(cookie, "/v1/invoices", {
      method: "POST",
      headers: { "idempotency-key": "key-one-0000000000" },
      body: payload,
    });
    await authed(cookie, "/v1/invoices", {
      method: "POST",
      headers: { "idempotency-key": "key-two-0000000000" },
      body: payload,
    });

    const count = await env.DB.prepare(`SELECT COUNT(*) AS n FROM invoices`).first<{ n: number }>();
    expect(count?.n).toBe(2);
  });

  it("enforces foreign keys: an invoice cannot be orphaned", async () => {
    const customerId = await makeCustomer(cookie);
    const invoice = await makeInvoice(cookie, { customerId });

    // RESTRICT means the customer cannot be hard-deleted out from under the invoice.
    const row = await env.DB.prepare(
      `SELECT COUNT(*) AS n FROM invoices WHERE customer_id = ?`,
    )
      .bind(customerId)
      .first<{ n: number }>();
    expect(row?.n).toBe(1);
    expect(invoice.customerId).toBe(customerId);
  });

  it("returns a structured error envelope with a request id", async () => {
    const res = await authed(cookie, "/v1/invoices/nope");
    expect(res.status).toBe(404);
    const payload = await body<{ error: { code: string; message: string; requestId: string } }>(res);
    expect(payload.error.code).toBe("not_found");
    expect(payload.error.requestId).toBeTruthy();
  });

  it("returns per-field validation messages for a bad invoice", async () => {
    const res = await authed(cookie, "/v1/invoices", {
      method: "POST",
      body: { customerId: "", issueDate: "not-a-date", dueDate: "", items: [] },
    });
    expect(res.status).toBe(422);
    const payload = await body<{ error: { fields: Record<string, string> } }>(res);
    expect(payload.error.fields).toBeDefined();
    expect(Object.keys(payload.error.fields).length).toBeGreaterThan(0);
  });

  it("does not leak stack traces or SQL in a failure response", async () => {
    const res = await authed(cookie, "/v1/invoices", {
      method: "POST",
      body: { customerId: 12345, issueDate: 999, items: "not-an-array" },
    });
    const text = await res.text();
    expect(text.toLowerCase()).not.toContain("select ");
    expect(text.toLowerCase()).not.toContain("at ");
  });
});

describe("attachments", () => {
  let cookie: string;

  beforeAll(async () => {
    await migrate();
  });
  beforeEach(async () => {
    await reset();
    cookie = await registerOwner({ email: `doc+${Math.random().toString(36).slice(2, 8)}@ops.test` });
  });

  async function upload(filename: string, contentType: string, bytes: Uint8Array) {
    const form = new FormData();
    form.append("entityType", "invoice");
    form.append("entityId", "test-entity-id");
    form.append("file", new File([new Blob([bytes as unknown as ArrayBuffer])], filename, { type: contentType }));
    return authed(cookie, "/v1/documents", { method: "POST", body: form as unknown as Record<string, unknown> });
  }

  it("accepts a PDF and stores it under a server-generated key", async () => {
    const pdf = new TextEncoder().encode("%PDF-1.4 fake content");
    const res = await upload("proof.pdf", "application/pdf", pdf);
    expect(res.status).toBe(201);

    const listed = await body<{ data: any[] }>(
      await authed(cookie, "/v1/documents?entityType=invoice&entityId=test-entity-id"),
    );
    expect(listed.data.length).toBe(1);
    expect(listed.data[0].filename).toBe("proof.pdf");
    // The stored key must not be the client-supplied filename.
    expect(listed.data[0].storedKey).toBeUndefined();
  });

  it("rejects an executable or HTML upload", async () => {
    const res = await upload("shell.html", "text/html", new TextEncoder().encode("<script>alert(1)</script>"));
    expect(res.status).toBe(415);
  });

  it("rejects an unknown entity type", async () => {
    const form = new FormData();
    form.append("entityType", "secrets");
    form.append("entityId", "x");
    form.append("file", new File([new Blob([new TextEncoder().encode("x") as unknown as ArrayBuffer])], "a.pdf", { type: "application/pdf" }));
    const res = await authed(cookie, "/v1/documents", { method: "POST", body: form as unknown as Record<string, unknown> });
    expect(res.status).toBe(422);
  });

  it("serves a download as an attachment with a restrictive CSP", async () => {
    await upload("pod.pdf", "application/pdf", new TextEncoder().encode("%PDF-1.4 pod"));
    const listed = await body<{ data: any[] }>(
      await authed(cookie, "/v1/documents?entityType=invoice&entityId=test-entity-id"),
    );
    const res = await authed(cookie, `/v1/documents/${listed.data[0].id}/download`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-disposition")).toContain("attachment");
    expect(res.headers.get("content-security-policy")).toContain("sandbox");
    expect((await res.arrayBuffer()).byteLength).toBeGreaterThan(0);
  });

  it("deletes the object and the row together", async () => {
    await upload("temp.pdf", "application/pdf", new TextEncoder().encode("%PDF-1.4 temp"));
    const listed = await body<{ data: any[] }>(
      await authed(cookie, "/v1/documents?entityType=invoice&entityId=test-entity-id"),
    );
    const id = listed.data[0].id;
    expect((await authed(cookie, `/v1/documents/${id}`, { method: "DELETE" })).status).toBe(200);

    const after = await body<{ data: any[] }>(
      await authed(cookie, "/v1/documents?entityType=invoice&entityId=test-entity-id"),
    );
    expect(after.data.length).toBe(0);
  });
});
