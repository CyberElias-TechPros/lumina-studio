import { createMiddleware } from "hono/factory";
import type { AppEnv } from "../types";
import { ApiError } from "./errors";
import { loadSession } from "./auth";
import { isTrustedOrigin } from "./origin";

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
  { methods: ["GET"], path: "/v1/health", public: true },
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
  { methods: ["POST"], path: "/v1/auth/forgot-password", public: true },
  { methods: ["POST"], path: "/v1/auth/reset-password", public: true },
  { methods: ["POST"], path: "/v1/payments/webhook", public: true },
  { methods: ["POST"], path: "/v1/contact", public: true },
  /* Public site assistant (chatbot) — prospects have no account. Rate-limited
     per IP plus a global daily budget in the route itself. */
  /* Public site assistant — a stranger on a course page must be able to ask
     without an account. Rate-limited per IP with a daily model budget. */
  { methods: ["GET"], path: "/v1/assistant/intro", public: true },
  { methods: ["POST"], path: "/v1/assistant/chat", public: true },
  /* The assistant's question log is admin-only. */
  { methods: ["GET"], path: "/v1/assistant/questions", roles: ["admin"] },
  /* Cohorts — public intake dates + ICS; staff manage the calendar. */
  { methods: ["GET"], path: "/v1/cohorts", public: true },
  { methods: ["GET"], path: "/v1/cohorts/next", public: true },
  { methods: ["GET"], path: "/v1/cohorts/:id/ics", public: true },
  { methods: ["POST"], path: "/v1/cohorts", roles: ["admin", "admissions"] },
  { methods: ["PATCH"], path: "/v1/cohorts/:id", roles: ["admin", "admissions"] },
  { methods: ["DELETE"], path: "/v1/cohorts/:id", roles: ["admin"] },

  /* Compliance deadlines — finance/admin/director read and maintain. */
  { methods: ["GET"], path: "/v1/compliance/deadlines", roles: ["admin", "finance", "director"] },
  { methods: ["POST"], path: "/v1/compliance/deadlines", roles: ["admin", "finance", "director"] },
  {
    methods: ["PATCH"],
    path: "/v1/compliance/deadlines/:id",
    roles: ["admin", "finance", "director"],
  },
  { methods: ["DELETE"], path: "/v1/compliance/deadlines/:id", roles: ["admin"] },

  /* Public project + partner intake; private review queue and explicit admission. */
  { methods: ["POST"], path: "/v1/business-intake/projects", public: true },
  { methods: ["POST"], path: "/v1/business-intake/partners", public: true },
  { methods: ["GET"], path: "/v1/business-intake/admin/projects", roles: ["admin"] },
  { methods: ["PATCH"], path: "/v1/business-intake/admin/projects/:id", roles: ["admin"] },
  { methods: ["GET"], path: "/v1/business-intake/admin/partners", roles: ["admin"] },
  { methods: ["PATCH"], path: "/v1/business-intake/admin/partners/:id", roles: ["admin"] },
  { methods: ["POST"], path: "/v1/business-intake/admin/partners/:id/admit", roles: ["admin"] },

  /* Schools programme: public enquiry + shareable proposal; staff workspace. */
  { methods: ["POST"], path: "/v1/schools/inquiries", public: true },
  { methods: ["GET"], path: "/v1/schools/proposals/:ref", public: true },
  { methods: ["PATCH"], path: "/v1/schools/proposals/:ref", public: true },
  { methods: ["GET"], path: "/v1/schools/inquiries", roles: ["admin", "admissions", "marketing"] },
  { methods: ["PATCH"], path: "/v1/schools/inquiries/:id", roles: ["admin", "admissions"] },
  { methods: ["GET"], path: "/v1/schools", roles: ["admin", "admissions", "marketing"] },
  { methods: ["POST"], path: "/v1/schools", roles: ["admin", "admissions"] },
  { methods: ["GET"], path: "/v1/schools/proposals", roles: ["admin", "admissions", "marketing"] },
  { methods: ["POST"], path: "/v1/schools/:id/proposals", roles: ["admin", "admissions"] },
  { methods: ["PATCH"], path: "/v1/schools/:id", roles: ["admin", "admissions"] },
  { methods: ["DELETE"], path: "/v1/schools/proposals/:ref", roles: ["admin"] },
  { methods: ["GET"], path: "/v1/library/catalog", public: true },

  /* Public digital shop — Merchant Center requires guest checkout */
  { methods: ["GET"], path: "/v1/shop/catalog", public: true },
  { methods: ["POST"], path: "/v1/shop/checkout", public: true },
  { methods: ["GET"], path: "/v1/shop/orders/:reference", public: true },
  { methods: ["GET"], path: "/v1/shop/download/:reference", public: true },
  { methods: ["POST"], path: "/v1/shop/webhook", public: true },

  /* Parent invitations — verify is public; accept requires a session; create is admin-only */
  { methods: ["GET"], path: "/v1/invitations/:token", public: true },
  { methods: ["POST"], path: "/v1/invitations/:token/accept" },
  { methods: ["POST"], path: "/v1/invitations", roles: ["admin"] },

  /* Auth */
  { methods: ["GET"], path: "/v1/auth/session" },
  { methods: ["POST"], path: "/v1/auth/refresh" },
  { methods: ["POST"], path: "/v1/auth/sign-out" },
  { methods: ["POST"], path: "/v1/auth/mfa/setup" },
  { methods: ["POST"], path: "/v1/auth/mfa/enable" },
  { methods: ["POST"], path: "/v1/auth/mfa/disable" },
  // Verification intentionally bypasses the normal session guard: the session
  // is marked mfa_pending and loadSession must reject it until this endpoint
  // completes the challenge. The handler still requires that exact session.
  { methods: ["POST"], path: "/v1/auth/mfa/verify", public: true },
  { methods: ["GET"], path: "/v1/auth/devices" },
  { methods: ["POST"], path: "/v1/auth/devices/:id/revoke" },

  /* Self-service account (every signed-in role) */
  { methods: ["GET", "PATCH"], path: "/v1/account" },
  { methods: ["POST"], path: "/v1/account/password" },
  { methods: ["POST"], path: "/v1/account/verify-email/send" },
  { methods: ["POST"], path: "/v1/account/verify-email" },
  { methods: ["GET"], path: "/v1/account/export" },
  { methods: ["POST"], path: "/v1/account/delete" },

  /* Portal landing pages — live, role-scoped summary (any signed-in user) */
  { methods: ["GET"], path: "/v1/portal/summary" },

  /* Operations (admin) — integration readiness + scheduled jobs */
  { methods: ["GET"], path: "/v1/system/readiness", roles: ["admin"] },
  { methods: ["GET"], path: "/v1/system/jobs", roles: ["admin"] },
  { methods: ["POST"], path: "/v1/system/jobs/:job/run", roles: ["admin"] },
  { methods: ["POST"], path: "/v1/system/sms/test", roles: ["admin"] },

  /* Applications — public status lookup by ref; own records only for the list */
  { methods: ["GET"], path: "/v1/applications" },
  { methods: ["GET"], path: "/v1/applications/admin", roles: ["admin"] },
  { methods: ["GET"], path: "/v1/applications/admin/stats", roles: ["admin"] },
  { methods: ["GET"], path: "/v1/applications/:ref", public: true },
  { methods: ["PATCH"], path: "/v1/applications/:ref", roles: ["admin"] },

  /* Enrollment funnel v2 — public registration, Paystack checkout + webhook,
     applicant status; admin list/patch for admissions & finance. */
  { methods: ["POST"], path: "/v1/enrollments", public: true },
  { methods: ["POST"], path: "/v1/enrollments/webhook", public: true },
  { methods: ["POST"], path: "/v1/enrollments/:ref/payments", public: true },
  /* Bank-transfer proof: public (a student reports their own transfer), then a
     finance/admin review queue. Confirmation runs through markPayment(). */
  { methods: ["POST"], path: "/v1/enrollments/:ref/payments/transfer", public: true },
  { methods: ["GET"], path: "/v1/enrollments/:ref/receipt", public: true },
  { methods: ["GET"], path: "/v1/enrollments/payment-proofs", roles: ["admin", "finance"] },
  {
    methods: ["POST"],
    path: "/v1/enrollments/payment-proofs/:id/confirm",
    roles: ["admin", "finance"],
  },
  {
    methods: ["POST"],
    path: "/v1/enrollments/payment-proofs/:id/reject",
    roles: ["admin", "finance"],
  },
  { methods: ["GET"], path: "/v1/enrollments/:ref/payments/verify", public: true },
  { methods: ["GET"], path: "/v1/enrollments/admin", roles: ["admin", "admissions", "finance"] },
  { methods: ["GET"], path: "/v1/enrollments/:ref", public: true },
  { methods: ["PATCH"], path: "/v1/enrollments/:ref", roles: ["admin", "admissions"] },

  /* LMS */
  { methods: ["GET"], path: "/v1/courses" },
  { methods: ["GET"], path: "/v1/courses/gradebook", roles: ["student"] },
  { methods: ["GET"], path: "/v1/courses/:slug" },
  { methods: ["POST"], path: "/v1/courses/:slug/enroll", roles: ["student"] },
  { methods: ["POST"], path: "/v1/courses/:slug/lessons/:lessonId/complete", roles: ["student"] },
  { methods: ["POST"], path: "/v1/attendance/sessions", roles: ["instructor", "admin"] },
  { methods: ["POST"], path: "/v1/attendance/check-in", roles: ["student"] },
  { methods: ["GET"], path: "/v1/dashboard/student", roles: ["student"] },
  { methods: ["GET"], path: "/v1/assignments", roles: ["student"] },
  { methods: ["GET"], path: "/v1/assignments/:id", roles: ["student"] },
  { methods: ["POST"], path: "/v1/assignments/:id/submit", roles: ["student"] },
  { methods: ["GET"], path: "/v1/assignments/:id/submission", roles: ["student"] },
  { methods: ["GET"], path: "/v1/assessments", roles: ["student"] },
  { methods: ["GET"], path: "/v1/assessments/:id", roles: ["student"] },
  { methods: ["GET"], path: "/v1/assessments/:id/attempts", roles: ["student"] },
  { methods: ["POST"], path: "/v1/assessments/:id/submit", roles: ["student"] },
  { methods: ["GET"], path: "/v1/calendar/events" },
  { methods: ["GET"], path: "/v1/messages/threads" },
  { methods: ["GET"], path: "/v1/messages/threads/:id" },
  { methods: ["POST"], path: "/v1/messages/threads/:id/messages" },
  { methods: ["GET"], path: "/v1/notifications" },
  { methods: ["GET"], path: "/v1/notifications/unread-count" },
  { methods: ["GET", "PATCH"], path: "/v1/notifications/preferences" },
  { methods: ["POST"], path: "/v1/notifications/:id/read" },
  { methods: ["POST"], path: "/v1/notifications/read-all" },

  /* Library — catalog is public; full library requires any authenticated user */
  { methods: ["GET"], path: "/v1/library" },
  { methods: ["GET"], path: "/v1/library/:id" },

  /* Instructor portal */
  { methods: ["GET"], path: "/v1/instructor/gradebook", roles: ["instructor", "admin"] },
  { methods: ["GET"], path: "/v1/instructor/courses", roles: ["instructor", "admin"] },
  { methods: ["GET"], path: "/v1/instructor/courses/:slug", roles: ["instructor", "admin"] },
  {
    methods: ["POST"],
    path: "/v1/instructor/courses/:slug/lessons",
    roles: ["instructor", "admin"],
  },
  { methods: ["GET", "POST"], path: "/v1/instructor/assignments", roles: ["instructor", "admin"] },
  {
    methods: ["PATCH"],
    path: "/v1/instructor/assignments/groups/:groupId",
    roles: ["instructor", "admin"],
  },
  { methods: ["GET"], path: "/v1/instructor/assignments/:id", roles: ["instructor", "admin"] },
  {
    methods: ["GET", "POST", "PATCH"],
    path: "/v1/instructor/submissions/:id",
    roles: ["instructor", "admin"],
  },

  /* HR portal */
  { methods: ["GET"], path: "/v1/hr/employees", roles: ["hr", "admin"] },
  { methods: ["GET"], path: "/v1/hr/leave-requests", roles: ["hr", "admin"] },
  { methods: ["PATCH"], path: "/v1/hr/leave-requests/:id", roles: ["hr", "admin"] },
  { methods: ["GET"], path: "/v1/hr/payroll-changes", roles: ["hr", "admin"] },
  { methods: ["POST"], path: "/v1/hr/payroll-changes", roles: ["hr", "admin"] },
  { methods: ["PATCH"], path: "/v1/hr/payroll-changes/:id", roles: ["hr", "admin"] },

  /* Finance portal */
  { methods: ["GET", "POST"], path: "/v1/invoices", roles: ["finance", "admin"] },
  { methods: ["PATCH"], path: "/v1/invoices/:id", roles: ["finance", "admin"] },
  { methods: ["GET"], path: "/v1/expenses", roles: ["finance", "admin"] },
  { methods: ["POST"], path: "/v1/expenses", roles: ["finance", "admin"] },
  { methods: ["PATCH"], path: "/v1/expenses/:id", roles: ["finance", "admin"] },
  { methods: ["GET"], path: "/v1/pnl.csv", roles: ["finance", "admin"] },
  { methods: ["GET", "POST"], path: "/v1/payments", roles: ["finance", "admin"] },
  { methods: ["POST"], path: "/v1/payroll/run", roles: ["finance", "admin"] },

  /* Parent portal — parents only; admins may introspect */
  { methods: ["GET"], path: "/v1/parent/students", roles: ["parent", "admin"] },
  { methods: ["GET"], path: "/v1/parent/students/:id", roles: ["parent", "admin"] },
  { methods: ["GET"], path: "/v1/parent/students/:id/finance", roles: ["parent", "admin"] },
  { methods: ["GET"], path: "/v1/parent/students/:id/attendance", roles: ["parent", "admin"] },

  /* Mentor matchmaking — learners + mentors */
  { methods: ["GET"], path: "/v1/mentor/profiles", roles: ["student", "alumni", "mentor"] },
  { methods: ["POST"], path: "/v1/mentor/match", roles: ["student", "alumni", "mentor"] },
  {
    methods: ["POST"],
    path: "/v1/mentor/requests",
    roles: ["student", "alumni", "mentor", "admin"],
  },

  /* Mentor dashboard — mentor + admin only */
  { methods: ["*"], path: "/v1/mentor-dashboard/*", roles: ["mentor", "admin"] },

  /* Intern dashboard — intern + admin only */
  { methods: ["*"], path: "/v1/intern-dashboard/*", roles: ["intern", "admin"] },

  /* Operations suite — ops + admin only */
  { methods: ["*"], path: "/v1/ops/*", roles: ["ops", "admin"] },

  /* IT support suite — it + admin only */
  { methods: ["*"], path: "/v1/it/*", roles: ["it", "admin"] },

  /* Supplier dashboard — supplier + admin only */
  { methods: ["*"], path: "/v1/supplier-dashboard/*", roles: ["supplier", "admin"] },

  /* Partner dashboard — partner + admin only */
  { methods: ["*"], path: "/v1/partner-dashboard/*", roles: ["partner", "admin"] },

  /* Volunteer dashboard — volunteer + admin only */
  { methods: ["*"], path: "/v1/volunteer-dashboard/*", roles: ["volunteer", "admin"] },

  /* Receptionist dashboard — receptionist + admin only */
  { methods: ["*"], path: "/v1/receptionist-dashboard/*", roles: ["receptionist", "admin"] },

  /* Government/compliance dashboard — government + admin only */
  { methods: ["*"], path: "/v1/government-dashboard/*", roles: ["government", "admin"] },

  /* Behavioral design dashboard — behavioral-design + admin only */
  { methods: ["*"], path: "/v1/behavioral-dashboard/*", roles: ["behavioral-design", "admin"] },

  /* Product marketing dashboard — product-marketing + admin only */
  {
    methods: ["*"],
    path: "/v1/product-marketing-dashboard/*",
    roles: ["product-marketing", "admin"],
  },

  /* Alumni dashboard — alumni + admin only */
  {
    methods: ["*"],
    path: "/v1/alumni-dashboard/*",
    roles: ["alumni", "admin"],
  },
  {
    methods: ["POST"],
    path: "/v1/alumni-dashboard/members/:id/connect",
    roles: ["alumni", "admin"],
  },

  /* Dev dashboard — dev + admin only */
  { methods: ["*"], path: "/v1/dev-dashboard/*", roles: ["dev", "admin"] },

  /* Growth dashboard — growth + admin only */
  { methods: ["*"], path: "/v1/growth-dashboard/*", roles: ["growth", "admin"] },

  /* Conversion copy dashboard — conversion-copy + admin only */
  {
    methods: ["*"],
    path: "/v1/conversion-copy-dashboard/*",
    roles: ["conversion-copy", "admin"],
  },

  /* Department dashboard — department + admin only */
  { methods: ["*"], path: "/v1/department-dashboard/*", roles: ["department", "admin"] },

  /* NGO partnership dashboard — ngo + admin only */
  {
    methods: ["*"],
    path: "/v1/ngo-dashboard/*",
    roles: ["ngo", "admin"],
  },

  /* Client engagement dashboard — client + admin only */
  { methods: ["*"], path: "/v1/client-dashboard/*", roles: ["client", "admin"] },

  /* Admin systems dashboard — admin only */
  { methods: ["*"], path: "/v1/admin-systems-dashboard/*", roles: ["admin"] },

  /* Director dashboard — director + admin */
  { methods: ["*"], path: "/v1/director-dashboard/*", roles: ["director", "admin"] },

  /* Instructor extras dashboard — admin + instructor */
  {
    methods: ["*"],
    path: "/v1/instructor-extras-dashboard/*",
    roles: ["admin", "instructor"],
  },

  /* Admissions extras dashboard — admissions + admin */
  {
    methods: ["*"],
    path: "/v1/admissions-extras-dashboard/*",
    roles: ["admissions", "admin"],
  },

  /* Parent extras dashboard — parent + admin */
  {
    methods: ["*"],
    path: "/v1/parent-extras-dashboard/*",
    roles: ["parent", "admin"],
  },

  /* HR training dashboard — hr + admin */
  { methods: ["*"], path: "/v1/hr-training-dashboard/*", roles: ["hr", "admin"] },

  /* Student self dashboard — student + admin */
  {
    methods: ["*"],
    path: "/v1/student-self-dashboard/*",
    roles: ["student", "admin"],
  },

  /* Admin portal */
  { methods: ["GET"], path: "/v1/admin/users", roles: ["admin"] },
  { methods: ["POST"], path: "/v1/admin/users", roles: ["admin"] },
  { methods: ["PATCH"], path: "/v1/admin/users/:id", roles: ["admin"] },
  { methods: ["GET"], path: "/v1/admin/accounts", roles: ["admin"] },
  { methods: ["GET"], path: "/v1/admin/audit-log", roles: ["admin"] },

  /* Payments (owned records only) */
  { methods: ["POST"], path: "/v1/payments/checkout" },
  { methods: ["GET"], path: "/v1/payments/session/:reference" },
  { methods: ["GET"], path: "/v1/payments/verify/:reference" },
  { methods: ["GET"], path: "/v1/payments/history" },

  /* Certificates — issue role-gated inside the route; verify is public */
  { methods: ["GET"], path: "/v1/certificates/verify", public: true },
  { methods: ["GET", "POST"], path: "/v1/certificates/*" },

  /* Phase 4 suites — read-only for any authenticated user; writes role-gated inside the routes */
  { methods: ["*"], path: "/v1/recruitment/*" },
  { methods: ["*"], path: "/v1/marketing/*" },
  { methods: ["*"], path: "/v1/design/*" },
  { methods: ["*"], path: "/v1/localization/*" },

  /* Realtime chat + live classes — any authenticated user */
  { methods: ["*"], path: "/v1/realtime/*" },
  { methods: ["*"], path: "/v1/live/*" },
  { methods: ["*"], path: "/v1/uploads/*" },

  /* AI helpers — writes are role-gated inside the route */
  { methods: ["*"], path: "/v1/ai/*" },

  /* Flags — read is public; overrides are admin-only */
  { methods: ["PUT", "DELETE"], path: "/v1/flags/:key", roles: ["admin"] },

  /* Push notifications — own subscriptions; sends role-gated inside the route */
  { methods: ["GET", "POST"], path: "/v1/push/subscriptions" },
  { methods: ["DELETE"], path: "/v1/push/subscriptions/:id" },
  { methods: ["POST"], path: "/v1/push/send" },
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
  const method = c.req.method.toUpperCase();
  const origin = c.req.header("origin");
  const pathname = new URL(c.req.url).pathname;
  const signedWebhook =
    pathname === "/v1/payments/webhook" ||
    pathname === "/v1/enrollments/webhook" ||
    pathname === "/v1/shop/webhook";
  if (
    !signedWebhook &&
    !["GET", "HEAD", "OPTIONS"].includes(method) &&
    !isTrustedOrigin(origin, c.env)
  ) {
    throw ApiError.forbidden("This request origin is not allowed.");
  }

  const rule = matchRbacRule(method, pathname);
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
