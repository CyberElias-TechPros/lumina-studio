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

export function fetchInvoices(): Promise<Paginated<Invoice>> {
  return apiFetch<Paginated<Invoice>>("/v1/invoices");
}

export function fetchExpenses(): Promise<Paginated<Expense>> {
  return apiFetch<Paginated<Expense>>("/v1/expenses");
}
