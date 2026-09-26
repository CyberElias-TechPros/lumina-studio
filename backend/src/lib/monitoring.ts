import type { AppEnv } from "../types";

/**
 * Minimal, dependency-free error reporting to Sentry (or any Sentry-compatible
 * endpoint such as GlitchTip) via the envelope HTTP API. Activated purely by
 * setting the `SENTRY_DSN` secret; a no-op otherwise. Never throws.
 */

interface ParsedDsn {
  endpoint: string;
  publicKey: string;
}

function parseDsn(dsn: string): ParsedDsn | null {
  try {
    const url = new URL(dsn);
    const projectId = url.pathname.replace(/^\/+/, "").split("/").pop();
    if (!url.username || !projectId) return null;
    const basePath = url.pathname.replace(/\/[^/]*$/, "");
    return {
      endpoint: `${url.protocol}//${url.host}${basePath}/api/${projectId}/envelope/`,
      publicKey: url.username,
    };
  } catch {
    return null;
  }
}

export interface ErrorContext {
  requestId?: string;
  method?: string;
  path?: string;
  userId?: string;
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
}

export async function reportError(
  env: Pick<AppEnv, "SENTRY_DSN" | "APP_ENV">,
  error: unknown,
  context: ErrorContext = {},
): Promise<boolean> {
  const dsn = env.SENTRY_DSN ? parseDsn(env.SENTRY_DSN) : null;
  if (!dsn) return false;
  const err = error instanceof Error ? error : new Error(String(error));
  const eventId = crypto.randomUUID().replace(/-/g, "");
  const event = {
    event_id: eventId,
    timestamp: Date.now() / 1000,
    platform: "javascript",
    level: "error",
    environment: env.APP_ENV || "production",
    server_name: "cea-api",
    tags: {
      ...(context.tags ?? {}),
      ...(context.requestId ? { request_id: context.requestId } : {}),
    },
    user: context.userId ? { id: context.userId } : undefined,
    request: context.path ? { method: context.method, url: context.path } : undefined,
    extra: context.extra,
    exception: {
      values: [
        {
          type: err.name,
          value: err.message.slice(0, 2000),
          stacktrace: err.stack
            ? {
                frames: err.stack
                  .split("\n")
                  .slice(1, 30)
                  .reverse()
                  .map((line) => ({ function: line.trim().slice(0, 300) })),
              }
            : undefined,
        },
      ],
    },
  };
  const envelope = [
    JSON.stringify({ event_id: eventId, sent_at: new Date().toISOString() }),
    JSON.stringify({ type: "event" }),
    JSON.stringify(event),
  ].join("\n");
  try {
    const res = await fetch(dsn.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-sentry-envelope",
        "X-Sentry-Auth": `Sentry sentry_version=7, sentry_client=cea-api/1.0, sentry_key=${dsn.publicKey}`,
      },
      body: envelope,
    });
    return res.ok;
  } catch {
    return false;
  }
}
