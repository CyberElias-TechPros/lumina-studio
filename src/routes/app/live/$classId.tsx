import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BarChart3,
  CheckCircle2,
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
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useSessionContext } from "@/components/app/session-provider";
import {
  useCastLivePollVote,
  useLiveClass,
  useLiveClassChat,
  useLiveClassPolls,
  useSendLiveClassChat,
} from "@/lib/query/live";
import type { LivePoll } from "@/lib/api/live";
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
        {() => (session ? <ClassContent classId={classId} status={session.status} /> : null)}
      </QueryState>
    </AppShell>
  );
}

function ClassContent({ classId, status }: { classId: string; status: string }) {
  const [draft, setDraft] = useState("");
  const { session: authSession } = useSessionContext();
  const currentUserId = authSession?.user.id ?? "";
  const chatQuery = useLiveClassChat(classId);
  const sendChat = useSendLiveClassChat(classId);
  const pollsQuery = useLiveClassPolls(classId);
  const castVote = useCastLivePollVote(classId);

  const isLive = status === "live";

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
        <div className="bg-gradient-ink relative overflow-hidden rounded-2xl border">
          <div className="aspect-video grid place-items-center">
            <div className="text-center">
              <span className="bg-ink-foreground/10 mx-auto grid size-16 place-items-center rounded-2xl">
                <Video className="text-ink-foreground size-8" />
              </span>
              <p className="font-display text-ink-foreground mt-4 text-lg font-extrabold">
                {isLive ? "Live session in progress" : "Class will start soon"}
              </p>
              <p className="text-ink-foreground/60 mt-1 text-xs">
                Video embeds here when streaming is configured
              </p>
            </div>
          </div>
          {isLive && (
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
          )}
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
                placeholder={isLive ? "Message the class…" : "Chat opens when the class is live"}
                disabled={!isLive || sendChat.isPending}
              />
              <Button size="sm" className="shrink-0" disabled={!isLive || sendChat.isPending}>
                <Send className="size-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <PollsPanel pollsQuery={pollsQuery} classId={classId} castVote={castVote} />

        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Users className="text-primary size-4" /> Attendees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs font-semibold">
              Presence and attendee avatars appear here during the session.
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
}: {
  pollsQuery: ReturnType<typeof useLiveClassPolls>;
  classId: string;
  castVote: ReturnType<typeof useCastLivePollVote>;
}) {
  const polls = pollsQuery.data ?? [];
  return (
    <Card className="bg-card shadow-soft border">
      <CardHeader>
        <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
          <CheckCircle2 className="text-primary size-4" /> Polls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
                <Poll key={poll.id} poll={poll} classId={classId} castVote={castVote} />
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
  classId,
  castVote,
}: {
  poll: LivePoll;
  classId: string;
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
