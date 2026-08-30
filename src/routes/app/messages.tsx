import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCheck, Phone, Search, Send, Video } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useMessageThreads, useThreadItems, useSendMessage } from "@/lib/query/messages";
import type { MessageThread } from "@/data/learning";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/messages")({
  head: () => ({
    meta: [
      { title: "Messages — CEA-OS" },
      {
        name: "description",
        content: "Direct messages and group chats with instructors, mentors and classmates.",
      },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  const threadsQuery = useMessageThreads();
  const threads = useThreadItems();
  const [activeId, setActiveId] = useState<string>(threads[0]?.id ?? "");
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const activeIdResolved = activeId || threads[0]?.id || "";
  const active = threads.find((t) => t.id === activeIdResolved) ?? threads[0];
  const send = useSendMessage(active?.id ?? "");

  const openMeeting = (kind: "voice" | "video") => {
    window.open("https://meet.google.com/new", "_blank", "noopener,noreferrer");
    toast.success(`${kind === "video" ? "Video" : "Voice"} room opened`, {
      description: `Share the meeting link with ${active?.name ?? "your contact"}.`,
    });
  };

  return (
    <AppShell
      roleKey="student"
      title="Messages"
      subtitle="DMs and groups · 4 conversations"
      actions={
        <>
          <Badge className="bg-error/10 text-error border-0 font-semibold">Unread</Badge>
          <Badge variant="secondary" className="font-semibold">
            Online: 3
          </Badge>
        </>
      }
    >
      <QueryState<MessageThread[]> query={threadsQuery} error={{ title: "Messages unavailable" }}>
        {(threads) => {
          const normalizedSearch = search.trim().toLowerCase();
          const visibleThreads = normalizedSearch
            ? threads.filter((thread) =>
                `${thread.name} ${thread.role} ${thread.last.text}`
                  .toLowerCase()
                  .includes(normalizedSearch),
              )
            : threads;
          return (
            <>
              <div className="grid h-[640px] gap-5 lg:grid-cols-[1fr_1.6fr]">
                <Card className="bg-card shadow-soft flex flex-col overflow-hidden border">
                  <CardContent className="border-b p-3">
                    <div className="bg-muted flex items-center gap-2 rounded-xl px-3 py-2">
                      <Search className="text-muted-foreground size-4" />
                      <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search conversations…"
                        aria-label="Search conversations"
                        className="bg-transparent w-full text-sm outline-none"
                      />
                    </div>
                  </CardContent>
                  <CardContent className="flex-1 divide-y overflow-y-auto p-0">
                    {visibleThreads.length === 0 ? (
                      <p className="text-muted-foreground p-5 text-center text-sm">
                        No conversations match “{search}”.
                      </p>
                    ) : (
                      visibleThreads.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setActiveId(t.id)}
                          className={cn(
                            "flex w-full items-center gap-3 p-4 text-left transition-colors",
                            t.id === activeIdResolved ? "bg-primary/5" : "hover:bg-muted/50",
                          )}
                        >
                          <span className="bg-gradient-brand text-primary-foreground font-display grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold">
                            {t.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="truncate text-sm font-bold">{t.name}</p>
                              <span className="text-muted-foreground shrink-0 text-[11px] font-semibold">
                                {t.last.time}
                              </span>
                            </div>
                            <p className="text-muted-foreground truncate text-xs">{t.role}</p>
                            <p className="text-muted-foreground mt-0.5 truncate text-xs">
                              {t.last.text}
                            </p>
                          </div>
                          {t.unread > 0 && (
                            <Badge className="bg-error text-error-foreground h-5 min-w-5 justify-center rounded-full border-0 px-1.5 text-[10px] font-bold">
                              {t.unread}
                            </Badge>
                          )}
                        </button>
                      ))
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-card shadow-soft flex flex-col overflow-hidden border">
                  <CardContent className="flex items-center gap-3 border-b p-4">
                    <span className="bg-gradient-brand text-primary-foreground font-display grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold">
                      {active.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{active.name}</p>
                      <p className="text-success text-xs font-semibold">● Online · {active.role}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground"
                      aria-label="Start voice call"
                      title="Start a voice room"
                      onClick={() => openMeeting("voice")}
                    >
                      <Phone className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground"
                      aria-label="Start video call"
                      title="Start a video room"
                      onClick={() => openMeeting("video")}
                    >
                      <Video className="size-4" />
                    </Button>
                  </CardContent>
                  <CardContent className="flex-1 space-y-4 overflow-y-auto p-5">
                    <p className="text-muted-foreground text-center text-[11px] font-bold tracking-wide uppercase">
                      Today
                    </p>
                    {active.messages.map((m, i) => (
                      <div key={i} className={cn("flex", m.mine ? "justify-end" : "justify-start")}>
                        <div
                          className={cn(
                            "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                            m.mine
                              ? "bg-gradient-brand text-white rounded-br-md"
                              : "bg-muted rounded-bl-md",
                          )}
                        >
                          <p className="leading-relaxed">{m.text}</p>
                          <p
                            className={cn(
                              "mt-1 text-[10px] font-semibold",
                              m.mine ? "text-white/70" : "text-muted-foreground",
                            )}
                          >
                            {m.time}
                            {m.mine && <CheckCheck className="ml-1 inline size-3" />}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardContent className="flex items-center gap-2 border-t p-3">
                    <input
                      type="text"
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          const trimmed = draft.trim();
                          if (trimmed && !send.isPending) {
                            send.mutate(trimmed);
                            setDraft("");
                          }
                        }
                      }}
                      placeholder="Type a message…"
                      className="bg-muted flex-1 rounded-xl border-0 px-4 py-2.5 text-sm outline-none"
                    />
                    <Button
                      size="icon"
                      className="bg-gradient-brand size-10 border-0"
                      aria-label="Send message"
                      disabled={send.isPending || draft.trim().length === 0}
                      onClick={() => {
                        const trimmed = draft.trim();
                        if (trimmed && !send.isPending) {
                          send.mutate(trimmed);
                          setDraft("");
                        }
                      }}
                    >
                      <Send className="size-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Link
                to="/app"
                className="text-muted-foreground hover:text-primary mt-4 flex items-center gap-2 text-sm font-semibold transition-colors"
              >
                <ArrowLeft className="size-4" /> Back to dashboard
              </Link>
            </>
          );
        }}
      </QueryState>
    </AppShell>
  );
}
