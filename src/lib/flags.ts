import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiQuery } from "@/lib/query/hooks";
import { apiFetch } from "@/lib/api/client";

/**
 * KV-backed feature flags (Phase 5+). Mock mode returns the defaults so UI
 * shipped before its backend stays visible; set NEXT_PUBLIC_API_URL to gate live.
 */
const FLAG_DEFAULTS: Record<string, boolean> = {
  "ai.grading": false,
  "ai.recommendations": false,
  "ai.assistant": false,
  "assistant.public": true,
  "ai.content-gen": false,
  "realtime.chat": false,
  "realtime.live-class": false,
  "payments.paystack": false,
  "uploads.r2": false,
  "pwa.push": false,
  "onboarding.tours": true,
};

export const flagKeys = {
  all: ["flags"] as const,
};

export function useFlags() {
  return useApiQuery<Record<string, boolean>>(
    flagKeys.all,
    () => apiFetch<Record<string, boolean>>("/v1/flags"),
    { staleTime: 300_000 },
  );
}

export function useFlag(name: keyof typeof FLAG_DEFAULTS): boolean {
  const { data } = useFlags();
  return data?.[name] ?? FLAG_DEFAULTS[name];
}

/** Admin: set a feature-flag override (PUT /v1/flags/:key). */
export function setFlag(key: string, enabled: boolean): Promise<{ key: string; enabled: boolean }> {
  return apiFetch<{ key: string; enabled: boolean }>(`/v1/flags/${key}`, {
    method: "PUT",
    body: { enabled },
  });
}

/** Admin: reset a feature flag to its default (DELETE /v1/flags/:key). */
export function resetFlag(key: string): Promise<{ key: string; enabled: boolean }> {
  return apiFetch<{ key: string; enabled: boolean }>(`/v1/flags/${key}`, { method: "DELETE" });
}

/** Admin: flip a feature-flag override and refetch the flag set. */
export function useSetFlag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ key, enabled }: { key: string; enabled: boolean }) => setFlag(key, enabled),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: flagKeys.all });
    },
  });
}

/** Admin: clear a feature-flag override back to its default. */
export function useResetFlag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (key: string) => resetFlag(key),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: flagKeys.all });
    },
  });
}

export const flagLabels: Record<string, string> = {
  "ai.grading": "AI grading",
  "ai.recommendations": "AI recommendations",
  "ai.assistant": "AI assistant",
  "assistant.public": "Public site assistant (chat widget)",
  "ai.content-gen": "AI content generation",
  "realtime.chat": "Realtime chat",
  "realtime.live-class": "Realtime live class",
  "payments.paystack": "Paystack payments",
  "uploads.r2": "R2 uploads",
  "pwa.push": "PWA push",
  "onboarding.tours": "Onboarding tours",
};
