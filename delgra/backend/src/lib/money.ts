/**
 * Money handling for the whole system.
 *
 * RULE: currency is *always* an integer number of kobo (1 NGN = 100 kobo).
 * Floating point never touches a currency value — not in the DB, not in the API,
 * not in totals. Rounding happens exactly once, at the point a decimal string
 * (typed by a human or imported from CSV) becomes kobo.
 *
 * Every function here is pure and total: no throw on ordinary input, so callers
 * cannot accidentally produce NaN and poison a stored total.
 */

export const KOBO_PER_UNIT = 100;

/** True for a safe integer kobo amount. */
export function isKobo(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && Number.isSafeInteger(value);
}

/** Clamp to a non-negative safe integer kobo amount. */
export function toKoboSafe(value: number): number {
  if (!Number.isFinite(value)) return 0;
  const rounded = Math.round(value);
  if (!Number.isSafeInteger(rounded)) return 0;
  return rounded < 0 ? 0 : rounded;
}

/**
 * Parse a human-entered decimal string ("45,000.50", "45000", " 1 200,75 ") into
 * kobo. Returns null when the string is not a plausible amount, so the caller
 * can surface a validation error instead of silently storing zero.
 *
 * Accepts comma thousands separators and a comma decimal separator, because both
 * appear on Nigerian invoices and bank statements.
 */
export function parseAmountToKobo(input: string | number | null | undefined): number | null {
  if (input === null || input === undefined) return null;
  if (typeof input === "number") {
    if (!Number.isFinite(input)) return null;
    return toKoboSafe(input * KOBO_PER_UNIT);
  }
  const raw = String(input).trim();
  if (raw === "") return null;

  // Strip currency symbols, spaces and non-breaking spaces.
  let s = raw.replace(/[₦$\s\u00a0]/g, "");
  if (!/^-?[\d.,]+$/.test(s)) return null;

  const lastComma = s.lastIndexOf(",");
  const lastDot = s.lastIndexOf(".");

  if (lastComma !== -1 && lastDot !== -1) {
    // Whichever separator comes last is the decimal separator.
    if (lastComma > lastDot) s = s.replace(/\./g, "").replace(",", ".");
    else s = s.replace(/,/g, "");
  } else if (lastComma !== -1) {
    const afterComma = s.slice(lastComma + 1);
    // "1,234" -> thousands; "12,5" -> decimal. Exactly one comma + 1-2 digits
    // after it is ambiguous in the wild, so treat <=2 trailing digits as decimal.
    const commaCount = (s.match(/,/g) ?? []).length;
    if (commaCount === 1 && afterComma.length !== 3) s = s.replace(",", ".");
    else s = s.replace(/,/g, "");
  }

  if (!/^-?\d*(\.\d+)?$/.test(s)) return null;
  const value = Number.parseFloat(s);
  if (!Number.isFinite(value)) return null;

  const kobo = Math.round(value * KOBO_PER_UNIT);
  if (!Number.isSafeInteger(kobo)) return null;
  return kobo;
}

/** kobo -> NGN as a float, for display or chart maths only. Never store this. */
export function koboToUnits(kobo: number): number {
  return kobo / KOBO_PER_UNIT;
}

/**
 * Format kobo for display: "₦45,000.00". `symbol` defaults to the Naira sign.
 * Negative values are shown as "-₦1,234.00" (accounting style is left to the UI).
 */
export function formatMoney(kobo: number, symbol = "₦", currency?: string): string {
  const units = (Number.isFinite(kobo) ? kobo : 0) / KOBO_PER_UNIT;
  const negative = units < 0;
  const formatted = new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(units));
  const sign = negative ? "-" : "";
  return currency && currency !== "NGN" ? `${sign}${currency} ${formatted}` : `${sign}${symbol}${formatted}`;
}

/** Amounts written in words for cheque-style invoice footers. */
const ONES = [
  "zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve",
  "thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen",
];
const TENS = ["", "", "twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
const SCALES = ["", " thousand", " million", " billion", " trillion"];

function chunkToWords(n: number): string {
  const parts: string[] = [];
  if (n >= 100) {
    parts.push(`${ONES[Math.floor(n / 100)]!} hundred`);
    n %= 100;
  }
  if (n >= 20) {
    const ten = TENS[Math.floor(n / 10)]!;
    const one = n % 10;
    parts.push(one ? `${ten}-${ONES[one]}` : ten);
  } else if (n > 0) {
    parts.push(ONES[n]!);
  }
  return parts.join(" and ");
}

/** 45_000_00 kobo -> "Forty-Five Thousand Naira and Fifty Kobo Only" */
export function amountInWords(kobo: number, currencyName = "Naira", subName = "Kobo"): string {
  const safe = toKoboSafe(Math.abs(kobo));
  const whole = Math.floor(safe / KOBO_PER_UNIT);
  const fraction = safe % KOBO_PER_UNIT;

  const groups: string[] = [];
  let remaining = whole;
  let scale = 0;
  while (remaining > 0 && scale < SCALES.length) {
    const chunk = remaining % 1000;
    if (chunk > 0) groups.unshift(`${chunkToWords(chunk)}${SCALES[scale]}`);
    remaining = Math.floor(remaining / 1000);
    scale += 1;
  }

  const titleCase = (value: string) => value.replace(/\b[a-z]/g, (c) => c.toUpperCase());

  // Currency name belongs immediately after the whole amount, before any kobo
  // fraction: "…Thousand Naira and Fifty Kobo Only", never "…Kobo Naira Only".
  const wholePart = whole > 0 ? `${titleCase(groups.join(", "))} ${currencyName}` : `Zero ${currencyName}`;
  const fractionPart = fraction > 0 ? ` and ${titleCase(chunkToWords(fraction))} ${subName}` : "";

  return `${wholePart}${fractionPart} Only`;
}

/**
 * Apply a basis-point rate to a kobo base with banker-neutral half-up rounding.
 * 750 bp = 7.50%. Returns integer kobo.
 */
export function applyRateBp(baseKobo: number, rateBp: number): number {
  const base = toKoboSafe(baseKobo);
  const rate = Number.isFinite(rateBp) ? Math.max(0, Math.round(rateBp)) : 0;
  // base * rate can exceed 2^53 only for absurd values; guard anyway.
  const numerator = base * rate;
  if (!Number.isSafeInteger(numerator)) return Math.round((base / 10_000) * rate);
  return Math.round(numerator / 10_000);
}
