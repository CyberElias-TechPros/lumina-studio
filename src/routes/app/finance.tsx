"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { useNavigate } from "@/lib/next-compat/router";
import { useState } from "react";
import {
  Banknote,
  CreditCard,
  Landmark,
  Loader2,
  Receipt,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useCreateCheckout, usePaymentHistory } from "@/lib/query/payments";
import type { Payment } from "@/lib/api/payments";
import { cn, formatNaira } from "@/lib/utils";

export const Route = createFileRoute("/app/finance")({
  head: () => ({
    meta: [
      { title: "Finance — CEA-OS" },
      { name: "description", content: "Tuition payments and receipts." },
    ],
  }),
  component: StudentFinance,
});

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
  const pending = rows.filter((p) => p.status === "pending").length;
  const checkout = useCreateCheckout();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(140000);

  const handlePayNow = () => {
    checkout.mutate(
      {
        amount,
        description: "Tuition instalment",
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

  const kpis = [
    {
      label: "Total paid",
      value: formatNaira(paidTotal),
      delta: `${paid.length} successful ${paid.length === 1 ? "payment" : "payments"}`,
      icon: Wallet,
      tone: "bg-success/10 text-success",
    },
    {
      label: "Pending",
      value: String(pending),
      delta: pending ? "Awaiting confirmation" : "All settled",
      icon: Receipt,
      tone: "bg-warning/10 text-warning",
    },
    {
      label: "Payments",
      value: String(rows.length),
      delta: "All recorded",
      icon: Banknote,
      tone: "bg-primary/10 text-primary",
    },
  ];

  return (
    <AppShell
      roleKey="student"
      title="Finance"
      subtitle="Your tuition payments and receipts"
      actions={
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min={1}
            max={10_000_000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="h-9 w-36 text-sm"
            aria-label="Amount to pay"
          />
          <Button size="sm" onClick={handlePayNow} disabled={checkout.isPending || amount < 1}>
            {checkout.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <CreditCard className="size-4" />
            )}
            {checkout.isPending ? "Opening Paystack…" : "Pay now"}
          </Button>
        </div>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {kpis.map((k) => (
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
              <Receipt className="text-primary size-4" /> Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <QueryState<Payment[]>
              query={query}
              error={{ title: "Payments unavailable" }}
              empty={{
                title: "No payments yet",
                description: "Your Paystack transactions will appear here.",
              }}
            >
              {(payments) => (
                <div className="divide-y">
                  {payments.map((p) => (
                    <div
                      key={p.id}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                        <Receipt className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{p.description || p.reference}</p>
                        <p className="text-muted-foreground text-xs">{p.reference}</p>
                      </div>
                      <span className="text-sm font-extrabold">{formatNaira(p.amount)}</span>
                      <Badge className={cn("border-0 font-semibold", paymentTone(p.status))}>
                        {p.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </QueryState>
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
                Scholarships and instalment plans are reviewed by the admissions and finance teams.
                Contact the finance office for the options available to you.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
