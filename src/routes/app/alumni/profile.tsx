"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { toast } from "sonner";
import { useState } from "react";
import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Eye,
  GraduationCap,
  MapPin,
  Pencil,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import type { AluAchievement, AluJob, AluSkill } from "@/lib/api/alumni";
import { useAluAchievements, useAluJobs, useAluSkills } from "@/lib/query/alumni";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/alumni/profile")({
  head: () => ({
    meta: [
      { title: "My Alumni Profile — CEA-OS" },
      {
        name: "description",
        content: "Your public alumni profile, employment history and certifications.",
      },
    ],
  }),
  component: AlumniProfile,
});

const achievementMeta = [
  { icon: GraduationCap, tone: "bg-primary/10 text-primary" },
  { icon: Award, tone: "bg-warning/10 text-warning" },
  { icon: Star, tone: "bg-learning/10 text-learning" },
];

function AlumniProfile() {
  const jobsQuery = useAluJobs();
  const achievementsQuery = useAluAchievements();
  const skillsQuery = useAluSkills();
  const [visibleToEmployers, setVisibleToEmployers] = useState(true);

  const shareProfile = async () => {
    const shareData = {
      title: "Ada Obi · CEA alumni profile",
      text: "View Ada Obi's verified CEA alumni profile.",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Profile link copied");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast.error("Could not share the profile link");
    }
  };

  return (
    <AppShell
      roleKey="alumni"
      title="My profile"
      subtitle="Public alumni profile · visible to employers"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            <BadgeCheck className="mr-1 size-3" /> Verified alumnus
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/alumni/hub">
              <Share2 className="size-3.5" /> View public profile
            </Link>
          </Button>
        </>
      }
    >
      <Card className="bg-card shadow-soft border">
        <CardContent className="flex flex-wrap items-center gap-5 p-6">
          <Avatar className="size-16">
            <AvatarImage src="" alt="Ada Obi" />
            <AvatarFallback className="bg-gradient-brand text-lg font-extrabold text-white">
              AO
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-display text-xl font-extrabold">Ada Obi</p>
              <Badge className="bg-success/10 text-success border-0 font-semibold">Verified</Badge>
              <Badge className="bg-primary/10 text-primary border-0 font-semibold">
                Open to mentoring
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold">
              <span className="flex items-center gap-1">
                <BriefcaseBusiness className="size-3.5" /> Frontend Engineer · Kuda
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5" /> Lekki, Lagos
              </span>
            </p>
            <p className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs">
              <span className="flex items-center gap-1">
                <GraduationCap className="size-3.5" /> Cohort 12 · Full-Stack · Class of 2024
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays className="size-3.5" /> Member since 2024
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="font-semibold">
              <Pencil className="size-3.5" /> Edit
            </Button>
            <Button
              size="sm"
              className="bg-gradient-brand shadow-glow border-0 font-semibold"
              onClick={shareProfile}
            >
              <Share2 className="size-3.5" /> Share profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <BriefcaseBusiness className="text-primary size-4" /> Employment history
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <QueryState<AluJob[]>
              query={jobsQuery}
              error={{ title: "Employment history unavailable" }}
              empty={{
                title: "No employment history",
                description: "Your roles will appear here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((j) => (
                    <div key={j.id} className="rounded-xl border p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold">
                            {j.role}
                            <span className="text-muted-foreground"> · {j.company}</span>
                          </p>
                          <p className="text-muted-foreground mt-0.5 text-xs">
                            {j.period} · {j.place}
                          </p>
                        </div>
                        {j.current === 1 && (
                          <Badge className="bg-success/10 text-success border-0 font-semibold">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
                        {j.description}
                      </p>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Award className="text-primary size-4" /> Achievements & certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <QueryState<AluAchievement[]>
                query={achievementsQuery}
                error={{ title: "Achievements unavailable" }}
                empty={{
                  title: "No achievements yet",
                  description: "Your certifications will appear here.",
                }}
                isEmpty={(rows) => rows.length === 0}
              >
                {(rows) => (
                  <>
                    {rows.map((a, i) => {
                      const meta = achievementMeta[i % achievementMeta.length];
                      return (
                        <div key={a.id} className="flex items-center gap-3 rounded-xl border p-3">
                          <span
                            className={cn(
                              "grid size-9 shrink-0 place-items-center rounded-lg",
                              meta.tone,
                            )}
                          >
                            <meta.icon className="size-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold">{a.title}</p>
                            <p className="text-muted-foreground text-[11px]">
                              {a.org} · {a.year}
                            </p>
                          </div>
                          <Badge className="bg-success/10 text-success border-0 font-semibold">
                            <ShieldCheck className="mr-1 size-3" /> Verified
                          </Badge>
                        </div>
                      );
                    })}
                  </>
                )}
              </QueryState>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Sparkles className="text-primary size-4" /> Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <QueryState<AluSkill[]>
                query={skillsQuery}
                error={{ title: "Skills unavailable" }}
                empty={{
                  title: "No skills added",
                  description: "Add skills to boost your profile visibility.",
                }}
                isEmpty={(rows) => rows.length === 0}
              >
                {(rows) => (
                  <>
                    {rows.map((s) => (
                      <Badge key={s.id} variant="secondary" className="font-semibold">
                        {s.name}
                      </Badge>
                    ))}
                  </>
                )}
              </QueryState>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardContent className="flex flex-wrap items-center gap-4 p-5">
          <span className="bg-success/10 text-success grid size-10 place-items-center rounded-xl">
            <Eye className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">Visible to employers</p>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Employers on the talent board can view your profile and reach out about roles. Turn
              this off to hide your profile while you're not job hunting.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              className={cn(
                "border-0 font-semibold",
                visibleToEmployers
                  ? "bg-success/10 text-success"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {visibleToEmployers ? "On" : "Off"}
            </Badge>
            <Switch
              checked={visibleToEmployers}
              onCheckedChange={setVisibleToEmployers}
              aria-label="Visible to employers"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-ink mt-5 text-ink-foreground shadow-elevated border-0">
        <CardContent className="flex flex-wrap items-center gap-4 p-6">
          <span className="bg-ink-foreground/10 grid size-10 place-items-center rounded-xl">
            <UserRound className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold">Profile health</p>
            <p className="text-ink-foreground/70 text-xs">
              Profiles with 5+ verified skills get 3x more employer views. You're 92% complete — add
              a portfolio link to finish.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent text-ink-foreground border-ink-foreground/30 font-semibold hover:bg-ink-foreground/10"
          >
            Complete profile
          </Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}
