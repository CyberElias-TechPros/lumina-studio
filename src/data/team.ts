/**
 * People who actually work at Cyber Elias Academy, from their CVs.
 * Only public, professional details are published here — no personal phone
 * numbers, private emails or referees.
 */
export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  photo: string;
  /** CSS object-position for the square crop. */
  photoPosition?: string;
  summary: string;
  teaches: string[];
  experience: { title: string; org: string; period: string }[];
  education: string[];
  skills: string[];
  links?: { label: string; href: string }[];
}

export const TEAM: TeamMember[] = [
  {
    slug: "ellis-dennis-graham",
    name: "Ellis Dennis Graham",
    role: "Founder & Lead Educator",
    photo: "/images/team/ellis-dennis-graham.jpg",
    summary:
      "Hands-on IT and network technician who founded Cyber Elias Academy in Port Harcourt. Ellis runs the centre, designs the curricula and teaches the practical computer, networking and IT-support courses. He also consults on ICT infrastructure — in July 2026 he led the AfriLabs Innovation Centres ICT assessment of three tertiary institutions in Rivers and Bayelsa States.",
    teaches: [
      "Computer basics",
      "Computer networking",
      "Computer repairs & IT support",
      "Cybersecurity foundations",
      "Web development",
    ],
    experience: [
      {
        title: "Founder & Lead Educator",
        org: "Cyber Elias Academy Ltd",
        period: "2025 – present",
      },
      {
        title: "Lead ICT Assessor (Consultant)",
        org: "AfriLabs Innovation Centres Programme",
        period: "Jul 2026",
      },
      {
        title: "IT Support Specialist / Network Technician",
        org: "TechFarms & Estates Limited",
        period: "2024 – present",
      },
      {
        title: "Network Administrator & Cybersecurity Intern",
        org: "Rivers State ICT Department (TechCreek)",
        period: "2021 – 2022",
      },
      {
        title: "Computer Instructor & Operations",
        org: "VisaChoice Communications",
        period: "2012 – 2017",
      },
    ],
    education: ["B.Sc. Computer Science — Rivers State University"],
    skills: [
      "LAN/WLAN, routing, VLANs",
      "MikroTik & Sophos firewalls",
      "ISO 27001 · CIS · NDPA 2023 reviews",
      "Windows, Linux & Microsoft 365",
      "React & WordPress",
      "Curriculum design",
    ],
  },
  {
    slug: "peter-hart",
    name: "Peter Jonathan-Hart",
    role: "Trainer — Frontend & Web Development",
    photo: "/images/team/peter-hart.jpg",
    photoPosition: "center top",
    summary:
      "Frontend developer and software engineer with 3+ years building production web apps in React, Next.js, Vue, Nuxt and TypeScript. Peter has shipped dashboards, EdTech, real-estate, non-profit and corporate platforms, and teaches the modern web-development track: components, state, APIs, performance and accessibility.",
    teaches: [
      "Web development",
      "Frontend (React, Next.js, Vue/Nuxt)",
      "TypeScript & Tailwind CSS",
      "REST APIs & Git",
    ],
    experience: [
      { title: "Mid-Level Frontend Developer", org: "PIS", period: "2026 – present" },
      { title: "Junior Frontend Developer", org: "Chigisoft Limited", period: "2025 – 2026" },
      { title: "Frontend Developer (Contract)", org: "BorderlessHR", period: "2025" },
    ],
    education: ["B.Sc. Computer Science — Rivers State University"],
    skills: [
      "React · Next.js · Vue · Nuxt",
      "TypeScript · Tailwind CSS",
      "Node.js · Express · PostgreSQL",
      "Web Vitals & Lighthouse",
      "Accessibility · Figma",
    ],
    links: [
      { label: "Portfolio", href: "https://peter-jonathan-hart.netlify.app" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/peter-jonathan-hart-1339043a0" },
    ],
  },
  {
    slug: "rapheal-allison",
    name: "Rapheal Allison",
    role: "Trainer — Graphic & Product Design",
    photo: "/images/team/rapheal-allison.jpg",
    photoPosition: "center 30%",
    summary:
      "Multidisciplinary designer trained in visual communication, working freelance since 2016 on logos, brand identities, packaging, posters, illustration and motion. Rapheal teaches the graphic-design track with real branding briefs — from logo concept to colour system and product mock-ups.",
    teaches: [
      "Graphic design",
      "Logo & brand identity",
      "Product & packaging design",
      "Illustration & motion basics",
    ],
    experience: [
      { title: "Freelance Product Designer", org: "Self-employed", period: "2021 – present" },
      { title: "Freelance Logo Designer", org: "Self-employed", period: "2016 – present" },
      { title: "Design Manager", org: "Freelance", period: "2018 – 2022" },
      { title: "Illustrator", org: "BitcoinMoon (NG)", period: "2020 – 2022" },
    ],
    education: [
      "B.Sc. Computer Science — Rivers State University",
      "Graphic Design (Visual Design) — Alison",
      "Diploma in Blockchain Technology — Alison",
    ],
    skills: [
      "Logo design & branding",
      "Product / packaging",
      "Illustration",
      "Motion design",
      "Web3 & blockchain",
    ],
  },
];
