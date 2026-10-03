"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Megaphone, Plus, Target, TrendingUp, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useCampaigns, useMarketingKpis } from "@/lib/query/marketing";
import type { Campaign } from "@/lib/api/marketing";
import { cn, formatNairaCompact } from "@/lib/utils";

export const Route = createFileRoute("/app/marketing/campaigns")({
  head: () => ({
    meta: [
      { title: "Campaigns — CEA-OS" },
      { name: "description", content: "Multi-channel campaigns with budget and ROI." },
    ],
  }),
  component: MarketingCampaigns,
});

function campaignTone(roas: number): string {
  if (roas >= 6) return "bg-success/10 text-success";
  if (roas >= 5) return "bg-primary/10 text-primary";
  return "bg-warning/10 text-warning";
}

function MarketingCampaigns() {
  const query = useCampaigns();
  const kpis = useMarketingKpis();
  const budget = kpis.data?.find((k) => k.page === "campaigns");

  return (
    <AppShell
      roleKey="marketing"
      title="Campaigns"
      subtitle="8 live · ₦1.4m budget · avg. ROAS 4.2x"
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">1 flagged</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/marketing">
              <ArrowLeft className="size-4" /> Marketing hub
            </Link>
          </Button>
        </>
      }
    >
      <QueryState<Campaign[]> query={query} error={{ title: "Campaign stats unavailable" }}>
        {(rows) => (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Live",
                value: String(rows.filter((c) => c.status === "Live").length),
                delta: "3 flagged",
                icon: Megaphone,
                tone: "bg-primary/10 text-primary",
              },
              {
                label: "Budget used",
                value: budget?.value ?? "—",
                delta: budget?.delta ?? "",
                icon: Wallet,
                tone: "bg-learning/10 text-learning",
              },
              {
                label: "Avg. ROAS",
                value: rows.length
                  ? `${(rows.reduce((s, c) => s + c.roas, 0) / rows.length).toFixed(1)}x`
                  : "—",
                delta: "target 5x",
                icon: Target,
                tone: "bg-warning/10 text-warning",
              },
              {
                label: "Leads",
                value: String(rows.reduce((s, c) => s + c.leads, 0)),
                delta: "+11% MoM",
                icon: TrendingUp,
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
            <Megaphone className="text-primary size-4" /> Live campaigns
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            <Plus className="size-4" /> New campaign
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<Campaign[]>
            query={query}
            error={{ title: "Campaigns unavailable" }}
            empty={{ title: "No campaigns yet" }}
          >
            {(rows) => (
              <>
                {rows.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{c.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {c.channel} · {formatNairaCompact(c.spend)} spend
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", campaignTone(c.roas))}>
                      ROAS {c.roas.toFixed(1)}x
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Manage
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
