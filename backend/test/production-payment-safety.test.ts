import { env } from "cloudflare:workers";
import { beforeAll, expect, it } from "vitest";
import { app } from "../src/index";
import type { AppEnv } from "../src/types";
import { cookieHeaders, createTestSession, setupDb } from "./helpers";

let cookie: string;
beforeAll(async () => {
  await setupDb();
  cookie = (await createTestSession("student@cea.ng")).cookie;
});

it("fails closed without a payment secret before creating a generic payment", async () => {
  const before = await env.DB.prepare("SELECT COUNT(*) AS n FROM payments").first<{ n: number }>();
  const res = await app.request(
    "https://api.cea.test/v1/payments/checkout",
    {
      method: "POST",
      headers: { ...cookieHeaders(cookie), "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 50000 }),
    },
    { ...env, APP_ENV: "production", PAYSTACK_SECRET_KEY: "" } as AppEnv,
  );
  expect(res.status).toBe(503);
  expect(await res.json()).toMatchObject({ error: { code: "PAYMENT_PROVIDER_UNAVAILABLE" } });
  expect(await env.DB.prepare("SELECT COUNT(*) AS n FROM payments").first()).toEqual(before);
});

it("fails closed without a payment secret before creating a shop order", async () => {
  const before = await env.DB.prepare("SELECT COUNT(*) AS n FROM digital_product_orders").first<{
    n: number;
  }>();
  const res = await app.request(
    "https://api.cea.test/v1/shop/checkout",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productSlug: "website-starter",
        email: "buyer@example.test",
        name: "Test buyer",
        redirectUrl: "https://www.cea.ng/shop/website-starter/return",
      }),
    },
    { ...env, APP_ENV: "production", PAYSTACK_SECRET_KEY: "", TURNSTILE_SECRET_KEY: "" } as AppEnv,
  );
  expect(res.status).toBe(503);
  expect(await res.json()).toMatchObject({ error: { code: "PAYMENT_PROVIDER_UNAVAILABLE" } });
  expect(await env.DB.prepare("SELECT COUNT(*) AS n FROM digital_product_orders").first()).toEqual(
    before,
  );
});
