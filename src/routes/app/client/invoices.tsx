"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link, useNavigate } from "@/lib/next-compat/router";
import { ArrowLeft, CreditCard, Download, FileText, Loader2, Receipt, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { CliInvoice } from "@/lib/query/clientEngagement";
import { useCliInvoices } from "@/lib/query/clientEngagement";
import { formatNaira } from "@/data/site";
import { useCreateCheckout } from "@/lib/query/payments";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/client/invoices")({
  head: () => ({
    meta: [
      { title: "Invoices & Payments — CEA-OS" },
      { name: "description", content: "Project invoices, payments and receipts." },
    ],
  }),
  component: ClientInvoices,
});

function statusTone(s: string) {
  const l = s.toLowerCase();
  if (l.includes("paid")) return "bg-success/10 text-success";
  if (l.includes("due") || l.includes("pending")) return "bg-warning/10 text-warning";
  return "bg-muted-foreground/10 text-muted-foreground";
}

function ClientInvoices() {
  const invoicesQuery = useCliInvoices();
  const checkout = useCreateCheckout();
  const navigate = useNavigate();

  const payOutstanding = () => {
    checkout.mutate(
      {
        amount: 175000,
        description: "CEA Studio project milestone",
        redirectUrl: `${window.location.origin}/app/finance/pay-verify`,
      },
      {
        onSuccess: (result) => {
          if (result.mock) {
            navigate({ to: "/app/finance/pay-verify", search: { reference: result.reference } });
          } else {
            window.open(result.authorizationUrl, "_blank", "noopener,noreferrer");
          }
        },
      },
    );
  };

  return (
    <AppShell
      roleKey="client"
      title="Invoices & payments"
      subtitle="CEA Studio · OrderPadi project"
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            {formatNaira(175000)} due Aug 25
          </Badge>
          <Button size="sm" onClick={payOutstanding} disabled={checkout.isPending}>
            {checkout.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <CreditCard className="size-4" />
            )}
            {checkout.isPending ? "Opening payment…" : "Pay online"}
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total project",
            value: formatNaira(700000),
            delta: "fixed scope",
            icon: FileText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Paid",
            value: formatNaira(525000),
            delta: "75% complete",
            icon: Receipt,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Outstanding",
            value: formatNaira(175000),
            delta: "due Aug 25",
            icon: Wallet,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Payment terms",
            value: "25 / 25 / 25 / 25",
            delta: "4 milestones",
            icon: CreditCard,
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
            <Receipt className="text-primary size-4" /> Invoices
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<CliInvoice[]>
            query={invoicesQuery}
            error={{ title: "Invoices unavailable" }}
            empty={{
              title: "No invoices",
              description: "Your invoices will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((i) => (
                  <div
                    key={i.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                      <Receipt className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{i.title}</p>
                      <p className="text-muted-foreground text-xs">{i.reference}</p>
                    </div>
                    <span className="text-sm font-extrabold">{i.amount}</span>
                    <Badge className={cn("border-0 font-semibold", statusTone(i.status))}>
                      {i.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary shrink-0 font-semibold"
                      onClick={() => window.print()}
                      title="Open the browser print dialog, then choose Save as PDF"
                    >
                      <Download className="size-3.5" /> Print / save PDF
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
