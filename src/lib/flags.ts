import { useApiQuery } from "@/lib/query/hooks";
import { apiFetch } from "@/lib/api/client";

/**
 * KV-backed feature flags (Phase 5+). Mock mode returns the defaults so UI
 * shipped before its backend stays visible; set VITE_API_URL to gate live.
 */
const FLAG_DEFAULTS: Record<string, boolean> = {
  "ai.grading": false,
  "ai.recommendations": false,
  "ai.assistant": false,
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
