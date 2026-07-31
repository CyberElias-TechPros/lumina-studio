import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Funnel, Percent, TrendingDown, Users, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/growth/funnel")({
  head: () => ({
    meta: [
      { title: "Funnel Analyzer — CEA-OS" },
      {
        name: "description",
        content: "Acquisition, activation, retention and revenue conversion.",
      },
    ],
  }),
  component: FunnelAnalyzer,
});

const stages = [
  {
    t: "Visitors",
    v: "14,200",
    conv: "100%",
    drop: "—",
    pct: 100,
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Leads",
    v: "2,270",
    conv: "16%",
    drop: "−84%",
    pct: 16,
    tone: "bg-learning/10 text-learning",
  },
  {
    t: "Activated",
    v: "1,453",
    conv: "64% of leads",
    drop: "−36%",
    pct: 10,
    tone: "bg-success/10 text-success",
  },
  {
    t: "Retained 30d",
    v: "1,322",
    conv: "91% of activated",
    drop: "−9%",
    pct: 9,
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Paying",
    v: "891",
    conv: "67% of retained",
    drop: "−33%",
    pct: 6,
    tone: "bg-error/10 text-error",
  },
];

function FunnelAnalyzer() {
  return (
    <AppShell
      roleKey="growth"
      title="Funnel analyzer"
      subtitle="Jul 2026 · 14.2k visitors · A→R→R→R pipeline"
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            Leak: visitors→leads
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/growth">
              <ArrowLeft className="size-4" /> Growth hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Visitors",
            value: "14.2k",
            delta: "+18% MoM",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Activation",
            value: "64%",
            delta: "of leads",
            icon: Funnel,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Retention 30d",
            value: "91%",
            delta: "+4 pts YoY",
            icon: TrendingDown,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Revenue",
            value: "₦84m",
            delta: "+12% MoM",
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
            <Percent className="text-primary size-4" /> Stage conversion
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {stages.map((s) => (
            <div key={s.t}>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="text-sm font-bold">{s.t}</span>
                <span className="text-muted-foreground">{s.v}</span>
                <span className="text-muted-foreground ml-auto">{s.drop}</span>
                <Badge className={cn("border-0 font-semibold", s.tone)}>{s.conv}</Badge>
              </div>
              <Progress value={s.pct} className="mt-1.5 h-2.5" />
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
