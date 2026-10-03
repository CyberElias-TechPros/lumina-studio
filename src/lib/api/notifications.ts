import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  engine: string;
  read?: boolean;
}

export interface UnreadNotificationCount {
  count: number;
}

export function fetchUnreadNotificationCount(): Promise<UnreadNotificationCount> {
  return apiFetch<UnreadNotificationCount>("/v1/notifications/unread-count");
}

export function fetchNotifications(cursor?: string): Promise<Paginated<AppNotification>> {
  return apiFetch<Paginated<AppNotification>>("/v1/notifications", {
    query: { cursor },
  });
}

export function markNotificationRead(id: string): Promise<{ ok: true; read: boolean }> {
  return apiFetch(`/v1/notifications/${encodeURIComponent(id)}/read`, { method: "POST" });
}

export function markAllNotificationsRead(): Promise<{ ok: true }> {
  return apiFetch("/v1/notifications/read-all", { method: "POST" });
}
