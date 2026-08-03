import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  ClipboardCheck,
  FileText,
  GraduationCap,
  IdCard,
  MailCheck,
  MessagesSquare,
  ScrollText,
  UserCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "How admission to Cyber Elias Academy works: apply online, upload documents, sit an interview or entrance exam, get an offer and enroll.",
      },
    ],
  }),
  component: Admissions,
});

const steps = [
  {
    icon: ClipboardCheck,
    step: "01",
    title: "Apply online",
    body: "A 10-minute application: your background, your goal, your program choice. No application fee.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Documents",
    body: "Upload your ID and any certificates. Missing something? We'll remind you — never block you.",
  },
  {
    icon: UserCheck,
    step: "03",
    title: "Interview & exam",
    body: "A relaxed conversation plus a short entrance assessment to place you at the right level.",
  },
  {
    icon: MailCheck,
    step: "04",
    title: "Offer letter",
    body: "Accepted candidates get a conditional offer within 5 working days of their interview.",
  },
  {
    icon: CalendarCheck,
    step: "05",
    title: "Reserve & enroll",
    body: "Pay a deposit or arrange an ISA, complete onboarding, and meet your cohort and mentor.",
  },
  {
    icon: GraduationCap,
    step: "06",
    title: "Start learning",
    body: "Your dashboard opens: schedule, course materials, assignments and your mentor circle.",
  },
];

const guarantees = [
  { icon: IdCard, text: "No application fee — ever" },
  { icon: BadgeCheck, text: "Offer within 5 working days of interview" },
  { icon: MessagesSquare, text: "Human support at every step" },
  { icon: Users, text: "Deadline extensions on request" },
];

function Admissions() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Admissions"
        art="community"
        title={
          <>
            Six steps from <span className="text-gradient">curious to enrolled</span>
          </>
        }
        description="The whole process runs on the platform — apply, upload, interview, accept, pay and onboard without a single phone call. Track every step from your dashboard."
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {guarantees.map((g) => (
            <Badge
              key={g.text}
              variant="secondary"
              className="flex items-center gap-1.5 py-2 font-medium"
            >
              <g.icon className="text-primary size-3.5" /> {g.text}
            </Badge>
          ))}
        </div>
      </PageHero>

      <section className="container-page py-20 md:py-24">
        <SectionHeading
          eyebrow="The process"
          title="How admission works"
          description="No gatekeeping, no black box. Here is exactly what happens after you click apply."
        />
        <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <StaggerItem key={s.step}>
              <div className="group bg-card shadow-soft hover:shadow-elevated relative h-full rounded-2xl border p-7 transition-shadow">
                <span className="font-display text-gradient text-4xl font-extrabold">{s.step}</span>
                <div className="bg-primary/10 text-primary mt-4 grid size-11 place-items-center rounded-xl">
                  <s.icon className="size-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold">{s.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{s.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="bg-muted/40 border-y py-20 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="What we're looking for"
            title="Potential, not pedigree"
            description="No degree required. No age limit. We admit on motivation, consistency and a fair assessment — not your past qualifications."
          />
          <div className="space-y-4">
            {[
              {
                icon: Check,
                text: "Cohorts start every quarter — apply 6 weeks before start date for the best seat availability",
              },
              {
                icon: Check,
                text: "Beginner tracks assume zero technical background and start from fundamentals",
              },
              {
                icon: Check,
                text: "Work while you study: weekday-evening and weekend streams on every program",
              },
              {
                icon: Check,
                text: "Transfer credits accepted for equivalent modules completed elsewhere",
              },
            ].map((f, i) => (
              <Reveal key={f.text} delay={i * 0.06}>
                <div className="bg-card shadow-soft flex items-start gap-3 rounded-2xl border p-5">
                  <f.icon className="text-success mt-0.5 size-5 shrink-0" />
                  <p className="text-sm leading-relaxed font-medium">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <Reveal>
          <div className="bg-gradient-ink text-ink-foreground shadow-elevated relative overflow-hidden rounded-3xl px-8 py-14 md:px-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_0%,oklch(0.55_0.15_330/0.3),transparent)]" />
            <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-ink-foreground/60 text-xs font-bold tracking-[0.18em] uppercase">
                  Application status
                </p>
                <h2 className="font-display mt-2 text-3xl font-extrabold sm:text-4xl">
                  Already applied?
                </h2>
                <p className="text-ink-foreground/75 mt-3 max-w-xl leading-relaxed">
                  Track your application, upload documents and see your interview slot in real time
                  — no calls, no chasing.
                </p>
              </div>
              <Button asChild size="lg" className="bg-gradient-brand shadow-glow border-0">
                <Link to="/apply/status">
                  <ScrollText className="mr-2 size-4" /> Track your application
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      <CTASection
        title="Cohort 01 applications are opening"
        description="Start your application now — it takes 10 minutes and costs nothing. Seats are allocated on a rolling basis."
        primary={{ label: "Start your application", to: "/apply" }}
        secondary={{ label: "Check tuition", to: "/pricing" }}
      />
    </PageShell>
  );
}
