export type CohortCalendarInput = {
  id: string;
  label: string;
  startDate: string;
  days: string;
  timeSlot: "morning" | "afternoon" | "evening" | "any";
  mode: "onsite" | "online" | "hybrid";
};

const TIME_SLOTS: Record<CohortCalendarInput["timeSlot"], { hour: number; minute: number }> = {
  morning: { hour: 9, minute: 0 },
  afternoon: { hour: 13, minute: 0 },
  evening: { hour: 17, minute: 0 },
  any: { hour: 10, minute: 0 },
};

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function foldIcsLine(line: string): string {
  const encoder = new TextEncoder();
  const folded: string[] = [];
  let current = "";
  let byteLength = 0;

  for (const character of line) {
    const characterLength = encoder.encode(character).length;
    if (byteLength + characterLength > 75 && current) {
      folded.push(current);
      current = ` ${character}`;
      byteLength = 1 + characterLength;
    } else {
      current += character;
      byteLength += characterLength;
    }
  }

  if (current) folded.push(current);
  return folded.join("\r\n");
}

function formatUtcStamp(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

/** Create an iCalendar invite from the actual cohort record shown in the UI. */
export function createCohortCalendarIcs(
  cohort: CohortCalendarInput,
  origin = "https://cea.ng",
): string {
  const startUtc = new Date(`${cohort.startDate}T00:00:00.000Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(cohort.startDate) ||
    Number.isNaN(startUtc.getTime()) ||
    startUtc.toISOString().slice(0, 10) !== cohort.startDate
  ) {
    throw new Error("The cohort does not have a valid start date.");
  }

  const slot = TIME_SLOTS[cohort.timeSlot];
  startUtc.setUTCHours(slot.hour - 1, slot.minute, 0, 0); // Lagos is UTC+1 year round.
  const endUtc = new Date(startUtc.getTime() + 2 * 60 * 60 * 1000);
  const uid = cohort.id.replace(/[^a-z0-9.-]/gi, "-");
  const location =
    cohort.mode === "online" ? "Online" : "24/26 Ebony Road, Off Rumuola Road, Port Harcourt";
  const description = `${cohort.days} · ${String(slot.hour).padStart(2, "0")}:${String(slot.minute).padStart(2, "0")} WAT · ${cohort.mode}. This invite marks the first class day; contact admissions to confirm any changes. Details: ${origin}/apply`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Cyber Elias Academy//Cohorts//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:cea-cohort-${uid}@cea.ng`,
    `DTSTAMP:${formatUtcStamp(new Date())}`,
    `DTSTART:${formatUtcStamp(startUtc)}`,
    `DTEND:${formatUtcStamp(endUtc)}`,
    `SUMMARY:${escapeIcsText(`${cohort.label} — first class day (Cyber Elias Academy)`)}`,
    `LOCATION:${escapeIcsText(location)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.map(foldIcsLine).join("\r\n");
}

/** Download an invite in the browser without depending on a separately configured API host. */
export function downloadCohortCalendar(cohort: CohortCalendarInput): void {
  const ics = createCohortCalendarIcs(cohort, window.location.origin);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const filename = cohort.label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  link.href = url;
  link.download = `cea-${filename || "cohort"}-${cohort.startDate}.ics`;
  link.hidden = true;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}
