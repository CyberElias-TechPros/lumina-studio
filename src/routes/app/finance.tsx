import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Banknote,
  CreditCard,
  Download,
  Landmark,
  Loader2,
  Receipt,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useCreateCheckout, usePaymentHistory } from "@/lib/query/payments";
import type { Payment } from "@/lib/api/payments";
import { cn, formatNaira } from "@/lib/utils";

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

function paymentTone(status: Payment["status"]): string {
  if (status === "success") return "bg-success/10 text-success";
  if (status === "failed") return "bg-destructive/10 text-destructive";
  return "bg-warning/10 text-warning";
}

function StudentFinance() {
  const query = usePaymentHistory();
  const rows = query.data?.pages.flatMap((p) => p.items) ?? [];
  const paid = rows.filter((p) => p.status === "success");
  const paidTotal = paid.reduce((s, p) => s + p.amount, 0);
  const checkout = useCreateCheckout();
  const navigate = useNavigate();

  const handlePayNow = () => {
    checkout.mutate(
      {
        amount: 140000,
        description: "Term 3 instalment — INV-2026-0911",
        redirectUrl: `${window.location.origin}/app/finance/pay-verify`,
      },
      {
        onSuccess: (res) => {
          if (res.mock) {
            navigate({ to: "/app/finance/pay-verify", search: { reference: res.reference } });
            return;
          }
          window.open(res.authorizationUrl, "_blank", "noopener,noreferrer");
        },
      },
    );
  };

  return (
    <AppShell
      roleKey="student"
      title="Finance"
      subtitle="Tuition, invoices and receipts · Scholarship: Merit 50%"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Balance: ₦0</Badge>
          <Button size="sm" onClick={handlePayNow} disabled={checkout.isPending}>
            {checkout.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <CreditCard className="size-4" />
            )}
            {checkout.isPending ? "Opening Paystack…" : "Pay now"}
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
            value: formatNaira(paidTotal),
            delta: `${paid.length} payments`,
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
              <QueryState<Payment[]>
                query={query}
                error={{ title: "Payments unavailable" }}
                empty={{
                  title: "No payments yet",
                  description: "Your Paystack transactions will appear here.",
                }}
              >
                {(payments) => (
                  <>
                    {payments.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between gap-2 rounded-xl border p-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {p.description || p.reference}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {p.reference} · {p.paidAt ?? "Pending confirmation"}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="text-sm font-extrabold">{formatNaira(p.amount)}</span>
                          <Badge className={cn("border-0 font-semibold", paymentTone(p.status))}>
                            {p.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </QueryState>
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
