"use client";

import { useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { AppShell } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { useMessageThreads, useThreadItems } from "@/lib/query/messages";
import type { MessageThread } from "@/data/learning";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/messages")({
  head: () => ({
    meta: [
      { title: "Messages — CEA-OS" },
      { name: "description", content: "Your stored conversation records." },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  const query = useMessageThreads();
  const threads = useThreadItems();
  const [activeId, setActiveId] = useState("");
  const active = threads.find((thread) => thread.id === activeId) ?? threads[0];
  return (
    <AppShell roleKey="student" title="Messages" subtitle="Conversation records">
      <div className="bg-muted/40 mb-5 rounded-xl border p-4 text-sm" role="status">
        Sending messages here is currently unavailable. Past entries may not have been delivered.
        For help,{" "}
        <Link to="/contact" className="text-primary underline">
          contact the academy
        </Link>
        .
      </div>
      <QueryState<MessageThread[]>
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
                {rows.map((thread) => (
                  <button
                    type="button"
                    key={thread.id}
                    onClick={() => setActiveId(thread.id)}
                    aria-pressed={active?.id === thread.id}
                    className={cn(
                      "w-full p-4 text-left",
                      active?.id === thread.id ? "bg-primary/5" : "hover:bg-muted/50",
                    )}
                  >
                    <span className="block font-semibold">{thread.name}</span>
                    <span className="text-muted-foreground block text-sm">{thread.last.text}</span>
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
                <div
                  className="mt-4 max-h-96 space-y-3 overflow-y-auto"
                  aria-label="Stored messages"
                >
                  {active?.messages.length ? (
                    active.messages.map((m, i) => (
                      <div
                        key={i}
                        className={cn(
                          "rounded-xl p-3 text-sm",
                          m.mine ? "bg-primary/10 ml-auto" : "bg-muted",
                          "max-w-[85%]",
                        )}
                      >
                        <p className="whitespace-pre-wrap">{m.text}</p>
                        <p className="text-muted-foreground mt-1 text-xs">{m.time}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No entries in this conversation.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </QueryState>
    </AppShell>
  );
}
