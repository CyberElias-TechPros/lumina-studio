import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

/**
 * Error envelope — matches src/lib/errors.ts on the frontend:
 *   { error: { code, message, fieldErrors? } }
 * Codes: UNAUTHORIZED, RATE_LIMITED, FIELD_VALIDATION, NOT_FOUND, ...
 */

export type FieldErrors = Record<string, string[]>;

export class ApiError extends Error {
  constructor(
    public readonly status: ContentfulStatusCode,
    public readonly code: string,
    message: string,
    public readonly fieldErrors?: FieldErrors,
  ) {
    super(message);
    this.name = "ApiError";
  }

  static validation(fieldErrors: FieldErrors): ApiError {
    return new ApiError(400, "FIELD_VALIDATION", "Some fields are invalid.", fieldErrors);
  }

  static unauthorized(message = "Authentication required."): ApiError {
    return new ApiError(401, "UNAUTHORIZED", message);
  }

  static forbidden(message = "You do not have permission to do this."): ApiError {
    return new ApiError(403, "FORBIDDEN", message);
  }

  static notFound(message = "Not found."): ApiError {
    return new ApiError(404, "NOT_FOUND", message);
  }

  static conflict(message = "Conflict."): ApiError {
    return new ApiError(409, "CONFLICT", message);
  }
}

export function sendError(c: Context, err: unknown): Response {
  if (err instanceof ApiError) {
    return c.json(
      {
        error: {
          code: err.code,
          message: err.message,
          ...(err.fieldErrors ? { fieldErrors: err.fieldErrors } : {}),
        },
      },
      err.status,
    );
  }
  console.error("Unhandled error", err);
  return c.json({ error: { code: "INTERNAL", message: "Something went wrong." } }, 500);
}
