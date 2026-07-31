import type { Context } from "hono";
import type { ZodType } from "zod";
import { ApiError } from "./errors";

export async function parseBody<T>(c: Context, schema: ZodType<T>): Promise<T> {
  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    throw ApiError.validation({});
  }
  const result = schema.safeParse(body);
  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const key = issue.path.join(".") || "_";
      fieldErrors[key] ??= [];
      fieldErrors[key]!.push(issue.message);
    }
    throw ApiError.validation(fieldErrors);
  }
  return result.data;
}
