"use client";

import { useApiQuery } from "@/lib/query/hooks";
import { fetchCohorts } from "@/lib/api/operations";
import { isMockMode } from "@/lib/env";

export function CourseIntake({ slug }: { slug: string }) {
  const query = useApiQuery(["course-intake", slug], () => fetchCohorts({ program: slug }), {
    enabled: !isMockMode,
  });
  const next = query.data?.items.find(
    (c) => c.enrollmentOpen && c.status === "scheduled" && c.programSlug === slug,
  );
  return (
    <div className="mt-5 rounded-lg border p-3 text-xs leading-relaxed" aria-live="polite">
      <p className="font-semibold">
        {next
          ? `Next intake: ${next.startDate}`
          : query.isPending && !isMockMode
            ? "Checking intake availability…"
            : "Next intake to be confirmed"}
      </p>
      {next ? (
        <p className="mt-1 text-muted-foreground">
          {next.days} · {next.startTime} WAT · {next.mode}. Apply for a placement check; this is not
          a seat reservation.
        </p>
      ) : (
        <p className="mt-1 text-muted-foreground">
          {query.isError ? "Availability could not be loaded. " : ""}You can register interest
          without paying. CEA must confirm a real timetable, equipment/practice access and place
          before checkout.
        </p>
      )}
    </div>
  );
}
