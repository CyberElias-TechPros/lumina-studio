import { apiFetch } from "./client";
import type { Paginated } from "./types";

export interface CliTicket {
  id: string;
  title: string;
  reference: string;
  dateLabel: string;
  sla: string;
  status: string;
}

export interface CliProposal {
  id: string;
  title: string;
  amount: string;
  scope: string;
  status: string;
}

export interface CliDocument {
  id: string;
  title: string;
  type: string;
  size: string;
  updated: string;
  status: string;
}

export interface CliContract {
  id: string;
  name: string;
  reference: string;
  amount: string;
  dateLabel: string;
  status: string;
}

export interface CliInvoice {
  id: string;
  title: string;
  reference: string;
  amount: string;
  status: string;
}

export interface CliThread {
  id: string;
  title: string;
  fromLabel: string;
  timeLabel: string;
  status: string;
}

export interface CliMilestone {
  id: string;
  title: string;
  dateLabel: string;
  status: string;
}

export interface CliTask {
  id: string;
  title: string;
  kind: string;
  detail: string;
  status: string;
}

function cliPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchCliTickets = cliPage<CliTicket>("/v1/client-dashboard/tickets");
export const fetchCliProposals = cliPage<CliProposal>("/v1/client-dashboard/proposals");
export const fetchCliDocuments = cliPage<CliDocument>("/v1/client-dashboard/documents");
export const fetchCliContracts = cliPage<CliContract>("/v1/client-dashboard/contracts");
export const fetchCliInvoices = cliPage<CliInvoice>("/v1/client-dashboard/invoices");
export const fetchCliThreads = cliPage<CliThread>("/v1/client-dashboard/threads");
export const fetchCliMilestones = cliPage<CliMilestone>("/v1/client-dashboard/milestones");
export const fetchCliTasks = cliPage<CliTask>("/v1/client-dashboard/tasks");
