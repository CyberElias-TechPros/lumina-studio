import type { ReactNode } from "react";
import type { UseQueryResult, UseInfiniteQueryResult } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState, type EmptyStateProps } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";

type AnyQuery =
  | Pick<
      UseQueryResult<unknown, unknown>,
      | "data"
      | "isPending"
      | "isLoading"
      | "isError"
      | "error"
      | "refetch"
      | "isFetching"
      | "isRefetching"
    >
  | Pick<
      UseInfiniteQueryResult<unknown, unknown>,
      | "data"
      | "isPending"
      | "isLoading"
      | "isError"
      | "error"
      | "refetch"
      | "isFetching"
      | "isRefetching"
    >;

interface QueryStateProps<TData> {
  query: AnyQuery;
  /** Loading fallback (default: 3 skeleton rows). */
  loading?: ReactNode;
  /** Empty-state props; rendered when `isEmpty` is true. */
  empty?: EmptyStateProps;
  /** Custom emptiness predicate (default: data is empty array). */
  isEmpty?: (data: TData) => boolean;
  /** Error-state props. */
  error?: { title?: string };
  children: (data: TData) => ReactNode;
}

const defaultLoading = (
  <div className="space-y-3">
    <Skeleton className="h-4 w-2/3" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-4 w-3/4" />
  </div>
);

/**
 * Switches a react-query result between loading / empty / error / content.
 * The building block for replacing hardcoded mock arrays screen by screen.
 */
export function QueryState<TData>({
  query,
  loading,
  empty,
  isEmpty,
  error,
  children,
}: QueryStateProps<TData>) {
  if (query.isPending || query.isLoading) return <>{loading ?? defaultLoading}</>;
  if (query.isError) {
    return (
      <ErrorState error={query.error} onRetry={() => void query.refetch()} title={error?.title} />
    );
  }
  const data = query.data as TData | null | undefined;
  const isEmptyData = Array.isArray(data) && data.length === 0;
  if (data === null || data === undefined || isEmptyData || (isEmpty ? isEmpty(data) : false)) {
    return <EmptyState {...(empty ?? { title: "Nothing here yet" })} />;
  }
  return <>{children(data)}</>;
}
