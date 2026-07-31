import { createFileRoute } from "@tanstack/react-router";
import { Gift, Layers, Rocket, Share2, TrendingUp, Users, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/growth")({
  head: () => ({
    meta: [
      { title: "Growth — CEA-OS" },
      {
        name: "description",
        content: "Acquisition loops, referral programs and cohort experiments.",
      },
    ],
  }),
  component: GrowthPortal,
});

const loops = [
  {
    t: "Referral: learner invites learner",
    kpi: "18% of new signups",
    status: "Scaling",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Employer→alumni→jobs loop",
    kpi: "34 hires this year",
    status: "Live",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Open-day→apply funnel",
    kpi: "41% apply within 7d",
    status: "Optimizing",
    tone: "bg-warning/10 text-warning",
  },
];

function GrowthPortal() {
  return (
    <AppShell
      roleKey="instructor"
      title="Growth"
      subtitle="Acquisition, activation and retention · Q3 2026"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">CAC −12% QoQ</Badge>
          <Badge variant="secondary" className="font-semibold">
            1.9× LTV:CAC
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "New learners",
            value: "148",
            delta: "+22% MoM",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Referral signups",
            value: "27",
            delta: "18% of total",
            icon: Gift,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Activation",
            value: "64%",
            delta: "first lesson in 3d",
            icon: Rocket,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "CAC",
            value: "₦64k",
            delta: "−12% QoQ",
            icon: Wallet,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Share2 className="text-primary size-4" /> Growth loops
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {loops.map((l) => (
              <div
                key={l.t}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <Layers className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{l.t}</p>
                  <p className="text-muted-foreground text-xs">{l.kpi}</p>
                </div>
                <Badge className={cn("border-0 font-semibold", l.tone)}>{l.status}</Badge>
                <Button variant="outline" size="sm" className="shrink-0">
                  Dashboard
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <TrendingUp className="text-primary size-4" /> Cohort snapshot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Week-1 retention", v: "88%", tone: "bg-success/10 text-success" },
                {
                  t: "Referral reward payout",
                  v: "₦1.2m · Aug",
                  tone: "bg-primary/10 text-primary",
                },
                {
                  t: "Funnel leak: checkout",
                  v: "−9% · testing",
                  tone: "bg-warning/10 text-warning",
                },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <Gift className="text-warning size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Referral program</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                ₦50k credit per successful referral — 27 claimed this month, payout cycle Aug 5.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
