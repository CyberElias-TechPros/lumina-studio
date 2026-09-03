import { useState } from "react";
import { Link } from "react-router-dom";
import { FilePlus2, Search } from "lucide-react";
import { PageHeader } from "../components/Layout.tsx";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  ErrorState,
  Input,
  Select,
  Spinner,
  Table,
  Td,
  statusTone,
  useToast,
} from "../components/ui.tsx";
import { invalidateAll, useApiMutation, useBusiness, useInvoices } from "../api/hooks.ts";
import { formatDate, formatMoney, koboToInput, parseAmountToKobo, titleCase } from "../lib/money.ts";
import { useListFilters } from "../lib/filters.ts";

const STATUSES = ["", "draft", "sent", "partial", "paid", "overdue", "void"];

export function InvoicesPage() {
  const { filters, setFilter, page, limit, setPage } = useListFilters({ q: "", status: "" });
  const { data, isLoading, error, refetch, isFetching } = useInvoices({
    q: filters.q,
    status: filters.status,
    page,
    limit,
  });
  const { data: business } = useBusiness();
  const symbol = business?.business.currencySymbol ?? "₦";

  return (
    <>
      <PageHeader
        title="Invoices"
        description="Create, issue and track payment on every invoice."
        actions={
          <Link to="/invoices/new">
            <Button>
              <FilePlus2 className="h-4 w-4" aria-hidden />
              New invoice
            </Button>
          </Link>
        }
      />

      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-ink-200 p-3">
          <div className="relative min-w-56 flex-1">
            <Search className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-ink-400" aria-hidden />
            <Input
              value={filters.q ?? ""}
              onChange={(e) => setFilter("q", e.target.value)}
              placeholder="Search number, customer or PO…"
              aria-label="Search invoices"
              className="pl-9"
            />
          </div>
          <Select
            value={filters.status ?? ""}
            onChange={(e) => setFilter("status", e.target.value)}
            aria-label="Filter by status"
            className="w-40"
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status ? titleCase(status) : "All statuses"}
              </option>
            ))}
          </Select>
          {isFetching && <Spinner label="" />}
        </div>

        {isLoading ? (
          <Spinner label="Loading invoices" />
        ) : error ? (
          <ErrorState error={error} onRetry={() => void refetch()} />
        ) : (data?.data.length ?? 0) === 0 ? (
          <EmptyState
            title="No invoices here"
            description="Create your first invoice, or clear the filters to see everything."
            action={
              <Link to="/invoices/new">
                <Button size="sm">New invoice</Button>
              </Link>
            }
          />
        ) : (
          <>
            <Table
              head={["Invoice", "Customer", "Issued", "Due", "Total", "Balance", "Status", ""]}
            >
              {data!.data.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-ink-50">
                  <Td className="font-mono text-xs">{invoice.number}</Td>
                  <Td>
                    <Link to={`/invoices/${invoice.id}`} className="font-medium text-brand-700 hover:underline">
                      {invoice.customerName}
                    </Link>
                  </Td>
                  <Td className="text-ink-600 whitespace-nowrap">{formatDate(invoice.issueDate)}</Td>
                  <Td className="text-ink-600 whitespace-nowrap">{formatDate(invoice.dueDate)}</Td>
                  <Td className="tnum whitespace-nowrap">{formatMoney(invoice.total, symbol)}</Td>
                  <Td className={`tnum whitespace-nowrap ${invoice.balance > 0 ? "font-semibold" : "text-ink-500"}`}>
                    {formatMoney(invoice.balance, symbol)}
                  </Td>
                  <Td>
                    <Badge tone={statusTone(invoice.displayStatus)}>{titleCase(invoice.displayStatus)}</Badge>
                  </Td>
                  <Td className="text-right">
                    <Link
                      to={`/invoices/${invoice.id}`}
                      className="text-sm font-medium text-brand-700 hover:underline"
                    >
                      Open
                    </Link>
                  </Td>
                </tr>
              ))}
            </Table>
            <Pagination
              page={data!.meta.page}
              totalPages={data!.meta.totalPages}
              total={data!.meta.total}
              onPage={setPage}
            />
          </>
        )}
      </Card>
    </>
  );
}

export function Pagination({
  page,
  totalPages,
  total,
  onPage,
}: {
  page: number;
  totalPages: number;
  total: number;
  onPage: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-between border-t border-ink-200 px-4 py-2.5 text-sm">
      <p className="text-ink-500">
        {total} record{total === 1 ? "" : "s"} · page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => onPage(page - 1)}>
          Previous
        </Button>
        <Button variant="secondary" size="sm" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}

/** Shared "record a payment" dialog used by the invoice detail screen. */
export function PaymentDialog({
  invoiceId,
  balance,
  onClose,
}: {
  invoiceId: string;
  balance: number;
  onClose: () => void;
}) {
  const toast = useToast();
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("transfer");
  const [reference, setReference] = useState("");
  const [paidAt, setPaidAt] = useState(new Date().toISOString().slice(0, 10));

  // The API takes integer kobo; the field takes whatever the user typed in naira.
  const record = useApiMutation<{ amount: number; method: string; reference: string; paidAt: string }, unknown>({
    path: `/invoices/${invoiceId}/payments`,
    invalidate: invalidateAll,
    idempotent: true,
  });

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        const kobo = parseAmountToKobo(amount);
        if (kobo === null || kobo <= 0) {
          toast.push("error", "Enter a valid amount greater than zero.");
          return;
        }
        record.mutate(
          { amount: kobo, method, reference, paidAt },
          {
            onSuccess: () => {
              toast.push("success", "Payment recorded.");
              onClose();
            },
            onError: (err) => toast.push("error", err instanceof Error ? err.message : "Could not save."),
          },
        );
      }}
    >
      <p className="text-sm text-ink-600">
        Outstanding balance: <span className="tnum font-semibold">{formatMoney(balance)}</span>
      </p>
      <div>
        <label className="field-label" htmlFor="pay-amount">
          Amount (₦)
        </label>
        <Input id="pay-amount" value={amount} onChange={(e) => setAmount(e.target.value)} required inputMode="decimal" placeholder={koboToInput(balance)} />
      </div>
      <div>
        <label className="field-label" htmlFor="pay-method">
          Method
        </label>
        <Select id="pay-method" value={method} onChange={(e) => setMethod(e.target.value)}>
          {["transfer", "cash", "card", "pos", "cheque", "mobile", "other"].map((m) => (
            <option key={m} value={m}>
              {titleCase(m)}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <label className="field-label" htmlFor="pay-ref">
          Reference
        </label>
        <Input id="pay-ref" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Bank transfer ref" />
      </div>
      <div>
        <label className="field-label" htmlFor="pay-date">
          Date received
        </label>
        <Input id="pay-date" type="date" value={paidAt} onChange={(e) => setPaidAt(e.target.value)} required />
      </div>
      <Button type="submit" loading={record.isPending} className="w-full">
        Record payment
      </Button>
    </form>
  );
}
