import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Search, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useSeoKeywords, useMarketingKpis } from "@/lib/query/marketing";
import type { SeoKeyword, MarketingKpi } from "@/lib/api/marketing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/marketing/seo")({
  head: () => ({
    meta: [
      { title: "SEO — CEA-OS" },
      { name: "description", content: "Keywords and rank tracking dashboard." },
    ],
  }),
  component: MarketingSeo,
});

const kpiMeta: { label: string; icon: typeof Search; tone: string }[] = [
  { label: "Keywords", icon: Search, tone: "bg-primary/10 text-primary" },
  { label: "Avg. position", icon: TrendingUp, tone: "bg-success/10 text-success" },
  { label: "Organic traffic", icon: ArrowUpRight, tone: "bg-learning/10 text-learning" },
  { label: "Page 1 rankings", icon: Search, tone: "bg-warning/10 text-warning" },
];

function MarketingSeo() {
  const query = useSeoKeywords();
  const kpis = useMarketingKpis();

  return (
    <AppShell
      roleKey="marketing"
      title="SEO dashboard"
      subtitle="48 tracked keywords · avg. position 7.2"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Traffic +18%</Badge>
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
        error={{ title: "SEO stats unavailable" }}
        empty={{ title: "No SEO stats" }}
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
            <Search className="text-primary size-4" /> Key rankings
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<SeoKeyword[]>
            query={query}
            error={{ title: "Keywords unavailable" }}
            empty={{ title: "No keywords tracked" }}
          >
            {(rows) => (
              <>
                {rows.map((k) => (
                  <div
                    key={k.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{k.keyword}</p>
                      <p className="text-muted-foreground text-xs">{k.delta}</p>
                    </div>
                    <Badge variant="secondary" className="font-semibold">
                      Position {k.position}
                    </Badge>
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
