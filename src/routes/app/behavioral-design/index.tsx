import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  FlaskConical,
  Layers,
  MousePointerClick,
  Target,
  TrendingUp,
  UsersRound,
  Workflow,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/behavioral-design/")({
  head: () => ({
    meta: [
      { title: "Behavioral Design Hub — CEA-OS" },
      {
        name: "description",
        content: "Interventions, flows, nudges and experiments that shape learner behaviour.",
      },
    ],
  }),
  component: BehavioralDesignHub,
});

const screens = [
  {
    icon: Brain,
    label: "Interventions",
    desc: "Evidence-based library",
    path: "/app/behavioral-design/interventions",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Workflow,
    label: "Flow designer",
    desc: "Step-based engagement flows",
    path: "/app/behavioral-design/flow-designer",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: Zap,
    label: "Nudge campaigns",
    desc: "Triggers, message preview",
    path: "/app/behavioral-design/nudge-campaigns",
    tone: "bg-success/10 text-success",
  },
  {
    icon: FlaskConical,
    label: "A/B test designer",
    desc: "Variants, sample, lift",
    path: "/app/behavioral-design/ab-tests",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: Layers,
    label: "Funnel analysis",
    desc: "Conversion, drop-off",
    path: "/app/behavioral-design/funnels",
    tone: "bg-career/10 text-career",
  },
  {
    icon: Target,
    label: "Habit tracker",
    desc: "Streaks, check-ins",
    path: "/app/behavioral-design/habits",
    tone: "bg-community/10 text-community",
  },
  {
    icon: TrendingUp,
    label: "Analytics",
    desc: "Engagement lift, retention",
    path: "/app/behavioral-design/analytics",
    tone: "bg-erp/10 text-erp",
  },
  {
    icon: UsersRound,
    label: "Segments",
    desc: "Learner segment explorer",
    path: "/app/behavioral-design/segments",
    tone: "bg-services/10 text-services",
  },
];

function BehavioralDesignHub() {
  return (
    <AppShell
      roleKey="behavioral-design"
      title="Behavioral design hub"
      subtitle="7 live experiments · avg lift +7.4% · ethics review passed"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            3 wins this quarter
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/behavioral-designer">
              <ArrowLeft className="size-4" /> Behavior portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Live experiments",
            value: "7",
            delta: "2 winning",
            icon: FlaskConical,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Avg. lift",
            value: "+7.4%",
            delta: "across wins",
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Funnels mapped",
            value: "11",
            delta: "2 to redesign",
            icon: Layers,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Segments explored",
            value: "9",
            delta: "2 new this qtr",
            icon: UsersRound,
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
            <MousePointerClick className="text-primary size-4" /> Workspace
          </CardTitle>
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
    </AppShell>
  );
}
