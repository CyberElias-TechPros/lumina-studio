import { apiFetch } from "@/lib/api/client";
import type { ApiRequestInit } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

/**
 * Typed fetch helper for cursor-paginated list endpoints.
 * `url` should not include query params; pass them via `query`.
 */
export function fetchPaginated<T>(
  url: string,
  query: Record<string, string | number | boolean | null | undefined> = {},
  init: ApiRequestInit = {},
): Promise<Paginated<T>> {
  return apiFetch<Paginated<T>>(url, { ...init, query });
}
