"use client";

import { useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { AppShell } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import {
  useConversationDetail,
  useMntConversationItems,
  useMntConversations,
} from "@/lib/query/mentorDashboard";
import type { ConversationDetail, MntConversation } from "@/lib/api/mentorDashboard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/mentor/messages")({
  head: () => ({
    meta: [
      { title: "Messaging — CEA-OS" },
      { name: "description", content: "Stored mentor conversation records." },
    ],
  }),
  component: MentorMessages,
});

function MentorMessages() {
  const query = useMntConversations();
  const conversations = useMntConversationItems();
  const [activeId, setActiveId] = useState("");
  const active = conversations.find((row) => row.id === activeId) ?? conversations[0];
  const detail = useConversationDetail(active?.id ?? "");
  return (
    <AppShell roleKey="mentor" title="Messaging" subtitle="Conversation records">
      <div className="bg-muted/40 mb-5 rounded-xl border p-4 text-sm" role="status">
        Sending messages here is currently unavailable. Past entries may not have been delivered.
        For help,{" "}
        <Link to="/contact" className="text-primary underline">
          contact the academy
        </Link>
        .
      </div>
      <QueryState<MntConversation[]>
        query={query}
        error={{ title: "Conversations unavailable" }}
        empty={{
          title: "No conversations",
          description: "There are no stored conversations to display.",
        }}
      >
        {(rows) => (
          <div className="grid gap-5 lg:grid-cols-[1fr_1.6fr]">
            <Card>
              <CardContent className="divide-y p-0">
                {rows.map((row) => (
                  <button
                    type="button"
                    key={row.id}
                    onClick={() => setActiveId(row.id)}
                    aria-pressed={active?.id === row.id}
                    className={cn(
                      "w-full p-4 text-left",
                      active?.id === row.id ? "bg-primary/5" : "hover:bg-muted/50",
                    )}
                  >
                    <span className="block font-semibold">{row.name}</span>
                    <span className="text-muted-foreground block text-sm">{row.preview}</span>
                  </button>
                ))}
                {query.hasNextPage && (
                  <div className="p-4">
                    <Button
                      variant="outline"
                      disabled={query.isFetchingNextPage}
                      onClick={() => void query.fetchNextPage()}
                    >
                      {query.isFetchingNextPage ? "Loading…" : "Load more conversations"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <h2 className="font-display text-lg font-semibold">
                  {active?.name ?? "Conversation"}
                </h2>
                {active && (
                  <div
                    className="mt-4 max-h-96 space-y-3 overflow-y-auto"
                    aria-label="Stored messages"
                  >
                    <QueryState<ConversationDetail>
                      query={detail}
                      error={{ title: "Conversation unavailable" }}
                      empty={{
                        title: "No messages",
                        description: "There are no entries in this conversation.",
                      }}
                      isEmpty={(row) => row.thread.length === 0}
                    >
                      {(row) => (
                        <>
                          {row.thread.map((m) => (
                            <div
                              key={m.id}
                              className={cn(
                                "max-w-[85%] rounded-xl p-3 text-sm",
                                m.fromLabel === "You" ? "bg-primary/10 ml-auto" : "bg-muted",
                              )}
                            >
                              <p className="whitespace-pre-wrap">{m.body}</p>
                              <p className="text-muted-foreground mt-1 text-xs">
                                {m.fromLabel} · {m.timeLabel}
                              </p>
                            </div>
                          ))}
                        </>
                      )}
                    </QueryState>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </QueryState>
    </AppShell>
  );
}
