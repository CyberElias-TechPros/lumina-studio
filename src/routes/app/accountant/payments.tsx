import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowDownUp, CheckCircle2, ReceiptText, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { usePaymentBatches } from "@/lib/query/finance";
import type { PaymentBatch } from "@/lib/api/finance";
import { cn, formatNaira, formatNairaCompact } from "@/lib/utils";

export const Route = createFileRoute("/app/accountant/payments")({
  head: () => ({
    meta: [
      { title: "Payments — CEA-OS" },
      { name: "description", content: "Manual and batch payments with reconciliation." },
    ],
  }),
  component: AccountantPayments,
});

function batchTone(status: string): string {
  if (status === "Reconciled") return "bg-success/10 text-success";
  return "bg-warning/10 text-warning";
}

function AccountantPayments() {
  const query = usePaymentBatches();
  const batches = query.data?.pages.flatMap((p) => p.items) ?? [];
  const processed = batches.reduce((s, b) => s + b.amount, 0);
  const pending = batches.filter((b) => b.status !== "Reconciled");

  return (
    <AppShell
      roleKey="finance"
      title="Payments"
      subtitle={`${batches.reduce((s, b) => s + b.count, 0)} transactions · ${formatNairaCompact(processed)} processed`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {pending.length} batch pending
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
            label: "Processed",
            value: formatNairaCompact(processed),
            delta: `${batches.length} batches`,
            icon: Wallet,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Payments",
            value: String(batches.reduce((s, b) => s + b.count, 0)),
            delta: "across batches",
            icon: ArrowDownUp,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Batch pending",
            value: String(pending.length),
            delta: formatNairaCompact(pending.reduce((s, b) => s + b.amount, 0)),
            icon: ReceiptText,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Reconciled",
            value: batches.length
              ? `${Math.round((batches.filter((b) => b.status === "Reconciled").length / batches.length) * 100)}%`
              : "—",
            delta: "of batches",
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
          <QueryState<PaymentBatch[]> query={query} error={{ title: "Batches unavailable" }}>
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
                        {formatNaira(b.amount)} · {b.count} payments · {b.date}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", batchTone(b.status))}>
                      {b.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      View
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
