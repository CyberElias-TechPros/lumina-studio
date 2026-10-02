import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock3,
  Loader2,
  Printer,
  School,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { decideProposal, fetchPublicProposal } from "@/lib/api/operations";
import { formatNaira } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/schools/proposal/$ref")({
  head: () => ({
    meta: [
      { title: "Digital Skills Programme proposal — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Practical Digital Skills Programme proposal: term plan, fees, what the school provides and what the academy provides.",
      },
      // Proposal links are private to the school; keep them out of search.
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProposalPage,
});

function ProposalPage() {
  const { ref } = Route.useParams();
  const query = useQuery({
    queryKey: ["public-proposal", ref],
    queryFn: () => fetchPublicProposal(ref),
    retry: false,
  });
  const [decision, setDecision] = useState<"idle" | "sending" | "accepted" | "declined">("idle");
  const [acceptedBy, setAcceptedBy] = useState("");
  const [acceptedRole, setAcceptedRole] = useState("");
  const [error, setError] = useState("");

  if (query.isPending) {
    return (
      <div className="container-page flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground flex items-center gap-2 text-sm">
          <Loader2 className="size-4 animate-spin" /> Loading proposal {ref}…
        </p>
      </div>
    );
  }

  if (query.isError || !query.data) {
    return (
      <div className="container-page flex min-h-[60vh] items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <XCircle className="text-error mx-auto size-8" />
            <h1 className="font-display mt-4 text-xl font-extrabold">Proposal not found</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Check the link, or call the academy on 0905 862 8386 and we will resend it.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { proposal, status } = query.data;
  const sending = decision === "sending";
  const decided =
    status === "accepted" ||
    status === "declined" ||
    decision === "accepted" ||
    decision === "declined";

  async function accept() {
    if (acceptedBy.trim().length < 2) {
      setError("Please type your full name to accept.");
      return;
    }
    setDecision("sending");
    setError("");
    try {
      await decideProposal(ref, { decision: "accepted", acceptedBy, acceptedRole });
      setDecision("accepted");
    } catch {
      setDecision("idle");
      setError("Could not record that just now — please try again or call 0905 862 8386.");
    }
  }

  async function decline() {
    setDecision("sending");
    setError("");
    try {
      await decideProposal(ref, {
        decision: "declined",
        acceptedBy: acceptedBy || undefined,
        acceptedRole: acceptedRole || undefined,
      });
      setDecision("declined");
    } catch {
      setDecision("idle");
      setError("Could not record that just now — please try again.");
    }
  }

  return (
    <div className="container-page py-10 print:py-0">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-mono text-[11px]">
              {proposal.ref}
            </Badge>
            <Badge
              className={cn(
                "border-0 font-semibold",
                status === "accepted"
                  ? "bg-success/10 text-success"
                  : status === "declined"
                    ? "bg-error/10 text-error"
                    : "bg-warning/10 text-warning",
              )}
            >
              {status === "viewed" ? "Viewed" : status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="font-semibold"
          >
            <Printer className="size-4" /> Print / save as PDF
          </Button>
        </div>

        <Card className="print:border-0 print:shadow-none">
          <CardContent className="p-6 sm:p-10">
            {/* Letterhead */}
            <div className="border-b pb-5">
              <p className="font-display text-lg font-extrabold">Cyber Elias Academy Ltd</p>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                24/26 Ebony Road, off Rumuola Road, Port Harcourt, Rivers State · RC 8413776 · TIN
                1086525399
                <br />
                help@cea.ng · 0905 862 8386 · cea.ng
              </p>
            </div>

            <h1 className="font-display mt-6 text-2xl font-extrabold">
              Practical Digital Skills Programme
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Prepared for <strong className="text-foreground">{proposal.schoolName}</strong> ·{" "}
              {proposal.term} · {proposal.students} students
            </p>

            {/* The three things a school checks, up top. */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="border-primary/30 bg-primary/5 rounded-xl border p-4">
                <p className="text-muted-foreground flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase">
                  <Building2 className="size-3.5" /> Cost to the school
                </p>
                <p className="font-display mt-2 text-2xl font-extrabold">
                  {formatNaira(proposal.ratePerStudent)}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  per student per term
                  <br />
                  Total: <strong className="text-foreground">{formatNaira(proposal.total)}</strong>
                </p>
              </div>
              <div className="rounded-xl border p-4">
                <p className="text-muted-foreground flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase">
                  <School className="size-3.5" /> What you provide
                </p>
                <ul className="mt-2 space-y-1.5 text-xs leading-relaxed">
                  {proposal.schoolProvides.slice(0, 4).map((item) => (
                    <li key={item} className="flex gap-1.5">
                      <CheckCircle2 className="text-success mt-0.5 size-3.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border p-4">
                <p className="text-muted-foreground flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase">
                  <BadgeCheck className="size-3.5" /> What parents see
                </p>
                <ul className="mt-2 space-y-1.5 text-xs leading-relaxed">
                  <li className="flex gap-1.5">
                    <CheckCircle2 className="text-success mt-0.5 size-3.5 shrink-0" /> A finished
                    project every term
                  </li>
                  <li className="flex gap-1.5">
                    <CheckCircle2 className="text-success mt-0.5 size-3.5 shrink-0" /> A verifiable
                    certificate
                  </li>
                  <li className="flex gap-1.5">
                    <CheckCircle2 className="text-success mt-0.5 size-3.5 shrink-0" /> A Digital
                    Skills Passport
                  </li>
                  <li className="flex gap-1.5">
                    <CheckCircle2 className="text-success mt-0.5 size-3.5 shrink-0" /> A termly
                    report
                  </li>
                </ul>
              </div>
            </div>

            <section className="mt-8">
              <h2 className="font-display text-base font-bold">The term plan</h2>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/60">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">Term</th>
                      <th className="px-3 py-2 text-left font-semibold">Course</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proposal.plan.map((row) => (
                      <tr key={row.term} className="border-t">
                        <td className="px-3 py-2 font-medium">{row.term}</td>
                        <td className="text-muted-foreground px-3 py-2">{row.course}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground mt-2 text-xs">
                Each course runs 1–2 sessions a week, 45–90 minutes each, at your school. The next
                year&rsquo;s plan continues the pathway from wherever the students finish.
              </p>
            </section>

            <section className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <h2 className="font-display text-base font-bold">What the academy provides</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {proposal.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 className="text-primary mt-0.5 size-4 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-base font-bold">What the school provides</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {proposal.schoolProvides.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 className="text-success mt-0.5 size-4 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-8 rounded-lg border bg-muted/30 p-4">
              <h2 className="font-display text-sm font-bold">Fees and terms</h2>
              <ul className="text-muted-foreground mt-2 space-y-1 text-xs leading-relaxed">
                <li>
                  <strong className="text-foreground">
                    {formatNaira(proposal.ratePerStudent)}
                  </strong>{" "}
                  per student per term — total{" "}
                  <strong className="text-foreground">{formatNaira(proposal.total)}</strong> for{" "}
                  {proposal.students} students.
                </li>
                <li>{proposal.paymentTerms}</li>
                <li>Minimum {proposal.minimumStudents} paying students per term.</li>
                <li>
                  This proposal is valid until{" "}
                  <strong className="text-foreground">{proposal.validUntil}</strong>.
                </li>
                <li>
                  Teacher training, ICT lab advice, evening clubs and holiday bootcamps quoted
                  separately.
                </li>
              </ul>
              {proposal.extras.length > 0 && (
                <ul className="mt-3 space-y-1 text-xs">
                  {proposal.extras.map((extra) => (
                    <li key={extra.label} className="flex justify-between gap-4">
                      <span>{extra.label}</span>
                      <span className="font-semibold">{extra.price}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Signature block */}
            <section className="mt-10">
              <h2 className="font-display text-base font-bold">Accept this proposal</h2>
              {decided ? (
                <div
                  className={cn(
                    "mt-3 rounded-lg px-4 py-4",
                    decision === "declined" ? "bg-error/10" : "bg-success/10",
                  )}
                >
                  <p
                    className={cn(
                      "flex items-center gap-2 text-sm font-bold",
                      decision === "declined" ? "text-error" : "text-success",
                    )}
                  >
                    {decision === "declined" ? (
                      <XCircle className="size-4" />
                    ) : (
                      <CheckCircle2 className="size-4" />
                    )}
                    {decision === "declined"
                      ? "Proposal declined"
                      : "Thank you — proposal accepted"}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {decision === "declined"
                      ? "We've recorded your decision. If anything changes, call 0905 862 8386 and we'll pick it up again."
                      : "We've recorded your acceptance and our team will contact you within one working day to agree the start date and the first session."}
                  </p>
                </div>
              ) : (
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <label className="text-xs font-medium">
                    Your full name
                    <input
                      value={acceptedBy}
                      onChange={(e) => setAcceptedBy(e.target.value)}
                      placeholder="e.g. Ada Okafor"
                      className="border-input bg-background focus-visible:ring-ring mt-1 w-full rounded-lg border px-3 py-2.5 text-sm focus-visible:ring-1 focus-visible:outline-none"
                    />
                  </label>
                  <label className="text-xs font-medium">
                    Your role
                    <input
                      value={acceptedRole}
                      onChange={(e) => setAcceptedRole(e.target.value)}
                      placeholder="Head teacher / Proprietor"
                      className="border-input bg-background focus-visible:ring-ring mt-1 w-full rounded-lg border px-3 py-2.5 text-sm focus-visible:ring-1 focus-visible:outline-none"
                    />
                  </label>
                  <Button
                    size="lg"
                    className="h-11 font-semibold"
                    disabled={sending}
                    onClick={() => void accept()}
                  >
                    {sending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="size-4" />
                    )}
                    Accept this proposal
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-11 font-semibold"
                    disabled={sending}
                    onClick={() => void decline()}
                  >
                    <XCircle className="size-4" /> Not right now
                  </Button>
                  <p className="text-muted-foreground text-[11px] sm:col-span-2">
                    Accepting here records your name, the time and this exact proposal — no printing
                    or scanning needed. We will still send a signed copy for your files.
                  </p>
                  {error && <p className="text-error text-xs sm:col-span-2">{error}</p>}
                </div>
              )}
            </section>

            <p className="text-muted-foreground mt-8 flex items-center gap-1.5 border-t pt-4 text-[11px]">
              <Clock3 className="size-3.5" /> Generated {proposal.generatedAt.slice(0, 10)} · valid
              until {proposal.validUntil} · {proposal.ref}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
