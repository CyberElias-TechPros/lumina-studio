import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../types";
import { ApiError } from "../lib/errors";
import { sha256Hex, timingSafeEqualHex, isoNow } from "../lib/crypto";
import { hashIdentifier, rateLimit } from "../lib/rate-limit";
import { clientIpOf } from "../lib/turnstile";
import { loadSession, requireAuth, requireAnyRole } from "../lib/auth";
import { parseBody } from "../lib/validate";
import { paginate, parsePagination } from "../lib/pagination";
import { base64UrlDecode, base64UrlEncode } from "../lib/crypto";

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
async function readBounded(request: Request, maxBody = MAX_BODY): Promise<string> {
  const size = request.headers.get("content-length");
  if (size && (!/^\d+$/.test(size) || Number(size) > maxBody))
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
      if (bytes > maxBody) {
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
async function getCatalog(env: AppEnv) {
  const row = await env.DB.prepare(
    "SELECT observed_at, reported_total, payload FROM afkit_catalog_snapshot WHERE id = 1",
  ).first<{ observed_at: string; reported_total: number; payload: string }>();
  if (!row) return { observedAt: null, reportedTotal: 0, fresh: false, items: [] };
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
    return { observedAt: null, reportedTotal: 0, fresh: false, items: [] };
  }
  const age = Date.now() - Date.parse(row.observed_at);
  const fresh = age >= -60_000 && age <= FRESH_MS;
  let p: Pricing | null = null;
  try {
    p = pricingConfig(env);
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
  return { observedAt: row.observed_at, reportedTotal: row.reported_total, fresh, items };
}
gadgets.get("/catalog", async (c) => {
  c.header("Cache-Control", "no-store");
  return c.json(await getCatalog(c.env));
});

const priceCheckSchema = z
  .object({
    items: z
      .array(z.object({ image, quantity: z.number().int().min(1).max(10) }).strict())
      .min(1)
      .max(10),
  })
  .strict()
  .superRefine(({ items }, ctx) => {
    if (new Set(items.map((item) => item.image)).size !== items.length)
      ctx.addIssue({ code: "custom", message: "Duplicate basket items" });
  });

// A price check is not a reservation, order, payment, or final shipping quote.
// Prices and product details are reconstructed from the server snapshot only.
gadgets.post("/price-check", async (c) => {
  c.header("Cache-Control", "no-store");
  await rateLimit(c.env.RATE_LIMIT, "gadget-price-check", await hashIdentifier(clientIpOf(c)), {
    limit: 30,
    windowSeconds: 60,
  });
  let raw: unknown;
  try {
    raw = JSON.parse(await readBounded(c.req.raw, 12_000));
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw ApiError.validation({});
  }
  const parsed = priceCheckSchema.safeParse(raw);
  if (!parsed.success) throw ApiError.validation({ items: ["Invalid basket."] });
  const catalog = await getCatalog(c.env);
  if (!catalog.fresh || !catalog.observedAt)
    throw ApiError.conflict("Current prices are unavailable. Please try again later.");
  const items = parsed.data.items.map(({ image, quantity }) => {
    const item = catalog.items.find((candidate) => candidate.image === image);
    if (
      !item ||
      item.priceKobo === null ||
      item.observedQuantity === 0 ||
      (item.observedQuantity !== null && quantity > item.observedQuantity)
    )
      throw ApiError.conflict(
        "One or more basket items cannot be priced in the requested quantity.",
      );
    return { image: item.image, title: item.title, quantity, priceKobo: item.priceKobo };
  });
  const subtotalKobo = items.reduce((total, item) => total + item.priceKobo * item.quantity, 0);
  if (!Number.isSafeInteger(subtotalKobo)) throw ApiError.conflict("Basket total is too large.");
  return c.json({ observedAt: catalog.observedAt, items, subtotalKobo, currency: "NGN" });
});

const orderSchema = z
  .object({
    customerName: z.string().trim().min(2, "Your full name is required.").max(120),
    customerEmail: z.string().trim().email("Enter a valid email address.").max(160),
    customerPhone: z.string().trim().min(7, "Enter a valid phone or WhatsApp number.").max(30),
    deliveryAddress: z.string().trim().max(400).optional().default(""),
    notes: z.string().trim().max(600).optional().default(""),
    items: z
      .array(z.object({ image, quantity: z.number().int().min(1).max(10) }).strict())
      .min(1)
      .max(10),
  })
  .strict()
  .superRefine(({ items }, ctx) => {
    if (new Set(items.map((item) => item.image)).size !== items.length)
      ctx.addIssue({ code: "custom", message: "Duplicate basket items" });
  });

function generateGadgetRef(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  let suffix = "";
  for (const b of bytes) suffix += alphabet[b % alphabet.length];
  const year = new Date().getUTCFullYear();
  return `CEA-GDG-${year}-${suffix}`;
}

gadgets.post("/orders", async (c) => {
  c.header("Cache-Control", "no-store");
  await rateLimit(c.env.RATE_LIMIT, "gadget-order-create", await hashIdentifier(clientIpOf(c)), {
    limit: 12,
    windowSeconds: 300,
  });

  const input = await parseBody(c, orderSchema);
  const catalog = await getCatalog(c.env);
  if (!catalog.fresh || !catalog.observedAt) {
    throw ApiError.conflict(
      "Live gadget prices are currently unavailable. Please try again later.",
    );
  }

  const items = input.items.map(({ image, quantity }) => {
    const item = catalog.items.find((candidate) => candidate.image === image);
    if (
      !item ||
      item.priceKobo === null ||
      item.observedQuantity === 0 ||
      (item.observedQuantity !== null && quantity > item.observedQuantity)
    ) {
      throw ApiError.conflict(
        "One or more basket items are unavailable in the requested quantity.",
      );
    }
    return {
      image: item.image,
      title: item.title,
      condition: item.condition,
      quantity,
      unitPriceKobo: item.priceKobo,
      lineTotalKobo: item.priceKobo * quantity,
    };
  });

  const subtotalKobo = items.reduce((sum, item) => sum + item.lineTotalKobo, 0);
  if (!Number.isSafeInteger(subtotalKobo) || subtotalKobo <= 0) {
    throw ApiError.conflict("Order total is invalid.");
  }

  const loaded = await loadSession(c).catch(() => null);
  const ref = generateGadgetRef();
  const now = isoNow();
  const email = input.customerEmail.toLowerCase();

  await c.env.DB.prepare(
    `INSERT INTO gadget_orders
      (ref, user_id, customer_name, customer_email, customer_phone, delivery_address, notes,
       items_json, subtotal_kobo, observed_at, status, admin_note, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending_confirmation', '', ?, ?)`,
  )
    .bind(
      ref,
      loaded?.user.id ?? null,
      input.customerName,
      email,
      input.customerPhone,
      input.deliveryAddress,
      input.notes,
      JSON.stringify(items),
      subtotalKobo,
      catalog.observedAt,
      now,
      now,
    )
    .run();

  return c.json(
    {
      ref,
      status: "pending_confirmation",
      subtotalKobo,
      currency: "NGN",
      observedAt: catalog.observedAt,
      items,
      createdAt: now,
    },
    201,
  );
});

gadgets.get("/orders/:ref", async (c) => {
  c.header("Cache-Control", "no-store");
  const ref = c.req.param("ref").trim().toUpperCase();
  const emailQuery = (c.req.query("email") ?? "").trim().toLowerCase();
  const loaded = await loadSession(c).catch(() => null);

  const row = await c.env.DB.prepare(
    `SELECT ref, user_id, customer_name, customer_email, delivery_address, items_json,
            subtotal_kobo, observed_at, status, admin_note, created_at, updated_at
       FROM gadget_orders WHERE ref = ?`,
  )
    .bind(ref)
    .first<{
      ref: string;
      user_id: string | null;
      customer_name: string;
      customer_email: string;
      delivery_address: string;
      items_json: string;
      subtotal_kobo: number;
      observed_at: string;
      status: string;
      admin_note: string;
      created_at: string;
      updated_at: string;
    }>();

  if (!row) throw ApiError.notFound("Order not found.");

  const isPrivileged = loaded && ["admin", "ops"].includes(loaded.user.roleKey);
  const isOwner = loaded && row.user_id && loaded.user.id === row.user_id;
  const emailMatches = emailQuery.length > 0 && row.customer_email === emailQuery;

  if (!isPrivileged && !isOwner && !emailMatches) {
    throw ApiError.forbidden("Provide the order email address to view this order.");
  }

  return c.json({
    ref: row.ref,
    status: row.status,
    customerName: row.customer_name,
    deliveryAddress: row.delivery_address,
    subtotalKobo: row.subtotal_kobo,
    currency: "NGN",
    observedAt: row.observed_at,
    items: JSON.parse(row.items_json),
    adminNote: row.admin_note,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  });
});

const requireAdminOrOps = requireAnyRole(["admin", "ops"]);

gadgets.get("/admin/orders", requireAuth, requireAdminOrOps, async (c) => {
  c.header("Cache-Control", "no-store");
  const { cursor, limit } = parsePagination(c);
  const statusFilter = c.req.query("status")?.trim();
  const decodedCursor = cursor ? (base64UrlDecode(cursor) ?? "") : "";

  const whereParts: string[] = [];
  const binds: unknown[] = [];
  if (
    statusFilter &&
    ["pending_confirmation", "confirmed", "fulfilled", "cancelled"].includes(statusFilter)
  ) {
    whereParts.push("status = ?");
    binds.push(statusFilter);
  }
  const whereSql = whereParts.length ? `WHERE ${whereParts.join(" AND ")}` : "";
  const totalRow = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM gadget_orders ${whereSql}`)
    .bind(...binds)
    .first<{ n: number }>();

  const cursorParts = [...whereParts];
  const cursorBinds = [...binds];
  if (decodedCursor) {
    cursorParts.push("ref > ?");
    cursorBinds.push(decodedCursor);
  }
  const listWhere = cursorParts.length ? `WHERE ${cursorParts.join(" AND ")}` : "";
  const rows = await c.env.DB.prepare(
    `SELECT ref, customer_name, customer_email, customer_phone, delivery_address, notes,
            items_json, subtotal_kobo, observed_at, status, admin_note, created_at, updated_at
       FROM gadget_orders ${listWhere} ORDER BY created_at DESC, ref ASC LIMIT ?`,
  )
    .bind(...cursorBinds, limit)
    .all<{
      ref: string;
      customer_name: string;
      customer_email: string;
      customer_phone: string;
      delivery_address: string;
      notes: string;
      items_json: string;
      subtotal_kobo: number;
      observed_at: string;
      status: string;
      admin_note: string;
      created_at: string;
      updated_at: string;
    }>();

  const items = rows.results.map((r) => ({
    ref: r.ref,
    customerName: r.customer_name,
    customerEmail: r.customer_email,
    customerPhone: r.customer_phone,
    deliveryAddress: r.delivery_address,
    notes: r.notes,
    items: JSON.parse(r.items_json),
    subtotalKobo: r.subtotal_kobo,
    observedAt: r.observed_at,
    status: r.status,
    adminNote: r.admin_note,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }));

  const result = paginate(items, totalRow?.n ?? 0, (last) => base64UrlEncode(last.ref));
  if (items.length < limit) delete result.nextCursor;
  return c.json(result);
});

const patchGadgetOrderSchema = z
  .object({
    status: z.enum(["pending_confirmation", "confirmed", "fulfilled", "cancelled"]),
    adminNote: z.string().trim().max(500).optional(),
  })
  .strict();

gadgets.patch("/admin/orders/:ref", requireAuth, requireAdminOrOps, async (c) => {
  const ref = c.req.param("ref").trim().toUpperCase();
  const input = await parseBody(c, patchGadgetOrderSchema);
  const existing = await c.env.DB.prepare(`SELECT ref, admin_note FROM gadget_orders WHERE ref = ?`)
    .bind(ref)
    .first<{ ref: string; admin_note: string }>();
  if (!existing) throw ApiError.notFound("Order not found.");

  const now = isoNow();
  const note = input.adminNote !== undefined ? input.adminNote : existing.admin_note;
  await c.env.DB.prepare(
    `UPDATE gadget_orders SET status = ?, admin_note = ?, updated_at = ? WHERE ref = ?`,
  )
    .bind(input.status, note, now, ref)
    .run();

  return c.json({ ok: true, ref, status: input.status, adminNote: note, updatedAt: now });
});
