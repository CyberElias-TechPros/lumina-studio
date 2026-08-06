import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  MessageSquareText,
  MessagesSquare,
  Paperclip,
  Send,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { QueryState } from "@/components/ui/query-state";
import {
  useSupConversationDetail,
  useSupConversationItems,
  useSupConversations,
} from "@/lib/query/supplierPartner";
import type { SupConversation, SupConversationDetail } from "@/lib/api/supplierPartner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/supplier/messages")({
  head: () => ({
    meta: [
      { title: "Messages — CEA-OS" },
      { name: "description", content: "Chat with CEA procurement." },
    ],
  }),
  component: SupplierMessages,
});

function SupplierMessages() {
  const conversationsQuery = useSupConversations();
  const conversations = useSupConversationItems();
  const unread = conversations.filter((c) => c.unread > 0).length;

  const defaultId = useMemo(() => conversations[0]?.id ?? "", [conversations]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const selectedId = activeId ?? defaultId;
  const detailQuery = useSupConversationDetail(selectedId);

  const active = conversations.find((c) => c.id === selectedId);

  return (
    <AppShell
      roleKey="student"
      title="Messages"
      subtitle={
        conversations.length > 0
          ? "Procurement & accounts · response < 24h"
          : "Procurement & accounts"
      }
      actions={
        <>
          <Badge
            className={cn(
              "border-0 font-semibold",
              unread > 0 ? "bg-warning/10 text-warning" : "bg-success/10 text-success",
            )}
          >
            {conversations.length > 0 ? `${unread} unread` : "—"}
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/supplier">
              <ArrowLeft className="size-4" /> Supplier hub
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
          <QueryState<SupConversation[]>
            query={conversationsQuery}
            error={{ title: "Conversations unavailable" }}
            empty={{ title: "No messages", description: "New threads from CEA will appear here." }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => (
              <>
                {rows.map((t) => (
                  <div
                    key={t.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                      <UserRound className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold">{t.name}</p>
                        {t.unread > 0 && (
                          <span className="bg-primary text-primary-foreground grid min-w-4 place-items-center rounded-full px-1.5 text-[10px] font-bold">
                            {t.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-xs">{t.preview}</p>
                    </div>
                    <span className="text-muted-foreground text-xs">{t.timeLabel}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 font-semibold"
                      onClick={() => setActiveId(t.id)}
                    >
                      Open
                    </Button>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>

      {active && (
        <Card className="bg-card mt-5 shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <MessageSquareText className="text-primary size-4" /> {active.name}
              <span className="text-muted-foreground text-xs font-semibold">{active.preview}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <QueryState<SupConversationDetail>
              query={detailQuery}
              error={{ title: "Thread unavailable" }}
              empty={{ title: "No messages", description: "This conversation is empty." }}
              isEmpty={(d) => !d.thread || d.thread.length === 0}
            >
              {(d) => (
                <>
                  {d.thread.map((m) => (
                    <div
                      key={m.id}
                      className={cn(
                        "bg-muted flex max-w-2xl items-start gap-3 rounded-xl p-3",
                        m.fromLabel === "You" && "bg-primary/5 ml-auto",
                      )}
                    >
                      <span className="bg-muted-foreground grid size-8 shrink-0 place-items-center rounded-lg text-[10px] font-bold text-inverse">
                        {m.fromLabel.slice(0, 2).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold">{m.fromLabel}</p>
                          <span className="text-muted-foreground text-[10px]">{m.timeLabel}</span>
                        </div>
                        <p className="text-muted-foreground mt-0.5 text-xs font-medium">{m.body}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
            <div className="flex items-center gap-2 pt-2">
              <MessageSquareText className="text-muted-foreground size-4" />
              <span className="text-muted-foreground text-xs font-semibold">
                Reply to {active.name}
              </span>
            </div>
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
          </CardContent>
        </Card>
      )}
    </AppShell>
  );
}
