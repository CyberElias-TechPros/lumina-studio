import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { sha256Hex, timingSafeEqualHex } from "../lib/crypto";

const FRESH_MS = 18 * 60 * 60 * 1000;
const MAX_BODY = 300_000;
const image = z
  .string()
  .max(500)
  .refine((s) => {
    try {
      const u = new URL(s);
      return (
        u.protocol === "https:" &&
        u.hostname === "images.afkit.ng" &&
        !u.port &&
        !u.username &&
        !u.password &&
        !u.hash
      );
    } catch {
      return false;
    }
  });
const cardSchema = z
  .object({
    imageUrl: image,
    title: z.string().trim().min(1).max(1000),
    quantity: z.number().int().min(0).max(100_000).nullable(),
    condition: z.enum(["UK Used", "Brand New"]).nullable(),
    // More than one price is ambiguous; it is never turned into a customer quote.
    pricesKobo: z.array(z.number().int().min(1).max(100_000_000_000)).max(2),
  })
  .strict();
const snapshotSchema = z
  .object({
    observedAt: z.string().datetime(),
    reportedTotal: z.number().int().min(1).max(500),
    cards: z.array(cardSchema).min(1).max(500),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (
      value.cards.length > value.reportedTotal ||
      value.reportedTotal - value.cards.length > 2 ||
      value.cards.length < Math.ceil(value.reportedTotal * 0.97) ||
      new Set(value.cards.map((c) => c.imageUrl)).size !== value.cards.length
    ) {
      ctx.addIssue({ code: "custom", message: "Incomplete or duplicate snapshot" });
    }
  });
type Snapshot = z.infer<typeof snapshotSchema>;

type Pricing = {
  margin: number;
  reserve: number;
  fee: number;
  fixed: number;
  other: number;
  minProfit: number;
  round: number;
};
function setting(value: string | undefined, fallback: number, max: number): number {
  if (value === undefined || value === "") return fallback;
  if (!/^\d+$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value) > max)
    throw new Error("Invalid gadget pricing configuration");
  return Number(value);
}
export function pricingConfig(env: AppEnv): Pricing {
  const p = {
    margin: setting(env.AFKIT_MARGIN_BPS, 1800, 9900),
    reserve: setting(env.AFKIT_RESERVE_BPS, 300, 9900),
    fee: setting(env.AFKIT_PAYMENT_FEE_BPS, 150, 9900),
    fixed: setting(env.AFKIT_FIXED_FEE_KOBO, 10000, 100_000_000_000),
    other: setting(env.AFKIT_OTHER_COST_KOBO, 500000, 100_000_000_000),
    minProfit: setting(env.AFKIT_MIN_PROFIT_KOBO, 500000, 100_000_000_000),
    round: setting(env.AFKIT_ROUND_KOBO, 10000, 100_000_000_000),
  };
  if (!p.round || p.margin + p.reserve + p.fee >= 10_000)
    throw new Error("Invalid gadget pricing configuration");
  return p;
}
const ceil = (a: bigint, b: bigint) => (a + b - 1n) / b;
export function quotedPriceKobo(cost: number, p: Pricing): number {
  const B = 10000n,
    variable = BigInt(p.fee + p.reserve);
  const base = BigInt(cost) + BigInt(p.fixed) + BigInt(p.other) + 2n;
  const margin = ceil(base * B, B - variable - BigInt(p.margin));
  const minimum = ceil((base + BigInt(p.minProfit)) * B, B - variable);
  const step = BigInt(p.round),
    sale = ceil(margin > minimum ? margin : minimum, step) * step;
  if (sale > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error("Gadget price too large");
  return Number(sale);
}
async function readBounded(request: Request): Promise<string> {
  const size = request.headers.get("content-length");
  if (size && (!/^\d+$/.test(size) || Number(size) > MAX_BODY))
    throw new ApiError(413, "TOO_LARGE", "Snapshot too large.");
  if (!request.body) throw ApiError.validation({});
  const reader = request.body.getReader();
  let bytes = 0;
  const decoder = new TextDecoder();
  let text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY) {
        await reader.cancel();
        throw new ApiError(413, "TOO_LARGE", "Snapshot too large.");
      }
      text += decoder.decode(value, { stream: true });
    }
    return text + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}
export const gadgets = new Hono<{ Bindings: AppEnv }>();
gadgets.post("/snapshot", async (c) => {
  const secret = c.env.AFKIT_SYNC_TOKEN;
  const token = c.req.header("Authorization")?.match(/^Bearer ([A-Za-z0-9_-]{32,256})$/)?.[1] ?? "";
  if (
    !secret ||
    secret.length < 32 ||
    !token ||
    !timingSafeEqualHex(await sha256Hex(token), await sha256Hex(secret))
  )
    throw ApiError.unauthorized();
  let raw: unknown;
  try {
    raw = JSON.parse(await readBounded(c.req.raw));
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw ApiError.validation({});
  }
  const parsed = snapshotSchema.safeParse(raw);
  if (!parsed.success) throw ApiError.validation({ snapshot: ["Invalid or incomplete snapshot."] });
  const data = parsed.data;
  const age = Date.now() - Date.parse(data.observedAt);
  if (age < -60_000 || age > 15 * 60_000)
    throw ApiError.validation({ observedAt: ["Snapshot timestamp is not current."] });
  const timestamp = new Date(data.observedAt).toISOString();
  // Single conditional upsert is atomic and prevents a delayed job replacing a newer observation.
  const result = await c.env.DB.prepare(
    `INSERT INTO afkit_catalog_snapshot (id, observed_at, reported_total, payload) VALUES (1, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET observed_at=excluded.observed_at, reported_total=excluded.reported_total, payload=excluded.payload WHERE excluded.observed_at > afkit_catalog_snapshot.observed_at`,
  )
    .bind(timestamp, data.reportedTotal, JSON.stringify(data.cards))
    .run();
  if (!result.meta.changes)
    throw ApiError.conflict("Snapshot is not newer than the saved observation.");
  return c.json({
    ok: true,
    count: data.cards.length,
    reportedTotal: data.reportedTotal,
    observedAt: timestamp,
  });
});
gadgets.get("/catalog", async (c) => {
  c.header("Cache-Control", "no-store");
  const row = await c.env.DB.prepare(
    "SELECT observed_at, reported_total, payload FROM afkit_catalog_snapshot WHERE id = 1",
  ).first<{ observed_at: string; reported_total: number; payload: string }>();
  if (!row) return c.json({ observedAt: null, reportedTotal: 0, fresh: false, items: [] });
  let cards: Snapshot["cards"];
  try {
    const parsed = snapshotSchema.safeParse({
      observedAt: row.observed_at,
      reportedTotal: row.reported_total,
      cards: JSON.parse(row.payload),
    });
    if (!parsed.success) throw new Error("Invalid stored data");
    cards = parsed.data.cards;
  } catch {
    return c.json({ observedAt: null, reportedTotal: 0, fresh: false, items: [] });
  }
  const age = Date.now() - Date.parse(row.observed_at);
  const fresh = age >= -60_000 && age <= FRESH_MS;
  let p: Pricing | null = null;
  try {
    p = pricingConfig(c.env);
  } catch {
    /* hide prices on invalid configuration */
  }
  const items = cards.map((card) => ({
    image: card.imageUrl,
    title: card.title,
    condition:
      card.condition === "UK Used" ? "used" : card.condition === "Brand New" ? "new" : "unknown",
    observedQuantity: fresh ? card.quantity : null,
    priceKobo:
      fresh && p && card.pricesKobo.length === 1 && card.quantity !== 0
        ? quotedPriceKobo(card.pricesKobo[0]!, p)
        : null,
  }));
  return c.json({ observedAt: row.observed_at, reportedTotal: row.reported_total, fresh, items });
});
