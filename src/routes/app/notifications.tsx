import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell, CheckCheck, Inbox, Radio, Send, Settings2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import {
  useNotifications,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
} from "@/lib/query/notifications";
import { useSendPush } from "@/lib/query/push";
import { useCertificateCandidates } from "@/lib/query/certificates";
import { useSessionRole } from "@/lib/auth/session";
import type { AppNotification } from "@/lib/api/notifications";
import { cn } from "@/lib/utils";
import { ApiError } from "@/lib/errors";

export const Route = createFileRoute("/app/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — CEA-OS" },
      { name: "description", content: "Your in-app notification centre." },
    ],
  }),
  component: Notifications,
});

function engineTone(engine: string): string {
  if (engine === "community") return "bg-success/10 text-success";
  if (engine === "career") return "bg-learning/10 text-learning";
  if (engine === "erp") return "bg-warning/10 text-warning";
  return "bg-primary/10 text-primary";
}

function Notifications() {
  const query = useNotifications();
  const rows = query.data?.pages.flatMap((p) => p.items) ?? [];
  const markAll = useMarkAllNotificationsRead();
  const markRead = useMarkNotificationRead();
  const unread = rows.filter((n) => !n.read).length;

  return (
    <AppShell
      roleKey="student"
      title="Notifications"
      subtitle="Delivered on app, email and SMS"
      actions={
        <>
          <Badge className="bg-primary/10 text-primary border-0 font-semibold">
            {unread} unread · {rows.length} recent
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="font-semibold"
            onClick={() => markAll.mutate()}
            disabled={markAll.isPending || unread === 0}
          >
            <CheckCheck className="size-4" /> {markAll.isPending ? "Marking…" : "Mark all read"}
          </Button>
          <Button variant="ghost" size="sm" className="font-semibold">
            <Settings2 className="size-4" /> Preferences
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Recent",
            value: String(rows.length),
            delta: "this session",
            icon: Inbox,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "This week",
            value: "14",
            delta: "grades, classes, bills",
            icon: Bell,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Quiet hours",
            value: "21:00–08:00",
            delta: "deliveries held",
            icon: Settings2,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Channels",
            value: "App · Email",
            delta: "SMS for urgent",
            icon: Sparkles,
            tone: "bg-success/10 text-success",
          },
        ].map((k) => (
          <Card key={k.label} className="bg-card shadow-soft border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
                  {k.label}
                </p>
                <span className={cn("grid size-8 place-items-center rounded-lg", k.tone)}>
                  <k.icon className="size-4" />
                </span>
              </div>
              <p className="font-display mt-3 text-2xl font-extrabold">{k.value}</p>
              <p className="text-muted-foreground mt-0.5 text-xs font-semibold">{k.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Bell className="text-primary size-4" /> Recent notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            <QueryState<AppNotification[]>
              query={query}
              error={{ title: "Notifications unavailable" }}
            >
              {(notifications) => (
                <>
                  {notifications.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => {
                        if (!n.read) markRead.mutate(n.id);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 py-4 text-left first:pt-0 last:pb-0",
                        !n.read && "cursor-pointer",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-lg",
                          engineTone(n.engine),
                        )}
                      >
                        <Bell className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p
                          className={cn("text-sm", n.read ? "text-muted-foreground" : "font-bold")}
                        >
                          {n.title}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {n.body} · {n.time}
                        </p>
                      </div>
                      <span className="flex shrink-0 items-center gap-2">
                        <Badge variant="secondary" className="font-semibold">
                          {n.engine}
                        </Badge>
                        {!n.read && (
                          <span className="bg-gradient-brand size-2 rounded-full" title="Unread" />
                        )}
                      </span>
                    </button>
                  ))}
                </>
              )}
            </QueryState>
          </CardContent>
        </Card>

        <SendPushCard />
      </div>
    </AppShell>
  );
}

function SendPushCard() {
  const role = useSessionRole();
  const candidates = useCertificateCandidates();
  const send = useSendPush();
  const canTarget = role === "instructor" || role === "admin";
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");

  const submit = () => {
    if (!title.trim() || !body.trim()) return;
    send.mutate(
      {
        ...(canTarget && userId ? { userId } : {}),
        title: title.trim(),
        body: body.trim(),
        ...(url.trim() ? { url: url.trim() } : {}),
      },
      {
        onSuccess: () => {
          setTitle("");
          setBody("");
          setUrl("");
          setUserId("");
        },
      },
    );
  };

  return (
    <div className="space-y-5">
      <Card className="bg-card shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <Radio className="text-primary size-4" /> Send a push
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-xs leading-relaxed">
            Delivered instantly to the recipient&apos;s subscribed browsers.
            {!canTarget && " (sends to your own devices here.)"}
          </p>

          {canTarget && (
            <div className="space-y-1.5">
              <Label htmlFor="push-user" className="text-xs font-semibold">
                Recipient
              </Label>
              <Select value={userId} onValueChange={setUserId}>
                <SelectTrigger id="push-user">
                  <SelectValue placeholder="Select a user…" />
                </SelectTrigger>
                <SelectContent>
                  {candidates.data?.items.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.name} · {u.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="push-title" className="text-xs font-semibold">
              Title
            </Label>
            <Input
              id="push-title"
              value={title}
              maxLength={120}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Class starts in 5 minutes"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="push-body" className="text-xs font-semibold">
              Message
            </Label>
            <Textarea
              id="push-body"
              value={body}
              maxLength={500}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Short message…"
              rows={3}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="push-url" className="text-xs font-semibold">
              Open link <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="push-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://cea.ng/app/…"
            />
          </div>

          {send.isError && (
            <p className="text-destructive text-xs font-semibold">
              {send.error instanceof ApiError
                ? send.error.message
                : send.error instanceof Error
                  ? send.error.message
                  : "Could not send push."}
            </p>
          )}
          {send.isSuccess && (
            <p className="bg-success/10 text-success rounded-lg px-3 py-2 text-xs font-semibold">
              Sent to {send.data.sent} device{send.data.sent === 1 ? "" : "s"}
              {send.data.removed > 0 ? ` · ${send.data.removed} stale subscription(s) pruned` : ""}.
            </p>
          )}

          <Button
            className="w-full font-semibold"
            onClick={submit}
            disabled={send.isPending || !title.trim() || !body.trim()}
          >
            <Send className="size-4" /> {send.isPending ? "Sending…" : "Send push"}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-ink text-ink-foreground shadow-elevated border-0">
        <CardContent className="p-6">
          <Sparkles className="text-primary size-5" />
          <p className="font-display mt-3 text-base font-extrabold">Channels</p>
          <p className="text-ink-foreground/70 mt-1 text-sm">
            Pushes complement in-app, email and SMS delivery — best for urgent class, grading and
            payment updates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
