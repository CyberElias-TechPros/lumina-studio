import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarCheck2, CheckCircle2, Clock3, HandHeart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/volunteer/my-volunteering")({
  head: () => ({
    meta: [
      { title: "My Volunteering — CEA-OS" },
      { name: "description", content: "Your sign-ups and volunteer history." },
    ],
  }),
  component: VolunteerMyVolunteering,
});

const history = [
  { h: "Career fair booth support", d: "Jul 18 · 6h · attended", done: true },
  { h: "Community outreach — Ikeja", d: "Jun 28 · 5h · attended", done: true },
  { h: "Mentor hour Cohort 15", d: "Next · Aug 14", done: false },
];

function VolunteerMyVolunteering() {
  return (
    <AppShell
      roleKey="student"
      title="My volunteering"
      subtitle="8 sign-ups · 47 hours logged · 3 upcoming"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">On track</Badge>
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
            label: "Sign-ups",
            value: "8",
            delta: "this year",
            icon: CalendarCheck2,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Hours logged",
            value: "47",
            delta: "of 60 target",
            icon: Clock3,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Completed",
            value: "5",
            delta: "100% attended",
            icon: CheckCircle2,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Next up",
            value: "3",
            delta: "soonest Aug 14",
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Clock3 className="text-primary size-4" /> History
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {history.map((h) => (
            <div key={h.h} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{h.h}</p>
                <p className="text-muted-foreground text-xs">{h.d}</p>
              </div>
              <Badge
                className={cn(
                  "border-0 font-semibold",
                  h.done ? "bg-success/10 text-success" : "bg-primary/10 text-primary",
                )}
              >
                {h.done ? "Completed" : "Upcoming"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
