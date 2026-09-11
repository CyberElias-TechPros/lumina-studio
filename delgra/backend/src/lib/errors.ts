import { z } from "zod";

/**
 * Every failure path in the API throws an `AppError`. The error middleware turns
 * it into a stable JSON envelope:
 *
 *   { "error": { "code": "validation_failed", "message": "...", "fields": {...}, "requestId": "..." } }
 *
 * Unexpected exceptions become a generic 500 with the same envelope plus a
 * `requestId` the operator can grep in Workers logs. Stack traces and internal
 * messages never reach the client.
 */
export type ErrorCode =
  | "validation_failed"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "conflict"
  | "unprocessable"
  | "rate_limited"
  | "payload_too_large"
  | "unsupported_media_type"
  | "service_unavailable"
  | "internal_error";

const STATUS: Record<ErrorCode, number> = {
  validation_failed: 422,
  unauthorized: 401,
  forbidden: 403,
  not_found: 404,
  conflict: 409,
  unprocessable: 422,
  rate_limited: 429,
  payload_too_large: 413,
  unsupported_media_type: 415,
  service_unavailable: 503,
  internal_error: 500,
};

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly status: number;
  readonly fields?: Record<string, string>;
  readonly details?: unknown;

  constructor(
    code: ErrorCode,
    message: string,
    options: { fields?: Record<string, string>; details?: unknown; cause?: unknown } = {},
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = STATUS[code];
    if (options.fields) this.fields = options.fields;
    if (options.details !== undefined) this.details = options.details;
    if (options.cause !== undefined) this.cause = options.cause;
  }

  static unauthorized(message = "Sign in to continue.") {
    return new AppError("unauthorized", message);
  }
  static forbidden(message = "You do not have access to this resource.") {
    return new AppError("forbidden", message);
  }
  static notFound(entity = "Resource") {
    return new AppError("not_found", `${entity} not found.`);
  }
  static conflict(message: string, fields?: Record<string, string>) {
    return new AppError("conflict", message, { fields });
  }
  static validation(message: string, fields?: Record<string, string>) {
    return new AppError("validation_failed", message, { fields });
  }
  static rateLimited(retryAfterSeconds = 60) {
    return new AppError("rate_limited", "Too many requests. Please slow down.", {
      details: { retryAfterSeconds },
    });
  }
  /** 503 with an operator-facing message — used for infrastructure states
   *  (e.g. an un-migrated database) the caller cannot fix from the UI. */
  static serviceUnavailable(message: string, options: { cause?: unknown } = {}) {
    return new AppError("service_unavailable", message, { cause: options.cause });
  }
}

/** Flatten a ZodError into `{ "items.0.quantity": "Required" }` for form display. */
export function zodFields(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.map((p) => String(p)).join(".") || "_";
    if (!out[path]) out[path] = issue.message;
  }
  return out;
}
