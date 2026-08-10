import { apiFetch } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";

export interface ItTicket {
  id: string;
  subject: string;
  reporter: string;
  priority: string;
  sla: string;
  elapsed: string;
  status: string;
}

export interface TicketEvent {
  event: string;
  whenText: string;
}

export interface TicketDetail extends ItTicket {
  events: TicketEvent[];
}

export interface ItArticle {
  id: string;
  title: string;
  views: number;
  helpfulPct: number;
  category: string;
}

export interface ItAsset {
  id: string;
  name: string;
  assignedTo: string;
  category: string;
  status: string;
}

export interface ItLicense {
  id: string;
  product: string;
  seats: number;
  inUse: number;
  renews: string;
  status: string;
}

export interface ItService {
  id: string;
  name: string;
  uptime: string;
  latency: string;
  status: string;
}

export interface ItWindow {
  id: string;
  title: string;
  windowText: string;
  status: string;
}

export interface ItSession {
  id: string;
  name: string;
  detail: string;
  status: string;
}

export interface ItTemplate {
  id: string;
  title: string;
  uses: number;
  status: string;
}

export interface ItAccount {
  id: string;
  name: string;
  role: string;
  status: string;
}

function fetchPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchItTickets = fetchPage<ItTicket>("/v1/it/tickets");
export const fetchItArticles = fetchPage<ItArticle>("/v1/it/articles");
export const fetchItAssets = fetchPage<ItAsset>("/v1/it/assets");
export const fetchItLicenses = fetchPage<ItLicense>("/v1/it/licenses");
export const fetchItServices = fetchPage<ItService>("/v1/it/services");
export const fetchItWindows = fetchPage<ItWindow>("/v1/it/windows");
export const fetchItSessions = fetchPage<ItSession>("/v1/it/sessions");
export const fetchItTemplates = fetchPage<ItTemplate>("/v1/it/templates");
export const fetchItAccounts = fetchPage<ItAccount>("/v1/it/accounts");

export function fetchTicketDetail(id: string): Promise<TicketDetail> {
  return apiFetch<TicketDetail>(`/v1/it/tickets/${id}`);
}

export interface TicketStatusResult {
  ok: boolean;
  id: string;
  status: string;
}

export function updateTicketStatus(
  id: string,
  status: "queued" | "in-progress" | "resolved" | "closed",
): Promise<TicketStatusResult> {
  return apiFetch<TicketStatusResult>(`/v1/it/tickets/${id}`, {
    method: "PATCH",
    body: { status },
  });
}

export interface AddTicketEventResult {
  ok: boolean;
  id: string;
  event: string;
  whenText: string;
}

export function addTicketEvent(id: string, event: string): Promise<AddTicketEventResult> {
  return apiFetch<AddTicketEventResult>(`/v1/it/tickets/${id}/events`, {
    method: "POST",
    body: { event },
  });
}
