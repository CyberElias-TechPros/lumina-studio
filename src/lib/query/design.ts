import { useApiQuery, usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchCollaborationThreads,
  fetchDesignComponents,
  fetchDesignExports,
  fetchDesignFlows,
  fetchDesignKpis,
  fetchDesignPrototypes,
  fetchDesignTokens,
  fetchDesignVersions,
  fetchSystemComponents,
  type CollaborationThread,
  type DesignComponent,
  type DesignExport,
  type DesignFlow,
  type DesignKpi,
  type DesignPrototype,
  type DesignToken,
  type DesignVersion,
  type SystemComponent,
} from "@/lib/api/design";

export const designKeys = {
  components: ["design", "components"] as const,
  flows: ["design", "flows"] as const,
  prototypes: ["design", "prototypes"] as const,
  tokens: ["design", "tokens"] as const,
  versions: ["design", "versions"] as const,
  collaboration: ["design", "collaboration"] as const,
  exports: ["design", "exports"] as const,
  systemComponents: ["design", "system-components"] as const,
  kpis: ["design", "kpis"] as const,
};

export function useDesignComponents() {
  return usePaginatedQuery<DesignComponent>(designKeys.components, fetchDesignComponents);
}

export function useDesignComponentItems(): DesignComponent[] {
  return flattenPages(useDesignComponents().data?.pages);
}

export function useDesignFlows() {
  return usePaginatedQuery<DesignFlow>(designKeys.flows, fetchDesignFlows);
}

export function useDesignFlowItems(): DesignFlow[] {
  return flattenPages(useDesignFlows().data?.pages);
}

export function useDesignPrototypes() {
  return usePaginatedQuery<DesignPrototype>(designKeys.prototypes, fetchDesignPrototypes);
}

export function useDesignPrototypeItems(): DesignPrototype[] {
  return flattenPages(useDesignPrototypes().data?.pages);
}

export function useDesignTokens() {
  return usePaginatedQuery<DesignToken>(designKeys.tokens, fetchDesignTokens);
}

export function useDesignTokenItems(): DesignToken[] {
  return flattenPages(useDesignTokens().data?.pages);
}

export function useDesignVersions() {
  return usePaginatedQuery<DesignVersion>(designKeys.versions, fetchDesignVersions);
}

export function useDesignVersionItems(): DesignVersion[] {
  return flattenPages(useDesignVersions().data?.pages);
}

export function useCollaborationThreads() {
  return usePaginatedQuery<CollaborationThread>(
    designKeys.collaboration,
    fetchCollaborationThreads,
  );
}

export function useCollaborationThreadItems(): CollaborationThread[] {
  return flattenPages(useCollaborationThreads().data?.pages);
}

export function useDesignExports() {
  return usePaginatedQuery<DesignExport>(designKeys.exports, fetchDesignExports);
}

export function useDesignExportItems(): DesignExport[] {
  return flattenPages(useDesignExports().data?.pages);
}

export function useSystemComponents() {
  return usePaginatedQuery<SystemComponent>(designKeys.systemComponents, fetchSystemComponents);
}

export function useSystemComponentItems(): SystemComponent[] {
  return flattenPages(useSystemComponents().data?.pages);
}

export function useDesignKpis() {
  return useApiQuery<DesignKpi[]>(designKeys.kpis, async () => (await fetchDesignKpis()).items);
}
