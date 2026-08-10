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

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  roleKey: string;
  status: string;
  createdAt: string;
}

/** Real sign-in accounts from the `users` table (admin only). */
export function fetchAdminAccounts(): Promise<Paginated<AdminAccount>> {
  return apiFetch<Paginated<AdminAccount>>("/v1/admin/accounts");
}

export function fetchAuditLog(): Promise<Paginated<AuditEntry>> {
  return apiFetch<Paginated<AuditEntry>>("/v1/admin/audit-log");
}

export interface ProvisionUserInput {
  name: string;
  email: string;
  roleKey: string;
}

export interface ProvisionUserResult {
  ok: boolean;
  id: string;
  email: string;
  roleKey: string;
  inviteUrl: string;
}

export function provisionUser(input: ProvisionUserInput): Promise<ProvisionUserResult> {
  return apiFetch<ProvisionUserResult>("/v1/admin/users", {
    method: "POST",
    body: input,
  });
}

export interface UpdateUserInput {
  roleKey?: string;
  status?: string;
}

export function updateUser(id: string, input: UpdateUserInput): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>(`/v1/admin/users/${id}`, {
    method: "PATCH",
    body: input,
  });
}
