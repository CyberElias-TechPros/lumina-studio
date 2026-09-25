import { useQuery } from "@tanstack/react-query";
import { fetchEnrollment } from "@/lib/api/enrollments";
import { fetchApplicationStatus as fetchLegacyStatus } from "@/lib/api/applications";

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
export function useEnrollmentStatus(ref: string) {
  return useQuery({
    queryKey: ["enrollments", "status", ref],
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
