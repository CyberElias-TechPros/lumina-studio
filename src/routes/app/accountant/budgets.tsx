"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Landmark, PieChart, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useExpenses } from "@/lib/query/finance";
import type { Expense } from "@/lib/api/finance";
import { cn, formatNairaCompact } from "@/lib/utils";

export const Route = createFileRoute("/app/accountant/budgets")({
  head: () => ({
    meta: [
      { title: "Budgets — CEA-OS" },
      { name: "description", content: "Department budgets versus actuals." },
    ],
  }),
  component: AccountantBudgets,
});

interface CategorySpend {
  category: string;
  amount: number;
  pct: number;
}

function groupByCategory(rows: Expense[]): CategorySpend[] {
  const byName = new Map<string, number>();
  for (const row of rows) {
    byName.set(row.category, (byName.get(row.category) ?? 0) + row.amount);
  }
  const total = rows.reduce((s, e) => s + e.amount, 0) || 1;
  return Array.from(byName.entries())
    .map(([category, amount]) => ({ category, amount, pct: Math.round((amount / total) * 100) }))
    .sort((a, b) => b.amount - a.amount);
}

function AccountantBudgets() {
  const query = useExpenses();
  const rows = query.data?.pages.flatMap((p) => p.items) ?? [];
  const total = rows.reduce((s, e) => s + e.amount, 0);
  const categories = groupByCategory(rows);
  const largest = categories[0];
  const nearLimit = categories.filter((c) => c.pct >= 70).length;

  return (
    <AppShell
      roleKey="finance"
      title="Budgets"
      subtitle={`${formatNairaCompact(total)} spent · ${categories.length} categories · ${rows.length} claims`}
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              nearLimit > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
            )}
          >
            {nearLimit > 0 ? `${nearLimit} at ≥70%` : "Within budget"}
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
            label: "Spent (MTD)",
            value: formatNairaCompact(total),
            delta: `${rows.length} claims`,
            icon: PieChart,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Categories",
            value: String(categories.length),
            delta: "tracked",
            icon: TrendingDown,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Largest",
            value: largest ? formatNairaCompact(largest.amount) : "—",
            delta: largest ? `${largest.category} · ${largest.pct}%` : "no spend yet",
            icon: Landmark,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Avg claim",
            value: rows.length ? formatNairaCompact(Math.round(total / rows.length)) : "—",
            delta: "across claims",
            icon: TrendingUp,
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
            <Landmark className="text-primary size-4" /> Spend by category
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <QueryState<Expense[]>
            query={query}
            error={{ title: "Expenses unavailable" }}
            empty={{ title: "No spend yet", description: "Expense claims appear here." }}
          >
            {(claims) => (
              <>
                {groupByCategory(claims).map((c) => (
                  <div key={c.category}>
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>{c.category}</span>
                      <span>
                        {formatNairaCompact(c.amount)} · {c.pct}%
                      </span>
                    </div>
                    <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          c.pct >= 70 ? "bg-warning" : "bg-gradient-brand",
                        )}
                        style={{ width: `${c.pct}%` }}
                      />
                    </div>
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
