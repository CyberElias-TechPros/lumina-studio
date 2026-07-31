import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Banknote,
  FileCheck2,
  Landmark,
  Receipt,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/accountant")({
  head: () => ({
    meta: [
      { title: "Accounting — CEA-OS" },
      {
        name: "description",
        content: "Accounting: receivables, payables, budgets and reconciliation.",
      },
    ],
  }),
  component: AccountantPortal,
});

const pendingInvoices = [
  {
    no: "INV-2041",
    who: "E-tech Solutions Ltd",
    amount: "₦1,240,000",
    due: "Due Aug 2",
    status: "Pending",
    tone: "bg-warning/10 text-warning",
  },
  {
    no: "INV-2038",
    who: "Mrs. Halima Sani",
    amount: "₦850,000",
    due: "Paid Aug 1",
    status: "Paid",
    tone: "bg-success/10 text-success",
  },
  {
    no: "INV-2035",
    who: "SkillForge Partners",
    amount: "₦2,100,000",
    due: "Due Aug 14",
    status: "Sent",
    tone: "bg-primary/10 text-primary",
  },
];

const budget = [
  { line: "Salaries", spent: 68, budget: "₦38.5m" },
  { line: "Facilities", spent: 41, budget: "₦9.2m" },
  { line: "Learning ops", spent: 56, budget: "₦14.8m" },
];

function AccountantPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="Accounting"
      subtitle="Receivables, payables and budgets · July 2026 closed"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Books reconciled
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            Month closed: Jul
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Cash position",
            value: "₦46.2m",
            delta: "+₦3.1m July",
            icon: Wallet,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Receivables",
            value: "₦8.4m",
            delta: "14 invoices",
            icon: TrendingUp,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Payables",
            value: "₦5.7m",
            delta: "9 invoices",
            icon: TrendingDown,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Budget used",
            value: "58%",
            delta: "Q3 · 55% planned",
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Receipt className="text-primary size-4" /> Invoices · July–Aug
            </CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
              <Link to="/apply">
                Billing records <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="divide-y">
            {pendingInvoices.map((i) => (
              <div
                key={i.no}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <Banknote className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{i.who}</p>
                  <p className="text-muted-foreground text-xs">
                    {i.no} · {i.due}
                  </p>
                </div>
                <p className="text-sm font-extrabold">{i.amount}</p>
                <Badge className={cn("border-0 font-semibold", i.tone)}>{i.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Landmark className="text-primary size-4" /> Budget burn · Q3
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {budget.map((b) => (
                <div key={b.line}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">{b.line}</span>
                    <span className="text-muted-foreground text-xs font-semibold">
                      {b.spent}% · {b.budget}
                    </span>
                  </div>
                  <div className="bg-muted mt-2 h-2 overflow-hidden rounded-full">
                    <div
                      className="bg-gradient-brand h-full rounded-full"
                      style={{ width: `${b.spent}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <FileCheck2 className="text-primary size-4" /> Reconciliations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Bank · GTB current", v: "Matched", tone: "bg-success/10 text-success" },
                { t: "Paystack settlement", v: "2 pending", tone: "bg-warning/10 text-warning" },
                { t: "Petty cash", v: "₦42,000 diff", tone: "bg-error/10 text-error" },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <Banknote className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Cash runway</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Runway: 6+ months at current burn. Paystack payout due Thursday.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
