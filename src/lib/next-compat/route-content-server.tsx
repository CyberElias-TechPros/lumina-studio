import type { ReactNode } from "react";
import type { RouteDefinitionLike } from "./route-definition";
import type { RouteLocation } from "./route-context";

type HeadResult = {
  meta?: Array<Record<string, unknown>>;
  links?: Array<Record<string, unknown>>;
  scripts?: Array<Record<string, unknown>>;
};

type RouteContentServerProps = {
  route: RouteDefinitionLike;
  params: Record<string, string>;
  pathname: string;
  searchParams: Record<string, string | string[] | undefined>;
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

function StructuredData({ head }: { head: HeadResult | undefined }) {
  return (
    <>
      {(head?.scripts ?? []).map((script, index) => {
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

export default async function RouteContentServer({
  route,
  params,
  pathname,
  searchParams,
}: RouteContentServerProps) {
  const options = route.options;
  const location = createLocation(pathname, searchParams);
  const search = Object.fromEntries(
    Object.entries(searchParams).filter(
      (entry): entry is [string, string | string[]] => entry[1] !== undefined,
    ),
  );
  const routeContext: Record<string, unknown> = {};
  let loaderData: unknown;
  if (options.loader) {
    loaderData = await options.loader({ params, search, context: routeContext, location });
  }

  let head: HeadResult | undefined;
  if (options.head) {
    head = (await options.head({ params, search, loaderData, location })) as HeadResult | undefined;
  }

  const Component = options.component;
  const content: ReactNode = Component ? <Component /> : null;
  return (
    <>
      <StructuredData head={head} />
      {content}
    </>
  );
}
