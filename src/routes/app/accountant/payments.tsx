import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowDownUp, CheckCircle2, ReceiptText, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/accountant/payments")({
  head: () => ({
    meta: [
      { title: "Payments — CEA-OS" },
      { name: "description", content: "Manual and batch payments with reconciliation." },
    ],
  }),
  component: AccountantPayments,
});

const batches = [
  {
    b: "Batch #204 — tuition instalments",
    v: "₦4.8m · 22 payments",
    d: "Jul 30",
    s: "Reconciled",
    tone: "bg-success/10 text-success",
  },
  {
    b: "Batch #203 — supplier bills",
    v: "₦1.9m · 6 payments",
    d: "Jul 26",
    s: "Reconciled",
    tone: "bg-success/10 text-success",
  },
  {
    b: "Batch #205 — stipends",
    v: "₦620k · 8 payments",
    d: "Aug 1",
    s: "Pending approval",
    tone: "bg-warning/10 text-warning",
  },
];

function AccountantPayments() {
  return (
    <AppShell
      roleKey="instructor"
      title="Payments"
      subtitle="24 transactions today · ₦7.4m processed"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            98% reconciled
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
            label: "In today",
            value: "₦2.1m",
            delta: "6 transactions",
            icon: Wallet,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Out today",
            value: "₦5.3m",
            delta: "18 transactions",
            icon: ArrowDownUp,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Batch pending",
            value: "1",
            delta: "₦620k stipends",
            icon: ReceiptText,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Reconciled",
            value: "98%",
            delta: "30-day rolling",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <ArrowDownUp className="text-primary size-4" /> Recent batches
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            New batch
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {batches.map((b) => (
            <div key={b.b} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{b.b}</p>
                <p className="text-muted-foreground text-xs">
                  {b.v} · {b.d}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", b.tone)}>{b.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                View
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
