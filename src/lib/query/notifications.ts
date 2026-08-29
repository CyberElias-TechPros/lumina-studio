import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchNotifications,
  markAllNotificationsRead as apiMarkAllRead,
  markNotificationRead as apiMarkRead,
  type AppNotification,
} from "@/lib/api/notifications";
import {
  fetchNotificationPreferences,
  updateNotificationPreferences,
  type NotificationPreferences,
} from "@/lib/api/notificationPreferences";

export const notificationKeys = {
  all: ["notifications"] as const,
  preferences: ["notifications", "preferences"] as const,
};

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

export function useUpdateNotificationPreferences() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<NotificationPreferences>) => updateNotificationPreferences(input),
    onSuccess: (preferences) => {
      queryClient.setQueryData(notificationKeys.preferences, preferences);
    },
  });
}
