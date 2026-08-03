import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ArtAccent = "brand" | "learning" | "career" | "services" | "erp" | "community";

export type ArtVariant =
  | "code"
  | "cloud"
  | "shield"
  | "data"
  | "design"
  | "mobile"
  | "network"
  | "community"
  | "graduate"
  | "market"
  | "tour";

const ACCENT_VAR: Record<ArtAccent, string> = {
  brand: "var(--primary-glow)",
  learning: "var(--learning)",
  career: "var(--career)",
  services: "var(--services)",
  erp: "var(--erp)",
  community: "var(--community)",
};

const DEFAULT_ACCENT: Record<ArtVariant, ArtAccent> = {
  code: "learning",
  cloud: "learning",
  shield: "career",
  data: "services",
  design: "services",
  mobile: "learning",
  network: "career",
  community: "community",
  graduate: "brand",
  market: "career",
  tour: "brand",
};

const VARIANT_LABEL: Record<ArtVariant, string> = {
  code: "Software development abstract scene",
  cloud: "Cloud infrastructure abstract scene",
  shield: "Cybersecurity abstract scene",
  data: "Data and analytics abstract scene",
  design: "Product design abstract scene",
  mobile: "Mobile development abstract scene",
  network: "Networking abstract scene",
  community: "Community abstract scene",
  graduate: "Graduation abstract scene",
  market: "Growth marketing abstract scene",
  tour: "Campus tour abstract scene",
};

function tint(variable: string, amount = 62) {
  return `color-mix(in oklab, ${variable} ${amount}%, white)`;
}

function accentStyle(accent: ArtAccent) {
  return { color: tint(ACCENT_VAR[accent]) };
}

const ORBITS = [
  { cx: 600, cy: 402, rx: 300, ry: 132, o: 0.12 },
  { cx: 600, cy: 402, rx: 470, ry: 178, o: 0.08 },
  { cx: 600, cy: 402, rx: 200, ry: 82, o: 0.14 },
];

function Backdrop({ coreId }: { coreId: string }) {
  const dots = Array.from({ length: 20 }).map((_, i) => {
    const a = (i / 20) * Math.PI * 2;
    return { x: 600 + Math.cos(a) * 248, y: 402 + Math.sin(a) * 106 };
  });
  return (
    <g>
      <circle cx={880} cy={40} r={430} fill={`url(#core-${coreId})`} />
      <circle cx={210} cy={760} r={400} fill={`url(#core-${coreId})`} />
      <g fill="none" stroke="white">
        {ORBITS.map((o, i) => (
          <ellipse
            key={i}
            cx={o.cx}
            cy={o.cy}
            rx={o.rx}
            ry={o.ry}
            strokeOpacity={o.o}
            strokeWidth={1.4}
          />
        ))}
      </g>
      <g fill="white" fillOpacity={0.4}>
        <circle cx={900} cy={402} r={3.4} />
        <circle cx={300} cy={402} r={3.4} />
      </g>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={2} fill="white" fillOpacity={0.26} />
      ))}
      <g opacity={0.22} fill="none" stroke="white">
        <path d="M 120 560 C 260 620 320 700 470 712" strokeWidth={1.6} />
        <path d="M 1080 220 C 940 260 960 120 860 96" strokeWidth={1.6} />
      </g>
    </g>
  );
}

function CodeGlyph({ accent }: { accent: ArtAccent }) {
  return (
    <g style={accentStyle(accent)}>
      <rect
        x={462}
        y={206}
        width={250}
        height={222}
        rx={20}
        fill="white"
        fillOpacity={0.05}
        stroke="white"
        strokeOpacity={0.3}
      />
      <circle cx={486} cy={230} r={5} fill="currentColor" />
      <circle cx={507} cy={230} r={5} fill="currentColor" fillOpacity={0.6} />
      <circle cx={528} cy={230} r={5} fill="currentColor" fillOpacity={0.4} />
      <g fill="currentColor" fillOpacity={0.82}>
        <rect x={486} y={262} width={208} height={13} rx={6.5} />
        <rect x={486} y={288} width={164} height={13} rx={6.5} />
        <rect x={486} y={314} width={190} height={13} rx={6.5} />
        <rect x={486} y={340} width={120} height={13} rx={6.5} />
      </g>
      <g fill="white" fillOpacity={0.14}>
        <rect x={486} y={364} width={78} height={13} rx={6.5} />
        <rect x={574} y={364} width={58} height={13} rx={6.5} />
      </g>
      <path
        d="M 706 150 l 0 56 m 0 0 l -16 22 m 16 -22 l 16 22"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        opacity={0.95}
      />
      <text
        x={706}
        y={424}
        fontSize={24}
        fontWeight={800}
        fill="white"
        fillOpacity={0.72}
        fontFamily="Menlo, monospace"
      >
        {"</>"}
      </text>
    </g>
  );
}

function CloudGlyph({ accent }: { accent: ArtAccent }) {
  return (
    <g style={accentStyle(accent)}>
      <g stroke="white" strokeOpacity={0.4} strokeWidth={2.8} fill="white" fillOpacity={0.06}>
        <circle cx={548} cy={350} r={62} />
        <circle cx={626} cy={350} r={82} />
        <circle cx={704} cy={350} r={62} />
      </g>
      <rect x={500} y={344} width={304} height={76} rx={38} fill="white" fillOpacity={0.08} />
      <rect x={430} y={380} width={40} height={78} rx={12} fill="currentColor" opacity={0.8} />
      <rect x={492} y={394} width={30} height={56} rx={10} fill="currentColor" opacity={0.55} />
      <rect x={544} y={382} width={36} height={76} rx={12} fill="currentColor" opacity={0.32} />
      <path
        d="M 582 218 v 58"
        stroke="currentColor"
        strokeWidth={7}
        strokeLinecap="round"
        opacity={0.9}
      />
      <path
        d="M 582 224 q -96 2 -132 6 m 132 -6 q 96 2 132 6"
        fill="none"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        opacity={0.8}
      />
      <path
        d="M 716 196 q 0 22 22 22 M 738 218 l -4 22 M 738 218 l 20 12"
        fill="none"
        stroke="white"
        strokeOpacity={0.6}
        strokeWidth={6}
        strokeLinecap="round"
      />
    </g>
  );
}

function ShieldGlyph({ accent }: { accent: ArtAccent }) {
  return (
    <g style={accentStyle(accent)}>
      <path
        d="M 600 172 L 750 218 V 336 C 750 448 696 508 600 544 C 504 508 450 448 450 336 V 218 Z"
        fill="white"
        fillOpacity={0.05}
        stroke="white"
        strokeOpacity={0.4}
        strokeWidth={2}
      />
      <path
        d="M 570 240 L 600 224 L 630 240 M 630 332 C 628 388 612 412 600 418 C 588 412 572 388 570 332 L 574 252"
        fill="none"
        stroke="currentColor"
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={600}
        cy={368}
        r={13}
        fill="none"
        stroke="currentColor"
        strokeWidth={7}
        opacity={0.8}
      />
      <path
        d="M 600 340 v 0 m 0 -4 v 10 m -13 12 q 13 -8 26 0"
        fill="none"
        stroke="currentColor"
        strokeWidth={7}
        strokeLinecap="round"
        opacity={0.9}
      />
      <circle
        cx={600}
        cy={296}
        r={52}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeDasharray="12 14"
        opacity={0.5}
      />
    </g>
  );
}

function DataGlyph({ accent }: { accent: ArtAccent }) {
  return (
    <g style={accentStyle(accent)}>
      <g stroke="white" strokeOpacity={0.1}>
        <path d="M 440 440 H 800 M 440 392 H 800 M 440 344 H 800" strokeWidth={1.5} />
      </g>
      <g fill="currentColor">
        <rect x={454} y={386} width={44} height={54} rx={8} opacity={0.4} />
        <rect x={518} y={344} width={44} height={96} rx={8} opacity={0.65} />
        <rect x={582} y={296} width={44} height={144} rx={8} opacity={0.85} />
        <rect x={646} y={248} width={44} height={192} rx={8} />
        <rect x={710} y={320} width={44} height={120} rx={8} opacity={0.5} />
      </g>
      <path
        d="M 442 436 Q 520 330 628 352 T 798 288"
        fill="none"
        stroke="white"
        strokeOpacity={0.55}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <circle cx={668} cy={246} r={7} fill="currentColor" />
      <rect
        x={760}
        y={150}
        width={72}
        height={120}
        rx={14}
        fill="white"
        fillOpacity={0.07}
        stroke="white"
        strokeOpacity={0.3}
      />
      <text
        x={796}
        y={196}
        fontSize={22}
        fontWeight={800}
        fill="white"
        fillOpacity={0.92}
        textAnchor="middle"
        fontFamily="Montserrat, sans-serif"
      >
        AI
      </text>
      <text
        x={796}
        y={226}
        fontSize={13}
        fill="currentColor"
        textAnchor="middle"
        fontFamily="Montserrat, sans-serif"
      >
        real-time
      </text>
    </g>
  );
}

function DesignGlyph({ accent }: { accent: ArtAccent }) {
  return (
    <g style={accentStyle(accent)}>
      <rect
        x={468}
        y={208}
        width={236}
        height={188}
        rx={18}
        fill="white"
        fillOpacity={0.05}
        stroke="white"
        strokeOpacity={0.4}
      />
      <g fill="currentColor">
        <rect x={516} y={264} width={46} height={28} rx={6} opacity={0.92} />
        <rect x={576} y={264} width={84} height={28} rx={6} opacity={0.75} />
        <rect x={516} y={304} width={102} height={28} rx={6} opacity={0.58} />
        <rect x={516} y={344} width={116} height={28} rx={6} opacity={0.42} />
      </g>
      <path
        d="M 468 208 L 566 168 L 640 236 L 512 318 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={468} cy={208} r={10} fill="currentColor" />
      <g fill="none" stroke="currentColor" strokeOpacity={0.5}>
        <circle cx={706} cy={158} r={44} strokeWidth={5} />
        <circle cx={728} cy={182} r={30} strokeWidth={5} />
        <circle cx={746} cy={204} r={18} strokeWidth={5} />
      </g>
    </g>
  );
}

function MobileGlyph({ accent }: { accent: ArtAccent }) {
  return (
    <g style={accentStyle(accent)}>
      <rect
        x={516}
        y={164}
        width={156}
        height={276}
        rx={30}
        fill="white"
        fillOpacity={0.05}
        stroke="white"
        strokeOpacity={0.45}
        strokeWidth={3}
      />
      <rect x={552} y={192} width={84} height={16} rx={8} fill="white" fillOpacity={0.14} />
      <g fill="currentColor">
        <rect x={538} y={248} width={52} height={54} rx={13} opacity={0.95} />
        <rect x={600} y={248} width={52} height={54} rx={13} opacity={0.6} />
        <rect x={538} y={316} width={104} height={26} rx={10} opacity={0.35} />
        <rect x={538} y={356} width={78} height={26} rx={10} opacity={0.22} />
      </g>
      <circle cx={594} cy={408} r={9} fill="white" fillOpacity={0.3} />
      <path
        d="M 682 292 Q 812 242 856 292"
        fill="none"
        stroke="currentColor"
        strokeWidth={8}
        strokeLinecap="round"
      />
      <rect x={836} y={306} width={36} height={22} rx={8} fill="currentColor" opacity={0.85} />
      <path
        d="M 856 292 q 0 62 -14 74"
        stroke="currentColor"
        strokeWidth={7}
        strokeLinecap="round"
        fill="none"
        opacity={0.7}
      />
    </g>
  );
}

function NetworkGlyph({ accent }: { accent: ArtAccent }) {
  return (
    <g style={accentStyle(accent)}>
      <g stroke="white" strokeOpacity={0.18} strokeWidth={2.6} fill="none">
        <path d="M 600 336 L 716 224" />
        <path d="M 600 336 L 452 254" />
        <path d="M 600 336 L 776 400" />
        <path d="M 600 336 L 452 410" />
        <path d="M 600 336 L 726 436" />
      </g>
      <g fill="white" fillOpacity={0.6}>
        <circle cx={716} cy={224} r={11} />
        <circle cx={452} cy={254} r={11} />
        <circle cx={776} cy={400} r={11} />
        <circle cx={452} cy={410} r={11} />
        <circle cx={726} cy={436} r={11} />
      </g>
      <circle cx={600} cy={336} r={58} fill="currentColor" opacity={0.92} />
      <circle cx={600} cy={336} r={28} fill="#101722" opacity={0.65} />
      <circle cx={600} cy={336} r={11} fill="white" />
    </g>
  );
}

function CommunityGlyph({ accent }: { accent: ArtAccent }) {
  const people = [
    { x: 526, y: 272 },
    { x: 604, y: 334 },
    { x: 688, y: 266 },
  ];
  return (
    <g style={accentStyle(accent)}>
      <g stroke="white" strokeOpacity={0.14} strokeWidth={2.4} fill="none">
        <path d="M 526 270 C 560 210 660 210 688 266" />
        <path d="M 362 404 C 430 470 620 500 780 396" />
      </g>
      {people.map((p, i) => (
        <g key={i}>
          <circle
            cx={p.x}
            cy={p.y}
            r={64}
            fill="white"
            fillOpacity={0.05}
            stroke="white"
            strokeOpacity={0.35}
            strokeWidth={2}
          />
          <circle
            cx={p.x}
            cy={p.y - 18}
            r={21}
            fill="currentColor"
            fillOpacity={[0.95, 0.6, 0.36][i]}
          />
          <rect
            x={p.x - 20}
            y={p.y + 26}
            width={40}
            height={40}
            rx={19}
            fill="currentColor"
            fillOpacity={[0.8, 0.5, 0.3][i]}
          />
        </g>
      ))}
      <path
        d="M 604 334 q -60 90 40 120 M 604 334 q 60 90 -40 120"
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.4}
        strokeWidth={2.4}
      />
    </g>
  );
}

function GraduateGlyph({ accent }: { accent: ArtAccent }) {
  return (
    <g style={accentStyle(accent)}>
      <path
        d="M 600 200 L 776 298 L 600 396 L 424 298 Z"
        fill="white"
        fillOpacity={0.06}
        stroke="white"
        strokeOpacity={0.42}
        strokeWidth={2.2}
      />
      <path
        d="M 424 298 L 600 396 M 600 396 L 600 200 M 600 200 L 776 298 M 776 298 L 776 242 M 776 242 L 600 242 M 600 242 L 600 216"
        fill="none"
        stroke="currentColor"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 600 276 C 590 330 580 358 556 372"
        fill="none"
        stroke="currentColor"
        strokeWidth={7}
        strokeLinecap="round"
        opacity={0.9}
      />
      <circle cx={546} cy={376} r={11} fill="currentColor" />
      <path
        d="M 600 316 l 46 20 M 646 336 v 22 l -46 -20 v -22 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinejoin="round"
        opacity={0.85}
      />
      <rect x={458} y={448} width={86} height={76} rx={12} fill="currentColor" opacity={0.32} />
      <rect x={656} y={448} width={86} height={76} rx={12} fill="currentColor" opacity={0.24} />
      <path
        d="M 468 486 q 0 60 132 60 q 132 0 132 -60"
        fill="none"
        stroke="currentColor"
        strokeWidth={4}
        strokeOpacity={0.5}
      />
    </g>
  );
}

function MarketGlyph({ accent }: { accent: ArtAccent }) {
  return (
    <g style={accentStyle(accent)}>
      <path d="M 424 480 H 824" stroke="white" strokeOpacity={0.2} strokeWidth={2} />
      <g fill="currentColor">
        <rect x={474} y={416} width={46} height={64} rx={4} opacity={0.4} />
        <rect x={544} y={372} width={46} height={108} rx={4} opacity={0.62} />
        <rect x={614} y={322} width={46} height={158} rx={4} opacity={0.85} />
        <rect x={684} y={432} width={46} height={48} rx={4} opacity={0.5} />
      </g>
      <path
        d="M 468 430 Q 560 350 642 374 T 786 300"
        fill="none"
        stroke="currentColor"
        strokeWidth={7}
        strokeLinecap="round"
      />
      <circle
        cx={736}
        cy={240}
        r={28}
        fill="white"
        fillOpacity={0.1}
        stroke="currentColor"
        strokeWidth={7}
      />
      <path
        d="M 726 244 l 9 9 l 17 -17"
        fill="none"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function TourGlyph({ accent }: { accent: ArtAccent }) {
  return (
    <g style={accentStyle(accent)}>
      <circle
        cx={712}
        cy={168}
        r={46}
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        opacity={0.85}
      />
      <circle cx={682} cy={140} r={10} fill="currentColor" opacity={0.9} />
      <circle
        cx={744}
        cy={202}
        r={20}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        opacity={0.5}
      />
      <g stroke="currentColor" strokeWidth={8} strokeLinecap="round" fill="none">
        <path d="M 600 396 L 600 292 L 676 292 L 676 396" />
        <path d="M 626 396 L 626 470" />
        <path d="M 650 396 L 650 470" />
      </g>
      <path
        d="M 668 246 L 720 286 M 720 286 l 0 -34 M 720 286 l -46 0"
        fill="none"
        stroke="currentColor"
        strokeWidth={7}
        strokeLinejoin="round"
      />
      <g stroke="currentColor" strokeWidth={7} strokeLinecap="round" fill="none" opacity={0.9}>
        <path d="M 468 470 V 340" />
        <path d="M 468 340 l 30 0" />
        <path d="M 498 470 V 470 l 0 -78 l 22 0 V 470" />
      </g>
      <g fill="currentColor" opacity={0.85}>
        <rect x={536} y={300} width={24} height={170} rx={5} />
        <rect x={760} y={330} width={20} height={140} rx={5} />
      </g>
      <path
        d="M 468 470 Q 560 500 720 470"
        fill="none"
        stroke="white"
        strokeOpacity={0.25}
        strokeWidth={3}
      />
      <g fill="white" fillOpacity={0.3}>
        <circle cx={560} cy={300} r={5} />
        <circle cx={770} cy={290} r={5} />
      </g>
    </g>
  );
}

const GLYPHS: Record<ArtVariant, (props: { accent: ArtAccent }) => ReactNode> = {
  code: CodeGlyph,
  cloud: CloudGlyph,
  shield: ShieldGlyph,
  data: DataGlyph,
  design: DesignGlyph,
  mobile: MobileGlyph,
  network: NetworkGlyph,
  community: CommunityGlyph,
  graduate: GraduateGlyph,
  market: MarketGlyph,
  tour: TourGlyph,
};

export interface SceneArtProps {
  variant?: ArtVariant;
  accent?: ArtAccent;
  className?: string;
  children?: ReactNode;
  labelled?: boolean;
}

export function SceneArt({
  variant = "code",
  accent,
  className,
  children,
  labelled = true,
}: SceneArtProps) {
  const base = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const id = {
    bg: `bg-${base}`,
    core: `core-${base}`,
    halo: `halo-${base}`,
  };
  const effectiveAccent = accent ?? DEFAULT_ACCENT[variant];
  const Glyph = GLYPHS[variant];
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden={labelled ? undefined : "true"}
        role={labelled ? "img" : undefined}
        aria-label={labelled ? VARIANT_LABEL[variant] : undefined}
        className="block h-full w-full"
      >
        <defs>
          <linearGradient id={id.bg} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0d1120" />
            <stop offset="0.55" stopColor="#181233" />
            <stop offset="1" stopColor="#2b1038" />
          </linearGradient>
          <radialGradient id={id.core} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="white" stopOpacity="0.12" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={id.halo} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={ACCENT_VAR[effectiveAccent]} stopOpacity="0.45" />
            <stop offset="1" stopColor={ACCENT_VAR[effectiveAccent]} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1200" height="800" fill={`url(#${id.bg})`} />
        <circle cx="600" cy="402" r="300" fill={`url(#${id.halo})`} />
        <Backdrop coreId={base} />
        <Glyph accent={effectiveAccent} />
      </svg>
      {children ? <div className="absolute inset-0">{children}</div> : null}
    </div>
  );
}
