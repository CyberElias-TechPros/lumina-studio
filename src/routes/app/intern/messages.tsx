import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, MessagesSquare, Paperclip, Send, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import {
  useConversationDetail,
  useIntConversationItems,
  useIntConversations,
} from "@/lib/query/internDashboard";
import type { ConversationDetail, IntConversation } from "@/lib/api/internDashboard";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Route = createFileRoute("/app/intern/messages")({
  head: () => ({
    meta: [
      { title: "Messages — CEA-OS" },
      { name: "description", content: "Chat with your supervisor, mentor and team." },
    ],
  }),
  component: InternMessages,
});

function InternMessages() {
  const conversationsQuery = useIntConversations();
  const conversations = useIntConversationItems();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const activeId = selectedId ?? conversations[0]?.id ?? "itc-1";
  const detailQuery = useConversationDetail(activeId);

  const unread = conversations.reduce((n, c) => n + c.unread, 0);

  return (
    <AppShell
      roleKey="student"
      title="Messages"
      subtitle="Supervisor, mentor and team channels"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {unread} unread
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/intern">
              <ArrowLeft className="size-4" /> Intern hub
            </Link>
          </Button>
        </>
      }
    >
      <Card className="bg-card shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <MessagesSquare className="text-primary size-4" /> Threads
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<IntConversation[]>
            query={conversationsQuery}
            error={{ title: "Messages unavailable" }}
            empty={{ title: "No conversations", description: "Threads will appear here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedId(c.id)}
                    className={cn(
                      "flex w-full flex-wrap items-center gap-3 rounded-lg py-4 text-left first:pt-0 last:pb-0",
                      c.id === activeId && "opacity-80",
                    )}
                  >
                    <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                      <UserRound className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{c.name}</p>
                      <p className="text-muted-foreground truncate text-xs">
                        {c.preview} · {c.timeLabel}
                      </p>
                    </div>
                    {c.unread > 0 && (
                      <Badge className="bg-primary text-primary-foreground border-0 font-semibold">
                        {c.unread}
                      </Badge>
                    )}
                  </button>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Mail className="text-primary size-4" />
            {detailQuery.data?.name ?? "Conversation"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <QueryState<ConversationDetail>
            query={detailQuery}
            error={{ title: "Thread unavailable" }}
            empty={{ title: "No messages", description: "Messages will appear here." }}
            isEmpty={(d) => d.thread.length === 0}
          >
            {(d) => (
              <div className="space-y-3">
                {d.thread.map((m) => (
                  <div key={m.id} className="bg-muted/60 rounded-xl p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-bold">{m.fromLabel}</p>
                      <p className="text-muted-foreground text-xs">{m.timeLabel}</p>
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm">{m.body}</p>
                  </div>
                ))}
              </div>
            )}
          </QueryState>

          <div className="mt-5 space-y-3">
            <textarea
              className="bg-muted placeholder:text-muted-foreground min-h-24 w-full resize-none rounded-xl border-0 p-3 text-sm font-medium outline-none"
              placeholder="Type your message…"
            />
            <div className="flex items-center justify-between gap-3">
              <Button variant="outline" size="sm" className="font-semibold">
                <Paperclip className="size-3.5" /> Attach
              </Button>
              <Button size="sm" className="bg-gradient-brand shadow-glow border-0 font-semibold">
                <Send className="size-3.5" /> Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
