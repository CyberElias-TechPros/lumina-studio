import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiQuery, usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchMessageThreads,
  fetchMessageThread,
  sendMessage,
  type Message,
} from "@/lib/api/messages";
import type { MessageThread } from "@/data/learning";

export const messageKeys = {
  all: ["messages", "threads"] as const,
  thread: (id: string) => ["messages", "threads", id] as const,
};

export function useMessageThreads() {
  return usePaginatedQuery<MessageThread>(messageKeys.all, fetchMessageThreads);
}

export function useThreadItems(): MessageThread[] {
  return flattenPages(useMessageThreads().data?.pages);
}

export function useMessageThread(id: string) {
  return useApiQuery(messageKeys.thread(id), () => fetchMessageThread(id), {
    enabled: id.length > 0,
  });
}

export function useSendMessage(threadId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: string) => sendMessage(threadId, body),
    onSuccess: (_, body) => {
      void queryClient.invalidateQueries({ queryKey: messageKeys.thread(threadId) });
      void queryClient.invalidateQueries({ queryKey: messageKeys.all });
      void queryClient.setQueryData<MessageThread | undefined>(
        messageKeys.thread(threadId),
        (prev) =>
          prev
            ? {
                ...prev,
                last: { text: body, time: "Just now", mine: true },
                unread: 0,
                messages: [...prev.messages, { text: body, time: "Just now", mine: true }],
              }
            : prev,
      );
    },
  });
}
