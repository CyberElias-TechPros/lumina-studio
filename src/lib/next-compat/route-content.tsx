"use client";

import { use, useEffect } from "react";
import { isCompatRedirect, isRouteNotFound, Link, type CompatRedirect } from "./router";
import { RouteStateProvider, type RouteLocation, type RouteState } from "./route-context";
import type { RouteDefinitionLike, RouteOptions } from "./route-definition";

export type RouteContentProps = {
  route: RouteDefinitionLike;
  params: Record<string, string>;
  pathname: string;
  searchParams: Record<string, string | string[] | undefined>;
};

type HeadResult = {
  meta?: Array<Record<string, unknown>>;
  links?: Array<Record<string, unknown>>;
  scripts?: Array<Record<string, unknown>>;
};

function createLocation(
  pathname: string,
  searchParams: Record<string, string | string[] | undefined>,
): RouteLocation {
  const search = Object.fromEntries(
    Object.entries(searchParams).filter(
      (entry): entry is [string, string | string[]] => entry[1] !== undefined,
    ),
  );
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(search)) {
    if (Array.isArray(value)) value.forEach((part) => params.append(key, part));
    else params.set(key, value);
  }
  const searchStr = params.toString();
  return {
    pathname,
    search,
    searchStr: searchStr ? `?${searchStr}` : "",
    hash: "",
    href: `${pathname}${searchStr ? `?${searchStr}` : ""}`,
  };
}

function getSearchData(
  options: RouteOptions,
  searchParams: Record<string, string | string[] | undefined>,
): Record<string, unknown> {
  const rawSearch = Object.fromEntries(
    Object.entries(searchParams).filter(
      (entry): entry is [string, string | string[]] => entry[1] !== undefined,
    ),
  );
  const validator = options.validateSearch;
  const validated =
    typeof validator === "function"
      ? validator(rawSearch)
      : validator && typeof validator.parse === "function"
        ? validator.parse(rawSearch)
        : rawSearch;
  return (validated as Record<string, unknown> | undefined) ?? rawSearch;
}

function isPromiseLike(value: unknown): value is Promise<unknown> {
  return (
    (typeof value === "object" || typeof value === "function") &&
    value !== null &&
    "then" in value &&
    typeof (value as { then?: unknown }).then === "function"
  );
}

function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="relative text-center">
        <p className="font-display text-muted-foreground text-7xl font-semibold tracking-tight sm:text-8xl">
          404
        </p>
        <h1 className="font-display mt-4 text-xl font-bold text-foreground sm:text-2xl">
          Page not found
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          The link may be old, or we moved something. Start from the home page.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="bg-primary text-primary-foreground inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium"
          >
            Go home
          </Link>
          <Link
            to="/classes"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            View courses
          </Link>
        </div>
      </div>
    </main>
  );
}

function RedirectPage({ target }: { target: CompatRedirect }) {
  const destination = target.options;
  const href = destination.to.replace(/\$([A-Za-z0-9_]+)/g, (token, key: string) => {
    const value = destination.params?.[key];
    return value == null ? token : encodeURIComponent(String(value));
  });

  useEffect(() => {
    if (destination.replace ?? destination.code === 301) window.location.replace(href);
    else window.location.assign(href);
  }, [destination.code, destination.replace, href]);

  return (
    <main className="flex min-h-[45vh] items-center justify-center bg-background px-4">
      <p className="text-sm text-muted-foreground">Taking you to the right page…</p>
    </main>
  );
}

function RouteHead({ head }: { head: HeadResult | undefined }) {
  useEffect(() => {
    if (!head) return;

    for (const item of head.meta ?? []) {
      const title = typeof item.title === "string" ? item.title : undefined;
      if (title) document.title = title;

      const name = typeof item.name === "string" ? item.name : undefined;
      const property = typeof item.property === "string" ? item.property : undefined;
      const content = typeof item.content === "string" ? item.content : undefined;
      const key = name
        ? `name="${CSS.escape(name)}"`
        : property
          ? `property="${CSS.escape(property)}"`
          : null;
      if (key && content) {
        let element = document.head.querySelector<HTMLMetaElement>(`meta[${key}]`);
        if (!element) {
          element = document.createElement("meta");
          if (name) element.name = name;
          if (property) element.setAttribute("property", property);
          document.head.appendChild(element);
        }
        element.content = content;
      }
    }

    for (const item of head.links ?? []) {
      if (item.rel !== "canonical" || typeof item.href !== "string") continue;
      let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = item.href;
    }
  }, [head]);

  const scripts = head?.scripts ?? [];
  return (
    <>
      {scripts.map((script, index) => {
        const json = typeof script.json === "string" ? script.json : null;
        if (!json) return null;
        return (
          <script
            key={`route-jsonld-${index}`}
            type={typeof script.type === "string" ? script.type : "application/ld+json"}
            dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }}
          />
        );
      })}
    </>
  );
}

export default function RouteContent({ route, params, pathname, searchParams }: RouteContentProps) {
  const options = route.options;
  const location = createLocation(pathname, searchParams);
  const search = getSearchData(options, searchParams);
  const routeContext: Record<string, unknown> = {};

  try {
    options.beforeLoad?.({ params, search, context: routeContext, location });
  } catch (error) {
    if (isCompatRedirect(error)) return <RedirectPage target={error} />;
    if (isRouteNotFound(error)) return <NotFoundPage />;
    throw error;
  }

  let loaderResult: unknown;
  try {
    loaderResult = options.loader?.({ params, search, context: routeContext, location });
  } catch (error) {
    if (isCompatRedirect(error)) return <RedirectPage target={error} />;
    if (isRouteNotFound(error)) return <NotFoundPage />;
    throw error;
  }
  const loaderData = isPromiseLike(loaderResult) ? use(loaderResult) : loaderResult;

  let head: HeadResult | undefined;
  try {
    head = options.head?.({ params, search, loaderData, location }) as HeadResult | undefined;
  } catch {
    // Optional metadata must not stop an otherwise valid page from rendering.
  }

  const Component = options.component;
  if (!Component) return <NotFoundPage />;

  const value: RouteState = {
    params,
    search,
    loaderData,
    routeContext,
    location,
  };

  return (
    <RouteStateProvider value={value}>
      <RouteHead head={head} />
      <Component />
    </RouteStateProvider>
  );
}
