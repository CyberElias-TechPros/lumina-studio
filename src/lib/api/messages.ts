import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";
import type { MessageThread } from "@/data/learning";

export interface Message {
  text: string;
  time: string;
  mine: boolean;
}

export function fetchMessageThreads(): Promise<Paginated<MessageThread>> {
  return apiFetch<Paginated<MessageThread>>("/v1/messages/threads");
}

export function fetchMessageThread(id: string): Promise<MessageThread> {
  return apiFetch<MessageThread>(`/v1/messages/threads/${id}`);
}

export function sendMessage(id: string, body: string): Promise<Message> {
  return apiFetch<Message>(`/v1/messages/threads/${id}/messages`, {
    method: "POST",
    body: { body },
  });
}
