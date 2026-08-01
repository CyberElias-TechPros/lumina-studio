import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, LayoutTemplate, MousePointerClick, Plus, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useLandingPages, useMarketingKpis } from "@/lib/query/marketing";
import type { LandingPage } from "@/lib/api/marketing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/marketing/landing-pages")({
  head: () => ({
    meta: [
      { title: "Landing Pages — CEA-OS" },
      { name: "description", content: "Landing page builder with A/B testing." },
    ],
  }),
  component: MarketingLandingPages,
});

function pageTone(status: string): string {
  if (status === "A/B testing") return "bg-primary/10 text-primary";
  if (status === "Live") return "bg-success/10 text-success";
  return "bg-warning/10 text-warning";
}

function MarketingLandingPages() {
  const query = useLandingPages();
  const kpis = useMarketingKpis();
  const kpiRows = kpis.data?.filter((k) => k.page === "landing") ?? [];
  const avgConversion = kpiRows.find((k) => k.label === "Avg. conversion");
  const templates = kpiRows.find((k) => k.label === "Templates");

  return (
    <AppShell
      roleKey="instructor"
      title="Landing pages"
      subtitle="6 live · 3 in testing · avg. conversion 4.4%"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Tests healthy</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/marketing">
              <ArrowLeft className="size-4" /> Marketing hub
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<LandingPage[]>
        query={query}
        error={{ title: "Page stats unavailable" }}
        empty={{ title: "No pages yet" }}
      >
        {(rows) => (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Live pages",
                value: String(rows.filter((p) => p.status === "Live").length),
                delta: "across programs",
                icon: Rocket,
                tone: "bg-primary/10 text-primary",
              },
              {
                label: "Avg. conversion",
                value: avgConversion?.value ?? "—",
                delta: avgConversion?.delta ?? "",
                icon: MousePointerClick,
                tone: "bg-warning/10 text-warning",
              },
              {
                label: "A/B tests",
                value: String(rows.filter((p) => p.status === "A/B testing").length),
                delta: "2 conclusive",
                icon: LayoutTemplate,
                tone: "bg-learning/10 text-learning",
              },
              {
                label: "Templates",
                value: templates?.value ?? "—",
                delta: templates?.delta ?? "",
                icon: Plus,
                tone: "bg-success/10 text-success",
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
        )}
      </QueryState>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Rocket className="text-primary size-4" /> Pages
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            <Plus className="size-4" /> New page
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<LandingPage[]>
            query={query}
            error={{ title: "Pages unavailable" }}
            empty={{ title: "No landing pages yet" }}
          >
            {(rows) => (
              <>
                {rows.map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{p.title}</p>
                      <p className="text-muted-foreground text-xs">
                        Conversion {p.conversion.toFixed(1)}%
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", pageTone(p.status))}>
                      {p.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Edit
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
