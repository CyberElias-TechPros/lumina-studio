import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowRight, CheckCircle2, CreditCard, MapPin, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection, PageShell } from "@/components/marketing/shell";
import { CampusImg } from "@/components/marketing/photos";
import { TUITION_POLICY } from "@/data/academy/tuition-policy";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/admissions")({
  head: () =>
    getPageHead({
      title: "Admissions — How to Enrol",
      description:
        "How to enrol at Cyber Elias Academy: 5 guided steps from choosing a practical course to confirmed offer, verified payment, and seat activation.",
      path: "/admissions",
    }),
  component: Admissions,
});

const steps = [
  {
    n: "01",
    title: "Choose a course that fits your goal",
    tag: "Discover & Compare",
    body: "Review the syllabus, published fee in Naira, duration, and deliverables before you decide. Beginner tracks require zero prior experience.",
    action: { label: "Browse all courses", to: "/classes" },
  },
  {
    n: "02",
    title: "Pick a schedule & learning mode",
    tag: "Morning · Afternoon · Hybrid",
    body: "Choose on-site training at 24 Ebony Road, online cohorts, or hybrid scheduling across standard or alternating weekday timetables.",
    action: { label: "Check visit hours", to: "/visit" },
  },
  {
    n: "03",
    title: "Submit your free application",
    tag: "₦0 Application Fee",
    body: "No entrance exam and no upfront payment. Share your name, verified email, phone number, and preferred track in under three minutes.",
    action: { label: "Start application", to: "/apply" },
  },
  {
    n: "04",
    title: "Review & accept a confirmed offer",
    tag: "Place First · Payment Second",
    body: "Admissions confirms seat availability, start date, equipment requirements, and exact fee terms. You explicitly review and accept the offer in your private portal.",
    action: { label: "Track an application", to: "/apply/status" },
  },
  {
    n: "05",
    title: "Complete verified payment & begin",
    tag: "Paystack · Verified Transfer",
    body: "Pay in full or on an approved 50/50 split through your private application page, receive an official digital receipt, and unlock your CEA-OS learning workspace.",
    action: { label: "Review payment rules", to: "/pay" },
  },
];

function Admissions() {
  return (
    <PageShell>
      {/* 1. OBSIDIAN FRONTIER HERO */}
      <section className="relative overflow-hidden bg-[#101214] text-[#F4F1E9] cea-frontier-grid">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-[#7774FF]/15 blur-3xl"
        />
        <div className="container-page relative z-10 grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.22em] text-[#D6FE52] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D6FE52]" />
              Admissions · 5-Step Enrolment Flow
            </p>
            <h1 className="font-display mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              How to enrol — clear steps from first interest to day one.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#F4F1E9]/75 sm:text-lg">
              Submit your course interest with zero upfront fees. We confirm your real seat,
              timetable, and equipment setup before asking for a single Naira.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-[#D6FE52] text-[#101214] font-semibold hover:bg-[#c5ee42]"
              >
                <Link to="/apply">
                  Start an application <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-[#F4F1E9]/20 bg-transparent text-[#F4F1E9] hover:bg-[#F4F1E9]/10 hover:text-[#F4F1E9]"
              >
                <Link to="/classes">Compare courses</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-[#F4F1E9]/15 bg-[#161A1F] p-6 sm:p-7">
            <p className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#F17C52] uppercase">
              Protection Promise
            </p>
            <p className="font-display mt-3 text-2xl font-semibold text-[#F4F1E9]">
              Zero upfront fees. No blind transfers.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#F4F1E9]/70">
              {TUITION_POLICY.application}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 border-t border-[#F4F1E9]/10 pt-4 text-xs text-[#F4F1E9]/80">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-[#D6FE52]" /> Published Naira fees
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-[#D6FE52]" /> 14-day refund policy
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WARM PAPER 5-STEP GUIDED ARCHITECTURE */}
      <section className="container-page py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-primary font-mono text-xs font-semibold tracking-[0.2em] uppercase">
              The Process / 01 — 05
            </p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Built so nobody pays before the class is real.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
              Every cohort has a verified timetable and clear equipment checklist. Unscheduled
              courses collect interest only until seats open.
            </p>
            <figure className="border-border mt-8 overflow-hidden rounded-2xl border bg-card">
              <CampusImg id="lab-3" className="aspect-[16/10]" />
              <figcaption className="text-muted-foreground flex items-center justify-between px-4 py-2.5 text-xs">
                <span>Practical session at 24 Ebony Road, Port Harcourt</span>
                <Link to="/visit" className="text-primary font-semibold hover:underline">
                  Book a visit
                </Link>
              </figcaption>
            </figure>
          </div>

          <ol className="space-y-4">
            {steps.map((s) => (
              <li
                key={s.n}
                className="border-border bg-card group rounded-2xl border p-6 transition-colors hover:border-primary/40 sm:p-7"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-sm font-bold tracking-wider text-primary">
                    STEP {s.n}
                  </span>
                  <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 font-mono text-[11px] font-medium">
                    {s.tag}
                  </span>
                </div>
                <h3 className="font-display mt-3 text-xl font-semibold sm:text-2xl">{s.title}</h3>
                <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed sm:text-base">
                  {s.body}
                </p>
                <div className="mt-4">
                  <Link
                    to={s.action.to}
                    className="text-primary inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
                  >
                    {s.action.label} <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. ACTION STRIP: TRACK, PAY, OR VISIT */}
      <section className="border-border bg-muted/40 border-y">
        <div className="container-page grid gap-6 py-16 md:grid-cols-3 md:py-20">
          <div className="bg-card border-border rounded-2xl border p-6">
            <Search className="text-primary size-5" />
            <h2 className="font-display mt-4 text-xl font-semibold">Already applied?</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Enter your <code>CEA-YYYY-XXXXXX</code> reference and verified email to inspect your
              stage, offer details, and receipt.
            </p>
            <Button asChild variant="outline" className="mt-5 rounded-full">
              <Link to="/apply/status">Track application</Link>
            </Button>
          </div>

          <div className="bg-card border-border rounded-2xl border p-6">
            <CreditCard className="text-primary size-5" />
            <h2 className="font-display mt-4 text-xl font-semibold">Fees & payments</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {TUITION_POLICY.payment} Full 14-day refund protection before completion applies.
            </p>
            <Button asChild variant="outline" className="mt-5 rounded-full">
              <Link to="/pay">Review tuition & pay</Link>
            </Button>
          </div>

          <div className="bg-card border-border rounded-2xl border p-6">
            <MapPin className="text-primary size-5" />
            <h2 className="font-display mt-4 text-xl font-semibold">Visit before enrolling</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Walk into 24 Ebony Road, Off Rumuola Road, Mon–Sat (8:00–20:00 WAT) to meet
              instructors and see the computers first.
            </p>
            <Button asChild variant="outline" className="mt-5 rounded-full">
              <Link to="/visit">Schedule a visit</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to pick your course?"
        description="Submit a free application in three minutes. Admissions replies with confirmed dates and equipment guidance."
        primary={{ label: "Start application", to: "/apply" }}
        secondary={{ label: "Talk to admissions", to: "/contact" }}
      />
    </PageShell>
  );
}
