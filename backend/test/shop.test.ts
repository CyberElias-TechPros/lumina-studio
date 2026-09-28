import { beforeAll, describe, expect, it } from "vitest";
import { api, setupDb } from "./helpers";

beforeAll(async () => {
  await setupDb();
});

const validCheckout = {
  productSlug: "website-starter",
  email: "buyer@cea.ng",
  name: "Ada Buyer",
  redirectUrl: "https://www.cea.ng/shop/website-starter/return",
};

describe("GET /v1/shop/catalog (public)", () => {
  it("returns the live digital product catalog without auth", async () => {
    const res = await api("/v1/shop/catalog");
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      currency: string;
      country: string;
      storeUrl: string;
      products: { slug: string; price: number; availability: string }[];
    };
    expect(body.currency).toBe("NGN");
    expect(body.country).toBe("NG");
    expect(body.storeUrl).toBe("https://www.cea.ng/shop");
    expect(body.products.length).toBeGreaterThan(0);
    for (const p of body.products) {
      expect(p.price).toBeGreaterThan(0);
      expect(p.availability).toBe("in_stock");
    }
  });
});

describe("POST /v1/shop/checkout (public guest checkout)", () => {
  it("creates an order and returns a (mock) Paystack authorization URL when no secret is set", async () => {
    const res = await api("/v1/shop/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validCheckout),
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as {
      reference: string;
      authorizationUrl: string;
      mock: boolean;
      amount: number;
      productTitle: string;
    };
    expect(body.reference).toMatch(/^cea_shop_/);
    expect(body.authorizationUrl).toContain(body.reference);
    expect(body.mock).toBe(true);
    expect(body.amount).toBe(12000);
    expect(body.productTitle).toContain("website");
  });

  it("rejects unknown product slugs with 404", async () => {
    const res = await api("/v1/shop/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...validCheckout, productSlug: "not-a-product" }),
    });
    expect(res.status).toBe(404);
  });

  it("rejects http redirect URLs", async () => {
    const res = await api("/v1/shop/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...validCheckout, redirectUrl: "http://evil.example/return" }),
    });
    expect(res.status).toBe(400);
    const body = (await res.json()) as { error: { fieldErrors: Record<string, string[]> } };
    expect(body.error.fieldErrors.redirectUrl).toBeDefined();
  });

  it("rejects untrusted redirect URLs", async () => {
    const res = await api("/v1/shop/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...validCheckout, redirectUrl: "https://evil.example/return" }),
    });
    expect(res.status).toBe(400);
  });

  it("rejects invalid buyer emails with field errors", async () => {
    const res = await api("/v1/shop/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...validCheckout, email: "not-an-email" }),
    });
    expect(res.status).toBe(400);
    const body = (await res.json()) as { error: { code: string; fieldErrors: unknown } };
    expect(body.error.code).toBe("FIELD_VALIDATION");
  });
});

describe("GET /v1/shop/orders/:reference (public order status)", () => {
  it("returns the order for a freshly created reference", async () => {
    const create = await api("/v1/shop/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validCheckout),
    });
    const created = (await create.json()) as { reference: string };
    const status = await api(`/v1/shop/orders/${created.reference}`);
    expect(status.status).toBe(200);
    const body = (await status.json()) as {
      reference: string;
      productSlug: string;
      status: string;
      email: string;
    };
    expect(body.reference).toBe(created.reference);
    expect(body.productSlug).toBe("website-starter");
    expect(body.status).toBe("pending");
    expect(body.email).toBe("buyer@cea.ng");
  });

  it("returns 404 for unknown references", async () => {
    const res = await api("/v1/shop/orders/cea_shop_does_not_exist");
    expect(res.status).toBe(404);
  });
});
