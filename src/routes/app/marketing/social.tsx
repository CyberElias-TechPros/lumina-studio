import { createFileRoute, Link } from "@tanstack/react-router";
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
import { AppShell } from "@/components/app/app-shell";
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

const posts = [
  {
    p: "Alumni story — Ngozi",
    ch: "Instagram",
    d: "Aug 4 · 10:00",
    s: "Scheduled",
    tone: "bg-primary/10 text-primary",
  },
  {
    p: "Open house recap",
    ch: "LinkedIn",
    d: "Jul 31 · published",
    s: "Live",
    tone: "bg-success/10 text-success",
  },
  {
    p: "Career tips carousel",
    ch: "X",
    d: "Aug 6 · draft",
    s: "Draft",
    tone: "bg-warning/10 text-warning",
  },
];

function MarketingSocial() {
  return (
    <AppShell
      roleKey="instructor"
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
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Followers",
            value: "32k",
            delta: "+4% MoM",
            icon: Heart,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Engagement",
            value: "6.8%",
            delta: "+1.4 pts",
            icon: ThumbsUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Posts (30d)",
            value: "24",
            delta: "6 per channel",
            icon: MessageCircle,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Shares",
            value: "1.2k",
            delta: "top: alumni story",
            icon: Share2,
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <CalendarDays className="text-primary size-4" /> Schedule
          </CardTitle>
          <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
            <CalendarPlus2 className="size-4" /> New post
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {posts.map((p) => (
            <div key={p.p} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{p.p}</p>
                <p className="text-muted-foreground text-xs">
                  {p.ch} · {p.d}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", p.tone)}>{p.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Edit
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
