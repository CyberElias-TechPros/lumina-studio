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
