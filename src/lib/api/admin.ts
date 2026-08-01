import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastSeen: string;
}

export interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  time: string;
  severity: string;
}

export function fetchAdminUsers(): Promise<Paginated<AdminUser>> {
  return apiFetch<Paginated<AdminUser>>("/v1/admin/users");
}

export function fetchAuditLog(): Promise<Paginated<AuditEntry>> {
  return apiFetch<Paginated<AuditEntry>>("/v1/admin/audit-log");
}
