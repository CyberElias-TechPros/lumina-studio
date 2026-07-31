import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Bell, Eye, MessagesSquare, Send, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/behavioral-design/nudge-campaigns")({
  head: () => ({
    meta: [
      { title: "Nudge Campaigns — CEA-OS" },
      {
        name: "description",
        content: "Campaign builder with trigger conditions and message previews.",
      },
    ],
  }),
  component: NudgeCampaigns,
});

const campaigns = [
  {
    t: "Streak saver · evening",
    trigger: "Missed 2 lessons before 6pm",
    channel: "WhatsApp",
    sends: "1,240",
    optOut: "0.8%",
    status: "Live",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Deadline anchor · cohort 17",
    trigger: "Viewed apply page twice",
    channel: "Email",
    sends: "860",
    optOut: "1.1%",
    status: "Live",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Referral thank-you",
    trigger: "Successful referral paid",
    channel: "In-app",
    sends: "312",
    optOut: "0.4%",
    status: "Scheduled",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Portfolio milestone",
    trigger: "Project 3 submitted",
    channel: "Email",
    sends: "0",
    optOut: "—",
    status: "Draft",
    tone: "bg-muted-foreground/10 text-muted-foreground",
  },
];

function NudgeCampaigns() {
  return (
    <AppShell
      roleKey="behavioral-design"
      title="Nudge campaigns"
      subtitle="14 campaigns · 9 live · opt-out avg 0.9% · ethics passed"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Opt-out 0.9%</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/behavioral-design">
              <ArrowLeft className="size-4" /> Behavior hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Campaigns",
            value: "14",
            delta: "9 live",
            icon: Zap,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Triggers",
            value: "11",
            delta: "behaviour-based",
            icon: Bell,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Sends (30d)",
            value: "18.2k",
            delta: "+14% MoM",
            icon: Send,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Opt-out rate",
            value: "0.9%",
            delta: "target under 1.5%",
            icon: Eye,
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
              <Bell className="text-primary size-4" /> Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {campaigns.map((c) => (
              <div
                key={c.t}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <MessagesSquare className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{c.t}</p>
                  <p className="text-muted-foreground text-xs">
                    {c.trigger} · {c.channel} · {c.sends} sends
                  </p>
                </div>
                <Badge className={cn("border-0 font-semibold", c.tone)}>{c.status}</Badge>
                <Button variant="outline" size="sm" className="shrink-0">
                  Configure
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Eye className="text-primary size-4" /> Message preview · streak saver
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border p-4">
              <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                Trigger
              </p>
              <p className="mt-1 text-sm font-semibold">
                Missed 2 lessons before 6pm · 14 days of streak
              </p>
              <div className="mt-3 flex items-center justify-between text-xs font-semibold">
                <span className="text-muted-foreground">Audience</span>
                <span>1,240 learners</span>
              </div>
              <Progress value={86} className="mt-1.5 h-1.5" />
            </div>
            <div className="bg-gradient-ink text-ink-foreground rounded-xl p-4">
              <p className="font-display text-sm font-extrabold">
                Ada, your 21-day streak is on the line.
              </p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                One 15-minute lesson today keeps your streak alive. Chiamaka in your cohort just
                finished her day 18.
              </p>
            </div>
            <Button
              size="sm"
              className="bg-gradient-brand shadow-glow w-full border-0 font-semibold"
            >
              Save & deploy
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
