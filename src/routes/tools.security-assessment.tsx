import { createFileRoute } from "@/lib/next-compat/route-definition";
import { Link } from "@/lib/next-compat/router";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { PageShell, PageHero, CTASection, Eyebrow } from "@/components/marketing/shell";
import {
  SecurityAssessmentBuilder,
  ZeroTrustPrincipleMatcher,
} from "@/components/tools/security-assessment-builder";
import { getPageHead } from "@/lib/seo";

/**
 * /tools/security-assessment — the destination for the site's two best rankings.
 *
 * Search Console showed /glossary/vulnerability-assessment at position 2.04 with
 * 172 impressions, and /glossary/zero-trust at 4.13 with 189 — both permanently
 * redirected to /classes, so neither could convert. This page replaces them with
 * something a reader can actually use, which is also what makes it defensible to
 * a quality reviewer rather than a half-page glossary stub.
 */
export const Route = createFileRoute("/tools/security-assessment")({
  head: () =>
    getPageHead({
      title: "Vulnerability Assessment Checklist & Zero Trust Guide (Free)",
      description:
        "Run a free security self-assessment: a 10-point vulnerability checklist with CVSS severity bands, a scored report you can copy, and the three Zero Trust principles that fix most of it.",
      path: "/tools/security-assessment",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "CEA Security Assessment Builder — Vulnerability Checklist & Zero Trust Guide",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
        description:
          "A ten-point vulnerability assessment checklist with CVSS v3.1 severity banding, a scored report, and Zero Trust principles mapped to each finding.",
      },
    }),
  component: SecurityAssessmentPage,
});

const FAQS = [
  {
    q: "What is a vulnerability assessment?",
    a: "A vulnerability assessment is a structured look at the systems you run, checking them against known weaknesses and recording what you find, how bad it is and how easily it could be exploited. It differs from a penetration test: an assessment identifies and ranks weaknesses, while a penetration test attempts to exploit them to prove the impact.",
  },
  {
    q: "What is the difference between a vulnerability assessment and a penetration test?",
    a: "An assessment asks 'what is weak?' and produces a ranked list. A penetration test asks 'can I actually get in?' and produces evidence. Most organisations need an assessment first — it is cheaper, needs no special tools, and tells you what to prioritise before you pay someone to attack you.",
  },
  {
    q: "What is Zero Trust security, in plain words?",
    a: "Zero Trust means no user, device or network is trusted because of where it is. Every request is checked on its own merits: who is asking, from what device, and does that device look healthy. 'Inside the office network' stops being a reason to trust anything.",
  },
  {
    q: "What are the three principles of Zero Trust?",
    a: "Verify explicitly (check every request using all available signals), use least-privilege access (give the minimum access the job needs, for as long as it needs it), and assume breach (design as if someone is already inside, so limit how far they can move and make sure you would notice).",
  },
  {
    q: "Is this a real vulnerability scan?",
    a: "No, and it does not pretend to be. It is a self-assessment checklist — it cannot see your network and nothing you enter is sent anywhere. Treat it as a way to decide what to examine first, then verify each finding by hand or with a qualified professional.",
  },
  {
    q: "How is severity scored?",
    a: "The bands follow CVSS v3.1, the scale used in most security tools: none 0.0, low 0.1–3.9, medium 4.0–6.9, high 7.0–8.9, critical 9.0–10.0. The aggregate score here is weighted towards your worst finding rather than averaged, so one critical issue is not hidden by several small ones.",
  },
  {
    q: "Do I need special tools to run a security assessment?",
    a: "No. Every item in this checklist can be answered by asking questions and looking at settings — who can sign in, what was restored from backup, which admin pages answer from outside the office. Tools help once you know what you are looking for.",
  },
];

function SecurityAssessmentPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free tool · Security"
        title={
          <>
            What is weak, and{" "}
            <span className="font-serif text-primary font-normal italic">what to fix first?</span>
          </>
        }
        description="A ten-point vulnerability assessment you can run today, scored in the severity bands a real ticketing system uses, with each finding mapped to the Zero Trust principle that fixes it. Nothing leaves your browser."
        meta={["10 checks", "CVSS bands", "Zero Trust mapped", "Copyable report"]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            to="/tools"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium"
          >
            <ArrowLeft className="size-4" /> All tools
          </Link>
          <Link
            to="/blog/zero-trust-in-plain-words"
            className="text-primary inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
          >
            Read why Zero Trust exists <ArrowRight className="size-4" />
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-12 md:py-16" aria-label="Security assessment builder">
        <SecurityAssessmentBuilder />

        <div className="mx-auto mt-16 max-w-3xl">
          <Eyebrow>
            <ShieldCheck className="size-3.5" aria-hidden="true" /> The short answer first
          </Eyebrow>
          <div className="border-foreground/10 bg-muted/25 mt-4 rounded-xl border p-5">
            <p className="text-foreground text-lg leading-relaxed">
              A <strong>vulnerability assessment</strong> is a ranked list of what is weak in your
              systems. A <strong>penetration test</strong> is an attempt to break in and prove it.
              You almost always need the first one before the second, because an assessment is free
              and tells you where to spend. <strong>Zero Trust</strong> is the model that says no
              request is trusted because it came from inside your network — every request is checked
              on its own merits.
            </p>
          </div>

          <h2 className="font-display mt-12 text-2xl font-semibold tracking-tight">
            The three Zero Trust principles
          </h2>
          <p className="text-muted-foreground mt-3 text-base leading-relaxed">
            Most of the checklist above is one of these three in disguise. Once you can name which
            principle a finding breaks, you usually know the shape of the fix.
          </p>
          <div className="mt-6">
            <ZeroTrustPrincipleMatcher />
          </div>

          <h2 className="font-display mt-12 text-2xl font-semibold tracking-tight">
            How to use this honestly
          </h2>
          <ul className="text-muted-foreground mt-3 space-y-2 text-base leading-relaxed">
            <li>
              <strong className="text-foreground">Answer by looking, not by assuming.</strong> Each
              item tells you where to look. An answer you did not check is a guess, and a guess in
              this list is worse than a blank.
            </li>
            <li>
              <strong className="text-foreground">Fix the top two before anything else.</strong>{" "}
              Adding a new tool while a critical finding is open just gives you more to protect.
            </li>
            <li>
              <strong className="text-foreground">Write down the date.</strong> A security
              assessment is a snapshot. One with no date is a claim about a past that nobody can
              place.
            </li>
            <li>
              <strong className="text-foreground">
                Get a second pair of eyes on critical findings.
              </strong>{" "}
              The cost of a wrong fix on a critical item is higher than the cost of asking.
            </li>
          </ul>

          <h2 className="font-display mt-12 text-2xl font-semibold tracking-tight">
            Common questions
          </h2>
          <div className="divide-foreground/10 mt-4 divide-y border-y border-foreground/10">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group">
                <summary className="hover:text-primary flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-sm font-semibold">
                  {faq.q}
                  <ArrowRight className="text-muted-foreground mt-0.5 size-4 shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <p className="text-muted-foreground pb-4 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to do this for a living?"
        description="The Cybersecurity programme teaches assessment, detection and response with a practical assessment report as the final piece of work."
        primary={{ label: "See the cybersecurity course", to: "/classes/cybersecurity" }}
        secondary={{ label: "All courses", to: "/classes" }}
      />
    </PageShell>
  );
}
