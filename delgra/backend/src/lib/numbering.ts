import { isoNow } from "./ids.ts";

/**
 * Document numbering.
 *
 * The owner's live invoice numbers look like `DEL-2026-TF-01`:
 *   {PREFIX}-{YEAR}-{SERIES}-{SEQUENCE}
 *
 * Sequences reset each year and are allocated from the `counters` table. The
 * number is assembled *inside SQL* from `(SELECT value FROM counters …) + 1`
 * and the counter is bumped in the same `batch()` transaction as the row insert,
 * so two concurrent creations can never be handed the same number. The UNIQUE
 * index on `number` remains as a final safety net.
 */

export type DocumentKind = "invoice" | "waybill" | "purchase";

export interface NumberParts {
  prefix: string;
  year: number;
  series: string;
  sequence: number;
}

export function formatNumber(parts: NumberParts, minWidth = 2): string {
  const seq = String(Math.max(0, Math.floor(parts.sequence))).padStart(minWidth, "0");
  return `${parts.prefix}-${parts.year}-${parts.series}-${seq}`;
}

export function counterKey(kind: DocumentKind, prefix: string, year: number): string {
  return `${kind}:${prefix}:${year}`;
}

export function yearOf(dateIso: string, fallback = new Date()): number {
  const parsed = new Date(`${dateIso.slice(0, 10)}T00:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? fallback.getUTCFullYear() : parsed.getUTCFullYear();
}

function sanitize(value: string, fallback: string): string {
  const cleaned = (value ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  return cleaned || fallback;
}

export interface NumberAllocation {
  /** `INSERT INTO counters … ON CONFLICT DO NOTHING` */
  ensure: D1PreparedStatement;
  /** Bump the counter; must run AFTER the insert that consumed the number. */
  bump: D1PreparedStatement;
  /** SQL fragment producing the formatted number. */
  fragment: string;
  /** Bind params for `fragment`, in order. */
  fragmentParams: (string | number)[];
  key: string;
}

/**
 * Build the statements needed to allocate a document number atomically.
 *
 * Usage inside one `db.batch([...])`:
 *   [ alloc.ensure, <insert using alloc.fragment>, alloc.bump, … ]
 */
export function allocateNumber(
  db: D1Database,
  kind: DocumentKind,
  config: { prefix: string; series: string },
  dateIso: string,
  fallbackPrefix: string,
): NumberAllocation {
  const prefix = sanitize(config.prefix, fallbackPrefix);
  const series = sanitize(config.series, "TF");
  const year = yearOf(dateIso);
  const key = counterKey(kind, prefix, year);
  const now = isoNow();

  return {
    key,
    ensure: db
      .prepare(`INSERT INTO counters (key, value, updated_at) VALUES (?, 0, ?) ON CONFLICT(key) DO NOTHING`)
      .bind(key, now),
    bump: db.prepare(`UPDATE counters SET value = value + 1, updated_at = ? WHERE key = ?`).bind(now, key),
    fragment: `? || '-' || ? || '-' || ? || '-' || printf('%02d', COALESCE((SELECT value + 1 FROM counters WHERE key = ?), 1))`,
    fragmentParams: [prefix, String(year), series, key],
  };
}

/** Standalone allocation, for callers that do not need it inside a wider batch. */
export async function nextNumber(
  db: D1Database,
  kind: DocumentKind,
  config: { prefix: string; series: string },
  dateIso: string,
  fallbackPrefix: string,
): Promise<string> {
  const alloc = allocateNumber(db, kind, config, dateIso, fallbackPrefix);
  const [, bumped] = await db.batch([
    alloc.ensure,
    db.prepare(`UPDATE counters SET value = value + 1, updated_at = ? WHERE key = ? RETURNING value`).bind(isoNow(), alloc.key),
  ]);
  const row = bumped?.results?.[0] as { value?: number } | undefined;
  const sequence = row?.value ?? 1;
  const [prefix, year, series] = alloc.fragmentParams as [string, string, string];
  return formatNumber({ prefix, year: Number(year), series, sequence });
}

/** True when `value` matches the PREFIX-YEAR-SERIES-SEQ shape. */
export function isValidDocumentNumber(value: string): boolean {
  return /^[A-Z0-9]{1,8}-\d{4}-[A-Z0-9]{1,6}-\d{1,8}$/.test(value);
}
