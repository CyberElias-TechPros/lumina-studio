import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  FlaskConical,
  Gift,
  Rocket,
  Share2,
  SlidersHorizontal,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/growth/")({
  head: () => ({
    meta: [
      { title: "Growth Hub — CEA-OS" },
      {
        name: "description",
        content: "Experiments, funnels, cohorts, referrals and growth modelling.",
      },
    ],
  }),
  component: GrowthHub,
});

const screens = [
  {
    icon: FlaskConical,
    label: "Experiment builder",
    desc: "Hypotheses, variants, results",
    path: "/app/growth/experiments",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: TrendingUp,
    label: "Funnel analyzer",
    desc: "Acquisition to revenue",
    path: "/app/growth/funnel",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: Share2,
    label: "Cohort retention",
    desc: "Weekly cohort grid",
    path: "/app/growth/cohorts",
    tone: "bg-success/10 text-success",
  },
  {
    icon: Gift,
    label: "Referral program",
    desc: "Invites, payouts",
    path: "/app/growth/referrals",
    tone: "bg-warning/10 text-warning",
  },
  {
    icon: Wallet,
    label: "Channel attribution",
    desc: "CAC, LTV, ROAS",
    path: "/app/growth/attribution",
    tone: "bg-career/10 text-career",
  },
  {
    icon: SlidersHorizontal,
    label: "Growth simulator",
    desc: "Spend and conversion model",
    path: "/app/growth/simulator",
    tone: "bg-community/10 text-community",
  },
  {
    icon: Users,
    label: "SEO content planner",
    desc: "Keywords, rank, volume",
    path: "/app/growth/seo",
    tone: "bg-erp/10 text-erp",
  },
];

function GrowthHub() {
  return (
    <AppShell
      roleKey="growth"
      title="Growth hub"
      subtitle="Q3 2026 · CAC ₦64k · activation 64% · referral 18% of signups"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">CAC −12% QoQ</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/growth">
              <ArrowLeft className="size-4" /> Growth portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "New learners",
            value: "148",
            delta: "+22% MoM",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Activation",
            value: "64%",
            delta: "first lesson in 3d",
            icon: Rocket,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Referral signups",
            value: "27",
            delta: "18% of total",
            icon: Gift,
            tone: "bg-success/10 text-success",
          },
          {
            label: "CAC",
            value: "₦64k",
            delta: "target ₦70k",
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
            <Rocket className="text-primary size-4" /> Workspace
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
