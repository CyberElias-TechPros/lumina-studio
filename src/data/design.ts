export const designComponents = [
  {
    t: "Button",
    d: "Primary, secondary, ghost, outline, destructive",
    states: 8,
    usage: 312,
    status: "Stable",
  },
  {
    t: "Input",
    d: "Text, search, numeric, with prefix icon",
    states: 6,
    usage: 198,
    status: "Stable",
  },
  {
    t: "Badge",
    d: "Tone badges, dot badges, counter badges",
    states: 4,
    usage: 188,
    status: "Stable",
  },
  {
    t: "Tabs",
    d: "Underline, pill, segmented",
    states: 4,
    usage: 86,
    status: "Beta",
  },
  {
    t: "Progress",
    d: "Bar, circle, indeterminate",
    states: 5,
    usage: 64,
    status: "Beta",
  },
  {
    t: "Chart",
    d: "Line, bar, donut, sparkline",
    states: 3,
    usage: 18,
    status: "Draft",
  },
];

export const designFlows = [
  {
    t: "Enrolment flow",
    steps: 7,
    decisions: 2,
    status: "Mapped",
    list: [
      "Landing",
      "Course pick",
      "Payment",
      "Parent consent",
      "Onboarding",
      "First lesson",
      "Streak set",
    ],
  },
  {
    t: "Job application flow",
    steps: 5,
    decisions: 1,
    status: "In review",
    list: ["Job search", "Profile check", "Apply", "Skills test", "Interview booking"],
  },
  {
    t: "Referral claim flow",
    steps: 4,
    decisions: 1,
    status: "Draft",
    list: ["Invite link", "Signup", "First lesson", "Reward claim"],
  },
  {
    t: "Password reset flow",
    steps: 4,
    decisions: 1,
    status: "Mapped",
    list: ["Sign-in", "Forgot password", "Email verify", "New password"],
  },
];

export const designPrototypes = [
  {
    t: "Learning hub refresh",
    version: "v3.2",
    status: "Testing",
    feedback: 18,
    owner: "Ada Obi",
  },
  {
    t: "Parent app onboarding",
    version: "v2.1",
    status: "In review",
    feedback: 11,
    owner: "Tunde Bakare",
  },
  {
    t: "Alumni portal theme",
    version: "v1.0",
    status: "Draft",
    feedback: 0,
    owner: "Chiamaka Eze",
  },
  {
    t: "Employer dashboard",
    version: "v4.0",
    status: "Shipped",
    feedback: 42,
    owner: "Ngozi Adeyemi",
  },
];

export const designTokens = [
  { kind: "color", t: "primary", v: "hsl(24 94% 53%)", hex: "#F97316", deprecated: false },
  { kind: "color", t: "brand", v: "hsl(24 94% 53%)", hex: "#F97316", deprecated: false },
  { kind: "color", t: "success", v: "hsl(142 71% 45%)", hex: "#22C55E", deprecated: false },
  { kind: "color", t: "warning", v: "hsl(48 96% 53%)", hex: "#EAB308", deprecated: false },
  { kind: "color", t: "ink", v: "hsl(222 47% 11%)", hex: "#0F172A", deprecated: false },
  {
    kind: "color",
    t: "royal-blue",
    v: "hsl(221 83% 53%)",
    hex: "#2563EB",
    deprecated: true,
  },
  {
    kind: "type",
    t: "display-2xl",
    v: "48px / 52px · extrabold",
    family: "Fraunces",
    status: "Active",
  },
  { kind: "type", t: "heading-xl", v: "30px / 36px · bold", family: "Inter", status: "Active" },
  { kind: "type", t: "body-base", v: "16px / 24px · regular", family: "Inter", status: "Active" },
  {
    kind: "type",
    t: "caption-sm",
    v: "12px / 16px · semibold",
    family: "Inter",
    status: "Active",
  },
  { kind: "type", t: "label-xs", v: "10px / 14px · bold", family: "Inter", status: "Deprecated" },
];

export const designVersions = [
  {
    t: "v3.2 · Learning hub refresh",
    change: "Rebalanced card grid, added streak widget",
    editor: "Ada Obi",
    when: "2h ago",
    status: "Current",
  },
  {
    t: "v3.1 · Learning hub refresh",
    change: "Fixed nav overflow on 1280px",
    editor: "Tunde Bakare",
    when: "Yesterday",
    status: "Stable",
  },
  {
    t: "v3.0 · Learning hub refresh",
    change: "Token migration to CEA-UI v2.4",
    editor: "Chiamaka Eze",
    when: "Jul 24",
    status: "Stable",
  },
  {
    t: "v2.9 · Learning hub refresh",
    change: "Rolled back accent color change",
    editor: "Ngozi Adeyemi",
    when: "Jul 18",
    status: "Archived",
  },
];

export const collaborationThreads = [
  {
    t: "Mobile nav density",
    d: "3 replies · badge on prototype v3.2",
    author: "Ada Obi",
    status: "Open",
  },
  {
    t: "Empty states for learner dashboards",
    d: "2 replies · annotation on screen 4",
    author: "Tunde Bakare",
    status: "In progress",
  },
  {
    t: "Contrast on success badges",
    d: "5 replies · resolved in token editor",
    author: "Chiamaka Eze",
    status: "Resolved",
  },
  {
    t: "Cert template footer spacing",
    d: "1 reply · pinned by Ngozi",
    author: "Ngozi Adeyemi",
    status: "Resolved",
  },
];

export const designExports = [
  {
    t: "Learning hub icons",
    format: "SVG + PNG @2x",
    size: "24 files · 4.2MB",
    owner: "Ada Obi",
    status: "Ready",
  },
  {
    t: "Parent app marketing kit",
    format: "PNG + WebP",
    size: "18 files · 31MB",
    owner: "Tunde Bakare",
    status: "Processing",
  },
  {
    t: "Brand gradient pack",
    format: "Figma + CSS",
    size: "12 tokens",
    owner: "Chiamaka Eze",
    status: "Queued",
  },
  {
    t: "Certificates template",
    format: "PDF + SVG",
    size: "6 files · 9.8MB",
    owner: "Ngozi Adeyemi",
    status: "Failed",
  },
];

export const systemComponents = [
  { t: "Button", variants: 12, states: 8, usage: 312, status: "Stable" },
  { t: "Card", variants: 9, states: 6, usage: 204, status: "Stable" },
  { t: "Badge", variants: 7, states: 4, usage: 188, status: "Stable" },
  { t: "Table", variants: 5, states: 4, usage: 96, status: "Beta" },
  { t: "Command palette", variants: 3, states: 5, usage: 42, status: "In review" },
  { t: "Chart", variants: 6, states: 3, usage: 18, status: "Draft" },
];

export const designKpis = [
  { id: "hub-tokens", value: 212 },
  { id: "hub-components", value: 84 },
  { id: "hub-prototypes", value: 5 },
  { id: "hub-feedback", value: 14 },
  { id: "collab-annotations", value: 23 },
  { id: "collab-participants", value: 6 },
  { id: "components-variants", value: 512 },
  { id: "components-states", value: 406 },
  { id: "components-usage", value: 1862 },
  { id: "exports-requests", value: 28 },
  { id: "exports-formats", value: 6 },
  { id: "exports-delivered", value: 22 },
  { id: "exports-pending", value: 6 },
  { id: "flows-tested", value: 58 },
  { id: "prototypes-versions", value: 23 },
  { id: "prototypes-usability", value: 5 },
  { id: "system-groups", value: 9 },
  { id: "system-adoption", value: 98 },
  { id: "tokens-spacing", value: 12 },
  { id: "versions-rollbacks", value: 3 },
  { id: "versions-editors", value: 5 },
  { id: "versions-pending", value: 2 },
];
