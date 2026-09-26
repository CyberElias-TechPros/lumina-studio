import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changePassword,
  deleteAccount,
  exportAccountData,
  fetchAccount,
  fetchJobRuns,
  fetchSystemReadiness,
  runJob,
  sendEmailVerification,
  updateAccount,
  verifyEmail,
  type Account,
} from "@/lib/api/account";
import { sessionKeys } from "@/lib/auth/session";

export const accountKeys = {
  all: ["account"] as const,
  readiness: ["system", "readiness"] as const,
  jobs: ["system", "jobs"] as const,
};

export function useAccount(enabled = true) {
  return useQuery<Account>({ queryKey: accountKeys.all, queryFn: fetchAccount, enabled });
}

export function useUpdateAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateAccount,
    onSuccess: (account) => {
      qc.setQueryData(accountKeys.all, account);
      void qc.invalidateQueries({ queryKey: sessionKeys.all });
    },
  });
}

export function useChangePassword() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => void qc.invalidateQueries({ queryKey: accountKeys.all }),
  });
}

export function useSendEmailVerification() {
  return useMutation({ mutationFn: sendEmailVerification });
}

export function useVerifyEmail() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (account) => qc.setQueryData(accountKeys.all, account),
  });
}

/** Downloads the export as a JSON file in the browser. */
export function useExportAccountData() {
  return useMutation({
    mutationFn: async () => {
      const data = await exportAccountData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cea-account-export-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      return true;
    },
  });
}

export function useDeleteAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      qc.clear();
    },
  });
}

export function useSystemReadiness() {
  return useQuery({ queryKey: accountKeys.readiness, queryFn: fetchSystemReadiness });
}

export function useJobRuns() {
  return useQuery({ queryKey: accountKeys.jobs, queryFn: fetchJobRuns });
}

export function useRunJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: runJob,
    onSuccess: () => void qc.invalidateQueries({ queryKey: accountKeys.jobs }),
  });
}
