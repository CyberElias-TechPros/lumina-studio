import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Award, LineChart, Percent, TrendingUp, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/behavioral-design/analytics")({
  head: () => ({
    meta: [
      { title: "Intervention Analytics — CEA-OS" },
      { name: "description", content: "Engagement lift and retention from interventions." },
    ],
  }),
  component: InterventionAnalytics,
});

const results = [
  {
    t: "Streak nudges",
    metric: "Weekly lessons",
    base: "+4.2%",
    win: "+9.1%",
    pct: 78,
    status: "Winning",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Deadline anchoring",
    metric: "Submissions",
    base: "+3.1%",
    win: "+6.4%",
    pct: 64,
    status: "Live",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Commitment emails",
    metric: "Course churn",
    base: "−1.8%",
    win: "−4.0%",
    pct: 51,
    status: "Running",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Social proof bubbles",
    metric: "Referral starts",
    base: "+1.2%",
    win: "+2.8%",
    pct: 38,
    status: "Pilot",
    tone: "bg-muted-foreground/10 text-muted-foreground",
  },
];

function InterventionAnalytics() {
  return (
    <AppShell
      roleKey="behavioral-design"
      title="Intervention analytics"
      subtitle="Q3 2026 · 11 live interventions · lift attributed per experiment"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">3 wins</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/behavioral-design">
              <ArrowLeft className="size-4" /> Behavior hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Engagement lift",
            value: "+7.4%",
            delta: "vs control",
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Retention (30d)",
            value: "91%",
            delta: "+4 pts YoY",
            icon: LineChart,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Nudges delivered",
            value: "18.2k",
            delta: "30-day",
            icon: Zap,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Wins this qtr",
            value: "3",
            delta: "2 rolled out",
            icon: Award,
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
            <Percent className="text-primary size-4" /> Results by intervention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Intervention</TableHead>
                <TableHead>Metric</TableHead>
                <TableHead>Baseline</TableHead>
                <TableHead>With nudge</TableHead>
                <TableHead>Maturity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((r) => (
                <TableRow key={r.t}>
                  <TableCell className="font-semibold">{r.t}</TableCell>
                  <TableCell className="text-muted-foreground">{r.metric}</TableCell>
                  <TableCell>{r.base}</TableCell>
                  <TableCell className="font-bold text-success">{r.win}</TableCell>
                  <TableCell className="w-32">
                    <Progress value={r.pct} className="h-1.5" />
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("border-0 font-semibold", r.tone)}>{r.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}
