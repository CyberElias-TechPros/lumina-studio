import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Award, LineChart, Percent, TrendingUp, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useBdResults } from "@/lib/query/behavioral";
import type { BdResult } from "@/lib/api/behavioral";
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

const tones = [
  "bg-success/10 text-success",
  "bg-primary/10 text-primary",
  "bg-warning/10 text-warning",
  "bg-muted-foreground/10 text-muted-foreground",
];

function InterventionAnalytics() {
  const resultsQuery = useBdResults();

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
          <QueryState<BdResult[]>
            query={resultsQuery}
            error={{ title: "Results unavailable" }}
            empty={{
              title: "No results yet",
              description: "Attributed lifts will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Intervention</TableHead>
                    <TableHead>Metric</TableHead>
                    <TableHead>Baseline</TableHead>
                    <TableHead>With nudge</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r, i) => {
                    const [name, metric] = r.metric.split(" — ");
                    return (
                      <TableRow key={r.id}>
                        <TableCell className="font-semibold">{name}</TableCell>
                        <TableCell className="text-muted-foreground">{metric || "—"}</TableCell>
                        <TableCell>{r.baseline}</TableCell>
                        <TableCell className="font-bold text-success">{r.changeLabel}</TableCell>
                        <TableCell>
                          <Badge className={cn("border-0 font-semibold", tones[i % tones.length])}>
                            {r.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
