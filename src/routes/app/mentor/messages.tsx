import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Inbox,
  Mail,
  MessageSquare,
  MessagesSquare,
  Paperclip,
  Send,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AppShell } from "@/components/app/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/mentor/messages")({
  head: () => ({
    meta: [
      { title: "Messaging — CEA-OS" },
      { name: "description", content: "Conversations with your mentees." },
    ],
  }),
  component: MentorMessages,
});

const conversations = [
  {
    name: "Ada Okafor",
    meta: "Backend specialisation",
    preview: "Thursday 18:00 works. I'll send the link.",
    time: "14:11",
    unread: 1,
    tone: "bg-gradient-learning",
  },
  {
    name: "Tobi Adeyemi",
    meta: "DevOps",
    preview: "CI/CD cert material is ready for review",
    time: "09:45",
    unread: 0,
    tone: "bg-gradient-erp",
  },
  {
    name: "Zainab Yusuf",
    meta: "Product design",
    preview: "Portfolio v2 — can we review on Friday?",
    time: "Yesterday",
    unread: 1,
    tone: "bg-gradient-services",
  },
  {
    name: "Halima Bello",
    meta: "Career switch",
    preview: "Welcome to the mentorship program!",
    time: "Jul 28",
    unread: 0,
    tone: "bg-gradient-career",
  },
];

const thread = [
  {
    from: "them",
    text: "Ada — thanks for reviewing my resume. Do you think I should lead with the Flutterwave internship?",
    t: "14:02",
  },
  {
    from: "me",
    text: "Absolutely. It shows product ownership. Lead with the impact numbers, not the tools.",
    t: "14:05",
  },
  {
    from: "them",
    text: "Got it. Also — can we move Thursday's session to 18:00? Work keeps colliding.",
    t: "14:07",
  },
  {
    from: "me",
    text: "Thursday 18:00 works. I'll send the Zoom link in the morning.",
    t: "14:11",
  },
];

function MentorMessages() {
  return (
    <AppShell
      roleKey="mentor"
      title="Messaging"
      subtitle="4 mentees · usually replies within a day"
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">2 unread</Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/portal/mentor">
              <ArrowLeft className="size-4" /> Mentor portal
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1fr_1.6fr]">
        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <MessagesSquare className="text-primary size-4" /> Conversations
            </CardTitle>
            <Badge variant="secondary" className="font-semibold">
              4
            </Badge>
          </CardHeader>
          <CardContent className="divide-y">
            {conversations.map((c) => (
              <div
                key={c.name}
                className={cn(
                  "flex cursor-pointer flex-wrap items-center gap-3 rounded-xl px-2 py-3.5 transition-colors hover:bg-muted/40",
                  c.unread > 0 && "bg-primary/5",
                )}
              >
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-lg text-xs font-extrabold text-white",
                    c.tone,
                  )}
                >
                  {c.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-sm font-bold">
                    {c.name}
                    {c.unread > 0 && (
                      <span className="bg-gradient-brand size-2 shrink-0 rounded-full" />
                    )}
                  </p>
                  <p className="text-muted-foreground truncate text-xs">{c.preview}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="text-muted-foreground text-[11px] font-semibold">{c.time}</span>
                  {c.unread > 0 && (
                    <span className="bg-gradient-brand grid size-4.5 min-w-4.5 place-items-center rounded-full px-1 text-[10px] font-bold text-white">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border">
          <CardHeader className="flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="bg-gradient-learning grid size-10 place-items-center rounded-xl text-xs font-extrabold text-white">
                AO
              </span>
              <div>
                <CardTitle className="font-display flex items-center gap-2 text-sm font-extrabold">
                  Ada Okafor
                  <Badge className="bg-success/10 text-success border-0 font-semibold">
                    Mentee · Backend
                  </Badge>
                </CardTitle>
                <p className="text-muted-foreground text-xs">Last seen 14:11 · session Thu 18:00</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="font-semibold">
              <Mail className="size-3.5" /> Profile
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-muted/40 flex h-80 flex-col gap-3 overflow-y-auto rounded-xl p-4">
              {thread.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm font-semibold",
                    m.from === "me"
                      ? "bg-gradient-brand shadow-glow self-end text-white"
                      : "bg-muted self-start",
                  )}
                >
                  <p>{m.text}</p>
                  <p
                    className={cn(
                      "mt-1 text-[10px] font-bold",
                      m.from === "me" ? "text-white/70" : "text-muted-foreground",
                    )}
                  >
                    {m.t}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="size-9 shrink-0">
                <Paperclip className="size-4" />
              </Button>
              <Input placeholder="Type a message…" className="border font-medium" />
              <Button
                size="icon"
                className="bg-gradient-brand shadow-glow size-9 shrink-0 border-0"
              >
                <Send className="size-4" />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t pt-3 text-xs">
              <CheckCircle2 className="text-success size-4 shrink-0" />
              <p className="text-muted-foreground flex-1 font-semibold">
                Thursday's session is confirmed. Agenda: resume v3, mock interview + referral to
                Paystack.
              </p>
              <Badge className="bg-warning/10 text-warning border-0 font-semibold">
                <Clock3 className="mr-1 size-3" /> Due Thu 18:00
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card mt-5 shadow-soft border">
        <CardContent className="flex flex-wrap items-center gap-3 p-5">
          <span className="bg-primary/10 text-primary grid size-9 place-items-center rounded-lg">
            <Inbox className="size-4" />
          </span>
          <p className="text-muted-foreground min-w-0 flex-1 text-xs font-semibold">
            Tip: share feedback on goals, not just code. Ada's goal "ship NaijaEats demo day" is 90%
            complete — celebrate it in Thursday's session.
          </p>
          <Button variant="outline" size="sm" className="font-semibold">
            <MessageSquare className="mr-1.5 size-3.5" /> Open goals
            <ChevronRight className="ml-1 size-3.5" />
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-ink mt-5 text-ink-foreground shadow-elevated border-0">
        <CardContent className="flex flex-wrap items-center gap-4 p-6">
          <span className="bg-ink-foreground/10 grid size-10 place-items-center rounded-xl">
            <UserRound className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold">Mentor of the month</p>
            <p className="text-ink-foreground/70 text-xs">
              Your 14 endorsements put you top of the September leaderboard. Keep it up.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="bg-transparent text-ink-foreground border-ink-foreground/30 font-semibold hover:bg-ink-foreground/10"
          >
            <Link to="/app/mentor">Back to dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}
