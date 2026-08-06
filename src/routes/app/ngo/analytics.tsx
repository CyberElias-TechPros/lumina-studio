import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChartNoAxesColumn, Download, Heart, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { NgoMetric } from "@/lib/api/ngo";
import { useNgoMetrics } from "@/lib/query/ngo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ngo/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — CEA-OS" },
      { name: "description", content: "Partner reports and program analytics." },
    ],
  }),
  component: NgoAnalytics,
});

const tones = [
  "bg-success/10 text-success",
  "bg-primary/10 text-primary",
  "bg-learning/10 text-learning",
  "bg-warning/10 text-warning",
];

function NgoAnalytics() {
  const metricsQuery = useNgoMetrics();

  return (
    <AppShell
      roleKey="instructor"
      title="Partner reports & analytics"
      subtitle="12 dashboards · donor-ready exports · quarterly"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Updated</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/ngo">
              <ArrowLeft className="size-4" /> Partnership hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Dashboards",
            value: "12",
            delta: "per program",
            icon: ChartNoAxesColumn,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Donor exports",
            value: "6",
            delta: "this year",
            icon: Download,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Beneficiaries",
            value: "1,240",
            delta: "2026",
            icon: Heart,
            tone: "bg-success/10 text-success",
          },
          {
            label: "YoY growth",
            value: "+31%",
            delta: "beneficiaries",
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
            <TrendingUp className="text-primary size-4" /> Key metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<NgoMetric[]>
            query={metricsQuery}
            error={{ title: "Metrics unavailable" }}
            empty={{
              title: "No metrics yet",
              description: "Analytics metrics will appear here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((m, i) => (
                  <div
                    key={m.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{m.label}</p>
                      <p className="text-muted-foreground text-xs">{m.delta}</p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", tones[i % tones.length])}>
                      {m.value}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Explore
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
