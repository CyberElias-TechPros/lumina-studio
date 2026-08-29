import { apiFetch } from "@/lib/api/client";

export interface NotificationPreferences {
  appEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
  quietStart: string;
  quietEnd: string;
}

export function fetchNotificationPreferences(): Promise<NotificationPreferences> {
  return apiFetch<NotificationPreferences>("/v1/notifications/preferences");
}

export function updateNotificationPreferences(
  input: Partial<NotificationPreferences>,
): Promise<NotificationPreferences> {
  return apiFetch<NotificationPreferences>("/v1/notifications/preferences", {
    method: "PATCH",
    body: input,
  });
}
