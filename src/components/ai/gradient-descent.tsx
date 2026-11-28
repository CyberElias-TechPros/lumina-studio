"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw, StepForward, Play, Pause, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Interactive gradient-descent lab — CEA's reimagining of the "Gradient
 * descent" lab in AI Engineering from Scratch (MIT © 2026 Rohit Ghumare).
 * Loss: L(x) = (x − 2)², so the true gradient is 2(x − 2) and the update is
 * stable for learning rates below 1.0 — push the slider past 1.0 and watch
 * the run diverge, exactly the lesson the source teaches with λ_max.
 */

const MIN_X = -6;
const MAX_X = 10;
const MINIMA = 2;
const STARTS = Array.from({ length: 20 }, (_, i) => -5.5 + (i * 14) / 19);

const loss = (x: number) => (x - MINIMA) ** 2;
const gradient = (x: number) => 2 * (x - MINIMA);

export function GradientDescentLab() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [learningRate, setLearningRate] = useState(0.22);
  const [points, setPoints] = useState<number[]>(STARTS);
  const [epoch, setEpoch] = useState(0);
  const [running, setRunning] = useState(false);
  const [diverged, setDiverged] = useState(false);
  const pointsRef = useRef(points);
  pointsRef.current = points;

  const meanLoss = points.reduce((sum, x) => sum + loss(x), 0) / points.length;

  const step = useCallback(() => {
    if (diverged) return;
    setPoints((current) => {
      const next = current.map((x) => x - learningRate * gradient(x));
      const blown = next.some((x) => !Number.isFinite(x) || Math.abs(x) > 1e6);
      if (blown) {
        setDiverged(true);
        setRunning(false);
        return current.map(() => Number.NaN);
      }
      return next;
    });
    setEpoch((e) => e + 1);
  }, [learningRate, diverged]);

  const reset = useCallback(() => {
    setPoints(STARTS);
    setEpoch(0);
    setRunning(false);
    setDiverged(false);
  }, []);

  useEffect(() => {
    if (!running || diverged) return;
    const id = window.setInterval(step, 420);
    return () => window.clearInterval(id);
  }, [running, step, diverged]);

  // Repaint the landscape on every state change.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const toX = (x: number) => ((x - MIN_X) / (MAX_X - MIN_X)) * (width - 32) + 16;
    const maxY = loss(MIN_X);
    const toY = (y: number) => height - 28 - (Math.min(y, maxY) / maxY) * (height - 48);

    // Grid hairlines
    ctx.strokeStyle = "rgba(148,190,255,0.09)";
    ctx.lineWidth = 1;
    for (let gx = MIN_X; gx <= MAX_X; gx += 2) {
      ctx.beginPath();
      ctx.moveTo(toX(gx), 8);
      ctx.lineTo(toX(gx), height - 20);
      ctx.stroke();
    }

    // Loss curve
    ctx.beginPath();
    for (let x = MIN_X; x <= MAX_X; x += 0.05) {
      const px = toX(x);
      const py = toY(loss(x));
      if (x === MIN_X) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = "rgba(126,181,255,0.85)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Minimum marker
    ctx.fillStyle = "#34d399";
    ctx.beginPath();
    ctx.arc(toX(MINIMA), toY(0), 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = "10px 'Geist Mono', monospace";
    ctx.fillStyle = "rgba(52,211,153,0.9)";
    ctx.fillText("minimum", toX(MINIMA) + 8, toY(0) + 3);

    // Starting baseline ghosts
    ctx.fillStyle = "rgba(125,148,181,0.35)";
    for (const x of STARTS) {
      ctx.beginPath();
      ctx.arc(toX(x), toY(loss(x)), 2.4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Live points
    pointsRef.current.forEach((x, i) => {
      if (!Number.isFinite(x)) return;
      const px = toX(Math.max(MIN_X, Math.min(MAX_X, x)));
      const py = toY(loss(x));
      ctx.beginPath();
      ctx.arc(px, py, 4.4, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? "#8ec4ff" : "#c4b0ff";
      ctx.shadowColor = i % 2 === 0 ? "#2f6bff" : "#8b5cf6";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }, [points, epoch]);

  return (
    <div className="border-white/12 overflow-hidden rounded-xl border bg-[#070d1d] text-[#eef2fb] shadow-[0_24px_70px_-32px_rgba(0,0,0,0.8)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="size-2 rounded-full bg-[#f87171]" aria-hidden="true" />
          <span className="size-2 rounded-full bg-[#fbbf24]" aria-hidden="true" />
          <span className="size-2 rounded-full bg-[#34d399]" aria-hidden="true" />
          <span className="ml-2 font-mono text-[10px] tracking-[0.22em] text-[#7fb5ff] uppercase">
            gradient-descent · live lab
          </span>
        </div>
        <p className="font-mono text-[10px] tracking-[0.22em] text-[#61759a] uppercase">
          L(x) = (x − 2)²
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative h-64 sm:h-80">
          <canvas
            ref={canvasRef}
            className="size-full"
            aria-label="Parabola of the loss function with 20 points descending toward the minimum"
            role="img"
          />
          {diverged && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#050b1c]/78 backdrop-blur-[2px]">
              <TriangleAlert className="size-7 text-[#f87171]" aria-hidden="true" />
              <p className="font-display text-lg font-semibold text-[#f87171]">Run diverged</p>
              <p className="max-w-55 text-center text-xs leading-relaxed text-[#b9c8e2]">
                With η ≥ 1 every step overshoots the minimum. Lower the learning rate and try again.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 border-t border-white/8 p-5 sm:p-6 lg:border-t-0 lg:border-l">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[9px] tracking-[0.24em] text-[#7d94b5] uppercase">
                Mean loss
              </p>
              <p className="font-display mt-1 text-4xl font-semibold tracking-tight tabular-nums">
                {diverged ? "∞" : meanLoss < 0.0005 ? "≈ 0" : meanLoss.toFixed(4)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[9px] tracking-[0.24em] text-[#7d94b5] uppercase">
                Epoch
              </p>
              <p className="font-display mt-1 text-4xl font-semibold tracking-tight tabular-nums">
                {epoch}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-3">
              <label
                htmlFor="lr"
                className="font-mono text-[9px] tracking-[0.24em] text-[#7d94b5] uppercase"
              >
                Learning rate η
              </label>
              <span className="font-mono text-xs text-[#8ec4ff] tabular-nums">
                {learningRate.toFixed(2)}
              </span>
            </div>
            <input
              id="lr"
              type="range"
              min={0.01}
              max={1.2}
              step={0.01}
              value={learningRate}
              onChange={(event) => {
                setLearningRate(Number(event.target.value));
                reset();
              }}
              className="mt-2 w-full accent-[#2f6bff]"
              aria-valuetext={`${learningRate.toFixed(2)}`}
            />
            <div className="mt-1 flex justify-between font-mono text-[8px] tracking-[0.18em] text-[#4b5b7d] uppercase">
              <span>Safe &amp; slow</span>
              <span>η &lt; 1 stable</span>
              <span>Diverges</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => (diverged ? reset() : setRunning((v) => !v))}
              className={cn(
                "inline-flex h-11 cursor-pointer items-center gap-2 rounded-full px-5 text-sm font-semibold text-[#0a1120] transition-all hover:-translate-y-0.5",
                diverged ? "bg-[#fbbf24]" : "bg-[#f2f6ff]",
              )}
            >
              {diverged ? (
                <>
                  <RotateCcw className="size-4" /> Reset run
                </>
              ) : running ? (
                <>
                  <Pause className="size-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="size-4" /> Run descent
                </>
              )}
            </button>
            <button
              type="button"
              onClick={step}
              disabled={running || diverged}
              className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold text-white transition-all hover:border-white/45 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <StepForward className="size-4" /> Step
            </button>
            <button
              type="button"
              onClick={reset}
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-white/20 text-white transition-all hover:border-white/45"
              aria-label="Reset points"
            >
              <RotateCcw className="size-4" />
            </button>
          </div>

          <p className="border-t border-white/8 pt-4 text-[11px] leading-relaxed text-[#8ba3c7]">
            Twenty points start on the left and step against the gradient each epoch. Below η = 1
            the run settles into the minimum; at or above it, each step overshoots and the loss
            explodes — the exact stability bound (η &lt; 2/λ<span className="align-sub">max</span>)
            the source curriculum derives in Phase 01.
          </p>
        </div>
      </div>
    </div>
  );
}
