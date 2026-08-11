import { createFileRoute, Link } from "@tanstack/react-router";
import { getPageHead } from "@/lib/seo";
import { PageShell, PageHero } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/terms")({
  head: () =>
    getPageHead({
      title: "Terms of Service",
      description:
        "Terms and conditions governing your use of Cyber Elias Academy's platform, programmes, and services. Please read carefully before enrolling.",
      path: "/terms",
      type: "article",
    }),
  component: TermsPage,
});

function TermsPage() {
  const lastUpdated = "August 10, 2025";
  const effectiveDate = "August 10, 2025";

  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description={`Last updated: ${lastUpdated} · Effective: ${effectiveDate}. By using Cyber Elias Academy's platform and services, you agree to these terms. Please read them carefully.`}
      />
      <section className="container-page py-20 md:py-28">
        <div className="max-w-3xl space-y-16">
          <Reveal>
            <h2 className="font-display text-2xl font-bold">1. Agreement to Terms</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              These Terms of Service ("Terms") constitute a legally binding agreement between you
              ("Student", "User", "you") and Cyber Elias Academy ("CEA", "Academy", "we", "us",
              "our") governing your access to and use of the CEA platform, website (cea.ng), mobile
              applications, programmes, courses, content, community features, and related services
              (collectively, the "Services"). By creating an account, enrolling in a programme, or
              otherwise using the Services, you acknowledge that you have read, understood, and
              agree to be bound by these Terms and our
              <Link to="/privacy" className="text-primary underline">
                Privacy Policy
              </Link>
              .
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              If you do not agree to these Terms, you must not use the Services.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-display text-2xl font-bold">2. Eligibility</h2>
            <ul className="mt-4 space-y-3 list-disc list-inside text-muted-foreground">
              <li>
                You must be at least 16 years old. If you are under 18, you must have
                parental/guardian consent.
              </li>
              <li>
                You must have legal capacity to enter into a binding contract under Nigerian law.
              </li>
              <li>
                You must provide accurate, current, and complete registration information and keep
                it updated.
              </li>
              <li>
                You may not use the Services if you have been previously suspended or banned, or if
                prohibited by applicable law.
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-bold">3. Account and Security</h2>
            <ul className="mt-4 space-y-3 list-disc list-inside text-muted-foreground">
              <li>
                You are responsible for maintaining the confidentiality of your login credentials
                and for all activity under your account.
              </li>
              <li>
                You must notify us immediately at security@cea.ng of any unauthorised use or
                suspected breach.
              </li>
              <li>
                We may suspend or terminate your account if we suspect fraudulent, abusive, or
                illegal activity.
              </li>
              <li>
                We use industry-standard security measures but cannot guarantee absolute security.
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="font-display text-2xl font-bold">4. Programmes and Enrollment</h2>
            <h3 className="font-semibold mt-6">4.1 Enrollment</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Enrollment in a programme requires a completed application, acceptance by CEA, and
              payment of applicable fees (or approval for scholarship/ISA). Admission is at CEA's
              sole discretion.
            </p>
            <h3 className="font-semibold mt-6">4.2 Programme Changes</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              CEA reserves the right to modify curriculum, schedules, instructors, tools, or
              delivery mode (online/hybrid/physical) with reasonable notice. Material changes will
              be communicated at least 14 days before the affected cohort starts. If a change
              materially reduces value, you may request a transfer to a future cohort or a pro-rata
              refund.
            </p>
            <h3 className="font-semibold mt-6">4.3 Attendance and Progress</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Students are expected to attend live sessions, complete assignments on time, and
              maintain satisfactory academic progress. Persistent absence or non-submission without
              approved leave may result in probation or withdrawal from the programme without
              refund.
            </p>
            <h3 className="font-semibold mt-6">4.4 Certificates</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Verifiable certificates are issued upon successful completion of all programme
              requirements (assignments, capstone, assessments, attendance threshold). Certificates
              remain CEA's property and may be revoked if issued in error or obtained fraudulently.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <h2 className="font-display text-2xl font-bold">5. Fees, Payments, and Refunds</h2>
            <h3 className="font-semibold mt-6">5.1 Fees</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Programme fees are published on the website and in admission letters. Fees are quoted
              in NGN and include applicable taxes. CEA may adjust fees for future cohorts with 30
              days' notice.
            </p>
            <h3 className="font-semibold mt-6">5.2 Payment Plans</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Installment plans and Income Share Agreements (ISAs) are available for eligible
              programmes. Terms are set out in a separate agreement. Default on payments may result
              in suspension of access until arrears are cleared.
            </p>
            <h3 className="font-semibold mt-6">5.3 Refunds</h3>
            <ul className="mt-3 space-y-2 list-disc list-inside text-muted-foreground">
              <li>
                <strong>Before cohort start:</strong> full refund minus ₦15,000 administrative fee
                if withdrawn &gt;=14 days before start; 50% refund if withdrawn &lt;14 days before
                start.
              </li>
              <li>
                <strong>After cohort start:</strong> no refunds after the first live session, except
                at CEA's discretion for documented medical/family emergencies.
              </li>
              <li>
                <strong>Scholarship/ISA recipients:</strong> refund terms per the award agreement.
              </li>
              <li>Refunds are processed within 30 business days to the original payment method.</li>
            </ul>
          </Reveal>

          <Reveal delay={0.25}>
            <h2 className="font-display text-2xl font-bold">6. Intellectual Property</h2>
            <ul className="mt-4 space-y-3 list-disc list-inside text-muted-foreground">
              <li>
                <strong>CEA Content:</strong> All curriculum, videos, slides, code, designs,
                assessments, and platform technology are owned by CEA or its licensors. You receive
                a limited, non-exclusive, non-transferable licence to access content for personal,
                non-commercial educational use while enrolled.
              </li>
              <li>
                <strong>Student Work:</strong> You retain copyright to your original assignments,
                projects, and capstone work. By submitting work, you grant CEA a royalty-free,
                worldwide, perpetual licence to use, display, and distribute it for educational,
                promotional, and portfolio purposes (with attribution).
              </li>
              <li>
                <strong>Third-Party Content:</strong> Some materials are used under licence. You may
                not redistribute them outside the platform.
              </li>
              <li>
                <strong>Brand:</strong> You may not use CEA's name, logo, or trademarks without
                written permission.
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.3}>
            <h2 className="font-display text-2xl font-bold">7. Acceptable Use</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">You agree not to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-muted-foreground">
              <li>Share login credentials or allow unauthorised access</li>
              <li>Copy, record, redistribute, or reverse-engineer course content</li>
              <li>
                Harass, bully, discriminate, or threaten instructors, mentors, staff, or fellow
                students
              </li>
              <li>Upload malicious code, spam, or illegal content</li>
              <li>Use the Services for commercial solicitation without approval</li>
              <li>Interfere with platform integrity, security, or performance</li>
              <li>Violate any applicable law or regulation</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Violations may result in immediate suspension or termination without refund.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <h2 className="font-display text-2xl font-bold">8. Community and Career Services</h2>
            <ul className="mt-4 space-y-3 list-disc list-inside text-muted-foreground">
              <li>
                Community features (forums, chat, events) are moderated. CEA may remove content and
                ban users at its discretion.
              </li>
              <li>
                Career Engine (job board, employer introductions, gig matching) is a facilitation
                service. CEA does not guarantee employment, internships, or income.
              </li>
              <li>Employer introductions require your explicit opt-in per opportunity.</li>
            </ul>
          </Reveal>

          <Reveal delay={0.4}>
            <h2 className="font-display text-2xl font-bold">
              9. Disclaimers and Limitation of Liability
            </h2>
            <ul className="mt-4 space-y-3 list-disc list-inside text-muted-foreground">
              <li>
                The Services are provided "as is" and "as available" without warranties of any kind
                (express or implied), including merchantability, fitness for a particular purpose,
                non-infringement, or uninterrupted access.
              </li>
              <li>
                CEA does not guarantee specific learning outcomes, job placement, salary increases,
                or visa eligibility.
              </li>
              <li>
                To the maximum extent permitted by law, CEA's total liability for any claim arising
                from these Terms or the Services shall not exceed the total fees you paid to CEA in
                the 12 months preceding the claim.
              </li>
              <li>
                CEA is not liable for indirect, incidental, special, consequential, or punitive
                damages (including lost profits, data, or opportunities).
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.45}>
            <h2 className="font-display text-2xl font-bold">10. Indemnification</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              You agree to indemnify and hold harmless CEA, its officers, employees, mentors, and
              partners from any claims, damages, losses, and expenses (including reasonable legal
              fees) arising from your breach of these Terms, your use of the Services, your user
              content, or your violation of any law or third-party rights.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <h2 className="font-display text-2xl font-bold">11. Termination</h2>
            <ul className="mt-4 space-y-3 list-disc list-inside text-muted-foreground">
              <li>
                You may terminate your account at any time by emailing hello@cea.ng. Fees paid are
                non-refundable except per §5.3.
              </li>
              <li>
                CEA may suspend or terminate your access immediately for breach of these Terms,
                non-payment, or legal compliance.
              </li>
              <li>
                Upon termination, your licence to access content ends. We may retain your data per
                our Privacy Policy.
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.55}>
            <h2 className="font-display text-2xl font-bold">
              12. Governing Law and Dispute Resolution
            </h2>
            <ul className="mt-4 space-y-3 list-disc list-inside text-muted-foreground">
              <li>These Terms are governed by the laws of the Federal Republic of Nigeria.</li>
              <li>
                Disputes shall first be resolved through good-faith negotiation between the parties.
              </li>
              <li>
                If unresolved within 30 days, either party may refer the dispute to binding
                arbitration at the Lagos Court of Arbitration (LCA) under its rules, in English, in
                Lagos, Nigeria.
              </li>
              <li>
                Notwithstanding the above, CEA may seek injunctive relief in any competent court to
                protect intellectual property or confidential information.
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.6}>
            <h2 className="font-display text-2xl font-bold">13. Changes to Terms</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              CEA may modify these Terms at any time. Material changes will be posted on this page
              with the updated "Last updated" date and communicated via email at least 14 days
              before taking effect. Your continued use after the effective date constitutes
              acceptance. If you disagree, you must stop using the Services and may terminate your
              account per §11.
            </p>
          </Reveal>

          <Reveal delay={0.65}>
            <h2 className="font-display text-2xl font-bold">14. General Provisions</h2>
            <ul className="mt-4 space-y-3 list-disc list-inside text-muted-foreground">
              <li>
                <strong>Entire Agreement:</strong> These Terms, the Privacy Policy, and any
                programme-specific agreements constitute the entire agreement.
              </li>
              <li>
                <strong>Severability:</strong> If any provision is held unenforceable, the remainder
                remains in effect.
              </li>
              <li>
                <strong>Waiver:</strong> Failure to enforce a right does not waive it.
              </li>
              <li>
                <strong>Assignment:</strong> You may not assign these Terms. CEA may assign them in
                connection with a merger, acquisition, or sale of assets.
              </li>
              <li>
                <strong>Force Majeure:</strong> CEA is not liable for delays or failures due to
                events beyond its reasonable control.
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.7}>
            <h2 className="font-display text-2xl font-bold">15. Contact</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Questions about these Terms? Email{" "}
              <a href="mailto:legal@cea.ng" className="text-primary underline">
                legal@cea.ng
              </a>{" "}
              or write to:
              <br />
              Cyber Elias Academy
              <br />
              26 Ebony Road, Off Rumuola Road
              <br />
              Port Harcourt, Rivers State, Nigeria
              <br />
              +234 905 862 8386
            </p>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
