import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchSupOrders,
  fetchSupDeliveries,
  fetchSupInvoices,
  fetchSupPerformance,
  fetchSupCerts,
  fetchSupConversations,
  fetchSupConversationDetail,
  sendSupConversationMessage,
  sendPtnConversationMessage,
  fetchPtnAgreements,
  fetchPtnCollaborations,
  fetchPtnReferrals,
  fetchPtnResources,
  fetchPtnReports,
  fetchPtnConversations,
  fetchPtnConversationDetail,
  type SupOrder,
  type SupDelivery,
  type SupInvoice,
  type SupPerformance,
  type SupCert,
  type SupConversation,
  type SupConversationDetail,
  type PtnAgreement,
  type PtnCollaboration,
  type PtnReferral,
  type PtnResource,
  type PtnReport,
  type PtnConversation,
  type PtnConversationDetail,
} from "@/lib/api/supplierPartner";

export const supKeys = {
  all: ["supplier-dashboard"] as const,
  orders: ["supplier-dashboard", "orders"] as const,
  deliveries: ["supplier-dashboard", "deliveries"] as const,
  invoices: ["supplier-dashboard", "invoices"] as const,
  performance: ["supplier-dashboard", "performance"] as const,
  certs: ["supplier-dashboard", "certs"] as const,
  conversations: ["supplier-dashboard", "conversations"] as const,
  conversation: (id: string) => ["supplier-dashboard", "conversations", id] as const,
};

export const ptnKeys = {
  all: ["partner-dashboard"] as const,
  agreements: ["partner-dashboard", "agreements"] as const,
  collaborations: ["partner-dashboard", "collaborations"] as const,
  referrals: ["partner-dashboard", "referrals"] as const,
  resources: ["partner-dashboard", "resources"] as const,
  reports: ["partner-dashboard", "reports"] as const,
  conversations: ["partner-dashboard", "conversations"] as const,
  conversation: (id: string) => ["partner-dashboard", "conversations", id] as const,
};

function useSup<T>(key: readonly unknown[], fetchFn: (cursor?: string) => Promise<{ items: T[] }>) {
  return usePaginatedQuery<T>(key, fetchFn);
}

function usePtn<T>(key: readonly unknown[], fetchFn: (cursor?: string) => Promise<{ items: T[] }>) {
  return usePaginatedQuery<T>(key, fetchFn);
}

export function useSupOrders() {
  return useSup<SupOrder>(supKeys.orders, fetchSupOrders);
}
export function useSupOrderItems(): SupOrder[] {
  return flattenPages(useSupOrders().data?.pages);
}

export function useSupDeliveries() {
  return useSup<SupDelivery>(supKeys.deliveries, fetchSupDeliveries);
}
export function useSupDeliveryItems(): SupDelivery[] {
  return flattenPages(useSupDeliveries().data?.pages);
}

export function useSupInvoices() {
  return useSup<SupInvoice>(supKeys.invoices, fetchSupInvoices);
}
export function useSupInvoiceItems(): SupInvoice[] {
  return flattenPages(useSupInvoices().data?.pages);
}

export function useSupPerformance() {
  return useSup<SupPerformance>(supKeys.performance, fetchSupPerformance);
}
export function useSupPerformanceItems(): SupPerformance[] {
  return flattenPages(useSupPerformance().data?.pages);
}

export function useSupCerts() {
  return useSup<SupCert>(supKeys.certs, fetchSupCerts);
}
export function useSupCertItems(): SupCert[] {
  return flattenPages(useSupCerts().data?.pages);
}

export function useSupConversations() {
  return useSup<SupConversation>(supKeys.conversations, fetchSupConversations);
}
export function useSupConversationItems(): SupConversation[] {
  return flattenPages(useSupConversations().data?.pages);
}

export function useSupConversationDetail(id: string) {
  return useQuery({
    queryKey: supKeys.conversation(id),
    queryFn: () => fetchSupConversationDetail(id),
    enabled: Boolean(id),
  });
}

export function useSendSupConversationMessage(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: string) => sendSupConversationMessage(id, body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: supKeys.conversation(id) });
      void queryClient.invalidateQueries({ queryKey: supKeys.conversations });
    },
  });
}

export function usePtnAgreements() {
  return usePtn<PtnAgreement>(ptnKeys.agreements, fetchPtnAgreements);
}
export function usePtnAgreementItems(): PtnAgreement[] {
  return flattenPages(usePtnAgreements().data?.pages);
}

export function usePtnCollaborations() {
  return usePtn<PtnCollaboration>(ptnKeys.collaborations, fetchPtnCollaborations);
}
export function usePtnCollaborationItems(): PtnCollaboration[] {
  return flattenPages(usePtnCollaborations().data?.pages);
}

export function usePtnReferrals() {
  return usePtn<PtnReferral>(ptnKeys.referrals, fetchPtnReferrals);
}
export function usePtnReferralItems(): PtnReferral[] {
  return flattenPages(usePtnReferrals().data?.pages);
}

export function usePtnResources() {
  return usePtn<PtnResource>(ptnKeys.resources, fetchPtnResources);
}
export function usePtnResourceItems(): PtnResource[] {
  return flattenPages(usePtnResources().data?.pages);
}

export function usePtnReports() {
  return usePtn<PtnReport>(ptnKeys.reports, fetchPtnReports);
}
export function usePtnReportItems(): PtnReport[] {
  return flattenPages(usePtnReports().data?.pages);
}

export function usePtnConversations() {
  return usePtn<PtnConversation>(ptnKeys.conversations, fetchPtnConversations);
}
export function usePtnConversationItems(): PtnConversation[] {
  return flattenPages(usePtnConversations().data?.pages);
}

export function usePtnConversationDetail(id: string) {
  return useQuery({
    queryKey: ptnKeys.conversation(id),
    queryFn: () => fetchPtnConversationDetail(id),
    enabled: Boolean(id),
  });
}

export function useSendPtnConversationMessage(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: string) => sendPtnConversationMessage(id, body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ptnKeys.conversation(id) });
      void queryClient.invalidateQueries({ queryKey: ptnKeys.conversations });
    },
  });
}

export type {
  SupOrder,
  SupDelivery,
  SupInvoice,
  SupPerformance,
  SupCert,
  SupConversation,
  SupConversationDetail,
  PtnAgreement,
  PtnCollaboration,
  PtnReferral,
  PtnResource,
  PtnReport,
  PtnConversation,
  PtnConversationDetail,
} from "@/lib/api/supplierPartner";
