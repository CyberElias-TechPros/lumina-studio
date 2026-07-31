import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Funnel, Megaphone, Target, TrendingUp, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/director/marketing")({
  head: () => ({
    meta: [
      { title: "Marketing Overview — CEA-OS" },
      { name: "description", content: "CAC, funnel and campaign ROI for leadership." },
    ],
  }),
  component: DirectorMarketing,
});

const campaigns = [
  { c: "Q3 digital ads", r: "4.2x", t: "target 5x", tone: "bg-warning/10 text-warning" },
  { c: "Referral program", r: "6.8x", t: "target 5x", tone: "bg-success/10 text-success" },
  { c: "Open-house events", r: "5.4x", t: "target 5x", tone: "bg-primary/10 text-primary" },
];

const funnel = [
  { f: "Leads", v: "412", pct: 100 },
  { f: "Applications", v: "118", pct: 29 },
  { f: "Interviews", v: "89", pct: 22 },
  { f: "Enrolled", v: "64", pct: 16 },
];

function DirectorMarketing() {
  return (
    <AppShell
      roleKey="admin"
      title="Marketing overview"
      subtitle="Q3 · CAC ₦96k · funnel 15.5% lead→enrol"
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            ROAS below target
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/director">
              <ArrowLeft className="size-4" /> Director portal
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
            label: "Leads (MTD)",
            value: "412",
            delta: "+11% MoM",
            icon: Funnel,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Lead→enrol",
            value: "15.5%",
            delta: "target 18%",
            icon: Target,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Spend (MTD)",
            value: "₦1.4m",
            delta: "on budget",
            icon: Megaphone,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <TrendingUp className="text-primary size-4" /> Campaign ROI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {campaigns.map((c) => (
              <div key={c.c} className="flex items-center justify-between rounded-xl border p-3">
                <div>
                  <p className="text-sm font-bold">{c.c}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{c.t}</p>
                </div>
                <Badge className={cn("border-0 font-semibold", c.tone)}>ROAS {c.r}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Funnel className="text-primary size-4" /> Funnel
            </CardTitle>
            <Button asChild variant="outline" size="sm" className="font-semibold">
              <Link to="/portal/marketing">
                Marketing portal <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
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
      </div>
    </AppShell>
  );
}
