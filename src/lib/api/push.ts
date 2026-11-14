import { apiFetch } from "@/lib/api/client";

export interface SendPushInput {
  /** Omit to send to yourself; administrators may target another user. */
  userId?: string;
  title: string;
  body: string;
  url?: string;
}

export interface PushSendResult {
  sent: number;
  removed: number;
  skipped?: number;
  failed?: number;
}

/** Web-push fan-out. Requires VAPID keys server-side (503 otherwise). */
export function sendPush(input: SendPushInput): Promise<PushSendResult> {
  return apiFetch<PushSendResult>("/v1/push/send", { method: "POST", body: input });
}
