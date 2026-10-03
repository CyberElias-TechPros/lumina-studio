/**
 * API client for the Cloudflare Worker backend (Hono, /v1/*).
 *
 * - Real mode (NEXT_PUBLIC_API_URL set): fetch with credentials, error-envelope
 *   parsing, single-flight token refresh on 401, Retry-After handling on 429.
 * - Mock mode (NEXT_PUBLIC_API_URL empty): every call resolves against src/data/*
 *   through the mock registry (src/lib/api/mocks) so the app runs standalone.
 */
import { env, isMockMode } from "@/lib/env";
import { ApiError, type ApiEnvelopeError } from "@/lib/errors";
import type { QueryParams } from "@/lib/api/types";

export interface ApiRequestInit extends Omit<RequestInit, "body" | "signal"> {
  body?: unknown;
  signal?: AbortSignal;
  query?: QueryParams;
  /** Skip the automatic 401-refresh-and-retry cycle (refresh endpoint only). */
  noRefresh?: boolean;
  /** Path of the request — set by the client for mock handlers (internal). */
  path?: string;
}

const MAX_RETRIES = 2;
const MAX_RETRY_AFTER_MS = 10_000;

let refreshPromise: Promise<unknown> | null = null;

/** Single-flight session refresh shared by all 401 paths. */
export function beginSessionRefresh(): Promise<unknown> {
  if (!refreshPromise) {
    refreshPromise = apiFetch("/v1/auth/refresh", { method: "POST", noRefresh: true })
      .catch(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

async function readBody(response: Response): Promise<unknown> {
  if (response.status === 204) return undefined;
  const text = await response.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/** Delay honoring Retry-After when present. */
function retryDelayMs(response: Response, attempt: number): number {
  const header = response.headers.get("Retry-After");
  if (header) {
    const seconds = Number(header);
    if (Number.isFinite(seconds)) return Math.min(seconds * 1000, MAX_RETRY_AFTER_MS);
  }
  return Math.min(2 ** attempt * 300, 3_000);
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function apiFetch<T>(path: string, init: ApiRequestInit = {}): Promise<T> {
  const { body, query, noRefresh, ...requestInit } = init;

  if (isMockMode) {
    const handler = await getMock(init.method ?? "GET", path);
    if (!handler) {
      throw new ApiError(
        501,
        "MOCK_NOT_FOUND",
        `Mock handler not registered for ${init.method ?? "GET"} ${path}`,
      );
    }
    return (await handler({ ...init, path })) as T;
  }

  const url = new URL(`${env.apiUrl}${path.startsWith("/") ? path : `/${path}`}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
    }
  }

  let attempt = 0;
  let authRetried = false;
  let response: Response | undefined;
  const method = (requestInit.method ?? "GET").toUpperCase();
  const retryableMethod = method === "GET" || method === "HEAD" || method === "OPTIONS";

  while (attempt <= MAX_RETRIES) {
    response = await fetch(url, {
      ...requestInit,
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...requestInit.headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (response.ok) return (await readBody(response)) as T;

    const payload = (await readBody(response)) as unknown;
    if (response.status === 401 && !noRefresh && !authRetried) {
      // Await the existing single-flight refresh when another request started
      // it first, then retry this request exactly once as well.
      authRetried = true;
      await beginSessionRefresh();
      attempt += 1;
      continue;
    }
    // Retrying writes can duplicate payments, applications, messages or
    // uploads. Callers can retry those deliberately; only safe reads are
    // automatically retried for transient failures/rate limits.
    if (retryableMethod && response.status === 429 && attempt < MAX_RETRIES) {
      await sleep(retryDelayMs(response, attempt));
      attempt += 1;
      continue;
    }
    if (retryableMethod && response.status >= 500 && attempt < MAX_RETRIES) {
      await sleep(retryDelayMs(response, attempt));
      attempt += 1;
      continue;
    }

    if (payload && typeof payload === "object" && "error" in payload) {
      throw ApiError.fromEnvelope(response.status, payload as ApiEnvelopeError);
    }
    throw new ApiError(
      response.status,
      "HTTP_ERROR",
      `Request failed with status ${response.status}.`,
    );
  }

  throw ApiError.network();
}

/* ------------------------------------------------------------------ */
/* Mock registry (mock mode only)                                      */
/* ------------------------------------------------------------------ */

type MockHandler = (init: ApiRequestInit) => Promise<unknown>;

const mockRegistry = new Map<string, MockHandler>();
/** Pattern handlers, e.g. "PUT /v1/uploads/*" — a `*` segment matches any single
 * segment; a trailing `*` also matches any deeper suffix. */
const mockPatterns: { method: string; segments: string[]; handler: MockHandler }[] = [];
let mocksLoaded = false;
let mocksLoadPromise: Promise<void> | null = null;

const mockKey = (method: string, path: string) => `${method.toUpperCase()} ${path.split("?")[0]}`;

export function registerMock(method: string, path: string, handler: MockHandler): void {
  mockRegistry.set(mockKey(method, path), handler);
}

/** Register a handler for dynamic paths, e.g. "GET /v1/live/classes/{id}/chat" —
 * `*` segments match any value. Exact registrations win first. */
export function registerMockPattern(method: string, pattern: string, handler: MockHandler): void {
  const path = pattern.split("?")[0] ?? pattern;
  mockPatterns.push({
    method: method.toUpperCase(),
    segments: path.split("/").filter(Boolean),
    handler,
  });
}

function matchesPattern(segments: string[], pathname: string): boolean {
  const pathSegments = pathname.split("/").filter(Boolean);
  if (pathSegments.length < segments.length) return false;
  return segments.every((segment, i) => segment === "*" || segment === pathSegments[i]);
}

async function getMock(method: string, path: string): Promise<MockHandler | undefined> {
  if (!mocksLoaded && !process.env.NEXT_PUBLIC_API_URL) {
    // The first request used to race this dynamic import and fail with
    // MOCK_NOT_FOUND. Share one promise so simultaneous queries wait for the
    // registry exactly once while keeping the mock chunk out of real builds.
    if (!mocksLoadPromise) {
      mocksLoadPromise = import("@/lib/api/mocks").then((module) => {
        module.registerAllMocks();
        mocksLoaded = true;
      });
    }
    await mocksLoadPromise;
  }
  const pathname = path.split("?")[0] ?? path;
  const exact = mockRegistry.get(mockKey(method, pathname));
  if (exact) return exact;
  // Prefer the most specific dynamic route. A broad `/postings/*` handler
  // must not swallow a deeper `/postings/*/candidates/*` request.
  const matchingPatterns = mockPatterns
    .filter(
      (pattern) =>
        pattern.method === method.toUpperCase() && matchesPattern(pattern.segments, pathname),
    )
    .sort((a, b) => b.segments.length - a.segments.length);
  return matchingPatterns[0]?.handler;
}
