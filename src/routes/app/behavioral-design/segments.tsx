"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, Brain, Compass, Target, UserRound, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useBdSegments } from "@/lib/query/behavioral";
import type { BdSegment } from "@/lib/api/behavioral";
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

const tones = [
  "bg-primary/10 text-primary",
  "bg-learning/10 text-learning",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
];

function SegmentExplorer() {
  const segmentsQuery = useBdSegments();

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

      <QueryState<BdSegment[]>
        query={segmentsQuery}
        error={{ title: "Segments unavailable" }}
        empty={{ title: "No segments", description: "Learner segments will show here." }}
        isEmpty={(rows) => rows.length === 0}
      >
        {(rows) => (
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {rows.map((s, i) => (
              <Card key={s.id} className="bg-card shadow-soft border">
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                    <Compass className={cn("size-4", tones[i % tones.length])} /> {s.name}
                  </CardTitle>
                  <Badge className={cn("border-0 font-semibold", tones[i % tones.length])}>
                    {s.status}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-xl border p-3">
                    <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                      Size
                    </p>
                    <p className="mt-0.5 text-xs font-semibold">
                      {s.size.toLocaleString()} learners
                    </p>
                  </div>
                  <div className="rounded-xl border p-3">
                    <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                      Behaviour traits
                    </p>
                    <p className="mt-0.5 text-xs font-semibold">{s.traits}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </QueryState>
    </AppShell>
  );
}
