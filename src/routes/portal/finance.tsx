import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  FileText,
  Receipt,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { formatNaira } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/finance")({
  head: () => ({
    meta: [
      { title: "Finance Portal — CEA-OS" },
      {
        name: "description",
        content: "Invoices, instalments, scholarships and treasury for the finance office.",
      },
    ],
  }),
  component: FinancePortal,
});

const collections = [
  { label: "Term 2 instalments", pct: 91, due: "₦28.4m of ₦31.2m" },
  { label: "Scholarship drawdowns", pct: 64, due: "₦7.1m of ₦11.2m allocated" },
  { label: "Services invoices", pct: 78, due: "₦21.6m of ₦27.7m" },
];

function FinancePortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="Finance office"
      subtitle="Treasury, billing, scholarships, payroll"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Audit: clean · Q2
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            Balance: {formatNaira(41200000)}
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Receipts (MTD)",
            value: formatNaira(18600000),
            delta: "+18% vs July",
            icon: Wallet,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Outstanding",
            value: formatNaira(9800000),
            delta: "31 invoices",
            icon: Receipt,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Scholarships funded",
            value: formatNaira(11200000),
            delta: "of ₦120m annual",
            icon: ShieldCheck,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Overdue > 30d",
            value: formatNaira(1400000),
            delta: "4 accounts flagged",
            icon: AlertTriangle,
            tone: "bg-error/10 text-error",
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
              <p className="font-display mt-3 text-xl font-extrabold">{k.value}</p>
              <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <TrendingUp className="text-primary size-4" /> Collections dashboard
              </CardTitle>
              <Badge variant="secondary" className="font-semibold">
                Target: 95%
              </Badge>
            </CardHeader>
            <CardContent className="space-y-5">
              {collections.map((c) => (
                <div key={c.label}>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>{c.label}</span>
                    <span className="font-display text-sm font-extrabold">{c.pct}%</span>
                  </div>
                  <Progress value={c.pct} className="mt-1.5 h-2" />
                  <p className="text-muted-foreground mt-1.5 text-xs">{c.due}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <FileText className="text-primary size-4" /> Recent invoices
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
                <Link to="/portal/client">
                  Client view <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="divide-y">
              {[
                {
                  id: "INV-2026-0315",
                  name: "Sabin Holdings · Sprint 6",
                  amount: 420000,
                  status: "Due Aug 20",
                  tone: "bg-warning/10 text-warning",
                },
                {
                  id: "INV-2026-0312",
                  name: "Arewa MFB · Audit phase 2",
                  amount: 680000,
                  status: "Paid",
                  tone: "bg-success/10 text-success",
                },
                {
                  id: "INV-2026-0310",
                  name: "Greenfield · Dev academy Q3",
                  amount: 1150000,
                  status: "Paid",
                  tone: "bg-success/10 text-success",
                },
              ].map((i) => (
                <div
                  key={i.id}
                  className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                    <Receipt className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{i.name}</p>
                    <p className="text-muted-foreground font-mono text-xs">{i.id}</p>
                  </div>
                  <span className="font-display text-sm font-extrabold">
                    {formatNaira(i.amount)}
                  </span>
                  <Badge className={cn("border-0 font-semibold", i.tone)}>{i.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Banknote className="text-primary size-4" /> Instalment plans
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  t: "Active plans",
                  d: "146 learners · 0 defaults this term",
                  tone: "bg-success/10 text-success",
                },
                {
                  t: "Deferred (post-placement)",
                  d: "9 learners · ₦7.4m committed",
                  tone: "bg-primary/10 text-primary",
                },
                {
                  t: "Employer sponsorships",
                  d: "12 letters drafted this month",
                  tone: "bg-learning/10 text-learning",
                },
              ].map((x) => (
                <div key={x.t} className="rounded-xl border p-3.5">
                  <p className="text-sm font-bold">{x.t}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{x.d}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <ShieldCheck className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Financial health</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Runway 14 months. Collections on track. Scholarship fund drawdowns within budget.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/portal/executive">
                  Executive view <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
