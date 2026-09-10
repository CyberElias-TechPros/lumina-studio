import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPageHead } from "@/lib/seo";
import { CTASection, PageShell, PageHero, SectionHeading } from "@/components/marketing/shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { Portrait } from "@/components/media/site-image";
import { whatsappUrl } from "@/lib/contact";

export const Route = createFileRoute("/team")({
  head: () =>
    getPageHead({
      title: "Our Team — the people who teach here",
      description:
        "Meet the instructors, mentors and interns at Cyber Elias Academy: Ellis Dennis Graham, Allison Raphael, Peter Hart and the young team learning alongside.",
      path: "/team",
    }),
  component: TeamPage,
});

const team = [
  {
    name: "Ellis Dennis Graham",
    role: "Founder & Lead Instructor",
    photo: "/images/team/ellis.jpg",
    tag: "Full-stack · Networking · IT",
    bio: "Ellis founded the academy after years of hands-on technology work across hardware, networking, web development, IT support and digital marketing. He teaches, builds the curriculum, and still sits with students one-on-one when they're stuck. If you message the academy, you're probably talking to him.",
  },
  {
    name: "Allison Raphael",
    role: "Design Facilitator",
    photo: "/images/team/allison.jpg",
    tag: "Graphics · UI/UX",
    bio: "Allison leads the design side of the academy — graphics design, UI/UX and related creative packages. Students in the design track learn directly from working briefs and real critique, not just tool tutorials.",
  },
  {
    name: "Peter Hart",
    role: "Web & Mobile Facilitator",
    photo: "/images/team/peter.jpg",
    tag: "Web · Mobile apps",
    bio: "Peter handles web and mobile development training — the track where students go from their first lines of code to real, working applications. Learning to code from someone who ships changes everything.",
  },
];

const interns = [
  {
    name: "Fortune Ewa-Henshaw",
    role: "IT Intern",
    photo: "/images/team/fortune.jpg",
    bio: "Understudying General IT — hardware, systems and support — while assisting in the classroom.",
  },
  {
    name: "Rhema Fyneface",
    role: "Game Development Student",
    photo: "/images/team/rhema.jpg",
    bio: "Currently studying game development and building playable projects as part of the learning journey.",
  },
  {
    name: "Divine Isoboye Fyneface",
    role: "AI Content Student",
    photo: "/images/team/divine.jpg",
    bio: "Currently studying AI content generation — learning to use AI tools skilfully and responsibly.",
  },
];

function TeamPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="People"
        title={
          <>
            Small team. <span className="text-gradient">Real teachers.</span>
          </>
        }
        description="We're deliberately small: the people on this page are the people you'll actually meet in the classroom. No hired faces, no stock photos."
      />

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Instructors"
          title="The people who teach you"
          description="Every instructor here builds for a living — that's the hiring bar."
        />
        <StaggerGroup className="mt-10 grid gap-5 lg:grid-cols-3">
          {team.map((m) => (
            <StaggerItem key={m.name}>
              <div className="bg-card shadow-soft flex h-full flex-col rounded-2xl border p-7">
                <div className="flex items-center gap-4">
                  <Portrait src={m.photo} name={m.name} className="size-16 text-lg" />
                  <div>
                    <h3 className="font-display text-lg font-bold">{m.name}</h3>
                    <p className="text-primary text-sm font-semibold">{m.role}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="mt-4 w-fit font-semibold">
                  {m.tag}
                </Badge>
                <p className="text-muted-foreground mt-4 flex-1 text-sm leading-relaxed">
                  {m.bio}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="bg-muted/40 border-y py-16 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Learning in public"
            title="Interns & advanced students"
            description="Part of our model: advanced learners assist, intern and grow inside the academy — so teaching experience starts before graduation."
          />
          <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-3">
            {interns.map((m) => (
              <StaggerItem key={m.name}>
                <div className="bg-card shadow-soft flex h-full flex-col rounded-2xl border p-6">
                  <div className="flex items-center gap-4">
                    <Portrait src={m.photo} name={m.name} className="size-14 text-base" />
                    <div>
                      <h3 className="font-display text-base font-bold">{m.name}</h3>
                      <p className="text-primary text-xs font-semibold">{m.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4 flex-1 text-sm leading-relaxed">
                    {m.bio}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold text-balance">
              Want to learn from — or with — these people?
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Message us and tell us where you are: complete beginner, student, worker looking to
              switch, or organisation that needs training. A real person replies.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="border-0 bg-[#25D366] hover:bg-[#1fb857]">
                <a
                  href={whatsappUrl("Hello! I'd like to meet the team / join a class.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-1.5 size-4" /> WhatsApp us
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/visit">
                  Visit the campus <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Small team, serious teaching"
        description="Come and sit in on a class. You'll know within an hour whether this is the right place for you."
        primary={{ label: "Plan a visit", to: "/visit" }}
        secondary={{ label: "Browse programs", to: "/programs" }}
      />
    </PageShell>
  );
}
