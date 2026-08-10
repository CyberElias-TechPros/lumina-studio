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

export function fetchExpenses(): Promise<Paginated<Expense>> {
  return apiFetch<Paginated<Expense>>("/v1/expenses");
}

export function fetchPaymentBatches(): Promise<Paginated<PaymentBatch>> {
  return apiFetch<Paginated<PaymentBatch>>("/v1/payments");
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

export type InvoiceStatus = "paid" | "refunded" | "void";

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
