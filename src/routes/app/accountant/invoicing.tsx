import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, FilePlus2, Mail, ReceiptText, Send } from "lucide-react";
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
import { useCreateInvoice, useInvoices, useUpdateInvoiceStatus } from "@/lib/query/finance";
import type { Invoice } from "@/lib/api/finance";
import { cn, formatNaira, formatNairaCompact } from "@/lib/utils";

export const Route = createFileRoute("/app/accountant/invoicing")({
  head: () => ({
    meta: [
      { title: "Invoicing — CEA-OS" },
      { name: "description", content: "Create, send and track invoices." },
    ],
  }),
  component: AccountantInvoicing,
});

function invoiceTone(status: string): string {
  const normalized = status.toLowerCase();
  if (normalized === "paid") return "bg-success/10 text-success";
  if (normalized === "overdue") return "bg-destructive/10 text-destructive";
  return "bg-primary/10 text-primary";
}

function InvoiceActions({ invoice, onView }: { invoice: Invoice; onView: () => void }) {
  const update = useUpdateInvoiceStatus();
  const isDraft = invoice.status.toLowerCase() === "draft";

  return (
    <div className="flex shrink-0 gap-2">
      {isDraft && (
        <Button
          size="sm"
          className="font-semibold"
          disabled={update.isPending}
          onClick={() =>
            update.mutate(
              { id: invoice.id, status: "sent" },
              { onSuccess: () => toast.success("Invoice marked as sent") },
            )
          }
        >
          {update.isPending ? "Sending…" : "Send"}
        </Button>
      )}
      <Button variant="outline" size="sm" className="font-semibold" onClick={onView}>
        View
      </Button>
    </div>
  );
}

function AccountantInvoicing() {
  const query = useInvoices();
  const create = useCreateInvoice();
  const rows = query.data?.pages.flatMap((p) => p.items) ?? [];
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [party, setParty] = useState("");
  const [amount, setAmount] = useState("");
  const [due, setDue] = useState(() =>
    new Date(Date.now() + 14 * 86_400_000).toISOString().slice(0, 10),
  );

  const resetForm = () => {
    setParty("");
    setAmount("");
    setDue(new Date(Date.now() + 14 * 86_400_000).toISOString().slice(0, 10));
  };

  const submitInvoice = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedAmount = Number(amount);
    if (!party.trim() || !Number.isInteger(parsedAmount) || parsedAmount < 1 || !due) return;
    create.mutate(
      { party: party.trim(), amount: parsedAmount, due },
      {
        onSuccess: () => {
          setDialogOpen(false);
          resetForm();
          toast.success("Invoice created", {
            description: "The new invoice is now in receivables.",
          });
        },
      },
    );
  };

  const billed = rows.reduce((s, i) => s + i.amount, 0);
  const collected = rows
    .filter((i) => i.status.toLowerCase() === "paid")
    .reduce((s, i) => s + i.amount, 0);
  const outstanding = billed - collected;
  const overdueRows = rows.filter((i) => i.status.toLowerCase() === "overdue");
  const overdue = overdueRows.length;

  return (
    <AppShell
      roleKey="finance"
      title="Invoicing"
      subtitle={`${rows.length} invoices this month · ${formatNairaCompact(billed)} billed`}
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            {overdue} overdue
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
            label: "Billed (MTD)",
            value: formatNairaCompact(billed),
            delta: `${rows.length} invoices`,
            icon: ReceiptText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Collected",
            value: formatNairaCompact(collected),
            delta: `${collected === 0 ? "0" : Math.round((collected / billed) * 100)}% collection`,
            icon: Mail,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Outstanding",
            value: formatNairaCompact(outstanding),
            delta: `${formatNairaCompact(overdueRows.reduce((s, i) => s + i.amount, 0))} overdue`,
            icon: FilePlus2,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Avg. DSO",
            value: "18 days",
            delta: "down 3 days",
            icon: Send,
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

      <Dialog
        open={selectedInvoice !== null}
        onOpenChange={(open) => !open && setSelectedInvoice(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invoice details</DialogTitle>
            <DialogDescription>{selectedInvoice?.id}</DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <dl className="grid gap-3 rounded-xl border p-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground text-xs font-semibold">Customer or learner</dt>
                <dd className="mt-1 font-bold">{selectedInvoice.party}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs font-semibold">Amount</dt>
                <dd className="mt-1 font-bold">{formatNaira(selectedInvoice.amount)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs font-semibold">Due date</dt>
                <dd className="mt-1 font-bold">{selectedInvoice.due}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs font-semibold">Status</dt>
                <dd className="mt-1 font-bold">{selectedInvoice.status}</dd>
              </div>
            </dl>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create invoice</DialogTitle>
            <DialogDescription>
              Add a receivable to the finance ledger. Review it before sending.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitInvoice} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="invoice-party" className="text-sm font-semibold">
                Customer or learner
              </label>
              <Input
                id="invoice-party"
                value={party}
                onChange={(event) => setParty(event.target.value)}
                placeholder="e.g. Ada Okafor"
                required
                maxLength={160}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="invoice-amount" className="text-sm font-semibold">
                  Amount (NGN)
                </label>
                <Input
                  id="invoice-amount"
                  type="number"
                  min={1}
                  step={1}
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="140000"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="invoice-due" className="text-sm font-semibold">
                  Due date
                </label>
                <Input
                  id="invoice-due"
                  type="date"
                  value={due}
                  onChange={(event) => setDue(event.target.value)}
                  required
                />
              </div>
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
              <Button type="submit" disabled={create.isPending || !party.trim() || !amount || !due}>
                {create.isPending ? "Creating…" : "Create invoice"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <ReceiptText className="text-primary size-4" /> Recent invoices
          </CardTitle>
          <Button
            size="sm"
            className="bg-gradient-brand shadow-glow border-0 font-semibold"
            onClick={() => setDialogOpen(true)}
          >
            <FilePlus2 className="size-4" /> New invoice
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<Invoice[]> query={query} error={{ title: "Invoices unavailable" }}>
            {(invoices) => (
              <>
                {invoices.map((i) => (
                  <div
                    key={i.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">
                        {i.id} · {i.party}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {formatNaira(i.amount)} · Due {i.due}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", invoiceTone(i.status))}>
                      {i.status}
                    </Badge>
                    <InvoiceActions invoice={i} onView={() => setSelectedInvoice(i)} />
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
