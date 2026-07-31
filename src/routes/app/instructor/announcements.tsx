import { createFileRoute } from "@tanstack/react-router";
import { Bell, Eye, Globe, GraduationCap, Megaphone, Pin, Rss, Send, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/instructor/announcements")({
  head: () => ({
    meta: [
      { title: "Announcements — CEA-OS" },
      {
        name: "description",
        content: "Compose and schedule updates for your cohorts.",
      },
    ],
  }),
  component: InstructorAnnouncements,
});

const published = [
  {
    title: "Mid-term exam format & schedule",
    audience: "Cohort 15",
    date: "Aug 1 · 08:00",
    status: "Published",
    pinned: true,
    tone: "bg-success/10 text-success",
  },
  {
    title: "Lab B3 maintenance — next Friday",
    audience: "Backend & APIs",
    date: "Jul 30 · 14:30",
    status: "Published",
    pinned: false,
    tone: "bg-success/10 text-success",
  },
  {
    title: "Guest lecture: payments at scale",
    audience: "All cohorts",
    date: "Jul 28 · 10:15",
    status: "Scheduled",
    pinned: false,
    tone: "bg-primary/10 text-primary",
  },
  {
    title: "Gradebook freeze reminder",
    audience: "Cohort 15",
    date: "Jul 25 · 17:00",
    status: "Published",
    pinned: false,
    tone: "bg-success/10 text-success",
  },
  {
    title: "Internship fair — early bird list",
    audience: "Frontend Foundations",
    date: "Jul 22 · 09:45",
    status: "Archived",
    pinned: false,
    tone: "bg-muted/60 text-muted-foreground",
  },
];

function InstructorAnnouncements() {
  return (
    <AppShell
      roleKey="instructor"
      title="Announcements"
      subtitle="Cohort 15 · 4 live announcements"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            312 opens this week
          </Badge>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">1 scheduled</Badge>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1fr_1.4fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Megaphone className="text-primary size-4" /> Compose announcement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="a-title" className="text-xs font-bold tracking-wide uppercase">
                Title
              </Label>
              <Input
                id="a-title"
                placeholder="e.g. Mid-term exam format & schedule"
                className="border font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="a-body" className="text-xs font-bold tracking-wide uppercase">
                Message
              </Label>
              <Textarea
                id="a-body"
                placeholder="Write your update… keep it under 200 words for push notifications."
                className="min-h-36 border font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="a-audience" className="text-xs font-bold tracking-wide uppercase">
                Audience
              </Label>
              <Select defaultValue="cohort15">
                <SelectTrigger id="a-audience" className="border font-semibold">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cohort15">Cohort 15</SelectItem>
                  <SelectItem value="backend">Backend & APIs</SelectItem>
                  <SelectItem value="all">All cohorts</SelectItem>
                  <SelectItem value="instructors">Instructors only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              size="sm"
              className="bg-gradient-brand shadow-glow w-full border-0 font-semibold"
            >
              <Send className="size-3.5" /> Publish now
            </Button>
            <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <Bell className="size-3.5" /> Subscribers get a push and an email digest.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="bg-card shadow-soft border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
                <Rss className="text-primary size-4" /> Published announcements
              </CardTitle>
              <Badge variant="secondary" className="font-semibold">
                Sorted by date
              </Badge>
            </CardHeader>
            <CardContent className="divide-y">
              {published.map((p) => (
                <div
                  key={p.title}
                  className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-lg",
                      p.pinned ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {p.pinned ? <Pin className="size-4" /> : <Megaphone className="size-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-sm font-bold">
                      {p.title}
                      {p.pinned && (
                        <Badge className="bg-warning/10 text-warning border-0 font-semibold">
                          Pinned
                        </Badge>
                      )}
                    </p>
                    <p className="text-muted-foreground flex flex-wrap items-center gap-x-2 text-xs">
                      {p.audience === "All cohorts" ? (
                        <Globe className="size-3" />
                      ) : (
                        <GraduationCap className="size-3" />
                      )}
                      {p.audience} · {p.date}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge className={cn("border-0 font-semibold", p.tone)}>{p.status}</Badge>
                    <Button variant="outline" size="sm" className="font-semibold">
                      <Eye className="size-3.5" /> View
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardContent className="flex flex-wrap items-center gap-3 p-5">
              <span className="bg-learning/10 text-learning grid size-9 place-items-center rounded-lg">
                <Users className="size-4" />
              </span>
              <p className="text-muted-foreground min-w-0 flex-1 text-xs font-semibold">
                Announcements targeting Cohort 15 reach 96% of learners within 4 hours — best read
                rates of the term.
              </p>
              <Button variant="outline" size="sm" className="font-semibold">
                View read stats
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
