import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePaginatedQuery } from "@/lib/query/hooks";
import {
  admitPartner,
  fetchPartnerApplications,
  fetchProjectInquiries,
  updatePartnerApplication,
  updateProjectInquiry,
  type PartnerQueueStatus,
  type PartnerStatus,
  type ProjectStatus,
} from "@/lib/api/businessIntake";

export const businessIntakeKeys = {
  projects: (status?: ProjectStatus) => ["business-intake", "projects", status ?? "all"] as const,
  partners: (status?: PartnerQueueStatus) =>
    ["business-intake", "partners", status ?? "all"] as const,
};

export function useProjectInquiries(status?: ProjectStatus) {
  return usePaginatedQuery(businessIntakeKeys.projects(status), (cursor) =>
    fetchProjectInquiries(status, cursor),
  );
}

export function usePartnerApplications(status?: PartnerQueueStatus) {
  return usePaginatedQuery(businessIntakeKeys.partners(status), (cursor) =>
    fetchPartnerApplications(status, cursor),
  );
}

export function useUpdateProjectInquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProjectInquiry,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["business-intake", "projects"] }),
  });
}

export function useUpdatePartnerApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePartnerApplication,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["business-intake", "partners"] }),
  });
}

export function useAdmitPartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: admitPartner,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["business-intake", "partners"] }),
  });
}
