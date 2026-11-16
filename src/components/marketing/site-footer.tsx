"use client";

import type { ReactNode } from "react";
import { Link } from "@/lib/next-compat/router";
import { ArrowRight, ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

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
    title: "Study with us",
    links: [
      { label: "Admissions", to: "/admissions" },
      { label: "Apply", to: "/apply" },
      { label: "Pay fees", to: "/pay" },
      { label: "Visit the centre", to: "/visit" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Notes", to: "/blog" },
      { label: "Learning trail", to: "/learning-trail" },
      { label: "Editorial standards", to: "/editorial" },
      { label: "Change log", to: "/editorial/changelog" },
      { label: "Opportunities", to: "/opportunities" },
      { label: "About", to: "/about" },
      { label: "Services", to: "/services" },
      { label: "Schools & partners", to: "/schools" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "All products", to: "/shop" },
      { label: "Payment methods", to: "/payment" },
      { label: "Delivery", to: "/shipping" },
      { label: "Refunds policy", to: "/refunds" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
      { label: "Accessibility", to: "/accessibility" },
      { label: "Corrections", to: "/editorial/corrections" },
      { label: "Verify a certificate", to: "/certificates/verify" },
    ],
  },
];

const socials: { label: string; href: string; icon: ReactNode; external?: boolean }[] = [
  {
    label: "WhatsApp",
    href: "https://wa.me/2349058628386?text=Hello%20Cyber%20Elias%20Academy",
    icon: <MessageCircle className="size-4" />,
    external: true,
  },
  { label: "Email", href: "mailto:help@cea.ng", icon: <Mail className="size-4" /> },
  { label: "Call", href: "tel:+2349058628386", icon: <Phone className="size-4" /> },
];

export function SiteFooter() {
  return (
    <footer className="cea-footer border-t border-white/8">
      {/* Cool hairline capping the footer */}
      <div aria-hidden="true" className="hairline-cool absolute inset-x-0 top-0 h-px opacity-80" />

      {/* Finale CTA row */}
      <div className="container-page relative border-b border-white/8 py-12 md:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="cea-footer-heading flex items-center gap-2">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              Admissions open · Two sessions a week
            </p>
            <h2 className="font-display mt-4 text-4xl leading-[0.95] font-semibold tracking-[-0.04em] text-balance text-white sm:text-6xl">
              One room. One keyboard.
              <br />
              <span className="text-gradient-cool">A new trajectory.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <Link
              to="/apply"
              className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-[linear-gradient(180deg,#3f7dff_0%,#1d5ae0_100%)] px-7 text-base font-semibold text-white shadow-[0_16px_48px_-14px_rgb(47_107_255/0.85),0_1px_0_0_rgb(255_255_255/0.35)_inset] transition-all hover:-translate-y-0.5"
            >
              Apply for admission
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/visit"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#a9c4e8] hover:text-white"
            >
              Visit the centre first
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Link grid */}
      <div className="container-page relative grid gap-12 py-12 lg:grid-cols-[1.15fr_2fr] md:py-16">
        <div>
          <Link
            to="/"
            className="group flex w-max items-center gap-3"
            aria-label="Cyber Elias Academy — home"
          >
            <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl border border-white/15 bg-[linear-gradient(145deg,#2455a4,#0f2742)] shadow-[0_10px_28px_-10px_rgb(47_107_255/0.6)]">
              <span className="font-display relative text-[11px] font-extrabold tracking-[0.08em] text-white">
                CEA
              </span>
            </span>
            <span className="leading-tight">
              <span className="font-display block text-base font-bold tracking-tight text-white">
                Cyber Elias Academy
              </span>
              <span className="block font-mono text-[9px] tracking-[0.24em] text-[#7d94b5] uppercase">
                Learn · Practise · Create
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#a9bcd6]">
            A digital-skills training centre in Port Harcourt. Short, practical computer courses
            taught in small groups — two sessions a week, real projects, a teacher in the room.
          </p>
          <address className="mt-6 space-y-2.5 text-sm text-[#a9bcd6] not-italic">
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#5b9dff]" aria-hidden="true" />
              24 Ebony Road, Off Rumuola Road,
              <br />
              Port Harcourt, Rivers State
            </p>
            <a href="tel:+2349058628386" className="flex items-center gap-2.5 hover:text-white">
              <Phone className="size-4 shrink-0 text-[#5b9dff]" aria-hidden="true" /> +234 905 862
              8386
            </a>
            <a href="mailto:help@cea.ng" className="flex items-center gap-2.5 hover:text-white">
              <Mail className="size-4 shrink-0 text-[#5b9dff]" aria-hidden="true" /> help@cea.ng
            </a>
          </address>
          <div className="mt-6 flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={s.label}
                className="grid size-10 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-[#c8d6ef] transition-all hover:-translate-y-0.5 hover:border-[#5b9dff]/50 hover:text-white"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-5"
        >
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="cea-footer-heading">{col.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="cea-footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Giant wordmark */}
      <div aria-hidden="true" className="pointer-events-none relative select-none overflow-hidden">
        <p className="cea-footer-wordmark container-page -mb-4 text-center sm:-mb-8">
          CYBER&nbsp;ELIAS
        </p>
      </div>

      {/* Meta bar */}
      <div className="relative border-t border-white/8 bg-black/25">
        <div className="container-page flex flex-col gap-2 py-5 text-[11px] text-[#7d94b5] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cyber Elias Academy Ltd · RC 8413776</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>Mon–Sat, 8:00–20:00 WAT</span>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <span>24 Ebony Road, Port Harcourt</span>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <Link to="/accessibility" className="hover:text-white">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
