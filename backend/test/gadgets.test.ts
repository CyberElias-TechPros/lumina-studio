import { env } from "cloudflare:workers";
import { Hono } from "hono";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { AppEnv } from "../src/types";
import { gadgets, pricingConfig, quotedPriceKobo } from "../src/routes/gadgets";
import { sendError } from "../src/lib/errors";
import { api, setupDb } from "./helpers";

const token = "test_token_012345678901234567890123456789";
const app = new Hono<{ Bindings: AppEnv }>();
app.onError((err, c) => sendError(c, err));
app.route("/", gadgets);
const bindings = { ...env, AFKIT_SYNC_TOKEN: token } as AppEnv;
const card = {
  imageUrl: "https://images.afkit.ng/example.jpg",
  title: "Used laptop with a scratch",
  quantity: 1,
  condition: "UK Used",
  pricesKobo: [17500000],
};
function snapshot(
  cards: unknown[] = [card],
  observedAt = new Date().toISOString(),
  reportedTotal = cards.length,
) {
  return { cards, observedAt, reportedTotal };
}
function upload(body: unknown, auth = token) {
  return app.request(
    "/snapshot",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${auth}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
    bindings,
  );
}
function catalog(extra: Partial<AppEnv> = {}) {
  return app.request("/catalog", {}, { ...bindings, ...extra });
}
beforeAll(async () => setupDb());
beforeEach(async () => {
  await env.DB.prepare("DELETE FROM afkit_catalog_snapshot").run();
});

describe("supplier snapshot safeguards", () => {
  it("requires the dedicated secret and rejects malformed, oversized, repeated and old data", async () => {
    expect((await api("/v1/gadgets/snapshot", { method: "POST", body: "{}" })).status).toBe(401);
    expect((await upload(snapshot(), "wrong_token_0123456789012345678901234567")).status).toBe(401);
    expect(
      (await upload(snapshot([{ ...card, imageUrl: "https://evil.test/x.jpg" }]))).status,
    ).toBe(400);
    expect((await upload(snapshot([card, card]))).status).toBe(400);
    expect(
      (await upload(snapshot([card], new Date(Date.now() - 900_001).toISOString()))).status,
    ).toBe(400);
    expect((await upload(snapshot([card], new Date().toISOString(), 4))).status).toBe(400);
    const huge = await app.request(
      "/snapshot",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Length": "300001" },
        body: "{}",
      },
      bindings,
    );
    expect(huge.status).toBe(413);
    expect((await catalog()).status).toBe(200);
    expect(((await (await catalog()).json()) as { items: unknown[] }).items).toEqual([]);
  });
  it("atomically exposes conservative prices and never exposes supplier costs; older imports cannot overwrite", async () => {
    const at = new Date().toISOString();
    const cards = [
      card,
      {
        ...card,
        imageUrl: "https://images.afkit.ng/two.jpg",
        pricesKobo: [1200000, 900000],
        quantity: null,
      },
    ];
    expect((await upload(snapshot(cards, at, 2))).status).toBe(200);
    expect((await upload(snapshot(cards, at, 2))).status).toBe(409);
    const response = await catalog();
    expect(response.headers.get("cache-control")).toBe("no-store");
    const body = (await response.json()) as {
      fresh: boolean;
      items: { priceKobo: number | null; observedQuantity: number | null; pricesKobo?: unknown }[];
    };
    expect(body.fresh).toBe(true);
    expect(body.items[0]!.priceKobo).toBe(20590000);
    expect(body.items[0]!.observedQuantity).toBe(1);
    expect(body.items[0]!.pricesKobo).toBeUndefined();
    expect(body.items[1]!.priceKobo).toBeNull();
    expect(body.items[1]!.observedQuantity).toBeNull();
  });
  it("accepts the observed 87/88 discrepancy, updates prices and keeps zero stock unpriced", async () => {
    const cards = Array.from({ length: 87 }, (_, i) => ({
      ...card,
      imageUrl: `https://images.afkit.ng/${i}.jpg`,
    }));
    const old = new Date(Date.now() - 10000).toISOString();
    expect((await upload(snapshot(cards, old, 88))).status).toBe(200);
    cards[0] = { ...cards[0]!, quantity: 0, pricesKobo: [20000000] };
    cards[1] = { ...cards[1]!, quantity: 3, pricesKobo: [20000000] };
    expect((await upload(snapshot(cards, new Date().toISOString(), 88))).status).toBe(200);
    const body = (await (await catalog()).json()) as {
      items: { priceKobo: number | null; observedQuantity: number | null }[];
    };
    expect(body.items[0]!.priceKobo).toBeNull();
    expect(body.items[0]!.observedQuantity).toBe(0);
    expect(body.items[1]!.priceKobo).toBeGreaterThan(20590000);
    expect(body.items[1]!.observedQuantity).toBe(3);
  });
  it("hides prices and counts when stale or invalid configuration", async () => {
    expect((await upload(snapshot())).status).toBe(200);
    const invalid = (await (await catalog({ AFKIT_MARGIN_BPS: "9999" })).json()) as {
      items: { priceKobo: number | null }[];
    };
    expect(invalid.items[0]!.priceKobo).toBeNull();
    await env.DB.prepare("UPDATE afkit_catalog_snapshot SET observed_at = ? WHERE id=1")
      .bind(new Date(Date.now() - 19 * 60 * 60 * 1000).toISOString())
      .run();
    const stale = (await (await catalog()).json()) as {
      fresh: boolean;
      items: { priceKobo: number | null; observedQuantity: number | null }[];
    };
    expect(stale.fresh).toBe(false);
    expect(stale.items[0]!.priceKobo).toBeNull();
    expect(stale.items[0]!.observedQuantity).toBeNull();
  });
  it("keeps margin and minimum profit after rounded fees and reserve across prices", () => {
    const p = pricingConfig(bindings);
    for (let cost = 100; cost < 100000000; cost += 799991) {
      const sale = quotedPriceKobo(cost, p);
      const fee = Math.ceil((sale * p.fee) / 10000) + p.fixed,
        reserve = Math.ceil((sale * p.reserve) / 10000);
      const profit = sale - cost - p.other - fee - reserve;
      expect(profit).toBeGreaterThanOrEqual(p.minProfit);
      expect(profit * 10000).toBeGreaterThanOrEqual(sale * p.margin);
    }
  });
});
