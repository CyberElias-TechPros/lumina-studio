import { Search } from "lucide-react";
import { PageHeader } from "../components/Layout.tsx";
import { Card, EmptyState, ErrorState, Input, Select, Spinner, Table, Td } from "../components/ui.tsx";
import { useAudit } from "../api/hooks.ts";
import { formatDateTime, titleCase } from "../lib/money.ts";
import { useListFilters } from "../lib/filters.ts";
import { Pagination } from "./Invoices.tsx";

const ENTITY_TYPES = ["", "invoice", "waybill", "customer", "product", "purchase", "expense", "user", "document", "business"];

export function AuditPage() {
  const { filters, setFilter, page, limit, setPage } = useListFilters({ q: "", entityType: "" });
  const { data, isLoading, error, refetch } = useAudit({ q: filters.q, entityType: filters.entityType, page, limit });

  return (
    <>
      <PageHeader title="Audit log" description="Who changed what, and when. Nothing here can be edited." />
      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-ink-200 p-3">
          <div className="relative min-w-56 flex-1">
            <Search className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-ink-400" aria-hidden />
            <Input value={filters.q ?? ""} onChange={(e) => setFilter("q", e.target.value)}
              placeholder="Search summary or action…" aria-label="Search audit log" className="pl-9" />
          </div>
          <Select value={filters.entityType ?? ""} onChange={(e) => setFilter("entityType", e.target.value)} aria-label="Filter by record type" className="w-44">
            {ENTITY_TYPES.map((t) => (<option key={t} value={t}>{t ? titleCase(t) : "All record types"}</option>))}
          </Select>
        </div>

        {isLoading ? <Spinner label="Loading audit log" /> : error ? (
          <ErrorState error={error} onRetry={() => void refetch()} />
        ) : (data?.data.length ?? 0) === 0 ? (
          <EmptyState title="Nothing recorded yet" description="Actions appear here as the workspace is used." />
        ) : (
          <>
            <Table head={["When", "Who", "Action", "Record", "Summary", "IP"]}>
              {data!.data.map((entry) => (
                <tr key={entry.id}>
                  <Td className="text-ink-600 whitespace-nowrap">{formatDateTime(entry.createdAt)}</Td>
                  <Td className="font-medium">{entry.actorName}</Td>
                  <Td><code className="rounded bg-ink-100 px-1.5 py-0.5 text-xs">{entry.action}</code></Td>
                  <Td className="text-ink-600">{entry.entityType ? titleCase(entry.entityType) : "—"}</Td>
                  <Td className="text-ink-600">{entry.summary ?? "—"}</Td>
                  <Td className="font-mono text-xs text-ink-400">{entry.ip ?? "—"}</Td>
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
