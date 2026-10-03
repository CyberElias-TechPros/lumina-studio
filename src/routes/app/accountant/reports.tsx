"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  FileBarChart2,
  FileSpreadsheet,
  Landmark,
  ReceiptText,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { PnlDownload } from "@/components/finance/expense-form";
import { useInvoices, useExpenses, usePaymentBatches } from "@/lib/query/finance";
import { usePayrollChanges } from "@/lib/query/hr";
import { cn, formatNairaCompact } from "@/lib/utils";

export const Route = createFileRoute("/app/accountant/reports")({
  head: () => ({
    meta: [
      { title: "Reports — CEA-OS" },
      { name: "description", content: "P&L, balance sheet, cash flow and tax reports." },
    ],
  }),
  component: AccountantReports,
});

function AccountantReports() {
  const invoices = useInvoices();
  const expenses = useExpenses();
  const batches = usePaymentBatches();
  const payroll = usePayrollChanges();

  const invRows = invoices.data?.pages.flatMap((p) => p.items) ?? [];
  const expRows = expenses.data?.pages.flatMap((p) => p.items) ?? [];
  const batchRows = batches.data?.pages.flatMap((p) => p.items) ?? [];
  const payrollRows = payroll.data?.pages.flatMap((p) => p.items) ?? [];

  const collected = invRows.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const paidCount = invRows.filter((i) => i.status === "Paid").length;
  const spent = expRows.reduce((s, e) => s + e.amount, 0);
  const outstanding = invRows.reduce((s, i) => s + i.amount, 0) - collected;
  const net = collected - spent;
  const batchTotal = batchRows.reduce((s, b) => s + b.amount, 0);
  const pendingPayroll = payrollRows.filter((c) => c.status !== "sent" && c.status !== "approved");

  const statements = [
    {
      r: "Cash position — collected vs spend",
      d: `${formatNairaCompact(collected)} collected · ${formatNairaCompact(spent)} spend`,
      tone: "bg-success/10 text-success",
    },
    {
      r: "Open receivables",
      d: `${formatNairaCompact(outstanding)} across ${invRows.length} invoices`,
      tone: "bg-warning/10 text-warning",
    },
    {
      r: "Payment batches",
      d: `${formatNairaCompact(batchTotal)} · ${batchRows.length} batches`,
      tone: "bg-primary/10 text-primary",
    },
    {
      r: "Payroll changes pending",
      d: `${pendingPayroll.length} awaiting sign-off`,
      tone: "bg-learning/10 text-learning",
    },
  ];

  return (
    <AppShell
      roleKey="finance"
      title="Reports"
      subtitle={`Net ${formatNairaCompact(net)} · ${paidCount} invoices settled · ${expRows.length} claims`}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              net >= 0 ? "bg-success/10 text-success" : "bg-warning/10 text-warning",
            )}
          >
            {net >= 0 ? "Net positive" : "Net negative"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/accountant">
              <ArrowLeft className="size-4" /> Finance hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Revenue (paid)",
            value: formatNairaCompact(collected),
            delta: `${paidCount} invoices paid`,
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Expenses",
            value: formatNairaCompact(spent),
            delta: `${expRows.length} claims`,
            icon: ReceiptText,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Net cash flow",
            value: `${net >= 0 ? "+" : ""}${formatNairaCompact(net)}`,
            delta: "collected vs spend",
            icon: Wallet,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Open receivables",
            value: formatNairaCompact(outstanding),
            delta: `${invRows.length} invoices`,
            icon: Landmark,
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <FileSpreadsheet className="text-primary size-4" /> Monthly P&amp;L (CSV)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-muted-foreground text-xs leading-relaxed">
            Income collected, expenses recorded and the net for one month — the file you hand to the
            accountant for the CAC annual return.
          </p>
          <PnlDownload />
        </CardContent>
      </Card>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <FileBarChart2 className="text-primary size-4" /> Financial statements
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {statements.map((s) => (
            <div key={s.r} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{s.r}</p>
                <p className="text-muted-foreground text-xs">{s.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", s.tone)}>Current</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Open
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
