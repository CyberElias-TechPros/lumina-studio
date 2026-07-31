import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, HandHeart, MapPin, PartyPopper, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/alumni/give-back")({
  head: () => ({
    meta: [
      { title: "Give Back — CEA-OS" },
      { name: "description", content: "Donate, mentor and fund scholarships." },
    ],
  }),
  component: AlumniGiveBack,
});

const ways = [
  {
    t: "Scholarship fund",
    d: "Fund a student's term — ₦700k covers a full scholarship",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Mentor a learner",
    d: "2 hours a month, online or on campus",
    tone: "bg-learning/10 text-learning",
  },
  {
    t: "Host an internship",
    d: "Open a seat in your team for a final-year learner",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Speaker at career day",
    d: "Share your journey at the Sep 14 event",
    tone: "bg-warning/10 text-warning",
  },
];

function AlumniGiveBack() {
  return (
    <AppShell
      roleKey="instructor"
      title="Give back"
      subtitle="2 scholarships funded · ₦480k lifetime giving"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Donor circle member
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/alumni/hub">
              <ArrowLeft className="size-4" /> Alumni hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Lifetime giving",
            value: "₦480k",
            delta: "2 scholarships",
            icon: HandHeart,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Mentoring hours",
            value: "14h",
            delta: "this quarter",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Students supported",
            value: "3",
            delta: "2 graduated",
            icon: PartyPopper,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Impact rating",
            value: "5★",
            delta: "top giver 2025",
            icon: CalendarDays,
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

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {ways.map((w) => (
          <Card key={w.t} className="bg-card shadow-soft border">
            <CardContent className="p-5">
              <p className="font-display text-sm font-extrabold">{w.t}</p>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">{w.d}</p>
              <Button size="sm" variant="outline" className="mt-4 font-semibold">
                <HandHeart className="size-3.5" /> Get started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <MapPin className="text-primary size-4" /> Impact so far
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          {[
            { v: "2", t: "scholarships funded" },
            { v: "3", t: "mentees guided to jobs" },
            { v: "1", t: "internship hosted" },
          ].map((i) => (
            <div key={i.t} className="rounded-xl border p-4 text-center">
              <p className="font-display text-2xl font-extrabold">{i.v}</p>
              <p className="text-muted-foreground text-xs font-semibold">{i.t}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
