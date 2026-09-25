import { beforeAll, describe, expect, it } from "vitest";
import { api, cookieHeaders, createTestSession, setupDb } from "./helpers";
import { hmacSha512Hex, timingSafeEqualHex } from "../src/lib/crypto";

type TestSession = Awaited<ReturnType<typeof createTestSession>>;

let student: TestSession;
let instructor: TestSession;

beforeAll(async () => {
  await setupDb();
  student = await createTestSession("student@cea.ng");
  instructor = await createTestSession("instructor@cea.ng");
});

interface CheckoutShape {
  reference: string;
  authorizationUrl: string;
  accessCode?: string;
  mock: boolean;
}

interface PaymentShape {
  id: string;
  reference: string;
  email: string;
  amount: number;
  currency: string;
  status: string;
  provider: string;
  description: string;
  paidAt?: string;
}

interface Page<T> {
  items: T[];
  nextCursor?: string;
  total: number;
}

describe("payments crypto", () => {
  it("computes HMAC-SHA512 hex matching the known vector", async () => {
    const sig = await hmacSha512Hex("key", "The quick brown fox jumps over the lazy dog");
    expect(sig).toBe(
      "b42af09057bac1e2d41708e48a902e09b5ff7f12ab428a4fe86653c73dd248fb82f948a549f7b791a5b41915ee4d1ec3935357e4e2317250d0372afa2ebeeb3a",
    );
  });

  it("timing-safe compare rejects mismatches", async () => {
    expect(timingSafeEqualHex("abc", "abc")).toBe(true);
    expect(timingSafeEqualHex("abc", "abd")).toBe(false);
    expect(timingSafeEqualHex("abc", "abcd")).toBe(false);
  });
});

describe("payments checkout", () => {
  it("requires auth", async () => {
    const res = await api("/v1/payments/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 50000 }),
    });
    expect(res.status).toBe(401);
  });

  it("validates amount", async () => {
    const res = await api("/v1/payments/checkout", {
      method: "POST",
      headers: { ...cookieHeaders(student.cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 0 }),
    });
    expect(res.status).toBe(400);
    const body = (await res.json()) as {
      error: { code: string; fieldErrors?: Record<string, string[]> };
    };
    expect(body.error.code).toBe("FIELD_VALIDATION");
    expect(body.error.fieldErrors?.amount).toBeTruthy();
  });

  it("creates a pending checkout session (mock mode when no secret configured)", async () => {
    const res = await api("/v1/payments/checkout", {
      method: "POST",
      headers: { ...cookieHeaders(student.cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 50000, description: "Tuition instalment" }),
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as CheckoutShape;
    expect(body.reference).toMatch(/^cea_/);
    expect(body.authorizationUrl).toContain("checkout.paystack.com");
    expect(body.mock).toBe(true);
  });
});

describe("payments webhook", () => {
  async function createCheckout(): Promise<string> {
    const res = await api("/v1/payments/checkout", {
      method: "POST",
      headers: { ...cookieHeaders(student.cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 480000, description: "Tuition instalment 2" }),
    });
    const body = (await res.json()) as CheckoutShape;
    return body.reference;
  }

  async function fetchSession(reference: string): Promise<PaymentShape> {
    const res = await api(`/v1/payments/session/${reference}`, {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(200);
    return (await res.json()) as PaymentShape;
  }

  it("marks a pending payment as success on charge.success and notifies", async () => {
    const reference = await createCheckout();
    const res = await api("/v1/payments/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "charge.success", data: { reference, amount: 48000000 } }),
    });
    expect(res.status).toBe(200);
    expect((await res.json()) as { ok: boolean }).toEqual({ ok: true });

    const payment = await fetchSession(reference);
    expect(payment.status).toBe("success");
    expect(payment.amount).toBe(480000);

    const notes = await api("/v1/notifications", { headers: cookieHeaders(student.cookie) });
    const noteBody = (await notes.json()) as Page<{ title: string }>;
    expect(noteBody.items.some((n) => n.title === "Payment received")).toBe(true);
  });

  it("marks a payment as failed on charge.failed", async () => {
    const reference = await createCheckout();
    const res = await api("/v1/payments/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "charge.failed", data: { reference } }),
    });
    expect(res.status).toBe(200);
    const payment = await fetchSession(reference);
    expect(payment.status).toBe("failed");
  });

  it("ignores unknown events", async () => {
    const reference = await createCheckout();
    const res = await api("/v1/payments/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "invoice.paid", data: { reference } }),
    });
    expect(res.status).toBe(200);
    const payment = await fetchSession(reference);
    expect(payment.status).toBe("pending");
  });

  it("flags an underpaid charge.success for review instead of honouring it", async () => {
    const reference = await createCheckout();
    const res = await api("/v1/payments/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "charge.success", data: { reference, amount: 100 } }),
    });
    expect(res.status).toBe(200);
    const payment = await fetchSession(reference);
    expect(payment.status).toBe("review");
  });

  it("processes a replayed webhook delivery only once", async () => {
    const reference = await createCheckout();
    const payload = JSON.stringify({
      event: "charge.failed",
      data: { id: 987654, reference },
    });
    const first = await api("/v1/payments/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });
    expect(first.status).toBe(200);
    const again = await api("/v1/payments/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });
    expect(await again.json()).toEqual({ ok: true, duplicate: true });
  });

  it("accepts payloads without a reference", async () => {
    const res = await api("/v1/payments/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "ping" }),
    });
    expect(res.status).toBe(200);
    expect((await res.json()) as { ok: boolean }).toEqual({ ok: true });
  });
});

describe("payments session", () => {
  it("returns 404 for unknown references", async () => {
    const res = await api("/v1/payments/session/cea_missing", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(404);
  });

  it("forbids other users from reading a payment", async () => {
    const res = await api("/v1/payments/session/cea_demo_a1b2c3d4", {
      headers: cookieHeaders(instructor.cookie),
    });
    expect(res.status).toBe(403);
  });

  it("returns seeded payments to the owner", async () => {
    const res = await api("/v1/payments/session/cea_demo_a1b2c3d4", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as PaymentShape;
    expect(body).toMatchObject({
      reference: "cea_demo_a1b2c3d4",
      amount: 480000,
      status: "success",
      provider: "paystack",
    });
    expect(body.paidAt).toBeTruthy();
  });
});

describe("payments history", () => {
  it("requires auth", async () => {
    const res = await api("/v1/payments/history");
    expect(res.status).toBe(401);
  });

  it("returns the current user's payments", async () => {
    const res = await api("/v1/payments/history", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as Page<PaymentShape>;
    expect(body.items.length).toBeGreaterThanOrEqual(4);
    expect(body.items[0]).toMatchObject({
      reference: expect.any(String),
      email: "student@cea.ng",
      amount: expect.any(Number),
      currency: "NGN",
      status: expect.any(String),
      provider: "paystack",
    });
  });

  it("paginates with a cursor", async () => {
    const res = await api("/v1/payments/history?limit=1", {
      headers: cookieHeaders(student.cookie),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as Page<PaymentShape>;
    expect(body.items).toHaveLength(1);
    expect(body.nextCursor).toBeTruthy();
  });
});
