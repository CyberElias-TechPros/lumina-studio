import { apiFetch } from "@/lib/api/client";

export interface PortalMetric {
  key: string;
  label: string;
  value: number;
  format: "number" | "naira" | "percent";
  hint?: string;
}

export interface PortalActivity {
  id: string;
  title: string;
  body: string;
  time: string;
  engine: string;
  read: boolean;
}

export interface PortalSummary {
  portal: string;
  group: string;
  /** True when the signed-in role can't see this portal's org data. */
  restricted: boolean;
  generatedAt: string;
  metrics: PortalMetric[];
  activity: PortalActivity[];
}

export function fetchPortalSummary(portal: string): Promise<PortalSummary> {
  return apiFetch<PortalSummary>(`/v1/portal/summary?portal=${encodeURIComponent(portal)}`);
}
