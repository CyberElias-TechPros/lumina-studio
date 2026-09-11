/**
 * API client.
 *
 * One place that knows how to reach the Worker, attach credentials, and turn a
 * non-2xx response into a typed error the UI can render. Every screen goes
 * through this — no ad-hoc fetch calls anywhere in the app.
 */

/**
 * Base URL for API calls.
 *
 * Every route on the Worker lives under `/v1` (`/v1/bootstrap`,
 * `/v1/auth/session`, …), so the base URL has to carry that prefix. It is the
 * one part of the production config a bare origin can't stand in for: setting
 * `VITE_API_URL=https://<worker>.workers.dev` makes the browser call
 * `/bootstrap`, which matches no route — and the resulting 404s reach the
 * console as "No 'Access-Control-Allow-Origin' header" rather than as missing
 * paths. So the prefix is applied here instead of being trusted to the env var.
 *
 * - Production: `VITE_API_URL` (e.g. https://delgra-api.<account>.workers.dev/v1)
 * - Development: unset, so we use `/api`, which Vite proxies to the local Worker.
 *   Going through the proxy keeps the session cookie same-origin, which avoids
 *   third-party-cookie blocking entirely while developing.
 */
export const API_BASE = resolveApiBase(import.meta.env.VITE_API_URL as string | undefined);

function resolveApiBase(configured: string | undefined): string {
  const raw = configured?.trim().replace(/\/+$/, "");
  // Unset (dev) or a relative path the dev server proxies — leave it alone.
  if (!raw || !/^https?:\/\//i.test(raw)) return raw || "/api";

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return raw;
  }
  const pathname = url.pathname.replace(/\/+$/, "");
  if (/\/v\d+$/.test(pathname)) return raw; // already versioned, e.g. …/v1

  url.pathname = `${pathname}/v1`;
  const corrected = url.toString().replace(/\/+$/, "");
  console.warn(
    `[api] VITE_API_URL was missing the /v1 prefix; using ${corrected}. ` +
      `Set VITE_API_URL=${corrected} and redeploy so this warning goes away.`,
  );
  return corrected;
}

export interface ApiFieldErrors {
  [field: string]: string;
}

export interface ApiErrorBody {
  code: string;
  message: string;
  fields?: ApiFieldErrors;
  requestId?: string;
  retryAfterSeconds?: number;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly fields: ApiFieldErrors;
  readonly requestId?: string;

  constructor(status: number, body: ApiErrorBody) {
    super(body.message || "Something went wrong.");
    this.name = "ApiError";
    this.status = status;
    this.code = body.code || "internal_error";
    this.fields = body.fields ?? {};
    this.requestId = body.requestId;
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }
  get isForbidden(): boolean {
    return this.status === 403;
  }
  get isRateLimited(): boolean {
    return this.status === 429;
  }
}

/** Thrown so the auth layer can redirect without treating it as a crash. */
export class SessionExpiredError extends ApiError {}

export interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  /** Retries a POST safely; the Worker replays the first response. */
  idempotencyKey?: string;
  signal?: AbortSignal;
}

let onSessionExpired: (() => void) | null = null;
export function setSessionExpiredHandler(handler: () => void): void {
  onSessionExpired = handler;
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {};
  let payload: string | FormData | undefined;

  if (options.body instanceof FormData) {
    payload = options.body;
  } else if (options.body !== undefined) {
    headers["content-type"] = "application/json";
    payload = JSON.stringify(options.body);
  }
  if (options.idempotencyKey) headers["idempotency-key"] = options.idempotencyKey;

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method: options.method ?? "GET",
      headers,
      body: payload,
      credentials: "include",
      signal: options.signal,
    });
  } catch (err) {
    // A rejected fetch with no response at all means the request never completed:
    // offline, DNS, TLS, or a CORS block. The browser deliberately hides the
    // reason, so name the base URL — "Failed to fetch" tells an operator nothing,
    // and this is the one failure the app cannot describe from the response.
    if (options.signal?.aborted) throw err; // a cancelled query, not an outage
    throw new ApiError(0, {
      code: "network_error",
      message: `Cannot reach the API at ${API_BASE}. The browser blocks the request before the Worker `
        + `answers, so check for a CORS error in the console and confirm VITE_API_URL points at the `
        + `Worker with its /v1 suffix.`,
    });
  }

  if (response.status === 204) return undefined as T;

  const contentType = response.headers.get("content-type") ?? "";
  const data = contentType.includes("application/json") ? await response.json() : await response.text();

  if (!response.ok) {
    const body: ApiErrorBody =
      typeof data === "object" && data !== null && "error" in data
        ? ((data as { error: ApiErrorBody }).error ?? { code: "internal_error", message: "" })
        : { code: "internal_error", message: typeof data === "string" ? data : "" };

    if (response.status === 401) {
      onSessionExpired?.();
      throw new SessionExpiredError(response.status, body);
    }
    throw new ApiError(response.status, body);
  }

  return data as T;
}

/** Build a query string from a params object, dropping empty values. */
export function qs(params: Record<string, unknown>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    search.set(key, String(value));
  }
  const encoded = search.toString();
  return encoded ? `?${encoded}` : "";
}

/** Absolute URL for a binary endpoint (PDFs), opened in a new tab. */
export function apiUrl(path: string): string {
  return `${API_BASE}${path}`;
}
