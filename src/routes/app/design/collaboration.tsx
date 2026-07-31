import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Eye, MessageCircle, MessagesSquare, Pin, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/design/collaboration")({
  head: () => ({
    meta: [
      { title: "Collaboration Hub — CEA-OS" },
      { name: "description", content: "Feedback threads and annotations across designs." },
    ],
  }),
  component: CollaborationHub,
});

const threads = [
  {
    t: "Mobile nav density",
    d: "3 replies · badge on prototype v3.2",
    author: "Ada Obi",
    status: "Open",
    tone: "bg-primary/10 text-primary",
  },
  {
    t: "Empty states for learner dashboards",
    d: "2 replies · annotation on screen 4",
    author: "Tunde Bakare",
    status: "In progress",
    tone: "bg-warning/10 text-warning",
  },
  {
    t: "Contrast on success badges",
    d: "5 replies · resolved in token editor",
    author: "Chiamaka Eze",
    status: "Resolved",
    tone: "bg-success/10 text-success",
  },
  {
    t: "Cert template footer spacing",
    d: "1 reply · pinned by Ngozi",
    author: "Ngozi Adeyemi",
    status: "Resolved",
    tone: "bg-success/10 text-success",
  },
];

function CollaborationHub() {
  return (
    <AppShell
      roleKey="design"
      title="Collaboration hub"
      subtitle="9 threads · 23 annotations · 4.2 avg rating"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">4 resolved</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/design">
              <ArrowLeft className="size-4" /> Design hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Threads",
            value: "9",
            delta: "5 open",
            icon: MessagesSquare,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Annotations",
            value: "23",
            delta: "9 on prototypes",
            icon: Pin,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Resolved",
            value: "4",
            delta: "this week",
            icon: ThumbsUp,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Participants",
            value: "6",
            delta: "design + product",
            icon: Eye,
            tone: "bg-warning/10 text-warning",
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

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <MessageCircle className="text-primary size-4" /> Feedback threads
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {threads.map((t) => (
            <div key={t.t} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                <MessagesSquare className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{t.t}</p>
                <p className="text-muted-foreground text-xs">
                  {t.d} · by {t.author}
                </p>
              </div>
              <Badge className={cn("border-0 font-semibold", t.tone)}>{t.status}</Badge>
              <Button variant="outline" size="sm" className="shrink-0">
                Open
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
