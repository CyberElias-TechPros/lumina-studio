/**
 * Role → permissions map. Mirrors src/data/rbac.ts (ROLE_PERMISSIONS) so the
 * backend issues server-authoritative permissions. Phase 2+ moves this into
 * D1 roles/role_permissions tables; the session shape stays the same.
 */
export const ROLE_PERMISSIONS: Record<string, string[]> = {
  student: ["lms:read", "lms:enroll", "lms:submit", "finance:read", "notifications:read"],
  instructor: ["lms:read", "lms:manage", "lms:grade", "attendance:manage", "notifications:read"],
  intern: ["lms:read", "intern:read", "intern:manage", "attendance:manage", "notifications:read"],
  employer: ["recruitment:read", "recruitment:manage", "talent:search", "notifications:read"],
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
  mentor: ["lms:read", "mentorship:manage", "notifications:read"],
  alumni: ["lms:read", "alumni:read", "mentorship:read", "notifications:read"],
  client: ["client:read", "client:manage", "invoices:read", "support:read"],
  dev: ["dev:read", "dev:manage", "deployments:manage", "monitoring:read"],
  marketing: ["marketing:read", "marketing:manage", "campaigns:manage", "seo:manage"],
  "conversion-copy": ["marketing:read", "copy:manage", "ab-tests:manage", "analytics:read"],
  "product-marketing": ["marketing:read", "marketing:manage", "campaigns:manage"],
  "behavioral-design": ["design:read", "design:manage", "ux:manage"],
  growth: ["growth:read", "growth:manage", "analytics:read"],
  localization: ["localization:read", "localization:manage"],
  design: ["design:read", "design:manage", "assets:manage"],
  parent: ["lms:read", "finance:read", "notifications:read", "parent:read"],
};

export function permissionsForRole(roleKey: string): string[] {
  return ROLE_PERMISSIONS[roleKey] ?? [];
}
