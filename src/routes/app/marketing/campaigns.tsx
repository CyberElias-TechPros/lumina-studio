import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Megaphone, Plus, Target, TrendingUp, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/marketing/campaigns")({
  head: () => ({
    meta: [
      { title: "Campaigns — CEA-OS" },
      { name: "description", content: "Multi-channel campaigns with budget and ROI." },
    ],
  }),
  component: MarketingCampaigns,
});

const campaigns = [
  {
    c: "Q3 digital ads",
    ch: "Meta + Google",
    s: "₦420k",
    r: "4.2x",
    tone: "bg-warning/10 text-warning",
  },
  {
    c: "Referral program",
    ch: "In-app + email",
    s: "₦180k",
    r: "6.8x",
    tone: "bg-success/10 text-success",
  },
  {
    c: "Open-house events",
    ch: "Offline + social",
    s: "₦250k",
    r: "5.4x",
    tone: "bg-primary/10 text-primary",
  },
];

function MarketingCampaigns() {
  return (
    <AppShell
      roleKey="instructor"
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
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Live",
            value: "8",
            delta: "3 flagged",
            icon: Megaphone,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Budget used",
            value: "71%",
            delta: "of ₦2.0m",
            icon: Wallet,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Avg. ROAS",
            value: "4.2x",
            delta: "target 5x",
            icon: Target,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Leads",
            value: "412",
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
          {campaigns.map((c) => (
            <div key={c.c} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{c.c}</p>
                <p className="text-muted-foreground text-xs">
                  {c.ch} · {c.s} spend
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", c.tone)}>ROAS {c.r}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Manage
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
