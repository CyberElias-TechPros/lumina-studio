import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MessageSquare, MessagesSquare, Plus, Send, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useSessionContext } from "@/components/app/session-provider";
import {
  useChatMessages,
  useChatRooms,
  useChatRoomsItems,
  useCreateChatRoom,
  useSendChatMessage,
} from "@/lib/query/realtime";
import { useWebSocket } from "@/lib/api/use-websocket";
import type { RealtimeRoom } from "@/lib/api/realtime";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/chat")({
  head: () => ({
    meta: [
      { title: "Chat — CEA-OS | Cyber Elias Academy" },
      { name: "description", content: "Realtime chat rooms for cohorts, projects and Q&A." },
    ],
  }),
  component: Chat,
});

function Chat() {
  const roomsQuery = useChatRooms();
  const rooms = useChatRoomsItems();
  const [activeId, setActiveId] = useState("");
  const activeRoom = rooms.find((room) => room.id === activeId) ?? rooms[0];
  const wsPath = activeRoom ? `/v1/realtime/chat/rooms/${activeRoom.id}/ws` : undefined;
  const ws = useWebSocket(wsPath, Boolean(activeRoom));
  const wsMessages = ws.messages
    .filter((m) => m.type === "message" && m.body)
    .map((m) => ({ body: m.body ?? "", userName: m.user?.name ?? "Anonymous", at: m.at ?? "" }));

  return (
    <AppShell
      roleKey="student"
      title="Chat"
      subtitle="Realtime rooms for cohorts, projects and Q&A"
      actions={
        activeRoom ? (
          <Badge
            className={cn(
              "border-0 font-semibold",
              ws.status === "open" ? "bg-success/10 text-success" : "bg-warning/10 text-warning",
            )}
          >
            <Users className="size-3" /> {ws.status === "open" ? `${ws.users} live` : "offline"}
          </Badge>
        ) : undefined
      }
    >
      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <Card className="bg-card shadow-soft flex max-h-[calc(100vh-14rem)] min-h-0 flex-col border">
          <CardHeader className="flex-row items-center justify-between gap-2">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <MessagesSquare className="text-primary size-4" /> Rooms
            </CardTitle>
            <CreateRoomButton onCreated={setActiveId} />
          </CardHeader>
          <CardContent className="min-h-0 flex-1 overflow-y-auto">
            <QueryState
              query={roomsQuery}
              isEmpty={(data) => (Array.isArray(data) ? data.length === 0 : false)}
              loading={
                <p className="text-muted-foreground py-10 text-center text-xs font-semibold">
                  Loading rooms…
                </p>
              }
              empty={{
                title: "No rooms yet",
                description: "Create a room to start chatting.",
                icon: <MessagesSquare className="size-8" />,
              }}
            >
              {() => (
                <div className="space-y-1.5">
                  {rooms.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => setActiveId(room.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                        room.id === activeRoom?.id
                          ? "border-primary/40 bg-primary/5"
                          : "hover:border-primary/25 hover:bg-muted/50",
                      )}
                    >
                      <span className="bg-primary/10 text-primary grid size-9 shrink-0 place-items-center rounded-lg">
                        <MessageSquare className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold">{room.name}</span>
                        <span className="text-muted-foreground block text-[11px] font-semibold">
                          {room.connected} online
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </QueryState>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft min-h-0 border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <MessageSquare className="text-primary size-4" />
              {activeRoom?.name ?? "Select a room"}
            </CardTitle>
          </CardHeader>
            {activeRoom ? (
              <Thread room={activeRoom} wsMessages={wsMessages} wsSend={ws.send} />
            ) : (
            <CardContent>
              <p className="text-muted-foreground py-10 text-center text-xs font-semibold">
                Pick a room on the left to read and send messages.
              </p>
            </CardContent>
          )}
        </Card>
      </div>
    </AppShell>
  );
}

function CreateRoomButton({ onCreated }: { onCreated: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const createRoom = useCreateChatRoom();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length === 0 || createRoom.isPending) return;
    createRoom.mutate(
      { name: trimmed },
      {
        onSuccess: (room) => {
          setName("");
          setOpen(false);
          onCreated(room.id);
        },
      },
    );
  };

  if (!open) {
    return (
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        <Plus className="size-4" /> New
      </Button>
    );
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <Input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Room name…"
        className="h-9 w-44 text-xs"
        autoFocus
      />
      <Button size="sm" className="shrink-0" disabled={createRoom.isPending}>
        <Send className="size-3.5" />
      </Button>
    </form>
  );
}

function Thread({ room, wsMessages, wsSend }: { room: RealtimeRoom; wsMessages: Array<{ body: string; userName: string; at: string }>; wsSend: (body: string) => void }) {
  const { session: authSession } = useSessionContext();
  const currentUserId = authSession?.user.id ?? "";
  const [draft, setDraft] = useState("");
  const messagesQuery = useChatMessages(room.id);
  const restMessages = messagesQuery.data ?? [];
  const sendMessage = useSendChatMessage(room.id);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Merge REST history with live WS messages (dedupe by body+time).
  const liveByKey = new Map(wsMessages.map((m) => [`${m.at}:${m.body}`, m]));
  const merged = [
    ...restMessages.map((m) => ({ id: m.id, userName: m.userName, body: m.body, at: m.createdAt, mine: m.userId === currentUserId })),
    ...wsMessages.filter((m) => !restMessages.some((r) => r.body === m.body)).map((m) => ({ id: `live-${m.at}`, userName: m.userName, body: m.body, at: m.at, mine: false })),
  ];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [merged.length, room.id]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const body = draft.trim();
    if (body.length === 0 || sendMessage.isPending) return;
    wsSend(body);
    sendMessage.mutate(body, { onSuccess: () => setDraft("") });
  };

  return (
    <CardContent className="flex h-[calc(100vh-19rem)] min-h-80 flex-col">
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto">
        <QueryState
          query={messagesQuery}
          isEmpty={(data) => (Array.isArray(data) ? data.length === 0 : false)}
          empty={{
            title: "No messages yet",
            description: "Start the conversation.",
            icon: <MessageSquare className="size-8" />,
          }}
          loading={
            <p className="text-muted-foreground py-10 text-center text-xs font-semibold">
              Loading messages…
            </p>
          }
        >
          {() =>
            merged.map((message) => {
              const mine = message.mine;
              return (
                <div
                  key={message.id}
                  className={cn("flex flex-col", mine ? "items-end" : "items-start")}
                >
                  <span className="text-muted-foreground text-[11px] font-semibold">
                    {mine ? "You" : message.userName}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 max-w-[85%] rounded-xl px-3 py-1.5 text-xs font-medium",
                      mine ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    {message.body}
                  </span>
                </div>
              );
            })
          }
        </QueryState>
      </div>
      <form className="mt-3 flex gap-2" onSubmit={submit}>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className="bg-muted placeholder:text-muted-foreground h-10 flex-1 rounded-lg border-0 px-3 text-xs font-medium outline-none"
          placeholder="Message the room…"
        />
        <Button size="sm" className="shrink-0" disabled={sendMessage.isPending}>
          <Send className="size-4" />
        </Button>
      </form>
    </CardContent>
  );
}
