"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  GraduationCap,
  Heart,
  Megaphone,
  Quote,
  Rss,
  Send,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { AluMilestone, AluStory } from "@/lib/api/alumni";
import { useAluMilestones, useAluStories } from "@/lib/query/alumni";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/alumni/stories")({
  head: () => ({
    meta: [
      { title: "Success Stories — CEA-OS" },
      {
        name: "description",
        content: "Where CEA alumni work now and how they got there.",
      },
    ],
  }),
  component: AlumniStories,
});

const milestoneMeta = [
  { icon: Rss },
  { icon: BriefcaseBusiness },
  { icon: Users },
  { icon: GraduationCap },
];

function AlumniStories() {
  const storiesQuery = useAluStories();
  const milestonesQuery = useAluMilestones();

  return (
    <AppShell
      roleKey="alumni"
      title="Success stories"
      subtitle="2,400+ alumni working across Lagos and beyond"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            34 stories this year
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/alumni/hub">
              <Megaphone className="size-3.5" /> Alumni hub
            </Link>
          </Button>
        </>
      }
    >
      <Card className="bg-gradient-brand shadow-glow relative overflow-hidden border-0 text-white">
        <CardContent className="flex flex-wrap items-center gap-6 p-6 sm:p-8">
          <span className="bg-white/15 grid size-14 shrink-0 place-items-center rounded-2xl">
            <Quote className="size-6" />
          </span>
          <div className="min-w-0 flex-1">
            <Badge className="bg-white/15 text-white border-0 font-semibold">
              Featured story · Sep 2026
            </Badge>
            <p className="font-display mt-3 max-w-2xl text-lg leading-snug font-extrabold">
              "The mock interviews were harder than the real thing — by the time Paystack called,
              I'd already survived the scariest room in Lagos."
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold">
              Tunde Bakare <span className="text-white/60">·</span>
              <span className="text-white/70">Cohort 12 → Paystack · Platform Engineer</span>
            </p>
          </div>
          <div className="grid gap-2">
            <Badge className="bg-white/15 text-white border-0 font-semibold">
              <Star className="mr-1 size-3" /> Hired in 3 months
            </Badge>
            <Badge className="bg-white/15 text-white border-0 font-semibold">₦9.5m package</Badge>
            <Badge className="bg-white/15 text-white border-0 font-semibold">
              Mentoring 2 learners
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <QueryState<AluStory[]>
          query={storiesQuery}
          error={{ title: "Stories unavailable" }}
          empty={{
            title: "No stories yet",
            description: "Alumni success stories will appear here.",
          }}
          isEmpty={(rows) => rows.length === 0}
        >
          {(rows) => (
            <>
              {rows.map((s) => (
                <Card key={s.id} className="bg-card shadow-soft border">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "grid size-10 shrink-0 place-items-center rounded-xl text-xs font-extrabold text-white",
                          s.tone,
                        )}
                      >
                        {s.initials}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold">{s.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {s.cohort} · {s.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-3 flex items-center gap-1.5 text-xs font-semibold">
                      <BriefcaseBusiness className="size-3.5" /> {s.company}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed">{s.excerpt}</p>
                    <div className="mt-4 flex items-center gap-3 border-t pt-3">
                      <Badge className="bg-success/10 text-success border-0 font-semibold">
                        <BadgeCheck className="mr-1 size-3" /> Verified
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary ml-auto font-semibold"
                      >
                        <Heart className="size-3.5" /> Thank
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </QueryState>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Send className="text-primary size-4" /> Share your journey
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              placeholder="What changed for you after CEA? Where are you working now? Write it here — the careers team will review and publish with your permission."
              className="min-h-32 border font-medium"
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-muted-foreground text-xs font-semibold">
                Published stories reach 40k+ learners, employers and partners.
              </p>
              <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
                <Sparkles className="size-3.5" /> Submit story
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Award className="text-primary size-4" /> Story milestones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <QueryState<AluMilestone[]>
              query={milestonesQuery}
              error={{ title: "Milestones unavailable" }}
              empty={{
                title: "No milestones yet",
                description: "Story milestones will appear here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((m, i) => {
                    const meta = milestoneMeta[i % milestoneMeta.length];
                    return (
                      <div
                        key={m.id}
                        className="flex items-center justify-between rounded-xl border p-3"
                      >
                        <span className="flex items-center gap-2 text-sm font-semibold">
                          <meta.icon className="text-muted-foreground size-4" /> {m.label}
                        </span>
                        <span className="font-display text-lg font-extrabold">{m.value}</span>
                      </div>
                    );
                  })}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
