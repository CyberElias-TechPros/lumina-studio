"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, BadgeCheck, CheckCircle2, Clock3, PlusCircle, ReceiptText } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { ExpenseForm } from "@/components/finance/expense-form";
import { useExpenses, useExpenseItems, useUpdateExpenseStatus } from "@/lib/query/finance";
import type { Expense } from "@/lib/api/finance";
import { cn, formatNaira, formatNairaCompact } from "@/lib/utils";

export const Route = createFileRoute("/app/accountant/expenses")({
  head: () => ({
    meta: [
      { title: "Expenses — CEA-OS" },
      { name: "description", content: "Claim, approve and reimburse expenses." },
    ],
  }),
  component: AccountantExpenses,
});

function ReviewButton({ expense }: { expense: Expense }) {
  const update = useUpdateExpenseStatus();
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState<"approved" | "rejected">("approved");

  if (done) {
    return <Badge className="bg-success/10 text-success border-0 font-semibold">{status}</Badge>;
  }

  return (
    <div className="flex shrink-0 gap-1">
      <Button
        size="sm"
        className="h-8 px-2 text-xs"
        disabled={update.isPending}
        onClick={() => {
          setStatus("approved");
          update.mutate({ id: expense.id, status: "approved" }, { onSuccess: () => setDone(true) });
        }}
      >
        Approve
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="h-8 px-2 text-xs"
        disabled={update.isPending}
        onClick={() => {
          setStatus("rejected");
          update.mutate({ id: expense.id, status: "rejected" }, { onSuccess: () => setDone(true) });
        }}
      >
        Reject
      </Button>
    </div>
  );
}

function AccountantExpenses() {
  const query = useExpenses();
  const rows = useExpenseItems();
  const claimed = rows.reduce((s, e) => s + e.amount, 0);

  return (
    <AppShell
      roleKey="finance"
      title="Expenses"
      subtitle={`${formatNairaCompact(claimed)} this month · ${rows.length} categories`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Policy compliant
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
            label: "Claimed (MTD)",
            value: formatNairaCompact(claimed),
            delta: `${rows.length} categories`,
            icon: ReceiptText,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Approved",
            value: "₦980k",
            delta: "15 claims",
            icon: BadgeCheck,
            tone: "bg-success/10 text-success",
          },
          {
            label: "In review",
            value: "5",
            delta: "₦310k value",
            icon: Clock3,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Reimbursed",
            value: "₦860k",
            delta: "via next payroll",
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <PlusCircle className="text-primary size-4" /> Record an expense
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseForm />
          <p className="text-muted-foreground mt-3 text-[11px]">
            Entries land in the same ledger the monthly P&amp;L CSV reads, so there is nothing to
            re-type at month end.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <ReceiptText className="text-primary size-4" /> Spending by category
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<Expense[]> query={query} error={{ title: "Expenses unavailable" }}>
            {(claims) => (
              <>
                {claims.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{c.category}</p>
                      <p className="text-muted-foreground text-xs">{formatNaira(c.amount)}</p>
                    </div>
                    <Badge variant="secondary" className="font-semibold">
                      Logged
                    </Badge>
                    <ReviewButton expense={c} />
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
