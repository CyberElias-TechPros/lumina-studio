"use client";

import { useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowRight, CalendarDays, Plus, Radio, Users } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { useSessionContext } from "@/components/app/session-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QueryState } from "@/components/ui/query-state";
import { useCreateLiveClass, useLiveClasses, useLiveClassesItems } from "@/lib/query/live";
import type { LiveClassSession } from "@/lib/api/live";
import { getErrorMessage } from "@/lib/errors";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/live/")({
  head: () => ({
    meta: [
      { title: "Live Classes — CEA-OS" },
      { name: "description", content: "Join live classes: video, chat, polls and whiteboard." },
    ],
  }),
  component: LiveClasses,
});

const STATUS_STYLES: Record<LiveClassSession["status"], string> = {
  live: "bg-success/10 text-success border-0 font-semibold",
  scheduled: "bg-primary/10 text-primary border-0 font-semibold",
  ended: "bg-muted text-muted-foreground border-0 font-semibold",
};

function LiveClasses() {
  const { session } = useSessionContext();
  const canSchedule =
    session?.user.roleKey === "instructor" ||
    session?.user.roleKey === "admin" ||
    session?.user.roleKey === "ops";

  const query = useLiveClasses();
  const items = useLiveClassesItems();
  const createLive = useCreateLiveClass();

  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [courseSlug, setCourseSlug] = useState("full-stack");
  const [cohort, setCohort] = useState("Cohort 15");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [startsAt, setStartsAt] = useState("Today · 19:00 WAT");
  const [status, setStatus] = useState<"scheduled" | "live">("scheduled");

  function handleSchedule(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim() || !courseSlug.trim() || createLive.isPending) return;
    createLive.mutate(
      {
        title: title.trim(),
        courseSlug: courseSlug.trim(),
        cohort: cohort.trim() || undefined,
        meetingUrl: meetingUrl.trim() || undefined,
        startsAt: startsAt.trim() || new Date().toISOString(),
        status,
      },
      {
        onSuccess: () => {
          setTitle("");
          setMeetingUrl("");
          setShowCreate(false);
        },
      },
    );
  }

  return (
    <AppShell
      roleKey="live"
      title="Live classes"
      subtitle="Weekly sessions with instructors — video rooms, chat, polls and whiteboard"
      actions={
        <div className="flex items-center gap-2">
          {query.isSuccess && (
            <Badge className="bg-success/10 text-success border-0 font-semibold">
              <Radio className="size-3.5" /> {items.filter((s) => s.status === "live").length} live
              now
            </Badge>
          )}
          {canSchedule && (
            <Button size="sm" onClick={() => setShowCreate((v) => !v)}>
              <Plus className="size-4" />
              {showCreate ? "Close" : "Schedule class"}
            </Button>
          )}
        </div>
      }
    >
      {canSchedule && showCreate && (
        <Card className="mb-5 border">
          <CardHeader>
            <CardTitle className="font-display text-base font-bold">
              Schedule a live session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSchedule} className="grid gap-3 md:grid-cols-3">
              <label className="space-y-1 text-xs font-semibold md:col-span-2">
                <span>Session title</span>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. REST APIs & D1 Query Tuning"
                  required
                />
              </label>
              <label className="space-y-1 text-xs font-semibold">
                <span>Course slug</span>
                <Input
                  value={courseSlug}
                  onChange={(e) => setCourseSlug(e.target.value)}
                  placeholder="full-stack"
                  required
                />
              </label>
              <label className="space-y-1 text-xs font-semibold">
                <span>Cohort</span>
                <Input
                  value={cohort}
                  onChange={(e) => setCohort(e.target.value)}
                  placeholder="Cohort 15"
                />
              </label>
              <label className="space-y-1 text-xs font-semibold">
                <span>Starts at</span>
                <Input
                  value={startsAt}
                  onChange={(e) => setStartsAt(e.target.value)}
                  placeholder="Today · 19:00 WAT"
                  required
                />
              </label>
              <label className="space-y-1 text-xs font-semibold">
                <span>Initial status</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "scheduled" | "live")}
                  className="bg-background border-input h-10 w-full rounded-md border px-3 text-sm"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="live">Live now</option>
                </select>
              </label>
              <label className="space-y-1 text-xs font-semibold md:col-span-3">
                <span>Meeting URL (optional https:// link)</span>
                <Input
                  type="url"
                  value={meetingUrl}
                  onChange={(e) => setMeetingUrl(e.target.value)}
                  placeholder="https://meet.google.com/..."
                />
              </label>
              {createLive.isError && (
                <p role="alert" className="text-destructive text-xs font-semibold md:col-span-3">
                  {getErrorMessage(createLive.error)}
                </p>
              )}
              <div className="flex justify-end gap-2 md:col-span-3">
                <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createLive.isPending}>
                  {createLive.isPending ? "Publishing…" : "Publish session"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <QueryState
        query={query}
        isEmpty={(data) => (Array.isArray(data) ? data.length === 0 : false)}
        loading={
          <div className="text-muted-foreground py-16 text-center text-sm">Loading classes…</div>
        }
        empty={{
          title: "No live classes yet",
          description: "Sessions for your enrolled courses will appear here once scheduled.",
          icon: <CalendarDays className="size-8" />,
        }}
      >
        {() => (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {items.map((liveItem) => (
              <Card key={liveItem.id} className="bg-card shadow-soft border">
                <CardHeader className="gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <Badge className={STATUS_STYLES[liveItem.status]}>
                      {liveItem.status === "live"
                        ? "Live now"
                        : liveItem.status === "scheduled"
                          ? "Scheduled"
                          : "Ended"}
                    </Badge>
                    <span className="text-muted-foreground flex items-center gap-1.5 text-[11px] font-semibold">
                      <CalendarDays className="size-3.5" /> {liveItem.startsAt}
                    </span>
                  </div>
                  <CardTitle className="font-display text-base font-extrabold">
                    {liveItem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">{liveItem.instructor}</span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Users className="size-3.5" /> {liveItem.cohort}
                    </span>
                  </div>
                  <Link to="/app/live/$classId" params={{ classId: liveItem.id }} className="block">
                    <Button
                      className={cn(
                        "w-full",
                        liveItem.status !== "live" && "bg-ink text-ink-foreground hover:bg-ink/90",
                      )}
                      size="sm"
                    >
                      {liveItem.status === "live" ? "Join now" : "Open class"}
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </QueryState>
    </AppShell>
  );
}
