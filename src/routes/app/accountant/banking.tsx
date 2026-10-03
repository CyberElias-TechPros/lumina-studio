"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Banknote, CheckCircle2, Landmark, ReceiptText, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { usePaymentHistory, usePaymentHistoryItems } from "@/lib/query/payments";
import { usePaymentBatches, usePaymentBatchItems } from "@/lib/query/finance";
import type { Payment } from "@/lib/api/payments";
import type { PaymentBatch } from "@/lib/api/finance";
import { cn, formatNaira } from "@/lib/utils";

export const Route = createFileRoute("/app/accountant/banking")({
  head: () => ({
    meta: [
      { title: "Banking — CEA-OS" },
      { name: "description", content: "Payment reconciliation ledger and batches." },
    ],
  }),
  component: AccountantBanking,
});

const paymentTone: Record<string, string> = {
  success: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  failed: "bg-primary/10 text-primary",
};

const batchTone: Record<string, string> = {
  paid: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  failed: "bg-primary/10 text-primary",
};

function AccountantBanking() {
  const history = usePaymentHistory();
  const payments = usePaymentHistoryItems();
  const batches = usePaymentBatches();
  const batchItems = usePaymentBatchItems();

  const collected = payments.reduce((sum, p) => (p.status === "success" ? sum + p.amount : sum), 0);
  const pending = payments.reduce((sum, p) => (p.status === "pending" ? sum + p.amount : sum), 0);
  const matched =
    payments.length > 0
      ? Math.round((payments.filter((p) => p.status === "success").length / payments.length) * 100)
      : 0;

  return (
    <AppShell
      roleKey="finance"
      title="Banking reconciliation"
      subtitle={
        payments.length > 0
          ? `${payments.length} payments · ${formatNaira(collected)} collected`
          : "Loading ledger…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {matched}% matched
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
            label: "Transactions",
            value: payments.length > 0 ? String(payments.length) : "—",
            delta: "in payment ledger",
            icon: Wallet,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Collected",
            value: collected > 0 ? formatNaira(collected) : "—",
            delta: "successful payments",
            icon: Banknote,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Pending",
            value: pending > 0 ? formatNaira(pending) : "—",
            delta: "awaiting confirmation",
            icon: Landmark,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Match rate",
            value: payments.length > 0 ? `${matched}%` : "—",
            delta: "success ratio",
            icon: CheckCircle2,
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
              <ReceiptText className="text-primary size-4" /> Payment ledger
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            <QueryState<Payment[]>
              query={history}
              error={{ title: "Ledger unavailable" }}
              empty={{
                title: "No payments yet",
                description: "Confirmed payment transactions will show here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((p) => (
                    <div
                      key={p.id}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{p.reference}</p>
                        <p className="text-muted-foreground text-xs">
                          {p.description || p.email}
                          {p.provider ? ` · ${p.provider}` : ""}
                        </p>
                      </div>
                      <p className="text-sm font-bold">{formatNaira(p.amount)}</p>
                      <Badge
                        className={cn("border-0 font-semibold capitalize", paymentTone[p.status])}
                      >
                        {p.status}
                      </Badge>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Banknote className="text-primary size-4" /> Settlement batches
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            <QueryState<PaymentBatch[]>
              query={batches}
              error={{ title: "Batches unavailable" }}
              empty={{
                title: "No batches yet",
                description: "Payroll and invoice settlement batches will appear here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((b) => (
                    <div
                      key={b.id}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{b.batch}</p>
                        <p className="text-muted-foreground text-xs">
                          {b.count} recipients · {new Date(b.date).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm font-bold">{formatNaira(b.amount)}</p>
                      <Badge
                        className={cn("border-0 font-semibold capitalize", batchTone[b.status])}
                      >
                        {b.status}
                      </Badge>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
