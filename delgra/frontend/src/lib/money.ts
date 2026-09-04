/**
 * Money helpers for the UI.
 *
 * The API speaks **integer kobo** in both directions. The UI accepts whatever a
 * human types ("45,000.50") and converts at the boundary, then always displays
 * from kobo. No currency value is ever held as a float in component state.
 */

export const KOBO_PER_UNIT = 100;

export function formatMoney(kobo: number | null | undefined, symbol = "₦"): string {
  const safe = Number.isFinite(kobo as number) ? (kobo as number) : 0;
  const negative = safe < 0;
  const formatted = new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(safe) / KOBO_PER_UNIT);
  return `${negative ? "-" : ""}${symbol}${formatted}`;
}

/** Compact form for dashboard tiles: ₦1.2M */
export function formatCompact(kobo: number | null | undefined, symbol = "₦"): string {
  const safe = Number.isFinite(kobo as number) ? (kobo as number) : 0;
  const units = Math.abs(safe) / KOBO_PER_UNIT;
  const formatted = new Intl.NumberFormat("en-NG", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(units);
  return `${safe < 0 ? "-" : ""}${symbol}${formatted}`;
}

/**
 * Parse user input into kobo. Returns null when the text is not a plausible
 * amount, so the form can show a field error rather than silently storing 0.
 */
export function parseAmountToKobo(input: string | number | null | undefined): number | null {
  if (input === null || input === undefined) return null;
  if (typeof input === "number") {
    if (!Number.isFinite(input)) return null;
    return Math.round(input * KOBO_PER_UNIT);
  }
  const raw = String(input).trim();
  if (raw === "") return null;

  let s = raw.replace(/[₦$\s\u00a0]/g, "");
  if (!/^-?[\d.,]+$/.test(s)) return null;

  const lastComma = s.lastIndexOf(",");
  const lastDot = s.lastIndexOf(".");
  if (lastComma !== -1 && lastDot !== -1) {
    s = lastComma > lastDot ? s.replace(/\./g, "").replace(",", ".") : s.replace(/,/g, "");
  } else if (lastComma !== -1) {
    const after = s.slice(lastComma + 1);
    const commas = (s.match(/,/g) ?? []).length;
    s = commas === 1 && after.length !== 3 ? s.replace(",", ".") : s.replace(/,/g, "");
  }
  if (!/^-?\d*(\.\d+)?$/.test(s)) return null;

  const value = Number.parseFloat(s);
  if (!Number.isFinite(value)) return null;
  const kobo = Math.round(value * KOBO_PER_UNIT);
  return Number.isSafeInteger(kobo) ? kobo : null;
}

/** kobo -> the string a money input should show ("45000.00"). */
export function koboToInput(kobo: number | null | undefined): string {
  const safe = Number.isFinite(kobo as number) ? (kobo as number) : 0;
  if (safe === 0) return "";
  return (safe / KOBO_PER_UNIT).toFixed(2);
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso.length === 10 ? `${iso}T00:00:00` : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function todayIso(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export function addDaysIso(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  const offset = d.getTimezoneOffset() * 60_000;
  return new Date(d.getTime() - offset).toISOString().slice(0, 10);
}

export function titleCase(value: string): string {
  return value.replace(/[_-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
