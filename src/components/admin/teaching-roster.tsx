import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdminAccounts } from "@/lib/query/admin";
import { useCourses } from "@/lib/query/courses";
import { fetchAssignmentRosterGrant, setAssignmentRosterGrant } from "@/lib/api/instructor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function TeachingRoster() {
  const accounts = useAdminAccounts();
  const courses = useCourses();
  const queryClient = useQueryClient();
  const [instructorId, setInstructorId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [courseSlug, setCourseSlug] = useState("");
  const [expires, setExpires] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const key = { instructorId, studentId, courseSlug };
  const ready = Boolean(instructorId && studentId && courseSlug);
  const queryKey = ["assignment-roster-grant", instructorId, studentId, courseSlug];
  const grant = useQuery({
    queryKey,
    queryFn: () => fetchAssignmentRosterGrant(key),
    enabled: ready,
  });
  const update = useMutation({
    mutationFn: setAssignmentRosterGrant,
    retry: false,
    onSuccess: async () => {
      setConfirmed(false);
      await queryClient.invalidateQueries({ queryKey });
    },
  });
  const people = accounts.data?.pages.flatMap((page) => page.items) ?? [];
  const courseItems = courses.data?.pages.flatMap((page) => page.items) ?? [];
  const selectClass = "border-input bg-background w-full rounded-md border px-3 py-2 text-sm";
  const clear = () => {
    setConfirmed(false);
    update.reset();
  };
  const expiryDate = new Date(expires);
  return (
    <Card className="bg-card mt-5 border shadow-soft">
      <CardContent className="space-y-4 p-5">
        <div>
          <h2 className="font-display text-lg font-bold">Teaching roster</h2>
          <p className="text-muted-foreground text-sm">
            Confirm each learner’s teaching relationship independently before granting access. A
            grant lets the instructor publish assignments to that learner for the selected course;
            it is not a cohort verification.
          </p>
        </div>
        <p className="text-muted-foreground text-sm">
          Only active, enrolled students and active instructors can receive new grants. Revoking or
          expiring a grant stops future publication but does not remove previous assignments or
          access to their submissions.
        </p>
        {(accounts.isError || courses.isError) && (
          <p role="alert" className="text-destructive text-sm">
            Could not load accounts or courses.
          </p>
        )}
        <label htmlFor="roster-instructor" className="block text-sm font-semibold">
          Roster instructor account
        </label>
        <select
          id="roster-instructor"
          disabled={update.isPending}
          className={selectClass}
          value={instructorId}
          onChange={(e) => {
            setInstructorId(e.target.value);
            clear();
          }}
        >
          <option value="">Select an account</option>
          {people.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} · {p.email} · {p.roleKey} · {p.status}
            </option>
          ))}
        </select>
        <label htmlFor="roster-student" className="block text-sm font-semibold">
          Roster learner account
        </label>
        <select
          id="roster-student"
          disabled={update.isPending}
          className={selectClass}
          value={studentId}
          onChange={(e) => {
            setStudentId(e.target.value);
            clear();
          }}
        >
          <option value="">Select an account</option>
          {people.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} · {p.email} · {p.roleKey} · {p.status}
            </option>
          ))}
        </select>
        {accounts.hasNextPage && (
          <Button
            variant="outline"
            type="button"
            disabled={accounts.isFetchingNextPage}
            onClick={() => void accounts.fetchNextPage()}
          >
            Load more accounts
          </Button>
        )}
        <label htmlFor="roster-course" className="block text-sm font-semibold">
          Course
        </label>
        <select
          id="roster-course"
          disabled={update.isPending}
          className={selectClass}
          value={courseSlug}
          onChange={(e) => {
            setCourseSlug(e.target.value);
            clear();
          }}
        >
          <option value="">Select a course</option>
          {courseItems.map((course) => (
            <option key={course.slug} value={course.slug}>
              {course.title}
            </option>
          ))}
        </select>
        {courses.hasNextPage && (
          <Button
            variant="outline"
            type="button"
            disabled={courses.isFetchingNextPage}
            onClick={() => void courses.fetchNextPage()}
          >
            Load more courses
          </Button>
        )}
        {ready && grant.isLoading && <p className="text-sm">Checking roster…</p>}
        {ready && grant.isError && (
          <p role="alert" className="text-destructive text-sm">
            Could not check this roster entry. No change was made.
          </p>
        )}
        {ready && grant.isSuccess && (
          <p className="text-sm" role="status">
            {grant.data.grant?.active
              ? `Active until ${new Date(grant.data.grant.expiresAt).toLocaleString()}.`
              : "No active grant for this selection."}
          </p>
        )}
        <label htmlFor="roster-expiry" className="block text-sm font-semibold">
          Grant expiry (your local time; within one year)
        </label>
        <Input
          type="datetime-local"
          id="roster-expiry"
          disabled={update.isPending}
          value={expires}
          onChange={(e) => {
            setExpires(e.target.value);
            clear();
          }}
        />
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-1"
          />
          I have independently confirmed this teaching relationship and the selected course.
        </label>
        {update.isError && (
          <p role="alert" className="text-destructive text-sm">
            {update.error instanceof Error ? update.error.message : "Could not update the roster."}
          </p>
        )}
        {update.isSuccess && (
          <p role="status" className="text-sm">
            Roster change recorded.
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            disabled={
              !ready ||
              !grant.isSuccess ||
              !confirmed ||
              update.isPending ||
              Number.isNaN(expiryDate.getTime())
            }
            onClick={() =>
              update.mutate({ ...key, active: true, expiresAt: expiryDate.toISOString() })
            }
          >
            Confirm grant
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={!ready || !grant.isSuccess || !grant.data.grant || update.isPending}
            onClick={() => update.mutate({ ...key, active: false })}
          >
            Revoke grant
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
