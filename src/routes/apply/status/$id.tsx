import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  GraduationCap,
  Loader2,
  Mail,
  ShieldCheck,
  SearchX,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell, PageHero, CTASection } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";
import { useEnrollmentStatus } from "@/lib/query/enrollments";
import { BankTransferForm } from "@/components/enrollment/bank-transfer-form";

export const Route = createFileRoute("/apply/status/$id")({
  head: () => ({
    meta: [
      { title: "Application Status — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Track your CEA application. See exactly where it is and what happens next at every stage.",
      },
    ],
  }),
  component: ApplyStatusDetailPage,
});

const STAGE_ICONS: Record<string, typeof FileText> = {
  submitted: FileText,
  screening: ShieldCheck,
  assessment: ClipboardCheck,
  interview: GraduationCap,
  offer: BadgeCheck,
  enrolled: CheckCircle2,
};

const STAGE_DESCRIPTIONS: Record<string, string> = {
  submitted: "We have your application.",
  screening: "We are reading it.",
  assessment: "If we need more from you, we will email.",
  interview: "A call, if we need one.",
  offer: "Dates, the fee, and what to bring.",
  enrolled: "Your place is confirmed.",
};

function statusBadge(status: string) {
  switch (status) {
    case "offer":
    case "enrolled":
      return { label: "Offer sent", tone: "bg-success/10 text-success" };
    case "interview":
      return { label: "Interview scheduled", tone: "bg-primary/10 text-primary" };
    case "assessment":
      return { label: "Assessment pending", tone: "bg-warning/10 text-warning" };
    case "screening":
      return { label: "In screening", tone: "bg-warning/10 text-warning" };
    default:
      return { label: "Submitted", tone: "bg-warning/10 text-warning" };
  }
}

function ApplyStatusDetailPage() {
  const { id } = Route.useParams();
  const status = useEnrollmentStatus(id);
  const badge = status.data ? statusBadge(status.data.status) : null;
  const payment = status.data?.payment;
  const paymentBadge = payment
    ? payment.status === "paid"
      ? { label: "Paid in full", tone: "bg-success/10 text-success" }
      : payment.status === "deposit_paid"
        ? { label: "Deposit paid", tone: "bg-primary/10 text-primary" }
        : payment.review?.status === "pending_review"
          ? { label: "Transfer under review", tone: "bg-warning/10 text-warning" }
          : payment.status === "failed"
            ? { label: "Payment failed", tone: "bg-error/10 text-error" }
            : { label: "Payment pending", tone: "bg-warning/10 text-warning" }
    : null;

  return (
    <PageShell>
      <PageHero
        eyebrow="Application tracking"
        title="Your application"
        description={`Status for ${id}.`}
      />

      <section className="container-page pb-20">
        <div className="mx-auto max-w-2xl">
          {status.isPending && (
            <Reveal>
              <Card className="bg-card shadow-soft border">
                <CardContent className="flex items-center gap-3 p-6">
                  <Loader2 className="text-primary size-5 animate-spin" />
                  <p className="text-muted-foreground text-sm">Looking up {id}…</p>
                </CardContent>
              </Card>
            </Reveal>
          )}

          {status.isError && (
            <Reveal>
              <Card className="bg-card shadow-soft border">
                <CardContent className="p-8 text-center">
                  <span className="bg-error/10 text-error mx-auto grid size-12 place-items-center rounded-full">
                    <SearchX className="size-6" />
                  </span>
                  <p className="font-display mt-4 text-lg font-extrabold">No application found</p>
                  <p className="text-muted-foreground mx-auto mt-2 max-w-sm text-sm">
                    {status.error instanceof Error
                      ? status.error.message
                      : "We couldn't find an application with that ID."}{" "}
                    Double-check the reference you were given.
                  </p>
                  <Button asChild size="sm" variant="outline" className="mt-5 font-semibold">
                    <Link to="/apply/status">Track another ID</Link>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          )}

          {status.data && (
            <>
              <Reveal>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-extrabold">{status.data.ref}</p>
                    <p className="text-muted-foreground text-sm">
                      {status.data.programTitle ?? "Cyber Elias Academy program"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {badge && (
                      <Badge className={cn("border-0 font-bold", badge.tone)}>{badge.label}</Badge>
                    )}
                    {paymentBadge && (
                      <Badge className={cn("border-0 font-bold", paymentBadge.tone)}>
                        {paymentBadge.label}
                      </Badge>
                    )}
                  </div>
                </div>
              </Reveal>

              {payment?.review?.status === "pending_review" && (
                <Reveal>
                  <Card className="bg-card border-warning/30 mt-6">
                    <CardContent className="p-5">
                      <p className="font-display text-sm font-bold">Transfer under review</p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        We&rsquo;ve logged your bank transfer and finance is matching it against the
                        bank statement — Mon–Sat, 8:00–20:00 WAT. Your receipt goes out by email as
                        soon as it clears; nothing else is needed from you.
                      </p>
                    </CardContent>
                  </Card>
                </Reveal>
              )}

              {payment &&
                payment.status !== "paid" &&
                payment.review?.status !== "pending_review" && (
                  <Reveal>
                    <Card className="bg-card mt-6 border-primary/30">
                      <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
                        <div>
                          <p className="font-display text-sm font-bold">
                            {payment.paidAmount > 0
                              ? "Balance due"
                              : "Pay your deposit or full fee"}
                          </p>
                          <p className="text-muted-foreground mt-1 text-xs">
                            {`₦${payment.amountDue.toLocaleString("en-NG")}`} remaining · quote{" "}
                            {status.data?.ref} when you pay or write to us.
                          </p>
                        </div>
                        <Button asChild size="sm">
                          <a
                            href={`https://wa.me/2349058628386?text=${encodeURIComponent(
                              `Hello Cyber Elias Academy! I'd like to pay for my registration ${id}.`,
                            )}`}
                          >
                            Pay / ask about payment
                          </a>
                        </Button>
                      </CardContent>
                      <CardContent className="border-t px-5 pt-4 pb-5">
                        {/* Report a bank transfer from here too — students often
                            come back to this page days after applying. */}
                        <BankTransferForm
                          refCode={status.data.ref}
                          deposit={
                            payment.plan === "50-50"
                              ? Math.round((payment.amountDue + payment.paidAmount) / 2)
                              : payment.plan === "deposit-monthly"
                                ? Math.round((payment.amountDue + payment.paidAmount) * 0.3)
                                : null
                          }
                          due={payment.amountDue + payment.paidAmount}
                        />
                      </CardContent>
                    </Card>
                  </Reveal>
                )}

              <ol className="mt-8 space-y-0">
                {status.data.stages.map((s, i) => {
                  const Icon = STAGE_ICONS[s.key] ?? FileText;
                  return (
                    <Reveal key={s.key} delay={0.05 * i}>
                      <li className="relative flex gap-4 pb-8 last:pb-0">
                        {i < status.data.stages.length - 1 && (
                          <span
                            className={cn(
                              "absolute top-10 left-[19px] h-[calc(100%-2.5rem)] w-px",
                              s.done ? "bg-primary" : "bg-border",
                            )}
                          />
                        )}
                        <span
                          className={cn(
                            "z-10 grid size-10 shrink-0 place-items-center rounded-full border-2 bg-background",
                            s.done && "border-primary bg-primary/10 text-primary",
                            s.active && "border-primary text-primary shadow-glow",
                            !s.done && !s.active && "border-border text-muted-foreground",
                          )}
                        >
                          {s.done ? (
                            <CheckCircle2 className="size-4.5" />
                          ) : (
                            <Icon className="size-4" />
                          )}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-display text-sm font-extrabold">{s.label}</p>
                            {s.active && (
                              <Badge className="bg-primary/10 text-primary h-5 border-0 text-[10px] font-bold">
                                Current
                              </Badge>
                            )}
                            {s.done && (
                              <Badge className="bg-success/10 text-success h-5 border-0 text-[10px] font-bold">
                                Complete
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground mt-1 text-sm">
                            {STAGE_DESCRIPTIONS[s.key] ?? "Waiting for this stage."}
                          </p>
                          {s.active && (
                            <p className="text-muted-foreground/80 mt-1.5 flex items-center gap-1.5 text-xs font-semibold">
                              <Clock3 className="size-3.5" /> Awaiting you — keep an eye on your
                              inbox
                            </p>
                          )}
                        </div>
                      </li>
                    </Reveal>
                  );
                })}
              </ol>

              <StaggerGroup className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: BadgeCheck, t: "No fees", d: "Applying is always free." },
                  { icon: ShieldCheck, t: "Human review", d: "A person reads your file." },
                  { icon: Mail, t: "Email updates", d: "We email every stage change." },
                ].map((f) => (
                  <StaggerItem key={f.t}>
                    <div className="bg-card flex items-center gap-3 rounded-xl border p-4">
                      <f.icon className="text-primary size-4.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold">{f.t}</p>
                        <p className="text-muted-foreground text-[11px]">{f.d}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>

              <Reveal delay={0.2}>
                <Card className="bg-card mt-10 border">
                  <CardContent className="p-6">
                    <p className="font-display flex items-center gap-2 text-base font-semibold">
                      <Mail className="size-4" /> Need help?
                    </p>
                    <p className="text-muted-foreground mt-1.5 text-sm">
                      Quote your application ID when you write.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Button asChild size="sm">
                        <Link to="/contact">Contact us</Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link to="/apply/status">Track another ID</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            </>
          )}
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
