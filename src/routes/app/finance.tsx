import { createFileRoute } from "@tanstack/react-router";
import {
  Banknote,
  CreditCard,
  Download,
  Landmark,
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

export const Route = createFileRoute("/app/finance")({
  head: () => ({
    meta: [
      { title: "Finance — CEA-OS" },
      { name: "description", content: "Tuition, invoices, instalments and receipts." },
    ],
  }),
  component: StudentFinance,
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
  {
    ref: "INV-2026-0912",
    item: "Laptop deposit (refundable)",
    amount: 50000,
    status: "Paid",
    tone: "bg-success/10 text-success",
  },
];

const payments = [
  { method: "Card (GTB)", last4: "4412", date: "May 4, 2026", amount: 140000 },
  { method: "Bank transfer (GTBank)", last4: "0342", date: "Feb 10, 2026", amount: 140000 },
  { method: "Merit scholarship credit", last4: "50%", date: "Jan 15, 2026", amount: 140000 },
];

function StudentFinance() {
  return (
    <AppShell
      roleKey="student"
      title="Finance"
      subtitle="Tuition, invoices and receipts · Scholarship: Merit 50%"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Balance: ₦0</Badge>
          <Button size="sm">
            <CreditCard className="size-4" /> Pay now
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Balance due",
            value: formatNaira(0),
            delta: "All clear",
            icon: Wallet,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Next instalment",
            value: formatNaira(140000),
            delta: "Sep 1, 2026",
            icon: Receipt,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Paid this year",
            value: formatNaira(420000),
            delta: "3 payments",
            icon: Banknote,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Scholarship",
            value: "50%",
            delta: "Merit · renewed",
            icon: ShieldCheck,
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
                <Button variant="ghost" size="sm" className="text-primary shrink-0 font-semibold">
                  <Download className="size-3.5" /> Receipt
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Landmark className="text-primary size-4" /> Recent payments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {payments.map((p) => (
                <div
                  key={p.date}
                  className="flex items-center justify-between rounded-xl border p-3"
                >
                  <div>
                    <p className="text-sm font-semibold">{p.method}</p>
                    <p className="text-muted-foreground text-xs">
                      …{p.last4} · {p.date}
                    </p>
                  </div>
                  <span className="text-sm font-extrabold">{formatNaira(p.amount)}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <ShieldCheck className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Financial aid</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Your Merit 50% scholarship covers instalments 1–6. NGO partner funding tops up term
                3.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
