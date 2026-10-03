/**
 * Canonical role registry. AppShell's `roleKey` prop was a free string with
 * alias drift (director→"admin", finance→"instructor", …). This module is the
 * single normalization point; Phase 1 RBAC replaces it with the server
 * roles/permissions tables, but the client API shape stays the same.
 */

export const CANONICAL_ROLE_KEYS = [
  "student",
  "parent",
  "instructor",
  "intern",
  "employer",
  "alumni",
  "mentor",
  "client",
  "dev",
  "marketing",
  "conversion-copy",
  "product-marketing",
  "behavioral-design",
  "growth",
  "localization",
  "design",
  "admin",
  "finance",
  "hr",
  "admissions",
  "department",
  "director",
  "ops",
  "it",
  "receptionist",
  "supplier",
  "volunteer",
  "ngo",
  "government",
  "partner",
] as const;

export type CanonicalRoleKey = (typeof CANONICAL_ROLE_KEYS)[number];

/** Observed free-string roleKeys mapped to canonical keys. */
export const ROLE_ALIASES: Record<string, CanonicalRoleKey> = {
  "executive-director": "admin",
  accountant: "finance",
  recruiter: "employer",
  "behavioral-designer": "behavioral-design",
  "global-copywriter": "localization",
  "visual-designer": "design",
  "product-designer": "design",
  "product-manager": "product-marketing",
  "operations-manager": "ops",
  "it-support": "it",
  "department-head": "department",
  "support-agent": "it",
};

export function isCanonicalRoleKey(key: string): key is CanonicalRoleKey {
  return (CANONICAL_ROLE_KEYS as readonly string[]).includes(key);
}

export function resolveRoleKey(key?: string | null): CanonicalRoleKey {
  if (!key) return "student";
  if (isCanonicalRoleKey(key)) return key;
  return ROLE_ALIASES[key] ?? "student";
}

/** First useful workspace page for each role after a successful sign-in. */
export const ROLE_HOME_PATHS: Record<CanonicalRoleKey, string> = {
  student: "/app",
  instructor: "/app/instructor",
  intern: "/app/intern",
  employer: "/app/employer/hub",
  alumni: "/app/alumni/hub",
  mentor: "/app/mentor",
  client: "/app/client",
  dev: "/app/dev",
  marketing: "/app/marketing",
  "conversion-copy": "/app/conversion-copy/analytics",
  "product-marketing": "/app/product-marketing",
  "behavioral-design": "/app/behavioral-design",
  growth: "/app/growth",
  localization: "/app/localization",
  design: "/app/design",
  admin: "/app/admin",
  finance: "/app/accountant",
  hr: "/app/hr",
  admissions: "/app/admissions",
  department: "/app/department",
  director: "/app/director",
  ops: "/app/ops",
  it: "/app/it",
  receptionist: "/app/receptionist",
  supplier: "/app/supplier",
  volunteer: "/app/volunteer",
  ngo: "/app/ngo",
  government: "/app/government",
  partner: "/app/partner/hub",
  parent: "/app/parent",
};

export function getRoleHomePath(roleKey?: string | null): string {
  return ROLE_HOME_PATHS[resolveRoleKey(roleKey)];
}

/** Permission seed set (Phase 1 replaces with server-issued permissions). */
export const ROLE_PERMISSIONS: Record<CanonicalRoleKey, string[]> = {
  student: ["lms:read", "lms:enroll", "lms:submit", "finance:read", "notifications:read"],
  parent: ["lms:read", "finance:read", "notifications:read", "parent:read"],
  instructor: ["lms:read", "lms:manage", "lms:grade", "attendance:manage", "notifications:read"],
  intern: ["lms:read", "intern:read", "intern:manage", "attendance:manage", "notifications:read"],
  employer: ["recruitment:read", "recruitment:manage", "talent:search", "notifications:read"],
  alumni: ["lms:read", "alumni:read", "mentorship:read", "notifications:read"],
  mentor: ["lms:read", "mentorship:manage", "notifications:read"],
  client: ["client:read", "client:manage", "invoices:read", "support:read"],
  dev: ["dev:read", "dev:manage", "deployments:manage", "monitoring:read"],
  marketing: ["marketing:read", "marketing:manage", "campaigns:manage", "seo:manage"],
  "conversion-copy": ["marketing:read", "copy:manage", "ab-tests:manage", "analytics:read"],
  "product-marketing": ["marketing:read", "marketing:manage", "campaigns:manage"],
  "behavioral-design": ["design:read", "design:manage", "ux:manage"],
  growth: ["growth:read", "growth:manage", "analytics:read"],
  localization: ["localization:read", "localization:manage"],
  design: ["design:read", "design:manage", "assets:manage"],
  admin: ["*"],
  finance: ["finance:read", "finance:manage", "invoices:manage", "payments:manage"],
  hr: ["hr:read", "hr:manage", "payroll:manage", "recruitment:manage"],
  admissions: ["admissions:read", "admissions:manage", "applications:manage"],
  department: ["lms:read", "department:read", "department:manage", "curriculum:manage"],
  director: ["*"],
  ops: ["ops:read", "ops:manage", "inventory:manage", "facilities:manage"],
  it: ["it:read", "it:manage", "tickets:manage", "assets:manage"],
  receptionist: ["reception:read", "reception:manage", "checkin:manage", "directory:read"],
  supplier: ["supplier:read", "supplier:manage", "orders:manage", "invoices:read"],
  volunteer: ["volunteer:read", "volunteer:manage", "community:read"],
  ngo: ["ngo:read", "ngo:manage", "scholarships:manage", "volunteers:manage"],
  government: ["compliance:read", "compliance:manage", "filings:read", "audit:read"],
  partner: ["partner:read", "partner:manage", "referrals:manage", "collaborations:manage"],
};

export const DEFAULT_PERMISSIONS = (roleKey?: string | null): string[] =>
  ROLE_PERMISSIONS[resolveRoleKey(roleKey)] ?? [];
