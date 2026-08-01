import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export interface Payment {
  id: string;
  reference: string;
  email: string;
  amount: number;
  currency: string;
  status: "pending" | "success" | "failed";
  provider: string;
  description: string;
  paidAt?: string;
}

export interface CheckoutResponse {
  reference: string;
  authorizationUrl: string;
  accessCode?: string;
  mock: boolean;
}

export interface CheckoutInput {
  amount: number;
  description?: string;
  /** Where Paystack should send the user after payment (we append ?reference=). */
  redirectUrl?: string;
}

export interface VerifyPaymentResult extends Payment {
  verified: true;
}

export function fetchPaymentHistory(): Promise<Paginated<Payment>> {
  return apiFetch<Paginated<Payment>>("/v1/payments/history");
}

export function fetchPaymentSession(reference: string): Promise<Payment> {
  return apiFetch<Payment>(`/v1/payments/session/${reference}`);
}

export function verifyPayment(reference: string): Promise<VerifyPaymentResult> {
  return apiFetch<VerifyPaymentResult>(`/v1/payments/verify/${encodeURIComponent(reference)}`);
}

export function createCheckout(input: CheckoutInput): Promise<CheckoutResponse> {
  return apiFetch<CheckoutResponse>("/v1/payments/checkout", {
    method: "POST",
    body: input,
  });
}
