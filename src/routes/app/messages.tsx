"use client";

import { useState } from "react";
import { MessageSquarePlus, Send } from "lucide-react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { AppShell } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QueryState } from "@/components/ui/query-state";
import {
  useCreateMessageThread,
  useMessageContacts,
  useMessageThread,
  useMessageThreads,
  useSendMessage,
  useThreadItems,
} from "@/lib/query/messages";
import type { DirectThread } from "@/lib/api/messages";
import { getErrorMessage } from "@/lib/errors";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/messages")({
  head: () => ({
    meta: [
      { title: "Messages — CEA-OS" },
      {
        name: "description",
        content: "Direct messages with admissions, instructors, and academic operations.",
      },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  const query = useMessageThreads();
  const threads = useThreadItems();
  const contactsQuery = useMessageContacts();
  const createThread = useCreateMessageThread();

  const [activeId, setActiveId] = useState("");
  const [composeOpen, setComposeOpen] = useState(false);
  const [recipientId, setRecipientId] = useState("");
  const [subject, setSubject] = useState("");
  const [initialBody, setInitialBody] = useState("");
  const [replyDraft, setReplyDraft] = useState("");

  const resolvedActiveId = threads.some((t) => t.id === activeId)
    ? activeId
    : (threads[0]?.id ?? "");
  const activeQuery = useMessageThread(resolvedActiveId);
  const active = activeQuery.data ?? threads.find((thread) => thread.id === resolvedActiveId);
  const sendMessage = useSendMessage(resolvedActiveId);

  const contacts = contactsQuery.data?.items ?? [];

  function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    const cleanSubject = subject.trim();
    const cleanBody = initialBody.trim();
    if (!cleanSubject || !cleanBody || createThread.isPending) return;
    createThread.mutate(
      {
        subject: cleanSubject,
        recipientId: recipientId || undefined,
        body: cleanBody,
      },
      {
        onSuccess: (created) => {
          setSubject("");
          setInitialBody("");
          setRecipientId("");
          setComposeOpen(false);
          setActiveId(created.id);
        },
      },
    );
  }

  function handleReply(event: React.FormEvent) {
    event.preventDefault();
    const cleanBody = replyDraft.trim();
    if (!cleanBody || !resolvedActiveId || sendMessage.isPending) return;
    sendMessage.mutate(cleanBody, {
      onSuccess: () => setReplyDraft(""),
    });
  }

  return (
    <AppShell
      roleKey="student"
      title="Messages"
      subtitle="Direct conversations with admissions, instructors, and academic support"
      actions={
        <Button size="sm" onClick={() => setComposeOpen((open) => !open)}>
          <MessageSquarePlus className="size-4" />
          {composeOpen ? "Close composer" : "New message"}
        </Button>
      }
    >
      {composeOpen && (
        <Card className="mb-5 border">
          <CardHeader>
            <CardTitle className="font-display text-base font-bold">
              Start a direct conversation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-xs font-semibold">
                <span>Recipient</span>
                <select
                  value={recipientId}
                  onChange={(e) => setRecipientId(e.target.value)}
                  className="bg-background border-input h-10 w-full rounded-lg border px-3 text-sm"
                >
                  <option value="">Academy Support / Admissions Desk</option>
                  {contacts.map((contact) => (
                    <option key={contact.id} value={contact.id}>
                      {contact.name} ({contact.roleKey})
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-1 text-xs font-semibold">
                <span>Subject</span>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Cohort schedule question"
                  required
                />
              </label>
              <label className="space-y-1 text-xs font-semibold md:col-span-2">
                <span>Message</span>
                <textarea
                  value={initialBody}
                  onChange={(e) => setInitialBody(e.target.value)}
                  rows={3}
                  placeholder="Write your message…"
                  className="bg-background border-input w-full rounded-lg border p-3 text-sm"
                  required
                />
              </label>
              {createThread.isError && (
                <p role="alert" className="text-destructive text-xs font-semibold md:col-span-2">
                  {getErrorMessage(createThread.error)}
                </p>
              )}
              <div className="flex justify-end gap-2 md:col-span-2">
                <Button type="button" variant="outline" onClick={() => setComposeOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createThread.isPending}>
                  {createThread.isPending ? "Sending…" : "Send message"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <QueryState<DirectThread[]>
        query={query}
        error={{ title: "Conversations unavailable" }}
        empty={{
          title: "No conversations yet",
          description: "Start a new message above to reach admissions, instructors, or support.",
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
                      "w-full p-4 text-left transition-colors",
                      active?.id === thread.id ? "bg-primary/5" : "hover:bg-muted/50",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold">{thread.name}</span>
                      <div className="flex items-center gap-1.5">
                        {thread.legacy && (
                          <Badge variant="outline" className="text-[10px]">
                            Archive
                          </Badge>
                        )}
                        {thread.unread > 0 && (
                          <Badge className="bg-primary text-primary-foreground text-[10px]">
                            {thread.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {thread.subject && (
                      <span className="text-foreground/80 mt-0.5 block text-xs font-medium">
                        {thread.subject}
                      </span>
                    )}
                    <span className="text-muted-foreground mt-0.5 block truncate text-sm">
                      {thread.last.text}
                    </span>
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
            <Card className="flex flex-col">
              <CardContent className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                  <div>
                    <h2 className="font-display text-lg font-semibold">
                      {active?.name || "Conversation"}
                    </h2>
                    {active?.subject && (
                      <p className="text-muted-foreground text-xs font-medium">{active.subject}</p>
                    )}
                  </div>
                  {active?.role && (
                    <Badge variant="secondary" className="capitalize">
                      {active.role}
                    </Badge>
                  )}
                </div>

                <div
                  className="mt-4 max-h-96 flex-1 space-y-3 overflow-y-auto"
                  aria-label="Conversation messages"
                >
                  {active?.messages.length ? (
                    active.messages.map((m, i) => (
                      <div
                        key={m.id ?? i}
                        className={cn(
                          "rounded-xl p-3 text-sm",
                          m.mine ? "bg-primary/10 ml-auto" : "bg-muted",
                          "max-w-[85%]",
                        )}
                      >
                        {m.senderName && !m.mine && (
                          <p className="text-muted-foreground mb-1 text-[11px] font-semibold">
                            {m.senderName}
                          </p>
                        )}
                        <p className="whitespace-pre-wrap">{m.text}</p>
                        <p className="text-muted-foreground mt-1 text-xs">{m.time}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No messages in this conversation yet.
                    </p>
                  )}
                </div>

                {active &&
                  (active.legacy ? (
                    <p className="text-muted-foreground mt-4 border-t pt-3 text-xs">
                      This is an archived thread. Click <strong>New message</strong> above to start
                      an active conversation.
                    </p>
                  ) : (
                    <form onSubmit={handleReply} className="mt-4 flex gap-2 border-t pt-3">
                      <Input
                        value={replyDraft}
                        onChange={(e) => setReplyDraft(e.target.value)}
                        placeholder="Write a reply…"
                        disabled={sendMessage.isPending}
                      />
                      <Button type="submit" disabled={sendMessage.isPending || !replyDraft.trim()}>
                        <Send className="size-4" />
                        <span className="sr-only">Send</span>
                      </Button>
                    </form>
                  ))}
                {sendMessage.isError && (
                  <p role="alert" className="text-destructive mt-2 text-xs font-semibold">
                    {getErrorMessage(sendMessage.error)}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </QueryState>
    </AppShell>
  );
}
