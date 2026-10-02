import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { BrandMark } from "./site-header";

const columns = [
  {
    title: "Courses",
    links: [
      { label: "All courses", to: "/classes" },
      { label: "Microsoft Office", to: "/classes/microsoft-office" },
      { label: "Computer Basics", to: "/classes/computer-basics-typing" },
      { label: "Graphic Design", to: "/classes/graphic-design" },
      { label: "Web Development", to: "/classes/web-development" },
    ],
  },
  {
    title: "Academy",
    links: [
      { label: "Notes", to: "/blog" },
      { label: "About", to: "/about" },
      { label: "Admissions", to: "/admissions" },
      { label: "Apply", to: "/apply" },
      { label: "Pay fees", to: "/pay" },
      { label: "FAQ", to: "/faq" },
      { label: "Visit", to: "/visit" },
      { label: "Team", to: "/team" },
      { label: "Schools & partners", to: "/schools" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "All products", to: "/shop" },
      { label: "Refunds policy", to: "/refunds" },
      { label: "Delivery", to: "/shipping" },
      { label: "Payment", to: "/payment" },
      { label: "Merchant Center", to: "/merchant" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
      { label: "Accessibility", to: "/accessibility" },
      { label: "Verify a certificate", to: "/certificates/verify" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-border bg-muted/30 border-t">
      <div className="container-page py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <BrandMark />
            <p className="text-muted-foreground mt-4 max-w-sm text-sm leading-relaxed">
              A digital skills training centre in Port Harcourt. Short, practical computer courses
              taught in small groups, two sessions a week.
            </p>
            <address className="text-muted-foreground mt-6 space-y-2 text-sm not-italic">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                24/26 Ebony Road, Off Rumuola Road, Port Harcourt, Rivers State
              </p>
              <p>
                <a
                  href="tel:+2349058628386"
                  className="hover:text-foreground flex items-center gap-2.5"
                >
                  <Phone className="size-4 shrink-0" /> +234 905 862 8386
                </a>
              </p>
              <p>
                <a
                  href="mailto:help@cea.ng"
                  className="hover:text-foreground flex items-center gap-2.5"
                >
                  <Mail className="size-4 shrink-0" /> help@cea.ng
                </a>
              </p>
            </address>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="text-foreground text-sm font-semibold">{col.title}</h2>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-muted-foreground hover:text-foreground text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="text-muted-foreground border-border mt-10 flex flex-col gap-2 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cyber Elias Academy Ltd. RC 8413776.</p>
          <p>Mon–Sat, 8:00–20:00 WAT</p>
        </div>
      </div>
    </footer>
  );
}
