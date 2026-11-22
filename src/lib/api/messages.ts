import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export interface Message {
  id?: string;
  text: string;
  time: string;
  mine: boolean;
  senderName?: string;
  createdAt?: string;
}

export interface DirectThread {
  id: string;
  name: string;
  role: string;
  unread: number;
  legacy?: boolean;
  subject?: string;
  last: { text: string; time: string; mine: boolean };
  messages: Message[];
}

export interface MessageContact {
  id: string;
  name: string;
  roleKey: string;
}

export function fetchMessageContacts(): Promise<{ items: MessageContact[] }> {
  return apiFetch<{ items: MessageContact[] }>("/v1/messages/contacts");
}

export function createMessageThread(input: {
  subject: string;
  recipientId?: string;
  body: string;
}): Promise<DirectThread> {
  return apiFetch<DirectThread>("/v1/messages/threads", {
    method: "POST",
    body: input,
  });
}

export function fetchMessageThreads(cursor?: string): Promise<Paginated<DirectThread>> {
  return apiFetch<Paginated<DirectThread>>("/v1/messages/threads", { query: { cursor } });
}

export function fetchMessageThread(id: string): Promise<DirectThread> {
  return apiFetch<DirectThread>(`/v1/messages/threads/${id}`);
}

export function sendMessage(id: string, body: string): Promise<Message> {
  return apiFetch<Message>(`/v1/messages/threads/${id}/messages`, {
    method: "POST",
    body: { body },
  });
}
