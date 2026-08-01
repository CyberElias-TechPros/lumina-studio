import { useApiQuery, usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import { fetchMessageThreads, fetchMessageThread } from "@/lib/api/messages";
import type { MessageThread } from "@/data/learning";

export const messageKeys = {
  all: ["messages", "threads"] as const,
  detail: (id: string) => ["messages", "threads", id] as const,
};

export function useMessageThreads() {
  return usePaginatedQuery<MessageThread>(messageKeys.all, fetchMessageThreads);
}

export function useMessageThread(id: string) {
  return useApiQuery<MessageThread>(messageKeys.detail(id), () => fetchMessageThread(id), {
    enabled: id.length > 0,
  });
}

export function useThreadItems(): MessageThread[] {
  return flattenPages(useMessageThreads().data?.pages);
}
