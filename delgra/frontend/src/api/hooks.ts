import { useMutation, useQuery, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { apiFetch, qs } from "./client.ts";
import type {
  AuditRow,
  BusinessProfile,
  Customer,
  Dashboard,
  DocumentRow,
  EntityType,
  Expense,
  Invoice,
  InvoiceItem,
  ListResponse,
  Payment,
  Product,
  Purchase,
  SessionUser,
  Supplier,
  UserRow,
  Waybill,
  WaybillItem,
} from "./types.ts";

export const keys = {
  session: ["session"] as const,
  business: ["business"] as const,
  dashboard: ["dashboard"] as const,
  customers: (params?: unknown) => ["customers", params] as const,
  customer: (id: string) => ["customer", id] as const,
  products: (params?: unknown) => ["products", params] as const,
  product: (id: string) => ["product", id] as const,
  invoices: (params?: unknown) => ["invoices", params] as const,
  invoice: (id: string) => ["invoice", id] as const,
  waybills: (params?: unknown) => ["waybills", params] as const,
  waybill: (id: string) => ["waybill", id] as const,
  suppliers: (params?: unknown) => ["suppliers", params] as const,
  supplier: (id: string) => ["supplier", id] as const,
  purchases: (params?: unknown) => ["purchases", params] as const,
  purchase: (id: string) => ["purchase", id] as const,
  expenses: (params?: unknown) => ["expenses", params] as const,
  reports: (name: string, params?: unknown) => ["reports", name, params] as const,
  users: ["users"] as const,
  audit: (params?: unknown) => ["audit", params] as const,
};

type ListParams = Record<string, unknown>;

const defaultOptions = {
  staleTime: 20_000,
  refetchOnWindowFocus: false,
  retry: (failureCount: number, error: unknown) => {
    // Never retry an auth or validation failure — it will fail identically.
    const status = (error as { status?: number })?.status;
    if (status && status >= 400 && status < 500) return false;
    return failureCount < 2;
  },
} satisfies Partial<UseQueryOptions>;

/* ------------------------------------------------------------------ session */

export function useSession() {
  return useQuery({
    queryKey: keys.session,
    queryFn: () => apiFetch<{ user: SessionUser }>("/auth/session"),
    retry: false,
    staleTime: 60_000,
  });
}

export function useBusiness() {
  return useQuery({
    queryKey: keys.business,
    queryFn: () => apiFetch<{ business: BusinessProfile }>("/settings/business"),
    ...defaultOptions,
  });
}

export function useDashboard() {
  return useQuery({
    queryKey: keys.dashboard,
    queryFn: () => apiFetch<Dashboard>("/dashboard"),
    ...defaultOptions,
  });
}

/* ---------------------------------------------------------------- customers */

export function useCustomers(params: ListParams = {}) {
  return useQuery({
    queryKey: keys.customers(params),
    queryFn: () => apiFetch<ListResponse<Customer>>(`/customers${qs(params)}`),
    ...defaultOptions,
  });
}

export function useCustomer(id: string) {
  return useQuery({
    queryKey: keys.customer(id),
    queryFn: () => apiFetch<{ customer: Customer; invoices: unknown[]; waybills: unknown[] }>(`/customers/${id}`),
    enabled: Boolean(id),
    ...defaultOptions,
  });
}

/* ----------------------------------------------------------------- products */

export function useProducts(params: ListParams = {}) {
  return useQuery({
    queryKey: keys.products(params),
    queryFn: () => apiFetch<ListResponse<Product>>(`/products${qs(params)}`),
    ...defaultOptions,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: keys.product(id),
    queryFn: () => apiFetch<{ product: Product; movements: unknown[] }>(`/products/${id}`),
    enabled: Boolean(id),
    ...defaultOptions,
  });
}

/* ----------------------------------------------------------------- invoices */

export function useInvoices(params: ListParams = {}) {
  return useQuery({
    queryKey: keys.invoices(params),
    queryFn: () => apiFetch<ListResponse<Invoice>>(`/invoices${qs(params)}`),
    ...defaultOptions,
  });
}

export interface InvoiceDetail {
  invoice: Invoice;
  items: InvoiceItem[];
  payments: Payment[];
  waybills: Array<{ id: string; number: string; waybillDate: string; status: string; carrier: string | null; trackingNumber: string | null }>;
  customer: Record<string, unknown> | null;
}

export function useInvoice(id: string) {
  return useQuery({
    queryKey: keys.invoice(id),
    queryFn: () => apiFetch<InvoiceDetail>(`/invoices/${id}`),
    enabled: Boolean(id),
    ...defaultOptions,
  });
}

/* ----------------------------------------------------------------- waybills */

export function useWaybills(params: ListParams = {}) {
  return useQuery({
    queryKey: keys.waybills(params),
    queryFn: () => apiFetch<ListResponse<Waybill>>(`/waybills${qs(params)}`),
    ...defaultOptions,
  });
}

export function useWaybill(id: string) {
  return useQuery({
    queryKey: ["waybill", id] as const,
    queryFn: () => apiFetch<{ waybill: Waybill; items: WaybillItem[] }>(`/waybills/${id}`),
    enabled: Boolean(id),
    ...defaultOptions,
  });
}

/* ---------------------------------------------------------------- documents */

export function useDocuments(entityType: EntityType, entityId: string) {
  return useQuery({
    queryKey: ["documents", entityType, entityId] as const,
    queryFn: () =>
      apiFetch<{ data: DocumentRow[] }>(`/documents${qs({ entityType, entityId })}`),
    enabled: Boolean(entityId),
    ...defaultOptions,
  });
}

/* ------------------------------------------------- suppliers and purchases */

export function useSuppliers(params: ListParams = {}) {
  return useQuery({
    queryKey: keys.suppliers(params),
    queryFn: () => apiFetch<ListResponse<Supplier>>(`/suppliers${qs(params)}`),
    ...defaultOptions,
  });
}

export function usePurchases(params: ListParams = {}) {
  return useQuery({
    queryKey: keys.purchases(params),
    queryFn: () => apiFetch<ListResponse<Purchase>>(`/purchases${qs(params)}`),
    ...defaultOptions,
  });
}

export function usePurchase(id: string) {
  return useQuery({
    queryKey: keys.purchase(id),
    queryFn: () => apiFetch<{ purchase: Purchase; items: unknown[]; payments: unknown[] }>(`/purchases/${id}`),
    enabled: Boolean(id),
    ...defaultOptions,
  });
}

/* ----------------------------------------------------------------- expenses */

export function useExpenses(params: ListParams = {}) {
  return useQuery({
    queryKey: keys.expenses(params),
    queryFn: () =>
      apiFetch<ListResponse<Expense> & { totals: { amount: number } }>(`/expenses${qs(params)}`),
    ...defaultOptions,
  });
}

export function useExpenseCategories() {
  return useQuery({
    queryKey: ["expense-categories"] as const,
    queryFn: () => apiFetch<{ categories: Array<{ name: string; count: number; total: number }> }>("/expenses/categories"),
    ...defaultOptions,
  });
}

/* ------------------------------------------------------------------ reports */

export function useProfitLoss(range: { from: string; to: string }) {
  return useQuery({
    queryKey: keys.reports("profit-loss", range),
    queryFn: () => apiFetch<Record<string, any>>(`/reports/profit-loss${qs(range)}`),
    ...defaultOptions,
  });
}

export function useMonthly(range: { from: string; to: string }) {
  return useQuery({
    queryKey: keys.reports("monthly", range),
    queryFn: () => apiFetch<{ series: any[] }>(`/reports/monthly${qs(range)}`),
    ...defaultOptions,
  });
}

export function useReceivables() {
  return useQuery({
    queryKey: keys.reports("receivables"),
    queryFn: () => apiFetch<{ rows: any[]; totals: Record<string, number> }>("/reports/receivables"),
    ...defaultOptions,
  });
}

export function useTopCustomers(range: { from: string; to: string }) {
  return useQuery({
    queryKey: keys.reports("top-customers", range),
    queryFn: () => apiFetch<{ rows: any[] }>(`/reports/top-customers${qs(range)}`),
    ...defaultOptions,
  });
}

export function useStockReport() {
  return useQuery({
    queryKey: keys.reports("stock"),
    queryFn: () => apiFetch<{ rows: any[]; totals: Record<string, number> }>("/reports/stock"),
    ...defaultOptions,
  });
}

export function useLogistics(range: { from: string; to: string }) {
  return useQuery({
    queryKey: keys.reports("logistics", range),
    queryFn: () => apiFetch<{ rows: any[] }>(`/reports/logistics${qs(range)}`),
    ...defaultOptions,
  });
}

/* ------------------------------------------------------------- admin views */

export function useUsers() {
  return useQuery({
    queryKey: keys.users,
    queryFn: () => apiFetch<ListResponse<UserRow>>("/users"),
    ...defaultOptions,
  });
}

export function useAudit(params: ListParams = {}) {
  return useQuery({
    queryKey: keys.audit(params),
    queryFn: () => apiFetch<ListResponse<AuditRow>>(`/audit${qs(params)}`),
    ...defaultOptions,
  });
}

/* -------------------------------------------------------------- mutations */

/**
 * One mutation factory. It invalidates a caller-supplied set of keys and, for
 * writes, generates an idempotency key so a double-clicked submit cannot create
 * two invoices if the response is lost.
 */
export function useApiMutation<TBody, TResult>(options: {
  path: string | ((body: TBody) => string);
  method?: "POST" | "PATCH" | "DELETE";
  invalidate: unknown[][];
  idempotent?: boolean;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: TBody) =>
      apiFetch<TResult>(typeof options.path === "function" ? options.path(body) : options.path, {
        method: options.method ?? "POST",
        body,
        idempotencyKey: options.idempotent ? crypto.randomUUID() : undefined,
      }),
    onSuccess: () => {
      for (const key of options.invalidate) {
        void queryClient.invalidateQueries({ queryKey: key });
      }
    },
  });
}

export const invalidateAll: unknown[][] = [
  ["customers"],
  ["customer"],
  ["products"],
  ["product"],
  ["invoices"],
  ["invoice"],
  ["waybills"],
  ["waybill"],
  ["suppliers"],
  ["purchases"],
  ["purchase"],
  ["expenses"],
  ["reports"],
  ["dashboard"],
  ["documents"],
  ["users"],
  ["audit"],
  ["business"],
];
