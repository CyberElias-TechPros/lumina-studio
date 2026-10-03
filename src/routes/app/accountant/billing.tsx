"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Banknote, CalendarClock, CheckCircle2, Hourglass, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useInvoices, useUpdateInvoiceStatus } from "@/lib/query/finance";
import type { Invoice } from "@/lib/api/finance";
import { cn, formatNaira, formatNairaCompact } from "@/lib/utils";

export const Route = createFileRoute("/app/accountant/billing")({
  head: () => ({
    meta: [
      { title: "Billing — CEA-OS" },
      { name: "description", content: "Accounts payable and payment schedules." },
    ],
  }),
  component: AccountantBilling,
});

function invoiceTone(status: string): string {
  if (status === "Paid") return "bg-success/10 text-success";
  if (status === "Overdue") return "bg-destructive/10 text-destructive";
  return "bg-primary/10 text-primary";
}

function AccountantBilling() {
  const query = useInvoices();
  const rows = query.data?.pages.flatMap((p) => p.items) ?? [];
  const settle = useUpdateInvoiceStatus();

  const open = rows.filter((i) => i.status !== "Paid");
  const openTotal = open.reduce((s, i) => s + i.amount, 0);
  const paid = rows.filter((i) => i.status === "Paid");
  const paidTotal = paid.reduce((s, i) => s + i.amount, 0);
  const overdue = rows.filter((i) => i.status === "Overdue");
  const overdueTotal = overdue.reduce((s, i) => s + i.amount, 0);

  return (
    <AppShell
      roleKey="finance"
      title="Billing · AP"
      subtitle={`${formatNairaCompact(openTotal)} payable · ${overdue.length} overdue · ${paid.length} paid`}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              overdue.length > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
            )}
          >
            {overdue.length > 0 ? `${overdue.length} overdue` : "Healthy AP"}
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
            label: "Payable",
            value: formatNairaCompact(openTotal),
            delta: `${open.length} open bills`,
            icon: Banknote,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Paid (30d)",
            value: formatNairaCompact(paidTotal),
            delta: `${paid.length} bills`,
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Overdue",
            value: String(overdue.length),
            delta: formatNairaCompact(overdueTotal),
            icon: CalendarClock,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Collection rate",
            value: collectionRate(rows),
            delta: "of billed",
            icon: Hourglass,
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
            <Banknote className="text-primary size-4" /> Bills & statements
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<Invoice[]> query={query} error={{ title: "Invoices unavailable" }}>
            {(bills) => (
              <>
                {bills.map((b) => (
                  <div
                    key={b.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">
                        {b.party} · {b.id}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {formatNaira(b.amount)} · Due {b.due}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", invoiceTone(b.status))}>
                      {b.status}
                    </Badge>
                    {b.status !== "Paid" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="shrink-0 font-semibold"
                        disabled={settle.isPending}
                        onClick={() => settle.mutate({ id: b.id, status: "paid" })}
                      >
                        {settle.isPending ? <Loader2 className="size-3.5 animate-spin" /> : null}
                        Pay
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" className="text-muted-foreground shrink-0">
                        View
                      </Button>
                    )}
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

function collectionRate(rows: Invoice[]): string {
  const billed = rows.reduce((s, i) => s + i.amount, 0);
  if (billed === 0) return "—";
  const paid = rows.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  return `${Math.round((paid / billed) * 100)}%`;
}
