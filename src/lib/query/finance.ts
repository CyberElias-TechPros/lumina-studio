import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import { fetchInvoices, fetchExpenses, type Invoice, type Expense } from "@/lib/api/finance";

export const financeKeys = {
  invoices: ["finance", "invoices"] as const,
  expenses: ["finance", "expenses"] as const,
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
