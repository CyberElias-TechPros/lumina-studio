import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Filter, Flame, PhoneCall, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useLeads, useMarketingKpis } from "@/lib/query/marketing";
import type { Lead, MarketingKpi } from "@/lib/api/marketing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/marketing/leads")({
  head: () => ({
    meta: [
      { title: "Leads — CEA-OS" },
      { name: "description", content: "Score, route and nurture leads." },
    ],
  }),
  component: MarketingLeads,
});

function scoreBucket(score: number): string {
  if (score >= 90) return "hot";
  if (score >= 70) return "warm";
  return "cool";
}

function leadTone(score: number): string {
  if (score >= 90) return "bg-success/10 text-success";
  if (score >= 70) return "bg-primary/10 text-primary";
  return "bg-warning/10 text-warning";
}

const kpiMeta: { label: string; icon: typeof Flame; tone: string }[] = [
  { label: "Total", icon: UserRound, tone: "bg-primary/10 text-primary" },
  { label: "Hot (90+)", icon: Flame, tone: "bg-success/10 text-success" },
  { label: "Warm (70–89)", icon: PhoneCall, tone: "bg-learning/10 text-learning" },
  { label: "Cool (<70)", icon: Filter, tone: "bg-warning/10 text-warning" },
];

function MarketingLeads() {
  const query = useLeads();
  const kpis = useMarketingKpis();

  return (
    <AppShell
      roleKey="marketing"
      title="Lead management"
      subtitle="412 leads · 96 hot · routing to admissions"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Auto-routing on
          </Badge>
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
        error={{ title: "Lead stats unavailable" }}
        empty={{ title: "No lead stats" }}
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
            <Flame className="text-primary size-4" /> Top leads
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<Lead[]>
            query={query}
            error={{ title: "Leads unavailable" }}
            empty={{ title: "No leads yet" }}
          >
            {(rows) => (
              <>
                {rows.map((l) => (
                  <div
                    key={l.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{l.name}</p>
                      <p className="text-muted-foreground text-xs">{l.detail}</p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", leadTone(l.score))}>
                      {l.score} — {scoreBucket(l.score)}
                    </Badge>
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
