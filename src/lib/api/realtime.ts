import { apiFetch } from "@/lib/api/client";
import { env } from "@/lib/env";
import type { Paginated } from "@/lib/api/types";

export interface RealtimeRoom {
  id: string;
  name: string;
  kind: string;
  createdAt: string;
  connected: number;
}

export interface RealtimeMessage {
  id: string;
  roomId: string;
  channel: string;
  userId: string | null;
  userName: string;
  body: string;
  createdAt: string;
}

export function fetchChatRooms(): Promise<Paginated<RealtimeRoom>> {
  return apiFetch<Paginated<RealtimeRoom>>("/v1/realtime/chat/rooms");
}

export function fetchChatMessages(
  roomId: string,
  cursor?: string,
): Promise<Paginated<RealtimeMessage>> {
  return apiFetch<Paginated<RealtimeMessage>>(`/v1/realtime/chat/rooms/${roomId}/messages`, {
    query: cursor ? { cursor } : undefined,
  });
}

export function createChatRoom(input: { name: string; kind?: string }): Promise<RealtimeRoom> {
  return apiFetch<RealtimeRoom>("/v1/realtime/chat/rooms", { method: "POST", body: input });
}

export function sendChatMessage(roomId: string, body: string): Promise<RealtimeMessage> {
  return apiFetch<RealtimeMessage>(`/v1/realtime/chat/rooms/${roomId}/messages`, {
    method: "POST",
    body: { body },
  });
}

/** WebSocket URL for a chat room (real backend mode only; empty in mock mode). */
export function chatWebSocketUrl(roomId: string): string {
  if (!env.wsUrl) return "";
  return `${env.wsUrl}/v1/realtime/chat/rooms/${roomId}/ws`;
}
