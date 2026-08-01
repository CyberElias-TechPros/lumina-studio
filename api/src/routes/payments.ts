import { Hono } from "hono";
import type { AppEnv } from "../types";
import {
  base64UrlDecode,
  base64UrlEncode,
  hmacSha512Hex,
  isoNow,
  randomToken,
  timingSafeEqualHex,
} from "../lib/crypto";
import { paginate, parsePagination, type Paginated } from "../lib/pagination";
import { requireAuth } from "../lib/auth";
import { ApiError } from "../lib/errors";

export interface ApiPayment {
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

export interface CheckoutResponse {
  reference: string;
  authorizationUrl: string;
  accessCode?: string;
  mock: boolean;
}

interface PaymentRow {
  id: string;
  reference: string;
  email: string;
  amount: number;
  currency: string;
  status: string;
  provider: string;
  description: string;
  paid_at: string | null;
}

interface PaystackInitializeResponse {
  status: boolean;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

const MAX_AMOUNT = 10_000_000;

function toApiPayment(row: PaymentRow): ApiPayment {
  return {
    id: row.id,
    reference: row.reference,
    email: row.email,
    amount: row.amount,
    currency: row.currency,
    status: row.status,
    provider: row.provider,
    description: row.description,
    ...(row.paid_at ? { paidAt: row.paid_at } : {}),
  };
}

export const payments = new Hono<{ Bindings: AppEnv }>();

/** Create a checkout session. Hosted Paystack Checkout in production; mock URL when no secret is set (dev). */
payments.post("/checkout", requireAuth, async (c) => {
  const body = (await c.req.json().catch(() => null)) as {
    amount?: unknown;
    description?: unknown;
  } | null;
  const fieldErrors: Record<string, string[]> = {};
  const amount = body?.amount;
  if (
    typeof amount !== "number" ||
    !Number.isInteger(amount) ||
    amount < 1 ||
    amount > MAX_AMOUNT
  ) {
    fieldErrors.amount = [`Amount must be a whole number between 1 and ${MAX_AMOUNT}.`];
  }
  let description = "";
  if (body?.description !== undefined && body?.description !== null) {
    if (typeof body.description !== "string" || body.description.length > 120) {
      fieldErrors.description = ["Description must be a string of at most 120 characters."];
    } else {
      description = body.description;
    }
  }
  if (Object.keys(fieldErrors).length > 0) throw ApiError.validation(fieldErrors);

  const user = c.get("authUser");
  const reference = `cea_${randomToken(8)}`;
  await c.env.DB.prepare(
    `INSERT OR IGNORE INTO payments
       (id, user_id, reference, email, amount, currency, status, provider, description, sort_order)
     VALUES (?, ?, ?, ?, ?, 'NGN', 'pending', 'paystack', ?, 0)`,
  )
    .bind(`pay-${reference}`, user.id, reference, user.email, amount as number, description)
    .run();

  const secret = c.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return c.json(
      {
        reference,
        authorizationUrl: `https://checkout.paystack.com/${reference}`,
        mock: true,
      } satisfies CheckoutResponse,
      201,
    );
  }

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      amount: (amount as number) * 100,
      currency: "NGN",
      reference,
      ...(description
        ? { metadata: { custom_fields: [{ display_name: "Item", value: description }] } }
        : {}),
    }),
  });
  const payload = (await res.json().catch(() => null)) as PaystackInitializeResponse | null;
  if (!res.ok || !payload?.status || !payload.data?.authorization_url) {
    throw new ApiError(
      502,
      "PAYMENT_PROVIDER_ERROR",
      "Paystack could not initialize the transaction.",
    );
  }
  return c.json(
    {
      reference,
      authorizationUrl: payload.data.authorization_url,
      accessCode: payload.data.access_code,
      mock: false,
    } satisfies CheckoutResponse,
    201,
  );
});

/** Paystack webhook endpoint (public). Verifies HMAC-SHA512 signature when a secret is configured. */
payments.post("/webhook", async (c) => {
  const rawBody = await c.req.text();
  const secret = c.env.PAYSTACK_SECRET_KEY;
  if (secret) {
    const signature = c.req.header("x-paystack-signature");
    if (!signature) throw ApiError.unauthorized("Missing signature.");
    const expected = await hmacSha512Hex(secret, rawBody);
    if (!timingSafeEqualHex(signature, expected)) throw ApiError.unauthorized("Invalid signature.");
  } else if (c.env.APP_ENV === "production") {
    throw new ApiError(503, "PAYMENT_PROVIDER_UNAVAILABLE", "Paystack secret is not configured.");
  }

  const body = JSON.parse(rawBody) as {
    event?: string;
    data?: { reference?: string; amount?: number; customer?: { email?: string } };
  };
  const reference = body.data?.reference;
  if (!reference) return c.json({ ok: true });

  const row = await c.env.DB.prepare(`SELECT id, user_id, status FROM payments WHERE reference = ?`)
    .bind(reference)
    .first<{ id: string; user_id: string; status: string }>();

  if (body.event === "charge.success") {
    if (row) {
      await c.env.DB.prepare(
        `UPDATE payments SET status = 'success', amount = ?, paid_at = ? WHERE reference = ?`,
      )
        .bind(Math.round((body.data?.amount ?? 0) / 100), isoNow(), reference)
        .run();
      if (row.status !== "success") {
        await c.env.DB.prepare(
          `INSERT OR IGNORE INTO notifications (id, user_id, title, body, time, engine) VALUES (?, ?, ?, ?, ?, 'payments')`,
        )
          .bind(
            `ntf-${randomToken(6)}`,
            row.user_id,
            "Payment received",
            `Your payment of ${reference} was confirmed.`,
            isoNow(),
          )
          .run();
      }
    }
  } else if (body.event === "charge.failed") {
    if (row) {
      await c.env.DB.prepare(
        `UPDATE payments SET status = 'failed', paid_at = ? WHERE reference = ?`,
      )
        .bind(isoNow(), reference)
        .run();
      if (row.status !== "failed") {
        await c.env.DB.prepare(
          `INSERT OR IGNORE INTO notifications (id, user_id, title, body, time, engine) VALUES (?, ?, ?, ?, ?, 'payments')`,
        )
          .bind(
            `ntf-${randomToken(6)}`,
            row.user_id,
            "Payment failed",
            `Your payment of ${reference} could not be completed.`,
            isoNow(),
          )
          .run();
      }
    }
  }
  return c.json({ ok: true });
});

payments.get("/session/:reference", requireAuth, async (c) => {
  const reference = c.req.param("reference");
  const row = await c.env.DB.prepare(
    `SELECT id, reference, email, amount, currency, status, provider, description, paid_at
       FROM payments WHERE reference = ?`,
  )
    .bind(reference)
    .first<PaymentRow>();
  if (!row) throw ApiError.notFound("Payment not found.");
  if (row.email !== c.get("authUser").email) throw ApiError.forbidden();
  return c.json(toApiPayment(row));
});

payments.get("/history", requireAuth, async (c) => {
  const { cursor, limit } = parsePagination(c);
  const userId = c.get("authUser").id;
  const total = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM payments WHERE user_id = ?`)
    .bind(userId)
    .first<{ n: number }>();
  const rows = await c.env.DB.prepare(
    `SELECT id, reference, email, amount, currency, status, provider, description, paid_at
       FROM payments WHERE user_id = ? ${cursor ? "AND id > ?" : ""} ORDER BY id ASC LIMIT ?`,
  )
    .bind(userId, ...(cursor ? [base64UrlDecode(cursor) ?? ""] : []), limit)
    .all<PaymentRow>();
  const items: ApiPayment[] = rows.results.map(toApiPayment);
  const result: Paginated<ApiPayment> = paginate(items, total?.n ?? 0, (last) =>
    base64UrlEncode(last.id),
  );
  return c.json(result);
});
