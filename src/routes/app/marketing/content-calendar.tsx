import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, CalendarPlus2, CheckCircle2, ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/marketing/content-calendar")({
  head: () => ({
    meta: [
      { title: "Content Calendar — CEA-OS" },
      { name: "description", content: "Plan and publish content across channels." },
    ],
  }),
  component: MarketingContentCalendar,
});

const items = [
  {
    i: "Blog: alumni success — Ngozi",
    ch: "Blog",
    d: "Aug 4",
    s: "In production",
    tone: "bg-primary/10 text-primary",
  },
  {
    i: "Instagram carousel — open house",
    ch: "Social",
    d: "Aug 6",
    s: "Scheduled",
    tone: "bg-learning/10 text-learning",
  },
  {
    i: "Email: application deadline",
    ch: "Email",
    d: "Aug 7",
    s: "Approved",
    tone: "bg-success/10 text-success",
  },
  {
    i: "LinkedIn — employer partnership",
    ch: "Social",
    d: "Aug 11",
    s: "Draft",
    tone: "bg-warning/10 text-warning",
  },
];

function MarketingContentCalendar() {
  return (
    <AppShell
      roleKey="instructor"
      title="Content calendar"
      subtitle="14 items this month · 8 published"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Cadence met</Badge>
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
            label: "This month",
            value: "14",
            delta: "4 channels",
            icon: CalendarDays,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Published",
            value: "8",
            delta: "57% done",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "In production",
            value: "3",
            delta: "2 due this week",
            icon: ClipboardList,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Next week",
            value: "5",
            delta: "planned",
            icon: CalendarPlus2,
            tone: "bg-learning/10 text-learning",
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
            <CalendarDays className="text-primary size-4" /> Upcoming
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {items.map((i) => (
            <div key={i.i} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{i.i}</p>
                <p className="text-muted-foreground text-xs">
                  {i.ch} · {i.d}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", i.tone)}>{i.s}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Open
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
