import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  addTicketEvent,
  fetchItTickets,
  fetchItArticles,
  fetchItAssets,
  fetchItLicenses,
  fetchItServices,
  fetchItWindows,
  fetchItSessions,
  fetchItTemplates,
  fetchItAccounts,
  fetchTicketDetail,
  updateTicketStatus,
  type ItTicket,
  type TicketDetail,
  type ItArticle,
  type ItAsset,
  type ItLicense,
  type ItService,
  type ItWindow,
  type ItSession,
  type ItTemplate,
  type ItAccount,
} from "@/lib/api/it";

export const itKeys = {
  all: ["it"] as const,
  tickets: ["it", "tickets"] as const,
  ticket: (id: string) => ["it", "tickets", id] as const,
  articles: ["it", "articles"] as const,
  assets: ["it", "assets"] as const,
  licenses: ["it", "licenses"] as const,
  services: ["it", "services"] as const,
  windows: ["it", "windows"] as const,
  sessions: ["it", "sessions"] as const,
  templates: ["it", "templates"] as const,
  accounts: ["it", "accounts"] as const,
};

function useIt<T>(key: readonly unknown[], fetchFn: (cursor?: string) => Promise<{ items: T[] }>) {
  return usePaginatedQuery<T>(key, fetchFn);
}

export function useItTickets() {
  return useIt<ItTicket>(itKeys.tickets, fetchItTickets);
}
export function useItTicketItems(): ItTicket[] {
  return flattenPages(useItTickets().data?.pages);
}

export function useTicketDetail(id: string) {
  return useQuery({
    queryKey: itKeys.ticket(id),
    queryFn: () => fetchTicketDetail(id),
  });
}

export function useItArticles() {
  return useIt<ItArticle>(itKeys.articles, fetchItArticles);
}
export function useItArticleItems(): ItArticle[] {
  return flattenPages(useItArticles().data?.pages);
}

export function useItAssets() {
  return useIt<ItAsset>(itKeys.assets, fetchItAssets);
}
export function useItAssetItems(): ItAsset[] {
  return flattenPages(useItAssets().data?.pages);
}

export function useItLicenses() {
  return useIt<ItLicense>(itKeys.licenses, fetchItLicenses);
}
export function useItLicenseItems(): ItLicense[] {
  return flattenPages(useItLicenses().data?.pages);
}

export function useItServices() {
  return useIt<ItService>(itKeys.services, fetchItServices);
}
export function useItServiceItems(): ItService[] {
  return flattenPages(useItServices().data?.pages);
}

export function useItWindows() {
  return useIt<ItWindow>(itKeys.windows, fetchItWindows);
}
export function useItWindowItems(): ItWindow[] {
  return flattenPages(useItWindows().data?.pages);
}

export function useItSessions() {
  return useIt<ItSession>(itKeys.sessions, fetchItSessions);
}
export function useItSessionItems(): ItSession[] {
  return flattenPages(useItSessions().data?.pages);
}

export function useItTemplates() {
  return useIt<ItTemplate>(itKeys.templates, fetchItTemplates);
}
export function useItTemplateItems(): ItTemplate[] {
  return flattenPages(useItTemplates().data?.pages);
}

export function useItAccounts() {
  return useIt<ItAccount>(itKeys.accounts, fetchItAccounts);
}
export function useItAccountItems(): ItAccount[] {
  return flattenPages(useItAccounts().data?.pages);
}

export function useUpdateTicketStatus(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: "queued" | "in-progress" | "resolved" | "closed") =>
      updateTicketStatus(id, status),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: itKeys.ticket(id) });
      void queryClient.invalidateQueries({ queryKey: itKeys.tickets });
    },
  });
}

export function useAddTicketEvent(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event: string) => addTicketEvent(id, event),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: itKeys.ticket(id) });
    },
  });
}
