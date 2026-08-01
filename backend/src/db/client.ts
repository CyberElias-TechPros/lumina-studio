import { drizzle } from "drizzle-orm/d1";
import type { AppEnv } from "../types";
import * as schema from "./schema";

export function createDb(env: AppEnv) {
  return drizzle(env.DB, { schema });
}

export type Db = ReturnType<typeof createDb>;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
