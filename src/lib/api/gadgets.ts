import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export type GadgetOrderStatus = "pending_confirmation" | "confirmed" | "fulfilled" | "cancelled";

export interface GadgetOrderItem {
  image: string;
  title: string;
  condition: string | null;
  quantity: number;
  unitPriceKobo: number;
  lineTotalKobo: number;
}

export interface GadgetOrderReceipt {
  ref: string;
  status: GadgetOrderStatus;
  subtotalKobo: number;
  currency: "NGN";
  observedAt: string;
  items: GadgetOrderItem[];
  createdAt: string;
  customerName?: string;
  deliveryAddress?: string;
  adminNote?: string;
  updatedAt?: string;
}

export interface AdminGadgetOrder extends GadgetOrderReceipt {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  notes: string;
  adminNote: string;
  updatedAt: string;
}

export function createGadgetOrder(input: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress?: string;
  notes?: string;
  items: { image: string; quantity: number }[];
}): Promise<GadgetOrderReceipt> {
  return apiFetch<GadgetOrderReceipt>("/v1/gadgets/orders", {
    method: "POST",
    body: input,
  });
}

export function lookupGadgetOrder(ref: string, email?: string): Promise<GadgetOrderReceipt> {
  return apiFetch<GadgetOrderReceipt>(`/v1/gadgets/orders/${encodeURIComponent(ref)}`, {
    query: email ? { email } : undefined,
  });
}

export function fetchAdminGadgetOrders(status?: string): Promise<Paginated<AdminGadgetOrder>> {
  return apiFetch<Paginated<AdminGadgetOrder>>("/v1/gadgets/admin/orders", {
    query: status ? { status } : undefined,
  });
}

export function updateAdminGadgetOrder(
  ref: string,
  input: { status: GadgetOrderStatus; adminNote?: string },
): Promise<{ ok: boolean; ref: string; status: GadgetOrderStatus; adminNote: string }> {
  return apiFetch(`/v1/gadgets/admin/orders/${encodeURIComponent(ref)}`, {
    method: "PATCH",
    body: input,
  });
}
