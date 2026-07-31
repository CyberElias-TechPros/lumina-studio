import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Banknote, Landmark, ReceiptText, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

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
  return (
    <AppShell
      roleKey="instructor"
      title="Finance hub"
      subtitle="Cash ₦24.8m · AR ₦9.4m · AP ₦4.2m · reconciled Aug 1"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Balanced</Badge>
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
            label: "Cash position",
            value: "₦24.8m",
            delta: "across 3 accounts",
            icon: Wallet,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Receivables",
            value: "₦9.4m",
            delta: "₦2.1m overdue",
            icon: ReceiptText,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Payables",
            value: "₦4.2m",
            delta: "0 overdue",
            icon: Banknote,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Budget used",
            value: "64%",
            delta: "month 5 of 8",
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
