import { createFileRoute, Link } from "@tanstack/react-router";
import { getPageHead } from "@/lib/seo";
import { PageShell, PageHero } from "@/components/marketing/shell";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/privacy")({
  head: () =>
    getPageHead({
      title: "Privacy Policy",
      description:
        "How Cyber Elias Academy collects and uses information: applications, cookies, and Google ads.",
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
        description={`Last updated: ${lastUpdated}. This page describes the information this website and the academy actually collect.`}
      />
      <section className="container-page py-16 md:py-24">
        <div className="max-w-3xl space-y-14">
          <Reveal>
            <h2 className="font-display text-2xl font-bold">1. Who we are</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Cyber Elias Academy Ltd (“CEA”, “we”) is a digital-skills training centre at 26 Ebony
              Road, Off Rumuola Road, Port Harcourt, Rivers State, Nigeria (RC 8413776). Contact:{" "}
              <a href="mailto:hello@cea.ng" className="text-primary underline">
                hello@cea.ng
              </a>{" "}
              or +234 905 862 8386.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-display text-2xl font-bold">2. Information we collect</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We collect what you type into our forms, and a small amount of technical data so the
              site can run.
            </p>
            <h3 className="mt-6 font-semibold">You give us</h3>
            <ul className="text-muted-foreground mt-3 list-inside list-disc space-y-2">
              <li>Name, email, phone, and the message or application you send</li>
              <li>The course you asked about, and any notes you include</li>
              <li>
                If you create a learner login: email and a hashed password. We do not store card
                numbers
              </li>
            </ul>
            <h3 className="mt-6 font-semibold">The site collects</h3>
            <ul className="text-muted-foreground mt-3 list-inside list-disc space-y-2">
              <li>Essential cookies: session, security, your light/dark preference</li>
              <li>Server logs: IP address, browser, pages requested, timestamps</li>
              <li>Optional analytics cookies, only if you press Accept on the cookie banner</li>
              <li>Advertising cookies from Google, described in §6</li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-bold">3. How we use it</h2>
            <ul className="text-muted-foreground mt-4 list-inside list-disc space-y-2">
              <li>
                Reply to you, confirm course dates and fees, and run the class you enrolled in
              </li>
              <li>Issue and later check a certificate for work produced here</li>
              <li>Keep the site working and secure</li>
              <li>Show advertisements (Google AdSense), as described below</li>
            </ul>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We do not sell your information. We do not run a public talent pool or share your
              details with employers unless you ask us to introduce you to a specific person.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="font-display text-2xl font-bold">4. Who else sees it</h2>
            <ul className="text-muted-foreground mt-4 list-inside list-disc space-y-2">
              <li>Hosting for this website (currently Vercel / Cloudflare)</li>
              <li>Google, if ads or (with your consent) Analytics run on a page</li>
              <li>A parent or sponsor, if you named them on an application</li>
              <li>Authorities, if the law requires it</li>
            </ul>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Some of those companies store data outside Nigeria. If you want more detail, email
              hello@cea.ng.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <h2 className="font-display text-2xl font-bold">5. Cookies</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Essential cookies make the site work. The banner lets you accept or decline optional
              analytics cookies. You can also block cookies in your browser. Blocking essential
              cookies may break sign-in and forms.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <h2 className="font-display text-2xl font-bold">6. Advertising (Google AdSense)</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              This site uses Google AdSense. Google uses cookies, including the DoubleClick cookie,
              to serve ads based on your visit here and on other sites. We do not load the AdSense
              script on Privacy, Terms, Accessibility, Apply, or signed-in pages.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Opt out of personalised ads at{" "}
              <a
                href="https://www.google.com/settings/ads"
                className="text-primary underline"
                rel="noopener noreferrer"
              >
                Google Ads Settings
              </a>{" "}
              or the{" "}
              <a
                href="https://optout.aboutads.info/"
                className="text-primary underline"
                rel="noopener noreferrer"
              >
                Digital Advertising Alliance
              </a>
              . How Google uses data on partner sites:{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                className="text-primary underline"
                rel="noopener noreferrer"
              >
                policies.google.com/technologies/partner-sites
              </a>
              .
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We do not click our own ads or ask visitors to click ads. Ads, when they appear, are
              labelled as advertising.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <h2 className="font-display text-2xl font-bold">7. Your rights</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Under the Nigeria Data Protection Act 2023 you can ask to see, correct, or delete
              personal data we hold, or complain to the Nigeria Data Protection Commission. Email{" "}
              <a href="mailto:hello@cea.ng" className="text-primary underline">
                hello@cea.ng
              </a>
              . We aim to reply within 30 days.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <h2 className="font-display text-2xl font-bold">8. How long we keep it</h2>
            <ul className="text-muted-foreground mt-4 list-inside list-disc space-y-2">
              <li>Contact messages: until we have dealt with them, then up to two years</li>
              <li>
                Applications and class records: while you are a student, then up to seven years so
                we can verify a certificate
              </li>
              <li>
                Learner accounts: while the account is used, then deleted or anonymised after two
                years of silence
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.4}>
            <h2 className="font-display text-2xl font-bold">9. Children</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Some classes include younger learners brought by a parent or guardian. Website forms
              are meant for an adult applying, or a parent applying for a child. We do not knowingly
              collect a child’s data through this site without that adult. If you think we have,
              email hello@cea.ng and we will delete it.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <h2 className="font-display text-2xl font-bold">10. Changes</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              If this policy changes in a material way we will update the date on this page.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <h2 className="font-display text-2xl font-bold">11. Contact</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Cyber Elias Academy Ltd
              <br />
              26 Ebony Road, Off Rumuola Road
              <br />
              Port Harcourt, Rivers State, Nigeria
              <br />
              +234 905 862 8386
              <br />
              <a href="mailto:hello@cea.ng" className="text-primary underline">
                hello@cea.ng
              </a>
              <br />
              See also our{" "}
              <Link to="/terms" className="text-primary underline">
                terms
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
