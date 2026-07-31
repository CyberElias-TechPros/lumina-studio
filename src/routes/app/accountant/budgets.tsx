import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Landmark, PieChart, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/accountant/budgets")({
  head: () => ({
    meta: [
      { title: "Budgets — CEA-OS" },
      { name: "description", content: "Department budgets versus actuals." },
    ],
  }),
  component: AccountantBudgets,
});

const budgets = [
  { b: "Academic", v: "₦8.4m of ₦13m", pct: 65, tone: "bg-primary/10 text-primary" },
  { b: "Operations", v: "₦3.2m of ₦5.1m", pct: 63, tone: "bg-learning/10 text-learning" },
  { b: "Marketing", v: "₦1.4m of ₦2.0m", pct: 70, tone: "bg-warning/10 text-warning" },
  { b: "People", v: "₦2.1m of ₦4.6m", pct: 46, tone: "bg-success/10 text-success" },
];

function AccountantBudgets() {
  return (
    <AppShell
      roleKey="instructor"
      title="Budgets"
      subtitle="2026 budget · ₦47m annual · 64% used by month 7"
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            1 dept near limit
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
            label: "Annual budget",
            value: "₦47m",
            delta: "across 6 depts",
            icon: PieChart,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Used YTD",
            value: "64%",
            delta: "₦30m spent",
            icon: TrendingDown,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Remaining",
            value: "₦17m",
            delta: "5 months left",
            icon: Landmark,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Over budget",
            value: "0",
            delta: "1 at 85%",
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
            <Landmark className="text-primary size-4" /> Dept budgets vs actual
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {budgets.map((b) => (
            <div key={b.b}>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>{b.b}</span>
                <span>
                  {b.v} · {b.pct}%
                </span>
              </div>
              <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                <div
                  className={cn(
                    "h-full rounded-full",
                    b.pct >= 70 ? "bg-warning" : "bg-gradient-brand",
                  )}
                  style={{ width: `${b.pct}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
