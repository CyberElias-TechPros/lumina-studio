import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  createCheckout,
  fetchPaymentHistory,
  verifyPayment,
  type CheckoutInput,
  type Payment,
} from "@/lib/api/payments";

export const paymentsKeys = {
  history: ["payments", "history"] as const,
  verify: (reference: string) => ["payments", "verify", reference] as const,
};

export function usePaymentHistory() {
  return usePaginatedQuery<Payment>(paymentsKeys.history, fetchPaymentHistory);
}

export function usePaymentHistoryItems(): Payment[] {
  return flattenPages(usePaymentHistory().data?.pages);
}

export function useVerifyPayment(reference: string) {
  return useQuery({
    queryKey: paymentsKeys.verify(reference),
    queryFn: () => verifyPayment(reference),
    enabled: reference.length > 0,
    staleTime: 30_000,
  });
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
