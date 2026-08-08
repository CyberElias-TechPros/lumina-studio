import { useApiQuery, usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import { fetchMessageThreads } from "@/lib/api/messages";
import type { MessageThread } from "@/data/learning";

export const messageKeys = {
  all: ["messages", "threads"] as const,
};

export function useMessageThreads() {
  return usePaginatedQuery<MessageThread>(messageKeys.all, fetchMessageThreads);
}

export function useThreadItems(): MessageThread[] {
  return flattenPages(useMessageThreads().data?.pages);
}
