import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, Video, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/receptionist/appointments")({
  head: () => ({
    meta: [
      { title: "Appointments — CEA-OS" },
      { name: "description", content: "Book and manage front desk appointments." },
    ],
  }),
  component: ReceptionistAppointments,
});

const slots = [
  {
    t: "Mr. Adeyemi — meeting room 2",
    d: "10:00 · 45 min",
    who: "Oluwaseun Adebayo",
    status: "Arrived",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Registrar — records room",
    d: "10:30 · 30 min",
    who: "Mrs. Ngozi Eze",
    status: "Confirmed",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "HR — interview room A",
    d: "11:15 · 60 min",
    who: "Tobi Adeyemi",
    status: "Confirmed",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Career office — counselling",
    d: "13:00 · 30 min",
    who: "Zainab Yusuf",
    status: "Available",
    tone: "bg-muted-foreground/10 text-muted-foreground",
  },
];

function ReceptionistAppointments() {
  return (
    <AppShell
      roleKey="student"
      title="Appointments"
      subtitle="Front desk · today · 9 appointments"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">3 in next 2h</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/receptionist">
              <ArrowLeft className="size-4" /> Front desk
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Today",
            value: "9",
            delta: "6 confirmed",
            icon: CalendarDays,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Arrived",
            value: "3",
            delta: "hosts notified",
            icon: Users,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Video calls",
            value: "2",
            delta: "check-in room 4",
            icon: Video,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Open slots",
            value: "3",
            delta: "bookable today",
            icon: Clock,
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
            <CalendarDays className="text-primary size-4" /> Today's schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {slots.map((s) => (
            <div key={s.t} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                <Clock className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{s.t}</p>
                <p className="text-muted-foreground text-xs">
                  {s.who} · {s.d}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", s.tone)}>{s.status}</Badge>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Manage
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
