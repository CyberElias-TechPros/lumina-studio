import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  Hand,
  MessageSquare,
  Mic2,
  MonitorUp,
  PenLine,
  Send,
  Users,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/live/$classId")({
  head: () => ({
    meta: [
      { title: "Live Class — CEA-OS" },
      { name: "description", content: "Live class: video, chat, polls and whiteboard." },
    ],
  }),
  component: LiveClass,
});

const attendees = [
  { name: "Chinedu A.", initials: "CA", status: "present" },
  { name: "Fatima B.", initials: "FB", status: "present" },
  { name: "Tunde O.", initials: "TO", status: "present" },
  { name: "Ngozi E.", initials: "NE", status: "present" },
  { name: "Kelechi I.", initials: "KI", status: "away" },
];

function LiveClass() {
  return (
    <AppShell
      roleKey="student"
      title="Live class"
      subtitle="Backend, APIs & Databases · Mr. Adeyemi · Week 12"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            Live · 47 present
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            Recording on
          </Badge>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-5">
          <div className="relative overflow-hidden rounded-2xl border bg-gradient-ink">
            <div className="aspect-video grid place-items-center">
              <div className="text-center">
                <span className="bg-ink-foreground/10 mx-auto grid size-16 place-items-center rounded-2xl">
                  <Video className="text-ink-foreground size-8" />
                </span>
                <p className="font-display text-ink-foreground mt-4 text-lg font-extrabold">
                  Mr. Adeyemi — normalizing PostgreSQL
                </p>
                <p className="text-ink-foreground/60 mt-1 text-xs">
                  Indexes & query plans · Q&A every 15 min
                </p>
              </div>
            </div>
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
              <Badge className="bg-destructive/90 text-destructive-foreground border-0 font-bold">
                REC
              </Badge>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-ink-foreground/15 text-ink-foreground font-semibold hover:bg-ink-foreground/25"
                >
                  <Mic2 className="size-4" /> Mute
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-ink-foreground/15 text-ink-foreground font-semibold hover:bg-ink-foreground/25"
                >
                  <MonitorUp className="size-4" /> Share
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-warning/90 text-warning-foreground font-semibold hover:bg-warning/80"
                >
                  <Hand className="size-4" /> Raise hand
                </Button>
              </div>
            </div>
          </div>

          <Card className="bg-card shadow-soft border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="font-display flex items-center gap-2 text-sm font-bold">
                  <PenLine className="text-primary size-4" /> Whiteboard
                </p>
                <Badge variant="secondary" className="font-semibold">
                  Shared by instructor
                </Badge>
              </div>
              <div className="bg-muted/50 mt-4 grid aspect-[2/1] place-items-center rounded-xl border">
                <BarChart3 className="text-muted-foreground size-8" />
                <p className="text-muted-foreground text-xs font-semibold">
                  Whiteboard canvas — live sync
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <MessageSquare className="text-primary size-4" /> Class chat
              </CardTitle>
            </CardHeader>
            <CardContent className="flex h-72 flex-col">
              <div className="flex-1 space-y-3 overflow-hidden">
                {[
                  { name: "Fatima B.", msg: "Do we cover indexes in the assignment?", me: false },
                  { name: "You", msg: "Yes — task 3 is a query plan exercise.", me: true },
                  {
                    name: "Mr. Adeyemi",
                    msg: "Correct. Paste your EXPLAIN output in #qna.",
                    me: false,
                  },
                  { name: "Tunde O.", msg: "The handout's on the portal now?", me: false },
                ].map((m) => (
                  <div
                    key={m.msg}
                    className={cn("flex flex-col", m.me ? "items-end" : "items-start")}
                  >
                    <span className="text-muted-foreground text-[11px] font-semibold">
                      {m.name}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 max-w-[85%] rounded-xl px-3 py-1.5 text-xs font-medium",
                        m.me ? "bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      {m.msg}
                    </span>
                  </div>
                ))}
              </div>
              <form className="mt-3 flex gap-2">
                <input
                  className="bg-muted placeholder:text-muted-foreground h-10 flex-1 rounded-lg border-0 px-3 text-xs font-medium outline-none"
                  placeholder="Message the class…"
                />
                <Button size="sm" className="shrink-0">
                  <Send className="size-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Users className="text-primary size-4" /> Attendees · 47
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {attendees.map((a) => (
                <span
                  key={a.name}
                  title={a.name}
                  className={cn(
                    "grid size-9 place-items-center rounded-full text-[11px] font-bold",
                    a.status === "away"
                      ? "bg-muted text-muted-foreground"
                      : "bg-primary/10 text-primary",
                  )}
                >
                  {a.initials}
                </span>
              ))}
              <span className="bg-muted grid size-9 place-items-center rounded-full text-[11px] font-bold">
                +38
              </span>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
