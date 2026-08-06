import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, HeartHandshake, Sprout, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import {
  useVolMetrics,
  useVolMetricItems,
  useVolMonths,
  useVolMonthItems,
} from "@/lib/query/volunteerReceptionist";
import type { VolMetric, VolMonth } from "@/lib/api/volunteerReceptionist";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/volunteer/impact")({
  head: () => ({
    meta: [
      { title: "Impact Dashboard — CEA-OS" },
      { name: "description", content: "The difference your volunteering makes." },
    ],
  }),
  component: VolunteerImpact,
});

const tones = [
  "bg-primary/10 text-primary",
  "bg-learning/10 text-learning",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
];

function VolunteerImpact() {
  const metricsQuery = useVolMetrics();
  const metrics = useVolMetricItems();
  const monthsQuery = useVolMonths();
  const months = useVolMonthItems();

  return (
    <AppShell
      roleKey="student"
      title="Impact dashboard"
      subtitle="Your contribution · 2026"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Top 10% volunteer
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/volunteer">
              <ArrowLeft className="size-4" /> Volunteer portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <QueryState<VolMetric[]>
          query={metricsQuery}
          error={{ title: "Impact unavailable" }}
          empty={{ title: "No metrics yet", description: "Your impact numbers will show here." }}
          isEmpty={(rows) => rows.length === 0}
        >
          {(rows) => (
            <>
              {rows.map((k, i) => (
                <Card key={k.id} className="bg-card shadow-soft border">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                        {k.metric}
                      </p>
                      <span
                        className={cn(
                          "grid size-8 place-items-center rounded-lg",
                          tones[i % tones.length],
                        )}
                      >
                        <HeartHandshake className="size-4" />
                      </span>
                    </div>
                    <p className="font-display mt-3 text-2xl font-extrabold">{k.valueLabel}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </QueryState>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Sprout className="text-primary size-4" /> Hours by month
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <QueryState<VolMonth[]>
              query={monthsQuery}
              error={{ title: "Trends unavailable" }}
              empty={{ title: "No trends yet", description: "Monthly hours will show here." }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((x) => (
                    <div key={x.id}>
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span>{x.month}</span>
                        <span>{x.pct}% of year</span>
                      </div>
                      <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                        <div
                          className="bg-gradient-brand h-full rounded-full"
                          style={{ width: `${x.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>

        <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
          <CardContent className="p-6">
            <Users className="text-success size-5" />
            <p className="font-display mt-3 text-base font-extrabold">Your ripple</p>
            <p className="text-ink-foreground/70 mt-1 text-sm">
              14 mentored learners, 6 outreach events, and an estimated ₦2.3m of value given back to
              the community this year. Keep going — the 60h appreciation tier is 13h away.
            </p>
            <Button
              asChild
              size="sm"
              className="bg-gradient-brand shadow-glow mt-4 border-0 font-semibold"
            >
              <Link to="/app/volunteer/opportunities">
                Find next event <TrendingUp className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
