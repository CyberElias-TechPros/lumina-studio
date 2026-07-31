import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  FileSignature,
  Flag,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  LineChart,
  Megaphone,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/director")({
  head: () => ({
    meta: [
      { title: "Director — CEA-OS" },
      {
        name: "description",
        content: "Executive leadership: command center, approvals, OKRs and drill-down reports.",
      },
    ],
  }),
  component: DirectorPortal,
});

const screens = [
  {
    icon: LayoutDashboard,
    label: "Command center",
    desc: "Real-time KPIs and org health",
    path: "/app/director/command-center",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Wallet,
    label: "Financial overview",
    desc: "Revenue, expenses, forecasts",
    path: "/app/director/finance",
    tone: "bg-success/10 text-success",
  },
  {
    icon: GraduationCap,
    label: "Academic overview",
    desc: "Enrolment, completion, placement",
    path: "/app/director/academic",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: BriefcaseBusiness,
    label: "Operations overview",
    desc: "Branch performance and efficiency",
    path: "/app/director/operations",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: Users,
    label: "HR overview",
    desc: "Headcount, turnover, eNPS",
    path: "/app/director/hr",
    tone: "bg-community/10 text-community",
  },
  {
    icon: Megaphone,
    label: "Marketing overview",
    desc: "CAC, funnel, campaign ROI",
    path: "/app/director/marketing",
    tone: "bg-career/10 text-career",
  },
  {
    icon: FileSignature,
    label: "Approvals",
    desc: "Budgets, hires, partnerships",
    path: "/app/director/approvals",
    tone: "bg-erp/10 text-erp",
  },
  {
    icon: Target,
    label: "OKRs",
    desc: "Strategic planning and check-ins",
    path: "/app/director/okrs",
    tone: "bg-services/10 text-services",
  },
  {
    icon: LineChart,
    label: "Reports drill-down",
    desc: "Any module, any department",
    path: "/app/director/reports",
    tone: "bg-ink/10 text-ink",
  },
];

function DirectorPortal() {
  return (
    <AppShell
      roleKey="admin"
      title="Director portal"
      subtitle="Executive leadership · Q3 2026 · all systems read-write"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            3 approvals waiting
          </Badge>
          <Button
            asChild
            size="sm"
            className="bg-gradient-brand shadow-glow border-0 font-semibold"
          >
            <Link to="/app/director/approvals">
              Approve <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Enrolment",
            value: "214",
            delta: "89% of target",
            icon: GraduationCap,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Placement",
            value: "71%",
            delta: "target 75%",
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <LayoutDashboard className="text-primary size-4" /> Workspace
          </CardTitle>
          <Badge variant="secondary" className="font-semibold">
            9 modules
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {screens.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className={cn("grid size-9 place-items-center rounded-lg", s.tone)}>
                  <s.icon className="size-4" />
                </span>
                <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
              </div>
              <p className="font-display mt-3 text-sm font-extrabold">{s.label}</p>
              <p className="text-muted-foreground mt-1 text-xs">{s.desc}</p>
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gradient-ink text-ink-foreground shadow-elevated mt-5 border-0">
        <CardContent className="flex flex-wrap items-center gap-4 p-6">
          <span className="bg-ink-foreground/10 grid size-10 place-items-center rounded-xl">
            <CheckCircle2 className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold">Cycle check-in</p>
            <p className="text-ink-foreground/70 text-xs">
              3 OKRs due for check-in this week · 2 approvals past SLA · 1 campaign flagged.
            </p>
          </div>
          <Button
            asChild
            size="sm"
            className="bg-gradient-brand shadow-glow border-0 font-semibold"
          >
            <Link to="/app/director/okrs">
              Check in <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}
