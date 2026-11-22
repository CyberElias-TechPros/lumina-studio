"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, CalendarPlus, Mail, MessageSquare, Phone, Send, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import { useCalendarItems } from "@/lib/query/calendar";
import { useMessageContacts } from "@/lib/query/messages";
import type { MessageContact } from "@/lib/api/messages";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/parent/students/$studentId/communication")({
  head: () => ({
    meta: [
      { title: "Communication — CEA-OS" },
      { name: "description", content: "Message instructors and view upcoming academy events." },
    ],
  }),
  component: ParentStudentCommunication,
});

function roleTone(roleKey: string) {
  if (/instructor/i.test(roleKey)) return "bg-primary/10 text-primary";
  if (/admin/i.test(roleKey)) return "bg-warning/10 text-warning";
  return "bg-success/10 text-success";
}

function ParentStudentCommunication() {
  const { studentId } = Route.useParams();
  const contactsQuery = useMessageContacts();
  const events = useCalendarItems();

  return (
    <AppShell
      roleKey="parent"
      title="Communication"
      subtitle="Message academy staff and review upcoming parent events"
      actions={
        <>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/parent/students/$studentId" params={{ studentId }}>
              <ArrowLeft className="size-4" /> Overview
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/app/messages">
              <MessageSquare className="size-4" /> Open inbox
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Users className="text-primary size-4" /> Academy contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            <QueryState<{ items: MessageContact[] }>
              query={contactsQuery}
              error={{ title: "Failed to load contacts" }}
              empty={{
                title: "Open Direct Messages",
                description: "Start a conversation with your learner's instructor or admissions.",
              }}
              isEmpty={(res) => res.items.length === 0}
            >
              {(res) =>
                res.items.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-lg",
                        roleTone(c.roleKey),
                      )}
                    >
                      <Mail className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{c.name}</p>
                      <p className="text-muted-foreground text-xs capitalize">{c.roleKey}</p>
                    </div>
                    <Button asChild variant="outline" size="sm" className="font-semibold">
                      <Link to="/app/messages">
                        <Send className="size-3.5" /> Message
                      </Link>
                    </Button>
                  </div>
                ))
              }
            </QueryState>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <CalendarPlus className="text-primary size-4" /> Meetings &amp; calendar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {events.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No scheduled events on your calendar yet. Use Direct Messages to request a
                  parent-teacher check-in.
                </p>
              ) : (
                events.slice(0, 6).map((ev) => (
                  <div key={ev.id} className="rounded-xl border p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold">{ev.title}</p>
                      <Badge className="bg-primary/10 text-primary border-0 font-semibold capitalize">
                        {ev.kind}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-xs">
                      <Phone className="size-3" /> {ev.day} {ev.date} · {ev.time} · {ev.location}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
