import { Hono } from "hono";
import { businessSchema } from "../lib/validate.ts";
import { clientIp, requireCap } from "../lib/auth.ts";
import { writeAudit } from "../lib/audit.ts";
import { getBusiness } from "../lib/business.ts";
import { isoNow } from "../lib/ids.ts";
import { capabilitiesFor } from "../lib/permissions.ts";
import { AppError } from "../lib/errors.ts";
import type { Env, SessionUser } from "../lib/env.ts";

type AppEnv = { Bindings: Env; Variables: { user: SessionUser; requestId: string } };

const settings = new Hono<AppEnv>();

/**
 * Business profile — the printable identity on every document.
 *
 * Readable by any signed-in user (the invoice form needs the numbering prefix and
 * default terms); writable only by an owner.
 */
settings.get("/business", async (c) => {
  const business = await getBusiness(c.env);
  return c.json({ business });
});

settings.patch("/business", requireCap("manage:settings"), async (c) => {
  const current = await c.env.DB.prepare(`SELECT * FROM business WHERE id = 'business'`).first<Record<string, unknown>>();

  const merged = {
    name: current?.name ?? "DELGRA LTD",
    legalName: current?.legal_name ?? "",
    rcNumber: current?.rc_number ?? "",
    tin: current?.tin ?? "",
    addressLine1: current?.address_line1 ?? "",
    addressLine2: current?.address_line2 ?? "",
    city: current?.city ?? "",
    state: current?.state ?? "",
    country: current?.country ?? "Nigeria",
    phone: current?.phone ?? "",
    email: current?.email ?? "",
    website: current?.website ?? "",
    currency: current?.currency ?? "NGN",
    currencySymbol: current?.currency_symbol ?? "₦",
    invoicePrefix: current?.invoice_prefix ?? "INV",
    invoiceSeries: current?.invoice_series ?? "TF",
    waybillPrefix: current?.waybill_prefix ?? "WB",
    waybillSeries: current?.waybill_series ?? "TF",
    purchasePrefix: current?.purchase_prefix ?? "PO",
    paymentTermsDays: current?.payment_terms_days ?? 14,
    taxEnabled: Boolean(current?.tax_enabled),
    taxRateBp: current?.tax_rate_bp ?? 750,
    taxLabel: current?.tax_label ?? "VAT",
    bankName: current?.bank_name ?? "",
    bankAccountName: current?.bank_account_name ?? "",
    bankAccountNumber: current?.bank_account_number ?? "",
    invoiceNotes: current?.invoice_notes ?? "",
    invoiceFooter: current?.invoice_footer ?? "",
    ...(await c.req.json()),
  };

  const input = businessSchema.parse(merged);

  // Changing a prefix starts a fresh sequence rather than colliding with the
  // numbers already issued under the old one; the counter key includes the
  // prefix, so this falls out naturally.
  await c.env.DB.prepare(
    `UPDATE business SET
       name = ?, legal_name = ?, rc_number = ?, tin = ?, address_line1 = ?, address_line2 = ?,
       city = ?, state = ?, country = ?, phone = ?, email = ?, website = ?,
       currency = ?, currency_symbol = ?, invoice_prefix = ?, invoice_series = ?,
       waybill_prefix = ?, waybill_series = ?, purchase_prefix = ?, payment_terms_days = ?,
       tax_enabled = ?, tax_rate_bp = ?, tax_label = ?,
       bank_name = ?, bank_account_name = ?, bank_account_number = ?,
       invoice_notes = ?, invoice_footer = ?, updated_at = ?
     WHERE id = 'business'`,
  )
    .bind(
      input.name,
      input.legalName || null,
      input.rcNumber || null,
      input.tin || null,
      input.addressLine1 || null,
      input.addressLine2 || null,
      input.city || null,
      input.state || null,
      input.country,
      input.phone || null,
      input.email || null,
      input.website || null,
      input.currency,
      input.currencySymbol,
      input.invoicePrefix.toUpperCase(),
      input.invoiceSeries.toUpperCase(),
      input.waybillPrefix.toUpperCase(),
      input.waybillSeries.toUpperCase(),
      input.purchasePrefix.toUpperCase(),
      input.paymentTermsDays,
      input.taxEnabled ? 1 : 0,
      input.taxRateBp,
      input.taxLabel,
      input.bankName || null,
      input.bankAccountName || null,
      input.bankAccountNumber || null,
      input.invoiceNotes || null,
      input.invoiceFooter || null,
      isoNow(),
    )
    .run();

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "settings.update_business",
    entityType: "business",
    entityId: "business",
    ip: clientIp(c),
  });

  return c.json({ business: await getBusiness(c.env) });
});

/** Logo upload — stored in R2, referenced by key on the business row. */
settings.post("/logo", requireCap("manage:settings"), async (c) => {
  const maxBytes = Number(c.env.MAX_UPLOAD_BYTES ?? 10 * 1024 * 1024);
  const contentType = c.req.header("content-type") ?? "";
  if (!contentType.startsWith("image/")) {
    throw new AppError("unsupported_media_type", "Upload a PNG, JPEG or SVG image.");
  }
  const declared = Number(c.req.header("content-length") ?? "0");
  if (declared > maxBytes) {
    throw new AppError("payload_too_large", `Logo must be under ${Math.round(maxBytes / 1024 / 1024)} MB.`);
  }

  const bytes = new Uint8Array(await c.req.arrayBuffer());
  if (bytes.byteLength === 0) throw AppError.validation("The uploaded file is empty.");
  if (bytes.byteLength > maxBytes) {
    throw new AppError("payload_too_large", `Logo must be under ${Math.round(maxBytes / 1024 / 1024)} MB.`);
  }

  const ext = contentType.includes("png") ? "png" : contentType.includes("svg") ? "svg" : "jpg";
  const key = `branding/logo.${ext}`;
  await c.env.UPLOADS.put(key, bytes, { httpMetadata: { contentType } });

  await c.env.DB.prepare(`UPDATE business SET logo_key = ?, updated_at = ? WHERE id = 'business'`)
    .bind(key, isoNow())
    .run();

  await writeAudit(c.env, {
    actor: c.get("user"),
    action: "settings.update_logo",
    entityType: "business",
    entityId: "business",
    summary: key,
    ip: clientIp(c),
  });

  return c.json({ logoKey: key });
});

settings.get("/logo", async (c) => {
  const business = await getBusiness(c.env);
  if (!business.logoKey) throw AppError.notFound("Logo");
  const object = await c.env.UPLOADS.get(business.logoKey);
  if (!object) throw AppError.notFound("Logo");

  c.header("content-type", object.httpMetadata?.contentType?.toString() ?? "image/png");
  // Public and immutable: branding is not sensitive and changes rarely.
  c.header("cache-control", "public, max-age=86400");
  return c.body(await object.arrayBuffer());
});

/** What this user is allowed to do — drives UI gating without a second call. */
settings.get("/capabilities", async (c) => {
  const user = c.get("user");
  if (!user) throw AppError.unauthorized();
  return c.json({ role: user.role, capabilities: capabilitiesFor(user.role) });
});

export default settings;
