"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowDownUp, CheckCircle2, ReceiptText, Wallet } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useCreatePaymentBatch, usePaymentBatches } from "@/lib/query/finance";
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
  const create = useCreatePaymentBatch();
  const batches = query.data?.pages.flatMap((p) => p.items) ?? [];
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<PaymentBatch | null>(null);
  const [batch, setBatch] = useState("");
  const [amount, setAmount] = useState("");
  const [count, setCount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const submitBatch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedAmount = Number(amount);
    const parsedCount = Number(count);
    if (
      !batch.trim() ||
      !Number.isInteger(parsedAmount) ||
      parsedAmount < 0 ||
      !Number.isInteger(parsedCount) ||
      parsedCount < 1 ||
      !date
    ) {
      return;
    }
    create.mutate(
      { batch: batch.trim(), amount: parsedAmount, count: parsedCount, date },
      {
        onSuccess: () => {
          setDialogOpen(false);
          setBatch("");
          setAmount("");
          setCount("");
          toast.success("Payment batch registered");
        },
      },
    );
  };

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

      <Dialog
        open={selectedBatch !== null}
        onOpenChange={(open) => !open && setSelectedBatch(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment batch details</DialogTitle>
            <DialogDescription>{selectedBatch?.id}</DialogDescription>
          </DialogHeader>
          {selectedBatch && (
            <dl className="grid gap-3 rounded-xl border p-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground text-xs font-semibold">Batch</dt>
                <dd className="mt-1 font-bold">{selectedBatch.batch}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs font-semibold">Total</dt>
                <dd className="mt-1 font-bold">{formatNaira(selectedBatch.amount)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs font-semibold">Transactions</dt>
                <dd className="mt-1 font-bold">{selectedBatch.count}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs font-semibold">Status</dt>
                <dd className="mt-1 font-bold">{selectedBatch.status}</dd>
              </div>
            </dl>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register payment batch</DialogTitle>
            <DialogDescription>
              Record an incoming or outgoing batch for reconciliation. New batches need approval.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitBatch} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="batch-name" className="text-sm font-semibold">
                Batch name
              </label>
              <Input
                id="batch-name"
                value={batch}
                onChange={(event) => setBatch(event.target.value)}
                placeholder="e.g. August tuition instalments"
                maxLength={160}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="batch-amount" className="text-sm font-semibold">
                  Total (NGN)
                </label>
                <Input
                  id="batch-amount"
                  type="number"
                  min={0}
                  step={1}
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="4800000"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="batch-count" className="text-sm font-semibold">
                  Transactions
                </label>
                <Input
                  id="batch-count"
                  type="number"
                  min={1}
                  step={1}
                  value={count}
                  onChange={(event) => setCount(event.target.value)}
                  placeholder="22"
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="batch-date" className="text-sm font-semibold">
                Batch date
              </label>
              <Input
                id="batch-date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </div>
            {create.error && (
              <p role="alert" className="text-destructive text-sm">
                {create.error.message}
              </p>
            )}
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={create.isPending || !batch.trim() || !amount || !count || !date}
              >
                {create.isPending ? "Registering…" : "Register batch"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <ArrowDownUp className="text-primary size-4" /> Recent batches
          </CardTitle>
          <Button
            size="sm"
            className="bg-gradient-brand shadow-glow border-0 font-semibold"
            onClick={() => setDialogOpen(true)}
          >
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 font-semibold"
                      onClick={() => setSelectedBatch(b)}
                    >
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
