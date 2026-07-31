import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, Globe2, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/mentor/settings")({
  head: () => ({
    meta: [
      { title: "Availability & Settings — CEA-OS" },
      { name: "description", content: "Manage your mentoring availability and preferences." },
    ],
  }),
  component: MentorSettings,
});

const week = [
  { d: "Mon", h: "15:00 – 18:00", on: true },
  { d: "Tue", h: "15:00 – 18:00", on: false },
  { d: "Wed", h: "15:00 – 18:00", on: true },
  { d: "Thu", h: "15:00 – 18:00", on: false },
  { d: "Fri", h: "15:00 – 18:00", on: true },
  { d: "Sat", h: "10:00 – 13:00", on: true },
];

function MentorSettings() {
  return (
    <AppShell
      roleKey="instructor"
      title="Availability & settings"
      subtitle="When mentees can book you"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            4 slots / week
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/mentor">
              <ArrowLeft className="size-4" /> Dashboard
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <CalendarDays className="text-primary size-4" /> Weekly availability
            </CardTitle>
            <Button size="sm" variant="outline" className="font-semibold">
              Add slot
            </Button>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {week.map((w) => (
              <div
                key={w.d}
                className={cn(
                  "flex items-center justify-between rounded-xl border p-3",
                  !w.on && "opacity-50",
                )}
              >
                <div>
                  <p className="text-sm font-bold">{w.d}</p>
                  <p className="text-muted-foreground text-xs">{w.h}</p>
                </div>
                <Badge
                  className={cn(
                    "border-0 font-semibold",
                    w.on ? "bg-success/10 text-success" : "bg-muted text-muted-foreground",
                  )}
                >
                  {w.on ? "Open" : "Closed"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Globe2 className="text-primary size-4" /> Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { t: "Session mode", v: "Video or on-campus", tone: "bg-primary/10 text-primary" },
                { t: "Languages", v: "English, Yoruba", tone: "bg-learning/10 text-learning" },
                { t: "Notice for booking", v: "48 hours", tone: "bg-success/10 text-success" },
                { t: "Max mentees", v: "4", tone: "bg-warning/10 text-warning" },
              ].map((x) => (
                <div key={x.t} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-semibold">{x.t}</span>
                  <Badge className={cn("border-0 font-semibold", x.tone)}>{x.v}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Clock className="text-primary size-4" /> Quiet hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground rounded-xl border p-3 text-xs">
                Messages from mentees are held between 21:00 and 08:00 — nothing urgent is expected
                outside office hours.
              </p>
              <Button variant="outline" size="sm" className="w-full font-semibold">
                <UserRound className="size-3.5" /> Edit profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
