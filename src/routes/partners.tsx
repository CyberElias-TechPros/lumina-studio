import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Handshake,
  Megaphone,
  School,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTASection, PageHero, PageShell, SectionHeading } from "@/components/marketing/shell";
import { Marquee, Reveal, StaggerGroup, StaggerItem, TiltCard } from "@/components/motion";
import { partnersList } from "@/data/site";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/partners")({
  head: () =>
    getPageHead({
      title: "Partners",
      description:
        "Employers, institutions, NGOs and sponsors — partner with the academy to hire talent, co-brand programs, fund scholarships and build the tech ecosystem.",
      path: "/partners",
      noIndex: true,
    }),
  component: Partners,
});

const partnerTypes = [
  {
    icon: BriefcaseBusiness,
    title: "Employers",
    body: "Hire vetted graduates, post roles on the private marketplace, host career fairs and shape curriculum through employer councils.",
    cta: "Hire with us",
  },
  {
    icon: School,
    title: "Institutions",
    body: "Universities and schools co-run bootcamps, pathway programs and faculty upskilling on our delivery platform.",
    cta: "Co-run programs",
  },
  {
    icon: Handshake,
    title: "NGOs & government",
    body: "Deliver state-wide digital skills programs, manage scholarship funds and report impact to donors — on one platform.",
    cta: "Start a program",
  },
  {
    icon: Megaphone,
    title: "Sponsors",
    body: "Fund seats, labs and events. Track exactly which students your sponsorship reached and what they achieved.",
    cta: "Sponsor a cohort",
  },
];

function Partners() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Partners"
        art="network"
        title={
          <>
            Together we <span className="text-gradient">achieve more</span>
          </>
        }
        description="Employers, institutions, NGOs, sponsors and government — the academy's ecosystem engine. Every partnership has an agreement, a dashboard and measurable impact."
      />

      <section className="border-y py-8">
        <p className="text-muted-foreground container-page mb-6 text-center text-[11px] font-bold tracking-[0.2em] uppercase">
          Who works with us
        </p>
        <Marquee items={partnersList} />
      </section>

      <section className="container-page py-20 md:py-24">
        <SectionHeading eyebrow="Ways to partner" title="Four doors into the ecosystem" />
        <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2">
          {partnerTypes.map((p) => (
            <StaggerItem key={p.title}>
              <TiltCard intensity={5} className="h-full">
                <div className="group bg-card shadow-soft hover:shadow-elevated flex h-full flex-col rounded-2xl border p-8 transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="bg-primary/10 text-primary grid size-12 place-items-center rounded-2xl">
                      <p.icon className="size-6" />
                    </span>
                    <ArrowUpRight className="text-muted-foreground/40 group-hover:text-primary size-5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h3 className="font-display mt-6 text-xl font-bold">{p.title}</h3>
                  <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
                    {p.body}
                  </p>
                  <Link
                    to="/contact"
                    className="text-primary mt-6 inline-flex items-center gap-1.5 border-t pt-5 text-sm font-bold"
                  >
                    {p.cta} <ArrowRight className="size-4" />
                  </Link>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="bg-muted/40 border-y py-20 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="The partner portal"
            title="Every partnership runs on rails"
            description="Sign an MOU, get a portal. Track referrals, revenue share, co-branded programs and impact reports in real time."
          />
          <div className="space-y-4">
            {[
              {
                icon: Award,
                text: "Digital agreements with terms, renewal alerts and e-signature",
              },
              {
                icon: CheckCircle2,
                text: "Referral links that track every application and enrollment",
              },
              {
                icon: GraduationCap,
                text: "Co-branded events, bootcamps and content with shared dashboards",
              },
              {
                icon: Megaphone,
                text: "Impact and revenue-share reports, exportable for your board",
              },
            ].map((f, i) => (
              <Reveal key={f.text} delay={i * 0.06}>
                <div className="bg-card shadow-soft flex items-start gap-3 rounded-2xl border p-5">
                  <f.icon className="text-primary mt-0.5 size-5 shrink-0" />
                  <p className="text-sm leading-relaxed font-medium">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <SectionHeading
          align="center"
          eyebrow="Case study"
          title="Our first case studies are being earned"
          description="When the first state-wide program, institutional bootcamp or employer placement ships, the numbers get published here — verified, not imagined."
        />
        <Reveal delay={0.1} className="mx-auto mt-10 max-w-xl text-center">
          <div className="border-dashed bg-card/50 flex flex-col items-center rounded-3xl border p-10">
            <Award className="text-muted-foreground size-8" />
            <p className="font-display mt-4 text-lg font-extrabold">No invented outcomes</p>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              We build the platform first, then report what it actually produced. Want to be the
              first case study? Start a partnership.
            </p>
          </div>
        </Reveal>
      </section>

      <CTASection
        title="Let's build the ecosystem together"
        description="Partnerships start with a conversation. Tell us what you're trying to achieve and we'll design the program around it."
        primary={{ label: "Start a partnership", to: "/contact" }}
        secondary={{ label: "See our work", to: "/work" }}
      />
    </PageShell>
  );
}
