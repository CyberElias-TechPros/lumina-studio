import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchAdminUsers,
  fetchAuditLog,
  fetchAdminAccounts,
  provisionUser,
  updateUser,
  type AdminUser,
  type AuditEntry,
  type AdminAccount,
} from "@/lib/api/admin";

export const adminKeys = {
  users: ["admin", "users"] as const,
  audit: ["admin", "audit-log"] as const,
  accounts: ["admin", "accounts"] as const,
};

export function useAdminUsers() {
  return usePaginatedQuery<AdminUser>(adminKeys.users, fetchAdminUsers);
}

export function useAdminUserItems(): AdminUser[] {
  return flattenPages(useAdminUsers().data?.pages);
}

export function useAuditLog() {
  return usePaginatedQuery<AuditEntry>(adminKeys.audit, fetchAuditLog);
}

export function useAuditItems(): AuditEntry[] {
  return flattenPages(useAuditLog().data?.pages);
}

export function useAdminAccounts() {
  return usePaginatedQuery<AdminAccount>(adminKeys.accounts, fetchAdminAccounts);
}

export function useAdminAccountItems(): AdminAccount[] {
  return flattenPages(useAdminAccounts().data?.pages);
}

export function useProvisionUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: provisionUser,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminKeys.users });
      void queryClient.invalidateQueries({ queryKey: adminKeys.accounts });
    },
  });
}

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { roleKey?: string; status?: string }) => updateUser(id, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminKeys.users });
      void queryClient.invalidateQueries({ queryKey: adminKeys.accounts });
    },
  });
}
