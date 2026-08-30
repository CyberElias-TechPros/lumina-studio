import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarPlus, Mail, MessageSquare, Phone, Send, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useParContacts, useParMeetings } from "@/lib/query/parentExtras";
import type { ParContact, ParMeeting } from "@/lib/api/parentExtras";
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

const contactKindMeta: Record<string, { icon: typeof MessageSquare; tone: string }> = {
  Message: { icon: MessageSquare, tone: "bg-primary/10 text-primary" },
  Video: { icon: Video, tone: "bg-success/10 text-success" },
  Mail: { icon: Mail, tone: "bg-warning/10 text-warning" },
};

function meetingTone(status: string) {
  if (/confirm|booked|scheduled|accepted/i.test(status)) return "bg-success/10 text-success";
  if (/rsvp|open|pending|invite/i.test(status)) return "bg-warning/10 text-warning";
  return "bg-primary/10 text-primary";
}

function ParentStudentCommunication() {
  const contactsQuery = useParContacts();
  const meetingsQuery = useParMeetings();
  return (
    <AppShell
      roleKey="parent"
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
            <QueryState<ParContact[]>
              query={contactsQuery}
              error={{ title: "Failed to load contacts" }}
              empty={{ title: "No contacts yet" }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(items) =>
                items.map((c) => {
                  const meta = contactKindMeta[c.kind] ?? {
                    icon: MessageSquare,
                    tone: "bg-muted text-muted-foreground",
                  };
                  const Icon = meta.icon;
                  return (
                    <div
                      key={c.id}
                      className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <span
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-lg",
                          meta.tone,
                        )}
                      >
                        <Icon className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{c.name}</p>
                        <p className="text-muted-foreground text-xs">{c.role}</p>
                      </div>
                      <Button asChild variant="outline" size="sm" className="font-semibold">
                        <Link to="/app/messages">
                          <Send className="size-3.5" /> Message
                        </Link>
                      </Button>
                    </div>
                  );
                })
              }
            </QueryState>
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
              <QueryState<ParMeeting[]>
                query={meetingsQuery}
                error={{ title: "Failed to load meetings" }}
                empty={{
                  title: "No meetings",
                  description: "Meetings and events will appear here.",
                }}
                isEmpty={(rows) => rows.length === 0}
              >
                {(items) =>
                  items.map((m) => (
                    <div key={m.id} className="rounded-xl border p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold">{m.title}</p>
                        <Badge className={cn("border-0 font-semibold", meetingTone(m.status))}>
                          {m.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-xs">
                        <Phone className="size-3" /> {m.dateLabel}
                      </p>
                    </div>
                  ))
                }
              </QueryState>
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
