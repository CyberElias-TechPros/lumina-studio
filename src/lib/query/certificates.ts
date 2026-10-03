import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiQuery } from "@/lib/query/hooks";
import {
  fetchCertificateCandidates,
  fetchMyCertificates,
  issueCertificate as apiIssueCertificate,
  type CertificateCandidate,
  type CertificateItem,
} from "@/lib/api/certificates";

export const certificateKeys = {
  mine: ["certificates", "mine"] as const,
  candidates: ["certificates", "candidates"] as const,
};

export function useMyCertificates() {
  return useApiQuery<{ items: CertificateItem[]; total: number }>(
    certificateKeys.mine,
    fetchMyCertificates,
  );
}

export function useCertificateCandidates(enabled = true) {
  return useApiQuery<{ items: CertificateCandidate[]; total: number }>(
    certificateKeys.candidates,
    fetchCertificateCandidates,
    { enabled },
  );
}

export function useIssueCertificate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { userId: string; courseSlug: string; title: string }) =>
      apiIssueCertificate(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: certificateKeys.mine });
    },
  });
}
