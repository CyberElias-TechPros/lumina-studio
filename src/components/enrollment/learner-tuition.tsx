"use client";
import { useApiQuery } from "@/lib/query/hooks";
import { fetchMyTuition } from "@/lib/api/tuition";

export function LearnerTuition() {
  const query = useApiQuery(["my-tuition"], fetchMyTuition);
  if (!query.data?.items.length)
    return (
      <p className="mb-5 text-sm text-muted-foreground">
        Already applied?{" "}
        <a className="text-primary underline" href="/apply/status">
          Open your private application
        </a>{" "}
        for your confirmed timetable, balance, receipt and access status. Use the same verified
        email.
      </p>
    );
  return (
    <section className="mb-5 rounded-xl border bg-card p-5">
      <h2 className="font-display font-semibold">My course offers & payments</h2>
      <ul className="mt-3 space-y-3">
        {query.data.items.map((item) => (
          <li key={item.ref} className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span>
              {item.programTitle} ·{" "}
              {item.activatedAt ? "Learning access active" : "Check next steps"}
            </span>
            <a className="text-primary underline" href={`/apply/status/${item.ref}`}>
              Timetable, receipt & balance
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
