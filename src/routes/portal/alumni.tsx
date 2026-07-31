import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Gift,
  GraduationCap,
  HeartHandshake,
  MessageSquare,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/alumni")({
  head: () => ({
    meta: [
      { title: "Alumni Portal — CEA-OS" },
      {
        name: "description",
        content:
          "Your alumni workspace: the network, exclusive jobs, events, mentorship and giving back.",
      },
    ],
  }),
  component: AlumniPortal,
});

const network = [
  {
    name: "Adaeze Okafor",
    role: "Frontend Engineer · Paystack",
    tag: "Cohort 15",
    tone: "bg-primary/10 text-primary",
  },
  {
    name: "Tunde Bakare",
    role: "DevOps Engineer · Andela",
    tag: "Cohort 11",
    tone: "bg-erp/10 text-erp",
  },
  {
    name: "Chidinma Eze",
    role: "SOC Analyst · Interswitch",
    tag: "Cohort 12",
    tone: "bg-learning/10 text-learning",
  },
];

function AlumniPortal() {
  return (
    <AppShell
      roleKey="student"
      title="Alumni portal"
      subtitle="Class of 2024 · Full-Stack · 2 years out"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">Mentor alumni</Badge>
          <Button asChild variant="outline" size="sm" className="ml-auto">
            <Link to="/alumni">Public alumni page</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Network",
            value: "1,240",
            delta: "CEA alumni",
            icon: Users,
            tone: "bg-community/10 text-community",
          },
          {
            label: "Alumni-exclusive jobs",
            value: "38",
            delta: "12 new this week",
            icon: BriefcaseBusiness,
            tone: "bg-career/10 text-career",
          },
          {
            label: "Mentoring hours",
            value: "34",
            delta: "this year",
            icon: HeartHandshake,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Events this quarter",
            value: "6",
            delta: "next: Sep 12 fair",
            icon: CalendarDays,
            tone: "bg-primary/10 text-primary",
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Users className="text-primary size-4" /> Alumni directory
              </CardTitle>
              <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
                <Link to="/alumni">
                  Browse directory <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {network.map((n) => (
                <div key={n.name} className="flex items-center gap-3 rounded-xl border p-3.5">
                  <span className="bg-gradient-community text-white font-display grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold">
                    {n.name
                      .split(" ")
                      .map((x) => x[0])
                      .join("")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{n.name}</p>
                    <p className="text-muted-foreground truncate text-xs">{n.role}</p>
                  </div>
                  <Badge className={cn("border-0 font-semibold", n.tone)}>{n.tag}</Badge>
                  <Button variant="outline" size="sm" className="shrink-0">
                    Connect
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <GraduationCap className="text-primary size-4" /> Lifelong learning
              </CardTitle>
              <Badge variant="secondary" className="font-semibold">
                Free for alumni
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              {[
                { t: "System design refresher", d: "Self-paced · 6h" },
                { t: "AI for engineers", d: "Starts Sep 2" },
                { t: "Leadership essentials", d: "Workshop · Oct" },
              ].map((c) => (
                <div key={c.t} className="rounded-xl border p-4">
                  <p className="text-sm font-bold">{c.t}</p>
                  <p className="text-muted-foreground mt-1 text-xs">{c.d}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Gift className="text-primary size-4" /> Giving back
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Mentor a current learner", d: "2h/month · you're signed up" },
                { t: "Career fair volunteer", d: "Sep 12 · register now" },
                { t: "Scholarship fund", d: "₦78k raised by alumni this quarter" },
              ].map((g) => (
                <div key={g.t} className="rounded-xl border p-3.5">
                  <p className="text-sm font-bold">{g.t}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{g.d}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <MessageSquare className="text-primary size-4" /> Alumni WhatsApp
              </CardTitle>
              <Badge className="bg-error/10 text-error h-5 border-0 text-[10px] font-bold">
                128 online
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed">
                3,400 alumni in one group. Job drops, referral swaps and the occasional roast of
                capstone stress. You know the drill.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-4">
                <Link to="/community">
                  Open community <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <HeartHandshake className="text-community size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Mentor recognition</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                You've hit 34 hours this year. Invite to the September mentor dinner at the campus.
              </p>
              <Button asChild size="sm" className="bg-gradient-brand shadow-glow mt-4 border-0">
                <Link to="/events">
                  RSVP to events <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
