import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChartNoAxesColumn,
  Download,
  MousePointerClick,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { CcpAnalyticsRow } from "@/lib/query/conversionCopy";
import { useCcpAnalytics } from "@/lib/query/conversionCopy";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/conversion-copy/analytics")({
  head: () => ({
    meta: [
      { title: "Conversion Analytics — CEA-OS" },
      { name: "description", content: "Funnel performance across channels." },
    ],
  }),
  component: CopyAnalytics,
});

const funnelTones = [
  "bg-success/10 text-success",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
];

function CopyAnalytics() {
  const analyticsQuery = useCcpAnalytics();

  return (
    <AppShell
      roleKey="conversion-copy"
      title="Conversion analytics"
      subtitle="Funnel · last 30 days · updated hourly"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Live</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/conversion-copy/library">
              <ArrowLeft className="size-4" /> Library
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Visitors",
            value: "48.2k",
            delta: "+19% MoM",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Applications",
            value: "1,612",
            delta: "+14% MoM",
            icon: ChartNoAxesColumn,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Overall CVR",
            value: "3.3%",
            delta: "+0.5 pts",
            icon: TrendingUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Click-through",
            value: "8.2%",
            delta: "email avg",
            icon: MousePointerClick,
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
            <ChartNoAxesColumn className="text-primary size-4" /> Funnel stages
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<CcpAnalyticsRow[]>
            query={analyticsQuery}
            error={{ title: "Analytics unavailable" }}
            empty={{
              title: "No funnel data yet",
              description: "Funnel performance across channels will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((f, i) => (
                  <div
                    key={f.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{f.stage}</p>
                      <p className="text-muted-foreground text-xs">
                        {f.visits} visits · {f.conversion} conv
                      </p>
                    </div>
                    <Badge
                      className={cn("border-0 font-semibold", funnelTones[i % funnelTones.length])}
                    >
                      {f.delta}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      <Download className="size-3.5" /> Export
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
