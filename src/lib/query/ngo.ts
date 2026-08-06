import { usePaginatedQuery, flattenPages } from "@/lib/query/hooks";
import {
  fetchNgoOverview,
  fetchNgoFunds,
  fetchNgoPrograms,
  fetchNgoExpenses,
  fetchNgoTeams,
  fetchNgoTransactions,
  fetchNgoReports,
  fetchNgoMetrics,
  fetchNgoThreads,
  type NgoKpi,
  type NgoFund,
  type NgoProgram,
  type NgoExpenseLine,
  type NgoTeam,
  type NgoTransaction,
  type NgoReport,
  type NgoMetric,
  type NgoThread,
} from "@/lib/api/ngo";

export const ngoKeys = {
  all: ["ngo-dashboard"] as const,
  overview: ["ngo-dashboard", "overview"] as const,
  funds: ["ngo-dashboard", "funds"] as const,
  programs: ["ngo-dashboard", "programs"] as const,
  expenses: ["ngo-dashboard", "expenses"] as const,
  teams: ["ngo-dashboard", "teams"] as const,
  transactions: ["ngo-dashboard", "transactions"] as const,
  reports: ["ngo-dashboard", "reports"] as const,
  metrics: ["ngo-dashboard", "metrics"] as const,
  threads: ["ngo-dashboard", "threads"] as const,
};

export function useNgoOverview() {
  return usePaginatedQuery<NgoKpi>(ngoKeys.overview, fetchNgoOverview);
}
export function useNgoOverviewItems(): NgoKpi[] {
  return flattenPages(useNgoOverview().data?.pages);
}
export function useNgoFunds() {
  return usePaginatedQuery<NgoFund>(ngoKeys.funds, fetchNgoFunds);
}
export function useNgoFundItems(): NgoFund[] {
  return flattenPages(useNgoFunds().data?.pages);
}
export function useNgoPrograms() {
  return usePaginatedQuery<NgoProgram>(ngoKeys.programs, fetchNgoPrograms);
}
export function useNgoProgramItems(): NgoProgram[] {
  return flattenPages(useNgoPrograms().data?.pages);
}
export function useNgoExpenses() {
  return usePaginatedQuery<NgoExpenseLine>(ngoKeys.expenses, fetchNgoExpenses);
}
export function useNgoExpenseItems(): NgoExpenseLine[] {
  return flattenPages(useNgoExpenses().data?.pages);
}
export function useNgoTeams() {
  return usePaginatedQuery<NgoTeam>(ngoKeys.teams, fetchNgoTeams);
}
export function useNgoTeamItems(): NgoTeam[] {
  return flattenPages(useNgoTeams().data?.pages);
}
export function useNgoTransactions() {
  return usePaginatedQuery<NgoTransaction>(ngoKeys.transactions, fetchNgoTransactions);
}
export function useNgoTransactionItems(): NgoTransaction[] {
  return flattenPages(useNgoTransactions().data?.pages);
}
export function useNgoReports() {
  return usePaginatedQuery<NgoReport>(ngoKeys.reports, fetchNgoReports);
}
export function useNgoReportItems(): NgoReport[] {
  return flattenPages(useNgoReports().data?.pages);
}
export function useNgoMetrics() {
  return usePaginatedQuery<NgoMetric>(ngoKeys.metrics, fetchNgoMetrics);
}
export function useNgoMetricItems(): NgoMetric[] {
  return flattenPages(useNgoMetrics().data?.pages);
}
export function useNgoThreads() {
  return usePaginatedQuery<NgoThread>(ngoKeys.threads, fetchNgoThreads);
}
export function useNgoThreadItems(): NgoThread[] {
  return flattenPages(useNgoThreads().data?.pages);
}

export type {
  NgoKpi,
  NgoFund,
  NgoProgram,
  NgoExpenseLine,
  NgoTeam,
  NgoTransaction,
  NgoReport,
  NgoMetric,
  NgoThread,
} from "@/lib/api/ngo";
