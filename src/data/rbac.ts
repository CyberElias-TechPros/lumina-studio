/**
 * Canonical role registry. AppShell's `roleKey` prop was a free string with
 * alias drift (director→"admin", finance→"instructor", …). This module is the
 * single normalization point; Phase 1 RBAC replaces it with the server
 * roles/permissions tables, but the client API shape stays the same.
 */

export const CANONICAL_ROLE_KEYS = [
  "student",
  "instructor",
  "employer",
  "admin",
  "finance",
  "mentor",
  "alumni",
  "product-marketing",
  "behavioral-design",
  "growth",
  "localization",
  "design",
] as const;

export type CanonicalRoleKey = (typeof CANONICAL_ROLE_KEYS)[number];

/** Observed free-string roleKeys mapped to canonical keys. */
export const ROLE_ALIASES: Record<string, CanonicalRoleKey> = {
  director: "admin",
  government: "admin",
  "executive-director": "admin",
  accountant: "finance",
  hr: "admin",
  recruiter: "employer",
  "behavioral-designer": "behavioral-design",
  "global-copywriter": "localization",
  "visual-designer": "design",
  "product-designer": "design",
  "product-manager": "product-marketing",
};

export function isCanonicalRoleKey(key: string): key is CanonicalRoleKey {
  return (CANONICAL_ROLE_KEYS as readonly string[]).includes(key);
}

export function resolveRoleKey(key?: string | null): CanonicalRoleKey {
  if (!key) return "student";
  if (isCanonicalRoleKey(key)) return key;
  return ROLE_ALIASES[key] ?? "student";
}

/** Permission seed set (Phase 1 replaces with server-issued permissions). */
export const ROLE_PERMISSIONS: Record<CanonicalRoleKey, string[]> = {
  student: ["lms:read", "lms:enroll", "lms:submit", "finance:read", "notifications:read"],
  instructor: ["lms:read", "lms:manage", "lms:grade", "attendance:manage", "notifications:read"],
  employer: ["recruitment:read", "recruitment:manage", "talent:search", "notifications:read"],
  admin: ["*"],
  finance: ["finance:read", "finance:manage", "invoices:manage", "payments:manage"],
  mentor: ["lms:read", "mentorship:manage", "notifications:read"],
  alumni: ["lms:read", "alumni:read", "mentorship:read", "notifications:read"],
  "product-marketing": ["marketing:read", "marketing:manage", "campaigns:manage"],
  "behavioral-design": ["design:read", "design:manage", "ux:manage"],
  growth: ["growth:read", "growth:manage", "analytics:read"],
  localization: ["localization:read", "localization:manage"],
  design: ["design:read", "design:manage", "assets:manage"],
};

export const DEFAULT_PERMISSIONS = (roleKey?: string | null): string[] =>
  ROLE_PERMISSIONS[resolveRoleKey(roleKey)] ?? [];
