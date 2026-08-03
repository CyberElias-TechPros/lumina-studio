import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Landmark,
  ReceiptText,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { useExpenseItems, useInvoiceItems } from "@/lib/query/finance";
import { usePaymentHistoryItems } from "@/lib/query/payments";
import { cn, formatNairaCompact } from "@/lib/utils";

export const Route = createFileRoute("/app/director/finance")({
  head: () => ({
    meta: [
      { title: "Financial Overview — CEA-OS" },
      { name: "description", content: "Revenue, expenses and forecasts at a glance." },
    ],
  }),
  component: DirectorFinance,
});

function DirectorFinance() {
  const invoices = useInvoiceItems();
  const expenses = useExpenseItems();
  const payments = usePaymentHistoryItems();

  const revenue = payments.reduce((s, p) => (p.status === "success" ? s + p.amount : s), 0);
  const spend = expenses.reduce((s, e) => s + e.amount, 0);
  const receivable = invoices.reduce((s, i) => (i.status !== "Paid" ? s + i.amount : s), 0);
  const overdue = invoices.reduce((s, i) => (i.status === "Overdue" ? s + i.amount : s), 0);
  const margin = revenue > 0 ? Math.round(((revenue - spend) / revenue) * 100) : 0;

  const paidInvoices = invoices.filter((i) => i.status === "Paid");
  const totalInvoiced = invoices.reduce((s, i) => s + i.amount, 0) || 1;

  const streams = [
    {
      s: "Collected (paid)",
      v: formatNairaCompact(paidInvoices.reduce((s, i) => s + i.amount, 0)),
      pct: Math.round((paidInvoices.reduce((s, i) => s + i.amount, 0) / totalInvoiced) * 100),
      tone: "bg-primary/10 text-primary",
    },
    {
      s: "Awaiting payment",
      v: formatNairaCompact(
        invoices.filter((i) => i.status === "Sent").reduce((s, i) => s + i.amount, 0),
      ),
      pct: Math.round(
        (invoices.filter((i) => i.status === "Sent").reduce((s, i) => s + i.amount, 0) /
          totalInvoiced) *
          100,
      ),
      tone: "bg-learning/10 text-learning",
    },
    {
      s: "Overdue",
      v: formatNairaCompact(overdue),
      pct: Math.round((overdue / totalInvoiced) * 100),
      tone: "bg-success/10 text-success",
    },
  ];

  const byCategory = new Map<string, number>();
  for (const e of expenses)
    byCategory.set(e.category, (byCategory.get(e.category) ?? 0) + e.amount);
  const expenseRows = Array.from(byCategory.entries())
    .map(([category, amount]) => ({
      e: category,
      v: formatNairaCompact(amount),
      pct: spend > 0 ? Math.round((amount / spend) * 100) : 0,
    }))
    .sort((a, b) => b.pct - a.pct);

  return (
    <AppShell
      roleKey="admin"
      title="Financial overview"
      subtitle={`${formatNairaCompact(revenue)} collected · ${formatNairaCompact(spend)} expenses · ${margin}% margin`}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              margin >= 25 ? "bg-success/10 text-success" : "bg-warning/10 text-warning",
            )}
          >
            {margin >= 25 ? "Cash healthy" : "Margin below target"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/director">
              <ArrowLeft className="size-4" /> Director portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Collected (MTD)",
            value: formatNairaCompact(revenue),
            delta: `${payments.length} transactions`,
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Expenses",
            value: formatNairaCompact(spend),
            delta: `${expenses.length} entries`,
            icon: TrendingDown,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Gross margin",
            value: `${margin}%`,
            delta: "target 30%",
            icon: Wallet,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Receivables",
            value: formatNairaCompact(receivable),
            delta: `${formatNairaCompact(overdue)} overdue`,
            icon: ReceiptText,
            tone: "bg-learning/10 text-learning",
          },
        ].map((k) => (
          <Card key={k.label} className="bg-card shadow-soft border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                  {k.label}
                </p>
                <span className={cn("grid size-8 place-items-center rounded-lg", k.tone)}>
                  <k.icon className="size-4" />
                </span>
              </div>
              <p className="font-display mt-3 text-2xl font-extrabold">{k.value}</p>
              <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Landmark className="text-primary size-4" /> Revenue mix (invoices)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <>
              {streams.map((s) => (
                <div key={s.s}>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>{s.s}</span>
                    <span>
                      {s.v} · {s.pct}%
                    </span>
                  </div>
                  <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                    <div
                      className="bg-gradient-brand h-full rounded-full"
                      style={{ width: `${Math.max(2, s.pct)}%` }}
                    />
                  </div>
                </div>
              ))}
              {invoices.length === 0 && (
                <p className="text-muted-foreground py-4 text-center text-sm">
                  No invoices recorded yet.
                </p>
              )}
            </>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <TrendingDown className="text-primary size-4" /> Expense breakdown
            </CardTitle>
            <Button asChild variant="outline" size="sm" className="font-semibold">
              <Link to="/app/director/reports">
                Drill down <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <>
              {expenseRows.map((e) => (
                <div key={e.e}>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>{e.e}</span>
                    <span>
                      {e.v} · {e.pct}%
                    </span>
                  </div>
                  <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                    <div
                      className="bg-ink h-full rounded-full"
                      style={{ width: `${Math.max(2, e.pct)}%` }}
                    />
                  </div>
                </div>
              ))}
              {expenseRows.length === 0 && (
                <p className="text-muted-foreground py-4 text-center text-sm">
                  No expenses recorded yet.
                </p>
              )}
            </>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
