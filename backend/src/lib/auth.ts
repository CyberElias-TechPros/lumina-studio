import type { Context, MiddlewareHandler } from "hono";
import { createMiddleware } from "hono/factory";
import type { AppEnv } from "../types";
import type { Session } from "../schema/api";
import { ApiError } from "./errors";
import { sha256Hex } from "./crypto";
import { permissionsForRole } from "./permissions";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  roleKey: string;
  permissions: string[];
}

export interface AuthSession {
  id: string;
  userId: string;
  expiresAt: string;
}

declare module "hono" {
  interface ContextVariableMap {
    authUser: AuthUser;
    authSession: AuthSession;
  }
}

export function getBearerToken(c: Context): string | null {
  const header = c.req.header("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  const token = header.slice(7).trim();
  return token.length > 0 ? token : null;
}

/** Session cookie name — the browser client relies on cookies (credentials: "include"). */
export const SESSION_COOKIE = "cea_session";

function getSessionToken(c: Context): string | null {
  const cookie = c.req.header("cookie");
  if (cookie) {
    for (const part of cookie.split(";")) {
      const [name, ...rest] = part.trim().split("=");
      if (name === SESSION_COOKIE) return rest.join("=");
    }
  }
  return getBearerToken(c);
}

export function setSessionCookie(c: Context, token: string, expiresAt: string): void {
  const secure = c.env.APP_ENV === "production";
  const maxAge = Math.max(1, Math.round((new Date(expiresAt).getTime() - Date.now()) / 1000));
  c.header(
    "Set-Cookie",
    `${SESSION_COOKIE}=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=${secure ? "None" : "Lax"}${
      secure ? "; Secure" : ""
    }`,
  );
}

export function clearSessionCookie(c: Context): void {
  c.header(
    "Set-Cookie",
    `${SESSION_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=${c.env.APP_ENV === "production" ? "None" : "Lax"}${
      c.env.APP_ENV === "production" ? "; Secure" : ""
    }`,
  );
}

export async function loadSession(
  c: Context<{ Bindings: AppEnv }>,
): Promise<{ user: AuthUser; session: AuthSession } | null> {
  const token = getSessionToken(c);
  if (!token) return null;
  const tokenHash = await sha256Hex(token);
  const now = new Date().toISOString();

  const row = await c.env.DB.prepare(
    `SELECT s.id AS session_id, s.expires_at, s.revoked_at,
            u.id AS user_id, u.name, u.email, u.avatar_url, u.role_key, u.status
       FROM sessions s
       JOIN users u ON u.id = s.user_id
      WHERE s.token_hash = ?`,
  )
    .bind(tokenHash)
    .first<{
      session_id: string;
      expires_at: string;
      revoked_at: string | null;
      user_id: string;
      name: string;
      email: string;
      avatar_url: string | null;
      role_key: string;
      status: string;
    }>();

  if (!row || row.revoked_at || row.status !== "active") return null;
  if (row.expires_at <= now) return null;

  return {
    user: {
      id: row.user_id,
      name: row.name,
      email: row.email,
      avatarUrl: row.avatar_url ?? undefined,
      roleKey: row.role_key,
      permissions: permissionsForRole(row.role_key),
    },
    session: { id: row.session_id, userId: row.user_id, expiresAt: row.expires_at },
  };
}

export function sessionResponse(user: AuthUser, expiresAt: string): Session {
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      ...(user.avatarUrl ? { avatarUrl: user.avatarUrl } : {}),
      roleKey: user.roleKey,
      permissions: user.permissions,
    },
    expiresAt,
  };
}

export const requireAuth: MiddlewareHandler<{ Bindings: AppEnv }> = createMiddleware(
  async (c, next) => {
    const loaded = await loadSession(c);
    if (!loaded) throw ApiError.unauthorized();
    c.set("authUser", loaded.user);
    c.set("authSession", loaded.session);
    await next();
  },
);

/** Student-only guard — run after requireAuth (reads c.get("authUser")). */
export const requireStudent: MiddlewareHandler<{ Bindings: AppEnv }> = createMiddleware(
  async (c, next) => {
    if (c.get("authUser").roleKey !== "student") {
      throw ApiError.forbidden("Only students can access this resource.");
    }
    await next();
  },
);

/** Role guard factory — run after requireAuth. Allows any of the listed roleKeys. */
export function requireAnyRole(roles: string[]): MiddlewareHandler<{ Bindings: AppEnv }> {
  return createMiddleware<{ Bindings: AppEnv }>(async (c, next) => {
    const roleKey = c.get("authUser").roleKey;
    if (!roles.includes(roleKey)) {
      throw ApiError.forbidden("You don't have permission to access this resource.");
    }
    await next();
  });
}

export const requireInstructor = requireAnyRole(["instructor"]);
export const requireHr = requireAnyRole(["hr", "admin"]);
export const requireFinance = requireAnyRole(["finance", "admin"]);
export const requireAdmin = requireAnyRole(["admin"]);
