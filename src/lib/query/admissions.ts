import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiQuery, usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchAdminApplications,
  fetchAdmissionsStats,
  fetchApplicationStatus,
  updateApplicationStatus,
  type AdminApplication,
  type AdmissionsStats,
  type ApplicationStatus,
  type PipelineStage,
} from "@/lib/api/applications";

export const admissionsKeys = {
  applications: ["admissions", "applications"] as const,
  stats: ["admissions", "stats"] as const,
  status: (ref: string) => ["admissions", "status", ref] as const,
};

export function useAdminApplications(stage?: PipelineStage) {
  return usePaginatedQuery<AdminApplication>(
    [...admissionsKeys.applications, stage ?? "all"],
    (cursor) => fetchAdminApplications(stage, cursor),
  );
}

export function useApplicationItems(stage?: PipelineStage): AdminApplication[] {
  return flattenPages(useAdminApplications(stage).data?.pages);
}

export function useAdmissionsStats() {
  return useApiQuery<AdmissionsStats>(admissionsKeys.stats, fetchAdmissionsStats);
}

/** Public application status lookup by reference code. */
export function useApplicationStatus(ref: string) {
  return useApiQuery<ApplicationStatus>(admissionsKeys.status(ref), () =>
    fetchApplicationStatus(ref),
  );
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { ref: string; status: PipelineStage; note?: string }) =>
      updateApplicationStatus(input.ref, input.status, input.note),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: admissionsKeys.applications });
      void queryClient.invalidateQueries({ queryKey: admissionsKeys.stats });
    },
  });
}
