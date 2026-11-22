"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { useState } from "react";
import { toast } from "sonner";
import { Bell, Eye, Globe, GraduationCap, Megaphone, Pin, Rss, Send, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { sendChatMessage } from "@/lib/api/realtime";
import { flattenPages } from "@/lib/query/hooks";
import { useInstructorCourses } from "@/lib/query/instructor";
import { useInsAnnouncements } from "@/lib/query/instructorExtras";
import { useChatRoomsItems } from "@/lib/query/realtime";
import type { InsAnnouncement } from "@/lib/api/instructorExtras";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/instructor/announcements")({
  head: () => ({
    meta: [
      { title: "Announcements — CEA-OS" },
      {
        name: "description",
        content: "Compose and publish updates for your cohorts.",
      },
    ],
  }),
  component: InstructorAnnouncements,
});

interface LocalAnnouncement extends InsAnnouncement {
  body?: string;
}

function announcementTone(status: string) {
  if (/published|live|sent/i.test(status)) return "bg-success/10 text-success";
  if (/draft|scheduled|pending/i.test(status)) return "bg-warning/10 text-warning";
  return "bg-muted/60 text-muted-foreground";
}

function InstructorAnnouncements() {
  const announcementsQuery = useInsAnnouncements();
  const coursesQuery = useInstructorCourses();
  const chatRooms = useChatRoomsItems();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("all");
  const [publishing, setPublishing] = useState(false);
  const [localPosts, setLocalPosts] = useState<LocalAnnouncement[]>([]);
  const [activePost, setActivePost] = useState<LocalAnnouncement | null>(null);

  const courses = flattenPages(coursesQuery.data?.pages);
  const serverAnnouncements = flattenPages(announcementsQuery.data?.pages);
  const combined: LocalAnnouncement[] = [...localPosts, ...serverAnnouncements];

  const handlePublish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    if (!trimmedTitle || !trimmedBody || publishing) return;

    setPublishing(true);
    try {
      const targetCourse = courses.find((c) => c.id === audience);
      const audienceLabel = targetCourse
        ? targetCourse.title
        : audience === "instructors"
          ? "Instructors only"
          : "All cohorts";

      const targetRoom =
        chatRooms.find((r) => /announce|general|cohort/i.test(r.name)) ?? chatRooms[0];

      if (targetRoom) {
        await sendChatMessage(
          targetRoom.id,
          `[${audienceLabel}] ${trimmedTitle}\n\n${trimmedBody}`,
        );
      }

      const created: LocalAnnouncement = {
        id: `local-ann-${Date.now()}`,
        title: trimmedTitle,
        body: trimmedBody,
        audience: audienceLabel,
        dateLabel: "Just now",
        status: "Published",
        pinned: 1,
      };
      setLocalPosts((prev) => [created, ...prev]);
      setTitle("");
      setBody("");
      toast.success("Announcement published", {
        description: targetRoom
          ? `Posted to ${targetRoom.name} for ${audienceLabel}`
          : `Saved for ${audienceLabel}`,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not publish announcement");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <AppShell
      roleKey="instructor"
      title="Announcements"
      subtitle={`${combined.length} active announcement${combined.length === 1 ? "" : "s"}`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {courses.length} assigned course{courses.length === 1 ? "" : "s"}
          </Badge>
          <Badge className="bg-primary/10 text-primary border-0 font-semibold">
            {chatRooms.length} connected room{chatRooms.length === 1 ? "" : "s"}
          </Badge>
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
          <CardContent>
            <form onSubmit={(e) => void handlePublish(e)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="a-title" className="text-xs font-bold tracking-wide uppercase">
                  Title
                </Label>
                <Input
                  id="a-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Mid-term exam format & schedule"
                  className="border font-medium"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="a-body" className="text-xs font-bold tracking-wide uppercase">
                  Message
                </Label>
                <Textarea
                  id="a-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your update… keep it clear and actionable for your cohort."
                  className="min-h-36 border font-medium"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="a-audience" className="text-xs font-bold tracking-wide uppercase">
                  Audience
                </Label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger id="a-audience" className="border font-semibold">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All cohorts</SelectItem>
                    {courses.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.title}
                      </SelectItem>
                    ))}
                    <SelectItem value="instructors">Instructors only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                size="sm"
                disabled={publishing || !title.trim() || !body.trim()}
                className="bg-gradient-brand shadow-glow w-full border-0 font-semibold"
              >
                <Send className="size-3.5" /> {publishing ? "Publishing…" : "Publish now"}
              </Button>
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <Bell className="size-3.5" /> Publishes to your cohort chat channel immediately.
              </p>
            </form>
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
              {combined.length === 0 ? (
                <p className="text-muted-foreground py-6 text-center text-sm">
                  No announcements published in this session yet. Compose one on the left to notify
                  your learners.
                </p>
              ) : (
                combined.map((a) => (
                  <div
                    key={a.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-lg",
                        a.pinned === 1
                          ? "bg-warning/10 text-warning"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {a.pinned === 1 ? (
                        <Pin className="size-4" />
                      ) : (
                        <Megaphone className="size-4" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-2 text-sm font-bold">
                        {a.title}
                        {a.pinned === 1 && (
                          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
                            Pinned
                          </Badge>
                        )}
                      </p>
                      <p className="text-muted-foreground flex flex-wrap items-center gap-x-2 text-xs">
                        {a.audience === "All cohorts" ? (
                          <Globe className="size-3" />
                        ) : (
                          <GraduationCap className="size-3" />
                        )}
                        {a.audience} · {a.dateLabel}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <Badge className={cn("border-0 font-semibold", announcementTone(a.status))}>
                        {a.status}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-semibold"
                        onClick={() => setActivePost(a)}
                      >
                        <Eye className="size-3.5" /> View
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border">
            <CardContent className="flex flex-wrap items-center gap-3 p-5">
              <span className="bg-learning/10 text-learning grid size-9 place-items-center rounded-lg">
                <Users className="size-4" />
              </span>
              <p className="text-muted-foreground min-w-0 flex-1 text-xs font-semibold">
                Announcements posted here automatically reach enrolled learners in your active chat
                rooms.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={Boolean(activePost)} onOpenChange={(open) => !open && setActivePost(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{activePost?.title}</DialogTitle>
            <DialogDescription>
              {activePost?.audience} · {activePost?.dateLabel}
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm leading-relaxed whitespace-pre-line">
            {activePost?.body || "Published to cohort feed."}
          </p>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
