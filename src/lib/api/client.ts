/**
 * API client for the Cloudflare Worker backend (Hono, /v1/*).
 *
 * - Real mode (VITE_API_URL set): fetch with credentials, error-envelope
 *   parsing, single-flight token refresh on 401, Retry-After handling on 429.
 * - Mock mode (VITE_API_URL empty): every call resolves against src/data/*
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
    const handler = getMock(init.method ?? "GET", path);
    if (!handler) {
      throw new ApiError(
        501,
        "MOCK_NOT_FOUND",
        `Mock handler not registered for ${init.method ?? "GET"} ${path}`,
      );
    }
    return (await handler(init)) as T;
  }

  const url = new URL(`${env.apiUrl}${path.startsWith("/") ? path : `/${path}`}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
    }
  }

  let attempt = 0;
  let response: Response | undefined;

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
    if (response.status === 401 && !noRefresh && !refreshPromise) {
      await beginSessionRefresh();
      attempt += 1;
      continue;
    }
    if (response.status === 429 && attempt < MAX_RETRIES) {
      await sleep(retryDelayMs(response, attempt));
      attempt += 1;
      continue;
    }
    if (response.status >= 500 && attempt < MAX_RETRIES) {
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
let mocksLoaded = false;

const mockKey = (method: string, path: string) => `${method.toUpperCase()} ${path.split("?")[0]}`;

export function registerMock(method: string, path: string, handler: MockHandler): void {
  mockRegistry.set(mockKey(method, path), handler);
}

function getMock(method: string, path: string): MockHandler | undefined {
  if (!mocksLoaded) {
    mocksLoaded = true;
    // Lazy import keeps the mock registry out of the production bundle.
    void import("@/lib/api/mocks").then((module) => module.registerAllMocks());
  }
  return mockRegistry.get(mockKey(method, path));
}
