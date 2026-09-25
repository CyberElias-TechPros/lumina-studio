import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePaginatedQuery } from "@/lib/query/hooks";
import {
  fetchEnrollment,
  fetchAdminEnrollments,
  updateEnrollmentStage,
  type AdminEnrollment,
  type EnrollmentStage,
} from "@/lib/api/enrollments";
import { fetchApplicationStatus as fetchLegacyStatus } from "@/lib/api/applications";

export const enrollmentKeys = {
  status: (ref: string) => ["enrollments", "status", ref] as const,
  admin: (stage?: string) => ["enrollments", "admin", stage ?? "all"] as const,
};

export interface NormalizedEnrollmentStatus {
  ref: string;
  status: string;
  programTitle: string | null;
  stages: { key: string; label: string; done: boolean; active: boolean }[];
  updatedAt: string | null;
  /** Present when the ref belongs to the v2 enrollment funnel. */
  payment?: {
    status: string;
    amountDue: number;
    paidAmount: number;
    plan: string;
  };
}

/**
 * Public status lookup by reference: tries the v2 enrollment funnel first
 * (richer: payment state, events), falls back to the legacy applications
 * pipeline for older references.
 */
/** Admissions/finance — all v2 registrations, optional stage filter. */
export function useAdminEnrollments(stage?: string) {
  return usePaginatedQuery<AdminEnrollment>(enrollmentKeys.admin(stage), (cursor) =>
    fetchAdminEnrollments(stage, cursor),
  );
}

/** Admissions/finance — advance a registration along the pipeline. */
export function useUpdateEnrollmentStage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { ref: string; stage: EnrollmentStage; note?: string }) =>
      updateEnrollmentStage(input.ref, input.stage, input.note),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["enrollments", "admin"] });
    },
  });
}

export function useEnrollmentStatus(ref: string) {
  return useQuery({
    queryKey: enrollmentKeys.status(ref),
    enabled: Boolean(ref),
    retry: false,
    queryFn: async (): Promise<NormalizedEnrollmentStatus> => {
      try {
        const e = await fetchEnrollment(ref);
        return {
          ref: e.ref,
          status: e.stage,
          programTitle: e.programTitle,
          stages: e.stages,
          updatedAt: e.updatedAt,
          payment: {
            status: e.payment.status,
            amountDue: e.payment.amountDue,
            paidAmount: e.payment.paidAmount,
            plan: e.payment.plan,
          },
        };
      } catch {
        const legacy = await fetchLegacyStatus(ref);
        return {
          ref: legacy.ref,
          status: legacy.status,
          programTitle: legacy.programTitle,
          stages: legacy.stages,
          updatedAt: legacy.updatedAt,
        };
      }
    },
  });
}
