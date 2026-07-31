import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BarChart3, Funnel, Target, TrendingUp, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
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

const funnel = [
  { f: "Impressions", v: "182k", pct: 100 },
  { f: "Clicks", v: "9.1k", pct: 5 },
  { f: "Leads", v: "412", pct: 0.23 },
  { f: "Applications", v: "118", pct: 0.06 },
];

function MarketingAnalytics() {
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
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "CAC",
            value: "₦96k",
            delta: "target ₦90k",
            icon: Wallet,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "ROAS",
            value: "4.2x",
            delta: "target 5x",
            icon: Target,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "CPL",
            value: "₦3.4k",
            delta: "−8% MoM",
            icon: BarChart3,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Attributed",
            value: "64",
            delta: "enrollments",
            icon: TrendingUp,
            tone: "bg-primary/10 text-primary",
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
            <Funnel className="text-primary size-4" /> Funnel · Q3
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {funnel.map((f) => (
            <div key={f.f}>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>{f.f}</span>
                <span>{f.v}</span>
              </div>
              <div className="bg-muted mt-1.5 h-2 overflow-hidden rounded-full">
                <div
                  className="bg-gradient-brand h-full rounded-full"
                  style={{ width: `${f.pct}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
