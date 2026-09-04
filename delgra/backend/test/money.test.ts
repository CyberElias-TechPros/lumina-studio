import { describe, expect, it } from "vitest";
import {
  amountInWords,
  applyRateBp,
  formatMoney,
  koboToUnits,
  parseAmountToKobo,
} from "../src/lib/money.ts";
import {
  computeInvoiceTotals,
  canTransitionInvoice,
  canTransitionWaybill,
  isOverdue,
  lineAmount,
} from "../src/lib/totals.ts";
import { formatNumber, isValidDocumentNumber, counterKey } from "../src/lib/numbering.ts";

describe("money parsing", () => {
  it("parses plain decimal strings", () => {
    expect(parseAmountToKobo("45000")).toBe(4_500_000);
    expect(parseAmountToKobo("45000.50")).toBe(4_500_050);
    expect(parseAmountToKobo("0.05")).toBe(5);
  });

  it("parses comma-grouped thousands", () => {
    expect(parseAmountToKobo("45,000")).toBe(4_500_000);
    expect(parseAmountToKobo("1,234,567")).toBe(123_456_700);
  });

  it("parses the currency symbol and stray spaces", () => {
    expect(parseAmountToKobo("₦45,000.00")).toBe(4_500_000);
    expect(parseAmountToKobo(" 1 200 ")).toBe(120_000);
  });

  it("treats a trailing comma as the decimal separator when it comes last", () => {
    expect(parseAmountToKobo("1,234.56")).toBe(123_456);
    expect(parseAmountToKobo("1.234,56")).toBe(123_456);
  });

  it("accepts numbers directly", () => {
    expect(parseAmountToKobo(450)).toBe(45_000);
    expect(parseAmountToKobo(450.25)).toBe(45_025);
  });

  it("rejects junk rather than coercing it to zero", () => {
    expect(parseAmountToKobo("")).toBeNull();
    expect(parseAmountToKobo(null)).toBeNull();
    expect(parseAmountToKobo(undefined)).toBeNull();
    expect(parseAmountToKobo("abc")).toBeNull();
    expect(parseAmountToKobo("12.3.4")).toBeNull();
    expect(parseAmountToKobo(Number.NaN)).toBeNull();
    expect(parseAmountToKobo(Number.POSITIVE_INFINITY)).toBeNull();
  });

  it("rounds half a kobo up, never down, so totals do not drift", () => {
    expect(parseAmountToKobo("0.005")).toBe(1);
    expect(parseAmountToKobo("1.0049")).toBe(100);
  });
});

describe("money formatting", () => {
  it("formats kobo as Naira with two decimals", () => {
    expect(formatMoney(4_500_000)).toBe("₦45,000.00");
    expect(formatMoney(5)).toBe("₦0.05");
    expect(formatMoney(0)).toBe("₦0.00");
  });

  it("shows negatives with a leading minus", () => {
    expect(formatMoney(-123_450)).toBe("-₦1,234.50");
  });

  it("uses the ISO code for non-NGN currencies", () => {
    expect(formatMoney(100_000, "$", "USD")).toBe("USD 1,000.00");
  });

  it("converts back to units for charts", () => {
    expect(koboToUnits(4_500_000)).toBe(45_000);
  });
});

describe("amount in words", () => {
  it("renders a whole naira amount", () => {
    expect(amountInWords(4_500_000)).toBe("Forty-Five Thousand Naira Only");
  });

  it("renders kobo fractions", () => {
    expect(amountInWords(4_500_050)).toBe("Forty-Five Thousand Naira and Fifty Kobo Only");
  });

  it("handles zero", () => {
    expect(amountInWords(0)).toBe("Zero Naira Only");
  });

  it("handles hundreds and millions", () => {
    expect(amountInWords(12_500_000)).toBe("One Hundred And Twenty-Five Thousand Naira Only");
    expect(amountInWords(1_250_000)).toBe("Twelve Thousand, Five Hundred Naira Only");
    expect(amountInWords(1_000_000_00)).toContain("One Million");
  });
});

describe("rate application", () => {
  it("applies basis points with half-up rounding", () => {
    expect(applyRateBp(1_000_000, 750)).toBe(75_000); // 7.5% of ₦10,000
    expect(applyRateBp(100, 750)).toBe(8); // 7.5 sub-kobo rounds half-up to 8
    expect(applyRateBp(0, 750)).toBe(0);
  });

  it("treats a nonsense rate as zero", () => {
    expect(applyRateBp(1_000_000, Number.NaN)).toBe(0);
    expect(applyRateBp(1_000_000, -500)).toBe(0);
  });
});

describe("invoice totals", () => {
  it("sums line items as integers", () => {
    const totals = computeInvoiceTotals({
      items: [
        { description: "UPS", quantity: 2, unitPrice: 450_000_00 },
        { description: "Delivery", quantity: 1, unitPrice: 25_000_00 },
      ],
    });
    expect(totals.subtotal).toBe(925_000_00);
    expect(totals.total).toBe(925_000_00);
    expect(totals.moneyStatus).toBe("unpaid");
  });

  it("never lets a discount exceed the subtotal", () => {
    const totals = computeInvoiceTotals({
      items: [{ description: "x", quantity: 1, unitPrice: 10_000 }],
      discount: 999_999_999,
    });
    expect(totals.discount).toBe(10_000);
    expect(totals.total).toBe(0);
  });

  it("computes tax on the discounted subtotal, not the gross", () => {
    const totals = computeInvoiceTotals({
      items: [{ description: "x", quantity: 1, unitPrice: 100_000_00 }],
      discount: 20_000_00,
      taxEnabled: true,
      taxRateBp: 750,
    });
    // 100,000 - 20,000 = 80,000; 7.5% of 80,000 = 6,000
    expect(totals.taxAmount).toBe(6_000_00);
    expect(totals.total).toBe(86_000_00);
  });

  it("ignores tax when disabled, even if a rate is present", () => {
    const totals = computeInvoiceTotals({
      items: [{ description: "x", quantity: 1, unitPrice: 100_000_00 }],
      taxEnabled: false,
      taxRateBp: 750,
    });
    expect(totals.taxAmount).toBe(0);
    expect(totals.total).toBe(100_000_00);
  });

  it("caps paid at the total and derives the status", () => {
    const items = [{ description: "x", quantity: 1, unitPrice: 10_000_00 }];
    expect(computeInvoiceTotals({ items, paidAmount: 10_000_00 }).moneyStatus).toBe("paid");
    expect(computeInvoiceTotals({ items, paidAmount: 4_000_00 }).moneyStatus).toBe("partial");
    expect(computeInvoiceTotals({ items, paidAmount: 0 }).moneyStatus).toBe("unpaid");
    // An overpayment cannot push the balance negative.
    const over = computeInvoiceTotals({ items, paidAmount: 50_000_00 });
    expect(over.paidAmount).toBe(10_000_00);
    expect(over.balance).toBe(0);
  });

  it("computes line amount safely for huge or broken quantities", () => {
    expect(lineAmount(3, 1_000)).toBe(3_000);
    expect(lineAmount(Number.NaN, 1_000)).toBe(0);
    expect(lineAmount(-5, 1_000)).toBe(0);
  });
});

describe("derived overdue status", () => {
  const yesterday = "2020-01-01";
  const today = new Date("2020-06-01T12:00:00Z");

  it("flags a sent invoice past its due date", () => {
    expect(
      isOverdue({ status: "sent", due_date: yesterday, total: 100, paid_amount: 0 }, today),
    ).toBe(true);
  });

  it("does not flag a draft, a paid invoice, or a void one", () => {
    expect(isOverdue({ status: "draft", due_date: yesterday, total: 100, paid_amount: 0 }, today)).toBe(false);
    expect(isOverdue({ status: "paid", due_date: yesterday, total: 100, paid_amount: 100 }, today)).toBe(false);
    expect(isOverdue({ status: "void", due_date: yesterday, total: 100, paid_amount: 0 }, today)).toBe(false);
  });

  it("does not flag a fully settled partial", () => {
    expect(
      isOverdue({ status: "partial", due_date: yesterday, total: 100, paid_amount: 100 }, today),
    ).toBe(false);
  });
});

describe("status transitions", () => {
  it("allows the documented invoice paths", () => {
    expect(canTransitionInvoice("draft", "sent")).toBe(true);
    expect(canTransitionInvoice("draft", "void")).toBe(true);
    expect(canTransitionInvoice("sent", "paid")).toBe(true);
    expect(canTransitionInvoice("void", "draft")).toBe(true);
  });

  it("blocks impossible invoice jumps", () => {
    expect(canTransitionInvoice("void", "paid")).toBe(false);
    expect(canTransitionInvoice("paid", "draft")).toBe(false);
    expect(canTransitionInvoice("draft", "paid")).toBe(false);
  });

  it("enforces the waybill lifecycle", () => {
    expect(canTransitionWaybill("pending", "in_transit")).toBe(true);
    expect(canTransitionWaybill("in_transit", "delivered")).toBe(true);
    expect(canTransitionWaybill("delivered", "in_transit")).toBe(false);
    expect(canTransitionWaybill("cancelled", "delivered")).toBe(false);
  });
});

describe("document numbers", () => {
  it("matches the owner's live invoice format", () => {
    // The sample document was DEL-2026-TF-01.
    expect(formatNumber({ prefix: "DEL", year: 2026, series: "TF", sequence: 1 })).toBe("DEL-2026-TF-01");
    expect(formatNumber({ prefix: "INV", year: 2026, series: "TF", sequence: 42 })).toBe("INV-2026-TF-42");
  });

  it("grows past two digits instead of wrapping", () => {
    expect(formatNumber({ prefix: "INV", year: 2026, series: "TF", sequence: 128 })).toBe("INV-2026-TF-128");
  });

  it("validates the shape", () => {
    expect(isValidDocumentNumber("DEL-2026-TF-01")).toBe(true);
    expect(isValidDocumentNumber("DEL-26-TF-1")).toBe(false);
    expect(isValidDocumentNumber("nonsense")).toBe(false);
  });

  it("scopes the counter per prefix and year", () => {
    expect(counterKey("invoice", "DEL", 2026)).toBe("invoice:DEL:2026");
    expect(counterKey("invoice", "DEL", 2027)).not.toBe(counterKey("invoice", "DEL", 2026));
  });
});
