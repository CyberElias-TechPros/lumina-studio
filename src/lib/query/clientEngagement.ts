import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchCliTickets,
  fetchCliProposals,
  fetchCliDocuments,
  fetchCliContracts,
  fetchCliInvoices,
  fetchCliThreads,
  fetchCliMilestones,
  fetchCliTasks,
  type CliTicket,
  type CliProposal,
  type CliDocument,
  type CliContract,
  type CliInvoice,
  type CliThread,
  type CliMilestone,
  type CliTask,
} from "@/lib/api/clientEngagement";

export const cliKeys = {
  all: ["client-dashboard"] as const,
  tickets: ["client-dashboard", "tickets"] as const,
  proposals: ["client-dashboard", "proposals"] as const,
  documents: ["client-dashboard", "documents"] as const,
  contracts: ["client-dashboard", "contracts"] as const,
  invoices: ["client-dashboard", "invoices"] as const,
  threads: ["client-dashboard", "threads"] as const,
  milestones: ["client-dashboard", "milestones"] as const,
  tasks: ["client-dashboard", "tasks"] as const,
};

export function useCliTickets() {
  return usePaginatedQuery<CliTicket>(cliKeys.tickets, fetchCliTickets);
}
export function useCliTicketItems(): CliTicket[] {
  return flattenPages(useCliTickets().data?.pages);
}
export function useCliProposals() {
  return usePaginatedQuery<CliProposal>(cliKeys.proposals, fetchCliProposals);
}
export function useCliProposalItems(): CliProposal[] {
  return flattenPages(useCliProposals().data?.pages);
}
export function useCliDocuments() {
  return usePaginatedQuery<CliDocument>(cliKeys.documents, fetchCliDocuments);
}
export function useCliDocumentItems(): CliDocument[] {
  return flattenPages(useCliDocuments().data?.pages);
}
export function useCliContracts() {
  return usePaginatedQuery<CliContract>(cliKeys.contracts, fetchCliContracts);
}
export function useCliContractItems(): CliContract[] {
  return flattenPages(useCliContracts().data?.pages);
}
export function useCliInvoices() {
  return usePaginatedQuery<CliInvoice>(cliKeys.invoices, fetchCliInvoices);
}
export function useCliInvoiceItems(): CliInvoice[] {
  return flattenPages(useCliInvoices().data?.pages);
}
export function useCliThreads() {
  return usePaginatedQuery<CliThread>(cliKeys.threads, fetchCliThreads);
}
export function useCliThreadItems(): CliThread[] {
  return flattenPages(useCliThreads().data?.pages);
}
export function useCliMilestones() {
  return usePaginatedQuery<CliMilestone>(cliKeys.milestones, fetchCliMilestones);
}
export function useCliMilestoneItems(): CliMilestone[] {
  return flattenPages(useCliMilestones().data?.pages);
}
export function useCliTasks() {
  return usePaginatedQuery<CliTask>(cliKeys.tasks, fetchCliTasks);
}
export function useCliTaskItems(): CliTask[] {
  return flattenPages(useCliTasks().data?.pages);
}

export type {
  CliTicket,
  CliProposal,
  CliDocument,
  CliContract,
  CliInvoice,
  CliThread,
  CliMilestone,
  CliTask,
} from "@/lib/api/clientEngagement";
