import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchNotifications,
  fetchUnreadNotificationCount,
  markAllNotificationsRead as apiMarkAllRead,
  markNotificationRead as apiMarkRead,
  type AppNotification,
  type UnreadNotificationCount,
} from "@/lib/api/notifications";
import {
  fetchNotificationPreferences,
  updateNotificationPreferences,
  type NotificationPreferences,
} from "@/lib/api/notificationPreferences";

export const notificationKeys = {
  all: ["notifications"] as const,
  unreadCount: ["notifications", "unread-count"] as const,
  preferences: ["notifications", "preferences"] as const,
};

export function useUnreadNotificationCount(enabled = true) {
  return useQuery<UnreadNotificationCount>({
    queryKey: notificationKeys.unreadCount,
    queryFn: fetchUnreadNotificationCount,
    enabled,
    staleTime: 30_000,
    refetchInterval: enabled ? 60_000 : false,
    refetchOnWindowFocus: true,
  });
}

export function useNotificationPreferences() {
  return useQuery<NotificationPreferences>({
    queryKey: notificationKeys.preferences,
    queryFn: fetchNotificationPreferences,
  });
}

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
      void queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiMarkAllRead(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: notificationKeys.all });
      void queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount });
    },
  });
}

export function useUpdateNotificationPreferences() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<NotificationPreferences>) => updateNotificationPreferences(input),
    onSuccess: (preferences) => {
      queryClient.setQueryData(notificationKeys.preferences, preferences);
    },
  });
}
