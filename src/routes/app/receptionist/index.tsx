import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, LogIn, LogOut, Phone, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import {
  useRecAppointmentItems,
  useRecInsideItems,
  useRecQueueItems,
} from "@/lib/query/volunteerReceptionist";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/receptionist/")({
  head: () => ({
    meta: [
      { title: "Reception Hub — CEA-OS" },
      { name: "description", content: "Check-in, appointments, directory and logs." },
    ],
  }),
  component: ReceptionHub,
});

const screens = [
  {
    icon: LogIn,
    label: "Check-In",
    desc: "Visitor arrival",
    path: "/app/receptionist/check-in",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: LogOut,
    label: "Check-Out",
    desc: "Departures",
    path: "/app/receptionist/check-out",
    tone: "bg-learning/10 text-learning",
  },
  {
    icon: CalendarDays,
    label: "Appointments",
    desc: "Bookings, schedule",
    path: "/app/receptionist/appointments",
    tone: "bg-success/10 text-success",
  },
  {
    icon: Users,
    label: "Directory",
    desc: "Staff, extensions",
    path: "/app/receptionist/directory",
    tone: "bg-warning/10 text-warning",
  },
];

function ReceptionHub() {
  const queue = useRecQueueItems();
  const inside = useRecInsideItems();
  const appointments = useRecAppointmentItems();

  const onsite = inside.length;
  const waiting = queue.length;

  return (
    <AppShell
      roleKey="receptionist"
      title="Reception hub"
      subtitle="Front desk · visitors on site"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {onsite > 0 ? `${onsite} on site` : "No visitors on site"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/receptionist">
              <ArrowLeft className="size-4" /> Receptionist portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "On site",
            value: queue.length > 0 ? String(onsite) : "—",
            delta: "across the building",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Waiting",
            value: waiting > 0 ? String(waiting) : "—",
            delta: "in the lobby",
            icon: LogIn,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Appointments",
            value: appointments.length > 0 ? String(appointments.length) : "—",
            delta: "today",
            icon: CalendarDays,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Calls",
            value: "12",
            delta: "phone log entries",
            icon: Phone,
            tone: "bg-learning/10 text-learning",
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
        <CardContent className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
          {screens.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="group bg-card shadow-soft hover:shadow-elevated flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className={cn("grid size-9 place-items-center rounded-lg", s.tone)}>
                  <s.icon className="size-4" />
                </span>
                <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
              </div>
              <p className="font-display mt-3 text-sm font-extrabold">{s.label}</p>
              <p className="text-muted-foreground mt-1 text-xs">{s.desc}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
