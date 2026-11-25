/**
 * ─────────────────────────────────────────────────────────────────────────
 * CEA Lab Registry — Unified Platform Index & Open-Source Feasibility Map.
 *
 * Mirrors the architectural discipline of src/data/open-curriculum.ts:
 *  1. Native / built-in CEA Labs run 100% client-side in Next.js 15 + React 19
 *     with zero untrusted server-side code execution.
 *  2. Open-source repositories evaluated against GitHub API on 2026-11-21
 *     (licence, archived status, React 19 / Next.js 15 / Cloudflare Workers
 *     compatibility, hosting requirements, and embed safety).
 *  3. Permissive open-source tools (MIT / BSD / Apache-2.0) may be adopted as
 *     client libraries or launched via opt-in sandboxed embeds; proprietary,
 *     watermarked, commercial-restricted, or server-heavy stacks are flagged
 *     plainly.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const CEA_LAB_VERIFIED_DATE = "2026-11-21";

export type LabTrack = "code-web" | "data-office" | "design-writing" | "assessment-ai";

export interface BuiltInLabEntry {
  id: string;
  to: string;
  track: LabTrack;
  badge: string;
  name: string;
  headline: string;
  blurb: string;
  meta: string;
  linkedCourseSlug: string;
  linkedCourseTitle: string;
  isNew?: boolean;
}

export const CEA_BUILT_IN_LABS: BuiltInLabEntry[] = [
  {
    id: "code-studio",
    to: "/tools/code-studio",
    track: "code-web",
    badge: "CEA Code Studio",
    name: "HTML, CSS & JS Sandbox",
    headline: "Write code. Run it safely in-browser.",
    blurb:
      "Multi-tab HTML, CSS and JavaScript editor with an isolated sandboxed preview, Mobile/Tablet/Desktop viewports, console output and 6 guided Nigerian web challenges.",
    meta: "HTML · CSS · JS · Console · 6 challenges",
    linkedCourseSlug: "web-development",
    linkedCourseTitle: "Web Development",
    isNew: true,
  },
  {
    id: "css-layout-lab",
    to: "/tools/css-layout-lab",
    track: "code-web",
    badge: "CSS Layout Lab",
    name: "Flexbox & Grid Trainer",
    headline: "Master Flexbox and CSS Grid visually.",
    blurb:
      "Interactive Flex and Grid property explorer paired with 8 progressive layout puzzles — centre heroes, build navigation bars and construct responsive bento grids.",
    meta: "Flexbox · CSS Grid · 8 puzzles",
    linkedCourseSlug: "web-design",
    linkedCourseTitle: "Web Design",
    isNew: true,
  },
  {
    id: "sql-datalab",
    to: "/tools/sql-datalab",
    track: "data-office",
    badge: "CEA DataLab",
    name: "SQL & CSV Analytics Sandbox",
    headline: "Query Nigerian business tables with live SQL.",
    blurb:
      "Browser-based SQL engine over customers, products, orders and Paystack/POS payments — plus CSV dataset exploration, interactive charts and 8 guided SQL challenges.",
    meta: "SELECT · JOIN · GROUP BY · CSV Charts",
    linkedCourseSlug: "data-analytics",
    linkedCourseTitle: "Data Analytics",
    isNew: true,
  },
  {
    id: "excel-formula-lab",
    to: "/tools/excel-formula-lab",
    track: "data-office",
    badge: "CEA Spreadsheet Lab",
    name: "Excel & Sheets Formula Studio",
    headline: "Practise SUM, IF, SUMIF and VLOOKUP live.",
    blurb:
      "Interactive A1:F10 cell grid with formula bar, Naira formatting, 4 Nigerian business workbooks and 6 auto-checked formula drills — zero software install needed.",
    meta: "SUM · IF · SUMIF · VLOOKUP · 6 drills",
    linkedCourseSlug: "microsoft-office",
    linkedCourseTitle: "Microsoft Office",
    isNew: true,
  },
  {
    id: "assess-studio",
    to: "/tools/assess",
    track: "assessment-ai",
    badge: "CEA Assess",
    name: "Multi-Track Skill Diagnostic",
    headline: "Test what you know before the exam.",
    blurb:
      "Study mode (with hints and instant explanations) or timed Exam mode across 5 academy tracks: Computer Basics, Web Dev, SQL/Data, Office/Excel and AI Literacy.",
    meta: "Study & Exam modes · 5 tracks · Feedback",
    linkedCourseSlug: "digital-productivity",
    linkedCourseTitle: "Digital Productivity",
    isNew: true,
  },
  {
    id: "open-labs",
    to: "/tools/open-labs",
    track: "code-web",
    badge: "Open-Source Hub",
    name: "Verified Open-Source Sandbox & Registry",
    headline: "Embeddable engines & 100-repo feasibility map.",
    blurb:
      "Opt-in sandboxed embeds (LiveCodes, Mermaid Live) plus our GitHub-verified licence and React 19 / Cloudflare Workers architectural assessment of open-source lab tools.",
    meta: "MIT / Apache-2.0 · Opt-in sandboxes",
    linkedCourseSlug: "web-development",
    linkedCourseTitle: "Web Development",
    isNew: true,
  },
  {
    id: "typing-test",
    to: "/tools/typing-test",
    track: "design-writing",
    badge: "CEA TypeLab",
    name: "Typing Test",
    headline: "Know your WPM. Beat it tomorrow.",
    blurb:
      "Timed common-word tests, home-row drills, number sprints and passages — live WPM, raw speed, accuracy and consistency. Best score saved on this device.",
    meta: "WPM · Accuracy · Consistency",
    linkedCourseSlug: "computer-basics-typing",
    linkedCourseTitle: "Computer Basics & Typing",
  },
  {
    id: "word-counter",
    to: "/tools/word-counter",
    track: "design-writing",
    badge: "Writing Utility",
    name: "Word Counter",
    headline: "Essays, emails and scripts, measured.",
    blurb:
      "Words, characters, sentences, paragraphs, reading and speaking time — plus the keywords you repeat. Everything runs locally.",
    meta: "Words · Reading time · Keywords",
    linkedCourseSlug: "microsoft-office",
    linkedCourseTitle: "Microsoft Office",
  },
  {
    id: "password-strength",
    to: "/tools/password-strength",
    track: "assessment-ai",
    badge: "Cybersecurity Tool",
    name: "Password Strength",
    headline: "See your password the way an attacker does.",
    blurb:
      "Entropy, offline crack time, leaked-password check and a hardened generator. Your input never leaves the page.",
    meta: "Entropy · Crack time · Generator",
    linkedCourseSlug: "cybersecurity",
    linkedCourseTitle: "Cybersecurity",
  },
  {
    id: "color-contrast",
    to: "/tools/color-contrast",
    track: "design-writing",
    badge: "Design Utility",
    name: "Colour Contrast & Palettes",
    headline: "Type people can actually read.",
    blurb:
      "WCAG AA/AAA contrast for any pair, live preview, eight designer presets — and a harmony-palette generator with one-click copy.",
    meta: "WCAG AA/AAA · Palettes",
    linkedCourseSlug: "graphic-design",
    linkedCourseTitle: "Graphic Design",
  },
  {
    id: "data-size-converter",
    to: "/tools/data-size-converter",
    track: "data-office",
    badge: "Everyday Computing",
    name: "KB vs MB vs GB Converter",
    headline: "Which is bigger — and what does it hold?",
    blurb:
      "Type any size (500 MB, 1.5 GB) and see it in KB, MB, GB and TB at once, how many photos or songs fit inside, and why a 16 GB phone reports 14 GB.",
    meta: "KB · MB · GB · TB · What fits",
    linkedCourseSlug: "computer-basics-typing",
    linkedCourseTitle: "Computer Basics & Typing",
    isNew: true,
  },
  {
    id: "naira-keyboard",
    to: "/tools/naira-keyboard",
    track: "data-office",
    badge: "Everyday Computing",
    name: "Naira Sign & Amount in Words",
    headline: "Type ₦ anywhere, and spell any amount.",
    blurb:
      "Every working method for ₦ — Word's 20A6 Alt+X, Windows Alt+8358, Win+., Android and iPhone long-press — one-tap copy for accents, and a cheque/invoice amount-in-words writer.",
    meta: "₦ · Accents · Amount in words",
    linkedCourseSlug: "computer-basics-typing",
    linkedCourseTitle: "Computer Basics & Typing",
    isNew: true,
  },
  {
    id: "cloud-explainer",
    to: "/tools/cloud-explainer",
    track: "assessment-ai",
    badge: "Everyday Computing",
    name: "What Is the Cloud?",
    headline: "Your files, and who is really holding them.",
    blurb:
      "A visual explainer of where your photos, WhatsApp backups, documents and email actually live — plus what happens when data runs out and what each online action costs in MB.",
    meta: "Cloud storage · Data cost · Offline",
    linkedCourseSlug: "digital-productivity",
    linkedCourseTitle: "Digital Productivity",
    isNew: true,
  },
];

export type FeasibilityVerdict =
  | "built-natively"
  | "opt-in-embed"
  | "adopt-client-library"
  | "link-only-study"
  | "not-feasible-now";

export interface OpenLabFeasibilityEntry {
  id: string;
  name: string;
  repo: string;
  category: string;
  licenseVerified: string;
  stars: number;
  archived: boolean;
  verdict: FeasibilityVerdict;
  ceaTarget: string;
  architectureNote: string;
  embedUrl?: string;
  externalUrl: string;
}

export const CEA_OPEN_LAB_FEASIBILITY: OpenLabFeasibilityEntry[] = [
  {
    id: "livecodes",
    name: "LiveCodes",
    repo: "live-codes/livecodes",
    category: "Code Editors & Playgrounds",
    licenseVerified: "MIT",
    stars: 1529,
    archived: false,
    verdict: "opt-in-embed",
    ceaTarget: "CEA Code Studio (Multi-language Python/TS/React)",
    architectureNote:
      "Runs Python (Pyodide), TypeScript, React, SQL and 90+ languages client-side in isolated iframes. Ideal opt-in embed or SDK lazy-load without touching CEA's Cloudflare Worker.",
    embedUrl: "https://livecodes.io/?template=javascript&mode=simple",
    externalUrl: "https://github.com/live-codes/livecodes",
  },
  {
    id: "mermaid",
    name: "Mermaid / Mermaid Live",
    repo: "mermaid-js/mermaid",
    category: "Visualizers & Diagrams",
    licenseVerified: "MIT",
    stars: 91189,
    archived: false,
    verdict: "opt-in-embed",
    ceaTarget: "CEA Flowchart & NetLab Diagrammer",
    architectureNote:
      "Already used conceptually in CEA AI lessons. Can be adopted as a lazy-loaded client library or launched in Mermaid Live without server infrastructure.",
    embedUrl: "https://mermaid.live/edit",
    externalUrl: "https://github.com/mermaid-js/mermaid",
  },
  {
    id: "monaco-editor",
    name: "Monaco Editor",
    repo: "microsoft/monaco-editor",
    category: "Code Editors & Playgrounds",
    licenseVerified: "MIT",
    stars: 46993,
    archived: false,
    verdict: "adopt-client-library",
    ceaTarget: "CEA Code Studio (Pro Mode)",
    architectureNote:
      "Best-in-class VS Code editor engine (MIT). Heavy (~2–3 MB worker assets), so load dynamically only inside /tools/code-studio or signed-in /app/learn labs to protect Core Web Vitals.",
    externalUrl: "https://github.com/microsoft/monaco-editor",
  },
  {
    id: "codemirror-view",
    name: "CodeMirror v6 (codemirror/view)",
    repo: "codemirror/view",
    category: "Code Editors & Playgrounds",
    licenseVerified: "MIT",
    stars: 7803,
    archived: false,
    verdict: "adopt-client-library",
    ceaTarget: "Embedded lesson code exercises",
    architectureNote:
      "Note: codemirror/dev is archived; the maintained modular packages (@codemirror/view, @codemirror/state) are MIT and lightweight enough for inline lesson checks.",
    externalUrl: "https://github.com/codemirror/view",
  },
  {
    id: "sandpack",
    name: "Sandpack",
    repo: "codesandbox/sandpack",
    category: "Frontend Practice",
    licenseVerified: "Apache-2.0",
    stars: 6271,
    archived: false,
    verdict: "adopt-client-library",
    ceaTarget: "CEA React & Next.js Component Lab",
    architectureNote:
      "Apache-2.0 embeddable React sandbox. Relies on external bundler CDN by default unless self-hosted; ideal for multi-file React lessons.",
    externalUrl: "https://github.com/codesandbox/sandpack",
  },
  {
    id: "sql-js",
    name: "SQL.js",
    repo: "sql-js/sql.js",
    category: "SQL & Data Analytics",
    licenseVerified: "MIT",
    stars: 13690,
    archived: false,
    verdict: "adopt-client-library",
    ceaTarget: "CEA DataLab (Full SQLite WASM Upgrade)",
    architectureNote:
      "Pure MIT SQLite compiled to WebAssembly. CEA DataLab starts with a 0 KB zero-fetch TypeScript SQL engine today and can lazy-load SQL.js WASM for full DDL/window functions.",
    externalUrl: "https://github.com/sql-js/sql.js",
  },
  {
    id: "pglite",
    name: "PGlite",
    repo: "electric-sql/pglite",
    category: "SQL & Data Analytics",
    licenseVerified: "Apache-2.0",
    stars: 16355,
    archived: false,
    verdict: "adopt-client-library",
    ceaTarget: "CEA DataLab (PostgreSQL Track)",
    architectureNote:
      "Full PostgreSQL in WASM (~3 MB gzipped). Great lazy-loaded upgrade for Level 3 backend & data engineering cohorts.",
    externalUrl: "https://github.com/electric-sql/pglite",
  },
  {
    id: "duckdb-wasm",
    name: "DuckDB WASM",
    repo: "duckdb/duckdb-wasm",
    category: "SQL & Data Analytics",
    licenseVerified: "MIT",
    stars: 2172,
    archived: false,
    verdict: "adopt-client-library",
    ceaTarget: "CEA DataLab (Large CSV/Parquet Analytics)",
    architectureNote:
      "MIT analytical SQL engine in WASM for multi-megabyte CSV/Parquet datasets directly in browser memory.",
    externalUrl: "https://github.com/duckdb/duckdb-wasm",
  },
  {
    id: "excalidraw",
    name: "Excalidraw",
    repo: "excalidraw/excalidraw",
    category: "Design & Diagramming",
    licenseVerified: "MIT",
    stars: 136069,
    archived: false,
    verdict: "adopt-client-library",
    ceaTarget: "CEA Diagram & Wireframe Whiteboard",
    architectureNote:
      "MIT whiteboard/diagram component. Requires checking React 19 peer dependency compatibility before adding @excalidraw/excalidraw to root bundle; safe as a lazy client route or external launch.",
    externalUrl: "https://github.com/excalidraw/excalidraw",
  },
  {
    id: "fabric-js",
    name: "Fabric.js",
    repo: "fabricjs/fabric.js",
    category: "Graphic Design",
    licenseVerified: "MIT",
    stars: 31562,
    archived: false,
    verdict: "adopt-client-library",
    ceaTarget: "CEA Flyer & Certificate Studio",
    architectureNote:
      "MIT HTML5 Canvas object model — zero React peer issues when wrapped in a ref; ideal engine for a focused Nigerian flyer/certificate template editor.",
    externalUrl: "https://github.com/fabricjs/fabric.js",
  },
  {
    id: "xyflow",
    name: "React Flow (xyflow)",
    repo: "xyflow/xyflow",
    category: "Workflows & NetLab",
    licenseVerified: "MIT",
    stars: 39109,
    archived: false,
    verdict: "adopt-client-library",
    ceaTarget: "CEA NetLab & AI Workflow Builder",
    architectureNote:
      "MIT node-based canvas for network topology labs, database ER diagrams, and visual AI workflow builders.",
    externalUrl: "https://github.com/xyflow/xyflow",
  },
  {
    id: "blockly",
    name: "Blockly (RaspberryPiFoundation)",
    repo: "RaspberryPiFoundation/blockly",
    category: "Beginner Coding",
    licenseVerified: "Apache-2.0",
    stars: 13617,
    archived: false,
    verdict: "adopt-client-library",
    ceaTarget: "CEA Kids & Schools Block Lab",
    architectureNote:
      "Apache-2.0 visual block programming engine. Ideal for the CEA Schools Digital Skills Programme.",
    externalUrl: "https://github.com/RaspberryPiFoundation/blockly",
  },
  {
    id: "flexbox-froggy",
    name: "Flexbox Froggy",
    repo: "thomaspark/flexboxfroggy",
    category: "Frontend Practice",
    licenseVerified: "MIT",
    stars: 7383,
    archived: false,
    verdict: "built-natively",
    ceaTarget: "Inspired CEA CSS Layout Lab",
    architectureNote:
      "MIT reference for progressive CSS layout challenges. Rather than cloning its frog assets, CEA built an original Flexbox + CSS Grid Layout Lab tailored to real UI components.",
    externalUrl: "https://github.com/thomaspark/flexboxfroggy",
  },
  {
    id: "grid-garden",
    name: "Grid Garden (thomaspark/gridgarden)",
    repo: "thomaspark/gridgarden",
    category: "Frontend Practice",
    licenseVerified: "MIT",
    stars: 3800,
    archived: false,
    verdict: "built-natively",
    ceaTarget: "Inspired CEA CSS Layout Lab",
    architectureNote:
      "Note: wesbos/grid-garden returns 404; the actual MIT repo is thomaspark/gridgarden. Its progressive Grid teaching pattern is built natively into CEA CSS Layout Lab.",
    externalUrl: "https://github.com/thomaspark/gridgarden",
  },
  {
    id: "css-diner",
    name: "CSS Diner",
    repo: "flukeout/css-diner",
    category: "Frontend Practice",
    licenseVerified: "MPL-2.0",
    stars: 2867,
    archived: false,
    verdict: "link-only-study",
    ceaTarget: "Selector practice companion",
    architectureNote:
      "MPL-2.0 file-level copyleft; best used as an external study link from Web Design lessons rather than copying source files.",
    externalUrl: "https://flukeout.github.io/",
  },
  {
    id: "algorithm-visualizer",
    name: "Algorithm Visualizer",
    repo: "algorithm-visualizer/algorithm-visualizer",
    category: "Visualizers & Simulators",
    licenseVerified: "MIT",
    stars: 49553,
    archived: false,
    verdict: "link-only-study",
    ceaTarget: "Level 3 CS / Algorithms",
    architectureNote:
      "MIT multi-package React app; last pushed mid-2024. Link out for self-study or extract focused sorting/graph visualizers into pure React 19 components.",
    externalUrl: "https://algorithm-visualizer.org/",
  },
  {
    id: "tldraw",
    name: "tldraw",
    repo: "tldraw/tldraw",
    category: "Graphic Design",
    licenseVerified: "Proprietary (tldraw license)",
    stars: 51525,
    archived: false,
    verdict: "not-feasible-now",
    ceaTarget: "Replaced by Excalidraw / Fabric.js",
    architectureNote:
      "Caution: GitHub shows NOASSERTION because tldraw v2+ uses a custom commercial licence requiring a watermark or paid production license. Do not deploy commercially without a licence.",
    externalUrl: "https://github.com/tldraw/tldraw",
  },
  {
    id: "webcontainer-core",
    name: "StackBlitz WebContainer",
    repo: "stackblitz/webcontainer-core",
    category: "Code Editors & Playgrounds",
    licenseVerified: "MIT (SDK) / Commercial API terms",
    stars: 4649,
    archived: false,
    verdict: "not-feasible-now",
    ceaTarget: "Not needed for HTML/CSS/JS/Python",
    architectureNote:
      "Requires strict Cross-Origin-Opener-Policy / Cross-Origin-Embedder-Policy (COOP/COEP) headers that break third-party scripts (AdSense, Turnstile, Paystack) unless isolated on a separate subdomain.",
    externalUrl: "https://github.com/stackblitz/webcontainer-core",
  },
  {
    id: "judge0",
    name: "Judge0 IDE",
    repo: "judge0/ide",
    category: "Code Editors & Playgrounds",
    licenseVerified: "MIT (IDE) / Server required",
    stars: 1127,
    archived: false,
    verdict: "not-feasible-now",
    ceaTarget: "Requires dedicated Linux/Docker sandbox",
    architectureNote:
      "CEA's backend runs on Cloudflare Workers (no Docker/arbitrary binary execution). Use Judge0 only if provisioning a separate isolated container host later.",
    externalUrl: "https://github.com/judge0/ide",
  },
  {
    id: "dify",
    name: "Dify",
    repo: "langgenius/dify",
    category: "AI Systems",
    licenseVerified: "Modified Apache-2.0 (Multi-tenant restriction)",
    stars: 161625,
    archived: false,
    verdict: "not-feasible-now",
    ceaTarget: "Incompatible multi-tenant & hosting model",
    architectureNote:
      "Python/Docker stack plus Modified Apache-2.0 terms restricting multi-tenant SaaS use and logo removal. CEA already has its own Worker AI proxy and Prompt Lab.",
    externalUrl: "https://github.com/langgenius/dify",
  },
  {
    id: "stirling-pdf",
    name: "Stirling-PDF",
    repo: "Stirling-Tools/Stirling-PDF",
    category: "Office Utilities",
    licenseVerified: "Mixed (MIT + proprietary/engine licenses)",
    stars: 97154,
    archived: false,
    verdict: "not-feasible-now",
    ceaTarget: "Requires Java/Docker backend",
    architectureNote:
      "Server-heavy Java/Docker utility with mixed directory licences — cannot run inside Vercel Next.js serverless or Cloudflare Workers.",
    externalUrl: "https://github.com/Stirling-Tools/Stirling-PDF",
  },
];
