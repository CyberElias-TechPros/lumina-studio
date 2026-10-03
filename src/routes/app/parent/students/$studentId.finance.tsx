"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link, useNavigate } from "@/lib/next-compat/router";
import { useCreateCheckout } from "@/lib/query/payments";
import {
  ArrowLeft,
  Banknote,
  CreditCard,
  Download,
  Receipt,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useParentFinance, useParentStudent } from "@/lib/query/parent";
import { formatNaira } from "@/data/site";
import type { ParentFinance } from "@/lib/api/parent";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/parent/students/$studentId/finance")({
  head: () => ({
    meta: [
      { title: "Finance & Billing — CEA-OS" },
      { name: "description", content: "Billing and payments for parents." },
    ],
  }),
  component: ParentStudentFinance,
});

function invoiceTone(status: string): string {
  if (status.toLowerCase() === "paid") return "bg-success/10 text-success";
  if (status.toLowerCase() === "overdue") return "bg-destructive/10 text-destructive";
  return "bg-warning/10 text-warning";
}

function ParentStudentFinance() {
  const { studentId } = Route.useParams();
  const finance = useParentFinance(studentId);
  const student = useParentStudent(studentId);
  const data = finance.data;
  const name = student.data?.name;
  const checkout = useCreateCheckout();
  const navigate = useNavigate();

  const payOutstanding = (amount: number) => {
    if (amount < 1 || checkout.isPending) return;
    checkout.mutate(
      {
        amount,
        description: `${name ?? "Learner"} tuition payment`,
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
      roleKey="parent"
      title={name ? `${name} · Finance` : "Finance & billing"}
      subtitle={
        data
          ? `${data.items.length} ${data.items.length === 1 ? "invoice" : "invoices"} on file`
          : "Loading…"
      }
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            {data ? `${formatNaira(data.totals.outstanding)} due` : "Loading…"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/parent/students/$studentId" params={{ studentId }}>
              <ArrowLeft className="size-4" /> Overview
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<ParentFinance>
        query={finance}
        error={{ title: "Billing record unavailable" }}
        empty={{
          title: "No invoices yet",
          description: "This learner has no billing activity on file.",
        }}
      >
        {(current) => {
          const billed = current.totals.paid + current.totals.outstanding;
          const kpis = [
            {
              label: "Balance due",
              value: formatNaira(current.totals.outstanding),
              delta: `${current.totals.count} outstanding`,
              icon: Wallet,
              tone: "bg-warning/10 text-warning",
            },
            {
              label: "Paid to date",
              value: formatNaira(current.totals.paid),
              delta: "settled invoices",
              icon: Banknote,
              tone: "bg-primary/10 text-primary",
            },
            {
              label: "Total billed",
              value: formatNaira(billed),
              delta: "all time",
              icon: ShieldCheck,
              tone: "bg-success/10 text-success",
            },
            {
              label: "Invoices",
              value: String(current.items.length),
              delta: "on this account",
              icon: CreditCard,
              tone: "bg-learning/10 text-learning",
            },
          ];
          return (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
                      <p className="text-muted-foreground mt-0.5 text-xs font-semibold">
                        {k.delta}
                      </p>
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
                    {current.items.length === 0 ? (
                      <p className="text-muted-foreground text-sm">Nothing on file yet.</p>
                    ) : (
                      current.items.map((i) => {
                        const paid = i.status.toLowerCase() === "paid";
                        return (
                          <div
                            key={i.id}
                            className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                          >
                            <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                              <Receipt className="size-4" />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-bold">{i.party}</p>
                              <p className="text-muted-foreground text-xs">
                                {i.id} · due {i.due || "—"}
                              </p>
                            </div>
                            <span className="text-sm font-extrabold">{formatNaira(i.amount)}</span>
                            <Badge className={cn("border-0 font-semibold", invoiceTone(i.status))}>
                              {i.status}
                            </Badge>
                            {paid && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary shrink-0 font-semibold"
                                onClick={() => window.print()}
                                title="Open the browser print dialog, then choose Save as PDF"
                              >
                                <Download className="size-3.5" /> Print receipt
                              </Button>
                            )}
                          </div>
                        );
                      })
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
                  <CardContent className="p-6">
                    <CreditCard className="text-warning size-5" />
                    <p className="font-display mt-3 text-base font-extrabold">Pay online</p>
                    <p className="text-ink-foreground/70 mt-1 text-sm">
                      Card, bank transfer or USSD — receipts land in your email instantly and the
                      registrar's ledger updates automatically.
                    </p>
                    <Button
                      className="bg-ink-foreground text-ink mt-4 w-full font-semibold hover:bg-ink-foreground/90"
                      onClick={() => payOutstanding(current.totals.outstanding)}
                      disabled={checkout.isPending || current.totals.outstanding < 1}
                    >
                      {checkout.isPending
                        ? "Opening payment…"
                        : `Pay ${formatNaira(current.totals.outstanding)} now`}
                    </Button>
                    {checkout.error && (
                      <p role="alert" className="text-destructive mt-2 text-xs font-semibold">
                        {checkout.error.message}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          );
        }}
      </QueryState>
    </AppShell>
  );
}
