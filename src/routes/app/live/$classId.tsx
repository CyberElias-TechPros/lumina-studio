"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { useState } from "react";
import {
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  PenLine,
  Plus,
  Send,
  Users,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useSessionContext } from "@/components/app/session-provider";
import {
  useCastLivePollVote,
  useCreateLivePoll,
  useLiveClass,
  useLiveClassChat,
  useLiveClassPolls,
  usePostWhiteboardOp,
  useSendLiveClassChat,
  useUpdateLiveClass,
  useWhiteboardOps,
} from "@/lib/query/live";
import type { LiveClassSession, LivePoll, WhiteboardOp } from "@/lib/api/live";
import { getErrorMessage } from "@/lib/errors";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/live/$classId")({
  head: () => ({
    meta: [
      { title: "Live Class — CEA-OS" },
      { name: "description", content: "Live class: video room, chat, polls and whiteboard." },
    ],
  }),
  component: LiveClass,
});

function WhiteboardPanel({ classId }: { classId: string }) {
  const opsQuery = useWhiteboardOps(classId);
  const postOp = usePostWhiteboardOp(classId);
  const [draft, setDraft] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed || postOp.isPending) return;
    postOp.mutate(trimmed, { onSuccess: () => setDraft("") });
  };

  return (
    <Card className="bg-card shadow-soft border">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="font-display flex items-center gap-2 text-sm font-bold">
            <PenLine className="text-primary size-4" /> Whiteboard
          </p>
          <Badge variant="secondary" className="font-semibold">
            Live class notes
          </Badge>
        </div>
        <div className="bg-muted/50 mt-4 max-h-48 space-y-1 overflow-y-auto rounded-xl border p-3">
          <QueryState<WhiteboardOp[]>
            query={opsQuery}
            isEmpty={(data) => (Array.isArray(data) ? data.length === 0 : false)}
            empty={{
              title: "Empty board",
              description: "Add the first note.",
              icon: <PenLine className="size-6" />,
            }}
            loading={
              <p className="text-muted-foreground py-4 text-center text-xs">Loading board…</p>
            }
          >
            {(ops) =>
              ops.map((op) => (
                <p key={op.id} className="text-xs">
                  <strong className="text-primary">{op.userName}:</strong> {op.op}
                </p>
              ))
            }
          </QueryState>
        </div>
        <form onSubmit={submit} className="mt-3 flex items-center gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a note…"
            className="bg-muted h-9 flex-1 rounded-lg border-0 px-3 text-xs outline-none"
          />
          <Button
            type="submit"
            size="sm"
            className="shrink-0"
            disabled={postOp.isPending || !draft.trim()}
          >
            <Send className="size-3.5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function LiveClass() {
  const { classId } = Route.useParams();
  const sessionQuery = useLiveClass(classId);
  const session = sessionQuery.data;

  return (
    <AppShell
      roleKey="live"
      title={session?.title ?? "Live class"}
      subtitle={
        session ? `${session.instructor} · ${session.cohort} · ${session.startsAt}` : "Loading…"
      }
      actions={
        session ? (
          <Badge
            className={cn(
              "border-0 font-semibold",
              session.status === "live"
                ? "bg-success/10 text-success"
                : session.status === "scheduled"
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground",
            )}
          >
            {session.status === "live"
              ? "Live"
              : session.status === "scheduled"
                ? "Scheduled"
                : "Ended"}
          </Badge>
        ) : null
      }
    >
      <QueryState
        query={sessionQuery}
        error={{ title: "Class unavailable" }}
        loading={
          <div className="text-muted-foreground py-16 text-center text-sm">Loading class…</div>
        }
        empty={{ title: "Class not found", description: "This class may have been removed." }}
      >
        {() => (session ? <ClassContent classId={classId} session={session} /> : null)}
      </QueryState>
    </AppShell>
  );
}

function ClassContent({ classId, session }: { classId: string; session: LiveClassSession }) {
  const [draft, setDraft] = useState("");
  const [meetingDraft, setMeetingDraft] = useState(session.meetingUrl ?? "");
  const { session: authSession } = useSessionContext();
  const currentUserId = authSession?.user.id ?? "";
  const canManage =
    authSession?.user.roleKey === "instructor" ||
    authSession?.user.roleKey === "admin" ||
    authSession?.user.roleKey === "ops";

  const chatQuery = useLiveClassChat(classId);
  const sendChat = useSendLiveClassChat(classId);
  const pollsQuery = useLiveClassPolls(classId);
  const castVote = useCastLivePollVote(classId);
  const updateClass = useUpdateLiveClass(classId);

  const chatOpen = session.status !== "ended";

  const submitChat = (event: React.FormEvent) => {
    event.preventDefault();
    const body = draft.trim();
    if (body.length === 0 || sendChat.isPending) return;
    sendChat.mutate(body, {
      onSuccess: () => setDraft(""),
    });
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
      <div className="space-y-5">
        <div className="bg-gradient-ink relative overflow-hidden rounded-xl border">
          <div className="aspect-video grid place-items-center p-6">
            <div className="max-w-md text-center">
              <span className="bg-ink-foreground/10 mx-auto grid size-16 place-items-center rounded-xl">
                <Video className="text-ink-foreground size-8" />
              </span>
              {session.meetingUrl ? (
                <>
                  <p className="font-display text-ink-foreground mt-4 text-lg font-extrabold">
                    {session.status === "live"
                      ? "Live video room is open"
                      : session.status === "scheduled"
                        ? "Video room ready for start time"
                        : "Session ended"}
                  </p>
                  <p className="text-ink-foreground/70 mt-1 text-xs">
                    Join the instructor-hosted room while keeping class chat, polls, and whiteboard
                    open here.
                  </p>
                  {session.status !== "ended" && (
                    <Button asChild className="mt-4">
                      <a href={session.meetingUrl} target="_blank" rel="noopener noreferrer">
                        Join video room <ExternalLink className="size-4" />
                      </a>
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <p className="font-display text-ink-foreground mt-4 text-lg font-extrabold">
                    Classroom workspace ready
                  </p>
                  <p className="text-ink-foreground/70 mt-1 text-xs">
                    {canManage
                      ? "Attach an HTTPS meeting link below when ready to open the video stream."
                      : "Your instructor will post the meeting link here before the session begins."}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {canManage && (
          <Card className="border bg-card">
            <CardHeader>
              <CardTitle className="font-display text-sm font-bold">
                Instructor session controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {(["scheduled", "live", "ended"] as const).map((nextStatus) => (
                  <Button
                    key={nextStatus}
                    type="button"
                    size="sm"
                    variant={session.status === nextStatus ? "default" : "outline"}
                    disabled={updateClass.isPending}
                    onClick={() => updateClass.mutate({ status: nextStatus })}
                  >
                    {nextStatus === "live"
                      ? "Go live"
                      : nextStatus === "scheduled"
                        ? "Mark scheduled"
                        : "End class"}
                  </Button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateClass.mutate({ meetingUrl: meetingDraft.trim() });
                }}
                className="flex flex-wrap gap-2"
              >
                <Input
                  type="url"
                  value={meetingDraft}
                  onChange={(e) => setMeetingDraft(e.target.value)}
                  placeholder="https://meet.google.com/..."
                  className="flex-1"
                />
                <Button type="submit" size="sm" disabled={updateClass.isPending}>
                  Save meeting link
                </Button>
              </form>
              {updateClass.isError && (
                <p role="alert" className="text-destructive text-xs font-semibold">
                  {getErrorMessage(updateClass.error)}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        <WhiteboardPanel classId={classId} />
      </div>

      <div className="space-y-5">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <MessageSquare className="text-primary size-4" /> Class chat
            </CardTitle>
          </CardHeader>
          <CardContent className="flex h-72 flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto">
              <QueryState
                query={chatQuery}
                isEmpty={(data) => (Array.isArray(data) ? data.length === 0 : false)}
                empty={{
                  title: "No messages yet",
                  description: "Say hello to the class.",
                  icon: <MessageSquare className="size-8" />,
                }}
                loading={
                  <p className="text-muted-foreground py-10 text-center text-xs font-semibold">
                    Loading chat…
                  </p>
                }
              >
                {() =>
                  (chatQuery.data ?? []).map((m) => {
                    const mine = m.userId === currentUserId;
                    return (
                      <div
                        key={m.id}
                        className={cn("flex flex-col", mine ? "items-end" : "items-start")}
                      >
                        <span className="text-muted-foreground text-[11px] font-semibold">
                          {m.userName}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 max-w-[85%] rounded-xl px-3 py-1.5 text-xs font-medium",
                            mine ? "bg-primary text-primary-foreground" : "bg-muted",
                          )}
                        >
                          {m.body}
                        </span>
                      </div>
                    );
                  })
                }
              </QueryState>
            </div>
            <form className="mt-3 flex gap-2" onSubmit={submitChat}>
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                className="bg-muted placeholder:text-muted-foreground h-10 flex-1 rounded-lg border-0 px-3 text-xs font-medium outline-none"
                placeholder={chatOpen ? "Message the class…" : "Class has ended"}
                disabled={!chatOpen || sendChat.isPending}
              />
              <Button size="sm" className="shrink-0" disabled={!chatOpen || sendChat.isPending}>
                <Send className="size-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <PollsPanel
          pollsQuery={pollsQuery}
          classId={classId}
          castVote={castVote}
          canManage={Boolean(canManage)}
        />

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Users className="text-primary size-4" /> Cohort access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs font-semibold">
              Verified for {session.cohort} ({session.courseSlug || "enrolled students"}).
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PollsPanel({
  pollsQuery,
  classId,
  castVote,
  canManage,
}: {
  pollsQuery: ReturnType<typeof useLiveClassPolls>;
  classId: string;
  castVote: ReturnType<typeof useCastLivePollVote>;
  canManage: boolean;
}) {
  const createPoll = useCreateLivePoll(classId);
  const [creating, setCreating] = useState(false);
  const [question, setQuestion] = useState("");
  const [optionsText, setOptionsText] = useState("Option A\nOption B");
  const polls = pollsQuery.data ?? [];

  function handleCreatePoll(event: React.FormEvent) {
    event.preventDefault();
    const options = optionsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!question.trim() || options.length < 2 || createPoll.isPending) return;
    createPoll.mutate(
      { question: question.trim(), options },
      {
        onSuccess: () => {
          setQuestion("");
          setOptionsText("Option A\nOption B");
          setCreating(false);
        },
      },
    );
  }

  return (
    <Card className="bg-card shadow-soft border">
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
          <CheckCircle2 className="text-primary size-4" /> Polls
        </CardTitle>
        {canManage && (
          <Button size="sm" variant="outline" onClick={() => setCreating((v) => !v)}>
            <Plus className="size-3.5" /> {creating ? "Cancel" : "New poll"}
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {canManage && creating && (
          <form onSubmit={handleCreatePoll} className="bg-muted/40 space-y-2 rounded-xl border p-3">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Poll question…"
              className="h-9 text-xs"
              required
            />
            <textarea
              value={optionsText}
              onChange={(e) => setOptionsText(e.target.value)}
              rows={3}
              placeholder="One option per line"
              className="bg-background border-input w-full rounded-lg border p-2 text-xs"
              required
            />
            {createPoll.isError && (
              <p role="alert" className="text-destructive text-[11px] font-semibold">
                {getErrorMessage(createPoll.error)}
              </p>
            )}
            <Button type="submit" size="sm" className="w-full" disabled={createPoll.isPending}>
              {createPoll.isPending ? "Launching…" : "Launch poll"}
            </Button>
          </form>
        )}
        <QueryState
          query={pollsQuery}
          isEmpty={(data) => (Array.isArray(data) ? data.length === 0 : false)}
          loading={
            <p className="text-muted-foreground py-4 text-center text-xs font-semibold">
              Loading polls…
            </p>
          }
          empty={{
            title: "No polls yet",
            description: "The instructor may open one during the class.",
            icon: <CheckCircle2 className="size-8" />,
          }}
        >
          {() => (
            <>
              {polls.map((poll) => (
                <Poll key={poll.id} poll={poll} castVote={castVote} />
              ))}
            </>
          )}
        </QueryState>
      </CardContent>
    </Card>
  );
}

function Poll({
  poll,
  castVote,
}: {
  poll: LivePoll;
  castVote: ReturnType<typeof useCastLivePollVote>;
}) {
  const voted = Boolean(poll.myVote);
  const total = poll.totalVotes ?? 0;

  return (
    <div className="bg-muted/40 rounded-xl border p-4">
      <p className="font-display text-sm font-bold">{poll.question}</p>
      <div className="mt-3 space-y-2">
        {poll.options.map((option) => {
          const count = poll.results?.[option] ?? 0;
          const percent = total > 0 ? Math.round((count / total) * 100) : 0;
          const mine = poll.myVote === option;
          return (
            <button
              key={option}
              disabled={voted || castVote.isPending}
              onClick={() => castVote.mutate({ pollId: poll.id, option })}
              className={cn(
                "relative block w-full overflow-hidden rounded-lg border px-3 py-2 text-left text-xs font-semibold transition-colors",
                voted
                  ? mine
                    ? "border-primary/60 bg-primary/10 text-foreground"
                    : "bg-card text-muted-foreground"
                  : "hover:border-primary/50 hover:bg-primary/5 cursor-pointer",
              )}
            >
              <span
                className="bg-primary/10 absolute inset-y-0 left-0 transition-all"
                style={{ width: voted ? `${percent}%` : "0%" }}
              />
              <span className="relative flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5">
                  {option}
                  {mine && <CheckCircle2 className="text-primary size-3.5" />}
                </span>
                {voted && <span className="text-muted-foreground">{percent}%</span>}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-muted-foreground mt-2 text-[11px] font-semibold">
        {voted
          ? `You voted · ${total} vote${total === 1 ? "" : "s"}`
          : `${total} vote${total === 1 ? "" : "s"} — tap an option to vote`}
      </p>
    </div>
  );
}
