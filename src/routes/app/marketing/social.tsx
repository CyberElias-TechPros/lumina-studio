"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  CalendarDays,
  CalendarPlus2,
  Heart,
  MessageCircle,
  Share2,
  ThumbsUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useSocialPosts, useMarketingKpis } from "@/lib/query/marketing";
import type { SocialPost, MarketingKpi } from "@/lib/api/marketing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/marketing/social")({
  head: () => ({
    meta: [
      { title: "Social Media — CEA-OS" },
      { name: "description", content: "Scheduler and performance across channels." },
    ],
  }),
  component: MarketingSocial,
});

function postTone(status: string): string {
  if (status === "Scheduled") return "bg-primary/10 text-primary";
  if (status === "Live") return "bg-success/10 text-success";
  return "bg-warning/10 text-warning";
}

const kpiMeta: { label: string; icon: typeof Heart; tone: string }[] = [
  { label: "Followers", icon: Heart, tone: "bg-primary/10 text-primary" },
  { label: "Engagement", icon: ThumbsUp, tone: "bg-success/10 text-success" },
  { label: "Posts (30d)", icon: MessageCircle, tone: "bg-learning/10 text-learning" },
  { label: "Shares", icon: Share2, tone: "bg-warning/10 text-warning" },
];

function MarketingSocial() {
  const query = useSocialPosts();
  const kpis = useMarketingKpis();

  return (
    <AppShell
      roleKey="marketing"
      title="Social media"
      subtitle="4 channels · 24 posts this month · 32k followers"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Engagement +14%
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
        error={{ title: "Social stats unavailable" }}
        empty={{ title: "No social stats" }}
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <CalendarDays className="text-primary size-4" /> Schedule
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            <CalendarPlus2 className="size-4" /> New post
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<SocialPost[]>
            query={query}
            error={{ title: "Posts unavailable" }}
            empty={{ title: "Nothing scheduled" }}
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
                        {p.channel} · {p.date}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", postTone(p.status))}>
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
