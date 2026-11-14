"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchAssignmentPublication,
  fetchAssignmentRosterCourses,
  publishAssignment,
} from "@/lib/api/instructor";
import { useSessionUser } from "@/components/app/session-provider";
import { Input } from "@/components/ui/input";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileCheck2,
  FileText,
  Filter,
  Hourglass,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QueryState } from "@/components/ui/query-state";
import { AppShell } from "@/components/app/app-shell";
import { useInstructorAssignments } from "@/lib/query/instructor";
import type { InstructorSubmission } from "@/data/learning";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/instructor/assignments/")({
  head: () => ({
    meta: [
      { title: "Assignment Center — CEA-OS" },
      { name: "description", content: "Review, grade and return submissions across your courses." },
    ],
  }),
  component: AssignmentCenter,
});

function AssignmentCenter() {
  const submissionsQuery = useInstructorAssignments();
  const submissions = submissionsQuery.data?.pages.flatMap((p) => p.items) ?? [];
  const pending = submissions.filter((s) => s.status === "pending" || s.status === "submitted");
  const graded = submissions.filter((s) => s.status === "graded");
  const late = submissions.filter((s) => s.late);

  return (
    <AppShell
      roleKey="instructor"
      title="Assignment center"
      subtitle="Publish work, track submissions and grade across your courses"
      actions={
        <>
          <Badge className="bg-warning/10 text-warning border-0 font-semibold">
            {pending.length} to grade
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            {submissions.length} in
          </Badge>
        </>
      }
    >
      <PublishAssignmentForm />
      <QueryState<InstructorSubmission[]>
        query={submissionsQuery}
        error={{ title: "Submissions unavailable" }}
      >
        {(rows) => (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Submitted",
                  value: String(rows.length),
                  delta: "across your courses",
                  icon: FileCheck2,
                  tone: "bg-primary/10 text-primary",
                },
                {
                  label: "Pending grade",
                  value: String(pending.length),
                  delta: "awaiting your grade",
                  icon: Hourglass,
                  tone: "bg-warning/10 text-warning",
                },
                {
                  label: "Graded",
                  value: String(graded.length),
                  delta: "returned to students",
                  icon: CheckCircle2,
                  tone: "bg-success/10 text-success",
                },
                {
                  label: "Late",
                  value: String(late.length),
                  delta: "after the deadline",
                  icon: Clock,
                  tone: "bg-error/10 text-error",
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

            <Card className="bg-card shadow-soft mt-5 border">
              <CardContent className="p-0">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
                  <p className="font-display flex items-center gap-2 text-sm font-extrabold">
                    <Users className="text-primary size-4" /> Submissions
                  </p>
                  <Button variant="outline" size="sm" className="font-semibold">
                    <Filter className="mr-1.5 size-3.5" /> Filter
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-sm">
                    <thead>
                      <tr className="text-muted-foreground border-b text-left text-[11px] font-bold tracking-wide uppercase">
                        <th className="px-4 py-3">Student</th>
                        <th className="py-3 pr-4">Submitted</th>
                        <th className="py-3 pr-4">File</th>
                        <th className="py-3 pr-4">Status</th>
                        <th className="py-3 pr-4">Score</th>
                        <th className="py-3 pr-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {rows.map((s) => (
                        <tr key={s.id} className="hover:bg-muted/40 transition-colors">
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <span className="bg-gradient-brand text-primary-foreground font-display grid size-8 shrink-0 place-items-center rounded-full text-[10px] font-bold">
                                {s.student
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                              <div>
                                <p className="text-xs font-bold">{s.student}</p>
                                {s.late && <p className="text-error text-[10px] font-bold">LATE</p>}
                              </div>
                            </div>
                          </td>
                          <td className="text-muted-foreground py-3.5 pr-4 text-xs font-semibold">
                            {s.submitted}
                          </td>
                          <td className="py-3.5 pr-4">
                            <p className="flex items-center gap-1.5 text-xs font-semibold">
                              <FileText className="text-muted-foreground size-3.5" /> {s.file} ·{" "}
                              {s.size}
                            </p>
                          </td>
                          <td className="py-3.5 pr-4">
                            <Badge
                              className={cn(
                                "border-0 font-semibold",
                                s.status === "graded"
                                  ? "bg-success/10 text-success"
                                  : "bg-warning/10 text-warning",
                              )}
                            >
                              {s.status}
                            </Badge>
                          </td>
                          <td className="py-3.5 pr-4">
                            {s.score !== undefined ? (
                              <span className="font-display font-extrabold">{s.score} points</span>
                            ) : (
                              <span className="text-muted-foreground text-xs font-semibold">—</span>
                            )}
                          </td>
                          <td className="py-3.5 pr-4 text-right">
                            <Button
                              asChild
                              size="sm"
                              variant={s.status === "graded" ? "outline" : "default"}
                              className={cn(
                                (s.status === "pending" || s.status === "submitted") &&
                                  "bg-gradient-brand border-0",
                              )}
                            >
                              <Link
                                to="/app/instructor/assignments/$submissionId/grade"
                                params={{ submissionId: s.id }}
                              >
                                {s.status === "graded" ? "Review" : "Grade"}{" "}
                                <ArrowRight className="ml-1 size-3.5" />
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </QueryState>
      <p className="mt-4 text-sm text-muted-foreground">Counts reflect the loaded submissions.</p>
      {submissionsQuery.hasNextPage && (
        <Button
          onClick={() => void submissionsQuery.fetchNextPage()}
          disabled={submissionsQuery.isFetchingNextPage}
        >
          {submissionsQuery.isFetchingNextPage ? "Loading…" : "Load more submissions"}
        </Button>
      )}
    </AppShell>
  );
}

function PublishAssignmentForm() {
  const courses = useQuery({
    queryKey: ["instructor", "assignment-roster-courses"],
    queryFn: fetchAssignmentRosterCourses,
  });
  const [courseSlug, setCourseSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const user = useSessionUser();
  const storageKey = user ? `cea:assignment-publication:${user.id}` : null;
  const [pendingReference, setPendingReference] = useState<{ key: string; hash: string } | null>(
    null,
  );
  const [storageReady, setStorageReady] = useState(false);
  const [formError, setFormError] = useState("");
  const [preparing, setPreparing] = useState(false);
  const [recovered, setRecovered] = useState<Awaited<ReturnType<typeof publishAssignment>> | null>(
    null,
  );
  const publish = useMutation({ mutationFn: publishAssignment, retry: false });
  const lookup = useMutation({ mutationFn: fetchAssignmentPublication, retry: false });
  useEffect(() => {
    setStorageReady(false);
    setPendingReference(null);
    if (!storageKey) return;
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (raw) {
        const item = JSON.parse(raw) as { key?: unknown; hash?: unknown };
        if (typeof item.key !== "string" || typeof item.hash !== "string")
          throw new Error("invalid reference");
        setPendingReference({ key: item.key, hash: item.hash });
      }
      setStorageReady(true);
    } catch {
      setFormError(
        "Cannot access the saved publication reference. Contact an administrator before publishing to avoid duplicates.",
      );
    }
  }, [storageKey]);
  const clearReference = () => {
    if (!storageKey) return;
    try {
      sessionStorage.removeItem(storageKey);
      setPendingReference(null);
      lookup.reset();
    } catch {
      setFormError("Could not clear the saved reference. Contact an administrator.");
    }
  };
  const selected = courses.data?.items.find((course) => course.slug === courseSlug);
  return (
    <Card className="mb-5 border bg-card shadow-soft">
      <CardContent className="space-y-4 p-5">
        <div>
          <h2 className="font-display text-lg font-bold">Publish an assignment</h2>
          <p className="text-muted-foreground text-sm">
            Assignments go only to your administrator-confirmed learners. Ask an administrator to
            update your teaching roster if someone is missing.
          </p>
        </div>
        {courses.data?.truncated && (
          <p className="text-sm text-muted-foreground">
            Only the first 200 roster courses are shown. Contact an administrator about additional
            courses.
          </p>
        )}
        {courses.isError && (
          <p role="alert" className="text-destructive text-sm">
            Could not load your teaching roster.
          </p>
        )}
        {courses.isSuccess && courses.data.items.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No active teaching roster yet. Contact an administrator to confirm your learners.
          </p>
        )}
        {pendingReference && (
          <div className="space-y-2 rounded-md border p-3 text-sm">
            <p>
              A publication needs confirmation. The retry reference is stored in this browser tab,
              not the assignment content. Re-enter the exact details to retry safely, or check its
              status.
            </p>
            <Button
              type="button"
              variant="outline"
              disabled={lookup.isPending || publish.isPending}
              onClick={() =>
                lookup.mutate(pendingReference.key, {
                  onSuccess: (result) => {
                    if (result.publication) {
                      setRecovered(result.publication);
                      clearReference();
                    }
                  },
                })
              }
            >
              Check publication status
            </Button>{" "}
            <Button
              type="button"
              variant="outline"
              disabled={lookup.isPending || publish.isPending}
              onClick={() => {
                if (
                  window.confirm(
                    "Only clear this reference after confirming with an administrator that the original attempt is resolved. Clearing it can permit a duplicate. Continue?",
                  )
                )
                  clearReference();
              }}
            >
              Clear reference after reconciliation
            </Button>
            {lookup.isSuccess && !lookup.data.publication && (
              <p>
                Not found yet. The original request may still be processing; keep this reference and
                check again or contact an administrator.
              </p>
            )}
            {lookup.isError && (
              <p role="alert">Could not check the publication. Keep the reference and try again.</p>
            )}
          </div>
        )}
        {formError && (
          <p role="alert" className="text-destructive text-sm">
            {formError}
          </p>
        )}
        {recovered && (
          <p role="status" className="text-sm">
            Publication confirmed for {recovered.recipients}{" "}
            {recovered.recipients === 1 ? "learner" : "learners"}. Reference: {recovered.groupId}
          </p>
        )}
        {courses.data && courses.data.items.length > 0 && (
          <form
            className="space-y-3"
            onSubmit={async (event) => {
              event.preventDefault();
              const date = new Date(deadline);
              if (
                !selected ||
                !title.trim() ||
                Number.isNaN(date.getTime()) ||
                !storageReady ||
                !storageKey ||
                preparing
              )
                return;
              setPreparing(true);
              setFormError("");
              setRecovered(null);
              try {
                const payload = {
                  courseSlug,
                  title: title.trim(),
                  description: description.trim(),
                  dueAt: date.toISOString(),
                };
                const digest = await crypto.subtle.digest(
                  "SHA-256",
                  new TextEncoder().encode(JSON.stringify(payload)),
                );
                const hash = Array.from(new Uint8Array(digest), (byte) =>
                  byte.toString(16).padStart(2, "0"),
                ).join("");
                if (pendingReference && pendingReference.hash !== hash) {
                  setFormError(
                    "The saved attempt used different details. Check its status or reconcile it with an administrator before starting another assignment.",
                  );
                  return;
                }
                const ref = pendingReference ?? { key: crypto.randomUUID(), hash };
                sessionStorage.setItem(storageKey, JSON.stringify(ref));
                setPendingReference(ref);
                publish.mutate(
                  { ...payload, idempotencyKey: ref.key },
                  {
                    onSuccess: () => {
                      clearReference();
                      setTitle("");
                      setDescription("");
                      setDeadline("");
                    },
                  },
                );
              } catch {
                setFormError(
                  "Could not securely save a retry reference. No request was sent; check browser storage and try again.",
                );
              } finally {
                setPreparing(false);
              }
            }}
          >
            <label className="block text-sm font-semibold" htmlFor="publish-course">
              Course
            </label>
            <select
              id="publish-course"
              required
              value={courseSlug}
              onChange={(e) => setCourseSlug(e.target.value)}
              className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">Select course</option>
              {courses.data.items.map((course) => (
                <option key={course.slug} value={course.slug}>
                  {course.title} · {course.recipients} confirmed learners
                </option>
              ))}
            </select>
            <label className="block text-sm font-semibold" htmlFor="publish-title">
              Title
            </label>
            <Input
              id="publish-title"
              required
              minLength={3}
              maxLength={200}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="block text-sm font-semibold" htmlFor="publish-description">
              Instructions
            </label>
            <textarea
              id="publish-description"
              maxLength={10000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-input bg-background min-h-24 w-full rounded-md border px-3 py-2 text-sm"
            />
            <label className="block text-sm font-semibold" htmlFor="publish-deadline">
              Deadline (your local time)
            </label>
            <Input
              id="publish-deadline"
              type="datetime-local"
              required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <p className="text-muted-foreground text-xs">
              Recipient counts may change as rosters are updated. In-app notifications are created;
              SMS delivery is not guaranteed.
            </p>
            {publish.isError && (
              <p role="alert" className="text-destructive text-sm">
                {publish.error instanceof Error
                  ? publish.error.message
                  : "Could not confirm publication."}{" "}
                Keep the saved reference and retry the exact same details or check its status.
              </p>
            )}
            {publish.isSuccess && (
              <p role="status" className="text-sm">
                Published to {publish.data.recipients}{" "}
                {publish.data.recipients === 1 ? "learner" : "learners"}. Reference:{" "}
                {publish.data.groupId}
              </p>
            )}
            <Button
              type="submit"
              disabled={publish.isPending || preparing || !selected || !storageReady}
            >
              {publish.isPending || preparing ? "Publishing…" : "Publish assignment"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
