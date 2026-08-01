import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchInvoices,
  fetchExpenses,
  fetchPaymentBatches,
  type Invoice,
  type Expense,
  type PaymentBatch,
} from "@/lib/api/finance";

export const financeKeys = {
  invoices: ["finance", "invoices"] as const,
  expenses: ["finance", "expenses"] as const,
  payments: ["finance", "payments"] as const,
};

export function useInvoices() {
  return usePaginatedQuery<Invoice>(financeKeys.invoices, fetchInvoices);
}

export function useInvoiceItems(): Invoice[] {
  return flattenPages(useInvoices().data?.pages);
}

export function useExpenses() {
  return usePaginatedQuery<Expense>(financeKeys.expenses, fetchExpenses);
}

export function useExpenseItems(): Expense[] {
  return flattenPages(useExpenses().data?.pages);
}

export function usePaymentBatches() {
  return usePaginatedQuery<PaymentBatch>(financeKeys.payments, fetchPaymentBatches);
}

export function usePaymentBatchItems(): PaymentBatch[] {
  return flattenPages(usePaymentBatches().data?.pages);
}
