export interface ApiFieldErrors {
  [field: string]: string[];
}

export interface ApiEnvelopeError {
  error: {
    code: string;
    message: string;
    fieldErrors?: ApiFieldErrors;
  };
}

/**
 * Error thrown by the API client for every non-2xx response (and mock-mode
 * equivalents). `code` matches the server's envelope codes so UI can branch
 * (e.g. "UNAUTHORIZED", "RATE_LIMITED", "FIELD_VALIDATION").
 */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly fieldErrors: ApiFieldErrors;
  readonly retryable: boolean;

  constructor(status: number, code: string, message: string, fieldErrors: ApiFieldErrors = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
    this.retryable = status >= 500 || status === 408 || status === 429;
  }

  static fromEnvelope(status: number, body: ApiEnvelopeError): ApiError {
    return new ApiError(
      status,
      body.error?.code ?? "UNKNOWN",
      body.error?.message ?? "Something went wrong. Please try again.",
      body.error?.fieldErrors ?? {},
    );
  }

  static network(message = "Network error. Check your connection and try again."): ApiError {
    return new ApiError(0, "NETWORK", message);
  }
}

/** True if the error came from the API layer (vs an app bug). */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/** User-facing message for any thrown value. */
export function getErrorMessage(error: unknown, fallback = "Something went wrong."): string {
  if (isApiError(error)) return error.message;
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

/** Map an ApiError's fieldErrors onto a react-hook-form setError callback. */
export function applyFieldErrors(
  error: unknown,
  setError: (field: string, error: { message: string }) => void,
): boolean {
  if (!isApiError(error)) return false;
  const entries = Object.entries(error.fieldErrors);
  for (const [field, messages] of entries) {
    setError(field, { message: messages[0] ?? "Invalid value." });
  }
  return entries.length > 0;
}
