import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  engine: string;
}

export function fetchNotifications(): Promise<Paginated<AppNotification>> {
  return apiFetch<Paginated<AppNotification>>("/v1/notifications");
}
