"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Globe, LineChart, Percent, TrendingUp, Users } from "lucide-react";
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
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useLocalizationMarkets, useLocalizationStats } from "@/lib/query/localization";
import type { MarketAnalyticsRow } from "@/lib/api/localization";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/localization/analytics")({
  head: () => ({
    meta: [
      { title: "Market Analytics — CEA-OS" },
      { name: "description", content: "Per-locale conversion and engagement analytics." },
    ],
  }),
  component: MarketAnalytics,
});

function MarketAnalytics() {
  const query = useLocalizationMarkets();
  const markets = query.data?.pages.flatMap((p) => p.items) ?? [];
  const stats = useLocalizationStats();
  const pageStats = (stats.data?.items ?? []).filter((s) => s.page === "analytics");
  const visitors = pageStats.find((s) => s.label === "Localized visitors");
  const avgConversion = markets.length
    ? `${(
        markets.reduce((s, m) => s + Number.parseFloat(m.conversion), 0) / markets.length
      ).toFixed(1)}%`
    : "—";
  const avgEngagement = markets.length
    ? `${(
        markets.reduce((s, m) => s + Number.parseFloat(m.engagement), 0) / markets.length
      ).toFixed(1)}min`
    : "—";

  return (
    <AppShell
      roleKey="localization"
      title="Market analytics"
      subtitle="Jul 2026 · localized pages only · refreshed daily"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Pidgin +1.8 pts
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/localization">
              <ArrowLeft className="size-4" /> L10n hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Markets measured",
            value: String(markets.length),
            delta: "localized pages",
            icon: Globe,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Avg. conversion",
            value: avgConversion,
            delta: "+0.9 pts MoM",
            icon: Percent,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Avg. engagement",
            value: avgEngagement,
            delta: "+0.4 min MoM",
            icon: LineChart,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Localized visitors",
            value: visitors?.value ?? "—",
            delta: visitors?.delta ?? "—",
            icon: Users,
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
            <TrendingUp className="text-primary size-4" /> Per-locale comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Locale</TableHead>
                <TableHead>Conversion</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>vs baseline</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <QueryState<MarketAnalyticsRow[]>
                query={query}
                error={{ title: "Analytics unavailable" }}
              >
                {(rows) => (
                  <>
                    {rows.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell className="font-semibold">{m.name}</TableCell>
                        <TableCell className="font-bold">{m.conversion}</TableCell>
                        <TableCell className="text-muted-foreground">{m.engagement}</TableCell>
                        <TableCell className="w-40">
                          <Progress value={m.pct} className="h-1.5" />
                        </TableCell>
                        <TableCell
                          className={cn(
                            "font-bold",
                            m.trend.startsWith("+") ? "text-success" : "text-error",
                          )}
                        >
                          {m.trend}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </QueryState>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}
