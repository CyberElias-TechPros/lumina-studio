import { z } from "zod";
import { parseAmountToKobo } from "./money.ts";

/**
 * Shared Zod schemas. Every client-controlled value is validated here before it
 * reaches SQL — frontend validation is a UX convenience, never a control.
 *
 * Money fields accept the string a human typed ("45,000.50") and are converted
 * to integer kobo by `kobo`, which fails validation rather than coercing junk to
 * zero.
 */

/**
 * Money on the wire is **integer kobo**, in both directions.
 *
 * Symmetry matters: a client that reads `total: 4500000` from a GET and sends it
 * straight back in a PATCH must get the same amount, not one inflated 100x.
 * Decimal strings are accepted only as exact integer text (with optional comma
 * grouping) so a form field can post "450,000" without the server guessing
 * whether that meant naira or kobo.
 */
const kobo = z
  .union([z.number(), z.string()])
  .transform((value, ctx) => {
    const parsed =
      typeof value === "number" ? value : Number(String(value).trim().replace(/,/g, ""));
    if (!Number.isFinite(parsed)) {
      ctx.addIssue({ code: "custom", message: "Enter a valid amount." });
      return z.NEVER;
    }
    if (!Number.isInteger(parsed)) {
      ctx.addIssue({ code: "custom", message: "Amounts are whole kobo — no decimals." });
      return z.NEVER;
    }
    return parsed;
  })
  .pipe(z.number().int().min(0).max(100_000_000_000)); // up to 1 billion NGN

const optionalKobo = kobo.optional();

const trimmed = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Must be ${max} characters or fewer.`);

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(254)
  .email("Enter a valid email address.");

export const dateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use the format YYYY-MM-DD.")
  .refine((v) => !Number.isNaN(new Date(`${v}T00:00:00.000Z`).getTime()), "Enter a real date.");

export const quantitySchema = z.coerce.number().int().min(1).max(1_000_000);

/* ------------------------------------------------------------------- auth */

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password.").max(200),
});

export const registerSchema = z.object({
  businessName: trimmed(120).min(2, "Enter your business name."),
  name: trimmed(120).min(2, "Enter your full name."),
  email: emailSchema,
  password: z.string().min(10, "Password must be at least 10 characters.").max(200),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(200),
  newPassword: z.string().min(10, "Password must be at least 10 characters.").max(200),
});

/* -------------------------------------------------------------- customers */

export const customerSchema = z.object({
  name: trimmed(160).min(2, "Customer name is required."),
  contactPerson: trimmed(120).optional().or(z.literal("")),
  email: z.union([emailSchema, z.literal("")]).optional(),
  phone: trimmed(32).optional().or(z.literal("")),
  altPhone: trimmed(32).optional().or(z.literal("")),
  addressLine1: trimmed(200).optional().or(z.literal("")),
  city: trimmed(80).optional().or(z.literal("")),
  state: trimmed(80).optional().or(z.literal("")),
  rcNumber: trimmed(40).optional().or(z.literal("")),
  taxId: trimmed(40).optional().or(z.literal("")),
  customerType: z.enum(["individual", "company", "government"]).default("individual"),
  notes: trimmed(2000).optional().or(z.literal("")),
  isActive: z.boolean().default(true),
});

/* --------------------------------------------------------------- products */

export const productSchema = z.object({
  sku: trimmed(60).min(1, "SKU is required.").regex(/^[A-Za-z0-9._-]+$/, "Use letters, numbers, dots, dashes or underscores."),
  name: trimmed(180).min(2, "Product name is required."),
  description: trimmed(2000).optional().or(z.literal("")),
  category: trimmed(80).optional().or(z.literal("")),
  conditionGrade: z.enum(["new", "grade_a", "grade_b", "grade_c", "grade_d"]).default("new"),
  unit: trimmed(24).default("unit"),
  costPrice: kobo.default(0),
  salePrice: kobo.default(0),
  quantity: z.coerce.number().int().min(0).max(1_000_000).default(0),
  reorderLevel: z.coerce.number().int().min(0).max(1_000_000).default(0),
  trackStock: z.boolean().default(true),
  isActive: z.boolean().default(true),
});

export const stockAdjustSchema = z.object({
  direction: z.enum(["in", "out", "adjust"]),
  quantity: z.coerce.number().int().min(1).max(1_000_000),
  unitCost: optionalKobo,
  note: trimmed(500).optional().or(z.literal("")),
});

/* -------------------------------------------------------------- suppliers */

export const supplierSchema = z.object({
  name: trimmed(160).min(2, "Supplier name is required."),
  contactPerson: trimmed(120).optional().or(z.literal("")),
  email: z.union([emailSchema, z.literal("")]).optional(),
  phone: trimmed(32).optional().or(z.literal("")),
  addressLine1: trimmed(200).optional().or(z.literal("")),
  city: trimmed(80).optional().or(z.literal("")),
  state: trimmed(80).optional().or(z.literal("")),
  notes: trimmed(2000).optional().or(z.literal("")),
  isActive: z.boolean().default(true),
});

/* --------------------------------------------------------------- invoices */

export const lineItemSchema = z.object({
  productId: z.string().trim().max(64).nullable().optional(),
  description: trimmed(500).min(1, "Each line needs a description."),
  quantity: quantitySchema,
  unitPrice: kobo,
});

export const invoiceSchema = z.object({
  customerId: z.string().trim().min(1, "Choose a customer."),
  issueDate: dateSchema,
  dueDate: dateSchema,
  items: z.array(lineItemSchema).min(1, "Add at least one line item.").max(200),
  discount: optionalKobo,
  shipping: optionalKobo,
  taxEnabled: z.boolean().optional(),
  taxRateBp: z.coerce.number().int().min(0).max(10_000).optional(),
  poNumber: trimmed(60).optional().or(z.literal("")),
  notes: trimmed(2000).optional().or(z.literal("")),
  terms: trimmed(1000).optional().or(z.literal("")),
  /** draft | sent — `partial`/`paid` are derived from payments, never set here. */
  status: z.enum(["draft", "sent"]).default("draft"),
});

export const invoiceUpdateSchema = invoiceSchema.partial().extend({
  status: z.enum(["draft", "sent", "void"]).optional(),
  voidReason: trimmed(500).optional().or(z.literal("")),
});

export const paymentSchema = z.object({
  amount: kobo.refine((v) => v > 0, "Payment amount must be greater than zero."),
  method: z
    .enum(["transfer", "cash", "card", "pos", "cheque", "mobile", "other"])
    .default("transfer"),
  reference: trimmed(120).optional().or(z.literal("")),
  paidAt: dateSchema,
  note: trimmed(500).optional().or(z.literal("")),
});

/* --------------------------------------------------------------- waybills */

export const waybillItemSchema = z.object({
  productId: z.string().trim().max(64).nullable().optional(),
  description: trimmed(500).min(1, "Each line needs a description."),
  quantity: z.coerce.number().int().min(1).max(100_000).default(1),
  serialNumber: trimmed(120).optional().or(z.literal("")),
  weightKg: z.coerce.number().min(0).max(100_000).optional(),
  note: trimmed(500).optional().or(z.literal("")),
});

export const waybillSchema = z.object({
  customerId: z.string().trim().min(1, "Choose a customer."),
  invoiceId: z.string().trim().max(64).nullable().optional(),
  waybillDate: dateSchema,
  carrier: trimmed(120).optional().or(z.literal("")),
  trackingNumber: trimmed(120).optional().or(z.literal("")),
  origin: trimmed(200).optional().or(z.literal("")),
  destination: trimmed(200).optional().or(z.literal("")),
  receiverName: trimmed(120).optional().or(z.literal("")),
  receiverPhone: trimmed(32).optional().or(z.literal("")),
  status: z.enum(["pending", "in_transit", "delivered", "exception", "cancelled"]).default("pending"),
  charges: optionalKobo,
  chargesPaidBy: z.enum(["sender", "receiver"]).default("sender"),
  pieces: z.coerce.number().int().min(1).max(10_000).default(1),
  notes: trimmed(2000).optional().or(z.literal("")),
  items: z.array(waybillItemSchema).max(200).default([]),
});

export const waybillStatusSchema = z.object({
  status: z.enum(["pending", "in_transit", "delivered", "exception", "cancelled"]),
  note: trimmed(500).optional().or(z.literal("")),
});

/* --------------------------------------------------------------- purchases */

export const purchaseSchema = z.object({
  supplierId: z.string().trim().max(64).nullable().optional(),
  orderDate: dateSchema,
  dueDate: dateSchema.optional().or(z.literal("")),
  items: z
    .array(
      z.object({
        productId: z.string().trim().max(64).nullable().optional(),
        description: trimmed(500).min(1),
        quantity: quantitySchema,
        unitCost: kobo,
      }),
    )
    .min(1, "Add at least one line item.")
    .max(200),
  discount: optionalKobo,
  shipping: optionalKobo,
  notes: trimmed(2000).optional().or(z.literal("")),
  status: z.enum(["draft", "ordered", "received", "cancelled"]).default("draft"),
});

export const purchasePaymentSchema = paymentSchema;

/* --------------------------------------------------------------- expenses */

export const expenseSchema = z.object({
  expenseDate: dateSchema,
  category: trimmed(80).min(1, "Choose a category."),
  description: trimmed(500).min(1, "Add a short description."),
  amount: kobo.refine((v) => v > 0, "Amount must be greater than zero."),
  paymentMethod: trimmed(40).default("transfer"),
  reference: trimmed(120).optional().or(z.literal("")),
  supplierId: z.string().trim().max(64).nullable().optional(),
});

/* --------------------------------------------------------------- settings */

export const businessSchema = z.object({
  name: trimmed(160).min(1, "Business name is required."),
  legalName: trimmed(200).optional().or(z.literal("")),
  rcNumber: trimmed(40).optional().or(z.literal("")),
  tin: trimmed(40).optional().or(z.literal("")),
  addressLine1: trimmed(200).optional().or(z.literal("")),
  addressLine2: trimmed(200).optional().or(z.literal("")),
  city: trimmed(80).optional().or(z.literal("")),
  state: trimmed(80).optional().or(z.literal("")),
  country: trimmed(80).default("Nigeria"),
  phone: trimmed(40).optional().or(z.literal("")),
  email: z.union([emailSchema, z.literal("")]).optional(),
  // `.url()` alone accepts `javascript:` and `data:`, which are dangerous once
  // the value is rendered into an anchor, so the scheme is pinned to http(s).
  website: z
    .union([
      z
        .string()
        .trim()
        .max(200)
        .url("Enter a valid URL (including https://).")
        .refine((v) => /^https?:\/\//i.test(v), "Use an http:// or https:// address."),
      z.literal(""),
    ])
    .optional(),
  currency: trimmed(8).default("NGN"),
  currencySymbol: trimmed(4).default("₦"),
  invoicePrefix: trimmed(8).regex(/^[A-Za-z0-9]*$/, "Letters and numbers only.").default("INV").transform((v) => v.toUpperCase()),
  invoiceSeries: trimmed(6).regex(/^[A-Za-z0-9]*$/, "Letters and numbers only.").default("TF").transform((v) => v.toUpperCase()),
  waybillPrefix: trimmed(8).regex(/^[A-Za-z0-9]*$/, "Letters and numbers only.").default("WB").transform((v) => v.toUpperCase()),
  waybillSeries: trimmed(6).regex(/^[A-Za-z0-9]*$/, "Letters and numbers only.").default("TF").transform((v) => v.toUpperCase()),
  purchasePrefix: trimmed(8).regex(/^[A-Za-z0-9]*$/, "Letters and numbers only.").default("PO").transform((v) => v.toUpperCase()),
  paymentTermsDays: z.coerce.number().int().min(0).max(365).default(14),
  taxEnabled: z.boolean().default(false),
  taxRateBp: z.coerce.number().int().min(0).max(10_000).default(750),
  taxLabel: trimmed(24).default("VAT"),
  bankName: trimmed(120).optional().or(z.literal("")),
  bankAccountName: trimmed(120).optional().or(z.literal("")),
  bankAccountNumber: trimmed(40).optional().or(z.literal("")),
  invoiceNotes: trimmed(2000).optional().or(z.literal("")),
  invoiceFooter: trimmed(1000).optional().or(z.literal("")),
});

/* ------------------------------------------------------------------ users */

export const userCreateSchema = z.object({
  name: trimmed(120).min(2, "Enter the user's name."),
  email: emailSchema,
  role: z.enum(["owner", "manager", "staff", "viewer"]),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters.")
    .max(200)
    .optional()
    .or(z.literal("")),
});

export const userUpdateSchema = z.object({
  name: trimmed(120).min(2).optional(),
  role: z.enum(["owner", "manager", "staff", "viewer"]).optional(),
  isActive: z.boolean().optional(),
});

/* ------------------------------------------------------------ list filters */

export const listQuerySchema = z.object({
  q: z.string().trim().max(120).optional(),
  status: z.string().trim().max(40).optional(),
  from: dateSchema.optional(),
  to: dateSchema.optional(),
  customerId: z.string().trim().max(64).optional(),
  sort: z.string().trim().max(40).optional(),
  dir: z.enum(["asc", "desc"]).default("desc"),
  page: z.coerce.number().int().min(1).max(100_000).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(25),
});

export const reportsQuerySchema = z.object({
  from: dateSchema,
  to: dateSchema,
});
