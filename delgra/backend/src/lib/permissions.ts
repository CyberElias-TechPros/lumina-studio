import type { Role } from "./env.ts";

/**
 * Capability model.
 *
 * Routes never check roles directly — they declare the capability they need and
 * `rbac.ts` maps role -> capabilities. Adding a role or tightening a permission
 * is a one-line change here, never a hunt through handlers.
 */
export const CAPABILITIES = [
  "read:dashboard",
  "read:reports",
  "export:data",

  "read:invoices",
  "write:invoices",
  "delete:invoices",
  "void:invoices",
  "receive:payments",
  "delete:payments",

  "read:waybills",
  "write:waybills",
  "delete:waybills",

  "read:customers",
  "write:customers",
  "delete:customers",

  "read:products",
  "write:products",
  "delete:products",
  "adjust:stock",

  "read:suppliers",
  "write:suppliers",
  "delete:suppliers",

  "read:purchases",
  "write:purchases",
  "delete:purchases",
  "pay:purchases",

  "read:expenses",
  "write:expenses",
  "delete:expenses",

  "read:documents",
  "write:documents",

  "read:shares",
  "write:shares",

  "read:users",
  "manage:users",
  "manage:settings",
  "read:audit",
] as const;

export type Capability = (typeof CAPABILITIES)[number];

const READ_ONLY = [
  "read:dashboard",
  "read:reports",
  "read:invoices",
  "read:waybills",
  "read:customers",
  "read:products",
  "read:suppliers",
  "read:purchases",
  "read:expenses",
  "read:documents",
  "read:shares",
] as const satisfies readonly Capability[];

const STAFF_EXTRA = [
  "write:invoices",
  "receive:payments",
  "write:waybills",
  "write:customers",
  "write:products",
  "adjust:stock",
  "write:suppliers",
  "write:purchases",
  "pay:purchases",
  "write:expenses",
  "write:documents",
  "read:shares",
  "write:shares",
] as const satisfies readonly Capability[];

const ROLE_CAPABILITIES: Record<Role, readonly Capability[]> = {
  viewer: READ_ONLY,

  staff: [...READ_ONLY, ...STAFF_EXTRA],

  manager: [
    ...READ_ONLY,
    ...STAFF_EXTRA,
    "export:data",
    "delete:invoices",
    "void:invoices",
    "delete:payments",
    "delete:waybills",
    "delete:customers",
    "delete:products",
    "delete:suppliers",
    "delete:purchases",
    "delete:expenses",
    "read:users",
    "read:audit",
  ],

  owner: CAPABILITIES,
};

const LOOKUP: Record<Role, ReadonlySet<Capability>> = {
  viewer: new Set(ROLE_CAPABILITIES.viewer),
  staff: new Set(ROLE_CAPABILITIES.staff),
  manager: new Set(ROLE_CAPABILITIES.manager),
  owner: new Set(ROLE_CAPABILITIES.owner),
};

export function can(role: Role, capability: Capability): boolean {
  return LOOKUP[role]?.has(capability) ?? false;
}

export function capabilitiesFor(role: Role): Capability[] {
  return [...(ROLE_CAPABILITIES[role] ?? [])];
}

/** Roles that may be assigned by the UI, in descending authority. */
export const ASSIGNABLE_ROLES: readonly Role[] = ["owner", "manager", "staff", "viewer"];

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ASSIGNABLE_ROLES as readonly string[]).includes(value);
}
