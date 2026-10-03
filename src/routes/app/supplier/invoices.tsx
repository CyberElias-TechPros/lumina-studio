"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Banknote, CheckCircle2, Clock3, Receipt } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useSupInvoiceItems, useSupInvoices } from "@/lib/query/supplierPartner";
import type { SupInvoice } from "@/lib/api/supplierPartner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/supplier/invoices")({
  head: () => ({
    meta: [
      { title: "Invoices — CEA-OS" },
      { name: "description", content: "Submit and track invoice payments." },
    ],
  }),
  component: SupplierInvoices,
});

const formatNaira = (n: number) => (n >= 1000 ? `₦${(n / 1000).toFixed(0)}k` : `₦${n}`);

const statusMeta: Record<string, { label: string; tone: string }> = {
  "awaiting payment": { label: "Awaiting payment", tone: "bg-warning/10 text-warning" },
  paid: { label: "Paid", tone: "bg-success/10 text-success" },
};

function SupplierInvoices() {
  const invoicesQuery = useSupInvoices();
  const invoices = useSupInvoiceItems();

  const outstanding = invoices.filter((i) => i.status === "awaiting payment");
  const outstandingValue = outstanding.reduce((n, i) => n + i.amount, 0);
  const paid = invoices.filter((i) => i.status === "paid");
  const paidValue = paid.reduce((n, i) => n + i.amount, 0);

  return (
    <AppShell
      roleKey="supplier"
      title="Invoices"
      subtitle={
        invoices.length > 0
          ? `${formatNaira(outstandingValue)} outstanding · avg. paid in 14 days`
          : "Auto-synced with CEA finance"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            avg. 14 days to pay
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/supplier">
              <ArrowLeft className="size-4" /> Supplier hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Outstanding",
            value: invoices.length > 0 ? formatNaira(outstandingValue) : "—",
            delta: `${outstanding.length} invoices`,
            icon: Banknote,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Paid (30d)",
            value: invoices.length > 0 ? formatNaira(paidValue) : "—",
            delta: `${paid.length} invoices`,
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Invoices",
            value: invoices.length > 0 ? String(invoices.length) : "—",
            delta: "FY 2026",
            icon: Receipt,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Avg. days to pay",
            value: invoices.length > 0 ? "14" : "—",
            delta: "net-30 terms",
            icon: Clock3,
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
            <Receipt className="text-primary size-4" /> Invoice history
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<SupInvoice[]>
            query={invoicesQuery}
            error={{ title: "Invoices unavailable" }}
            empty={{ title: "No invoices", description: "Invoice history will show here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((inv) => {
                  const meta = statusMeta[inv.status] ?? {
                    label: inv.status,
                    tone: "bg-muted text-muted-foreground",
                  };
                  return (
                    <div
                      key={inv.id}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">
                          {inv.ref} · {formatNaira(inv.amount)}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {inv.issuedLabel}
                          {inv.paidLabel ? ` · ${inv.paidLabel}` : ""}
                        </p>
                      </div>
                      <Badge className={cn("border-0 font-semibold", meta.tone)}>
                        {meta.label}
                      </Badge>
                      {inv.status === "awaiting payment" ? (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="shrink-0 font-semibold"
                        >
                          <a
                            href={`mailto:procurement@cea.ng?subject=${encodeURIComponent(`Invoice follow-up: ${inv.ref}`)}`}
                          >
                            Follow up
                          </a>
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="shrink-0 font-semibold"
                          onClick={() => window.print()}
                          title="Open the browser print dialog, then choose Save as PDF"
                        >
                          Receipt
                        </Button>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
