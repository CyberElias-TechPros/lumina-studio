import { createFileRoute, Link } from "@tanstack/react-router";
import { getPageHead } from "@/lib/seo";
import { PageShell, PageHero, SectionHeading } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/privacy")({
  head: () =>
    getPageHead({
      title: "Privacy Policy",
      description:
        "How Cyber Elias Academy collects, uses, and protects your personal information. Read our privacy policy to understand your rights and our commitments.",
      path: "/privacy",
      type: "article",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const lastUpdated = "20 September 2026";

  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: ${lastUpdated}. Your privacy matters. This policy explains what data we collect, why we collect it, and how you can control it.`}
      />
      <section className="container-page py-20 md:py-28">
        <div className="max-w-3xl space-y-16">
          <Reveal>
            <h2 className="font-display text-2xl font-bold">1. Who we are</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Cyber Elias Academy Ltd ("CEA", "we", "us", "our") is a digital skills training
              centre at 26 Ebony Road, Off Rumuola Road, Port Harcourt, Rivers State, Nigeria
              (RC 8413776). You can contact us at hello@cea.ng or +234 905 862 8386.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-display text-2xl font-bold">2. Information we collect</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We collect information you provide directly to us, automatically through our services,
              and from third-party sources.
            </p>
            <h3 className="font-semibold mt-6">Information you provide</h3>
            <ul className="mt-3 space-y-2 list-disc list-inside text-muted-foreground">
              <li>Account details: name, email, phone number, password (hashed), profile photo</li>
              <li>
                Application data: education history, work experience, motivation statements,
                portfolio links
              </li>
              <li>Communication: emails, chat messages, support tickets, feedback forms</li>
              <li>
                Payments: billing address, transaction IDs (processed by our payment partners; we do
                not store full card details)
              </li>
            </ul>
            <h3 className="font-semibold mt-6">Information collected automatically</h3>
            <ul className="mt-3 space-y-2 list-disc list-inside text-muted-foreground">
              <li>
                Usage data: pages visited, time spent, features used, click paths, device type,
                browser, OS
              </li>
              <li>Log data: IP address, access times, HTTP referrer, error logs</li>
              <li>
                Cookies and similar technologies: session tokens, preference cookies, analytics
                cookies (see §7)
              </li>
            </ul>
            <h3 className="font-semibold mt-6">Third-party sources</h3>
            <ul className="mt-3 space-y-2 list-disc list-inside text-muted-foreground">
              <li>
                Authentication providers (Google, GitHub, LinkedIn) when you sign in via OAuth
              </li>
              <li>
                Payment processors (Flutterwave, Paystack, Stripe) for transaction verification
              </li>
              <li>
                Analytics providers (Google Analytics, Plausible) for aggregate usage insights
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-bold">3. How we use your information</h2>
            <ul className="mt-4 space-y-3 list-disc list-inside text-muted-foreground">
              <li>
                <strong>Deliver and improve services:</strong> run courses, keep applications,
                issue certificates for completed work
              </li>
              <li>
                <strong>Communicate:</strong> reply to enquiries, send course dates and fee
                information you asked for (opt out of newsletters anytime)
              </li>
              <li>
                <strong>Safety and security:</strong> detect fraud, prevent abuse, enforce terms,
                comply with legal obligations
              </li>
              <li>
                <strong>Analytics and research:</strong> understand usage patterns, improve
                curriculum, measure outcomes (aggregated, pseudonymised)
              </li>
              <li>
                <strong>Marketing:</strong> with your consent, send course dates and notes you asked
                for
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="font-display text-2xl font-bold">
              4. Legal bases (Nigeria Data Protection Act 2023 & GDPR where applicable)
            </h2>
            <ul className="mt-4 space-y-3 list-disc list-inside text-muted-foreground">
              <li>
                <strong>Contract:</strong> processing necessary to deliver programmes you enrolled
                in
              </li>
              <li>
                <strong>Legitimate interest:</strong> improving platform security, analytics, fraud
                prevention
              </li>
              <li>
                <strong>Consent:</strong> marketing emails, non-essential cookies, optional profile
                fields
              </li>
              <li>
                <strong>Legal obligation:</strong> tax records, anti-money-laundering checks,
                regulatory reporting
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <h2 className="font-display text-2xl font-bold">5. Data sharing</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We do not sell your personal data. We share data only with:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-muted-foreground">
              <li>
                <strong>Service providers:</strong> cloud hosting (Vercel, Cloudflare), email,
                analytics, payment processors, and Google AdSense for advertisements — under their
                terms and, where required, data processing agreements
              </li>
              <li>
                <strong>People you ask us to contact:</strong> for example if you name a parent or
                sponsor on an application
              </li>
              <li>
                <strong>Legal authorities:</strong> when required by law, court order, or to protect
                rights and safety
              </li>
              <li>
                <strong>Corporate transactions:</strong> in a merger, acquisition, or asset sale
                (you will be notified)
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.25}>
            <h2 className="font-display text-2xl font-bold">6. International transfers</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Our infrastructure is hosted on Vercel (US) and Cloudflare (global). We rely on
              standard contractual clauses and adequacy decisions to safeguard transfers outside
              Nigeria. You may request a copy of the safeguards by emailing hello@cea.ng.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <h2 className="font-display text-2xl font-bold">7. Cookies and tracking</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We use essential cookies so the site works (session, security, your theme
              preference). Optional analytics cookies (Google Analytics, if you accept) help us
              understand which pages are useful. You can decline optional cookies on the banner, or
              block them in your browser. Blocking essential cookies may break sign-in and forms.
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <h2 className="font-display text-2xl font-bold">8. Advertising (Google AdSense)</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              This site uses Google AdSense to show advertisements. Google, as a third-party
              vendor, uses cookies — including the DoubleClick cookie — to serve ads based on your
              visits to this site and other sites on the internet. Google's use of advertising
              cookies enables it and its partners to serve ads based on your visit to cea.ng and/or
              other sites.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              You may opt out of personalised advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                className="text-primary underline"
                rel="noopener noreferrer"
              >
                Google Ads Settings
              </a>
              , or the{" "}
              <a
                href="https://optout.aboutads.info/"
                className="text-primary underline"
                rel="noopener noreferrer"
              >
                Digital Advertising Alliance opt-out
              </a>
              . You can also learn how Google uses data when you use our site in{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                className="text-primary underline"
                rel="noopener noreferrer"
              >
                Google's partner-sites policy
              </a>
              .
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We do not click our own ads, ask visitors to click ads, or place ads in a way that
              looks like course content. Ads, when they appear, are labelled as advertising.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <h2 className="font-display text-2xl font-bold">9. Your rights</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Under the Nigeria Data Protection Act 2023 (and GDPR where applicable), you have the
              right to:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-muted-foreground">
              <li>Access a copy of your personal data</li>
              <li>Rectify inaccurate or incomplete data</li>
              <li>Erasure ("right to be forgotten") — subject to legal retention requirements</li>
              <li>Restrict or object to processing</li>
              <li>Data portability — receive your data in a structured, machine-readable format</li>
              <li>Withdraw consent at any time (for consent-based processing)</li>
              <li>Lodge a complaint with the Nigeria Data Protection Commission (NDPC)</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise any right, email{" "}
              <a href="mailto:privacy@cea.ng" className="text-primary underline">
                privacy@cea.ng
              </a>
              . We respond within 30 days.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <h2 className="font-display text-2xl font-bold">10. Retention</h2>
            <ul className="mt-4 space-y-2 list-disc list-inside text-muted-foreground">
              <li>
                Account data: retained while your account is active, then anonymised after 2 years
                of inactivity
              </li>
              <li>
                Application and academic records: retained for 7 years for verification and
                transcript purposes
              </li>
              <li>Payment records: retained for 7 years for tax and audit compliance</li>
              <li>Analytics logs: aggregated after 14 months; raw logs deleted after 30 days</li>
              <li>Marketing preferences: retained until you unsubscribe</li>
            </ul>
          </Reveal>

          <Reveal delay={0.45}>
            <h2 className="font-display text-2xl font-bold">11. Children's privacy</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Our services are not directed to children under 16. We do not knowingly collect data
              from children under 16. If you believe we have, contact us and we will delete it
              promptly.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <h2 className="font-display text-2xl font-bold">12. Changes to this policy</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We may update this policy. Material changes will be announced via email and a
              prominent notice on the site at least 14 days before they take effect. Continued use
              after the effective date constitutes acceptance.
            </p>
          </Reveal>

          <Reveal delay={0.55}>
            <h2 className="font-display text-2xl font-bold">13. Contact</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Data Protection Officer:{" "}
              <a href="mailto:privacy@cea.ng" className="text-primary underline">
                privacy@cea.ng
              </a>
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
