import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarPlus, Mail, MessageSquare, Phone, Send, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/parent/students/$studentId/communication")({
  head: () => ({
    meta: [
      { title: "Communication — CEA-OS" },
      { name: "description", content: "Message instructors and book parent-teacher meetings." },
    ],
  }),
  component: ParentStudentCommunication,
});

const contacts = [
  {
    name: "Mr. Adeyemi",
    role: "Full-Stack instructor",
    icon: MessageSquare,
    tone: "bg-primary/10 text-primary",
  },
  {
    name: "Ms. Chidera",
    role: "Cloud & DevOps instructor",
    icon: MessageSquare,
    tone: "bg-learning/10 text-learning",
  },
  { name: "Mrs. Obi", role: "Ada's mentor", icon: Video, tone: "bg-success/10 text-success" },
  {
    name: "Registrar's office",
    role: "Records & billing",
    icon: Mail,
    tone: "bg-warning/10 text-warning",
  },
];

const meetings = [
  {
    t: "Parent–teacher meeting",
    d: "Sep 5–9, 2026",
    status: "Booking open",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Mentor check-in (Mrs. Obi)",
    d: "Aug 21, 16:00",
    status: "Confirmed",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Career day webinar",
    d: "Sep 14, 18:00",
    status: "RSVP",
    tone: "bg-warning/10 text-warning",
  },
];

function ParentStudentCommunication() {
  return (
    <AppShell
      roleKey="student"
      title="Communication"
      subtitle="Ada Okafor · teachers, mentor and office"
      actions={
        <>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/parent/students/$studentId" params={{ studentId: "ada-okafor" }}>
              <ArrowLeft className="size-4" /> Overview
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <MessageSquare className="text-primary size-4" /> Contact a teacher
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {contacts.map((c) => (
              <div
                key={c.name}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", c.tone)}>
                  <c.icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{c.name}</p>
                  <p className="text-muted-foreground text-xs">{c.role}</p>
                </div>
                <Button variant="outline" size="sm" className="font-semibold">
                  <Send className="size-3.5" /> Message
                </Button>
              </div>
            ))}
            <p className="text-muted-foreground pt-3 text-xs">
              Staff reply within 1 working day. Urgent matters: call the front desk,{" "}
              <strong className="text-foreground">+234 700 232 232</strong>.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CalendarPlus className="text-primary size-4" /> Meetings & events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {meetings.map((m) => (
                <div key={m.t} className="rounded-xl border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{m.t}</p>
                    <Badge className={cn("border-0 font-semibold", m.tone)}>{m.status}</Badge>
                  </div>
                  <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-xs">
                    <Phone className="size-3" /> {m.d}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
            <CardContent className="p-6">
              <Video className="text-warning size-5" />
              <p className="font-display mt-3 text-base font-extrabold">Meet online</p>
              <p className="text-ink-foreground/70 mt-1 text-sm">
                All meetings can run over video call — with interpreters for Yoruba, Igbo and Hausa
                on request.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
