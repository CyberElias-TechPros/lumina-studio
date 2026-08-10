import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import { hrKeys } from "@/lib/query/hr";
import {
  fetchInvoices,
  fetchExpenses,
  fetchPaymentBatches,
  updateExpenseStatus,
  updateInvoiceStatus,
  runPayroll,
  type ExpenseStatus,
  type Invoice,
  type Expense,
  type PaymentBatch,
  type InvoiceStatus,
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

export function useUpdateInvoiceStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string; status: InvoiceStatus }) =>
      updateInvoiceStatus(input.id, input.status),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: financeKeys.invoices });
    },
  });
}

export function useRunPayroll() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: runPayroll,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: financeKeys.payments });
      void queryClient.invalidateQueries({ queryKey: hrKeys.payroll });
    },
  });
}

export function useUpdateExpenseStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string; status: ExpenseStatus }) =>
      updateExpenseStatus(input.id, input.status),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: financeKeys.expenses });
    },
  });
}
