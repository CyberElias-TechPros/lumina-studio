import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Search,
  Star,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/alumni/hub")({
  head: () => ({
    meta: [
      { title: "Alumni Hub — CEA-OS" },
      { name: "description", content: "Your alumni network, jobs, events and giving." },
    ],
  }),
  component: AlumniHub,
});

const tiles = [
  {
    to: "/app/alumni/network",
    label: "Network",
    desc: "Search and connect with 1,200+ alumni",
    icon: Users,
    tone: "text-primary bg-primary/10",
  },
  {
    to: "/app/alumni/jobs",
    label: "Job board",
    desc: "Opportunities + refer-a-friend",
    icon: BriefcaseBusiness,
    tone: "text-learning bg-learning/10",
  },
  {
    to: "/app/alumni/events",
    label: "Events",
    desc: "Reunions, career days, workshops",
    icon: CalendarDays,
    tone: "text-success bg-success/10",
  },
  {
    to: "/app/alumni/give-back",
    label: "Give back",
    desc: "Donate, mentor, fund scholarships",
    icon: HandHeart,
    tone: "text-warning bg-warning/10",
  },
];

function AlumniHub() {
  return (
    <AppShell
      roleKey="instructor"
      title="Alumni hub"
      subtitle="Cohort 12 · Full-Stack · Class of 2024"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Member since 2024
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            <Star className="text-warning mr-1 size-3" /> Active donor
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Connections",
            value: "86",
            delta: "+12 this month",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Events RSVP'd",
            value: "3",
            delta: "reunion Sep 6",
            icon: CalendarDays,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Jobs referred",
            value: "4",
            delta: "2 hired",
            icon: BriefcaseBusiness,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Lifetime giving",
            value: "₦480k",
            delta: "2 scholarships",
            icon: HandHeart,
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

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="group bg-card shadow-soft hover:shadow-elevated flex h-full flex-col rounded-2xl border p-5 transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between">
              <span className={cn("grid size-10 place-items-center rounded-xl", t.tone)}>
                <t.icon className="size-5" />
              </span>
              <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
            </div>
            <p className="font-display mt-4 text-sm font-extrabold">{t.label}</p>
            <p className="text-muted-foreground mt-1 flex-1 text-xs leading-relaxed">{t.desc}</p>
          </Link>
        ))}
      </div>

      <Card className="bg-gradient-ink mt-5 text-ink-foreground shadow-elevated border-0">
        <CardContent className="flex flex-wrap items-center gap-4 p-6">
          <span className="bg-ink-foreground/10 grid size-10 place-items-center rounded-xl">
            <GraduationCap className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold">Cohort 12 reunion — Sep 6</p>
            <p className="text-ink-foreground/70 text-xs">
              74 of 86 confirmed. Bring your plus-one — the courtyard opens at 15:00.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="bg-transparent text-ink-foreground border-ink-foreground/30 font-semibold hover:bg-ink-foreground/10"
          >
            <Link to="/app/alumni/events">RSVP</Link>
          </Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}
