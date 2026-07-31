# CEA-OS Frontend — Public Site + Role Dashboards

A complete, animation-rich frontend for Cyber Elias Academy's Digital Operating System, built on React 19 + Tailwind v4 + shadcn/ui + Motion, running on TanStack Start. All UI lives in portable components so a Next.js port later is mostly copy-paste.

## Note on framework

This environment builds TanStack Start (React 19 + Vite), not Next.js. Everything visual — design tokens, components, animations, layouts — is framework-agnostic React and ports directly. Only the route files and data-loading wrappers differ.

## Design language

Implemented from `CEA_OS_DESIGN_LANGUAGE.md`: the clean professional structure of digitalskillsacademy.org fused with the vibrant gradient energy of dskillacademy.com.ng.

- Deep burgundy `#7c1034` as brand anchor, navy/purple depth, ice-blue and warm-pink accents
- Montserrat display + clean sans body
- Engine-based color wayfinding as semantic tokens: Learning (blue/teal), Career (amber/gold), Services (violet), ERP (emerald), Community (rose)
- Every color, gradient, glow and shadow defined as oklch tokens in `src/styles.css` — no hardcoded colors in components

## Motion system

Motion (Framer Motion) throughout: scroll-reveal sections, staggered card entrances, magnetic/glow buttons, animated gradient meshes and aurora backgrounds, marquee logo rails, counter roll-ups, 3D tilt cards, page transitions via AnimatePresence, animated route progress, skeleton shimmer, hover spotlight cursors on hero panels, and reduced-motion fallbacks.

## Public site

Home, Programs (index + program detail), Departments/Engines, Admissions (with multi-step application form), Services (agency offering), Portfolio/Case Studies, Marketplace (jobs + gigs), Events, Community, Blog (index + post), Alumni, Partners, About, Contact, Pricing, plus Auth screens (sign in, sign up, forgot password, role picker).

## Role dashboards

Shared app shell — collapsible sidebar, command palette, notification tray, role switcher, breadcrumbs, dark mode — with these portals:

- Student: overview, courses, lesson player, assignments, grades, attendance, certificates, portfolio, payments
- Instructor: cohorts, gradebook, course builder, attendance, submissions
- Department Head: program health, instructor performance, approvals
- Admin / Operations: users, roles, system config, audit log
- Admissions Officer: application pipeline (kanban), interviews, offers
- Accountant / Finance: invoices, payments, expenses, reports
- HR: employees, leave, payroll, recruitment
- Client: projects, deliverables, tickets, invoices
- Employer: job posts, candidate pipeline
- Alumni & Mentor: network, mentorship sessions
- Marketing: campaigns, leads, CRM pipeline
- Director: executive KPI cockpit

Each portal ships charts (Recharts), data tables with filtering/sorting, kanban boards, timelines, and empty/loading/error states.

## Data

Typed mock fixtures behind a thin data-access layer (`src/data/*`) exposing async functions consumed through TanStack Query — so the Cloudflare Workers API can be swapped in per-resource without touching components.

## Technical notes

- Routes under `src/routes/`, dashboards grouped under a `_app` shell layout with a role-aware sidebar; each public route gets its own `head()` metadata for SEO
- shadcn/ui primitives extended with custom variants (gradient, glow, glass) rather than inline color classes
- `src/components/` split into `ui/`, `marketing/`, `dashboard/`, `charts/`, `motion/` — all portable
- Mock auth/role state in a lightweight store so dashboards are browsable without a backend

## Delivery order

1. Design system + tokens + motion primitives + shared shells
2. Full public marketing site
3. Auth screens
4. Student & instructor portals
5. Remaining role portals
6. Polish pass: transitions, empty states, responsive, accessibility
