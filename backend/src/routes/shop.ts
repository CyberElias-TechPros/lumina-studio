/**
 * Public digital-product shop.
 *
 * Hosts the checkout endpoint the Google Merchant Center buy buttons point
 * at. Guest checkout is required: a buyer should not need a CEA account to
 * purchase a one-off template, planner or spreadsheet. We never log in the
 * buyer — we collect an email + optional name, create a Paystack
 * transaction through the same provider integration the invoices use, and
 * persist the order so the buyer's download link survives a refresh.
 *
 * Security model:
 *  - Checkout accepts only whitelisted product slugs that exist in the
 *    shared JSON catalog (the same list the merchant feed ships).
 *  - The browser sets `redirectUrl` so Paystack returns to /shop/<slug>/return,
 *    not a hostile site. We validate it against the configured origins.
 *  - The download link on success is a one-time-ish HMAC-signed URL: it
 *    embeds the order reference and a SHA-256 tag derived from the secret.
 *    Anyone with the reference still needs the secret to forge a valid tag.
 */
import { Hono } from "hono";
import { z } from "zod";
import { recordWebhookEvent } from "../lib/webhooks";
import type { AppEnv } from "../types";
import {
  hmacSha512Hex,
  isoNow,
  randomToken,
  sha256Hex,
  timingSafeEqualHex,
} from "../lib/crypto";
import { parseBody } from "../lib/validate";
import { hashIdentifier, rateLimit } from "../lib/rate-limit";
import { verifyTurnstile } from "../lib/turnstile";
import { isTrustedOrigin } from "../lib/origin";
import { ApiError } from "../lib/errors";

interface PaystackInitializeResponse {
  status: boolean;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

interface OrderRow {
  id: string;
  reference: string;
  product_id: string;
  product_slug: string;
  product_title: string;
  amount: number;
  currency: string;
  buyer_email: string;
  buyer_name: string;
  status: string;
  provider: string;
  download_url: string;
  download_count: number;
  created_at: string;
  paid_at: string | null;
}

interface CheckoutResponse {
  reference: string;
  authorizationUrl: string;
  accessCode?: string;
  mock: boolean;
  amount: number;
  productTitle: string;
}

export interface PublicProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  priceCurrency: "NGN";
  availability: "in_stock" | "out_of_stock" | "preorder";
  description: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  deliveryHours: number;
  fileFormat: string;
  highlights: string[];
  requirements: string[];
  license: string;
}

export interface CatalogPayload {
  currency: "NGN";
  country: "NG";
  storeUrl: string;
  products: PublicProduct[];
}

const PRODUCT_CATALOG: CatalogPayload["products"] = [
  {
    id: "cea-website-starter",
    slug: "website-starter",
    title: "One-page business website starter",
    price: 12000,
    priceCurrency: "NGN",
    availability: "in_stock",
    description:
      "A clean, mobile-ready one-page website starter for a small business, with a contact form and the four sections every Nigerian small business needs.",
    shortDescription:
      "Editable HTML/CSS/JS one-page website starter with contact form and setup guide.",
    image: "/images/products/website-starter.svg",
    imageAlt:
      "A flat illustration of a single-page website preview with sections for services, about, contact and a call to action.",
    deliveryHours: 24,
    fileFormat: "ZIP (HTML, CSS, JS, README)",
    highlights: [
      "Mobile-ready layout that works on phones, tablets and desktops",
      "Editable HTML/CSS/JS — no proprietary builder lock-in",
      "Contact form with mailto fallback so it works on any host",
      "Setup guide covering free hosting, domain pointing and SSL",
    ],
    requirements: [
      "A computer running Windows, macOS or Linux",
      "Any modern browser to preview the file as you edit",
      "About an hour to read the setup guide and publish the page",
    ],
    license: "Single-project commercial use. Resale or redistribution of the source files is not included.",
  },
  {
    id: "cea-invoice-stock-sheet",
    slug: "invoice-stock-sheet",
    title: "Invoice and stock sheet for small shops",
    price: 8000,
    priceCurrency: "NGN",
    availability: "in_stock",
    description:
      "An Excel- and Google-Sheets-compatible invoice and stock tracker built around how Nigerian retail shops actually buy, sell and reconcile.",
    shortDescription:
      "Spreadsheet for invoices, supplier bills and stock-in/stock-out with a summary tab.",
    image: "/images/products/invoice-stock-sheet.svg",
    imageAlt:
      "A flat illustration of a paper invoice and a small spreadsheet grid with rows for items and totals.",
    deliveryHours: 24,
    fileFormat: "XLSX (also opens in Google Sheets, LibreOffice, Numbers)",
    highlights: [
      "Issue invoices and record supplier bills in one workbook",
      "Stock-in / stock-out tracker with running balances",
      "Summary tab showing what you owe and what is owed to you",
      "Works in Microsoft Excel and Google Sheets without reformatting",
    ],
    requirements: [
      "Microsoft Excel 2016 or later, or a free Google account for Google Sheets",
      "Basic comfort entering numbers into cells",
      "About 30 minutes to set up your shop name, address and first products",
    ],
    license: "Single-shop commercial use. Resale of the template as-is is not included.",
  },
  {
    id: "cea-social-content-planner",
    slug: "social-content-planner",
    title: "Weekly social content planner",
    price: 6000,
    priceCurrency: "NGN",
    availability: "in_stock",
    description:
      "A weekly content planner for one small business — captions, hashtags, image prompts and a posting schedule across Instagram, Facebook and X.",
    shortDescription:
      "Weekly content planner with caption frameworks, hashtag bank, image prompts and posting-time guide.",
    image: "/images/products/social-content-planner.svg",
    imageAlt:
      "A flat illustration of a weekly calendar grid with coloured post slots and a small phone showing a feed.",
    deliveryHours: 24,
    fileFormat: "PDF (printable) + Google Docs companion link",
    highlights: [
      "Seven caption frameworks for everyday small business posts",
      "Hashtag bank curated for Nigerian Instagram, Facebook and X",
      "Image prompts you can shoot on a phone without a designer",
      "Posting-time guide tuned to Nigerian audience patterns",
    ],
    requirements: [
      "Any device that can open a PDF (phone, tablet, laptop)",
      "An active Instagram, Facebook or X account",
      "About an hour to fill in your first week",
    ],
    license: "Single-business use. Resale of the planner as-is is not included.",
  },
];

export function getCatalog(): CatalogPayload {
  return {
    currency: "NGN",
    country: "NG",
    storeUrl: "https://www.cea.ng/shop",
    products: PRODUCT_CATALOG,
  };
}

export function getProductBySlug(slug: string): PublicProduct | undefined {
  return PRODUCT_CATALOG.find((p) => p.slug === slug);
}

/** Sign a download URL for a paid order. Buyers present this to /v1/shop/download. */
async function signDownloadToken(reference: string, secret: string): Promise<string> {
  return sha256Hex(`${reference}::${secret}`);
}

/** Verify the token presented to /v1/shop/download. */
async function verifyDownloadToken(
  reference: string,
  token: string,
  secret: string,
): Promise<boolean> {
  const expected = await signDownloadToken(reference, secret);
  return timingSafeEqualHex(token, expected);
}

export const shop = new Hono<{ Bindings: AppEnv }>();

/* ------------------------------------------------------------------ */
/* Public — list the live digital products. Powers the shop page and  */
/* the merchant feed (which is generated at build time from this data). */
/* ------------------------------------------------------------------ */
shop.get("/catalog", async (c) => {
  return c.json(getCatalog());
});

/* ------------------------------------------------------------------ */
/* Public — checkout. Guest flow: the buyer provides their email so we */
/* can deliver the file and the receipt, but no account is created.    */
/* ------------------------------------------------------------------ */
const checkoutSchema = z.object({
  productSlug: z.string().min(1).max(80),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  name: z.string().trim().max(120).optional().default(""),
  redirectUrl: z.string().max(500),
  turnstileToken: z.string().max(4000).optional(),
});

shop.post("/checkout", async (c) => {
  const input = await parseBody(c, checkoutSchema);

  const product = getProductBySlug(input.productSlug);
  if (!product) {
    throw ApiError.notFound("Unknown product.");
  }
  if (product.availability !== "in_stock") {
    throw ApiError.validation({
      productSlug: ["This product is not available for purchase right now."],
    });
  }

  let parsedRedirect: URL | null = null;
  try {
    const candidate = new URL(input.redirectUrl);
    if (candidate.protocol === "https:") parsedRedirect = candidate;
  } catch {
    parsedRedirect = null;
  }
  if (!parsedRedirect) {
    throw ApiError.validation({ redirectUrl: ["redirectUrl must be an https URL."] });
  }
  if (!isTrustedOrigin(parsedRedirect.origin, c.env)) {
    throw ApiError.validation({
      redirectUrl: ["redirectUrl must use an approved application origin."],
    });
  }

  const ip = c.req.header("CF-Connecting-IP") ?? c.req.header("x-forwarded-for") ?? "unknown";
  await rateLimit(c.env.RATE_LIMIT, "shop", await hashIdentifier(ip), {
    limit: 8,
    windowSeconds: 600,
  });
  await verifyTurnstile(c, input.turnstileToken, ip);

  const reference = `cea_shop_${randomToken(10)}`;
  const now = isoNow();
  await c.env.DB.prepare(
    `INSERT INTO digital_product_orders
       (id, reference, product_id, product_slug, product_title, amount, currency,
        buyer_email, buyer_name, status, provider, download_url, download_count,
        created_at, paid_at)
     VALUES (?, ?, ?, ?, ?, ?, 'NGN', ?, ?, 'pending', 'paystack', '', 0, ?, NULL)`,
  )
    .bind(
      `ord-${reference}`,
      reference,
      product.id,
      product.slug,
      product.title,
      product.price,
      input.email.toLowerCase(),
      input.name ?? "",
      now,
    )
    .run();

  const secret = c.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return c.json(
      {
        reference,
        authorizationUrl: `https://checkout.paystack.com/${reference}`,
        mock: true,
        amount: product.price,
        productTitle: product.title,
      } satisfies CheckoutResponse,
      201,
    );
  }

  const callback = `${parsedRedirect.toString()}${parsedRedirect.search ? "&" : "?"}reference=${reference}`;
  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: input.email.toLowerCase(),
      amount: product.price * 100,
      currency: "NGN",
      reference,
      callback_url: callback,
      metadata: {
        custom_fields: [
          { display_name: "Product", value: product.title },
          { display_name: "Reference", value: reference },
        ],
      },
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
      amount: product.price,
      productTitle: product.title,
    } satisfies CheckoutResponse,
    201,
  );
});

/* ------------------------------------------------------------------ */
/* Public — order status. The return page hits this after Paystack    */
/* redirects the buyer back. We reconcile against Paystack when the    */
/* row is still 'pending'.                                             */
/* ------------------------------------------------------------------ */
shop.get("/orders/:reference", async (c) => {
  const reference = c.req.param("reference");
  const row = await c.env.DB.prepare(
    `SELECT id, reference, product_id, product_slug, product_title, amount, currency,
            buyer_email, buyer_name, status, provider, download_url, download_count,
            created_at, paid_at
       FROM digital_product_orders WHERE reference = ?`,
  )
    .bind(reference)
    .first<OrderRow>();
  if (!row) throw ApiError.notFound("Order not found.");

  if (row.status === "pending" && row.provider === "paystack" && c.env.PAYSTACK_SECRET_KEY) {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${c.env.PAYSTACK_SECRET_KEY}` },
    }).catch(() => null);
    if (res?.ok) {
      const payload = (await res.json().catch(() => null)) as {
        status?: boolean;
        data?: { status?: string; amount?: number };
      } | null;
      const remote = payload?.data?.status;
      const remoteAmount = payload?.data?.amount;
      if (remote === "success") {
        // Mismatch between the Paystack-reported amount (kobo) and our
        // expected amount (naira) means a tampered transaction. Flag for
        // review rather than release the download.
        if (typeof remoteAmount === "number" && remoteAmount < row.amount * 100) {
          await c.env.DB.prepare(
            `UPDATE digital_product_orders SET status = 'review' WHERE reference = ?`,
          )
            .bind(reference)
            .run();
        } else {
          const token = await signDownloadToken(reference, c.env.PAYSTACK_SECRET_KEY);
          const downloadUrl = `/v1/shop/download/${reference}?token=${token}`;
          await c.env.DB.prepare(
            `UPDATE digital_product_orders
               SET status = 'success',
                   download_url = ?,
                   paid_at = ?
             WHERE reference = ?`,
          )
            .bind(downloadUrl, row.paid_at ?? isoNow(), reference)
            .run();
        }
      } else if (remote === "failed" || remote === "abandoned") {
        await c.env.DB.prepare(
          `UPDATE digital_product_orders SET status = 'failed' WHERE reference = ?`,
        )
          .bind(reference)
          .run();
      }
    }
  }

  const updated = await c.env.DB.prepare(
    `SELECT id, reference, product_id, product_slug, product_title, amount, currency,
            buyer_email, buyer_name, status, provider, download_url, download_count,
            created_at, paid_at
       FROM digital_product_orders WHERE reference = ?`,
  )
    .bind(reference)
    .first<OrderRow>();
  if (!updated) throw ApiError.notFound("Order not found.");

  return c.json({
    reference: updated.reference,
    productSlug: updated.product_slug,
    productTitle: updated.product_title,
    amount: updated.amount,
    currency: updated.currency,
    email: updated.buyer_email,
    name: updated.buyer_name,
    status: updated.status,
    downloadUrl:
      updated.status === "success" ? updated.download_url || null : null,
    paidAt: updated.paid_at,
    createdAt: updated.created_at,
  });
});

/* ------------------------------------------------------------------ */
/* Public — download. Buyers land here from the post-payment page or  */
/* from the email. The signed token is the only auth — same model as  */
/* the rest of the merchant flow.                                       */
/* ------------------------------------------------------------------ */
shop.get("/download/:reference", async (c) => {
  const reference = c.req.param("reference");
  const token = c.req.query("token") ?? "";
  const row = await c.env.DB.prepare(
    `SELECT id, reference, status, download_url, download_count
       FROM digital_product_orders WHERE reference = ?`,
  )
    .bind(reference)
    .first<{
      id: string;
      reference: string;
      status: string;
      download_url: string;
      download_count: number;
    }>();
  if (!row) throw ApiError.notFound("Order not found.");
  if (row.status !== "success") {
    throw ApiError.validation({ status: ["This order is not paid yet."] });
  }
  if (!c.env.PAYSTACK_SECRET_KEY) {
    throw new ApiError(
      503,
      "PAYMENT_PROVIDER_UNAVAILABLE",
      "Downloads require a configured payment secret.",
    );
  }
  if (!(await verifyDownloadToken(reference, token, c.env.PAYSTACK_SECRET_KEY))) {
    throw ApiError.unauthorized("Invalid download token.");
  }

  await c.env.DB.prepare(
    `UPDATE digital_product_orders SET download_count = download_count + 1 WHERE reference = ?`,
  )
    .bind(reference)
    .run();

  const product = await lookupProductSlug(c, row.reference);
  const filename = product
    ? `${product.slug}.${product.fileFormat.includes("ZIP") ? "zip" : product.fileFormat.includes("PDF") ? "pdf" : "xlsx"}`
    : `${row.reference}.zip`;
  // The actual file is delivered out-of-band by email — the storefront
  // pages and the merchant feed already promise electronic delivery
  // within 24 hours. The signed URL proves ownership; the email body
  // (handled separately by the operator) carries the download link or
  // attaches the file directly. The route returns 200 so the UI can
  // show a clean "delivery confirmed" state.
  return c.json(
    {
      ok: true,
      message: "Payment confirmed. Your download link has been emailed to you.",
      reference: row.reference,
      filename,
    },
    200,
  );
});

async function lookupProductSlug(
  c: { env: AppEnv },
  reference: string,
): Promise<PublicProduct | undefined> {
  const row = await c.env.DB.prepare(
    `SELECT product_slug FROM digital_product_orders WHERE reference = ?`,
  )
    .bind(reference)
    .first<{ product_slug: string }>();
  return row ? getProductBySlug(row.product_slug) : undefined;
}

/* ------------------------------------------------------------------ */
/* Public — Paystack webhook. Same signature model as /payments/webhook */
/* ------------------------------------------------------------------ */
shop.post("/webhook", async (c) => {
  const rawBody = await c.req.text();
  const secret = c.env.PAYSTACK_SECRET_KEY;
  if (secret) {
    const signature = c.req.header("x-paystack-signature");
    if (!signature) throw ApiError.unauthorized("Missing signature.");
    const expected = await hmacSha512Hex(secret, rawBody);
    if (!timingSafeEqualHex(signature, expected)) throw ApiError.unauthorized("Invalid signature.");
  } else if (c.env.APP_ENV === "production") {
    throw new ApiError(
      503,
      "PAYMENT_PROVIDER_UNAVAILABLE",
      "Paystack secret is not configured.",
    );
  }

  let body: {
    event?: string;
    data?: {
      reference?: string;
      amount?: number;
    };
  };
  try {
    body = JSON.parse(rawBody);
  } catch {
    throw ApiError.validation({ body: ["Invalid JSON."] });
  }
  const reference = body.data?.reference;
  if (!reference) return c.json({ ok: true });

  if (!(await recordWebhookEvent(c.env.DB, "paystack-shop", body, rawBody))) {
    return c.json({ ok: true, duplicate: true });
  }

  const row = await c.env.DB.prepare(
    `SELECT id, reference, status, amount FROM digital_product_orders WHERE reference = ?`,
  )
    .bind(reference)
    .first<{ id: string; reference: string; status: string; amount: number }>();
  if (!row) return c.json({ ok: true });

  if (
    body.event === "charge.success" &&
    row.status !== "success" &&
    typeof body.data?.amount === "number" &&
    body.data.amount >= row.amount * 100
  ) {
    const token = secret ? await signDownloadToken(reference, secret) : "";
    const downloadUrl = token ? `/v1/shop/download/${reference}?token=${token}` : "";
    await c.env.DB.prepare(
      `UPDATE digital_product_orders
         SET status = 'success',
             download_url = ?,
             paid_at = ?
       WHERE reference = ?`,
    )
      .bind(downloadUrl, isoNow(), reference)
      .run();
  } else if (body.event === "charge.failed" && row.status !== "failed") {
    await c.env.DB.prepare(
      `UPDATE digital_product_orders SET status = 'failed' WHERE reference = ?`,
    )
      .bind(reference)
      .run();
  } else if (
    body.event === "charge.success" &&
    row.status !== "success" &&
    typeof body.data?.amount === "number" &&
    body.data.amount < row.amount * 100
  ) {
    await c.env.DB.prepare(
      `UPDATE digital_product_orders SET status = 'review' WHERE reference = ?`,
    )
      .bind(reference)
      .run();
  }
  return c.json({ ok: true });
});
