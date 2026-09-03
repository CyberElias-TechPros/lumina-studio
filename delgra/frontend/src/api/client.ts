/**
 * API client.
 *
 * One place that knows how to reach the Worker, attach credentials, and turn a
 * non-2xx response into a typed error the UI can render. Every screen goes
 * through this — no ad-hoc fetch calls anywhere in the app.
 */

const CONFIGURED = import.meta.env.VITE_API_URL as string | undefined;

/**
 * Base URL for API calls.
 *
 * - Production: `VITE_API_URL` (e.g. https://delgra-api.<account>.workers.dev)
 * - Development: unset, so we use `/api`, which Vite proxies to the local Worker.
 *   Going through the proxy keeps the session cookie same-origin, which avoids
 *   third-party-cookie blocking entirely while developing.
 */
export const API_BASE = CONFIGURED && CONFIGURED.trim() ? CONFIGURED.replace(/\/$/, "") : "/api";

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

  const response = await fetch(`${API_BASE}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: payload,
    credentials: "include",
    signal: options.signal,
  });

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
