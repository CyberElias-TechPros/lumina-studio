"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/next-compat/router";
import { cn } from "@/lib/utils";

type PartKey = "monitor" | "system" | "keyboard" | "mouse";

const PARTS: Record<
  PartKey,
  {
    number: string;
    name: string;
    role: string;
    tip: string;
  }
> = {
  monitor: {
    number: "01",
    name: "Monitor",
    role: "Shows what you are doing — windows, files, documents, and websites.",
    tip: "In class, we start by naming what is on the screen: desktop, taskbar, and open windows.",
  },
  system: {
    number: "02",
    name: "System Unit (or Laptop Base)",
    role: "The engine that runs programs, stores your folders, and connects power and cables.",
    tip: "Learn safe shutdown, USB flash ports, and how to tell sleep from power off.",
  },
  keyboard: {
    number: "03",
    name: "Keyboard",
    role: "Your tool for letters, numbers, shortcuts, and filling forms accurately.",
    tip: "Two sessions a week on the home row stops hunt-and-peck typing fast.",
  },
  mouse: {
    number: "04",
    name: "Mouse (or Touchpad)",
    role: "Points, selects, opens, and drags items across the screen with calm precision.",
    tip: "Left-click selects; double-click opens; right-click shows the menu of choices.",
  },
};

const PART_ORDER: PartKey[] = ["monitor", "system", "keyboard", "mouse"];

export function FourThingsDiagram({
  className,
  showPracticeLink = true,
}: {
  className?: string;
  showPracticeLink?: boolean;
}) {
  const [active, setActive] = useState<PartKey>("monitor");
  const current = PARTS[active];

  return (
    <figure
      className={cn(
        "cea-blueprint-grid border-border bg-card overflow-hidden rounded-2xl border p-5 sm:p-7",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-primary font-mono text-xs font-semibold tracking-wider uppercase">
            First-day blueprint · Lesson 01
          </p>
          <p className="font-display mt-1 text-lg font-semibold tracking-tight sm:text-xl">
            Four things. That is the whole machine.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Computer parts">
          {PART_ORDER.map((key) => {
            const p = PARTS[key];
            const isSelected = active === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActive(key)}
                className={cn(
                  "min-h-[36px] rounded-full border px-3 font-mono text-xs font-medium transition-colors",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {p.number} {p.name.split(" ")[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Crisp two-colour architectural line diagram */}
      <div className="border-border bg-background/85 mt-5 rounded-xl border p-4 sm:p-6">
        <svg
          viewBox="0 0 640 240"
          className="h-auto w-full"
          role="img"
          aria-label="Line diagram showing Monitor, System Unit, Keyboard, and Mouse"
        >
          {/* Connection bus hairlines */}
          <path
            d="M 225 140 L 265 140 L 265 100 L 340 100"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.22"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M 300 186 L 340 186 L 340 140"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.22"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M 435 190 L 490 190"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.22"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* 01 Monitor */}
          <g
            onClick={() => setActive("monitor")}
            onMouseEnter={() => setActive("monitor")}
            className="cursor-pointer"
          >
            <rect
              x="44"
              y="26"
              width="180"
              height="112"
              rx="8"
              fill={
                active === "monitor"
                  ? "color-mix(in oklch, var(--primary) 10%, transparent)"
                  : "transparent"
              }
              stroke={active === "monitor" ? "var(--primary)" : "currentColor"}
              strokeOpacity={active === "monitor" ? 1 : 0.55}
              strokeWidth={active === "monitor" ? 2.2 : 1.5}
            />
            <rect
              x="56"
              y="38"
              width="156"
              height="84"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="1.2"
            />
            <path
              d="M 118 138 L 118 156 M 150 138 L 150 156 M 96 156 L 172 156"
              fill="none"
              stroke={active === "monitor" ? "var(--primary)" : "currentColor"}
              strokeOpacity={active === "monitor" ? 1 : 0.55}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <text
              x="62"
              y="58"
              fill={active === "monitor" ? "var(--primary)" : "currentColor"}
              fontSize="11"
              fontFamily="monospace"
              fontWeight="700"
            >
              01 MONITOR
            </text>
            <line
              x1="62"
              y1="72"
              x2="160"
              y2="72"
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="1.5"
            />
            <line
              x1="62"
              y1="84"
              x2="136"
              y2="84"
              stroke="currentColor"
              strokeOpacity="0.22"
              strokeWidth="1.5"
            />
          </g>

          {/* 02 System Unit */}
          <g
            onClick={() => setActive("system")}
            onMouseEnter={() => setActive("system")}
            className="cursor-pointer"
          >
            <rect
              x="342"
              y="26"
              width="86"
              height="136"
              rx="8"
              fill={
                active === "system"
                  ? "color-mix(in oklch, var(--primary) 10%, transparent)"
                  : "transparent"
              }
              stroke={active === "system" ? "var(--primary)" : "currentColor"}
              strokeOpacity={active === "system" ? 1 : 0.55}
              strokeWidth={active === "system" ? 2.2 : 1.5}
            />
            <line
              x1="358"
              y1="56"
              x2="412"
              y2="56"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="1.5"
            />
            <line
              x1="358"
              y1="68"
              x2="412"
              y2="68"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />
            <circle
              cx="385"
              cy="126"
              r="11"
              fill="none"
              stroke={active === "system" ? "var(--primary)" : "currentColor"}
              strokeOpacity={active === "system" ? 1 : 0.55}
              strokeWidth="1.5"
            />
            <circle
              cx="385"
              cy="126"
              r="3"
              fill={active === "system" ? "var(--primary)" : "currentColor"}
            />
            <text
              x="354"
              y="44"
              fill={active === "system" ? "var(--primary)" : "currentColor"}
              fontSize="10.5"
              fontFamily="monospace"
              fontWeight="700"
            >
              02 SYSTEM
            </text>
          </g>

          {/* 03 Keyboard */}
          <g
            onClick={() => setActive("keyboard")}
            onMouseEnter={() => setActive("keyboard")}
            className="cursor-pointer"
          >
            <rect
              x="160"
              y="174"
              width="274"
              height="44"
              rx="7"
              fill={
                active === "keyboard"
                  ? "color-mix(in oklch, var(--primary) 10%, transparent)"
                  : "transparent"
              }
              stroke={active === "keyboard" ? "var(--primary)" : "currentColor"}
              strokeOpacity={active === "keyboard" ? 1 : 0.55}
              strokeWidth={active === "keyboard" ? 2.2 : 1.5}
            />
            <line
              x1="176"
              y1="190"
              x2="416"
              y2="190"
              stroke="currentColor"
              strokeOpacity="0.28"
              strokeWidth="4"
              strokeDasharray="10 6"
            />
            <line
              x1="214"
              y1="204"
              x2="364"
              y2="204"
              stroke={active === "keyboard" ? "var(--primary)" : "currentColor"}
              strokeOpacity={active === "keyboard" ? 0.85 : 0.35}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <text
              x="174"
              y="168"
              fill={active === "keyboard" ? "var(--primary)" : "currentColor"}
              fontSize="10.5"
              fontFamily="monospace"
              fontWeight="700"
            >
              03 KEYBOARD
            </text>
          </g>

          {/* 04 Mouse */}
          <g
            onClick={() => setActive("mouse")}
            onMouseEnter={() => setActive("mouse")}
            className="cursor-pointer"
          >
            <rect
              x="492"
              y="160"
              width="48"
              height="62"
              rx="22"
              fill={
                active === "mouse"
                  ? "color-mix(in oklch, var(--primary) 10%, transparent)"
                  : "transparent"
              }
              stroke={active === "mouse" ? "var(--primary)" : "currentColor"}
              strokeOpacity={active === "mouse" ? 1 : 0.55}
              strokeWidth={active === "mouse" ? 2.2 : 1.5}
            />
            <line
              x1="516"
              y1="160"
              x2="516"
              y2="188"
              stroke="currentColor"
              strokeOpacity="0.4"
              strokeWidth="1.5"
            />
            <line
              x1="492"
              y1="188"
              x2="540"
              y2="188"
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="1.2"
            />
            <text
              x="484"
              y="150"
              fill={active === "mouse" ? "var(--primary)" : "currentColor"}
              fontSize="10.5"
              fontFamily="monospace"
              fontWeight="700"
            >
              04 MOUSE
            </text>
          </g>
        </svg>
      </div>

      {/* Interactive classroom explanation readout */}
      <div className="border-border bg-background mt-4 flex flex-col justify-between gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-xs font-semibold tracking-wider text-primary uppercase">
            Part {current.number} · {current.name}
          </p>
          <p className="text-foreground mt-1 text-sm font-medium">{current.role}</p>
          <p className="text-muted-foreground mt-1 text-xs leading-relaxed">{current.tip}</p>
        </div>
        {showPracticeLink && (
          <Link
            to="/practice/computer-basics"
            className="text-primary inline-flex min-h-[40px] shrink-0 items-center gap-1.5 text-xs font-semibold whitespace-nowrap hover:underline"
          >
            Try beginner lab
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        )}
      </div>
    </figure>
  );
}
