/**
 * Role → permissions map. Mirrors src/data/rbac.ts (ROLE_PERMISSIONS) so the
 * backend issues server-authoritative permissions. Phase 2+ moves this into
 * D1 roles/role_permissions tables; the session shape stays the same.
 */
export const ROLE_PERMISSIONS: Record<string, string[]> = {
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

export function permissionsForRole(roleKey: string): string[] {
  return ROLE_PERMISSIONS[roleKey] ?? [];
}
