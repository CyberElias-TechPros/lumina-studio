import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const routesRoot = join(root, "src/routes");
const routeFiles = [];

function collect(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) collect(absolute);
    else if (entry.isFile() && extname(entry.name) === ".tsx") routeFiles.push(absolute);
  }
}

collect(routesRoot);

function writeIfChanged(path, content) {
  if (existsSync(path) && readFileSync(path, "utf8") === content) return;
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

function property(object, name) {
  if (!object || !ts.isObjectLiteralExpression(object)) return undefined;
  return object.properties.find(
    (item) =>
      ts.isPropertyAssignment(item) &&
      ((ts.isIdentifier(item.name) && item.name.text === name) ||
        (ts.isStringLiteral(item.name) && item.name.text === name)),
  )?.initializer;
}

function staticString(node) {
  if (!node) return undefined;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  return undefined;
}

function findPropertyInTree(node, name) {
  if (ts.isObjectLiteralExpression(node)) {
    const match = property(node, name);
    if (match) return match;
  }
  let result;
  ts.forEachChild(node, (child) => {
    if (result) return;
    result = findPropertyInTree(child, name);
  });
  return result;
}

function findGetPageHeadInput(node) {
  let result;
  const visit = (current) => {
    if (result) return;
    if (
      ts.isCallExpression(current) &&
      ts.isIdentifier(current.expression) &&
      current.expression.text === "getPageHead" &&
      ts.isObjectLiteralExpression(current.arguments[0])
    ) {
      result = current.arguments[0];
      return;
    }
    ts.forEachChild(current, visit);
  };
  visit(node);
  return result;
}

function extractHeadMetadata(options) {
  const head = property(options, "head");
  if (!head) return { title: undefined, description: undefined, type: undefined, image: undefined };

  const input = findGetPageHeadInput(head);
  if (input) {
    return {
      title: staticString(property(input, "title")),
      description: staticString(property(input, "description")),
      type: staticString(property(input, "type")),
      image: staticString(property(input, "image")),
    };
  }

  // A number of workspace pages return TanStack-style { meta: [...] } directly
  // rather than going through getPageHead. Read the literal title and description
  // without evaluating the route module in Node.
  let title;
  let description;
  let type;
  const meta = findPropertyInTree(head, "meta");
  if (meta && ts.isArrayLiteralExpression(meta)) {
    for (const item of meta.elements) {
      if (!ts.isObjectLiteralExpression(item)) continue;
      const name = staticString(property(item, "name"));
      const prop = staticString(property(item, "property"));
      if (property(item, "title")) title = staticString(property(item, "title"));
      if (name === "description") description = staticString(property(item, "content"));
      if (prop === "og:type") type = staticString(property(item, "content"));
    }
  }

  // For metadata objects that contain a static title / description outside the
  // meta array (for example a custom page helper), use only literal values.
  title ??= staticString(findPropertyInTree(head, "title"));
  description ??= staticString(findPropertyInTree(head, "description"));
  return { title, description, type, image: undefined };
}

function needsClientRuntime(source, sourceText, options) {
  if (property(options, "validateSearch") || property(options, "loader")) return true;
  if (/\bon[A-Z][A-Za-z0-9_]*\s*=/.test(sourceText)) return true;
  if (/\b(?:window|document|localStorage|sessionStorage|navigator)\s*(?:\.|\[)/.test(sourceText))
    return true;

  let needsClient = false;
  const visit = (node) => {
    if (needsClient) return;
    if (ts.isCallExpression(node)) {
      if (ts.isIdentifier(node.expression) && /^use[A-Z0-9]/.test(node.expression.text)) {
        needsClient = true;
        return;
      }
      if (
        ts.isPropertyAccessExpression(node.expression) &&
        /^use[A-Z0-9]/.test(node.expression.name.text)
      ) {
        needsClient = true;
        return;
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return needsClient;
}

function usesSearchParams(source, options) {
  if (property(options, "validateSearch")) return true;
  let usesSearch = false;
  const visit = (node) => {
    if (usesSearch) return;
    if (ts.isCallExpression(node)) {
      if (ts.isIdentifier(node.expression) && node.expression.text === "useSearch") {
        usesSearch = true;
        return;
      }
      if (
        ts.isPropertyAccessExpression(node.expression) &&
        node.expression.name.text === "useSearch"
      ) {
        usesSearch = true;
        return;
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return usesSearch;
}

function getRouteDefinition(file) {
  const sourceText = readFileSync(file, "utf8");
  const source = ts.createSourceFile(
    file,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  let found;

  const visit = (node) => {
    if (
      !found &&
      ts.isCallExpression(node) &&
      ts.isCallExpression(node.expression) &&
      ts.isIdentifier(node.expression.expression) &&
      node.expression.expression.text === "createFileRoute"
    ) {
      const path = staticString(node.expression.arguments[0]);
      const options = node.arguments[0];
      if (path && options && ts.isObjectLiteralExpression(options)) {
        found = { path, options, metadata: extractHeadMetadata(options) };
      }
    }
    if (!found) ts.forEachChild(node, visit);
  };

  visit(source);
  if (!found) return null;

  const filePath = relative(routesRoot, file).split(sep).join("/");
  const routeImport = `@/routes/${filePath.slice(0, -".tsx".length)}`;
  return {
    path: found.path,
    file: filePath,
    routeImport,
    index: found.path === "/" || found.path.endsWith("/"),
    needsClient: needsClientRuntime(source, sourceText, found.options),
    usesSearch: usesSearchParams(source, found.options),
    ...found.metadata,
  };
}

const routes = routeFiles
  .map(getRouteDefinition)
  .filter(Boolean)
  .sort((a, b) => a.path.localeCompare(b.path));

if (!routes.some((route) => route.path === "/")) {
  throw new Error("No root route was found under src/routes.");
}

const duplicates = new Map();
for (const route of routes) {
  const normalized = normalizePath(route.path);
  const paths = duplicates.get(normalized) ?? [];
  paths.push(route.file);
  duplicates.set(normalized, paths);
}
for (const [path, files] of duplicates) {
  if (files.length > 1 && !(path === "/apply/status" && files.length === 2)) {
    console.warn(`Multiple Next route entries normalize to ${path}: ${files.join(", ")}`);
  }
}

function normalizePath(path) {
  const result = path.replace(/\/+$/, "");
  return result || "/";
}

function quote(value) {
  return JSON.stringify(value);
}

const manifestBody = routes
  .map((route) => {
    const fields = [
      `path: ${quote(route.path)}`,
      `file: ${quote(route.file)}`,
      `index: ${route.index}`,
      `needsClient: ${route.needsClient}`,
      `usesSearch: ${route.usesSearch}`,
      `title: ${route.title ? quote(route.title) : "null"}`,
      `description: ${route.description ? quote(route.description) : "null"}`,
      `type: ${route.type ? quote(route.type) : "null"}`,
      `image: ${route.image ? quote(route.image) : "null"}`,
    ];
    return `  { ${fields.join(", ")} },`;
  })
  .join("\n");

const manifest = `/* This file is generated by scripts/generate-next-routes.mjs. */
export type RouteManifestEntry = {
  path: string;
  file: string;
  index: boolean;
  needsClient: boolean;
  usesSearch: boolean;
  title: string | null;
  description: string | null;
  type: string | null;
  image: string | null;
};

export const routeManifest: RouteManifestEntry[] = [
${manifestBody}
];

export type MatchedRoute = { entry: RouteManifestEntry; params: Record<string, string> };

export function normalizeRoutePath(path: string): string {
  const normalized = path.replace(/\\/+$/, "");
  return normalized || "/";
}

export function buildRoutePath(template: string, params: Record<string, string>): string {
  const resolved = template.replace(/\\$([A-Za-z0-9_]+)/g, (token, key: string) => {
    const value = params[key];
    return value === undefined ? token : encodeURIComponent(value);
  });
  return normalizeRoutePath(resolved);
}

export function matchNextRoute(path: string): MatchedRoute | null {
  const pathname = normalizeRoutePath(path);
  const pathSegments = pathname === "/" ? [] : pathname.slice(1).split("/");
  const candidates = routeManifest
    .map((entry) => {
      const routePath = normalizeRoutePath(entry.path);
      const routeSegments = routePath === "/" ? [] : routePath.slice(1).split("/");
      if (routeSegments.length !== pathSegments.length) return null;
      const params: Record<string, string> = {};
      let staticSegments = 0;
      for (let index = 0; index < routeSegments.length; index += 1) {
        const routeSegment = routeSegments[index];
        const pathSegment = pathSegments[index];
        if (routeSegment.startsWith("$")) {
          try {
            params[routeSegment.slice(1)] = decodeURIComponent(pathSegment);
          } catch {
            params[routeSegment.slice(1)] = pathSegment;
          }
        } else if (routeSegment === pathSegment) {
          staticSegments += 1;
        } else {
          return null;
        }
      }
      return { entry, params, staticSegments, segmentCount: routeSegments.length };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort(
      (a, b) =>
        b.staticSegments - a.staticSegments ||
        b.segmentCount - a.segmentCount ||
        Number(b.entry.index) - Number(a.entry.index),
    );

  const match = candidates[0];
  return match ? { entry: match.entry, params: match.params } : null;
}
`;

mkdirSync(join(root, "src/lib/next-compat"), { recursive: true });
writeIfChanged(join(root, "src/lib/next-compat/routes.gen.ts"), manifest);

const generatedRouteRoot = join(root, "src/app/(generated)");
mkdirSync(generatedRouteRoot, { recursive: true });

function appSegments(routePath) {
  const normalized = normalizePath(routePath);
  if (normalized === "/") return [];
  return normalized
    .slice(1)
    .split("/")
    .map((segment) => (segment.startsWith("$") ? `[${segment.slice(1)}]` : segment));
}

function outputPathFor(route) {
  return join(generatedRouteRoot, ...appSegments(route.path), "page.tsx");
}

const staticParamFiles = new Set([
  "blog.$slug.tsx",
  "classes.$courseSlug.index.tsx",
  "classes.$courseSlug.$sessionSlug.tsx",
  "shop.$slug.index.tsx",
  "shop.$slug.checkout.tsx",
  "shop.$slug.return.tsx",
]);

function createServerPage(route) {
  const imports = route.needsClient
    ? 'import RoutePage from "./route-page.client";'
    : `import { Route } from ${quote(route.routeImport)};\nimport RouteContentServer from "@/lib/next-compat/route-content-server";`;
  const render = route.needsClient
    ? "<RoutePage params={params} searchParams={searchParams} pathname={pathname} />"
    : "<RouteContentServer route={Route} params={params} searchParams={searchParams} pathname={pathname} />";
  const searchParamsValue = route.usesSearch ? "await props.searchParams" : "{}";
  const staticParamsImport = staticParamFiles.has(route.file)
    ? 'import { getStaticParamsForRoute } from "@/lib/next-compat/static-params";'
    : "";
  const staticParamsExport = staticParamFiles.has(route.file)
    ? `export function generateStaticParams() {
  return getStaticParamsForRoute(routeFile);
}
`
    : "";

  return `import type { Metadata } from "next";
${imports}
${staticParamsImport}
import { buildRoutePath } from "@/lib/next-compat/routes.gen";
import { getNextRouteMetadata } from "@/lib/next-compat/metadata";
import { checkServerRoute } from "@/lib/next-compat/server-route";

type PageProps = {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const routeFile = ${quote(route.file)};
const routePath = ${quote(route.path)};
${staticParamsExport}
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const pathname = buildRoutePath(routePath, params);
  return getNextRouteMetadata(routeFile, pathname, params);
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const searchParams = ${searchParamsValue};
  const pathname = buildRoutePath(routePath, params);
  checkServerRoute(pathname, params);
  return ${render};
}
`;
}

function createClientPage(route) {
  return `"use client";

import { Route } from ${quote(route.routeImport)};
import RouteContent from "@/lib/next-compat/route-content";

export default function RoutePage(props: {
  params: Record<string, string>;
  pathname: string;
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return <RouteContent route={Route} {...props} />;
}
`;
}

const layoutOnlyFiles = new Set(["apply/status.tsx"]);
const expectedGeneratedFiles = new Set();
let generatedPages = 0;
for (const route of routes) {
  const sourcePath = join(routesRoot, route.file);
  const sourceText = readFileSync(sourcePath, "utf8");
  const normalizedSource = route.needsClient
    ? sourceText.startsWith('"use client";') || sourceText.startsWith("'use client';")
      ? sourceText
      : `"use client";\n\n${sourceText}`
    : sourceText.replace(/^(?:"use client"|'use client");\s*\n+/, "");
  if (normalizedSource !== sourceText) writeIfChanged(sourcePath, normalizedSource);

  if (layoutOnlyFiles.has(route.file)) continue;
  const pagePath = outputPathFor(route);
  expectedGeneratedFiles.add(pagePath);
  writeIfChanged(pagePath, createServerPage(route));
  if (route.needsClient) {
    const clientPath = join(dirname(pagePath), "route-page.client.tsx");
    expectedGeneratedFiles.add(clientPath);
    writeIfChanged(clientPath, createClientPage(route));
  }
  generatedPages += 1;
}

function cleanGeneratedDirectory(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) {
      cleanGeneratedDirectory(absolute);
      if (readdirSync(absolute).length === 0) rmSync(absolute, { recursive: true, force: true });
    } else if (
      entry.isFile() &&
      extname(entry.name) === ".tsx" &&
      !expectedGeneratedFiles.has(absolute)
    ) {
      rmSync(absolute, { force: true });
    }
  }
}

cleanGeneratedDirectory(generatedRouteRoot);

const metadataCount = routes.filter((route) => route.title || route.description).length;
console.log(
  `Next.js route files generated: ${generatedPages} pages from ${routes.length} route definitions (${metadataCount} with static SEO metadata).`,
);
