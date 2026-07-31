import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, CalendarClock, Target, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/intern/mentorship")({
  head: () => ({
    meta: [
      { title: "Mentorship — CEA-OS" },
      { name: "description", content: "Sessions and notes with your mentor." },
    ],
  }),
  component: InternMentorship,
});

const sessions = [
  { s: "Career direction & growth plan", d: "Jul 24 · 45 min", tone: "bg-success/10 text-success" },
  { s: "CI/CD deep dive", d: "Jul 10 · 60 min", tone: "bg-primary/10 text-primary" },
  { s: "Onboarding & expectations", d: "Jun 26 · 40 min", tone: "bg-learning/10 text-learning" },
];

function InternMentorship() {
  return (
    <AppShell
      roleKey="student"
      title="Mentorship"
      subtitle="Mentor: Ms. Chidera · DevOps lead · next Wed 10:00"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">4 sessions</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/intern">
              <ArrowLeft className="size-4" /> Intern hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Sessions",
            value: "4",
            delta: "of 8 planned",
            icon: CalendarClock,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Hours mentored",
            value: "3.2h",
            delta: "in 2026",
            icon: Target,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Goals set",
            value: "6",
            delta: "2 achieved",
            icon: BookOpen,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Next session",
            value: "Wed",
            delta: "10:00 · 60 min",
            icon: UserRound,
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <CalendarClock className="text-primary size-4" /> Past sessions
          </CardTitle>
          <Button variant="outline" size="sm" className="font-semibold">
            Book session
          </Button>
        </CardHeader>
        <CardContent className="divide-y">
          {sessions.map((s) => (
            <div key={s.s} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{s.s}</p>
                <p className="text-muted-foreground text-xs">{s.d}</p>
              </div>
              <Badge className={cn("border-0 font-semibold", s.tone)}>Completed</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Notes
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
