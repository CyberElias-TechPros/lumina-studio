import { useQuery } from "@tanstack/react-query";
import { fetchPortalSummary, type PortalSummary } from "@/lib/api/portal";

export function usePortalSummary(portal: string) {
  return useQuery<PortalSummary>({
    queryKey: ["portal", "summary", portal],
    queryFn: () => fetchPortalSummary(portal),
    staleTime: 60_000,
  });
}
