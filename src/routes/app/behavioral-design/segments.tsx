import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Brain, Compass, Target, UserRound, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/behavioral-design/segments")({
  head: () => ({
    meta: [
      { title: "User Segments — CEA-OS" },
      {
        name: "description",
        content: "Learner segments with traits and recommended interventions.",
      },
    ],
  }),
  component: SegmentExplorer,
});

const segments = [
  {
    t: "Weekend warriors",
    size: "1,120",
    share: "29%",
    traits: "Evening study · mobile-first · deadline-driven",
    rec: "Streak-saver · deadline anchoring",
    tone: "bg-primary/10 text-primary",
    pct: 72,
  },
  {
    t: "Career switchers",
    size: "980",
    share: "25%",
    traits: "28-40 · low time budget · job-focused",
    rec: "Commitment emails · milestone proof",
    tone: "bg-learning/10 text-learning",
    pct: 64,
  },
  {
    t: "Early adopters",
    size: "640",
    share: "17%",
    traits: "High streak · referral active · forum posters",
    rec: "Social proof · referral asks",
    tone: "bg-success/10 text-success",
    pct: 88,
  },
  {
    t: "At-risk lurkers",
    size: "520",
    share: "13%",
    traits: "Enrolled 30d+ · no lesson in 7d",
    rec: "Streak rescue · peer pair",
    tone: "bg-warning/10 text-warning",
    pct: 41,
  },
];

function SegmentExplorer() {
  return (
    <AppShell
      roleKey="behavioral-design"
      title="Segment explorer"
      subtitle="9 segments · 3,860 learners covered · refresh nightly"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            2 new segments
          </Badge>
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
            label: "Segments",
            value: "9",
            delta: "2 new this qtr",
            icon: UsersRound,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Learners covered",
            value: "3,860",
            delta: "52% of enrolled",
            icon: UserRound,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Interventions mapped",
            value: "14",
            delta: "of 18 in library",
            icon: Brain,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Nudge adoption",
            value: "61%",
            delta: "+5 pts QoQ",
            icon: Target,
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

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {segments.map((s) => (
          <Card key={s.t} className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Compass className={cn("size-4", s.tone)} /> {s.t}
              </CardTitle>
              <Badge className={cn("border-0 font-semibold", s.tone)}>{s.share} of learners</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-xl border p-3">
                <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                  Size
                </p>
                <p className="mt-0.5 text-xs font-semibold">{s.size} learners</p>
              </div>
              <div className="rounded-xl border p-3">
                <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                  Behaviour traits
                </p>
                <p className="mt-0.5 text-xs font-semibold">{s.traits}</p>
              </div>
              <div className="rounded-xl border p-3">
                <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                  Recommended interventions
                </p>
                <p className="text-success mt-0.5 text-xs font-bold">{s.rec}</p>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-muted-foreground">Nudge coverage</span>
                <span>{s.pct}%</span>
              </div>
              <Progress value={s.pct} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
