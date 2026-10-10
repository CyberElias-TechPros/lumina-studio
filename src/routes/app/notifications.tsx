"use client";

import { useEffect, useState } from "react";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Bell, CheckCheck, Inbox, Radio, Send, Settings2, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
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
  useUnreadNotificationCount,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotificationPreferences,
  useUpdateNotificationPreferences,
} from "@/lib/query/notifications";
import { useSendPush } from "@/lib/query/push";
import { useCertificateCandidates } from "@/lib/query/certificates";
import { useSessionRole } from "@/lib/auth/session";
import type { AppNotification } from "@/lib/api/notifications";
import type { NotificationPreferences } from "@/lib/api/notificationPreferences";
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
  const rows = query.data?.pages.flatMap((page) => page.items) ?? [];
  const totalCount = query.data?.pages[0]?.total ?? rows.length;
  const hasNotificationData = query.data !== undefined;
  const markAll = useMarkAllNotificationsRead();
  const markRead = useMarkNotificationRead();
  const preferencesQuery = useNotificationPreferences();
  const updatePreferences = useUpdateNotificationPreferences();
  const unreadCountQuery = useUnreadNotificationCount();
  const unread =
    unreadCountQuery.data?.count ?? rows.filter((notification) => !notification.read).length;
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [draftPreferences, setDraftPreferences] = useState<NotificationPreferences | null>(null);
  const preferences = draftPreferences ?? preferencesQuery.data;

  useEffect(() => {
    if (!preferencesQuery.data) return;
    setDraftPreferences((current) =>
      preferencesOpen && current ? current : (preferencesQuery.data ?? null),
    );
  }, [preferencesOpen, preferencesQuery.data]);

  const openPreferences = () => {
    updatePreferences.reset();
    setDraftPreferences(preferencesQuery.data ?? null);
    setPreferencesOpen(true);
  };

  const updatePreference = <K extends keyof NotificationPreferences>(
    key: K,
    value: NotificationPreferences[K],
  ) => {
    setDraftPreferences((current) => {
      const base = current ?? preferencesQuery.data;
      return base ? { ...base, [key]: value } : current;
    });
  };

  const savePreferences = () => {
    if (!draftPreferences) return;
    updatePreferences.mutate(draftPreferences, {
      onSuccess: (saved) => {
        setDraftPreferences(saved);
        setPreferencesOpen(false);
      },
    });
  };

  const enabledChannels = preferencesQuery.data
    ? [
        preferencesQuery.data.appEnabled ? "App" : null,
        preferencesQuery.data.emailEnabled ? "Email" : null,
        preferencesQuery.data.smsEnabled ? "SMS" : null,
      ]
        .filter(Boolean)
        .join(" · ") || "None enabled"
    : preferencesQuery.isError
      ? "Unavailable"
      : "Loading…";

  const summary = [
    {
      label: "All notices",
      value: query.isPending
        ? "…"
        : query.isError && !hasNotificationData
          ? "Unavailable"
          : String(totalCount),
      delta:
        query.isError && !hasNotificationData
          ? "couldn’t load notifications"
          : totalCount > rows.length
            ? `${rows.length} loaded`
            : "all notifications",
      icon: Inbox,
      tone: "bg-warning/10 text-warning",
    },
    {
      label: "Unread",
      value: unreadCountQuery.isPending
        ? "…"
        : unreadCountQuery.isError
          ? "Unavailable"
          : String(unread),
      delta: unreadCountQuery.isError
        ? "couldn’t check unread status"
        : unread > 0
          ? "need your attention"
          : "no unread notifications",
      icon: Bell,
      tone: "bg-primary/10 text-primary",
    },
    {
      label: "Quiet hours",
      value: preferencesQuery.data
        ? `${preferencesQuery.data.quietStart}–${preferencesQuery.data.quietEnd}`
        : preferencesQuery.isError
          ? "Unavailable"
          : "Loading…",
      delta: "from your saved preferences",
      icon: Settings2,
      tone: "bg-learning/10 text-learning",
    },
    {
      label: "Channels",
      value: enabledChannels,
      delta: "from your saved preferences",
      icon: Sparkles,
      tone: "bg-success/10 text-success",
    },
  ];

  return (
    <AppShell
      roleKey="student"
      title="Notifications"
      subtitle="Review recent updates and manage delivery preferences."
      actions={
        <>
          <Badge className="bg-primary/10 text-primary border-0 font-semibold">
            {unreadCountQuery.isPending
              ? "…"
              : unreadCountQuery.isError
                ? "Unread unavailable"
                : `${unread} unread`}
            {query.isError && !hasNotificationData
              ? " · total unavailable"
              : ` · ${totalCount} total`}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="font-semibold"
            onClick={() => markAll.mutate()}
            disabled={markAll.isPending || (unreadCountQuery.isSuccess && unread === 0)}
          >
            <CheckCheck className="size-4" /> {markAll.isPending ? "Marking…" : "Mark all read"}
          </Button>
          <Button variant="ghost" size="sm" className="font-semibold" onClick={openPreferences}>
            <Settings2 className="size-4" /> Preferences
          </Button>
        </>
      }
    >
      {(markAll.isError || markRead.isError) && (
        <p className="text-destructive mb-4 text-sm" role="alert">
          {markAll.error?.message ?? markRead.error?.message ?? "Could not update notifications."}
          Check your connection and try again.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((k) => (
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
              empty={{
                title: "You’re all caught up",
                description:
                  "New notifications will appear here when there is something to review.",
                icon: <CheckCheck className="size-5" />,
              }}
            >
              {(notifications) => (
                <>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="flex w-full items-center gap-3 py-4 text-left first:pt-0 last:pb-0"
                    >
                      <span
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-lg",
                          engineTone(n.engine),
                        )}
                      >
                        <Bell className="size-4" aria-hidden="true" />
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
                        {n.read ? (
                          <span className="text-muted-foreground text-xs">Read</span>
                        ) : (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="px-2"
                            aria-label={`Mark ${n.title} as read`}
                            disabled={markRead.isPending}
                            onClick={() => markRead.mutate(n.id)}
                          >
                            Mark read
                          </Button>
                        )}
                      </span>
                    </div>
                  ))}
                </>
              )}
            </QueryState>
            {query.hasNextPage && (
              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => void query.fetchNextPage()}
                  disabled={query.isFetchingNextPage}
                >
                  {query.isFetchingNextPage
                    ? "Loading older notifications…"
                    : "Load older notifications"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <SendPushCard />
      </div>
      <Dialog open={preferencesOpen} onOpenChange={setPreferencesOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notification preferences</DialogTitle>
            <DialogDescription>
              Choose where routine updates are delivered. Urgent safeguarding and security alerts
              may still be sent through the required channel.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {preferencesQuery.isPending && (
              <p className="text-muted-foreground text-sm" role="status">
                Loading your saved preferences…
              </p>
            )}
            {preferencesQuery.isError && (
              <div
                role="alert"
                className="text-destructive flex items-center justify-between gap-3 text-sm"
              >
                <p>Couldn’t load your preferences.</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => void preferencesQuery.refetch()}
                  disabled={preferencesQuery.isFetching}
                >
                  {preferencesQuery.isFetching ? "Retrying…" : "Retry"}
                </Button>
              </div>
            )}
            {preferences && (
              <>
                {[
                  {
                    id: "app",
                    label: "In-app notifications",
                    value: preferences.appEnabled,
                    key: "appEnabled" as const,
                  },
                  {
                    id: "email",
                    label: "Email updates",
                    value: preferences.emailEnabled,
                    key: "emailEnabled" as const,
                  },
                  {
                    id: "sms",
                    label: "SMS updates",
                    value: preferences.smsEnabled,
                    key: "smsEnabled" as const,
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 rounded-xl border p-3"
                  >
                    <Label htmlFor={`preference-${item.id}`} className="font-semibold">
                      {item.label}
                    </Label>
                    <Switch
                      id={`preference-${item.id}`}
                      checked={item.value}
                      onCheckedChange={(checked) => updatePreference(item.key, checked)}
                      disabled={updatePreferences.isPending}
                      aria-label={item.label}
                    />
                  </div>
                ))}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="quiet-start">Quiet hours start</Label>
                    <Input
                      id="quiet-start"
                      type="time"
                      value={preferences.quietStart}
                      onChange={(event) => updatePreference("quietStart", event.target.value)}
                      disabled={updatePreferences.isPending}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="quiet-end">Quiet hours end</Label>
                    <Input
                      id="quiet-end"
                      type="time"
                      value={preferences.quietEnd}
                      onChange={(event) => updatePreference("quietEnd", event.target.value)}
                      disabled={updatePreferences.isPending}
                    />
                  </div>
                </div>
              </>
            )}
            {updatePreferences.error && (
              <p role="alert" className="text-destructive text-sm font-medium">
                {updatePreferences.error.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setPreferencesOpen(false)}
              disabled={updatePreferences.isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={savePreferences}
              disabled={!preferences || updatePreferences.isPending || preferencesQuery.isPending}
            >
              {updatePreferences.isPending ? "Saving…" : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

function SendPushCard() {
  const role = useSessionRole();
  const canTarget = role === "instructor" || role === "admin";
  const candidates = useCertificateCandidates(canTarget);
  const send = useSendPush();
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
              placeholder="https://www.cea.ng/app/…"
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
