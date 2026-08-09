import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Banknote, Landmark, ReceiptText, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { useInvoices, useExpenses, usePaymentBatches } from "@/lib/query/finance";
import { cn, formatNairaCompact } from "@/lib/utils";

export const Route = createFileRoute("/app/accountant/")({
  head: () => ({
    meta: [
      { title: "Finance Hub — CEA-OS" },
      { name: "description", content: "Accounts receivable, payable, cash flow and bank balance." },
    ],
  }),
  component: AccountantHub,
});

const screens = [
  {
    icon: ReceiptText,
    label: "Invoicing",
    desc: "Create, send, track",
    path: "/app/accountant/invoicing",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Banknote,
    label: "Billing (AP)",
    desc: "Payables and dues",
    path: "/app/accountant/billing",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: Wallet,
    label: "Payments",
    desc: "Batch, reconcile",
    path: "/app/accountant/payments",
    tone: "bg-success/10 text-success",
  },
  {
    icon: Landmark,
    label: "Banking",
    desc: "Reconciliation",
    path: "/app/accountant/banking",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: ReceiptText,
    label: "Payroll",
    desc: "Salaries, payslips",
    path: "/app/accountant/payroll",
    tone: "bg-career/10 text-career",
  },
  {
    icon: Banknote,
    label: "Budgets",
    desc: "Dept vs actual",
    path: "/app/accountant/budgets",
    tone: "bg-community/10 text-community",
  },
];

function AccountantHub() {
  const invoices = useInvoices();
  const expenses = useExpenses();
  const batches = usePaymentBatches();

  const invRows = invoices.data?.pages.flatMap((p) => p.items) ?? [];
  const expRows = expenses.data?.pages.flatMap((p) => p.items) ?? [];
  const batchRows = batches.data?.pages.flatMap((p) => p.items) ?? [];

  const billed = invRows.reduce((s, i) => s + i.amount, 0);
  const collected = invRows.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const outstanding = billed - collected;
  const overdue = invRows.filter((i) => i.status === "Overdue");
  const spent = expRows.reduce((s, e) => s + e.amount, 0);
  const batchTotal = batchRows.reduce((s, b) => s + b.amount, 0);

  return (
    <AppShell
      roleKey="finance"
      title="Finance hub"
      subtitle={`AR ${formatNairaCompact(outstanding)} · AP ${formatNairaCompact(spent)} · ${batchRows.length} batches`}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              overdue.length > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
            )}
          >
            {overdue.length > 0 ? `${overdue.length} overdue` : "Balanced"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/accountant">
              <ArrowLeft className="size-4" /> Accounting portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Receivables (AR)",
            value: formatNairaCompact(outstanding),
            delta: `${overdue.length} overdue`,
            icon: ReceiptText,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Collected",
            value: formatNairaCompact(collected),
            delta: `${invRows.length} invoices`,
            icon: Wallet,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Spend (AP)",
            value: formatNairaCompact(spent),
            delta: `${expRows.length} expense claims`,
            icon: Banknote,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Batches processed",
            value: formatNairaCompact(batchTotal),
            delta: `${batchRows.length} payment batches`,
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
            <Landmark className="text-primary size-4" /> Workspace
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {screens.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className={cn("grid size-9 place-items-center rounded-lg", s.tone)}>
                  <s.icon className="size-4" />
                </span>
                <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
              </div>
              <p className="font-display mt-3 text-sm font-extrabold">{s.label}</p>
              <p className="text-muted-foreground mt-1 text-xs">{s.desc}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
