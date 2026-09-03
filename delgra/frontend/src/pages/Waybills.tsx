import { Link } from "react-router-dom";
import { PageHeader } from "../components/Layout.tsx";
import { Badge, Card, EmptyState, ErrorState, Input, Select, Spinner, Table, Td, statusTone } from "../components/ui.tsx";
import { useWaybills } from "../api/hooks.ts";
import { formatDate, titleCase } from "../lib/money.ts";
import { useListFilters } from "../lib/filters.ts";
import { Pagination } from "./Invoices.tsx";

const STATUSES = ["", "pending", "in_transit", "delivered", "exception", "cancelled"];

export function WaybillsPage() {
  const { filters, setFilter, page, limit, setPage } = useListFilters({ q: "", status: "" });
  const { data, isLoading, error, refetch } = useWaybills({ q: filters.q, status: filters.status, page, limit });

  return (
    <>
      <PageHeader title="Waybills" description="Track every consignment from dispatch to delivery." />
      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-ink-200 p-3">
          <Input
            value={filters.q ?? ""}
            onChange={(e) => setFilter("q", e.target.value)}
            placeholder="Search number, customer or carrier…"
            aria-label="Search waybills"
            className="min-w-56 flex-1"
          />
          <Select value={filters.status ?? ""} onChange={(e) => setFilter("status", e.target.value)} aria-label="Filter by status" className="w-40">
            {STATUSES.map((s) => (<option key={s} value={s}>{s ? titleCase(s) : "All statuses"}</option>))}
          </Select>
        </div>
        {isLoading ? <Spinner label="Loading waybills" /> : error ? (
          <ErrorState error={error} onRetry={() => void refetch()} />
        ) : (data?.data.length ?? 0) === 0 ? (
          <EmptyState title="No waybills yet" description="Waybills are created from an invoice once its goods are ready to ship." />
        ) : (
          <>
            <Table head={["Waybill", "Customer", "Carrier", "Dated", "Delivered", "Pieces", "Invoice", "Status"]}>
              {data!.data.map((w) => (
                <tr key={w.id} className="hover:bg-ink-50">
                  <Td className="font-mono text-xs">
                    <Link to={`/waybills/${w.id}`} className="text-brand-700 hover:underline">{w.number}</Link>
                  </Td>
                  <Td>{w.customerName}</Td>
                  <Td className="text-ink-600">{w.carrier || "—"}</Td>
                  <Td className="text-ink-600 whitespace-nowrap">{formatDate(w.waybillDate)}</Td>
                  <Td className="text-ink-600 whitespace-nowrap">{formatDate(w.deliveredAt)}</Td>
                  <Td className="tnum">{w.pieces}</Td>
                  <Td className="font-mono text-xs">{w.invoiceNumber ?? "—"}</Td>
                  <Td><Badge tone={statusTone(w.status)}>{titleCase(w.status)}</Badge></Td>
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
