import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";
import type { BusinessProfile } from "./business.ts";
import { businessAddressLines } from "./business.ts";
import { amountInWords, formatMoney, koboToUnits } from "./money.ts";

/**
 * Document rendering with pdf-lib.
 *
 * pdf-lib's built-in fonts are WinAnsi-encoded and have no glyph for `₦`, so
 * every string is passed through `pdfText()`, which swaps the Naira sign for the
 * ISO code. Embedding a Unicode TTF would fix the glyph but adds a ~400 KB asset
 * and a font-licensing question; the ISO code is the conventional choice on
 * Nigerian commercial invoices anyway.
 */

const PAGE = { width: 595.28, height: 841.89, margin: 42 };

const INK = rgb(0.09, 0.11, 0.15);
const MUTED = rgb(0.42, 0.45, 0.5);
const LINE = rgb(0.85, 0.87, 0.89);
const ACCENT = rgb(0.05, 0.36, 0.28);
const SOFT = rgb(0.96, 0.97, 0.97);

export interface PdfLine {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface InvoicePdfInput {
  kind: "invoice" | "waybill" | "purchase";
  title: string;
  number: string;
  issueDate: string;
  dueDate?: string | null;
  status: string;
  business: BusinessProfile;
  counterpartyLabel: string;
  counterparty: {
    name: string;
    contactPerson?: string | null;
    addressLine1?: string | null;
    city?: string | null;
    state?: string | null;
    phone?: string | null;
    email?: string | null;
    rcNumber?: string | null;
  };
  lines: PdfLine[];
  subtotal: number;
  discount?: number;
  taxLabel?: string;
  taxAmount?: number;
  shipping?: number;
  total: number;
  paidAmount?: number;
  balance?: number;
  notes?: string | null;
  terms?: string | null;
  /** Optional extra key/value block, e.g. waybill carrier + tracking. */
  meta?: Array<[string, string]>;
  /** Extra columns for waybills (serial, weight). */
  extraColumns?: Array<{ header: string; values: string[] }>;
}

function pdfText(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value);
  return s
    .replace(/₦/g, "NGN ")
    .replace(/[\u2000-\u200f\u2028\u2029]/g, " ")
    .replace(/[\u0000-\u0008\u000b-\u001f]/g, "");
}

/** Wrap text to fit `maxWidth`, returning at most `maxLines` lines. */
function wrap(text: string, font: PDFFont, size: number, maxWidth: number, maxLines = 3): string[] {
  const words = pdfText(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
      if (lines.length === maxLines - 1) break;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  // Indicate truncation rather than silently dropping content.
  if (lines.length === maxLines && words.join(" ").length > lines.join(" ").length) {
    lines[maxLines - 1] = `${lines[maxLines - 1]!.slice(0, -1)}…`;
  }
  return lines.length ? lines : [""];
}

interface Cursor {
  y: number;
}

function drawText(
  page: PDFPage,
  text: string,
  opts: { x: number; y: number; size: number; font: PDFFont; color?: ReturnType<typeof rgb>; align?: "left" | "right"; maxWidth?: number },
): void {
  const value = pdfText(text);
  const width = opts.font.widthOfTextAtSize(value, opts.size);
  const x = opts.align === "right" ? opts.x - width : opts.x;
  page.drawText(value, { x, y: opts.y, size: opts.size, font: opts.font, color: opts.color ?? INK });
}

/**
 * Ensure the next `needed` points fit, otherwise start a new page.
 * Returns the page to keep drawing on (the same one, or a fresh continuation).
 */
function ensureSpace(pdf: PDFDocument, cursor: Cursor, needed: number, current: PDFPage): PDFPage {
  if (cursor.y - needed < PAGE.margin + 40) {
    const next = pdf.addPage([PAGE.width, PAGE.height]);
    cursor.y = PAGE.height - PAGE.margin;
    return next;
  }
  return current;
}

export async function renderDocumentPdf(input: InvoicePdfInput): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setAuthor(pdfText(input.business.name));
  pdf.setTitle(`${input.title} ${input.number}`);
  pdf.setProducer("Delgra Ledger");
  pdf.setCreationDate(new Date());

  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const oblique = await pdf.embedFont(StandardFonts.HelveticaOblique);

  let page = pdf.addPage([PAGE.width, PAGE.height]);
  const cursor: Cursor = { y: PAGE.height - PAGE.margin };
  const left = PAGE.margin;
  const right = PAGE.width - PAGE.margin;
  const contentWidth = right - left;
  const b = input.business;
  const money = (kobo: number) =>
    formatMoney(kobo, b.currencySymbol, b.currency === "NGN" ? undefined : b.currency);

  /* ------------------------------------------------------------ header band */
  page.drawRectangle({ x: 0, y: PAGE.height - 8, width: PAGE.width, height: 8, color: ACCENT });

  drawText(page, b.name, { x: left, y: cursor.y - 14, size: 19, font: bold, color: ACCENT });
  let headerY = cursor.y - 30;
  for (const line of businessAddressLines(b)) {
    drawText(page, line, { x: left, y: headerY, size: 8.5, font, color: MUTED });
    headerY -= 11;
  }
  const contactBits = [b.phone, b.email, b.website].filter(Boolean) as string[];
  if (contactBits.length) {
    drawText(page, contactBits.join("  ·  "), { x: left, y: headerY, size: 8.5, font, color: MUTED });
    headerY -= 11;
  }
  const regBits = [b.rcNumber ? `RC: ${b.rcNumber}` : null, b.tin ? `TIN: ${b.tin}` : null].filter(
    Boolean,
  ) as string[];
  if (regBits.length) {
    drawText(page, regBits.join("   "), { x: left, y: headerY, size: 8.5, font, color: MUTED });
    headerY -= 11;
  }

  // Document title + number, right aligned.
  drawText(page, input.title.toUpperCase(), { x: right, y: cursor.y - 14, size: 19, font: bold, align: "right" });
  drawText(page, input.number, { x: right, y: cursor.y - 30, size: 11, font: bold, align: "right", color: ACCENT });
  const statusLabel = input.status.replace(/_/g, " ");
  drawText(page, statusLabel.toUpperCase(), { x: right, y: cursor.y - 44, size: 8.5, font: bold, align: "right", color: MUTED });

  cursor.y = Math.min(headerY, cursor.y - 52) - 14;

  /* ------------------------------------------------------- counterparty/meta */
  const colWidth = contentWidth / 2 - 10;

  drawText(page, input.counterpartyLabel.toUpperCase(), { x: left, y: cursor.y, size: 8, font: bold, color: MUTED });
  let cy = cursor.y - 14;
  drawText(page, input.counterparty.name, { x: left, y: cy, size: 11, font: bold });
  cy -= 13;
  const cpLines = [
    input.counterparty.contactPerson,
    input.counterparty.addressLine1,
    [input.counterparty.city, input.counterparty.state].filter(Boolean).join(", ") || null,
    input.counterparty.phone,
    input.counterparty.email,
    input.counterparty.rcNumber ? `RC: ${input.counterparty.rcNumber}` : null,
  ].filter(Boolean) as string[];
  for (const line of cpLines) {
    drawText(page, line, { x: left, y: cy, size: 9, font, color: MUTED, maxWidth: colWidth });
    cy -= 11;
  }

  const metaRows: Array<[string, string]> = [
    ["Date", formatDate(input.issueDate)],
    ...(input.dueDate ? ([["Due", formatDate(input.dueDate)]] as Array<[string, string]>) : []),
    ...(input.meta ?? []),
  ];
  const metaX = right - colWidth;
  drawText(page, "DETAILS", { x: metaX, y: cursor.y, size: 8, font: bold, color: MUTED });
  let my = cursor.y - 14;
  for (const [label, value] of metaRows) {
    drawText(page, label, { x: metaX, y: my, size: 9, font, color: MUTED });
    drawText(page, value, { x: right, y: my, size: 9, font: bold, align: "right" });
    my -= 12;
  }

  cursor.y = Math.min(cy, my) - 16;

  /* ----------------------------------------------------------------- table */
  const hasExtra = Boolean(input.extraColumns?.length);
  const numCol = 24;
  const qtyCol = 44;
  const unitCol = 84;
  const amountCol = 92;
  const extraColWidth = hasExtra ? 96 : 0;
  const descWidth = contentWidth - numCol - qtyCol - unitCol - amountCol - extraColWidth - 12;

  const headerYPos = cursor.y;
  page.drawRectangle({ x: left, y: headerYPos - 4, width: contentWidth, height: 18, color: SOFT });
  drawText(page, "#", { x: left + 6, y: headerYPos + 2, size: 8, font: bold, color: MUTED });
  drawText(page, "DESCRIPTION", { x: left + numCol, y: headerYPos + 2, size: 8, font: bold, color: MUTED });
  if (hasExtra) {
    drawText(page, input.extraColumns![0]!.header.toUpperCase(), {
      x: left + numCol + descWidth + 8,
      y: headerYPos + 2,
      size: 8,
      font: bold,
      color: MUTED,
    });
  }
  drawText(page, "QTY", { x: left + contentWidth - qtyCol - unitCol - amountCol + 4, y: headerYPos + 2, size: 8, font: bold, color: MUTED });
  drawText(page, "UNIT PRICE", {
    x: left + contentWidth - unitCol - amountCol - 4,
    y: headerYPos + 2,
    size: 8,
    font: bold,
    color: MUTED,
    align: "right",
  });
  drawText(page, "AMOUNT", { x: right - 6, y: headerYPos + 2, size: 8, font: bold, color: MUTED, align: "right" });

  cursor.y = headerYPos - 12;

  input.lines.forEach((line, index) => {
    const rowHeight = 20;
    page = ensureSpace(pdf, cursor, rowHeight + 10, page);

    if (index % 2 === 1) {
      page.drawRectangle({ x: left, y: cursor.y - 8, width: contentWidth, height: rowHeight, color: rgb(0.985, 0.99, 0.99) });
    }

    drawText(page, String(index + 1), { x: left + 6, y: cursor.y, size: 9, font, color: MUTED });

    const descLines = wrap(line.description, font, 9, descWidth, 2);
    descLines.forEach((text, li) => {
      drawText(page, text, { x: left + numCol, y: cursor.y - li * 10, size: 9, font });
    });

    if (hasExtra) {
      const extraValue = input.extraColumns![0]!.values[index] ?? "";
      drawText(page, extraValue, {
        x: left + numCol + descWidth + 8,
        y: cursor.y,
        size: 8.5,
        font,
        color: MUTED,
        maxWidth: extraColWidth,
      });
    }

    const qtyX = left + contentWidth - qtyCol - unitCol - amountCol + 4;
    drawText(page, String(line.quantity), { x: qtyX, y: cursor.y, size: 9, font });
    drawText(page, money(line.unitPrice), {
      x: left + contentWidth - unitCol - amountCol - 4,
      y: cursor.y,
      size: 9,
      font,
      align: "right",
    });
    drawText(page, money(line.amount), { x: right - 6, y: cursor.y, size: 9, font: bold, align: "right" });

    cursor.y -= rowHeight;
    page.drawLine({
      start: { x: left, y: cursor.y + 6 },
      end: { x: right, y: cursor.y + 6 },
      thickness: 0.4,
      color: LINE,
    });
  });

  /* ---------------------------------------------------------------- totals */
  cursor.y -= 8;
  page = ensureSpace(pdf, cursor, 150, page);

  const totalsX = right - 210;
  const valueX = right;
  const totalRow = (label: string, value: string, emphasis = false): void => {
    drawText(page, label, {
      x: totalsX,
      y: cursor.y,
      size: emphasis ? 10.5 : 9,
      font: emphasis ? bold : font,
      color: emphasis ? INK : MUTED,
    });
    drawText(page, value, {
      x: valueX,
      y: cursor.y,
      size: emphasis ? 10.5 : 9,
      font: emphasis ? bold : font,
      align: "right",
      color: emphasis ? INK : MUTED,
    });
    cursor.y -= emphasis ? 20 : 14;
  };

  totalRow("Subtotal", money(input.subtotal));
  if (input.discount && input.discount > 0) totalRow("Discount", `- ${money(input.discount)}`);
  if (input.taxAmount && input.taxAmount > 0) {
    totalRow(input.taxLabel ? `${input.taxLabel}` : "Tax", money(input.taxAmount));
  }
  if (input.shipping && input.shipping > 0) totalRow("Shipping / handling", money(input.shipping));

  page.drawLine({ start: { x: totalsX, y: cursor.y + 10 }, end: { x: valueX, y: cursor.y + 10 }, thickness: 0.8, color: INK });
  totalRow("TOTAL", money(input.total), true);

  if (typeof input.paidAmount === "number" && input.paidAmount > 0) {
    totalRow("Paid", `- ${money(input.paidAmount)}`);
    totalRow("BALANCE DUE", money(input.balance ?? Math.max(input.total - input.paidAmount, 0)), true);
  }

  /* --------------------------------------------------------- amount in words */
  cursor.y -= 2;
  const words = amountInWords(input.total, b.currency === "NGN" ? "Naira" : b.currency);
  const wordLines = wrap(words, oblique, 8.5, contentWidth - 20, 2);
  wordLines.forEach((line, i) => {
    drawText(page, line, { x: left, y: cursor.y - i * 10, size: 8.5, font: oblique, color: MUTED });
  });
  cursor.y -= wordLines.length * 10 + 14;

  /* ------------------------------------------------------------- payment box */
  if (b.bankAccountNumber || b.bankName) {
    page = ensureSpace(pdf, cursor, 80, page);
    const boxHeight = 62;
    page.drawRectangle({ x: left, y: cursor.y - boxHeight + 14, width: contentWidth / 2 - 10, height: boxHeight, color: SOFT });
    drawText(page, "PAYMENT DETAILS", { x: left + 10, y: cursor.y, size: 8, font: bold, color: ACCENT });
    let by = cursor.y - 14;
    const bankRows = [
      b.bankName ? `Bank: ${b.bankName}` : null,
      b.bankAccountName ? `Account name: ${b.bankAccountName}` : null,
      b.bankAccountNumber ? `Account number: ${b.bankAccountNumber}` : null,
    ].filter(Boolean) as string[];
    for (const row of bankRows) {
      drawText(page, row, { x: left + 10, y: by, size: 9, font, color: INK });
      by -= 12;
    }
    cursor.y -= boxHeight + 8;
  }

  /* ----------------------------------------------------------------- notes */
  const notesBlock = [input.notes, b.invoiceNotes, input.terms, b.invoiceFooter].filter(
    (v): v is string => Boolean(v && v.trim()),
  );
  if (notesBlock.length) {
    page = ensureSpace(pdf, cursor, 70, page);
    drawText(page, "NOTES & TERMS", { x: left, y: cursor.y, size: 8, font: bold, color: MUTED });
    cursor.y -= 13;
    for (const block of notesBlock) {
      for (const line of wrap(block, font, 8.5, contentWidth - 20, 6)) {
        drawText(page, line, { x: left, y: cursor.y, size: 8.5, font, color: MUTED });
        cursor.y -= 11;
      }
      cursor.y -= 3;
    }
  }

  /* ---------------------------------------------------------------- footer */
  const footerY = PAGE.margin - 10;
  page.drawLine({ start: { x: left, y: footerY + 16 }, end: { x: right, y: footerY + 16 }, thickness: 0.4, color: LINE });
  drawText(page, `${b.name} · ${input.title} ${input.number}`, {
    x: left,
    y: footerY,
    size: 7.5,
    font,
    color: MUTED,
  });
  drawText(page, `Page 1 of 1`, { x: right, y: footerY, size: 7.5, font, color: MUTED, align: "right" });

  const bytes = await pdf.save();
  // pdf-lib returns Uint8Array; copy so the caller owns a stable buffer.
  return new Uint8Array(bytes);
}

export function formatDate(iso: string): string {
  const d = new Date(`${iso.slice(0, 10)}T00:00:00.000Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
}

/** Content-disposition-safe filename. */
export function pdfFilename(prefix: string, number: string): string {
  return `${prefix}_${number.replace(/[^A-Za-z0-9-]/g, "")}.pdf`;
}

export { koboToUnits };
