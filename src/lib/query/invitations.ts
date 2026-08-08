import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiQuery } from "@/lib/query/hooks";
import {
  acceptInvitation,
  fetchInvitation,
  type AcceptInvitationResult,
  type InvitationInfo,
} from "@/lib/api/invitations";

export const invitationKeys = {
  info: (token: string) => ["invitations", "info", token] as const,
};

/** Verify an invitation link. Disabled until a token is present. */
export function useInvitation(token: string | undefined) {
  return useApiQuery<InvitationInfo>(invitationKeys.info(token ?? ""), () =>
    fetchInvitation(token ?? ""),
  );
}

/** Accept an invitation as the signed-in guardian. */
export function useAcceptInvitation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (token: string): Promise<AcceptInvitationResult> => acceptInvitation(token),
    onSuccess: (_data, token) => {
      void queryClient.invalidateQueries({ queryKey: invitationKeys.info(token) });
    },
  });
}
