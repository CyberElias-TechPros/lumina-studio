import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/director/command-center")({
  head: () => ({
    meta: [
      { title: "Command Center — CEA-OS" },
      {
        name: "description",
        content: "Real-time organisational KPIs and health for the director.",
      },
    ],
  }),
  component: DirectorCommandCenter,
});

const health = [
  {
    k: "Financial health",
    v: "Green",
    d: "Revenue +18% MoM · burn in band",
    tone: "bg-success/10 text-success",
  },
  {
    k: "Academic health",
    v: "Amber",
    d: "Completion 84% vs 88% target",
    tone: "bg-warning/10 text-warning",
  },
  {
    k: "People health",
    v: "Green",
    d: "eNPS 61 · turnover 8%",
    tone: "bg-success/10 text-success",
  },
  { k: "Reputation", v: "Green", d: "NPS 72 · 0 escalations", tone: "bg-success/10 text-success" },
];

const alerts = [
  {
    a: "Marketing ROAS 4.2x — below 5x target",
    d: "2 days open · flag for review",
    tone: "bg-warning/10 text-warning",
  },
  {
    a: "Abeokuta branch utilization 53%",
    d: "Below 70% floor · ops plan due",
    tone: "bg-primary/10 text-primary",
  },
  {
    a: "3 approvals waiting > 48h",
    d: "Budgets · hire requests",
    tone: "bg-learning/10 text-learning",
  },
];

function DirectorCommandCenter() {
  return (
    <AppShell
      roleKey="admin"
      title="Executive command center"
      subtitle="Real-time KPIs · refreshed 5 min ago · Q3 2026"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On track</Badge>
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
            label: "Active students",
            value: "214",
            delta: "target 240 · 89%",
            icon: GraduationCap,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Placement",
            value: "71%",
            delta: "Cohort 14 · target 75%",
            icon: TrendingUp,
            tone: "bg-career/10 text-career",
          },
          {
            label: "Revenue (MTD)",
            value: "₦18.6m",
            delta: "+18% MoM",
            icon: Wallet,
            tone: "bg-success/10 text-success",
          },
          {
            label: "NPS",
            value: "72",
            delta: "+6 vs Q1",
            icon: HeartPulse,
            tone: "bg-community/10 text-community",
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
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <HeartPulse className="text-primary size-4" /> Organisation health
            </CardTitle>
            <Badge variant="secondary" className="font-semibold">
              3 green · 1 amber
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {health.map((h) => (
              <div
                key={h.k}
                className="flex items-center justify-between gap-3 rounded-xl border p-3"
              >
                <div>
                  <p className="text-sm font-bold">{h.k}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{h.d}</p>
                </div>
                <Badge className={cn("shrink-0 border-0 font-semibold", h.tone)}>{h.v}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Users className="text-primary size-4" /> Needs attention
            </CardTitle>
            <Button asChild variant="outline" size="sm" className="font-semibold">
              <Link to="/app/director/approvals">
                Approvals <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="divide-y">
            {alerts.map((a) => (
              <div
                key={a.a}
                className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{a.a}</p>
                  <p className="text-muted-foreground text-xs">{a.d}</p>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                  Review
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-ink text-ink-foreground shadow-elevated mt-5 border-0">
        <CardContent className="flex flex-wrap items-center gap-4 p-6">
          <span className="bg-ink-foreground/10 grid size-10 place-items-center rounded-xl">
            <LayoutDashboard className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold">Quick actions</p>
            <p className="text-ink-foreground/70 text-xs">
              Approvals queue · OKR check-ins · drill into any department report.
            </p>
          </div>
          <Button
            asChild
            size="sm"
            className="bg-gradient-brand shadow-glow border-0 font-semibold"
          >
            <Link to="/app/director/okrs">
              Open OKRs <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}
