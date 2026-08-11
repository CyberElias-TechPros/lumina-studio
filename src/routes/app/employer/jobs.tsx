import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Eye,
  FileText,
  Pencil,
  Plus,
  Send,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { usePostings, useInterviews, useCreatePosting } from "@/lib/query/recruitment";
import type { JobPosting } from "@/lib/api/recruitment";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/employer/jobs")({
  head: () => ({
    meta: [
      { title: "Job Management — CEA-OS" },
      { name: "description", content: "Post, edit and manage job openings." },
    ],
  }),
  component: EmployerJobs,
});

function EmployerJobs() {
  const postingsQuery = usePostings();
  const interviewsQuery = useInterviews();
  const postings = postingsQuery.data?.pages.flatMap((p) => p.items) ?? [];
  const interviews = interviewsQuery.data?.pages.flatMap((p) => p.items) ?? [];
  const activeRoles = postings.filter((p) => p.status !== "Closed").length;
  const applications = postings.reduce((s, p) => s + p.applicants, 0);

  return (
    <AppShell
      roleKey="employer"
      title="Job management"
      subtitle={`${postings.length} roles · ${applications} total applications`}
      actions={
        <>
          <Badge className="bg-success/10 text-success border-0 font-semibold">
            {activeRoles} open roles
          </Badge>
          <Button asChild variant="outline" size="sm" className="font-semibold">
            <Link to="/app/employer/hub">
              <ArrowLeft className="size-4" /> Employer hub
            </Link>
          </Button>
          <CreatePostingButton />
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active roles",
            value: String(activeRoles),
            delta: "1 closing soon",
            icon: BriefcaseBusiness,
            tone: "bg-primary/10 text-primary",
          },
          {
            label: "Applications",
            value: String(applications),
            delta: "+18 this week",
            icon: Users,
            tone: "bg-learning/10 text-learning",
          },
          {
            label: "Interviews",
            value: String(interviews.length),
            delta: "4 scheduled",
            icon: Eye,
            tone: "bg-success/10 text-success",
          },
          {
            label: "Hires this year",
            value: "12",
            delta: "avg 34 days to hire",
            icon: FileText,
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
            <BriefcaseBusiness className="text-primary size-4" /> Your roles
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          <QueryState<JobPosting[]> query={postingsQuery} error={{ title: "Jobs unavailable" }}>
            {(rows) => (
              <>
                {rows.map((j) => (
                  <div
                    key={j.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                      <BriefcaseBusiness className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{j.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {j.applicants} applications · {j.views} views · {j.posted}
                      </p>
                    </div>
                    <Badge className={cn("border-0 font-semibold", j.tone)}>{j.status}</Badge>
                    <div className="flex shrink-0 gap-1">
                      <Button asChild variant="outline" size="sm" className="font-semibold">
                        <Link to="/app/employer/pipeline/$jobId" params={{ jobId: j.id }}>
                          Pipeline
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <X className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </QueryState>
        </CardContent>
      </Card>
    </AppShell>
  );
}

function CreatePostingButton() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const create = useCreatePosting();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle.length === 0 || create.isPending) return;
    create.mutate(
      { title: trimmedTitle, detail: detail.trim() || undefined },
      {
        onSuccess: () => {
          setTitle("");
          setDetail("");
          setOpen(false);
        },
      },
    );
  };

  if (!open) {
    return (
      <Button size="sm" onClick={() => setOpen(true)}>
        <Plus className="size-4" /> Post a job
      </Button>
    );
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <Input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Role title…"
        className="h-9 w-44 text-xs"
        autoFocus
      />
      <Input
        value={detail}
        onChange={(event) => setDetail(event.target.value)}
        placeholder="Detail (optional)"
        className="h-9 w-44 text-xs"
      />
      <Button size="sm" className="shrink-0" disabled={create.isPending}>
        <Send className="size-3.5" />
      </Button>
      <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </form>
  );
}
