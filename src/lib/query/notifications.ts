import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import { fetchNotifications, type AppNotification } from "@/lib/api/notifications";

export const notificationKeys = {
  all: ["notifications"] as const,
};

export function useNotifications() {
  return usePaginatedQuery<AppNotification>(notificationKeys.all, fetchNotifications);
}

export function useNotificationItems(): AppNotification[] {
  return flattenPages(useNotifications().data?.pages);
}
