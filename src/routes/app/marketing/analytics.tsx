import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BarChart3, Funnel, Target, TrendingUp, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useFunnelStages, useMarketingKpis } from "@/lib/query/marketing";
import type { FunnelStage, MarketingKpi } from "@/lib/api/marketing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/marketing/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — CEA-OS" },
      { name: "description", content: "CAC, ROAS and attribution." },
    ],
  }),
  component: MarketingAnalytics,
});

function fmtCompact(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

const kpiMeta: { label: string; icon: typeof Wallet; tone: string }[] = [
  { label: "CAC", icon: Wallet, tone: "bg-warning/10 text-warning" },
  { label: "ROAS", icon: Target, tone: "bg-learning/10 text-learning" },
  { label: "CPL", icon: BarChart3, tone: "bg-success/10 text-success" },
  { label: "Attributed", icon: TrendingUp, tone: "bg-primary/10 text-primary" },
];

function MarketingAnalytics() {
  const query = useFunnelStages();
  const kpis = useMarketingKpis();

  return (
    <AppShell
      roleKey="instructor"
      title="Analytics"
      subtitle="Attribution window 30d · last-click model"
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">ROAS 4.2x</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/marketing">
              <ArrowLeft className="size-4" /> Marketing hub
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<MarketingKpi[]>
        query={kpis}
        error={{ title: "Analytics unavailable" }}
        empty={{ title: "No analytics" }}
      >
        {(rows) => (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpiMeta.map((m, i) => (
              <Card key={m.label} className="bg-card shadow-soft border">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                      {m.label}
                    </p>
                    <span className={cn("grid size-8 place-items-center rounded-lg", m.tone)}>
                      <m.icon className="size-4" />
                    </span>
                  </div>
                  <p className="font-display mt-3 text-2xl font-extrabold">
                    {rows[i]?.value ?? "—"}
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-xs font-semibold">
                    {rows[i]?.delta ?? ""}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </QueryState>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Funnel className="text-primary size-4" /> Funnel · Q3
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <QueryState<FunnelStage[]>
            query={query}
            error={{ title: "Funnel unavailable" }}
            empty={{ title: "No funnel data" }}
          >
            {(rows) => (
              <>
                {rows.map((f) => (
                  <div key={f.id}>
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>{f.stage}</span>
                      <span>{fmtCompact(f.value)}</span>
                    </div>
                    <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                      <div
                        className="bg-gradient-brand h-full rounded-full"
                        style={{ width: `${f.pct}%` }}
                      />
                    </div>
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
