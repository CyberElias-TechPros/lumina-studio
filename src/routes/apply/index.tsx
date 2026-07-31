import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileText,
  GraduationCap,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageShell, PageHero, CTASection, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { programs, formatNaira, engineMap } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/apply/")({
  validateSearch: z.object({
    program: z.string().optional(),
  }),
  head: () => ({
    meta: [
      { title: "Apply — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Apply to a CEA program in four steps. Choose your track, complete your profile, take the assessment and secure your seat.",
      },
    ],
  }),
  component: ApplyPage,
});

const steps = [
  { label: "Program", icon: GraduationCap },
  { label: "Profile", icon: FileText },
  { label: "Assessment", icon: ClipboardCheck },
  { label: "Financing", icon: Wallet },
];

const assessment = [
  { id: "logical", label: "Logical reasoning", desc: "Problem solving and pattern recognition" },
  { id: "verbal", label: "Verbal reasoning", desc: "Comprehension and communication" },
  {
    id: "technical",
    label: "Technical basics",
    desc: "Optional — only if you have some experience",
  },
];

function ApplyPage() {
  const { program: initialProgram } = Route.useSearch();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [programSlug, setProgramSlug] = useState(initialProgram ?? "");
  const [funding, setFunding] = useState("installments");
  const selected = programs.find((p) => p.slug === programSlug);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const submit = () => setDone(true);

  if (done) {
    return (
      <PageShell>
        <section className="container-page grid min-h-[60vh] place-items-center py-20">
          <Reveal className="text-center">
            <span className="bg-success/10 text-success mx-auto grid size-16 place-items-center rounded-full">
              <CheckCircle2 className="size-8" />
            </span>
            <h1 className="font-display mt-6 text-3xl font-extrabold sm:text-4xl">
              Application submitted
            </h1>
            <p className="text-muted-foreground mx-auto mt-3 max-w-md">
              Your application for <strong className="text-foreground">{selected?.title}</strong> is
              in review. We'll email your assessment link within 24 hours and you can track every
              stage below.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild className="bg-gradient-brand shadow-glow border-0">
                <Link to="/apply/status">
                  Track application <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/programs">Browse programs</Link>
              </Button>
            </div>
          </Reveal>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Admissions opening · Cohort 01"
        title={
          <>
            Apply in <span className="text-gradient">four steps</span>
          </>
        }
        description="Every application is reviewed by a human. Expect an assessment link within 24 hours and a decision within 5 working days."
      />

      <section className="container-page pb-20">
        <div className="mx-auto max-w-3xl">
          <ol className="mb-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.label}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-bold transition-colors",
                  i === step
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-card text-muted-foreground",
                  i < step && "text-success border-success/30",
                )}
              >
                <s.icon className="size-4 shrink-0" />
                <span className="hidden sm:inline">{s.label}</span>
                {i < step && <CheckCircle2 className="ml-auto size-3.5" />}
              </li>
            ))}
          </ol>

          <Reveal key={step}>
            {step === 0 && (
              <Card className="bg-card shadow-soft border">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="font-display text-xl font-extrabold">Choose your program</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Don't know where to start? Take the{" "}
                    <Link
                      to="/apply"
                      className="text-primary font-semibold underline-offset-2 hover:underline"
                    >
                      readiness quiz
                    </Link>{" "}
                    or book a free career call.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {programs.map((p) => {
                      const engine = engineMap[p.engine];
                      return (
                        <button
                          key={p.slug}
                          onClick={() => setProgramSlug(p.slug)}
                          className={cn(
                            "rounded-2xl border p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-elevated",
                            programSlug === p.slug
                              ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                              : "bg-card hover:border-primary/40",
                          )}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <Badge variant="secondary" className="font-semibold">
                              {p.category}
                            </Badge>
                            {programSlug === p.slug && (
                              <CheckCircle2 className="text-primary size-4" />
                            )}
                          </div>
                          <p className="font-display mt-3 text-sm leading-snug font-bold">
                            {p.title}
                          </p>
                          <p className="text-muted-foreground mt-2 text-xs">
                            {p.level} · {p.duration}
                          </p>
                          <p className="mt-3 flex items-baseline gap-1">
                            <span className="font-display text-lg font-extrabold">
                              {formatNaira(p.price)}
                            </span>
                            <span className="text-muted-foreground text-xs">full program</span>
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 1 && (
              <Card className="bg-card shadow-soft border">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="font-display text-xl font-extrabold">Your profile</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {selected?.title} · {selected?.duration}
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {[
                      { id: "firstName", label: "First name", ph: "Adaeze" },
                      { id: "lastName", label: "Last name", ph: "Okafor" },
                    ].map((f) => (
                      <div key={f.id} className="space-y-1.5">
                        <Label htmlFor={f.id}>{f.label}</Label>
                        <Input id={f.id} placeholder={f.ph} />
                      </div>
                    ))}
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email address</Label>
                      <Input id="email" type="email" placeholder="adaeze@example.com" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone (WhatsApp)</Label>
                      <Input id="phone" type="tel" placeholder="+234 801 234 5678" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="city">City / State</Label>
                      <Select>
                        <SelectTrigger id="city">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Lagos",
                            "Abuja",
                            "Port Harcourt",
                            "Ibadan",
                            "Kano",
                            "Outside Nigeria",
                          ].map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="experience">Prior experience</Label>
                      <Select>
                        <SelectTrigger id="experience">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {["No experience", "Less than 1 year", "1–3 years", "3+ years"].map(
                            (c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="bg-card shadow-soft border">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="font-display text-xl font-extrabold">Background assessment</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Takes about 45 minutes. Your score shapes the cohort we place you in — it is
                    never a pass/fail gate.
                  </p>
                  <div className="mt-6 space-y-3">
                    {assessment.map((a) => (
                      <div key={a.id} className="rounded-xl border p-4">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            defaultChecked
                            id={a.id}
                            className="size-4 accent-[var(--primary)]"
                          />
                          <Label htmlFor={a.id} className="cursor-pointer">
                            <span className="block font-bold">{a.label}</span>
                            <span className="text-muted-foreground text-xs font-normal">
                              {a.desc}
                            </span>
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-muted-foreground mt-4 text-xs">
                    We'll email a secure assessment link. You can also sit it on campus if you'd
                    prefer.
                  </p>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card className="bg-card shadow-soft border">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="font-display text-xl font-extrabold">Financing</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    No-one is turned away for money. Choose how you want to pay.
                  </p>
                  <RadioGroup value={funding} onValueChange={setFunding} className="mt-6 space-y-3">
                    {[
                      {
                        id: "installments",
                        title: "Structured instalments",
                        desc: `${formatNaira(selected?.price ?? 0)} split into monthly payments over the program duration.`,
                        meta: "Most popular",
                      },
                      {
                        id: "upfront",
                        title: "Pay in full",
                        desc: `${formatNaira((selected?.price ?? 0) * 0.9)} — save 10% with a single payment.`,
                      },
                      {
                        id: "scholarship",
                        title: "Apply for a scholarship",
                        desc: "Merit, need-based and women-in-tech funding. You can apply while your application is reviewed.",
                      },
                      {
                        id: "payments",
                        title: "Pay after you're placed",
                        desc: "Deferred tuition backed by our Placement Promise — available for selected programs.",
                      },
                    ].map((o) => (
                      <label
                        key={o.id}
                        className={cn(
                          "flex cursor-pointer items-start gap-3 rounded-xl border p-4",
                          funding === o.id && "border-primary bg-primary/5",
                        )}
                      >
                        <RadioGroupItem value={o.id} id={o.id} className="mt-0.5" />
                        <span className="flex-1">
                          <span className="flex items-center gap-2 font-bold">
                            {o.title}
                            {o.meta && (
                              <Badge className="bg-primary/15 text-primary h-5 border-0 text-[10px]">
                                {o.meta}
                              </Badge>
                            )}
                          </span>
                          <span className="text-muted-foreground mt-0.5 block text-sm">
                            {o.desc}
                          </span>
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            )}
          </Reveal>

          <div className="mt-6 flex items-center justify-between">
            <Button variant="ghost" onClick={back} disabled={step === 0}>
              <ArrowLeft className="mr-1.5 size-4" /> Back
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={next} className="bg-gradient-brand shadow-glow border-0">
                Continue <ArrowRight className="ml-1.5 size-4" />
              </Button>
            ) : (
              <Button onClick={submit} className="bg-gradient-brand shadow-glow border-0">
                Submit application <ArrowRight className="ml-1.5 size-4" />
              </Button>
            )}
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Free to apply", desc: "No application fee, ever." },
              {
                icon: ClipboardCheck,
                title: "Human review",
                desc: "A person reads every application.",
              },
              { icon: Wallet, title: "Full refund", desc: "Money-back guarantee in week 1." },
            ].map((f) => (
              <div key={f.title} className="bg-card flex items-center gap-3 rounded-xl border p-4">
                <f.icon className="text-primary size-5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">{f.title}</p>
                  <p className="text-muted-foreground text-xs">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Not ready to apply yet?"
        description="Talk to an admissions advisor — no pressure, honest answers."
        primary={{ label: "Book a call", to: "/contact" }}
      />
    </PageShell>
  );
}
