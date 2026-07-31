# CEA-OS Design Language

## Hybrid Reference from digitalskillsacademy.org × dskillacademy.com.ng

> **Philosophy:** Take the clean, professional, premium structure of Digital Skills Academy and infuse it with the vibrant, energetic, gradient-rich visual identity of DSkill Academy. The result: a platform that feels both authoritative and exciting, premium and approachable, global and locally relevant.

---

## 1. Reference Site Analysis

### Site A: digitalskillsacademy.org — "The Professional Skeleton"

| Element           | Detail                                                  |
| ----------------- | ------------------------------------------------------- |
| **Theme**         | Kadence + Elementor                                     |
| **Primary Color** | `#7c1034` (deep burgundy/crimson)                       |
| **Secondary**     | `#cfe5ff` (light blue)                                  |
| **Font**          | Montserrat (clean, modern geometric sans)               |
| **Nav**           | Centered horizontal, logo left, CTA right, social icons |
| **Layout**        | Full-width sections, generous whitespace, card-based    |
| **Mood**          | Professional, premium, trustworthy, calm                |
| **Key Strength**  | Information hierarchy, readability, trust signals       |

### Site B: dskillacademy.com.ng — "The Vibrant Soul"

| Element             | Detail                                                                |
| ------------------- | --------------------------------------------------------------------- |
| **Theme**           | Rishi + Elementor + Mega Elements                                     |
| **Primary Palette** | `#2f4858` (dark navy), `#70025d` (purple), `#172b3f` (deep teal-navy) |
| **Accents**         | `#fde9e3` (warm pink), `#e4faff` (ice blue)                           |
| **Gradients**       | 30+ defined gradients — vibrant, bold, varied                         |
| **Font**            | System fonts                                                          |
| **Layout**          | Dense, rich, animated, colorful                                       |
| **Mood**            | Energetic, exciting, youthful, bold                                   |
| **Key Strength**    | Visual impact, energy, gradient richness, animations                  |

---

## 2. CEA-OS Hybrid Design Principles

### Principle 1: Professional Structure, Vibrant Energy

Take the **clean information architecture, generous whitespace, and clear hierarchy** from Site A. Layer on the **bold gradients, rich color, and energetic accents** from Site B.

```
BAD: Boring corporate OR chaotic/overwhelming
GOOD: Clean layout with intentional color moments that guide attention
```

### Principle 2: Color as Wayfinding

Use color not just for decoration but for **orientation** — different sections/modules get distinct gradient headers or accent colors so users know where they are without reading.

```
Learning Engine  → Cool blues + teals  (#0ea5e9 → #0d9488)
Career Engine    → Warm ambers + golds (#f59e0b → #d97706)
Services Engine  → Purples + violets   (#8b5cf6 → #7c3aed)
ERP Engine       → Emerald + teals     (#10b981 → #059669)
Community Engine → Roses + pinks       (#f43f5e → #e11d48)
```

### Principle 3: Gradients with Purpose

Gradients should be used **strategically** — hero sections, card headers, progress indicators, CTA buttons — not everywhere. This gives them impact when they appear.

```css
/* Hero gradient (inspired by Site B's richness) */
--gradient-hero: linear-gradient(135deg, #2f4858 0%, #70025d 50%, #7c1034 100%);

/* Card accent gradients (one per engine) */
--gradient-learning: linear-gradient(135deg, #0ea5e9, #0d9488);
--gradient-career: linear-gradient(135deg, #f59e0b, #d97706);
--gradient-services: linear-gradient(135deg, #8b5cf6, #7c3aed);
--gradient-erp: linear-gradient(135deg, #10b981, #059669);
--gradient-community: linear-gradient(135deg, #f43f5e, #e11d48);
```

### Principle 4: Typography — Montserrat as Primary

Montserrat (from Site A) gives the platform a premium, modern feel. Use weight variation for hierarchy.

```css
--font-primary: "Montserrat", system-ui, -apple-system, sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", monospace;
```

### Principle 5: Card Language from Site A

Site A's card-based layout is clean and scannable. Each card should have:

- Optional gradient top accent bar (4px) for visual categorization
- Rounded corners (12px)
- Subtle shadow on hover
- Clean padding (24px)

### Principle 6: Animation Philosophy from Site B

Use animations to **delight, not distract**:

- Fade-in on scroll for sections (Site B style zoomIn/fadeIn)
- Micro-interactions on hover (buttons lift, cards elevate)
- Progress animations (rings, bars)
- Page transitions (subtle slide/fade)

---

## 3. The CEA-OS Palette

### Primary Palette

```css
/* Core brand colors — hybrid of both sites */
--cea-primary: #7c1034; /* From Site A — deep burgundy, authoritative */
--cea-primary-light: #a45871; /* Site A palette 4 */
--cea-primary-dark: #5c0c27; /* Deeper variant */

--cea-secondary: #2f4858; /* From Site B — dark navy, grounded */
--cea-secondary-light: #4a6a80;
--cea-secondary-dark: #1a2b35;

--cea-accent: #70025d; /* From Site B — vibrant purple, energetic */
--cea-accent-light: #9a0d80;
```

### Extended Palette (Per Engine)

```css
--cea-learning: #0ea5e9; /* Sky blue */
--cea-learning-bg: #e0f2fe;
--cea-career: #f59e0b; /* Amber */
--cea-career-bg: #fef3c7;
--cea-services: #8b5cf6; /* Violet */
--cea-services-bg: #ede9fe;
--cea-erp: #10b981; /* Emerald */
--cea-erp-bg: #d1fae5;
--cea-community: #f43f5e; /* Rose */
--cea-community-bg: #ffe4e6;
```

### Neutrals

```css
--cea-white: #ffffff;
--cea-gray-50: #f8fafc;
--cea-gray-100: #f1f5f9;
--cea-gray-200: #e2e8f0;
--cea-gray-300: #cbd5e1;
--cea-gray-400: #94a3b8;
--cea-gray-500: #64748b;
--cea-gray-600: #475569;
--cea-gray-700: #334155;
--cea-gray-800: #1e293b;
--cea-gray-900: #0f172a;
--cea-black: #020617;
```

### Semantic Colors

```css
--cea-success: #22c55e;
--cea-warning: #f59e0b;
--cea-error: #ef4444;
--cea-info: #0ea5e9;
```

---

## 4. Gradient Definitions

```css
/* Hero / Landing section gradients */
--gradient-hero-primary: linear-gradient(135deg, #2f4858 0%, #70025d 50%, #7c1034 100%);
--gradient-hero-alt: linear-gradient(135deg, #1a2b35 0%, #7c1034 50%, #a45871 100%);

/* Engine header gradients */
--gradient-learning: linear-gradient(135deg, #0ea5e9, #0284c7);
--gradient-career: linear-gradient(135deg, #f59e0b, #d97706);
--gradient-services: linear-gradient(135deg, #8b5cf6, #7c3aed);
--gradient-erp: linear-gradient(135deg, #10b981, #059669);
--gradient-community: linear-gradient(135deg, #f43f5e, #e11d48);

/* Special: Dark gradient for footer/sidebar (Site B richness) */
--gradient-dark: linear-gradient(180deg, #172b3f 0%, #0f172a 100%);

/* Glass/overlay gradients */
--gradient-glass: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
--gradient-overlay: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
```

---

## 5. Component Design Specifications

### Buttons

```css
/* Primary CTA — inspired by Site A's button style with Site B's energy */
.btn-primary {
  background: linear-gradient(135deg, var(--cea-primary), var(--cea-accent));
  color: white;
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(124, 16, 52, 0.3);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(124, 16, 52, 0.4);
}

/* Secondary — ghost style from Site A */
.btn-secondary {
  background: transparent;
  border: 2px solid var(--cea-primary);
  color: var(--cea-primary);
}
.btn-secondary:hover {
  background: var(--cea-primary);
  color: white;
}
```

### Cards

```css
.card {
  background: var(--cea-white);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid var(--cea-gray-200);
}
.card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
.card--gradient-top {
  border-top: 4px solid;
  border-image: var(--gradient-learning) 1;
}
```

### Navigation

```css
/* Top nav — inspired by Site A's clean centered nav */
.navbar {
  background: var(--cea-primary);
  padding: 10px 0;
}
.navbar a {
  color: rgba(255, 255, 255, 0.85);
  font-weight: 400;
  font-size: 15px;
  padding: 0.6em 1.2em;
}
.navbar a:hover {
  color: white;
}

/* Active/current indicator — gradient underline */
.navbar a.active {
  color: white;
  position: relative;
}
.navbar a.active::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 1.2em;
  right: 1.2em;
  height: 2px;
  background: linear-gradient(90deg, var(--cea-accent), var(--cea-primary-light));
}
```

### Typography Scale

```css
h1 {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.3;
}
h2 {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.35;
}
h3 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
}
h4 {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
}
h5 {
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5;
}
h6 {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
}
body {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
}
small {
  font-size: 0.875rem;
}
```

### Spacing System (Inspired by Site A's generous whitespace)

```css
--space-section: 5rem; /* 80px — between major sections */
--space-section-sm: 3rem; /* 48px */
--space-block: 2rem; /* 32px — between content blocks */
--space-element: 1rem; /* 16px — between related elements */
--space-inset: 1.5rem; /* 24px — card padding */
```

---

## 6. Page/Section Templates

### Hero Section (Landing Page)

```
┌──────────────────────────────────────────────────────┐
│  [Gradient Background: --gradient-hero-primary]       │
│                                                       │
│  [Nav: transparent, white text]                       │
│                                                       │
│  ┌────────────────────────────────────┐               │
│  │  Headline (h1, white)              │               │
│  │  Subheadline (white, 85% opacity)  │               │
│  │                                     │               │
│  │  [CTA Primary]  [CTA Secondary]     │               │
│  │                                     │               │
│  │  Trust signals: "500+ students" etc │               │
│  └────────────────────────────────────┘               │
│                                                       │
│  [Optional: Floating illustration/cards]              │
│                                                       │
└──────────────────────────────────────────────────────┘
```

### Feature/Value Section

```
┌──────────────────────────────────────────────────────┐
│  Section Label (eyebrow: small, uppercase, lettered)  │
│  Section Title (h2)                                   │
│  Section Description                                  │
│                                                        │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                │
│  │Card 1│ │Card 2│ │Card 3│ │Card 4│                │
│  │Icon  │ │Icon  │ │Icon  │ │Icon  │                │
│  │Title │ │Title │ │Title │ │Title │                │
│  │Desc  │ │Desc  │ │Desc  │ │Desc  │                │
│  └──────┘ └──────┘ └──────┘ └──────┘                │
│                                                        │
│  2-2-2 responsive grid                                 │
└──────────────────────────────────────────────────────┘
```

### Course/Program Grid (Like Site A's course section)

```
┌──────────────────────────────────────────────────────┐
│  Section Title (h2)                                   │
│                                                        │
│  ┌─────────────────┐ ┌─────────────────┐            │
│  │ [Gradient Top]  │ │ [Gradient Top]  │            │
│  │ Course Image    │ │ Course Image    │            │
│  │ Title           │ │ Title           │            │
│  │ Description     │ │ Description     │            │
│  │ [Badge] [Price] │ │ [Badge] [Price] │            │
│  │ [CTA]           │ │ [CTA]           │            │
│  └─────────────────┘ └─────────────────┘            │
│                                                        │
│  2-col desktop, 1-col mobile                           │
└──────────────────────────────────────────────────────┘
```

### Testimonial/Trust Section (Inspired by Site B's carousel)

```
┌──────────────────────────────────────────────────────┐
│  [Gradient Background or Accent BG]                   │
│  Section Title (h2)                                   │
│                                                        │
│  ┌─────────────── Swiper Carousel ───────────────┐   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐     │   │
│  │  │ Avatar   │  │ Avatar   │  │ Avatar   │     │   │
│  │  │ "Quote"  │  │ "Quote"  │  │ "Quote"  │     │   │
│  │  │ Name     │  │ Name     │  │ Name     │     │   │
│  │  │ ★★★★☆   │  │ ★★★★★   │  │ ★★★★☆   │     │   │
│  │  └──────────┘  └──────────┘  └──────────┘     │   │
│  └────────────────────────────────────────────────┘   │
│                                                        │
│  [Partner logos row — grayscale, hover to color]       │
└──────────────────────────────────────────────────────┘
```

### Footer (Hybrid)

```
┌──────────────────────────────────────────────────────┐
│  [Gradient Dark Background]                           │
│                                                        │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                │
│  │About │ │Learn │ │Career│ │Connect                │
│  │links │ │links │ │links │ │social, address         │
│  └──────┘ └──────┘ └──────┘ └──────┘                │
│                                                        │
│  ─────────────────────────────────────────────────   │
│  © 2026 Cyber Elias Academy  |  Privacy  |  Terms     │
└──────────────────────────────────────────────────────┘
```

---

## 7. Dashboard Layout Reference

```
┌────────────────────────────────────────────────────────┐
│  [Topbar: logo, search, notifications, profile]         │
│  Background: white, bottom border: subtle gray          │
├──────────┬─────────────────────────────────────────────┤
│ Sidebar  │  Main Content Area                           │
│ [gradient│                                               │
│  dark]   │  ┌──────┐ ┌──────┐ ┌──────┐               │
│          │  │Metric│ │Metric│ │Metric│               │
│ Nav items│  └──────┘ └──────┘ └──────┘               │
│ (white   │                                               │
│  text,   │  ┌──────────────────────────────────────┐   │
│  active  │  │  Chart/Table Area                     │   │
│  indica- │  │                                       │   │
│  tor =   │  └──────────────────────────────────────┘   │
│  accent  │                                               │
│  bar)    │  ┌────────────┐ ┌─────────────────────────┐ │
│          │  │ Mini list  │ │ Activity feed            │ │
│          │  └────────────┘ └─────────────────────────┘ │
└──────────┴─────────────────────────────────────────────┘

Sidebar: 260px desktop, overlay on mobile
Active nav item: left border accent + subtle bg highlight
```

---

## 8. Animation & Interaction Guide

| Element                         | Animation                          | Duration | Easing   | Reference        |
| ------------------------------- | ---------------------------------- | -------- | -------- | ---------------- |
| Page sections entering viewport | FadeIn + translateY(20→0)          | 600ms    | ease-out | Site B fadeIn    |
| Cards on hover                  | translateY(-4px), shadow increase  | 300ms    | ease-out | Site A + B       |
| Buttons hover                   | translateY(-2px), shadow increase  | 200ms    | ease-out | Site A           |
| Nav link hover                  | Color transition, subtle underline | 200ms    | ease     | Site A           |
| Modal open                      | Scale(0.95→1) + fadeIn overlay     | 250ms    | spring   | Both             |
| Toast notification              | SlideIn from right                 | 300ms    | spring   | Standard         |
| Chart enter                     | Draw in / fade series              | 800ms    | ease-out | Recharts default |
| Skeleton loading                | Shimmer animation                  | 1500ms   | linear   | Standard         |
| Gradient text (headlines)       | Static gradient, no animation      | —        | —        | Site B style     |
| Progress rings                  | Animate on scroll into view        | 1000ms   | ease-out | Custom           |

---

## 9. Mobile Responsive Behavior

| Breakpoint | Layout Changes                                          |
| ---------- | ------------------------------------------------------- |
| >1024px    | Full desktop: sidebar visible, multi-col grids          |
| 768-1024px | Tablet: sidebar collapses to icons, 2-col grids         |
| <768px     | Mobile: bottom tab nav, single column, full-width cards |

Mobile nav (inspired by Site A's mobile drawer):

- Hamburger → slide-in drawer from right
- Semi-transparent overlay
- Full-height menu with large touch targets (48px min)
- Close on backdrop tap or X button

---

## 10. Implementation Notes for Developers

### Tailwind Config Extension

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        cea: {
          primary: "#7c1034",
          "primary-light": "#a45871",
          "primary-dark": "#5c0c27",
          secondary: "#2f4858",
          "secondary-light": "#4a6a80",
          "secondary-dark": "#1a2b35",
          accent: "#70025d",
          "accent-light": "#9a0d80",
          learning: "#0ea5e9",
          career: "#f59e0b",
          services: "#8b5cf6",
          erp: "#10b981",
          community: "#f43f5e",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #2f4858 0%, #70025d 50%, #7c1034 100%)",
        "gradient-learning": "linear-gradient(135deg, #0ea5e9, #0284c7)",
        "gradient-career": "linear-gradient(135deg, #f59e0b, #d97706)",
        "gradient-services": "linear-gradient(135deg, #8b5cf6, #7c3aed)",
        "gradient-erp": "linear-gradient(135deg, #10b981, #059669)",
        "gradient-community": "linear-gradient(135deg, #f43f5e, #e11d48)",
        "gradient-dark": "linear-gradient(180deg, #172b3f, #0f172a)",
      },
    },
  },
};
```

### shadcn/ui Theme Variables

```css
/* CSS Variables for shadcn/ui theming */
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  --popover: 0 0% 100%;
  --popover-foreground: 222 47% 11%;
  --primary: 340 77% 27%; /* #7c1034 converted to HSL */
  --primary-foreground: 0 0% 100%;
  --secondary: 200 30% 26%; /* #2f4858 converted to HSL */
  --secondary-foreground: 0 0% 100%;
  --muted: 210 20% 96%;
  --muted-foreground: 215 16% 47%;
  --accent: 315 90% 22%; /* #70025d converted to HSL */
  --accent-foreground: 0 0% 100%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: 340 77% 27%;
  --radius: 0.75rem;
}

.dark {
  --background: 222 47% 11%;
  --foreground: 210 20% 98%;
  --card: 222 47% 11%;
  --card-foreground: 210 20% 98%;
  --primary: 340 77% 27%;
  --primary-foreground: 0 0% 100%;
  --secondary: 200 30% 26%;
  --secondary-foreground: 0 0% 100%;
  --muted: 217 33% 17%;
  --muted-foreground: 215 20% 65%;
  --accent: 315 90% 22%;
  --accent-foreground: 0 0% 100%;
  --destructive: 0 63% 31%;
  --border: 217 33% 17%;
  --input: 217 33% 17%;
  --ring: 340 77% 27%;
}
```

---

> **The CEA-OS Design Language is a hybrid: the clean, professional structure of digitalskillsacademy.org's Kadence theme × the vibrant, energetic gradient richness of dskillacademy.com.ng's Rishi theme.**
>
> Montserrat for authority. Gradients for energy. Cards for clarity. Whitespace for focus. Color for wayfinding. Animation for delight.
