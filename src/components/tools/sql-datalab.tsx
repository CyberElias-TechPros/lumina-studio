"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  CheckCircle2,
  Database,
  Download,
  FileSpreadsheet,
  Play,
  Table2,
  Trophy,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  CEA_SAMPLE_DATABASE,
  executeMiniSql,
  type SqlExecution,
  type SqlRow,
} from "@/lib/labs/mini-sql";
import { cn } from "@/lib/utils";

interface SqlChallenge {
  id: string;
  title: string;
  level: "Starter" | "Joins" | "Aggregation";
  prompt: string;
  starterSql: string;
  hint: string;
  verify: (result: SqlExecution) => boolean;
}

const CHALLENGES: SqlChallenge[] = [
  {
    id: "ph-customers",
    title: "1. Filter by City",
    level: "Starter",
    prompt: "Find all customers located in 'Port Harcourt'. Return full_name and segment.",
    starterSql: "SELECT full_name, segment\nFROM customers\nWHERE city = 'Port Harcourt';",
    hint: "Filter with WHERE city = 'Port Harcourt' on the customers table.",
    verify: (res) =>
      res.ok && res.rowCount === 3 && res.rows.some((r) => r.full_name === "Chinedu Okafor"),
  },
  {
    id: "top-products",
    title: "2. Sort Products by Price",
    level: "Starter",
    prompt: "List the 3 most expensive items in products showing product_name and unit_price_ngn.",
    starterSql:
      "SELECT product_name, unit_price_ngn\nFROM products\nORDER BY unit_price_ngn DESC\nLIMIT 3;",
    hint: "Use ORDER BY unit_price_ngn DESC LIMIT 3.",
    verify: (res) => res.ok && res.rowCount === 3 && Number(res.rows[0]?.unit_price_ngn) === 340000,
  },
  {
    id: "paid-orders-count",
    title: "3. Count Paid Orders",
    level: "Aggregation",
    prompt: "Count how many orders have order_status = 'paid' using COUNT(*) AS paid_orders.",
    starterSql: "SELECT COUNT(*) AS paid_orders\nFROM orders\nWHERE order_status = 'paid';",
    hint: "Use SELECT COUNT(*) AS paid_orders FROM orders WHERE order_status = 'paid';",
    verify: (res) =>
      res.ok && res.rowCount === 1 && Object.values(res.rows[0] ?? {}).some((v) => Number(v) === 8),
  },
  {
    id: "channel-settlement",
    title: "4. Revenue by Payment Channel",
    level: "Aggregation",
    prompt:
      "Group payments by channel and calculate SUM(settled_ngn) AS total_settled, sorted highest first.",
    starterSql:
      "SELECT channel, SUM(settled_ngn) AS total_settled\nFROM payments\nGROUP BY channel\nORDER BY total_settled DESC;",
    hint: "Group by channel and order by total_settled DESC.",
    verify: (res) =>
      res.ok &&
      res.rowCount === 3 &&
      res.rows[0]?.channel === "Bank Transfer" &&
      Number(res.rows[0]?.total_settled) === 1175000,
  },
  {
    id: "city-buyers",
    title: "5. Customers per City",
    level: "Aggregation",
    prompt:
      "Count customers in each city (GROUP BY city) and show only cities with 2 or more customers (HAVING).",
    starterSql:
      "SELECT city, COUNT(*) AS customer_count\nFROM customers\nGROUP BY city\nHAVING COUNT(*) >= 2\nORDER BY customer_count DESC;",
    hint: "Combine GROUP BY city with HAVING COUNT(*) >= 2.",
    verify: (res) => res.ok && res.rowCount === 2 && res.rows[0]?.city === "Port Harcourt",
  },
  {
    id: "join-orders-customers",
    title: "6. Join Orders & Customers",
    level: "Joins",
    prompt:
      "Join orders (o) with customers (c) on customer_id to display order_id, full_name, city and total_ngn for paid orders.",
    starterSql:
      "SELECT o.order_id, c.full_name, c.city, o.total_ngn\nFROM orders o\nINNER JOIN customers c ON o.customer_id = c.customer_id\nWHERE o.order_status = 'paid'\nORDER BY o.total_ngn DESC;",
    hint: "Use INNER JOIN customers c ON o.customer_id = c.customer_id.",
    verify: (res) =>
      res.ok &&
      res.rowCount === 8 &&
      res.columns.includes("full_name") &&
      res.columns.includes("total_ngn"),
  },
  {
    id: "product-revenue",
    title: "7. Top-Earning Products",
    level: "Joins",
    prompt:
      "Join orders and products to sum total_ngn per product_name for paid orders, ordered highest revenue first.",
    starterSql:
      "SELECT p.product_name, SUM(o.total_ngn) AS revenue_ngn\nFROM orders o\nINNER JOIN products p ON o.product_id = p.product_id\nWHERE o.order_status = 'paid'\nGROUP BY p.product_name\nORDER BY revenue_ngn DESC;",
    hint: "Join orders o with products p, filter paid orders, and GROUP BY p.product_name.",
    verify: (res) => res.ok && res.rowCount >= 4 && Number(res.rows[0]?.revenue_ngn) === 680000,
  },
  {
    id: "unpaid-left-join",
    title: "8. Find Orders Without Payments",
    level: "Joins",
    prompt:
      "Use LEFT JOIN between orders (o) and payments (p) and filter WHERE p.payment_id IS NULL to catch pending or refunded orders.",
    starterSql:
      "SELECT o.order_id, o.order_status, o.total_ngn\nFROM orders o\nLEFT JOIN payments p ON o.order_id = p.order_id\nWHERE p.payment_id IS NULL;",
    hint: "LEFT JOIN preserves unmatched orders; WHERE p.payment_id IS NULL isolates them.",
    verify: (res) =>
      res.ok && res.rowCount === 2 && res.rows.some((r) => Number(r.order_id) === 5006),
  },
];

const SAMPLE_MESSY_CSV = `date,customer,city,amount_ngn,channel
2026-10-01,Chinedu Okafor,Port Harcourt,120000,Paystack
2026-10-01,Chinedu Okafor,Port Harcourt,120000,Paystack
2026-10-03,Amina Bello,Abuja,45000,Bank Transfer
2026-10-05,Tunde Adeyemi,,680000,Bank Transfer
2026-10-09,Ngozi Eze,Port Harcourt,150000,POS
2026-10-12,Kemi Ogunleye,Lagos,not_a_number,Paystack`;

function parseCsvRows(raw: string): {
  headers: string[];
  rows: string[][];
  duplicateCount: number;
  missingCells: number;
  invalidNumbers: number;
} {
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) {
    return { headers: [], rows: [], duplicateCount: 0, missingCells: 0, invalidNumbers: 0 };
  }
  const headers = lines[0].split(",").map((h) => h.trim());
  const dataLines = lines.slice(1);
  const seen = new Set<string>();
  let duplicateCount = 0;
  let missingCells = 0;
  let invalidNumbers = 0;
  const rows = dataLines.map((line) => {
    if (seen.has(line)) duplicateCount += 1;
    seen.add(line);
    const cols = line.split(",").map((c) => c.trim());
    cols.forEach((cell, idx) => {
      if (!cell) missingCells += 1;
      if (headers[idx]?.includes("amount") && cell && Number.isNaN(Number(cell))) {
        invalidNumbers += 1;
      }
    });
    return cols;
  });
  return { headers, rows, duplicateCount, missingCells, invalidNumbers };
}

export function SqlDataLab() {
  const [tab, setTab] = useState<"sql" | "csv">("sql");
  const [challengeIdx, setChallengeIdx] = useState(0);
  const activeChallenge = CHALLENGES[challengeIdx];
  const [sql, setSql] = useState(activeChallenge.starterSql);
  const [result, setResult] = useState<SqlExecution>(() =>
    executeMiniSql(activeChallenge.starterSql),
  );
  const [showChart, setShowChart] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState<string[]>(() =>
    activeChallenge.verify(executeMiniSql(activeChallenge.starterSql)) ? [activeChallenge.id] : [],
  );
  const [selectedTable, setSelectedTable] = useState<keyof typeof CEA_SAMPLE_DATABASE>("orders");

  // CSV tab state
  const [csvText, setCsvText] = useState(SAMPLE_MESSY_CSV);
  const csvAudit = useMemo(() => parseCsvRows(csvText), [csvText]);

  const runQuery = (queryToRun = sql) => {
    const res = executeMiniSql(queryToRun);
    setResult(res);
    if (activeChallenge.verify(res) && !solved.includes(activeChallenge.id)) {
      setSolved((prev) => [...prev, activeChallenge.id]);
    }
  };

  const selectChallenge = (idx: number) => {
    const ch = CHALLENGES[idx];
    setChallengeIdx(idx);
    setSql(ch.starterSql);
    setShowHint(false);
    const res = executeMiniSql(ch.starterSql);
    setResult(res);
    if (ch.verify(res) && !solved.includes(ch.id)) {
      setSolved((prev) => [...prev, ch.id]);
    }
  };

  const chartConfig = useMemo(() => {
    if (!result.ok || result.rows.length < 2 || result.columns.length < 2) return null;
    const labelCol = result.columns[0];
    const numCol = result.columns.find((c) => result.rows.every((r) => typeof r[c] === "number"));
    if (!numCol || labelCol === numCol) return null;
    return {
      labelCol,
      numCol,
      data: result.rows.slice(0, 10).map((r) => ({
        name: String(r[labelCol] ?? ""),
        value: Number(r[numCol] ?? 0),
      })),
    };
  }, [result]);

  const exportCsv = () => {
    if (!result.ok) return;
    const header = result.columns.join(",");
    const body = result.rows
      .map((r: SqlRow) => result.columns.map((c) => JSON.stringify(r[c] ?? "")).join(","))
      .join("\n");
    const blob = new Blob([`${header}\n${body}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cea-datalab-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Mode bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="border-foreground/12 bg-card inline-flex rounded-full border p-1">
          <button
            type="button"
            onClick={() => setTab("sql")}
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold",
              tab === "sql"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Database className="size-3.5" aria-hidden="true" /> SQL Sandbox
          </button>
          <button
            type="button"
            onClick={() => setTab("csv")}
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold",
              tab === "csv"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <FileSpreadsheet className="size-3.5" aria-hidden="true" /> CSV Quality Inspector
          </button>
        </div>

        <div className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
          <Trophy className="text-primary size-4" aria-hidden="true" />
          <span>
            {solved.length}/{CHALLENGES.length} SQL challenges verified
          </span>
        </div>
      </div>

      {tab === "sql" ? (
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Schema Sidebar */}
          <aside className="border-foreground/10 bg-card space-y-4 rounded-2xl border p-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
                Sample Database
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Click a table to preview or inspect columns.
              </p>
            </div>
            <div className="space-y-2">
              {Object.values(CEA_SAMPLE_DATABASE).map((t) => (
                <div key={t.name} className="border-foreground/10 rounded-xl border p-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTable(t.name as keyof typeof CEA_SAMPLE_DATABASE);
                      const q = `SELECT * FROM ${t.name} LIMIT 10;`;
                      setSql(q);
                      runQuery(q);
                    }}
                    className="flex w-full cursor-pointer items-center justify-between text-left text-xs font-semibold"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Table2 className="text-primary size-3.5" aria-hidden="true" />
                      {t.name}
                    </span>
                    <span className="text-muted-foreground font-mono text-[10px]">
                      {t.rows.length} rows
                    </span>
                  </button>
                  {selectedTable === t.name && (
                    <ul className="border-foreground/10 mt-2 space-y-1 border-t pt-2 font-mono text-[11px]">
                      {t.columns.map((c) => (
                        <li key={c.name} className="flex items-center justify-between gap-2">
                          <span className="truncate">{c.name}</span>
                          <span className="text-muted-foreground text-[9px]">{c.type}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* Main SQL Workbench */}
          <div className="space-y-5">
            {/* Challenge pills */}
            <div className="flex flex-wrap gap-2">
              {CHALLENGES.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => selectChallenge(idx)}
                  className={cn(
                    "inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
                    idx === challengeIdx
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-foreground/15 bg-card hover:bg-muted",
                  )}
                >
                  {solved.includes(ch.id) && (
                    <CheckCircle2 className="size-3.5" aria-hidden="true" />
                  )}
                  <span>{ch.title}</span>
                </button>
              ))}
            </div>

            <div className="border-foreground/10 bg-card rounded-2xl border p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase">
                    Challenge · {activeChallenge.level}
                  </p>
                  <h2 className="font-display mt-1 text-lg font-semibold">
                    {activeChallenge.title}
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm">{activeChallenge.prompt}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowHint((h) => !h)}
                  className="border-foreground/15 hover:bg-muted cursor-pointer rounded-full border px-3 py-1 text-xs font-medium"
                >
                  {showHint ? "Hide hint" : "Show hint"}
                </button>
              </div>
              {showHint && (
                <p className="bg-primary/8 mt-3 rounded-xl px-4 py-2 text-xs">
                  {activeChallenge.hint}
                </p>
              )}

              <div className="mt-4 overflow-hidden rounded-xl border border-slate-800 bg-[#0b1220]">
                <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2 text-xs text-slate-300">
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase">
                    SQL Editor (Read-only sandbox)
                  </span>
                  <button
                    type="button"
                    onClick={() => runQuery(sql)}
                    className="bg-primary text-primary-foreground inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold"
                  >
                    <Play className="size-3" aria-hidden="true" /> Run Query
                  </button>
                </div>
                <textarea
                  aria-label="SQL query editor"
                  value={sql}
                  onChange={(e) => setSql(e.target.value)}
                  rows={5}
                  spellCheck={false}
                  className="w-full resize-y bg-transparent p-4 font-mono text-[13px] leading-6 text-sky-100 focus:outline-none"
                />
              </div>
            </div>

            {/* Output */}
            <div className="border-foreground/10 bg-card rounded-2xl border p-5">
              {!result.ok ? (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm">
                  <p className="font-semibold text-rose-700 dark:text-rose-300">
                    SQL Error: {result.error}
                  </p>
                  {result.hint && (
                    <p className="text-muted-foreground mt-1 text-xs">{result.hint}</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-300">
                        {result.rowCount} row(s) · {result.elapsedMs} ms
                      </span>
                      {activeChallenge.verify(result) && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                          <CheckCircle2 className="size-3" /> Challenge passed
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {chartConfig && (
                        <button
                          type="button"
                          onClick={() => setShowChart((c) => !c)}
                          className="border-foreground/15 hover:bg-muted inline-flex cursor-pointer items-center gap-1 rounded-full border px-3 py-1 text-xs"
                        >
                          <BarChart3 className="size-3.5" />
                          {showChart ? "Hide chart" : "Show chart"}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={exportCsv}
                        className="border-foreground/15 hover:bg-muted inline-flex cursor-pointer items-center gap-1 rounded-full border px-3 py-1 text-xs"
                      >
                        <Download className="size-3.5" /> Export CSV
                      </button>
                    </div>
                  </div>

                  {chartConfig && showChart && (
                    <div className="border-foreground/10 bg-muted/20 h-56 w-full rounded-xl border p-3">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartConfig.data}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                          <YAxis tick={{ fontSize: 11 }} />
                          <Tooltip />
                          <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  <div className="overflow-x-auto rounded-xl border border-foreground/10">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-muted/60 font-mono text-[10px] uppercase">
                        <tr>
                          {result.columns.map((col) => (
                            <th key={col} className="px-3 py-2.5 font-semibold">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-foreground/8">
                        {result.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-muted/30">
                            {result.columns.map((col) => (
                              <td key={col} className="px-3 py-2 font-mono whitespace-nowrap">
                                {row[col] === null ? (
                                  <span className="text-muted-foreground italic">NULL</span>
                                ) : typeof row[col] === "number" &&
                                  /price|ngn|settled|total|revenue/i.test(col) ? (
                                  `₦${Number(row[col]).toLocaleString("en-NG")}`
                                ) : (
                                  String(row[col])
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="border-foreground/10 bg-card space-y-4 rounded-2xl border p-5">
            <div>
              <p className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase">
                CSV Data Cleaning Lab
              </p>
              <h2 className="font-display mt-1 text-xl font-semibold">
                Paste CSV rows to spot duplicates, blanks &amp; type errors
              </h2>
            </div>
            <textarea
              aria-label="CSV input data"
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              rows={9}
              spellCheck={false}
              className="border-foreground/15 bg-background w-full rounded-xl border p-3 font-mono text-xs leading-relaxed"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCsvText(SAMPLE_MESSY_CSV)}
                className="border-foreground/15 hover:bg-muted cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium"
              >
                Load sample dirty CSV
              </button>
              <button
                type="button"
                onClick={() => {
                  const uniqueLines = [...new Set(csvText.split(/\r?\n/).filter(Boolean))];
                  setCsvText(uniqueLines.join("\n"));
                }}
                className="bg-primary text-primary-foreground cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold"
              >
                Remove exact duplicate rows
              </button>
            </div>
          </div>

          <div className="border-foreground/10 bg-card space-y-4 rounded-2xl border p-5">
            <p className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase">
              Quality Report
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="border-foreground/10 rounded-xl border p-3">
                <p className="font-display text-2xl font-bold">{csvAudit.duplicateCount}</p>
                <p className="text-muted-foreground text-[11px]">Duplicate rows</p>
              </div>
              <div className="border-foreground/10 rounded-xl border p-3">
                <p className="font-display text-2xl font-bold">{csvAudit.missingCells}</p>
                <p className="text-muted-foreground text-[11px]">Blank cells</p>
              </div>
              <div className="border-foreground/10 rounded-xl border p-3">
                <p className="font-display text-2xl font-bold">{csvAudit.invalidNumbers}</p>
                <p className="text-muted-foreground text-[11px]">Bad numbers</p>
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl border border-foreground/10">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/60 font-mono text-[10px] uppercase">
                  <tr>
                    {csvAudit.headers.map((h) => (
                      <th key={h} className="px-3 py-2">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground/8">
                  {csvAudit.rows.map((row, idx) => (
                    <tr key={idx}>
                      {csvAudit.headers.map((_, cIdx) => {
                        const val = row[cIdx] ?? "";
                        const isBad =
                          !val ||
                          (csvAudit.headers[cIdx]?.includes("amount") && Number.isNaN(Number(val)));
                        return (
                          <td
                            key={cIdx}
                            className={cn(
                              "px-3 py-2 font-mono",
                              isBad && "bg-rose-500/10 text-rose-700 dark:text-rose-300",
                            )}
                          >
                            {val || "MISSING"}
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
      )}
    </div>
  );
}
