"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Inbox,
  Mail,
  MessageSquare,
  MessagesSquare,
  Paperclip,
  Send,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import {
  useConversationDetail,
  useMntConversationItems,
  useMntConversations,
} from "@/lib/query/mentorDashboard";
import type {
  ConversationDetail,
  MntConversation,
  MntThreadMessage,
} from "@/lib/api/mentorDashboard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/mentor/messages")({
  head: () => ({
    meta: [
      { title: "Messaging — CEA-OS" },
      { name: "description", content: "Conversations with your mentees." },
    ],
  }),
  component: MentorMessages,
});

const convoTone = [
  "bg-gradient-learning",
  "bg-gradient-erp",
  "bg-gradient-services",
  "bg-gradient-career",
];

function ThreadBubble({ m }: { m: MntThreadMessage }) {
  const mine = m.fromLabel === "You";
  return (
    <div
      className={cn(
        "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm font-semibold",
        mine ? "bg-gradient-brand shadow-glow self-end text-white" : "bg-muted self-start",
      )}
    >
      <p>{m.body}</p>
      <p
        className={cn(
          "mt-1 text-[10px] font-bold",
          mine ? "text-white/70" : "text-muted-foreground",
        )}
      >
        {m.fromLabel} · {m.timeLabel}
      </p>
    </div>
  );
}

function MentorMessages() {
  const conversationsQuery = useMntConversations();
  const conversations = useMntConversationItems();

  const active = conversations[0];
  const threadQuery = useConversationDetail(active?.id ?? "mc-01");
  const thread = threadQuery.data;
  const unread = conversations.reduce((n, c) => n + c.unread, 0);

  const initials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("");

  return (
    <AppShell
      roleKey="mentor"
      title="Messaging"
      subtitle={
        conversations.length > 0
          ? `${conversations.length} mentees · usually replies within a day`
          : "Loading conversations…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {conversations.length > 0 ? `${unread} unread` : "—"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/mentor">
              <ArrowLeft className="size-4" /> Mentor portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1fr_1.6fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <MessagesSquare className="text-primary size-4" /> Conversations
            </CardTitle>
            <Badge variant="secondary" className="font-semibold">
              {conversations.length > 0 ? String(conversations.length) : "—"}
            </Badge>
          </CardHeader>
          <CardContent className="divide-y">
            <QueryState<MntConversation[]>
              query={conversationsQuery}
              error={{ title: "Conversations unavailable" }}
              empty={{
                title: "No conversations",
                description: "Messages from your mentees will show here.",
              }}
              isEmpty={(rows) => rows.length === 0}
            >
              {(rows) => (
                <>
                  {rows.map((c, i) => (
                    <div
                      key={c.id}
                      className={cn(
                        "flex cursor-pointer flex-wrap items-center gap-3 rounded-xl px-2 py-3.5 transition-colors hover:bg-muted/40",
                        c.unread > 0 && "bg-primary/5",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-lg text-xs font-extrabold text-white",
                          convoTone[i % convoTone.length],
                        )}
                      >
                        {initials(c.name)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-2 text-sm font-bold">
                          {c.name}
                          {c.unread > 0 && (
                            <span className="bg-gradient-brand size-2 shrink-0 rounded-full" />
                          )}
                        </p>
                        <p className="text-muted-foreground truncate text-xs">{c.preview}</p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <span className="text-muted-foreground text-[11px] font-semibold">
                          {c.timeLabel}
                        </span>
                        {c.unread > 0 && (
                          <span className="bg-gradient-brand grid size-4.5 min-w-4.5 place-items-center rounded-full px-1 text-[10px] font-bold text-white">
                            {c.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="bg-gradient-learning grid size-10 place-items-center rounded-xl text-xs font-extrabold text-white">
                {active ? initials(active.name) : "—"}
              </span>
              <div>
                <CardTitle className="font-display flex items-center gap-2 text-sm font-extrabold">
                  {active?.name ?? "Conversation"}
                  {active && (
                    <Badge className="bg-success/10 text-success border-0 font-semibold">
                      Mentee · {active.track}
                    </Badge>
                  )}
                </CardTitle>
                <p className="text-muted-foreground text-xs">
                  {active ? `Last seen ${active.timeLabel}` : "Select a conversation"}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="font-semibold">
              <Mail className="size-3.5" /> Profile
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-muted/40 flex h-80 flex-col gap-3 overflow-y-auto rounded-xl p-4">
              <QueryState<ConversationDetail>
                query={threadQuery}
                error={{ title: "Thread unavailable" }}
                empty={{
                  title: "No messages",
                  description: "Messages from this conversation will show here.",
                }}
                isEmpty={(row) => row.thread.length === 0}
              >
                {(row) => (
                  <>
                    {row.thread.map((m) => (
                      <ThreadBubble key={m.id} m={m} />
                    ))}
                  </>
                )}
              </QueryState>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="size-9 shrink-0">
                <Paperclip className="size-4" />
              </Button>
              <Input placeholder="Type a message…" className="border font-medium" />
              <Button
                size="icon"
                className="bg-gradient-brand shadow-glow size-9 shrink-0 border-0"
              >
                <Send className="size-4" />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t pt-3 text-xs">
              <CheckCircle2 className="text-success size-4 shrink-0" />
              <p className="text-muted-foreground flex-1 font-semibold">
                {thread ? `${thread.name}'s latest message: "${thread.preview}"` : " "}
              </p>
              <Badge className="bg-warning/10 text-warning border-0 font-semibold">
                <Clock3 className="mr-1 size-3" /> Due Thu 18:00
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardContent className="flex flex-wrap items-center gap-3 p-5">
          <span className="bg-primary/10 text-primary grid size-9 place-items-center rounded-lg">
            <Inbox className="size-4" />
          </span>
          <p className="text-muted-foreground min-w-0 flex-1 text-xs font-semibold">
            Tip: share feedback on goals, not just code. Ada's goal "ship NaijaEats demo day" is 90%
            complete — celebrate it in Thursday's session.
          </p>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/mentor/goals">
              <MessageSquare className="mr-1.5 size-3.5" /> Open goals
              <ChevronRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-ink mt-5 text-ink-foreground shadow-elevated border-0">
        <CardContent className="flex flex-wrap items-center gap-4 p-6">
          <span className="bg-ink-foreground/10 grid size-10 place-items-center rounded-xl">
            <UserRound className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold">Mentor of the month</p>
            <p className="text-ink-foreground/70 text-xs">
              Your 14 endorsements put you top of the September leaderboard. Keep it up.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="bg-transparent text-ink-foreground border-ink-foreground/30 font-semibold hover:bg-ink-foreground/10"
          >
            <Link to="/app/mentor">Back to dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}
