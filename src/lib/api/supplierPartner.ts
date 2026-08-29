import { apiFetch } from "./client";
import type { Paginated } from "./types";

export interface SupOrder {
  id: string;
  ref: string;
  items: string;
  amount: number;
  dueLabel: string;
  status: string;
}

export interface SupDelivery {
  id: string;
  poLabel: string;
  whenLabel: string;
  toLabel: string;
  status: string;
}

export interface SupInvoice {
  id: string;
  ref: string;
  amount: number;
  issuedLabel: string;
  paidLabel: string;
  status: string;
}

export interface SupPerformance {
  id: string;
  metric: string;
  valueLabel: string;
}

export interface SupCert {
  id: string;
  title: string;
  detail: string;
  verified: number;
}

export interface SupConversation {
  id: string;
  name: string;
  preview: string;
  timeLabel: string;
  unread: number;
}

export interface SupThreadMessage {
  id: string;
  fromLabel: string;
  body: string;
  timeLabel: string;
}

export interface SupConversationDetail extends SupConversation {
  thread: SupThreadMessage[];
}

export interface PtnAgreement {
  id: string;
  title: string;
  detail: string;
  status: string;
  renewLabel: string;
}

export interface PtnCollaboration {
  id: string;
  title: string;
  detail: string;
  status: string;
}

export interface PtnReferral {
  id: string;
  name: string;
  status: string;
  valueLabel: string;
}

export interface PtnResource {
  id: string;
  title: string;
  kind: string;
  detail: string;
}

export interface PtnReport {
  id: string;
  title: string;
  detail: string;
  kind: string;
  valueLabel: string;
}

export interface PtnConversation {
  id: string;
  name: string;
  preview: string;
  timeLabel: string;
  unread: number;
}

export interface PtnThreadMessage {
  id: string;
  fromLabel: string;
  body: string;
  timeLabel: string;
}

export interface PtnConversationDetail extends PtnConversation {
  thread: PtnThreadMessage[];
}

function supPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchSupOrders = supPage<SupOrder>("/v1/supplier-dashboard/orders");
export const fetchSupDeliveries = supPage<SupDelivery>("/v1/supplier-dashboard/deliveries");
export const fetchSupInvoices = supPage<SupInvoice>("/v1/supplier-dashboard/invoices");
export const fetchSupPerformance = supPage<SupPerformance>("/v1/supplier-dashboard/performance");
export const fetchSupCerts = supPage<SupCert>("/v1/supplier-dashboard/certs");
export const fetchSupConversations = supPage<SupConversation>(
  "/v1/supplier-dashboard/conversations",
);

export const fetchSupConversationDetail = (id: string): Promise<SupConversationDetail> =>
  apiFetch<SupConversationDetail>(`/v1/supplier-dashboard/conversations/${id}`);

export function sendSupConversationMessage(id: string, body: string): Promise<SupThreadMessage> {
  return apiFetch<SupThreadMessage>(`/v1/supplier-dashboard/conversations/${id}/messages`, {
    method: "POST",
    body: { body },
  });
}

export const fetchPtnAgreements = supPage<PtnAgreement>("/v1/partner-dashboard/agreements");
export const fetchPtnCollaborations = supPage<PtnCollaboration>(
  "/v1/partner-dashboard/collaborations",
);
export const fetchPtnReferrals = supPage<PtnReferral>("/v1/partner-dashboard/referrals");
export const fetchPtnResources = supPage<PtnResource>("/v1/partner-dashboard/resources");
export const fetchPtnReports = supPage<PtnReport>("/v1/partner-dashboard/reports");
export const fetchPtnConversations = supPage<PtnConversation>(
  "/v1/partner-dashboard/conversations",
);

export const fetchPtnConversationDetail = (id: string): Promise<PtnConversationDetail> =>
  apiFetch<PtnConversationDetail>(`/v1/partner-dashboard/conversations/${id}`);

export function sendPtnConversationMessage(id: string, body: string): Promise<PtnThreadMessage> {
  return apiFetch<PtnThreadMessage>(`/v1/partner-dashboard/conversations/${id}/messages`, {
    method: "POST",
    body: { body },
  });
}
