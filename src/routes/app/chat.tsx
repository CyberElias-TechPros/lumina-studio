"use client";

import { createFileRoute } from "@/lib/next-compat/route-definition";
import { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  MessagesSquare,
  Plus,
  Send,
  ShieldCheck,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
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
  useGrantRoomMember,
  useRevokeRoomMember,
  useRoomMembers,
  useSendChatMessage,
} from "@/lib/query/realtime";
import { useWebSocket } from "@/lib/api/use-websocket";
import type { RealtimeRoom } from "@/lib/api/realtime";
import { getErrorMessage } from "@/lib/errors";
import { cn } from "@/lib/utils";
import { flattenPages } from "@/lib/query/hooks";

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
  const { session } = useSessionContext();
  const isStaffAdmin = session?.user.roleKey === "admin" || session?.user.roleKey === "ops";
  const roomsQuery = useChatRooms();
  const rooms = useChatRoomsItems();
  const [activeId, setActiveId] = useState("");
  const activeRoom = rooms.find((room) => room.id === activeId) ?? rooms[0];
  const wsPath = activeRoom ? `/v1/realtime/chat/rooms/${activeRoom.id}/ws` : undefined;
  const ws = useWebSocket(wsPath, Boolean(activeRoom));
  const wsMessages = ws.messages
    .filter((m) => m.type === "message" && m.body && m.id)
    .map((m) => ({
      id: m.id!,
      body: m.body ?? "",
      userName: m.user?.name ?? "Anonymous",
      at: m.at ?? "",
    }));

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
        <div className="space-y-5">
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
                            {room.kind === "live" ? "Live class" : "Chat room"}
                          </span>
                        </span>
                      </button>
                    ))}
                    {roomsQuery.hasNextPage && (
                      <Button
                        variant="outline"
                        onClick={() => void roomsQuery.fetchNextPage()}
                        disabled={roomsQuery.isFetchingNextPage}
                      >
                        Load more rooms
                      </Button>
                    )}
                  </div>
                )}
              </QueryState>
            </CardContent>
          </Card>

          {isStaffAdmin && activeRoom && <RoomAccessPanel roomId={activeRoom.id} />}
        </div>

        <Card className="bg-card shadow-soft min-h-0 border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <MessageSquare className="text-primary size-4" />
              {activeRoom?.name ?? "Select a room"}
            </CardTitle>
          </CardHeader>
          {activeRoom ? (
            <Thread
              key={activeRoom.id}
              room={activeRoom}
              wsMessages={wsMessages}
              wsSend={ws.send}
            />
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

function RoomAccessPanel({ roomId }: { roomId: string }) {
  const membersQuery = useRoomMembers(roomId, true);
  const grantMember = useGrantRoomMember(roomId);
  const revokeMember = useRevokeRoomMember(roomId);
  const [userId, setUserId] = useState("");
  const [daysValid, setDaysValid] = useState("30");

  function handleGrant(event: React.FormEvent) {
    event.preventDefault();
    const cleanId = userId.trim();
    const days = Math.max(1, Number(daysValid) || 30);
    if (!cleanId || grantMember.isPending) return;
    const expiresAt = new Date(Date.now() + days * 86_400_000).toISOString();
    grantMember.mutate({ userId: cleanId, expiresAt }, { onSuccess: () => setUserId("") });
  }

  const members = membersQuery.data?.items ?? [];

  return (
    <Card className="bg-card shadow-soft border">
      <CardHeader>
        <CardTitle className="font-display flex items-center gap-2 text-sm font-bold">
          <ShieldCheck className="text-primary size-4" /> Room members (Admin)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <form onSubmit={handleGrant} className="space-y-2">
          <Input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID (UUID)"
            className="h-9 text-xs"
            required
          />
          <div className="flex gap-2">
            <Input
              type="number"
              min={1}
              max={365}
              value={daysValid}
              onChange={(e) => setDaysValid(e.target.value)}
              className="h-9 w-24 text-xs"
              aria-label="Days valid"
            />
            <Button size="sm" type="submit" className="flex-1" disabled={grantMember.isPending}>
              <UserPlus className="size-3.5" /> Grant access
            </Button>
          </div>
          {grantMember.isError && (
            <p role="alert" className="text-destructive text-[11px] font-semibold">
              {getErrorMessage(grantMember.error)}
            </p>
          )}
        </form>

        <div className="space-y-1.5">
          {members.length === 0 ? (
            <p className="text-muted-foreground text-xs">No explicit room members yet.</p>
          ) : (
            members.map((member) => (
              <div
                key={member.userId}
                className="bg-muted/40 flex items-center justify-between gap-2 rounded-lg border px-2.5 py-2 text-xs"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-[11px] font-semibold">{member.userId}</p>
                  <p className="text-muted-foreground text-[10px]">
                    {member.active ? `Expires ${member.expiresAt.slice(0, 10)}` : "Revoked"}
                  </p>
                </div>
                {member.active === 1 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    disabled={revokeMember.isPending}
                    onClick={() => revokeMember.mutate(member.userId)}
                    aria-label={`Revoke ${member.userId}`}
                  >
                    <Trash2 className="text-destructive size-3.5" />
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
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

function Thread({
  room,
  wsMessages,
  wsSend,
}: {
  room: RealtimeRoom;
  wsMessages: Array<{ id: string; body: string; userName: string; at: string }>;
  wsSend: (body: string, messageId?: string) => void;
}) {
  const { session: authSession } = useSessionContext();
  const currentUserId = authSession?.user.id ?? "";
  const [draft, setDraft] = useState("");
  const messagesQuery = useChatMessages(room.id);
  const restMessages = flattenPages(messagesQuery.data?.pages);
  const sendMessage = useSendChatMessage(room.id);
  const scrollRef = useRef<HTMLDivElement>(null);

  const merged = [
    ...restMessages.map((m) => ({
      id: m.id,
      userName: m.userName,
      body: m.body,
      at: m.createdAt,
      mine: m.userId === currentUserId,
    })),
    ...wsMessages
      .filter((m) => !restMessages.some((r) => r.id === m.id))
      .map((m) => ({
        id: m.id,
        userName: m.userName,
        body: m.body,
        at: m.at,
        mine: false,
      })),
  ];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [merged.length, room.id]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const body = draft.trim();
    if (body.length === 0 || sendMessage.isPending) return;
    sendMessage.mutate(body, {
      onSuccess: (saved) => {
        wsSend(body, saved.id);
        setDraft("");
      },
    });
  };

  return (
    <CardContent className="flex h-[calc(100vh-19rem)] min-h-80 flex-col">
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto">
        <QueryState
          query={{ ...messagesQuery, data: messagesQuery.data ? merged : undefined }}
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
      <form className="mt-3 flex gap-2 border-t pt-3" onSubmit={submit}>
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Message this room…"
          disabled={sendMessage.isPending}
        />
        <Button size="sm" className="shrink-0" disabled={sendMessage.isPending || !draft.trim()}>
          <Send className="size-4" />
        </Button>
      </form>
    </CardContent>
  );
}
