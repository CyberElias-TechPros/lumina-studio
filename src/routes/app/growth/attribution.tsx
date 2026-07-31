import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Banknote, PieChart, Share2, TrendingUp, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/growth/attribution")({
  head: () => ({
    meta: [
      { title: "Channel Attribution — CEA-OS" },
      { name: "description", content: "Channel performance with CAC, LTV and ROAS." },
    ],
  }),
  component: ChannelAttribution,
});

const channels = [
  {
    t: "Referral",
    cac: "₦42k",
    ltv: "₦312k",
    roas: "7.4x",
    spend: "₦1.1m",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Meta ads",
    cac: "₦68k",
    ltv: "₦256k",
    roas: "3.8x",
    spend: "₦4.2m",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "LinkedIn",
    cac: "₦84k",
    ltv: "₦284k",
    roas: "3.4x",
    spend: "₦2.6m",
    tone: "bg-learning/10 text-learning",
  },
  {
    t: "TikTok & reels",
    cac: "₦51k",
    ltv: "₦198k",
    roas: "3.9x",
    spend: "₦1.8m",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Radio & OOH",
    cac: "₦92k",
    ltv: "₦241k",
    roas: "2.6x",
    spend: "₦1.4m",
    tone: "bg-muted-foreground/10 text-muted-foreground",
  },
];

function ChannelAttribution() {
  return (
    <AppShell
      roleKey="growth"
      title="Channel attribution"
      subtitle="Blended CAC ₦64k · LTV:CAC 1.9x · 5 channels tracked"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Referral best ROAS
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/growth">
              <ArrowLeft className="size-4" /> Growth hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Channels",
            value: "5",
            delta: "2 under scrutiny",
            icon: PieChart,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Blended CAC",
            value: "₦64k",
            delta: "−12% QoQ",
            icon: Wallet,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "LTV:CAC",
            value: "1.9x",
            delta: "target 2.5x",
            icon: Banknote,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Blended ROAS",
            value: "4.0x",
            delta: "Q3 to date",
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

      <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {channels.map((c) => (
          <Card key={c.t} className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Share2 className={cn("size-4", c.tone)} /> {c.t}
              </CardTitle>
              <Badge className={cn("border-0 font-semibold", c.tone)}>{c.roas} ROAS</Badge>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border p-3">
                <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                  CAC
                </p>
                <p className="font-display mt-1 text-sm font-extrabold">{c.cac}</p>
              </div>
              <div className="rounded-xl border p-3">
                <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                  LTV
                </p>
                <p className="font-display mt-1 text-sm font-extrabold">{c.ltv}</p>
              </div>
              <div className="rounded-xl border p-3">
                <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                  Spend
                </p>
                <p className="font-display mt-1 text-sm font-extrabold">{c.spend}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
