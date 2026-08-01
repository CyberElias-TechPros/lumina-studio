import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchNotifications,
  markAllNotificationsRead as apiMarkAllRead,
  markNotificationRead as apiMarkRead,
  type AppNotification,
} from "@/lib/api/notifications";

export const notificationKeys = {
  all: ["notifications"] as const,
};

export function useNotifications() {
  return usePaginatedQuery<AppNotification>(notificationKeys.all, fetchNotifications);
}

export function useNotificationItems(): AppNotification[] {
  return flattenPages(useNotifications().data?.pages);
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiMarkRead(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiMarkAllRead(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}
