/**
 * Public digital shop client. Mirrors the established client pattern
 * (mock mode ↔ live Worker). Powers the /shop pages and the merchant
 * buy flow. Every call matches the backend /v1/shop/* contract.
 */
import { apiFetch } from "@/lib/api/client";

export interface ShopProduct {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  priceCurrency: "NGN";
  availability: "in_stock" | "out_of_stock" | "preorder";
  image: string;
  imageAlt: string;
  deliveryHours: number;
  fileFormat: string;
  highlights: string[];
  requirements: string[];
  license: string;
}

export interface ShopCatalog {
  currency: "NGN";
  country: "NG";
  storeUrl: string;
  products: ShopProduct[];
}

export interface ShopCheckoutResponse {
  reference: string;
  authorizationUrl: string;
  accessCode?: string;
  mock: boolean;
  amount: number;
  productTitle: string;
}

export interface ShopOrder {
  reference: string;
  productSlug: string;
  productTitle: string;
  amount: number;
  currency: string;
  email: string;
  name: string;
  status: "pending" | "success" | "failed" | "review";
  downloadUrl: string | null;
  paidAt: string | null;
  createdAt: string;
}

export interface StartShopCheckoutInput {
  productSlug: string;
  email: string;
  name?: string;
  redirectUrl: string;
  turnstileToken?: string;
}

/** Public — returns the live digital product catalog. */
export function fetchShopCatalog(): Promise<ShopCatalog> {
  return apiFetch<ShopCatalog>("/v1/shop/catalog");
}

/** Public — starts a Paystack checkout for one digital product. */
export function startShopCheckout(input: StartShopCheckoutInput): Promise<ShopCheckoutResponse> {
  return apiFetch<ShopCheckoutResponse>("/v1/shop/checkout", {
    method: "POST",
    body: input,
  });
}

/** Public — order status + download link after payment. */
export function fetchShopOrder(reference: string): Promise<ShopOrder> {
  return apiFetch<ShopOrder>(`/v1/shop/orders/${encodeURIComponent(reference)}`);
}
