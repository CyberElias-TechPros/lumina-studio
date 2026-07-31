import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileDown,
  GraduationCap,
  HandCoins,
  Laptop,
  Rocket,
  Send,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageShell, PageHero, CTASection } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/visit/brochure")({
  head: () => ({
    meta: [
      { title: "Digital Brochure — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "The Cyber Elias Academy digital brochure: programs, outcomes, tuition and campus life in one downloadable summary.",
      },
    ],
  }),
  component: BrochurePage,
});

const highlights = [
  {
    icon: Rocket,
    tone: "bg-primary/10 text-primary",
    title: "Placement Promise",
    desc: "Work with us until you're placed. No time limit, no extra fee.",
  },
  {
    icon: Laptop,
    tone: "bg-learning/10 text-learning",
    title: "Evening & Saturday classes",
    desc: "Live sessions 18:00–21:00 WAT, plus recordings. Built for working people.",
  },
  {
    icon: HandCoins,
    tone: "bg-warning/10 text-warning",
    title: "Scholarships, every cohort",
    desc: "Merit, need-based, women-in-tech and community funds as the academy grows.",
  },
  {
    icon: Users,
    tone: "bg-career/10 text-career",
    title: "Employer network",
    desc: "Hiring partners who review portfolios and attend demo days — built cohort by cohort.",
  },
];

const tracks = [
  { name: "Frontend Development", length: "6 months", cohort: "Opens with cohort one" },
  { name: "Backend Engineering", length: "6 months", cohort: "Opens with cohort one" },
  { name: "UI/UX Design", length: "5 months", cohort: "Dates announced at admissions" },
  { name: "Data & AI", length: "7 months", cohort: "Dates announced at admissions" },
  { name: "Growth Marketing", length: "4 months", cohort: "Dates announced at admissions" },
  { name: "Product Management", length: "4 months", cohort: "Dates announced at admissions" },
];

function BrochurePage() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <PageHero
        eyebrow="Digital brochure"
        title={
          <>
            The whole academy, <span className="text-gradient">one page</span>
          </>
        }
        description="Programs, outcomes, tuition and campus life — the short version for walk-ins and busy people. Download a PDF or get it emailed."
      />

      <section className="container-page pb-20">
        <div className="flex flex-wrap justify-center gap-2">
          <Button className="bg-gradient-brand shadow-glow border-0">
            <FileDown className="mr-1.5 size-4" /> Download PDF
          </Button>
          <Button asChild variant="outline">
            <Link to="/visit">Book a visit</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/visit/info">Campus map</Link>
          </Button>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {highlights.map((h) => (
            <Reveal key={h.title}>
              <Card className="bg-card shadow-soft h-full border">
                <CardContent className="p-5">
                  <span className={cn("grid size-10 place-items-center rounded-xl", h.tone)}>
                    <h.icon className="size-4.5" />
                  </span>
                  <h3 className="font-display mt-3 text-sm font-extrabold">{h.title}</h3>
                  <p className="text-muted-foreground mt-1 text-xs leading-relaxed">{h.desc}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="bg-card shadow-soft mt-10 rounded-2xl border p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display flex items-center gap-2 text-lg font-extrabold">
                <GraduationCap className="text-primary size-5" /> Programs at a glance
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Six tracks, all delivered live in Port Harcourt and remotely.
              </p>
            </div>
            <Badge variant="secondary" className="font-semibold">
              Cohort 01 · Opening soon
            </Badge>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tracks.map((t) => (
              <div key={t.name} className="rounded-xl border p-4">
                <p className="text-sm font-bold">{t.name}</p>
                <p className="text-muted-foreground mt-1 text-xs">{t.length}</p>
                <Badge className="bg-primary/10 text-primary mt-3 h-5 border-0 text-[10px]">
                  {t.cohort}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="bg-gradient-ink text-ink-foreground shadow-elevated h-full border-0">
              <CardContent className="p-6 sm:p-8">
                <Sparkles className="text-success size-5" />
                <h3 className="font-display mt-3 text-base font-extrabold">Outcomes that talk</h3>
                <ul className="text-ink-foreground/75 mt-4 space-y-3 text-sm">
                  {[
                    "Portfolio-first: every learner ships real products",
                    "Capstones graded by working practitioners",
                    "Placement support until you're placed",
                    "Outcomes published here as cohorts graduate",
                  ].map((o) => (
                    <li key={o} className="flex items-start gap-2.5">
                      <Star className="text-warning mt-0.5 size-4 shrink-0" />
                      {o}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="bg-card shadow-soft h-full border">
              <CardContent className="p-6 sm:p-8">
                <h3 className="font-display text-base font-extrabold">Get the brochure emailed</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  Leave your email and we'll send the PDF plus the upcoming cohort dates.
                </p>
                {sent ? (
                  <div className="mt-6 text-center">
                    <span className="bg-success/10 text-success mx-auto grid size-12 place-items-center rounded-full">
                      <CheckCircle2 className="size-6" />
                    </span>
                    <p className="font-display mt-3 text-sm font-extrabold">Brochure on its way</p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Check your inbox — it lands within the hour.
                    </p>
                  </div>
                ) : (
                  <form
                    className="mt-6 space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                  >
                    <div className="space-y-1.5">
                      <Label htmlFor="b-email">Email address</Label>
                      <Input id="b-email" type="email" placeholder="you@example.com" required />
                    </div>
                    <Button type="submit" className="bg-gradient-brand shadow-glow w-full border-0">
                      <Send className="mr-1.5 size-4" /> Send me the brochure
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </Reveal>
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="ghost">
            <Link to="/visit">
              Prefer the real thing? Book a visit <ArrowRight className="ml-1.5 size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
