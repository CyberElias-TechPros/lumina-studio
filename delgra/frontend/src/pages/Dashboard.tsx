import { Link } from "react-router-dom";
import { AlertTriangle, ArrowDownRight, ArrowUpRight, Boxes, FileText, Truck } from "lucide-react";
import { PageHeader } from "../components/Layout.tsx";
import { Badge, Card, CardHeader, EmptyState, ErrorState, Spinner, statusTone } from "../components/ui.tsx";
import { useDashboard, useInvoices } from "../api/hooks.ts";
import { formatCompact, formatDate, formatMoney, titleCase } from "../lib/money.ts";

export function DashboardPage() {
  const { data, isLoading, error, refetch } = useDashboard();
  const overdue = useInvoices({ status: "overdue", limit: 5 });

  if (isLoading) return <Spinner label="Loading your dashboard" />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;
  if (!data) return null;

  const symbol = data.business.currencySymbol;

  const tiles = [
    {
      label: "Billed this month",
      value: formatCompact(data.money.monthBilled, symbol),
      sub: `${data.money.monthInvoiceCount} invoice${data.money.monthInvoiceCount === 1 ? "" : "s"}`,
      to: "/invoices",
      icon: FileText,
    },
    {
      label: "Collected this month",
      value: formatCompact(data.money.monthCollected, symbol),
      sub: `${formatMoney(data.money.collected, symbol)} all time`,
      to: "/invoices?status=paid",
      icon: ArrowDownRight,
    },
    {
      label: "Outstanding",
      value: formatCompact(data.money.outstanding, symbol),
      sub: `${data.counts.openInvoices} open invoice${data.counts.openInvoices === 1 ? "" : "s"}`,
      to: "/invoices?status=unpaid",
      icon: ArrowUpRight,
    },
    {
      label: "Overdue",
      value: formatCompact(data.money.overdue, symbol),
      sub: data.money.overdue > 0 ? "Needs chasing" : "Nothing overdue",
      to: "/invoices?status=overdue",
      icon: AlertTriangle,
      alert: data.money.overdue > 0,
    },
  ];

  return (
    <>
      <PageHeader
        title={`Good day, ${data.business.name}`}
        description={`${formatDate(data.period.monthStart)} — ${formatDate(data.period.today)}`}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((tile) => (
          <Link key={tile.label} to={tile.to} className="card p-4 transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-ink-500">{tile.label}</p>
              <tile.icon
                className={`h-4 w-4 ${"alert" in tile && tile.alert ? "text-red-600" : "text-ink-400"}`}
                aria-hidden
              />
            </div>
            <p className="tnum mt-2 text-2xl font-semibold tracking-tight">{tile.value}</p>
            <p className={`mt-1 text-xs ${"alert" in tile && tile.alert ? "text-red-700" : "text-ink-500"}`}>
              {tile.sub}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Overdue invoices"
            subtitle="Oldest first — these need a reminder."
            action={
              <Link to="/invoices?status=overdue" className="text-sm font-medium text-brand-700 hover:underline">
                View all
              </Link>
            }
          />
          {overdue.isLoading ? (
            <Spinner />
          ) : (overdue.data?.data.length ?? 0) === 0 ? (
            <EmptyState title="Nothing overdue" description="Every issued invoice is either paid or still within terms." />
          ) : (
            <ul className="divide-y divide-ink-100">
              {overdue.data!.data.map((invoice) => (
                <li key={invoice.id}>
                  <Link to={`/invoices/${invoice.id}`} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-ink-50">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{invoice.customerName}</p>
                      <p className="tnum text-xs text-ink-500">
                        {invoice.number} · due {formatDate(invoice.dueDate)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="tnum text-sm font-semibold">{formatMoney(invoice.balance, symbol)}</p>
                      <Badge tone={statusTone(invoice.displayStatus)}>{titleCase(invoice.displayStatus)}</Badge>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader title="At a glance" />
            <dl className="divide-y divide-ink-100 text-sm">
              {[
                { label: "Active customers", value: data.counts.customers, to: "/customers" },
                { label: "Waybills in transit", value: data.counts.inTransit, to: "/waybills?status=in_transit" },
                { label: "Shipments pending", value: data.counts.pendingWaybills, to: "/waybills?status=pending" },
                { label: "Delivery exceptions", value: data.counts.exceptions, to: "/waybills?status=exception" },
                { label: "Draft invoices", value: data.counts.drafts, to: "/invoices?status=draft" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between px-4 py-2.5">
                  <dt className="text-ink-600">{row.label}</dt>
                  <dd>
                    <Link to={row.to} className="tnum font-semibold text-brand-700 hover:underline">
                      {row.value}
                    </Link>
                  </dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card>
            <CardHeader title="Stock & payables" />
            <dl className="divide-y divide-ink-100 text-sm">
              <div className="flex items-center justify-between px-4 py-2.5">
                <dt className="flex items-center gap-2 text-ink-600">
                  <Boxes className="h-4 w-4 text-ink-400" aria-hidden /> Stock value
                </dt>
                <dd className="tnum font-semibold">{formatCompact(data.money.stockValue, symbol)}</dd>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5">
                <dt className="text-ink-600">Low stock items</dt>
                <dd>
                  <Link to="/products?filter=low" className="tnum font-semibold text-brand-700 hover:underline">
                    {data.counts.lowStock}
                  </Link>
                </dd>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5">
                <dt className="text-ink-600">Owed to suppliers</dt>
                <dd className="tnum font-semibold">{formatCompact(data.money.payables, symbol)}</dd>
              </div>
            </dl>
          </Card>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Recent activity" subtitle="Every state change is recorded." />
          {data.activity.length === 0 ? (
            <EmptyState title="No activity yet" description="Create your first invoice to get started." />
          ) : (
            <ul className="max-h-80 divide-y divide-ink-100 overflow-y-auto">
              {data.activity.map((entry) => (
                <li key={entry.id} className="px-4 py-2.5 text-sm">
                  <p className="truncate text-ink-800">
                    <span className="font-medium">{entry.actorName}</span>{" "}
                    <span className="text-ink-500">{titleCase(entry.action)}</span>
                  </p>
                  <p className="truncate text-xs text-ink-500">
                    {entry.summary} · {formatDate(entry.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <CardHeader title="Running low" subtitle="At or below the reorder level." />
          {data.lowStockItems.length === 0 ? (
            <EmptyState title="Stock levels are healthy" />
          ) : (
            <ul className="divide-y divide-ink-100">
              {data.lowStockItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    <p className="font-mono text-xs text-ink-500">{item.sku}</p>
                  </div>
                  <Badge tone={item.quantity <= 0 ? "red" : "amber"}>
                    <Truck className="h-3 w-3" aria-hidden />
                    {item.quantity} left
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
