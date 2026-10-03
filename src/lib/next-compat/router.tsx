"use client";

/* eslint-disable react-refresh/only-export-components -- compatibility adapter intentionally exports hooks and Link together. */

import NextLink from "next/link";
import { usePathname, useRouter as useNextRouter } from "next/navigation";
import { useCallback, type ComponentPropsWithoutRef, type MouseEvent } from "react";
import { useRouteState, type RouteLocation } from "./route-context";

export { RouteStateProvider, useRouteState } from "./route-context";
export type { RouteLocation, RouteState } from "./route-context";

const EMPTY_LOCATION: RouteLocation = {
  pathname: "/",
  search: {},
  searchStr: "",
  hash: "",
  href: "/",
};

export type NavigateOptions = {
  to: string;
  params?: Record<string, string | number | undefined>;
  search?:
    | Record<string, unknown>
    | ((previous: Record<string, string | string[]>) => Record<string, unknown>);
  replace?: boolean;
  resetScroll?: boolean;
};

export type RedirectOptions = Omit<NavigateOptions, "resetScroll"> & {
  code?: number;
};

export type CompatRedirect = {
  __nextCompatRedirect: true;
  options: RedirectOptions;
};

export function redirect(options: RedirectOptions): CompatRedirect {
  return { __nextCompatRedirect: true, options };
}

export function isCompatRedirect(value: unknown): value is CompatRedirect {
  return (
    typeof value === "object" &&
    value !== null &&
    "__nextCompatRedirect" in value &&
    (value as { __nextCompatRedirect?: unknown }).__nextCompatRedirect === true
  );
}

export class RouteNotFound extends Error {
  constructor() {
    super("Route not found");
    this.name = "RouteNotFound";
  }
}

export function notFound(): RouteNotFound {
  return new RouteNotFound();
}

export function isRouteNotFound(value: unknown): value is RouteNotFound {
  return value instanceof RouteNotFound;
}

function readCurrentSearch(): Record<string, string | string[]> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string | string[]> = {};
  for (const key of new Set(params.keys())) {
    const values = params.getAll(key);
    result[key] = values.length > 1 ? values : (values[0] ?? "");
  }
  return result;
}

function interpolatePath(to: string, params?: Record<string, string | number | undefined>): string {
  return to.replace(/\$([A-Za-z0-9_]+)/g, (token, key: string) => {
    const value = params?.[key];
    return value == null ? token : encodeURIComponent(String(value));
  });
}

function appendSearch(href: string, search?: NavigateOptions["search"]): string {
  if (!search || href.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(href)) return href;

  const [beforeHash, hash = ""] = href.split("#", 2);
  const [path, existing = ""] = beforeHash.split("?", 2);
  const current: Record<string, string | string[]> = {};
  for (const [key, value] of new URLSearchParams(existing)) {
    const previous = current[key];
    current[key] =
      previous === undefined
        ? value
        : Array.isArray(previous)
          ? [...previous, value]
          : [previous, value];
  }
  const next =
    typeof search === "function" ? search({ ...current, ...readCurrentSearch() }) : search;
  const params = new URLSearchParams();
  for (const [key, raw] of Object.entries(next)) {
    if (raw == null) continue;
    if (Array.isArray(raw)) {
      for (const value of raw) if (value != null) params.append(key, String(value));
    } else {
      params.set(key, String(raw));
    }
  }
  const query = params.toString();
  return `${path}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
}

export function resolveTo(
  to: string,
  params?: Record<string, string | number | undefined>,
  search?: NavigateOptions["search"],
): string {
  return appendSearch(interpolatePath(to, params), search);
}

export function useParams(_options?: { from?: string }): Record<string, string> {
  return useRouteState().params;
}

export function useSearch(): Record<string, unknown> {
  return useRouteState().search;
}

export function useNavigate() {
  const router = useNextRouter();
  return useCallback(
    (options: NavigateOptions) => {
      const href = resolveTo(options.to, options.params, options.search);
      if (options.replace) router.replace(href, { scroll: options.resetScroll !== false });
      else router.push(href, { scroll: options.resetScroll !== false });
      return Promise.resolve();
    },
    [router],
  );
}

export function useLocation(): RouteLocation {
  const routeState = useRouteState();
  const pathname = usePathname() ?? routeState.location.pathname;
  return pathname === routeState.location.pathname
    ? routeState.location
    : { ...EMPTY_LOCATION, pathname, href: pathname };
}

export type RouterState = { location: RouteLocation };

export function useRouterState<T = RouterState>(options?: {
  select?: (state: RouterState) => T;
}): T {
  const location = useLocation();
  const state = { location };
  return options?.select ? options.select(state) : (state as T);
}

export function useRouter() {
  const router = useNextRouter();
  return {
    ...router,
    invalidate: () => router.refresh(),
  };
}

export function Outlet() {
  return useRouteState().outlet ?? null;
}

type ActiveProps = Partial<
  Pick<ComponentPropsWithoutRef<typeof NextLink>, "className" | "style" | "aria-current">
>;

type CompatLinkProps = Omit<ComponentPropsWithoutRef<typeof NextLink>, "href"> & {
  to: string;
  params?: Record<string, string | number | undefined>;
  search?: NavigateOptions["search"];
  activeProps?: ActiveProps | ((args: { isActive: boolean }) => ActiveProps);
  activeOptions?: { exact?: boolean };
  disabled?: boolean;
};

export function Link({
  to,
  params,
  search,
  activeProps,
  activeOptions,
  disabled,
  className,
  onClick,
  ...props
}: CompatLinkProps) {
  const pathname = usePathname() ?? "/";
  const href = resolveTo(to, params, search);
  const pathOnly = href.split(/[?#]/, 1)[0] || "/";
  const exact = activeOptions?.exact ?? true;
  const isActive = pathname === pathOnly || (!exact && pathname.startsWith(`${pathOnly}/`));
  const resolvedActiveProps =
    typeof activeProps === "function"
      ? activeProps({ isActive })
      : isActive
        ? activeProps
        : undefined;
  const activeClassName = resolvedActiveProps?.className;
  const mergedClassName = [className, activeClassName].filter(Boolean).join(" ") || undefined;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClick?.(event);
  };

  return (
    <NextLink
      {...props}
      {...resolvedActiveProps}
      href={href}
      className={mergedClassName}
      aria-disabled={disabled || props["aria-disabled"] || undefined}
      onClick={handleClick}
      tabIndex={disabled ? -1 : props.tabIndex}
    />
  );
}
