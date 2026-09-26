/**
 * Assignment deadlines. `due_at` (ISO-8601 UTC) is the source of truth for
 * scheduling; `due` is a display string rendered in West Africa Time.
 *
 * `parseDueText` understands the legacy free-text formats already in the
 * database so they can be backfilled where unambiguous:
 *   ISO strings · "2026-10-03" · "2026-10-03 17:00" · "Aug 12" · "12 Aug 2026 23:59"
 *   "Today 23:59" · "Tomorrow 17:00" · "Sun · 23:59" / "Fri 5pm"  (relative to `ref`)
 * Unparseable text returns null (the row simply isn't scheduled).
 */

const WAT_OFFSET_MIN = 60;
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

/** Build a UTC Date from a WAT wall-clock time. */
function fromWat(y: number, mo: number, d: number, h: number, mi: number): Date {
  return new Date(Date.UTC(y, mo, d, h, mi) - WAT_OFFSET_MIN * 60_000);
}

function watParts(date: Date) {
  const w = new Date(date.getTime() + WAT_OFFSET_MIN * 60_000);
  return { y: w.getUTCFullYear(), mo: w.getUTCMonth(), d: w.getUTCDate(), dow: w.getUTCDay() };
}

function parseTime(text: string): { h: number; m: number } | null {
  // Only tokens with ":mm" or am/pm count as times — bare numbers are days.
  for (const m of text.matchAll(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/gi)) {
    if (!m[2] && !m[3]) continue;
    let h = Number(m[1]);
    const mi = m[2] ? Number(m[2]) : 0;
    const ap = m[3]?.toLowerCase();
    if (ap === "pm" && h < 12) h += 12;
    if (ap === "am" && h === 12) h = 0;
    if (h > 23 || mi > 59) continue;
    return { h, m: mi };
  }
  return null;
}

export function parseDueText(
  text: string | null | undefined,
  ref: Date = new Date(),
  opts: { allowRelative?: boolean } = {},
): string | null {
  const allowRelative = opts.allowRelative ?? true;
  if (!text) return null;
  const raw = text.trim();
  if (!raw) return null;

  // ISO with explicit time/zone.
  if (/^\d{4}-\d{2}-\d{2}T/.test(raw)) {
    const d = new Date(raw);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  }
  // "2026-10-03" or "2026-10-03 17:00" (WAT).
  const isoDay = raw.match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](.+))?$/);
  if (isoDay) {
    const t = isoDay[4] ? parseTime(isoDay[4]) : { h: 23, m: 59 };
    if (!t) return null;
    return fromWat(
      Number(isoDay[1]),
      Number(isoDay[2]) - 1,
      Number(isoDay[3]),
      t.h,
      t.m,
    ).toISOString();
  }

  const lower = raw.toLowerCase().replace(/[·,]/g, " ").replace(/\s+/g, " ");
  const time = parseTime(lower.replace(/\b\d{4}\b/, "")) ?? { h: 23, m: 59 };
  const now = watParts(ref);

  const relative =
    lower.startsWith("today") ||
    lower.startsWith("tomorrow") ||
    DAYS.some((d) => lower.startsWith(d));
  const hasMonth = MONTHS.some((mo) => new RegExp(`\\b${mo}`).test(lower));
  if (relative && !hasMonth && !allowRelative) return null;

  if (lower.startsWith("today")) return fromWat(now.y, now.mo, now.d, time.h, time.m).toISOString();
  if (lower.startsWith("tomorrow"))
    return fromWat(now.y, now.mo, now.d + 1, time.h, time.m).toISOString();

  // "12 Aug [2026]" or "Aug 12[, 2026]".
  const monthIdx = MONTHS.findIndex((mo) => new RegExp(`\\b${mo}`).test(lower));
  if (monthIdx >= 0) {
    const dayMatch =
      lower.match(new RegExp(`\\b(\\d{1,2})\\s+${MONTHS[monthIdx]}`)) ??
      lower.match(new RegExp(`${MONTHS[monthIdx]}[a-z]*\\s+(\\d{1,2})\\b`));
    if (!dayMatch) return null;
    const yearMatch = lower.match(/\b(20\d{2})\b/);
    let year = yearMatch ? Number(yearMatch[1]) : now.y;
    let candidate = fromWat(year, monthIdx, Number(dayMatch[1]), time.h, time.m);
    // No explicit year and already >60 days past → the deadline is next year.
    if (!yearMatch && candidate.getTime() < ref.getTime() - 60 * 86_400_000) {
      year += 1;
      candidate = fromWat(year, monthIdx, Number(dayMatch[1]), time.h, time.m);
    }
    return candidate.toISOString();
  }

  // Weekday → next occurrence (today counts if the time hasn't passed).
  const dow = DAYS.findIndex((d) => lower.startsWith(d));
  if (dow >= 0) {
    let add = (dow - now.dow + 7) % 7;
    let candidate = fromWat(now.y, now.mo, now.d + add, time.h, time.m);
    if (candidate.getTime() <= ref.getTime()) {
      add += 7;
      candidate = fromWat(now.y, now.mo, now.d + add, time.h, time.m);
    }
    return candidate.toISOString();
  }
  return null;
}

/** Display string in WAT, e.g. "Fri 3 Oct, 23:59". */
export function formatDueWat(iso: string): string {
  const w = new Date(new Date(iso).getTime() + WAT_OFFSET_MIN * 60_000);
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][w.getUTCDay()];
  const mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][
    w.getUTCMonth()
  ];
  const hh = String(w.getUTCHours()).padStart(2, "0");
  const mm = String(w.getUTCMinutes()).padStart(2, "0");
  return `${day} ${w.getUTCDate()} ${mon}, ${hh}:${mm}`;
}
