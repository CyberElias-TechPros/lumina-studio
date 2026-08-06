import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Megaphone, MousePointerClick, TrendingUp, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { CcpAd } from "@/lib/query/conversionCopy";
import { useCcpAds } from "@/lib/query/conversionCopy";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/conversion-copy/ads")({
  head: () => ({
    meta: [
      { title: "Ad Copy Manager — CEA-OS" },
      { name: "description", content: "Paid ad copy variants and performance." },
    ],
  }),
  component: CopyAds,
});

const adTones = [
  "bg-success/10 text-success",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
];

function CopyAds() {
  const adsQuery = useCcpAds();

  return (
    <AppShell
      roleKey="instructor"
      title="Ad copy manager"
      subtitle="24 ad sets · 12 live · ₦4.2m spend this month"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">12 live</Badge>
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
            label: "Ad sets",
            value: "24",
            delta: "12 live",
            icon: Megaphone,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Avg. CTR",
            value: "2.4%",
            delta: "+0.4 pts",
            icon: MousePointerClick,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Spend (30d)",
            value: "₦4.2m",
            delta: "vs ₦3.9m plan",
            icon: Wallet,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Best variant",
            value: "v3",
            delta: "wins 6 tests",
            icon: TrendingUp,
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
            <Megaphone className="text-primary size-4" /> Ad sets
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<CcpAd[]>
            query={adsQuery}
            error={{ title: "Ads unavailable" }}
            empty={{
              title: "No ad sets yet",
              description: "Paid ad copy variants will show here.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((a, i) => (
                  <div
                    key={a.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{a.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {a.channel} · CTR {a.ctr} · {a.variants} variants
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", adTones[i % adTones.length])}>
                      {a.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                      Variants
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
