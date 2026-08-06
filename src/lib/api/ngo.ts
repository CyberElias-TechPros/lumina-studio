import { apiFetch } from "./client";
import type { Paginated } from "./types";

export interface NgoKpi {
  id: string;
  metric: string;
  valueLabel: string;
  delta: string;
}

export interface NgoFund {
  id: string;
  name: string;
  scholars: string;
  amount: string;
  status: string;
}

export interface NgoProgram {
  id: string;
  name: string;
  location: string;
  beneficiaries: string;
  status: string;
}

export interface NgoExpenseLine {
  id: string;
  title: string;
  amount: string;
  pct: string;
  status: string;
}

export interface NgoTeam {
  id: string;
  name: string;
  volunteers: number;
  slots: string;
  status: string;
}

export interface NgoTransaction {
  id: string;
  title: string;
  amount: string;
  dateLabel: string;
  status: string;
}

export interface NgoReport {
  id: string;
  title: string;
  detail: string;
  status: string;
}

export interface NgoMetric {
  id: string;
  label: string;
  value: string;
  delta: string;
}

export interface NgoThread {
  id: string;
  title: string;
  fromLabel: string;
  timeLabel: string;
  status: string;
}

function ngoPage<T>(path: string) {
  return (cursor?: string): Promise<Paginated<T>> =>
    apiFetch<Paginated<T>>(path, { query: { cursor } });
}

export const fetchNgoOverview = ngoPage<NgoKpi>("/v1/ngo-dashboard/overview");
export const fetchNgoFunds = ngoPage<NgoFund>("/v1/ngo-dashboard/funds");
export const fetchNgoPrograms = ngoPage<NgoProgram>("/v1/ngo-dashboard/programs");
export const fetchNgoExpenses = ngoPage<NgoExpenseLine>("/v1/ngo-dashboard/expenses");
export const fetchNgoTeams = ngoPage<NgoTeam>("/v1/ngo-dashboard/teams");
export const fetchNgoTransactions = ngoPage<NgoTransaction>("/v1/ngo-dashboard/transactions");
export const fetchNgoReports = ngoPage<NgoReport>("/v1/ngo-dashboard/reports");
export const fetchNgoMetrics = ngoPage<NgoMetric>("/v1/ngo-dashboard/metrics");
export const fetchNgoThreads = ngoPage<NgoThread>("/v1/ngo-dashboard/threads");
