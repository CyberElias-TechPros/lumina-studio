import { useRouteState, type RouteLocation } from "./route-context";

// These declarations accept heterogeneous legacy route callbacks while their
// own inferred Route type preserves the concrete loader/search return values.
/* eslint-disable @typescript-eslint/no-explicit-any */
export type RouteOptions = {
  component?: React.ComponentType<any>;
  beforeLoad?: (args: any) => unknown;
  loader?: (args: any) => unknown;
  validateSearch?:
    | ((search: Record<string, unknown>) => unknown)
    | { parse: (search: Record<string, unknown>) => unknown };
  parseParams?: (params: Record<string, string>) => unknown;
  stringifyParams?: (params: Record<string, unknown>) => unknown;
  head?: (args: any) => unknown;
  [key: string]: unknown;
};

type ValidateSearchResult<T> = T extends { validateSearch: (...args: any[]) => infer R }
  ? Awaited<R>
  : T extends { validateSearch: { parse: (...args: any[]) => infer R } }
    ? Awaited<R>
    : Record<string, unknown>;

type LoaderResult<T> = T extends { loader: (...args: any[]) => infer R } ? Awaited<R> : undefined;

export type RouteDefinition<TOptions extends RouteOptions = RouteOptions> = {
  path: string;
  options: TOptions;
  useParams: () => Record<string, string>;
  useSearch: () => ValidateSearchResult<TOptions>;
  useLoaderData: () => LoaderResult<TOptions>;
  useRouteContext: () => Record<string, unknown>;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export type RouteDefinitionLike = {
  path: string;
  options: RouteOptions;
  useParams: () => Record<string, string>;
  useSearch: () => unknown;
  useLoaderData: () => unknown;
  useRouteContext: () => Record<string, unknown>;
};

/** Keeps migrated route modules declarative while App Router owns matching. */
export function createFileRoute(path: string) {
  return function defineRoute<TOptions extends RouteOptions>(options: TOptions) {
    return {
      path,
      options,
      useParams: () => useRouteState().params,
      useSearch: () => useRouteState().search as ValidateSearchResult<TOptions>,
      useLoaderData: () => useRouteState().loaderData as LoaderResult<TOptions>,
      useRouteContext: () => useRouteState().routeContext,
    } satisfies RouteDefinition<TOptions>;
  };
}

export type { RouteLocation };
