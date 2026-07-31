import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Landmark,
  ReceiptText,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/director/finance")({
  head: () => ({
    meta: [
      { title: "Financial Overview — CEA-OS" },
      { name: "description", content: "Revenue, expenses and forecasts at a glance." },
    ],
  }),
  component: DirectorFinance,
});

const streams = [
  { s: "Tuition & instalments", v: "₦12.4m", pct: 67, tone: "bg-primary/10 text-primary" },
  { s: "Client services", v: "₦4.1m", pct: 22, tone: "bg-learning/10 text-learning" },
  { s: "Grants & partnerships", v: "₦2.1m", pct: 11, tone: "bg-success/10 text-success" },
];

const expenses = [
  { e: "Payroll & benefits", v: "₦7.8m", pct: 58 },
  { e: "Facilities & utilities", v: "₦2.6m", pct: 19 },
  { e: "Supplies & vendors", v: "₦1.7m", pct: 13 },
  { e: "Marketing", v: "₦1.4m", pct: 10 },
];

function DirectorFinance() {
  return (
    <AppShell
      roleKey="admin"
      title="Financial overview"
      subtitle="MTD · ₦18.6m revenue · ₦13.5m expenses · 27% margin"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Cash healthy</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/director">
              <ArrowLeft className="size-4" /> Director portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Revenue (MTD)",
            value: "₦18.6m",
            delta: "+18% MoM",
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Expenses (MTD)",
            value: "₦13.5m",
            delta: "-2% MoM",
            icon: TrendingDown,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Gross margin",
            value: "27%",
            delta: "target 30%",
            icon: Wallet,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Receivables",
            value: "₦9.4m",
            delta: "₦2.1m overdue",
            icon: ReceiptText,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Landmark className="text-primary size-4" /> Revenue mix
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {streams.map((s) => (
              <div key={s.s}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>{s.s}</span>
                  <span>
                    {s.v} · {s.pct}%
                  </span>
                </div>
                <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                  <div
                    className="bg-gradient-brand h-full rounded-full"
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <TrendingDown className="text-primary size-4" /> Expense breakdown
            </CardTitle>
            <Button asChild variant="outline" size="sm" className="font-semibold">
              <Link to="/app/director/reports">
                Drill down <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {expenses.map((e) => (
              <div key={e.e}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>{e.e}</span>
                  <span>
                    {e.v} · {e.pct}%
                  </span>
                </div>
                <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                  <div className="bg-ink h-full rounded-full" style={{ width: `${e.pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
