import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";
import type { MessageThread } from "@/data/learning";

export function fetchMessageThreads(): Promise<Paginated<MessageThread>> {
  return apiFetch<Paginated<MessageThread>>("/v1/messages/threads");
}
