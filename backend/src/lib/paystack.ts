import type { AppEnv } from "../types";

export interface PaystackVerification {
  /** Paystack transaction status: success | failed | abandoned | ongoing | pending | ... */
  status: string;
  /** Charged amount in kobo. */
  amount: number;
}

/**
 * Server-side transaction verification (source of truth after redirects and
 * for reconciliation jobs). Returns null when no secret is configured or the
 * provider is unreachable — callers must treat that as "unknown", not failure.
 */
export async function verifyPaystackTransaction(
  env: Pick<AppEnv, "PAYSTACK_SECRET_KEY">,
  reference: string,
): Promise<PaystackVerification | null> {
  if (!env.PAYSTACK_SECRET_KEY) return null;
  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    { headers: { Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}` } },
  ).catch(() => null);
  if (!res?.ok) return null;
  const payload = (await res.json().catch(() => null)) as {
    data?: { status?: string; amount?: number };
  } | null;
  if (!payload?.data?.status) return null;
  return { status: payload.data.status, amount: Number(payload.data.amount ?? 0) };
}
