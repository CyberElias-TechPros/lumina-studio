import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiQuery, usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  createMessageThread,
  fetchMessageContacts,
  fetchMessageThreads,
  fetchMessageThread,
  sendMessage,
  type DirectThread,
} from "@/lib/api/messages";

export const messageKeys = {
  all: ["messages", "threads"] as const,
  contacts: ["messages", "contacts"] as const,
  thread: (id: string) => ["messages", "threads", id] as const,
};

export function useMessageContacts() {
  return useApiQuery(messageKeys.contacts, fetchMessageContacts);
}

export function useMessageThreads() {
  return usePaginatedQuery<DirectThread>(messageKeys.all, fetchMessageThreads);
}

export function useThreadItems(): DirectThread[] {
  return flattenPages(useMessageThreads().data?.pages);
}

export function useMessageThread(id: string) {
  return useApiQuery(messageKeys.thread(id), () => fetchMessageThread(id), {
    enabled: id.length > 0,
  });
}

export function useCreateMessageThread() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { subject: string; recipientId?: string; body: string }) =>
      createMessageThread(input),
    onSuccess: (created) => {
      void queryClient.invalidateQueries({ queryKey: messageKeys.all });
      queryClient.setQueryData<DirectThread>(messageKeys.thread(created.id), created);
    },
  });
}

export function useSendMessage(threadId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: string) => sendMessage(threadId, body),
    onSuccess: (sent) => {
      void queryClient.invalidateQueries({ queryKey: messageKeys.thread(threadId) });
      void queryClient.invalidateQueries({ queryKey: messageKeys.all });
      void queryClient.setQueryData<DirectThread | undefined>(
        messageKeys.thread(threadId),
        (prev) =>
          prev
            ? {
                ...prev,
                last: { text: sent.text, time: sent.time || "Just now", mine: true },
                unread: 0,
                messages: [...prev.messages, sent],
              }
            : prev,
      );
    },
  });
}
