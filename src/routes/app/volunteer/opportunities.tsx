import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, HandHeart, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/volunteer/opportunities")({
  head: () => ({
    meta: [
      { title: "Opportunities — CEA-OS" },
      { name: "description", content: "Volunteer opportunities at CEA and with NGO partners." },
    ],
  }),
  component: VolunteerOpportunities,
});

const ops = [
  {
    o: "Career fair booth support",
    d: "Aug 20 · Ikeja HQ",
    slots: "4 of 6 filled",
    tone: "bg-primary/10 text-primary",
  },
  {
    o: "Mentor hour for Cohort 15",
    d: "Weekly · online",
    slots: "2 of 5 filled",
    tone: "bg-learning/10 text-learning",
  },
  {
    o: "Community outreach — Abeokuta",
    d: "Sep 5 · with NGO partner",
    slots: "10 of 15 filled",
    tone: "bg-success/10 text-success",
  },
];

function VolunteerOpportunities() {
  return (
    <AppShell
      roleKey="student"
      title="Opportunities"
      subtitle="9 open · matches your interests"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">3 upcoming</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/volunteer">
              <ArrowLeft className="size-4" /> Volunteer portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open now",
            value: "9",
            delta: "3 high priority",
            icon: HandHeart,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "This month",
            value: "14",
            delta: "vs 11 last",
            icon: CalendarDays,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Total hours offered",
            value: "320",
            delta: "across programs",
            icon: Users,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Locations",
            value: "3",
            delta: "campus + community",
            icon: MapPin,
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
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <HandHeart className="text-primary size-4" /> Recommended for you
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {ops.map((o) => (
            <div key={o.o} className="flex flex-wrap items-center gap-3 rounded-xl border p-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{o.o}</p>
                <p className="text-muted-foreground text-xs">{o.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", o.tone)}>{o.slots}</Badge>
              <Button
                size="sm"
                className="bg-gradient-brand shadow-glow shrink-0 border-0 font-semibold"
              >
                Sign up
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
