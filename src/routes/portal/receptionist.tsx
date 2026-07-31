import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  DoorOpen,
  FileText,
  PhoneCall,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/receptionist")({
  head: () => ({
    meta: [
      { title: "Reception Desk — CEA-OS" },
      {
        name: "description",
        content: "Front desk: visitor check-in, visitor requests, calls and desk handover.",
      },
    ],
  }),
  component: ReceptionistPortal,
});

const visitors = [
  {
    name: "Chief K. Adeyemi",
    purpose: "Campus tour · 10:00",
    host: "Elias Okonkwo",
    status: "Checked in",
    tone: "bg-success/10 text-success",
  },
  {
    name: "Ms. Halima Sani",
    purpose: "Parent meeting · 11:30",
    host: "Student Success",
    status: "Awaiting",
    tone: "bg-warning/10 text-warning",
  },
  {
    name: "Mr. Tunde Bakare",
    purpose: "Mentor session · 14:00",
    host: "Adaeze Okafor",
    status: "Expected",
    tone: "bg-primary/10 text-primary",
  },
];

const deskQueue = [
  {
    t: "Passenger pickup — visitor at gate",
    s: "Assigned to guard",
    tone: "bg-primary/10 text-primary",
  },
  { t: "Laptop loan — learner (refundable)", s: "Signed out", tone: "bg-success/10 text-success" },
  { t: "Lost ID card — collected", s: "Awaiting owner", tone: "bg-warning/10 text-warning" },
];

function ReceptionistPortal() {
  return (
    <AppShell
      roleKey="student"
      title="Reception desk"
      subtitle="Front gate · shift 08:00–16:00 · Ola"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            3 visitors today
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            Desk open
          </Badge>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Visitors today",
            value: "9",
            delta: "4 expected",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Calls handled",
            value: "23",
            delta: "0 missed",
            icon: PhoneCall,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Check-ins open",
            value: "2",
            delta: "1 checked in",
            icon: DoorOpen,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Desk messages",
            value: "4",
            delta: "2 for ops",
            icon: Bell,
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Users className="text-primary size-4" /> Visitor register · today
            </CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
              <Link to="/visit">
                Booking form <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="divide-y">
            {visitors.map((v) => (
              <div
                key={v.name}
                className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0"
              >
                <span className="bg-gradient-brand text-white font-display grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold">
                  {v.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{v.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {v.purpose} · host: {v.host}
                  </p>
                </div>
                <Badge className={cn("border-0 font-semibold", v.tone)}>{v.status}</Badge>
                <Button variant="outline" size="sm" className="shrink-0">
                  Check in
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <FileText className="text-primary size-4" /> Desk queue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {deskQueue.map((q) => (
                <div key={q.t} className="flex items-start gap-3 rounded-xl border p-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{q.t}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">{q.s}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CalendarDays className="text-primary size-4" /> Handover notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Evening shift: remember to lock the design lab at 21:30. Ola's laptop loan is due
                back by 17:00 — ping the learner if it slips.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <ShieldCheck className="text-success size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Safety brief</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                Visitor badges issued: 9/9. Emergency contacts list updated this morning.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
