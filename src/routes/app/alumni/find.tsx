import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  Clock3,
  Search,
  Sparkles,
  Star,
  UserRound,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QueryState } from "@/components/ui/query-state";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppShell } from "@/components/app/app-shell";
import { useMentorMatch, useMentorProfiles } from "@/lib/query/mentor";
import type { MentorMatchResult, MentorProfile } from "@/lib/api/mentor";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/alumni/find")({
  head: () => ({
    meta: [
      { title: "Find a Mentor — CEA-OS" },
      { name: "description", content: "Browse mentors and request mentorship." },
    ],
  }),
  component: AlumniFindMentor,
});

function MentorCard({ mentor, matched }: { mentor: MentorProfile; matched?: number }) {
  return (
    <Card className="bg-card shadow-soft border">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-sm font-extrabold">{mentor.name}</p>
            <Badge className="bg-primary/10 text-primary mt-1 border-0 font-semibold">
              {mentor.focus}
            </Badge>
          </div>
          {typeof matched === "number" ? (
            <Badge className="bg-success/10 text-success shrink-0 border-0 font-semibold">
              {matched}% match
            </Badge>
          ) : (
            <span className="text-warning flex shrink-0 items-center gap-1 text-xs font-bold">
              <Star className="size-3.5 fill-current" /> {mentor.rating}
            </span>
          )}
        </div>
        <p className="text-muted-foreground mt-3 text-xs leading-relaxed">{mentor.bio}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {mentor.skills.slice(0, 4).map((s) => (
            <Badge key={s} variant="secondary" className="font-semibold">
              {s}
            </Badge>
          ))}
        </div>
        <div className="text-muted-foreground mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold">
          <span className="flex items-center gap-1">
            <CalendarClock className="size-3" /> {mentor.availability}
          </span>
          <span className="flex items-center gap-1">
            <Users className="size-3" /> {mentor.sessionsCount} sessions
          </span>
        </div>
        <Button size="sm" className="mt-4 w-full font-semibold">
          Request mentorship
        </Button>
      </CardContent>
    </Card>
  );
}

function AlumniFindMentor() {
  const browse = useMentorProfiles();
  const mentors = browse.data?.pages.flatMap((p) => p.items) ?? [];

  const [program, setProgram] = useState<string>("");
  const [goal, setGoal] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const matches = useMentorMatch({ program, goal }, submitted);

  const avgRating =
    mentors.length > 0
      ? (mentors.reduce((s, m) => s + m.rating, 0) / mentors.length).toFixed(1)
      : "—";
  const openSlots = mentors.filter((m) => m.availability.length > 0).length;

  return (
    <AppShell
      roleKey="instructor"
      title="Find a mentor"
      subtitle={
        mentors.length > 0
          ? `${mentors.length} mentors available · avg ${avgRating}★`
          : "Browse mentor profiles…"
      }
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {openSlots} with open slots
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/alumni/hub">
              <ArrowLeft className="size-4" /> Alumni hub
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Mentors",
            value: mentors.length > 0 ? String(mentors.length) : "—",
            delta: "verified profiles",
            icon: Users,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Avg. rating",
            value: String(avgRating),
            delta: "from learner reviews",
            icon: Star,
            tone: "bg-warning/10 text-warning",
          },
          {
            label: "Open slots",
            value: String(openSlots || "—"),
            delta: "available to book",
            icon: CalendarClock,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Sessions",
            value:
              mentors.length > 0 ? String(mentors.reduce((s, m) => s + m.sessionsCount, 0)) : "—",
            delta: "completed with mentees",
            icon: Clock3,
            tone: "bg-learning/10 text-learning",
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
            <Sparkles className="text-primary size-4" /> Match me with a mentor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-wrap items-end gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="min-w-52 flex-1 space-y-2">
              <Label htmlFor="goal" className="text-xs font-bold tracking-wide uppercase">
                What are you working on?
              </Label>
              <div className="bg-muted flex items-center gap-2 rounded-xl px-3">
                <Search className="text-muted-foreground size-4 shrink-0" />
                <Input
                  id="goal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g. AWS cert, system design, career switch…"
                  className="border-0 bg-transparent font-medium shadow-none outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="program" className="text-xs font-bold tracking-wide uppercase">
                Program
              </Label>
              <Select value={program} onValueChange={setProgram}>
                <SelectTrigger id="program" className="w-44 border font-semibold">
                  <SelectValue placeholder="Any program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any program</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="devops">DevOps & Cloud</SelectItem>
                  <SelectItem value="design">Product design</SelectItem>
                  <SelectItem value="data">Data & AI</SelectItem>
                  <SelectItem value="security">Cybersecurity</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              size="sm"
              className="bg-gradient-brand shadow-glow border-0 font-semibold"
            >
              Find matches <ArrowRight className="ml-1 size-3.5" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {submitted && (
        <Card className="bg-card mt-5 shadow-soft border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
              <Star className="text-warning size-4" /> Best matches
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <QueryState<MentorMatchResult>
              query={matches}
              error={{ title: "Matching unavailable" }}
              empty={{
                title: "No strong matches",
                description: "Try a different goal or program, or browse all mentors below.",
              }}
              isEmpty={(r) => r.matches.length === 0}
            >
              {(r) => r.matches.map((m) => <MentorCard key={m.id} mentor={m} matched={m.match} />)}
            </QueryState>
          </CardContent>
        </Card>
      )}

      <Card className="bg-card mt-5 shadow-soft border">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-base font-bold">
            <UserRound className="text-primary size-4" /> All mentors
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <QueryState<MentorProfile[]>
            query={browse}
            error={{ title: "Mentors unavailable" }}
            empty={{
              title: "No mentors yet",
              description: "Mentor profiles will appear here when published.",
            }}
            isEmpty={(rows) => rows.length === 0}
          >
            {(rows) => rows.map((m) => <MentorCard key={m.id} mentor={m} />)}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}
