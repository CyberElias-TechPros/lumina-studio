import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Banknote,
  CreditCard,
  Download,
  Receipt,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { formatNaira } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/parent/students/$studentId/finance")({
  head: () => ({
    meta: [
      { title: "Finance & Billing — CEA-OS" },
      { name: "description", content: "Billing and payments for parents." },
    ],
  }),
  component: ParentStudentFinance,
});

const invoices = [
  {
    ref: "INV-2026-0142",
    item: "Term 1 instalment",
    amount: 140000,
    status: "Paid",
    tone: "bg-success/10 text-success",
  },
  {
    ref: "INV-2026-0814",
    item: "Term 2 instalment",
    amount: 140000,
    status: "Paid",
    tone: "bg-success/10 text-success",
  },
  {
    ref: "INV-2026-0911",
    item: "Term 3 instalment",
    amount: 140000,
    status: "Due Sep 1",
    tone: "bg-warning/10 text-warning",
  },
];

function ParentStudentFinance() {
  return (
    <AppShell
      roleKey="student"
      title="Finance & billing"
      subtitle="Ada Okafor · Merit scholarship 50%"
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            {formatNaira(140000)} due
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/parent/students/$studentId" params={{ studentId: "ada-okafor" }}>
              <ArrowLeft className="size-4" /> Overview
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Balance due",
            value: formatNaira(140000),
            delta: "Sep 1, 2026",
            icon: Wallet,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Paid this year",
            value: formatNaira(280000),
            delta: "2 instalments",
            icon: Banknote,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Scholarship",
            value: "50%",
            delta: "Merit · verified",
            icon: ShieldCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Payment methods",
            value: "3",
            delta: "card · bank · USSD",
            icon: CreditCard,
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
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Receipt className="text-primary size-4" /> Invoices
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {invoices.map((i) => (
              <div
                key={i.ref}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <Receipt className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{i.item}</p>
                  <p className="text-muted-foreground text-xs">{i.ref}</p>
                </div>
                <span className="text-sm font-extrabold">{formatNaira(i.amount)}</span>
                <Badge className={cn("border-0 font-semibold", i.tone)}>{i.status}</Badge>
                {i.status === "Paid" && (
                  <Button variant="ghost" size="sm" className="text-primary shrink-0 font-semibold">
                    <Download className="size-3.5" /> Receipt
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
          <CardContent className="p-6">
            <CreditCard className="text-warning size-5" />
            <p className="font-display mt-3 text-base font-extrabold">Pay online</p>
            <p className="text-ink-foreground/70 mt-1 text-sm">
              Card, bank transfer or USSD — receipts land in your email instantly and the
              registrar's ledger updates automatically.
            </p>
            <Button className="bg-ink-foreground text-ink mt-4 w-full font-semibold hover:bg-ink-foreground/90">
              Pay {formatNaira(140000)} now
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
