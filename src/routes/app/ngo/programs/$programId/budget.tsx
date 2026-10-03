"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, ArrowRight, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { NgoExpenseLine } from "@/lib/api/ngo";
import { useNgoExpenses } from "@/lib/query/ngo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ngo/programs/$programId/budget")({
  head: () => ({
    meta: [
      { title: "Program Budget — CEA-OS" },
      { name: "description", content: "Budget and expenses per program." },
    ],
  }),
  component: NgoProgramBudget,
});

const tones = [
  "bg-success/10 text-success",
  "bg-primary/10 text-primary",
  "bg-warning/10 text-warning",
  "bg-muted-foreground/10 text-muted-foreground",
];

function NgoProgramBudget() {
  const expensesQuery = useNgoExpenses();

  return (
    <AppShell
      roleKey="ngo"
      title="Program budget"
      subtitle="STEM Saturdays · FY 2026"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">74% used</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/ngo/programs">
              <ArrowLeft className="size-4" /> Programs
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Budget",
            value: "₦5.0m",
            delta: "approved",
            icon: Wallet,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Committed",
            value: "₦3.7m",
            delta: "74%",
            icon: Wallet,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Remaining",
            value: "₦1.3m",
            delta: "26% left",
            icon: Wallet,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Overspend",
            value: "₦0",
            delta: "within budget",
            icon: Wallet,
            tone: "bg-warning/10 text-warning",
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
            <ArrowRight className="text-primary size-4" /> Expense lines
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<NgoExpenseLine[]>
            query={expensesQuery}
            error={{ title: "Expenses unavailable" }}
            empty={{
              title: "No expense lines yet",
              description: "Budget lines will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((l, i) => (
                  <div
                    key={l.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{l.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {l.amount} · {l.pct}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", tones[i % tones.length])}>
                      {l.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Details
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
