import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  createCheckout,
  fetchPaymentHistory,
  type CheckoutInput,
  type Payment,
} from "@/lib/api/payments";

export const paymentsKeys = {
  history: ["payments", "history"] as const,
};

export function usePaymentHistory() {
  return usePaginatedQuery<Payment>(paymentsKeys.history, fetchPaymentHistory);
}

export function usePaymentHistoryItems(): Payment[] {
  return flattenPages(usePaymentHistory().data?.pages);
}

export function useCreateCheckout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CheckoutInput) => createCheckout(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: paymentsKeys.history });
    },
  });
}
