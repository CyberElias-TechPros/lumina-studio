/**
 * Only the D1 binding is needed, so the parameter is the narrowest shape that
 * works. That keeps this callable from cron handlers and tests without
 * constructing a whole Env.
 */
export interface BusinessSource {
  DB: D1Database;
}

/** The single business-profile row, typed. */
export interface BusinessProfile {
  name: string;
  legalName: string | null;
  rcNumber: string | null;
  tin: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  country: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  logoKey: string | null;
  currency: string;
  currencySymbol: string;
  invoicePrefix: string;
  invoiceSeries: string;
  waybillPrefix: string;
  waybillSeries: string;
  purchasePrefix: string;
  paymentTermsDays: number;
  taxEnabled: boolean;
  taxRateBp: number;
  taxLabel: string;
  bankName: string | null;
  bankAccountName: string | null;
  bankAccountNumber: string | null;
  invoiceNotes: string | null;
  invoiceFooter: string | null;
}

const FALLBACK: BusinessProfile = {
  name: "DELGRA LTD",
  legalName: "DELGRA LTD",
  rcNumber: null,
  tin: null,
  addressLine1: null,
  addressLine2: null,
  city: null,
  state: null,
  country: "Nigeria",
  phone: null,
  email: null,
  website: null,
  logoKey: null,
  currency: "NGN",
  currencySymbol: "₦",
  invoicePrefix: "DEL",
  invoiceSeries: "TF",
  waybillPrefix: "WB",
  waybillSeries: "TF",
  purchasePrefix: "PO",
  paymentTermsDays: 14,
  taxEnabled: false,
  taxRateBp: 750,
  taxLabel: "VAT",
  bankName: null,
  bankAccountName: null,
  bankAccountNumber: null,
  invoiceNotes: null,
  invoiceFooter: null,
};

/**
 * Read the business profile, tolerating a missing/partial row so a fresh
 * database still renders a usable document instead of throwing.
 */
export async function getBusiness(env: BusinessSource): Promise<BusinessProfile> {
  const row = await env.DB.prepare(`SELECT * FROM business WHERE id = 'business'`).first<Record<string, unknown>>();
  if (!row) return FALLBACK;
  return {
    name: String(row.name ?? FALLBACK.name),
    legalName: (row.legal_name as string) ?? null,
    rcNumber: (row.rc_number as string) ?? null,
    tin: (row.tin as string) ?? null,
    addressLine1: (row.address_line1 as string) ?? null,
    addressLine2: (row.address_line2 as string) ?? null,
    city: (row.city as string) ?? null,
    state: (row.state as string) ?? null,
    country: String(row.country ?? "Nigeria"),
    phone: (row.phone as string) ?? null,
    email: (row.email as string) ?? null,
    website: (row.website as string) ?? null,
    logoKey: (row.logo_key as string) ?? null,
    currency: String(row.currency ?? "NGN"),
    currencySymbol: String(row.currency_symbol ?? "₦"),
    invoicePrefix: String(row.invoice_prefix ?? "INV"),
    invoiceSeries: String(row.invoice_series ?? "TF"),
    waybillPrefix: String(row.waybill_prefix ?? "WB"),
    waybillSeries: String(row.waybill_series ?? "TF"),
    purchasePrefix: String(row.purchase_prefix ?? "PO"),
    paymentTermsDays: Number(row.payment_terms_days ?? 14),
    taxEnabled: Boolean(row.tax_enabled),
    taxRateBp: Number(row.tax_rate_bp ?? 0),
    taxLabel: String(row.tax_label ?? "VAT"),
    bankName: (row.bank_name as string) ?? null,
    bankAccountName: (row.bank_account_name as string) ?? null,
    bankAccountNumber: (row.bank_account_number as string) ?? null,
    invoiceNotes: (row.invoice_notes as string) ?? null,
    invoiceFooter: (row.invoice_footer as string) ?? null,
  };
}

/** The address block printed under the business name. */
export function businessAddressLines(b: BusinessProfile): string[] {
  return [b.addressLine1, b.addressLine2, [b.city, b.state].filter(Boolean).join(", ") || null, b.country]
    .filter((v): v is string => Boolean(v && v.trim()))
    .map((v) => v.trim());
}
