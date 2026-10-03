import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export interface Invoice {
  id: string;
  party: string;
  amount: number;
  due: string;
  status: string;
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  spentOn?: string | null;
  vendor?: string | null;
  description?: string | null;
  method?: string | null;
  proofUrl?: string | null;
  recordedBy?: string | null;
  status?: string;
}

export interface RecordExpenseInput {
  spentOn: string;
  category: string;
  amount: number;
  vendor?: string;
  description?: string;
  method?: "transfer" | "cash" | "card" | "paystack" | "other";
  proofUrl?: string;
}

/** Finance: record an expense in the ledger (the one the P&L reads). */
export function recordExpense(input: RecordExpenseInput): Promise<{ ok: boolean; id: string }> {
  return apiFetch("/v1/expenses", { method: "POST", body: input });
}

/** Absolute URL of the monthly P&L CSV — for a plain <a download>. */
export function pnlCsvHref(month: string): string {
  const base = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");
  return `${base}/v1/pnl.csv?month=${encodeURIComponent(month)}`;
}

export interface PaymentBatch {
  id: string;
  batch: string;
  amount: number;
  count: number;
  date: string;
  status: string;
}

export function fetchInvoices(): Promise<Paginated<Invoice>> {
  return apiFetch<Paginated<Invoice>>("/v1/invoices");
}

export interface CreateInvoiceInput {
  party: string;
  amount: number;
  due: string;
}

export interface CreateInvoiceResult {
  invoice: Invoice;
}

export function createInvoice(input: CreateInvoiceInput): Promise<CreateInvoiceResult> {
  return apiFetch<CreateInvoiceResult>("/v1/invoices", { method: "POST", body: input });
}

export function fetchExpenses(): Promise<Paginated<Expense>> {
  return apiFetch<Paginated<Expense>>("/v1/expenses");
}

export function fetchPaymentBatches(): Promise<Paginated<PaymentBatch>> {
  return apiFetch<Paginated<PaymentBatch>>("/v1/payments");
}

export interface CreatePaymentBatchInput {
  batch: string;
  amount: number;
  count: number;
  date: string;
}

export interface CreatePaymentBatchResult {
  batch: PaymentBatch;
}

export function createPaymentBatch(
  input: CreatePaymentBatchInput,
): Promise<CreatePaymentBatchResult> {
  return apiFetch<CreatePaymentBatchResult>("/v1/payments", { method: "POST", body: input });
}

export interface PayrollRunResult {
  ok: boolean;
  processed: number;
  batch: PaymentBatch | null;
  ranAt: string;
}

/** Finance endpoint — apply approved payroll changes and record a batch. */
export function runPayroll(): Promise<PayrollRunResult> {
  return apiFetch<PayrollRunResult>("/v1/payroll/run", { method: "POST" });
}

export type InvoiceStatus = "sent" | "paid" | "refunded" | "void";

export function updateInvoiceStatus(
  id: string,
  status: InvoiceStatus,
): Promise<{ ok: true; id: string; status: string }> {
  return apiFetch(`/v1/invoices/${id}`, { method: "PATCH", body: { status } });
}

export type ExpenseStatus = "approved" | "rejected";

export function updateExpenseStatus(
  id: string,
  status: ExpenseStatus,
): Promise<{ ok: true; id: string; status: string }> {
  return apiFetch(`/v1/expenses/${id}`, { method: "PATCH", body: { status } });
}
