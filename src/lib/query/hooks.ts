import {
  useInfiniteQuery,
  useQuery,
  type InfiniteData,
  type QueryKey,
} from "@tanstack/react-query";
import type { Paginated } from "@/lib/api/types";

/**
 * Cursor-paginated list hook. Works with any endpoint returning Paginated<T>.
 * `getNextPageParam` uses the server's `nextCursor` (null = last page).
 */
export function usePaginatedQuery<T>(
  queryKey: QueryKey,
  fetcher: (cursor?: string) => Promise<Paginated<T>>,
  options: {
    initialCursor?: string;
    enabled?: boolean;
    staleTime?: number;
  } = {},
) {
  return useInfiniteQuery<
    Paginated<T>,
    Error,
    InfiniteData<Paginated<T>>,
    QueryKey,
    string | undefined
  >({
    queryKey,
    queryFn: ({ pageParam }) => fetcher(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
    enabled: options.enabled,
    staleTime: options.staleTime ?? 30_000,
  });
}

/** Flatten pages of a usePaginatedQuery result into a single item array. */
export function flattenPages<T>(pages: { items: T[] }[] | undefined): T[] {
  return pages?.flatMap((page) => page.items) ?? [];
}

/** Simple non-paginated query wrapper with app defaults. */
export function useApiQuery<T, TError = Error>(
  queryKey: QueryKey,
  fetcher: () => Promise<T>,
  options: { enabled?: boolean; staleTime?: number } = {},
) {
  return useQuery({
    queryKey,
    queryFn: fetcher,
    enabled: options.enabled,
    staleTime: options.staleTime ?? 30_000,
  });
}
