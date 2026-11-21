"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, RotateCcw, Table, Trophy } from "lucide-react";
import { evaluateSheet, type CellMap } from "@/lib/labs/mini-spreadsheet";
import { cn } from "@/lib/utils";

const COLS = ["A", "B", "C", "D", "E", "F"] as const;
const ROWS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

interface WorkbookTemplate {
  id: string;
  title: string;
  task: string;
  targetCell: string;
  hint: string;
  cells: CellMap;
  verify: (evaluated: ReturnType<typeof evaluateSheet>, raw: CellMap) => boolean;
}

const WORKBOOKS: WorkbookTemplate[] = [
  {
    id: "shop-sales-sum",
    title: "1. Daily Shop Sales (SUM)",
    task: "Cell D2:D5 multiplies Qty × Unit Price. Write a formula in D6 to calculate the total revenue (=SUM(D2:D5)).",
    targetCell: "D6",
    hint: "Click cell D6 and type =SUM(D2:D5)",
    cells: {
      A1: "Item",
      B1: "Qty",
      C1: "Price (NGN)",
      D1: "Total (NGN)",
      E1: "Channel",
      F1: "Note",
      A2: "USB-C Cable",
      B2: "4",
      C2: "3500",
      D2: "=B2*C2",
      E2: "POS",
      F2: "",
      A3: "Laptop Stand",
      B3: "2",
      C3: "14500",
      D3: "=B3*C3",
      E3: "Transfer",
      F3: "",
      A4: "Wireless Mouse",
      B4: "5",
      C4: "6500",
      D4: "=B4*C4",
      E4: "POS",
      F4: "",
      A5: "Keyboard",
      B5: "3",
      C5: "9000",
      D5: "=B5*C5",
      E5: "Cash",
      F5: "",
      A6: "Grand Total",
      B6: "",
      C6: "",
      D6: "",
      E6: "",
      F6: "",
    },
    verify: (ev, raw) => (raw.D6 ?? "").toUpperCase().includes("SUM") && ev.D6?.value === 102500,
  },
  {
    id: "gradebook-if",
    title: "2. Student Exam Pass/Resit (IF)",
    task: 'Write an =IF(...) formula in C2 that returns "Pass" when B2>=50 and "Resit" otherwise. Try copying the pattern down to C5.',
    targetCell: "C2",
    hint: 'In C2 type =IF(B2>=50, "Pass", "Resit")',
    cells: {
      A1: "Student",
      B1: "Score",
      C1: "Result",
      D1: "Class Avg",
      E1: "",
      F1: "",
      A2: "Adaeze",
      B2: "74",
      C2: "",
      D2: "=AVERAGE(B2:B5)",
      E2: "",
      F2: "",
      A3: "Ibrahim",
      B3: "46",
      C3: '=IF(B3>=50, "Pass", "Resit")',
      D3: "",
      E3: "",
      F3: "",
      A4: "Tolu",
      B4: "61",
      C4: '=IF(B4>=50, "Pass", "Resit")',
      D4: "",
      E4: "",
      F4: "",
      A5: "Chidi",
      B5: "39",
      C5: '=IF(B5>=50, "Pass", "Resit")',
      D5: "",
      E5: "",
      F5: "",
    },
    verify: (ev, raw) => (raw.C2 ?? "").toUpperCase().includes("IF(") && ev.C2?.value === "Pass",
  },
  {
    id: "branch-sumif",
    title: "3. POS Revenue Total (SUMIF)",
    task: 'Calculate total revenue from POS sales only in cell E2 using =SUMIF(B2:B5, "POS", C2:C5).',
    targetCell: "E2",
    hint: 'In E2 type =SUMIF(B2:B5, "POS", C2:C5)',
    cells: {
      A1: "Order",
      B1: "Channel",
      C1: "Amount",
      D1: "Metric",
      E1: "Value",
      F1: "",
      A2: "#101",
      B2: "POS",
      C2: "25000",
      D2: "POS Total",
      E2: "",
      F2: "",
      A3: "#102",
      B3: "Paystack",
      C3: "48000",
      D3: "POS Count",
      E3: '=COUNTIF(B2:B5, "POS")',
      F3: "",
      A4: "#103",
      B4: "POS",
      C4: "32000",
      D4: "Max Order",
      E4: "=MAX(C2:C5)",
      F4: "",
      A5: "#104",
      B5: "Transfer",
      C5: "19000",
      D5: "Min Order",
      E5: "=MIN(C2:C5)",
      F5: "",
    },
    verify: (ev, raw) => (raw.E2 ?? "").toUpperCase().includes("SUMIF") && ev.E2?.value === 57000,
  },
  {
    id: "vlookup-pricing",
    title: "4. Price Lookup (VLOOKUP)",
    task: 'Use =VLOOKUP(E2, A2:C5, 3) in cell F2 to pull the fee for the course typed in E2 ("SQL Lab").',
    targetCell: "F2",
    hint: "Click F2 and enter =VLOOKUP(E2, A2:C5, 3)",
    cells: {
      A1: "Course",
      B1: "Weeks",
      C1: "Fee (NGN)",
      D1: "",
      E1: "Lookup Course",
      F1: "Fee Found",
      A2: "Typing",
      B2: "4",
      C2: "30000",
      D2: "",
      E2: "SQL Lab",
      F2: "",
      A3: "Office",
      B3: "6",
      C3: "45000",
      D3: "",
      E3: "",
      F3: "",
      A4: "SQL Lab",
      B4: "8",
      C4: "95000",
      D4: "",
      E4: "",
      F4: "",
      A5: "Web Dev",
      B5: "12",
      C5: "150000",
      D5: "",
      E5: "",
      F5: "",
    },
    verify: (ev, raw) => (raw.F2 ?? "").toUpperCase().includes("VLOOKUP") && ev.F2?.value === 95000,
  },
  {
    id: "vat-invoice",
    title: "5. 7.5% VAT & Profit Margin",
    task: "In cell D4 calculate 7.5% VAT on subtotal D3 (=ROUND(D3*0.075, 0)), then check Grand Total in D5.",
    targetCell: "D4",
    hint: "Click D4 and type =ROUND(D3*0.075, 0)",
    cells: {
      A1: "Service",
      B1: "Hours",
      C1: "Rate",
      D1: "Line Total",
      E1: "",
      F1: "",
      A2: "Landing Page",
      B2: "10",
      C2: "8000",
      D2: "=B2*C2",
      E2: "",
      F2: "",
      A3: "Subtotal",
      B3: "",
      C3: "",
      D3: "=D2",
      E3: "",
      F3: "",
      A4: "VAT (7.5%)",
      B4: "",
      C4: "",
      D4: "",
      E4: "",
      F4: "",
      A5: "Invoice Total",
      B5: "",
      C5: "",
      D5: "=D3+D4",
      E5: "",
      F5: "",
    },
    verify: (ev) => ev.D4?.value === 6000 && ev.D5?.value === 86000,
  },
  {
    id: "expense-budget",
    title: "6. Monthly Power & Data Budget (AVERAGE)",
    task: "Calculate the average monthly power/data spend in B6 using =AVERAGE(B2:B5).",
    targetCell: "B6",
    hint: "Click B6 and enter =AVERAGE(B2:B5)",
    cells: {
      A1: "Expense",
      B1: "Cost (NGN)",
      C1: "Category",
      D1: "",
      E1: "",
      F1: "",
      A2: "Fuel / Inverter",
      B2: "42000",
      C2: "Power",
      D2: "",
      E2: "",
      F2: "",
      A3: "Fibre Internet",
      B3: "24000",
      C3: "Connectivity",
      D3: "",
      E3: "",
      F3: "",
      A4: "Mobile Backup",
      B4: "12000",
      C4: "Connectivity",
      D4: "",
      E4: "",
      F4: "",
      A5: "PHED Bill",
      B5: "18000",
      C5: "Power",
      D5: "",
      E5: "",
      F5: "",
      A6: "Monthly Avg",
      B6: "",
      C6: "",
      D6: "",
      E6: "",
      F6: "",
    },
    verify: (ev, raw) => (raw.B6 ?? "").toUpperCase().includes("AVERAGE") && ev.B6?.value === 24000,
  },
];

export function ExcelFormulaLab() {
  const [wbIdx, setWbIdx] = useState(0);
  const active = WORKBOOKS[wbIdx];
  const [cells, setCells] = useState<CellMap>(() => ({ ...active.cells }));
  const [selectedCell, setSelectedCell] = useState<string>(active.targetCell);
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState<string[]>([]);

  const evaluated = useMemo(() => evaluateSheet(cells), [cells]);
  const isCurrentSolved = active.verify(evaluated, cells);

  if (isCurrentSolved && !solved.includes(active.id)) {
    setSolved((prev) => [...prev, active.id]);
  }

  const selectWorkbook = (idx: number) => {
    const next = WORKBOOKS[idx];
    setWbIdx(idx);
    setCells({ ...next.cells });
    setSelectedCell(next.targetCell);
    setShowHint(false);
  };

  const updateCell = (ref: string, value: string) => {
    setCells((prev) => ({ ...prev, [ref]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {WORKBOOKS.map((wb, idx) => (
            <button
              key={wb.id}
              type="button"
              onClick={() => selectWorkbook(idx)}
              className={cn(
                "inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium",
                idx === wbIdx
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-foreground/15 bg-card hover:bg-muted",
              )}
            >
              {solved.includes(wb.id) && <CheckCircle2 className="size-3.5" aria-hidden="true" />}
              <span>{wb.title}</span>
            </button>
          ))}
        </div>
        <div className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
          <Trophy className="text-primary size-4" aria-hidden="true" />
          <span>
            {solved.length}/{WORKBOOKS.length} drills solved
          </span>
        </div>
      </div>

      {/* Task brief */}
      <div className="border-foreground/10 bg-card rounded-2xl border p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase">
              Target cell: {active.targetCell}
            </p>
            <h2 className="font-display mt-1 text-lg font-semibold">{active.title}</h2>
            <p className="text-muted-foreground mt-1 text-sm">{active.task}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowHint((h) => !h)}
              className="border-foreground/15 hover:bg-muted cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium"
            >
              {showHint ? "Hide hint" : "Show hint"}
            </button>
            <button
              type="button"
              onClick={() => setCells({ ...active.cells })}
              className="border-foreground/15 hover:bg-muted inline-flex cursor-pointer items-center gap-1 rounded-full border px-3.5 py-1.5 text-xs font-medium"
            >
              <RotateCcw className="size-3.5" /> Reset sheet
            </button>
          </div>
        </div>
        {showHint && (
          <p className="bg-primary/8 mt-3 rounded-xl px-4 py-2 text-xs">{active.hint}</p>
        )}
        {isCurrentSolved && (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/12 px-4 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="size-4" /> Formula verified! Try another workbook above or edit
            any cell to experiment.
          </p>
        )}
      </div>

      {/* Formula Bar + Grid */}
      <div className="border-foreground/12 bg-card overflow-hidden rounded-2xl border">
        <div className="border-foreground/10 bg-muted/40 flex flex-wrap items-center gap-3 border-b px-4 py-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 font-mono text-xs font-bold text-primary">
            <Table className="size-3.5" aria-hidden="true" /> {selectedCell}
          </span>
          <span className="text-muted-foreground font-mono text-xs font-semibold italic">fx</span>
          <input
            type="text"
            aria-label={`Formula bar for cell ${selectedCell}`}
            value={cells[selectedCell] ?? ""}
            onChange={(e) => updateCell(selectedCell, e.target.value)}
            placeholder="Type a number, text, or formula starting with ="
            className="border-foreground/15 bg-background min-w-[220px] flex-1 rounded-lg border px-3 py-1.5 font-mono text-xs focus:ring-2 focus:ring-primary/30 focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-muted/50 font-mono text-[11px]">
                <th className="border-foreground/10 w-10 border-r border-b px-2 py-2 text-center text-muted-foreground" />
                {COLS.map((col) => (
                  <th
                    key={col}
                    className="border-foreground/10 min-w-[115px] border-r border-b px-3 py-2 text-center font-semibold"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row}>
                  <td className="border-foreground/10 bg-muted/30 text-muted-foreground border-r border-b px-2 py-2 text-center font-mono text-[11px]">
                    {row}
                  </td>
                  {COLS.map((col) => {
                    const ref = `${col}${row}`;
                    const ev = evaluated[ref];
                    const isSelected = selectedCell === ref;
                    const isTarget = active.targetCell === ref;
                    const isFormula = (cells[ref] ?? "").trim().startsWith("=");
                    const isError = Boolean(ev?.error);

                    return (
                      <td
                        key={ref}
                        onClick={() => setSelectedCell(ref)}
                        className={cn(
                          "border-foreground/10 cursor-cell border-r border-b px-2.5 py-2 font-mono transition-colors",
                          row === 1 && "bg-muted/20 font-sans font-semibold",
                          isTarget &&
                            !isSelected &&
                            "bg-primary/5 ring-1 ring-inset ring-primary/30",
                          isSelected && "bg-primary/10 ring-2 ring-inset ring-primary",
                          isError && "bg-rose-500/10 text-rose-700 dark:text-rose-300",
                        )}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span
                            className={cn(
                              "truncate",
                              isFormula && !isError && "text-primary font-semibold",
                            )}
                          >
                            {ev?.display ?? ""}
                          </span>
                          {isTarget && (
                            <span className="text-[9px] font-sans uppercase text-primary/70">
                              target
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
