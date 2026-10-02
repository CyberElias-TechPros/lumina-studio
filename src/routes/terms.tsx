import { createFileRoute, Link } from "@tanstack/react-router";
import { getPageHead } from "@/lib/seo";
import { PageShell, PageHero } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/terms")({
  head: () =>
    getPageHead({
      title: "Terms of Service",
      description:
        "Terms for using cea.ng and enrolling in a short course at Cyber Elias Academy, Port Harcourt.",
      path: "/terms",
      type: "article",
    }),
  component: TermsPage,
});

function TermsPage() {
  const lastUpdated = "20 September 2026";

  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description={`Last updated: ${lastUpdated}. These terms cover this website and enrolment in a course at the centre.`}
      />
      <section className="container-page py-16 md:py-24">
        <div className="max-w-3xl space-y-14">
          <Reveal>
            <h2 className="font-display text-2xl font-bold">1. Agreement</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              By using cea.ng or enrolling in a course you agree to these terms and our{" "}
              <Link to="/privacy" className="text-primary underline">
                privacy policy
              </Link>
              . If you do not agree, do not use the site or apply.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-display text-2xl font-bold">2. Who may use the site</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              You must be 16 or older to create an account. Under 18, a parent or guardian must
              consent to enrolment. Give true contact details so we can reach you.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-bold">3. Courses</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Enrolment needs an application, our reply with dates and the fee, and payment of that
              fee. Admission is at the academy’s discretion. Fees are listed in naira on each course
              page. Monthly instalments can be arranged for the length of the course, as agreed when
              you apply. Default on payment may pause access until arrears are cleared.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We may change a timetable, instructor, or tool with notice. Certificates are issued
              for the named piece of work on the course page, not for sitting in the room. They are
              not a university degree or a government licence.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="font-display text-2xl font-bold">4. Refunds</h2>
            <ul className="text-muted-foreground mt-4 list-inside list-disc space-y-2">
              <li>
                Before the first session, and at least 14 days before the start date: full refund
                minus a ₦15,000 administration fee.
              </li>
              <li>Less than 14 days before the start date: 50% of fees paid.</li>
              <li>
                After the first session: no refund, except at our discretion for a documented
                emergency.
              </li>
              <li>Instalments: the same timetable, applied to amounts already paid.</li>
              <li>Refunds go back to the original payment method within 30 business days.</li>
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <h2 className="font-display text-2xl font-bold">5. Your account</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Keep your login to yourself. Tell us at help@cea.ng if you think someone else used it.
              We may suspend an account used for abuse or fraud.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <h2 className="font-display text-2xl font-bold">6. Notes and class materials</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              The Notes series and class pages are for learning. Do not copy them as if they were
              your own course. You keep copyright in work you produce; you allow us to keep a copy
              for teaching and to verify a certificate.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <h2 className="font-display text-2xl font-bold">7. Acceptable use</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Do not share logins, harass anyone here, upload malware, or break the law using this
              site. We may suspend access without refund for serious breaches.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <h2 className="font-display text-2xl font-bold">8. No job promise</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We do not guarantee a job, internship, visa, or income after a course. The certificate
              records work produced at this academy.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <h2 className="font-display text-2xl font-bold">9. Liability</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              The site is provided as it is. To the extent Nigerian law allows, our total liability
              for a claim about these terms or the site is limited to the fees you paid us in the 12
              months before the claim.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <h2 className="font-display text-2xl font-bold">10. Ending the agreement</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              You may close an account by emailing help@cea.ng. Fees already paid follow §4. We may
              suspend access for breach or non-payment.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <h2 className="font-display text-2xl font-bold">11. Law</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              These terms are governed by the laws of the Federal Republic of Nigeria. Disputes
              should first be discussed in good faith. Nigerian courts in Port Harcourt have
              jurisdiction.
            </p>
          </Reveal>

          <Reveal delay={0.55}>
            <h2 className="font-display text-2xl font-bold">12. Contact</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Cyber Elias Academy Ltd
              <br />
              24/26 Ebony Road, Off Rumuola Road
              <br />
              Port Harcourt, Rivers State, Nigeria
              <br />
              +234 905 862 8386 ·{" "}
              <a href="mailto:help@cea.ng" className="text-primary underline">
                help@cea.ng
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
