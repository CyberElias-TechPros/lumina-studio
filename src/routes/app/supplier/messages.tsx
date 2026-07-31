import { createFileRoute, Link } from "@tanstack/react-router";
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

const threads = [
  { w: "CEA Procurement", d: "Re: PO-2413 delivery window", tone: "bg-primary/10 text-primary" },
  { w: "CEA Accounts", d: "INV-8821 processing — Jul 31", tone: "bg-learning/10 text-learning" },
  { w: "CEA Store", d: "Chairs received, thanks!", tone: "bg-success/10 text-success" },
];

function SupplierMessages() {
  return (
    <AppShell
      roleKey="student"
      title="Messages"
      subtitle="Procurement & accounts · response < 24h"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">1 unread</Badge>
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
          {threads.map((t) => (
            <div key={t.w} className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0">
              <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                <UserRound className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{t.w}</p>
                <p className="text-muted-foreground text-xs">{t.d}</p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 font-semibold">
                Open
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardContent className="space-y-3 p-5">
          <div className="flex items-center gap-2">
            <MessageSquareText className="text-muted-foreground size-4" />
            <span className="text-muted-foreground text-xs font-semibold">Message procurement</span>
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
    </AppShell>
  );
}
