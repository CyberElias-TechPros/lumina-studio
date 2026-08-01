import { createMiddleware } from "hono/factory";
import type { AppEnv } from "../types";
import { ApiError } from "./errors";
import { loadSession } from "./auth";

/**
 * Declarative route → access rules. Every /v1 endpoint must be listed here so
 * the guard below can decide who may call it. `public` rules skip auth
 * entirely; `roles` lists the roleKeys allowed (admin role must be added
 * explicitly where it should apply); rules without `roles` allow any
 * authenticated user.
 */
export interface RbacRule {
  methods: string[];
  /** Path pattern, e.g. "/v1/instructor/*" or "/v1/courses/:slug". */
  path: string;
  public?: boolean;
  roles?: string[];
}

export const RBAC_RULES: RbacRule[] = [
  /* Public */
  { methods: ["GET"], path: "/v1/flags", public: true },
  { methods: ["GET"], path: "/v1/programs", public: true },
  { methods: ["GET"], path: "/v1/programs/:slug", public: true },
  { methods: ["POST"], path: "/v1/applications", public: true },
  {
    methods: ["POST"],
    path: "/v1/auth/magic-link",
    public: true,
  },
  { methods: ["GET"], path: "/v1/auth/magic-link/verify", public: true },
  { methods: ["POST"], path: "/v1/auth/sign-in", public: true },
  { methods: ["POST"], path: "/v1/auth/sign-up", public: true },
  { methods: ["POST"], path: "/v1/payments/webhook", public: true },

  /* Auth */
  { methods: ["GET"], path: "/v1/auth/session" },
  { methods: ["POST"], path: "/v1/auth/refresh" },
  { methods: ["POST"], path: "/v1/auth/sign-out" },

  /* Applications — public status lookup by ref; own records only for the list */
  { methods: ["GET"], path: "/v1/applications" },
  { methods: ["GET"], path: "/v1/applications/:ref", public: true },

  /* LMS */
  { methods: ["GET"], path: "/v1/courses" },
  { methods: ["GET"], path: "/v1/courses/gradebook", roles: ["student"] },
  { methods: ["GET"], path: "/v1/courses/:slug" },
  { methods: ["GET"], path: "/v1/dashboard/student", roles: ["student"] },
  { methods: ["GET"], path: "/v1/assignments", roles: ["student"] },
  { methods: ["GET"], path: "/v1/assignments/:id", roles: ["student"] },
  { methods: ["GET"], path: "/v1/assessments", roles: ["student"] },
  { methods: ["GET"], path: "/v1/assessments/:id", roles: ["student"] },
  { methods: ["GET"], path: "/v1/calendar/events" },
  { methods: ["GET"], path: "/v1/messages/threads" },
  { methods: ["GET"], path: "/v1/messages/threads/:id" },
  { methods: ["GET"], path: "/v1/notifications" },

  /* Instructor portal */
  { methods: ["GET"], path: "/v1/instructor/gradebook", roles: ["instructor"] },
  { methods: ["GET"], path: "/v1/instructor/courses", roles: ["instructor"] },
  { methods: ["GET"], path: "/v1/instructor/courses/:slug", roles: ["instructor"] },
  { methods: ["GET"], path: "/v1/instructor/assignments", roles: ["instructor"] },
  { methods: ["GET"], path: "/v1/instructor/assignments/:id", roles: ["instructor"] },

  /* HR portal */
  { methods: ["GET"], path: "/v1/hr/employees", roles: ["hr", "admin"] },
  { methods: ["GET"], path: "/v1/hr/leave-requests", roles: ["hr", "admin"] },
  { methods: ["GET"], path: "/v1/hr/payroll-changes", roles: ["hr", "admin"] },

  /* Finance portal */
  { methods: ["GET"], path: "/v1/invoices", roles: ["finance", "admin"] },
  { methods: ["GET"], path: "/v1/expenses", roles: ["finance", "admin"] },
  { methods: ["GET"], path: "/v1/payments", roles: ["finance", "admin"] },

  /* Admin portal */
  { methods: ["GET"], path: "/v1/admin/users", roles: ["admin"] },
  { methods: ["GET"], path: "/v1/admin/audit-log", roles: ["admin"] },

  /* Payments (owned records only) */
  { methods: ["POST"], path: "/v1/payments/checkout" },
  { methods: ["GET"], path: "/v1/payments/session/:reference" },
  { methods: ["GET"], path: "/v1/payments/history" },

  /* Phase 4 suites — read-only for any authenticated user */
  { methods: ["GET"], path: "/v1/recruitment/*" },
  { methods: ["GET"], path: "/v1/marketing/*" },
  { methods: ["GET"], path: "/v1/design/*" },
  { methods: ["GET"], path: "/v1/localization/*" },

  /* Realtime chat + live classes — any authenticated user */
  { methods: ["*"], path: "/v1/realtime/*" },
  { methods: ["*"], path: "/v1/live/*" },
  { methods: ["*"], path: "/v1/uploads/*" },

  /* AI helpers — writes are role-gated inside the route */
  { methods: ["*"], path: "/v1/ai/*" },
];

function pathMatches(pattern: string, path: string): boolean {
  const patternSegments = pattern.split("/").filter(Boolean);
  const pathSegments = path.split("/").filter(Boolean);
  for (let i = 0; i < patternSegments.length; i += 1) {
    const segment = patternSegments[i];
    if (!segment) return false;
    if (segment === "*") return i === patternSegments.length - 1;
    const value = pathSegments[i];
    if (value === undefined) return false;
    if (segment.startsWith(":")) continue;
    if (segment !== value) return false;
  }
  return pathSegments.length === patternSegments.length;
}

export function matchRbacRule(method: string, path: string): RbacRule | null {
  const upper = method.toUpperCase();
  for (const rule of RBAC_RULES) {
    if (!rule.methods.includes("*") && !rule.methods.includes(upper)) continue;
    if (pathMatches(rule.path, path)) return rule;
  }
  return null;
}

/**
 * Central guard — runs on every /v1 request. Routes listed as public pass
 * through; everything else requires a valid session, and role-gated rules
 * reject mismatched roles with 403. Routes without a rule are denied (403)
 * rather than silently open, so new endpoints must be registered here.
 */
export const rbacGuard = createMiddleware<{ Bindings: AppEnv }>(async (c, next) => {
  const rule = matchRbacRule(c.req.method, new URL(c.req.url).pathname);
  if (!rule) throw ApiError.forbidden("This route is not registered with an access rule.");
  if (rule.public) return next();

  const loaded = await loadSession(c);
  if (!loaded) throw ApiError.unauthorized();
  if (rule.roles && !rule.roles.includes(loaded.user.roleKey)) {
    throw ApiError.forbidden("You don't have permission to access this resource.");
  }
  c.set("authUser", loaded.user);
  c.set("authSession", loaded.session);
  await next();
});
