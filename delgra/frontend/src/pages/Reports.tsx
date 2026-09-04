import { useState } from "react";
import { Download } from "lucide-react";
import { PageHeader } from "../components/Layout.tsx";
import { Badge, Button, Card, CardHeader, EmptyState, ErrorState, Input, Spinner, Table, Td } from "../components/ui.tsx";
import {
  useBusiness,
  useLogistics,
  useProfitLoss,
  useReceivables,
  useStockReport,
  useTopCustomers,
} from "../api/hooks.ts";
import { apiUrl } from "../api/client.ts";
import { addDaysIso, formatCompact, formatMoney, titleCase, todayIso } from "../lib/money.ts";

type Tab = "profit" | "receivables" | "stock" | "customers" | "logistics";

export function ReportsPage() {
  const [tab, setTab] = useState<Tab>("profit");
  // Default to the last 90 days: long enough to be useful, short enough to load.
  const [from, setFrom] = useState(addDaysIso(todayIso(), -90));
  const [to, setTo] = useState(todayIso());

  const { data: businessData } = useBusiness();
  const symbol = businessData?.business.currencySymbol ?? "₦";

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: "profit", label: "Profit & loss" },
    { id: "receivables", label: "Receivables ageing" },
    { id: "stock", label: "Stock valuation" },
    { id: "customers", label: "Top customers" },
    { id: "logistics", label: "Carrier performance" },
  ];

  return (
    <>
      <PageHeader
        title="Reports"
        description="Everything here is computed from live records — nothing is stored twice."
        actions={
          <a href={apiUrl(`/reports/invoices.csv?from=${from}&to=${to}`)} target="_blank" rel="noreferrer">
            <Button variant="secondary" size="sm">
              <Download className="h-4 w-4" aria-hidden />
              Export invoices CSV
            </Button>
          </a>
        }
      />

      <Card className="mb-4 p-3">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="field-label" htmlFor="r-from">
              From
            </label>
            <Input id="r-from" type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="w-40" />
          </div>
          <div>
            <label className="field-label" htmlFor="r-to">
              To
            </label>
            <Input id="r-to" type="date" value={to} onChange={(e) => setTo(e.target.value)} className="w-40" />
          </div>
          <nav className="flex flex-wrap gap-1" aria-label="Reports">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                aria-current={tab === item.id ? "page" : undefined}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                  tab === item.id ? "bg-brand-700 text-white" : "text-ink-700 hover:bg-ink-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </Card>

      {tab === "profit" && <ProfitLoss from={from} to={to} symbol={symbol} />}
      {tab === "receivables" && <Receivables symbol={symbol} />}
      {tab === "stock" && <Stock symbol={symbol} />}
      {tab === "customers" && <TopCustomers from={from} to={to} symbol={symbol} />}
      {tab === "logistics" && <Logistics from={from} to={to} />}
    </>
  );
}

function Margin({ bp }: { bp: number }) {
  return <span className="tnum">{(bp / 100).toFixed(1)}%</span>;
}

function ProfitLoss({ from, to, symbol }: { from: string; to: string; symbol: string }) {
  const { data, isLoading, error, refetch } = useProfitLoss({ from, to });

  if (isLoading) return <Spinner label="Crunching the numbers" />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;
  if (!data) return null;

  const rows: Array<[string, number, boolean]> = [
    ["Billed (net of voids)", data.revenue.billed, false],
    ["Discounts given", -data.revenue.discountsGiven, false],
    ["Shipping recovered", data.revenue.shipping, false],
    ["Cost of goods sold", -data.costs.cogs, false],
  ];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader title="Profit and loss" subtitle={`${from} to ${to}`} />
        <Table head={["", "Amount"]}>
          {rows.map(([label, value]) => (
            <tr key={label}>
              <Td>{label}</Td>
              <Td className="tnum text-right">{formatMoney(value, symbol)}</Td>
            </tr>
          ))}
          <tr className="bg-ink-50 font-semibold">
            <Td>Gross profit</Td>
            <Td className="tnum text-right">{formatMoney(data.result.grossProfit, symbol)}</Td>
          </tr>
          <tr>
            <Td>Operating expenses ({data.costs.expenseCount} entries)</Td>
            <Td className="tnum text-right">{formatMoney(-data.costs.operatingExpenses, symbol)}</Td>
          </tr>
          <tr className="bg-ink-50 font-semibold">
            <Td>Net profit</Td>
            <Td className={`tnum text-right ${data.result.netProfit < 0 ? "text-red-700" : "text-brand-800"}`}>
              {formatMoney(data.result.netProfit, symbol)}
            </Td>
          </tr>
        </Table>
        {data.costs.unmappedCostLines > 0 && (
          <p className="border-t border-ink-200 px-4 py-2 text-xs text-amber-800">
            {data.costs.unmappedCostLines} purchase line(s) could not be matched to stock and are excluded from cost of
            goods sold.
          </p>
        )}
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader title="Margins" />
          <dl className="divide-y divide-ink-100 text-sm">
            <div className="flex justify-between px-4 py-2.5">
              <dt className="text-ink-600">Gross margin</dt>
              <dd>
                <Margin bp={data.result.grossMarginBp} />
              </dd>
            </div>
            <div className="flex justify-between px-4 py-2.5">
              <dt className="text-ink-600">Net margin</dt>
              <dd>
                <Margin bp={data.result.netMarginBp} />
              </dd>
            </div>
          </dl>
        </Card>
        <Card>
          <CardHeader title="Cash" />
          <dl className="divide-y divide-ink-100 text-sm">
            <div className="flex justify-between px-4 py-2.5">
              <dt className="text-ink-600">Invoices</dt>
              <dd className="tnum">{data.revenue.invoiceCount}</dd>
            </div>
            <div className="flex justify-between px-4 py-2.5">
              <dt className="text-ink-600">Collected</dt>
              <dd className="tnum">{formatMoney(data.revenue.collected, symbol)}</dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  );
}

function Receivables({ symbol }: { symbol: string }) {
  const { data, isLoading, error, refetch } = useReceivables();

  if (isLoading) return <Spinner label="Loading receivables" />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;
  if (!data) return null;
  if (data.rows.length === 0) {
    return <Card><EmptyState title="Nothing outstanding" description="No customer owes you anything right now." /></Card>;
  }

  return (
    <Card>
      <CardHeader title="Receivables ageing" subtitle="How long each balance has been waiting." />
      <Table head={["Customer", "Current", "1–30 days", "31–60", "61–90", "90+", "Total"]}>
        {data.rows.map((row) => (
          <tr key={row.customerId}>
            <Td className="font-medium">{row.customerName}</Td>
            <Td className="tnum">{formatMoney(row.current, symbol)}</Td>
            <Td className="tnum">{formatMoney(row.days1to30, symbol)}</Td>
            <Td className="tnum">{formatMoney(row.days31to60, symbol)}</Td>
            <Td className="tnum">{formatMoney(row.days61to90, symbol)}</Td>
            <Td className="tnum">{formatMoney(row.over90, symbol)}</Td>
            <Td className="tnum font-semibold">{formatMoney(row.total, symbol)}</Td>
          </tr>
        ))}
        <tr className="bg-ink-50 font-semibold">
          <Td>Total</Td>
          <Td className="tnum">{formatMoney(data.totals.current, symbol)}</Td>
          <Td className="tnum">{formatMoney(data.totals.days1to30, symbol)}</Td>
          <Td className="tnum">{formatMoney(data.totals.days31to60, symbol)}</Td>
          <Td className="tnum">{formatMoney(data.totals.days61to90, symbol)}</Td>
          <Td className="tnum">{formatMoney(data.totals.over90, symbol)}</Td>
          <Td className="tnum">{formatMoney(data.totals.total, symbol)}</Td>
        </tr>
      </Table>
    </Card>
  );
}

function Stock({ symbol }: { symbol: string }) {
  const { data, isLoading, error, refetch } = useStockReport();

  if (isLoading) return <Spinner label="Loading stock valuation" />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;
  if (!data) return null;
  if (data.rows.length === 0) return <Card><EmptyState title="No stock to value" /></Card>;

  return (
    <Card>
      <CardHeader
        title="Stock valuation"
        subtitle={`${data.totals.units} units · ${formatCompact(data.totals.stockValue, symbol)} at cost`}
      />
      <Table head={["SKU", "Item", "Grade", "Qty", "Unit cost", "Stock value", "If all sold", "Last sold"]}>
        {data.rows.map((row) => (
          <tr key={row.id}>
            <Td className="font-mono text-xs">{row.sku}</Td>
            <Td>{row.name}</Td>
            <Td>{titleCase(row.conditionGrade)}</Td>
            <Td className="tnum">{row.quantity}</Td>
            <Td className="tnum">{formatMoney(row.unitCost, symbol)}</Td>
            <Td className="tnum font-medium">{formatMoney(row.stockValue, symbol)}</Td>
            <Td className="tnum text-ink-600">{formatMoney(row.potentialRevenue, symbol)}</Td>
            <Td className="text-ink-500">{row.lastSold ?? "never"}</Td>
          </tr>
        ))}
      </Table>
    </Card>
  );
}

function TopCustomers({ from, to, symbol }: { from: string; to: string; symbol: string }) {
  const { data, isLoading, error, refetch } = useTopCustomers({ from, to });

  if (isLoading) return <Spinner label="Loading top customers" />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;
  if (!data) return null;
  if (data.rows.length === 0) return <Card><EmptyState title="No invoicing in this period" /></Card>;

  return (
    <Card>
      <CardHeader title="Top customers" subtitle={`${from} to ${to}`} />
      <Table head={["#", "Customer", "Invoices", "Billed", "Collected", "Outstanding"]}>
        {data.rows.map((row, index) => (
          <tr key={row.customerId}>
            <Td className="text-ink-500">{index + 1}</Td>
            <Td className="font-medium">{row.customerName}</Td>
            <Td className="tnum">{row.invoices}</Td>
            <Td className="tnum">{formatMoney(row.billed, symbol)}</Td>
            <Td className="tnum">{formatMoney(row.collected, symbol)}</Td>
            <Td className="tnum">{formatMoney(row.outstanding, symbol)}</Td>
          </tr>
        ))}
      </Table>
    </Card>
  );
}

function Logistics({ from, to }: { from: string; to: string }) {
  const { data, isLoading, error, refetch } = useLogistics({ from, to });
  const { data: businessData } = useBusiness();
  const symbol = businessData?.business.currencySymbol ?? "₦";

  if (isLoading) return <Spinner label="Loading carrier performance" />;
  if (error) return <ErrorState error={error} onRetry={() => void refetch()} />;
  if (!data) return null;
  if (data.rows.length === 0) return <Card><EmptyState title="No shipments in this period" /></Card>;

  return (
    <Card>
      <CardHeader title="Carrier performance" subtitle={`${from} to ${to}`} />
      <Table head={["Carrier", "Shipments", "Delivered", "In transit", "Exceptions", "Charges", "Avg. days to deliver"]}>
        {data.rows.map((row) => {
          const deliveredShare = row.shipments > 0 ? Math.round((row.delivered / row.shipments) * 100) : 0;
          return (
            <tr key={row.carrier}>
              <Td className="font-medium">{row.carrier}</Td>
              <Td className="tnum">{row.shipments}</Td>
              <Td className="tnum">{row.delivered}</Td>
              <Td className="tnum">{row.inTransit}</Td>
              <Td className="tnum">{row.exceptions}</Td>
              <Td className="tnum">{formatMoney(row.charges, symbol)}</Td>
              <Td>
                {row.avgDeliveryDays === null ? (
                  <span className="text-ink-500">—</span>
                ) : (
                  <Badge tone={deliveredShare >= 90 ? "green" : deliveredShare >= 70 ? "amber" : "red"}>
                    {row.avgDeliveryDays} days · {deliveredShare}% delivered
                  </Badge>
                )}
              </Td>
            </tr>
          );
        })}
      </Table>
    </Card>
  );
}
