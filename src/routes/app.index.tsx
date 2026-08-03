import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock,
  GraduationCap,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/app/app-shell";
import { SceneArt } from "@/components/art/scene-art";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Dashboards — CEA-OS | Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Role-based dashboards on CEA-OS: students, instructors, employers, staff and leadership all work in one connected platform.",
      },
    ],
  }),
  component: Dashboard,
});

const courses = [
  {
    title: "Full-Stack Software Development",
    pct: 78,
    next: "Lesson 24 · Backend, APIs & Databases",
    due: "Fri",
    tone: "bg-gradient-learning",
  },
  {
    title: "Cloud Engineering & DevOps",
    pct: 54,
    next: "Lesson 12 · Containers & Kubernetes",
    due: "Mon",
    tone: "bg-gradient-erp",
  },
  {
    title: "Product & UI/UX Design",
    pct: 31,
    next: "Lesson 7 · Interface & Design Systems",
    due: "Wed",
    tone: "bg-gradient-services",
  },
];

const stats = [
  { label: "GPA", value: "4.2", delta: "+0.1", icon: GraduationCap },
  { label: "Assignments done", value: "18/22", delta: "4 due", icon: CheckCircle2 },
  { label: "Attendance", value: "94%", delta: "+2%", icon: Users },
  { label: "Certificates", value: "2", delta: "1 pending", icon: Award },
];

const assignments = [
  { title: "REST API Design", course: "Full-Stack", due: "Today 23:59", status: "Urgent" },
  { title: "SIEM Detection Rule", course: "Cybersecurity", due: "Fri 18:00", status: "Due soon" },
  { title: "Design System Audit", course: "UI/UX", due: "Next Wed", status: "Upcoming" },
];

function Dashboard() {
  return (
    <AppShell
      title="Good morning, Ada"
      subtitle="Cohort 15 · Full-Stack Software Development · Week 12 of 38"
    >
      <div className="relative mb-6 h-44 overflow-hidden rounded-2xl border sm:h-52">
        <SceneArt variant="code">
          <div className="flex h-full items-end p-5 sm:p-6">
            <div className="max-w-lg">
              <p className="text-white/70 text-xs font-bold tracking-[0.18em] uppercase">
                Cohort 15 · Week 12 of 38
              </p>
              <h2 className="font-display mt-1 text-lg font-extrabold text-white sm:text-xl">
                You're ahead of 68% of your cohort — keep shipping.
              </h2>
            </div>
          </div>
        </SceneArt>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="bg-card shadow-soft border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                  {s.label}
                </p>
                <s.icon className="text-primary size-4" />
              </div>
              <div className="mt-3 flex items-end gap-2">
                <p className="font-display text-3xl font-extrabold">{s.value}</p>
                <span className="text-success mb-1 flex items-center text-xs font-bold">
                  <TrendingUp className="size-3" /> {s.delta}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display text-base font-bold">Continue learning</CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
                <Link to="/app">
                  Open learning hub <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.map((c) => (
                <div
                  key={c.title}
                  className="group rounded-xl border p-4 transition-colors hover:border-primary/30"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-sm font-bold">{c.title}</p>
                    <span className="text-muted-foreground shrink-0 text-xs font-semibold">
                      {c.pct}%
                    </span>
                  </div>
                  <Progress value={c.pct} className="mt-2.5 h-1.5" />
                  <div className="text-muted-foreground mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="size-3.5" /> {c.next}
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold">
                      <CalendarDays className="size-3.5" /> Next: {c.due}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display text-base font-bold">
                Upcoming assignments
              </CardTitle>
              <Badge variant="secondary" className="font-semibold">
                3 due this week
              </Badge>
            </CardHeader>
            <CardContent className="divide-y">
              {assignments.map((a) => (
                <div key={a.title} className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0">
                  <span className="bg-primary/10 text-primary grid size-9 shrink-0 place-items-center rounded-lg">
                    <Clock className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{a.title}</p>
                    <p className="text-muted-foreground text-xs">
                      {a.course} · {a.due}
                    </p>
                  </div>
                  <Badge
                    className={
                      a.status === "Urgent"
                        ? "bg-error/10 text-error border-0"
                        : a.status === "Due soon"
                          ? "bg-warning/10 text-warning border-0"
                          : "bg-muted text-muted-foreground border-0"
                    }
                  >
                    {a.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <p className="text-ink-foreground/60 text-xs font-bold tracking-[0.16em] uppercase">
                Job match
              </p>
              <p className="font-display mt-2 text-xl font-extrabold">Frontend Engineer</p>
              <p className="text-ink-foreground/70 text-sm">Paystack · Lagos · Hybrid</p>
              <div className="mt-4 flex items-center gap-2">
                <Progress value={96} className="h-1.5 flex-1 bg-ink-foreground/15" />
                <span className="text-career text-xs font-extrabold">96%</span>
              </div>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-5 border-0">
                <Link to="/marketplace">
                  View the role <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display text-base font-bold">Today</CardTitle>
              <span className="text-muted-foreground text-xs font-semibold">3 sessions</span>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  time: "09:00",
                  title: "Live class · Backend & Databases",
                  tag: "Class",
                  tone: "text-learning",
                },
                {
                  time: "14:00",
                  title: "Mentor circle with Emeka",
                  tag: "Mentor",
                  tone: "text-career",
                },
                {
                  time: "18:30",
                  title: "Study group · Week 12 review",
                  tag: "Group",
                  tone: "text-community",
                },
              ].map((e) => (
                <div key={e.time} className="flex items-center gap-3 rounded-xl border p-3">
                  <span className="font-display text-muted-foreground w-12 shrink-0 text-xs font-bold">
                    {e.time}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{e.title}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${e.tone} border-0 bg-transparent font-bold`}
                  >
                    {e.tag}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <MessageSquare className="text-primary size-4" /> Mentor note
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed">
                “Your REST API submission was the strongest in the cohort. Push the same rigor into
                the design system audit — that's the differentiator on your portfolio.”
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="bg-gradient-career text-primary-foreground font-display grid size-8 place-items-center rounded-full text-[10px] font-bold">
                  EN
                </span>
                <span className="text-xs font-semibold">Emeka Nwosu</span>
                <span className="text-muted-foreground text-xs">· 2h ago</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display text-base font-bold">Next milestones</CardTitle>
              <ArrowUpRight className="text-muted-foreground size-4" />
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  icon: BriefcaseBusiness,
                  text: "Portfolio: publish case study #3",
                  meta: "Due in 9 days",
                },
                {
                  icon: GraduationCap,
                  text: "Capstone kickoff · client brief",
                  meta: "Starts Nov 2",
                },
              ].map((m) => (
                <div key={m.text} className="flex items-start gap-3">
                  <span className="bg-primary/10 text-primary mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg">
                    <m.icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{m.text}</p>
                    <p className="text-muted-foreground text-xs">{m.meta}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
