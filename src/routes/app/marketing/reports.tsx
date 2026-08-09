import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileBarChart2, Megaphone, TrendingUp, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useMarketingReports, useMarketingKpis } from "@/lib/query/marketing";
import type { Report, MarketingKpi } from "@/lib/api/marketing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/marketing/reports")({
  head: () => ({
    meta: [
      { title: "Reports — CEA-OS" },
      { name: "description", content: "Marketing performance reports." },
    ],
  }),
  component: MarketingReports,
});

const kpiMeta: { label: string; icon: typeof Megaphone; tone: string }[] = [
  { label: "Leads", icon: Megaphone, tone: "bg-primary/10 text-primary" },
  { label: "Spend", icon: Wallet, tone: "bg-learning/10 text-learning" },
  { label: "ROAS", icon: TrendingUp, tone: "bg-warning/10 text-warning" },
  { label: "Reports (30d)", icon: FileBarChart2, tone: "bg-success/10 text-success" },
];

function MarketingReports() {
  const query = useMarketingReports();
  const kpis = useMarketingKpis();

  return (
    <AppShell
      roleKey="marketing"
      title="Reports"
      subtitle="Shared with director · monthly cadence"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">All current</Badge>
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
        error={{ title: "Report stats unavailable" }}
        empty={{ title: "No report stats" }}
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
            <FileBarChart2 className="text-primary size-4" /> Published
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<Report[]>
            query={query}
            error={{ title: "Reports unavailable" }}
            empty={{ title: "No reports yet" }}
          >
            {(rows) => (
              <>
                {rows.map((r) => (
                  <div
                    key={r.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{r.title}</p>
                      <p className="text-muted-foreground text-xs">Published {r.published}</p>
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Open
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
