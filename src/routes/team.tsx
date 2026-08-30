import { createFileRoute } from "@tanstack/react-router";
import { getPageHead } from "@/lib/seo";
import { PageShell, PageHero, SectionHeading } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";
import { MapPin, Mail, Linkedin, Globe } from "lucide-react";

export const Route = createFileRoute("/team")({
  head: () =>
    getPageHead({
      title: "Our Team",
      description:
        "Meet the people behind Cyber Elias Academy. Learn about our founder Ellis Dennis Graham and the team building Nigeria's digital workforce pipeline.",
      path: "/team",
      type: "article",
    }),
  component: TeamPage,
});

const team = [
  {
    name: "Ellis Dennis Graham",
    role: "Founder & CEO",
    bio: "Ellis founded Cyber Elias Academy to bridge Nigeria's digital skills gap. With a background in technology and certifications in software development, he leads strategy, partnerships, and the vision to make practical tech education accessible across Nigeria. His focus is on building a sustainable model that takes learners from zero to job-ready.",
    image: null,
    linkedin: null,
  },
];

const advisors = [
  {
    name: "Engineering & Curriculum",
    role: "Building the learning experience",
    description:
      "Our curriculum is shaped by practitioners with years of experience in software development, cybersecurity, and IT education. The program is designed around what employers actually need.",
  },
  {
    name: "Business Development",
    role: "Partnerships and growth",
    description:
      "Our BD function focuses on building relationships with employers, institutions, and partners to create pathways from training to employment.",
  },
];

function TeamPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="People"
        title="Built by practitioners, for practitioners"
        description="Cyber Elias Academy was founded to solve a real problem: too many talented Nigerians lack access to practical, employer-aligned tech training. Our team combines technology experience with a commitment to building something that lasts."
      />

      <section className="container-page py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Leadership"
            title="Founder"
            description="Cyber Elias Academy was founded by Ellis Dennis Graham in Port Harcourt, Nigeria."
          />

          <div className="mt-12">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.1}>
                <div className="bg-card border rounded-2xl p-8">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                    <div className="bg-primary/10 text-primary font-display grid size-20 shrink-0 place-items-center rounded-2xl text-2xl font-bold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold">{member.name}</h3>
                      <p className="text-primary mt-1 text-sm font-semibold">{member.role}</p>
                      <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                        {member.bio}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-4 text-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <MapPin className="text-primary size-4" /> Port Harcourt, Nigeria
                        </span>
                        <a
                          href="mailto:hello@cea.ng"
                          className="text-primary flex items-center gap-2 hover:underline"
                        >
                          <Mail className="size-4" /> hello@cea.ng
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 border-y py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Team"
            title="How we're structured"
            description="We are a lean team focused on delivering quality training and real outcomes. As we grow, we are building out specialized functions across the business."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {advisors.map((advisor, i) => (
              <Reveal key={advisor.name} delay={i * 0.1}>
                <div className="bg-card border rounded-2xl p-6">
                  <h3 className="font-display text-base font-bold">{advisor.name}</h3>
                  <p className="text-primary mt-1 text-xs font-semibold uppercase tracking-wide">
                    {advisor.role}
                  </p>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {advisor.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Company"
            title="The facts"
            description="What you see is what we are — an early-stage Nigerian tech academy building toward something meaningful."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Founded", value: "2025" },
              { label: "Based in", value: "Port Harcourt, Rivers State, Nigeria" },
              { label: "Business type", value: "Digital skills academy & IT services" },
              {
                label: "Focus areas",
                value: "Software, Cloud, Cybersecurity, AI, Design, Marketing",
              },
              { label: "Training modes", value: "In-person, Online, Hybrid" },
              { label: "Contact", value: "hello@cea.ng · +234 905 862 8386" },
            ].map((fact) => (
              <div key={fact.label} className="bg-card border rounded-xl p-4">
                <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                  {fact.label}
                </p>
                <p className="mt-1 text-sm font-medium">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
