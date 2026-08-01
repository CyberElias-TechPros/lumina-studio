import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendPush, type SendPushInput } from "@/lib/api/push";
import { notificationKeys } from "@/lib/query/notifications";

export function useSendPush() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: SendPushInput) => sendPush(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}
