import { PageHeader } from "../components/Layout.tsx";
import { Badge, Card, EmptyState, ErrorState, Input, Select, Spinner, Table, Td, statusTone } from "../components/ui.tsx";
import { useBusiness, usePurchases } from "../api/hooks.ts";
import { formatDate, formatMoney, titleCase } from "../lib/money.ts";
import { useListFilters } from "../lib/filters.ts";
import { Pagination } from "./Invoices.tsx";

const STATUSES = ["", "draft", "ordered", "received", "paid", "cancelled"];

export function PurchasesPage() {
  const { filters, setFilter, page, limit, setPage } = useListFilters({ q: "", status: "" });
  const { data, isLoading, error, refetch } = usePurchases({ q: filters.q, status: filters.status, page, limit });
  const { data: businessData } = useBusiness();
  const symbol = businessData?.business.currencySymbol ?? "₦";

  return (
    <>
      <PageHeader title="Purchases" description="What you bought in, and what you still owe suppliers." />
      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-ink-200 p-3">
          <Input value={filters.q ?? ""} onChange={(e) => setFilter("q", e.target.value)}
            placeholder="Search number or supplier…" aria-label="Search purchases" className="min-w-56 flex-1" />
          <Select value={filters.status ?? ""} onChange={(e) => setFilter("status", e.target.value)} aria-label="Filter by status" className="w-40">
            {STATUSES.map((s) => (<option key={s} value={s}>{s ? titleCase(s) : "All statuses"}</option>))}
          </Select>
        </div>

        {isLoading ? <Spinner label="Loading purchases" /> : error ? (
          <ErrorState error={error} onRetry={() => void refetch()} />
        ) : (data?.data.length ?? 0) === 0 ? (
          <EmptyState title="No purchases recorded" description="Record what you buy so cost of goods and payables stay accurate." />
        ) : (
          <>
            <Table head={["Number", "Supplier", "Ordered", "Due", "Total", "Balance", "Status"]}>
              {data!.data.map((purchase) => (
                <tr key={purchase.id} className="hover:bg-ink-50">
                  <Td className="font-mono text-xs">{purchase.number}</Td>
                  <Td>{purchase.supplierName ?? "—"}</Td>
                  <Td className="text-ink-600 whitespace-nowrap">{formatDate(purchase.orderDate)}</Td>
                  <Td className="text-ink-600 whitespace-nowrap">{formatDate(purchase.dueDate)}</Td>
                  <Td className="tnum">{formatMoney(purchase.total, symbol)}</Td>
                  <Td className={`tnum ${purchase.balance > 0 ? "font-semibold" : "text-ink-500"}`}>{formatMoney(purchase.balance, symbol)}</Td>
                  <Td><Badge tone={statusTone(purchase.status)}>{titleCase(purchase.status)}</Badge></Td>
                </tr>
              ))}
            </Table>
            <Pagination page={data!.meta.page} totalPages={data!.meta.totalPages} total={data!.meta.total} onPage={setPage} />
          </>
        )}
      </Card>
    </>
  );
}
