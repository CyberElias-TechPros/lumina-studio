"use client";

import { useTurnstile } from "@/components/turnstile";
import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageShell, PageHero, CTASection } from "@/components/marketing/shell";
import { formatFee, resolvedFlyerCourses } from "@/data/academy";
import { submitContact } from "@/lib/api/marketing";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/visit/brochure")({
  head: () =>
    getPageHead({
      title: "Course list — Cyber Elias Academy",
      description:
        "Short practical courses at Cyber Elias Academy, Port Harcourt. Fees in naira, weeks and sessions on each course page.",
      path: "/visit/brochure",
    }),
  component: BrochurePage,
});

function BrochurePage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const turnstile = useTurnstile();
  const request = useMutation({
    mutationFn: async (data: { email: string }) => {
      return submitContact({
        turnstileToken: turnstile.token,
        name: "Course list request",
        email: data.email,
        message: "Please email the current course list and start dates.",
      });
    },
    onSuccess: () => {
      setSent(true);
      setEmail("");
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Could not send the request.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) return;
    request.mutate({ email: email.trim() });
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Course list"
        title="What we teach, and what it costs"
        description="This list covers the 13 core courses on the Academy flyer. Nine additional specialist short courses rotate separately; ask admissions about current availability. Fees are listed on each core course page."
      />

      <section className="container-page pb-16">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-border border-b">
                <th className="text-muted-foreground py-3 pr-6 text-xs font-medium uppercase tracking-wide">
                  Course
                </th>
                <th className="text-muted-foreground py-3 pr-6 text-xs font-medium uppercase tracking-wide">
                  Weeks
                </th>
                <th className="text-muted-foreground py-3 text-right text-xs font-medium uppercase tracking-wide">
                  Fee
                </th>
              </tr>
            </thead>
            <tbody>
              {resolvedFlyerCourses.map((course) => (
                <tr key={course.slug} className="border-border border-b last:border-0">
                  <th scope="row" className="py-3 pr-6 font-medium">
                    <Link
                      to="/classes/$courseSlug"
                      params={{ courseSlug: course.slug }}
                      className="hover:text-primary"
                    >
                      {course.title}
                    </Link>
                  </th>
                  <td className="text-muted-foreground py-3 pr-6">{course.weeks}</td>
                  <td className="py-3 text-right font-medium">{formatFee(course.fee)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-muted-foreground mt-6 max-w-3xl text-sm leading-relaxed">
          The 13 courses above are the Academy flyer offer. Nine additional specialist short courses
          rotate through the timetable separately; ask admissions whether a specific option is
          currently available. A course listing is not a confirmed start date.
        </p>

        <div className="border-border mt-12 max-w-md rounded-lg border p-6">
          <h2 className="font-display text-lg font-semibold">Email me the list</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            We will reply with the current course list and check availability and start dates for
            the courses you ask about.
          </p>
          {sent ? (
            <p className="mt-4 flex items-center gap-2 text-sm">
              <CheckCircle2 className="text-success size-4" /> Sent. Check your inbox.
            </p>
          ) : (
            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <Label htmlFor="b-email">Email</Label>
                <Input
                  id="b-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <turnstile.Widget />
              <Button
                type="submit"
                disabled={request.isPending || !turnstile.ready}
                className="w-full"
              >
                {request.isPending && <Loader2 className="size-4 animate-spin" />}
                Send
              </Button>
              {error && <p className="text-error text-sm">{error}</p>}
            </form>
          )}
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
