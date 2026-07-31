import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell, PageHero, CTASection, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { testimonials } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Alumni Stories — Cyber Elias Academy" },
      {
        name: "description",
        content:
          "Real stories from CEA alumni — how they found their tracks, survived the capstone and built careers that weren't on their radar.",
      },
    ],
  }),
  component: StoriesPage,
});

const stories = [
  {
    name: "Tunde Bakare",
    role: "From auto-mechanic to DevOps Engineer at Andela",
    cohort: "Cohort 11",
    program: "Cloud Engineering & DevOps",
    read: "9 min",
    body: "I had rebuilt enough gearboxes to know how systems work — I just didn't know the vocabulary. CEA gave me the vocabulary in month one and the confidence by month six. My capstone was a disaster that I turned into my best story: I broke a production pipeline in week one of the project and documented the entire recovery. That write-up got me the interview.",
    highlight: "“The capstone that broke was the one that hired me.”",
  },
  {
    name: "Rita Adeyemi",
    role: "Designer who went from landing pages to a fintech design system",
    cohort: "Cohort 9",
    program: "Product & UI/UX Design",
    read: "7 min",
    body: "I was the 'flyer girl' at a printing press. Six months into the program I redesigned my church's mobile giving flow as a case study and posted it — a product manager at a fintech saw it and reached out. The portfolio-first model isn't a slogan. It's literally how my phone rang.",
    highlight: "“My portfolio answered the phone before I did.”",
  },
  {
    name: "Chidinma Eze",
    role: "SOC Analyst at Interswitch after an 11-month career switch",
    cohort: "Cohort 12",
    program: "Cybersecurity Analyst",
    read: "8 min",
    body: "I was a secondary school physics teacher. The first month was brutal — log analysis felt like a foreign language. My mentor, Ngozi, made me keep a 'detection diary' and by month four I was finding real alerts faster than teammates who'd done certifications. The teachers' community scholarship also meant I paid almost nothing.",
    highlight: "“A teacher's discipline is a security analyst's superpower.”",
  },
  {
    name: "Yusuf Lawal",
    role: "Freelancer now billing ₦450k/month for dashboards",
    cohort: "Cohort 14",
    program: "Data Science & Applied AI",
    read: "6 min",
    body: "The gig marketplace changed everything. During my capstone, I picked up two Power BI contracts through the platform — one was literally built during class labs. By graduation I had a portfolio of paid work and a waiting list. I never applied to a single job posting.",
    highlight: "“I graduated with a waiting list, not a resume.”",
  },
];

function StoriesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Alumni stories"
        title={
          <>
            They started where you <span className="text-gradient">are now</span>
          </>
        }
        description="No fairy tales — just people who showed up, did the work, and let the process carry them. Read a few before you decide."
      />

      <section className="container-page pb-20">
        <StaggerGroup className="grid gap-6 lg:grid-cols-2">
          {stories.map((s) => (
            <StaggerItem key={s.name}>
              <Card className="group bg-card shadow-soft hover:shadow-elevated relative h-full overflow-hidden border transition-all hover:-translate-y-1">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="font-semibold">
                        {s.program}
                      </Badge>
                      <Badge variant="outline" className="text-muted-foreground font-semibold">
                        {s.cohort}
                      </Badge>
                    </div>
                    <Quote className="text-primary/30 size-6" />
                  </div>
                  <p className="text-gradient font-display mt-6 text-lg leading-snug font-extrabold text-balance">
                    {s.highlight}
                  </p>
                  <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{s.body}</p>
                  <div className="mt-6 flex items-center gap-3 border-t pt-5">
                    <span className="bg-gradient-brand text-primary-foreground font-display grid size-11 place-items-center rounded-full text-sm font-bold">
                      {s.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display truncate text-sm font-extrabold">{s.name}</p>
                      <p className="text-muted-foreground truncate text-xs">{s.role}</p>
                    </div>
                    <span className="text-muted-foreground shrink-0 text-xs font-semibold">
                      {s.read} read
                    </span>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-14">
          <SectionHeading
            eyebrow="The numbers behind the stories"
            title="What the last four cohorts did"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { v: "87%", l: "Employed within 6 months" },
              { v: "₦4.2m", l: "Average first-year earnings" },
              { v: "12", l: "Countries our alumni work from" },
              { v: "300+", l: "Hiring partners" },
            ].map((s) => (
              <div key={s.l} className="bg-card shadow-soft rounded-2xl border p-6 text-center">
                <p className="text-gradient font-display text-3xl font-extrabold">{s.v}</p>
                <p className="text-muted-foreground mt-2 text-xs font-semibold">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-gradient-brand shadow-glow border-0">
              <Link to="/alumni">
                Join the network <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/blog">
                Read our insights <ArrowUpRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="bg-muted/40 border-y">
        <div className="container-page py-16">
          <div className="mx-auto max-w-3xl text-center">
            <Quote className="text-primary/30 mx-auto size-8" />
            <blockquote className="font-display mt-4 text-xl leading-relaxed font-extrabold text-balance sm:text-2xl">
              “CEA-OS doesn't just track your grades. It tracks your story — every artifact, every
              skill, every leap from applicant to hired.”
            </blockquote>
            <p className="text-muted-foreground mt-5 text-sm font-semibold">
              Elias Okonkwo · Founder & Director
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Your story starts with an application"
        description="The next cohort is two months out. Be one of the stories we tell next year."
        primary={{ label: "Start your application", to: "/apply" }}
      />
    </PageShell>
  );
}
