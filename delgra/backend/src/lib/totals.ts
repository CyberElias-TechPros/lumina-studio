import { applyRateBp, toKoboSafe } from "./money.ts";
import { daysSince } from "./ids.ts";

/**
 * THE invoice/waybill money rules, in one place.
 *
 * Handlers must never recompute totals inline — every write path goes through
 * `computeInvoiceTotals` so that the stored subtotal/discount/tax/total/paid can
 * never disagree with each other or with the line items. This is what prevents
 * the classic bug where the UI shows one figure and the database holds another.
 */

export interface LineInput {
  description: string;
  quantity: number;
  unitPrice: number; // kobo
}

export interface TotalsInput {
  items: LineInput[];
  discount?: number; // kobo
  shipping?: number; // kobo
  taxEnabled?: boolean;
  taxRateBp?: number;
  paidAmount?: number; // kobo
}

export interface Totals {
  subtotal: number;
  discount: number;
  taxEnabled: boolean;
  taxRateBp: number;
  taxAmount: number;
  shipping: number;
  total: number;
  paidAmount: number;
  balance: number;
  /** The lifecycle status implied by the money alone. */
  moneyStatus: "paid" | "partial" | "unpaid";
}

export function lineAmount(quantity: number, unitPrice: number): number {
  const qty = Number.isFinite(quantity) ? Math.max(0, Math.round(quantity)) : 0;
  return toKoboSafe(qty * toKoboSafe(unitPrice));
}

export function computeInvoiceTotals(input: TotalsInput): Totals {
  const subtotal = input.items.reduce((sum, item) => sum + lineAmount(item.quantity, item.unitPrice), 0);

  // A discount can never exceed the subtotal; a negative one is meaningless.
  const requestedDiscount = toKoboSafe(input.discount ?? 0);
  const discount = Math.min(requestedDiscount, subtotal);

  const taxable = subtotal - discount;
  const taxEnabled = Boolean(input.taxEnabled) && taxable > 0;
  const taxRateBp = taxEnabled ? Math.max(0, Math.round(input.taxRateBp ?? 0)) : 0;
  const taxAmount = taxEnabled ? applyRateBp(taxable, taxRateBp) : 0;

  const shipping = toKoboSafe(input.shipping ?? 0);
  const total = taxable + taxAmount + shipping;

  // Overpayment is allowed as a credit but never drives `total` down.
  const paidAmount = Math.min(toKoboSafe(input.paidAmount ?? 0), Math.max(total, 0));
  const balance = Math.max(total - paidAmount, 0);

  const moneyStatus: Totals["moneyStatus"] =
    total > 0 && paidAmount >= total ? "paid" : paidAmount > 0 ? "partial" : "unpaid";

  return {
    subtotal,
    discount,
    taxEnabled,
    taxRateBp,
    taxAmount,
    shipping,
    total,
    paidAmount,
    balance,
    moneyStatus,
  };
}

export type InvoiceStatus = "draft" | "sent" | "partial" | "paid" | "void";
/** UI-facing view: the persisted status plus the derived `overdue` flag. */
export type InvoiceDisplayStatus = InvoiceStatus | "overdue";

export interface StatusRow {
  status: InvoiceStatus;
  due_date: string;
  total: number;
  paid_amount: number;
}

/**
 * An invoice is overdue when it is outstanding (sent or partly paid) and its due
 * date has passed. This is *derived*, never stored — a stored `overdue` status
 * would go stale the moment the date rolled over with no write to refresh it.
 */
export function isOverdue(row: StatusRow, today = new Date()): boolean {
  if (row.status !== "sent" && row.status !== "partial") return false;
  if (row.total > 0 && row.paid_amount >= row.total) return false;
  return row.due_date < todayUtcOf(today);
}

function todayUtcOf(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Days outstanding past the due date; 0 when not yet due. */
export function daysOverdue(dueDate: string): number {
  return Math.max(0, daysSince(dueDate));
}

/** Resolve the display status for a row, collapsing the derived overdue case. */
export function displayStatus(row: StatusRow): InvoiceDisplayStatus {
  return isOverdue(row) ? "overdue" : row.status;
}

/**
 * Legal status transitions. Enforced server-side so the UI cannot push an
 * invoice into an impossible state (e.g. void -> paid).
 */
const INVOICE_TRANSITIONS: Record<InvoiceStatus, readonly InvoiceStatus[]> = {
  draft: ["sent", "void"],
  sent: ["draft", "paid", "void"],
  partial: ["paid", "void"],
  paid: ["partial"], // only reachable by removing/adjusting a payment
  void: ["draft"], // un-void back to draft, never straight to paid
};

export function canTransitionInvoice(from: InvoiceStatus, to: InvoiceStatus): boolean {
  if (from === to) return true;
  return INVOICE_TRANSITIONS[from]?.includes(to) ?? false;
}

export const WAYBILL_STATUSES = ["pending", "in_transit", "delivered", "exception", "cancelled"] as const;
export type WaybillStatus = (typeof WAYBILL_STATUSES)[number];

const WAYBILL_TRANSITIONS: Record<WaybillStatus, readonly WaybillStatus[]> = {
  pending: ["in_transit", "cancelled"],
  in_transit: ["delivered", "exception", "cancelled"],
  exception: ["in_transit", "delivered", "cancelled"],
  delivered: [],
  cancelled: ["pending"],
};

export function canTransitionWaybill(from: WaybillStatus, to: WaybillStatus): boolean {
  if (from === to) return true;
  return WAYBILL_TRANSITIONS[from]?.includes(to) ?? false;
}
