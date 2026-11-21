/**
 * Deterministic, 100% client-side relational SQL engine for CEA DataLab.
 *
 * Runs directly in the browser on an in-memory Nigerian business & academy
 * dataset (customers, products, orders, payments) without network calls,
 * WASM fetch failures, or server-side execution risks.
 *
 * Supported SQL subset:
 *   - SHOW TABLES;
 *   - DESCRIBE <table>; (or DESC <table>;)
 *   - SELECT [DISTINCT] <cols | * | aggregates | aliases>
 *     FROM <table> [alias]
 *     [INNER|LEFT JOIN <table> [alias] ON <left> = <right>]
 *     [WHERE <conditions with AND / OR / = != <> < > <= >= LIKE IN BETWEEN IS NULL>]
 *     [GROUP BY <col, ...>]
 *     [HAVING <agg condition>]
 *     [ORDER BY <col|alias> [ASC|DESC], ...]
 *     [LIMIT <n>]
 */

export type SqlValue = string | number | null;
export type SqlRow = Record<string, SqlValue>;

export interface SqlColumnMeta {
  name: string;
  type: "INTEGER" | "TEXT" | "REAL";
  note: string;
}

export interface SqlTable {
  name: string;
  description: string;
  columns: SqlColumnMeta[];
  rows: SqlRow[];
}

export interface SqlResult {
  ok: true;
  columns: string[];
  rows: SqlRow[];
  rowCount: number;
  elapsedMs: number;
  note?: string;
}

export interface SqlError {
  ok: false;
  error: string;
  hint?: string;
}

export type SqlExecution = SqlResult | SqlError;

export const CEA_SAMPLE_DATABASE: Record<string, SqlTable> = {
  customers: {
    name: "customers",
    description: "Registered buyers and learners across Nigerian cities",
    columns: [
      { name: "customer_id", type: "INTEGER", note: "Primary key" },
      { name: "full_name", type: "TEXT", note: "Customer full name" },
      { name: "city", type: "TEXT", note: "City in Nigeria" },
      { name: "segment", type: "TEXT", note: "Student | SME | Corporate" },
      { name: "joined_month", type: "TEXT", note: "YYYY-MM signup month" },
    ],
    rows: [
      {
        customer_id: 1,
        full_name: "Chinedu Okafor",
        city: "Port Harcourt",
        segment: "SME",
        joined_month: "2026-01",
      },
      {
        customer_id: 2,
        full_name: "Amina Bello",
        city: "Abuja",
        segment: "Student",
        joined_month: "2026-02",
      },
      {
        customer_id: 3,
        full_name: "Tunde Adeyemi",
        city: "Lagos",
        segment: "Corporate",
        joined_month: "2026-02",
      },
      {
        customer_id: 4,
        full_name: "Ngozi Eze",
        city: "Port Harcourt",
        segment: "Student",
        joined_month: "2026-03",
      },
      {
        customer_id: 5,
        full_name: "Ibrahim Musa",
        city: "Kano",
        segment: "SME",
        joined_month: "2026-04",
      },
      {
        customer_id: 6,
        full_name: "Blessing Wike",
        city: "Port Harcourt",
        segment: "SME",
        joined_month: "2026-05",
      },
      {
        customer_id: 7,
        full_name: "Kemi Ogunleye",
        city: "Lagos",
        segment: "Student",
        joined_month: "2026-06",
      },
      {
        customer_id: 8,
        full_name: "Emeka Nwosu",
        city: "Enugu",
        segment: "Corporate",
        joined_month: "2026-07",
      },
    ],
  },
  products: {
    name: "products",
    description: "Courses, gadgets and studio services priced in Naira (NGN)",
    columns: [
      { name: "product_id", type: "INTEGER", note: "Primary key" },
      { name: "product_name", type: "TEXT", note: "Item or course title" },
      { name: "category", type: "TEXT", note: "Course | Gadget | Service" },
      { name: "unit_price_ngn", type: "INTEGER", note: "Price in Nigerian Naira" },
    ],
    rows: [
      {
        product_id: 101,
        product_name: "Data Analytics Bootcamp",
        category: "Course",
        unit_price_ngn: 120000,
      },
      {
        product_id: 102,
        product_name: "Web Development Track",
        category: "Course",
        unit_price_ngn: 150000,
      },
      {
        product_id: 103,
        product_name: "Microsoft Office Mastery",
        category: "Course",
        unit_price_ngn: 45000,
      },
      {
        product_id: 104,
        product_name: "Refurbished ThinkPad T480",
        category: "Gadget",
        unit_price_ngn: 340000,
      },
      {
        product_id: 105,
        product_name: "USB-C Laptop Power Bank",
        category: "Gadget",
        unit_price_ngn: 68000,
      },
      {
        product_id: 106,
        product_name: "SME Website Audit",
        category: "Service",
        unit_price_ngn: 85000,
      },
    ],
  },
  orders: {
    name: "orders",
    description: "Sales orders linking customers to products",
    columns: [
      { name: "order_id", type: "INTEGER", note: "Primary key" },
      { name: "customer_id", type: "INTEGER", note: "Foreign key -> customers" },
      { name: "product_id", type: "INTEGER", note: "Foreign key -> products" },
      { name: "quantity", type: "INTEGER", note: "Units ordered" },
      { name: "total_ngn", type: "INTEGER", note: "Order total in NGN" },
      { name: "order_status", type: "TEXT", note: "paid | pending | refunded" },
      { name: "order_date", type: "TEXT", note: "YYYY-MM-DD" },
    ],
    rows: [
      {
        order_id: 5001,
        customer_id: 1,
        product_id: 101,
        quantity: 1,
        total_ngn: 120000,
        order_status: "paid",
        order_date: "2026-08-03",
      },
      {
        order_id: 5002,
        customer_id: 2,
        product_id: 103,
        quantity: 1,
        total_ngn: 45000,
        order_status: "paid",
        order_date: "2026-08-09",
      },
      {
        order_id: 5003,
        customer_id: 3,
        product_id: 104,
        quantity: 2,
        total_ngn: 680000,
        order_status: "paid",
        order_date: "2026-08-14",
      },
      {
        order_id: 5004,
        customer_id: 4,
        product_id: 102,
        quantity: 1,
        total_ngn: 150000,
        order_status: "paid",
        order_date: "2026-09-02",
      },
      {
        order_id: 5005,
        customer_id: 1,
        product_id: 106,
        quantity: 1,
        total_ngn: 85000,
        order_status: "paid",
        order_date: "2026-09-10",
      },
      {
        order_id: 5006,
        customer_id: 5,
        product_id: 105,
        quantity: 2,
        total_ngn: 136000,
        order_status: "pending",
        order_date: "2026-09-18",
      },
      {
        order_id: 5007,
        customer_id: 6,
        product_id: 101,
        quantity: 1,
        total_ngn: 120000,
        order_status: "paid",
        order_date: "2026-10-04",
      },
      {
        order_id: 5008,
        customer_id: 7,
        product_id: 103,
        quantity: 1,
        total_ngn: 45000,
        order_status: "refunded",
        order_date: "2026-10-12",
      },
      {
        order_id: 5009,
        customer_id: 8,
        product_id: 102,
        quantity: 3,
        total_ngn: 450000,
        order_status: "paid",
        order_date: "2026-10-21",
      },
      {
        order_id: 5010,
        customer_id: 3,
        product_id: 106,
        quantity: 1,
        total_ngn: 85000,
        order_status: "paid",
        order_date: "2026-11-05",
      },
    ],
  },
  payments: {
    name: "payments",
    description: "Payment channel breakdown for orders",
    columns: [
      { name: "payment_id", type: "INTEGER", note: "Primary key" },
      { name: "order_id", type: "INTEGER", note: "Foreign key -> orders" },
      { name: "channel", type: "TEXT", note: "Paystack | Bank Transfer | POS" },
      { name: "settled_ngn", type: "INTEGER", note: "Amount settled after channel fee" },
    ],
    rows: [
      { payment_id: 901, order_id: 5001, channel: "Paystack", settled_ngn: 118100 },
      { payment_id: 902, order_id: 5002, channel: "Bank Transfer", settled_ngn: 45000 },
      { payment_id: 903, order_id: 5003, channel: "Bank Transfer", settled_ngn: 680000 },
      { payment_id: 904, order_id: 5004, channel: "POS", settled_ngn: 148500 },
      { payment_id: 905, order_id: 5005, channel: "Paystack", settled_ngn: 83625 },
      { payment_id: 906, order_id: 5007, channel: "POS", settled_ngn: 118800 },
      { payment_id: 907, order_id: 5009, channel: "Bank Transfer", settled_ngn: 450000 },
      { payment_id: 908, order_id: 5010, channel: "Paystack", settled_ngn: 83625 },
    ],
  },
};

function splitTopLevel(input: string, delimiter = ","): string[] {
  const parts: string[] = [];
  let depth = 0;
  let quote: "'" | '"' | null = null;
  let start = 0;

  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];
    if (quote) {
      if (ch === quote && input[i - 1] !== "\\") quote = null;
      continue;
    }
    if (ch === "'" || ch === '"') {
      quote = ch;
      continue;
    }
    if (ch === "(") depth += 1;
    else if (ch === ")") depth = Math.max(0, depth - 1);
    else if (depth === 0 && input.slice(i, i + delimiter.length) === delimiter) {
      parts.push(input.slice(start, i).trim());
      start = i + delimiter.length;
      i += delimiter.length - 1;
    }
  }
  const tail = input.slice(start).trim();
  if (tail) parts.push(tail);
  return parts;
}

function splitTopLevelKeyword(input: string, keyword: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let quote: "'" | '"' | null = null;
  let start = 0;
  const upper = input.toUpperCase();
  const target = keyword.toUpperCase();

  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];
    if (quote) {
      if (ch === quote && input[i - 1] !== "\\") quote = null;
      continue;
    }
    if (ch === "'" || ch === '"') {
      quote = ch;
      continue;
    }
    if (ch === "(") depth += 1;
    else if (ch === ")") depth = Math.max(0, depth - 1);
    else if (depth === 0 && upper.startsWith(target, i)) {
      const before = i === 0 ? " " : input[i - 1];
      const after = i + target.length >= input.length ? " " : input[i + target.length];
      if (/\s/.test(before) && /\s/.test(after)) {
        parts.push(input.slice(start, i).trim());
        start = i + target.length;
        i += target.length - 1;
      }
    }
  }
  const tail = input.slice(start).trim();
  if (tail) parts.push(tail);
  return parts;
}

function stripOuterParens(expr: string): string {
  let s = expr.trim();
  while (s.startsWith("(") && s.endsWith(")")) {
    let depth = 0;
    let quote: "'" | '"' | null = null;
    let balanced = true;
    for (let i = 0; i < s.length; i += 1) {
      const ch = s[i];
      if (quote) {
        if (ch === quote && s[i - 1] !== "\\") quote = null;
        continue;
      }
      if (ch === "'" || ch === '"') quote = ch;
      else if (ch === "(") depth += 1;
      else if (ch === ")") {
        depth -= 1;
        if (depth === 0 && i < s.length - 1) {
          balanced = false;
          break;
        }
      }
    }
    if (!balanced || depth !== 0) break;
    s = s.slice(1, -1).trim();
  }
  return s;
}

function parseLiteral(token: string): SqlValue {
  const trimmed = token.trim();
  if (/^NULL$/i.test(trimmed)) return null;
  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    return trimmed.slice(1, -1);
  }
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  return trimmed;
}

function resolveColumn(row: SqlRow, ref: string): SqlValue {
  const clean = ref.trim();
  if (clean in row) return row[clean];
  const bare = clean.includes(".") ? clean.split(".").pop()! : clean;
  if (bare in row) return row[bare];
  // Check suffixed keys from joins
  const matchKey = Object.keys(row).find((k) => k === clean || k.endsWith(`.${bare}`));
  return matchKey ? row[matchKey] : (undefined as unknown as SqlValue);
}

function compareValues(a: SqlValue, b: SqlValue): number {
  if (a === b) return 0;
  if (a === null) return -1;
  if (b === null) return 1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b));
}

function likeMatch(value: SqlValue, pattern: string): boolean {
  if (value === null) return false;
  const escaped = pattern
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/%/g, ".*")
    .replace(/_/g, ".");
  return new RegExp(`^${escaped}$`, "i").test(String(value));
}

function evalPredicate(row: SqlRow, clause: string): boolean {
  const expr = stripOuterParens(clause);
  const orParts = splitTopLevelKeyword(expr, "OR");
  if (orParts.length > 1) return orParts.some((p) => evalPredicate(row, p));

  const andParts = splitTopLevelKeyword(expr, "AND");
  if (andParts.length > 1) return andParts.every((p) => evalPredicate(row, p));

  // IS NOT NULL / IS NULL
  const isNullMatch = expr.match(/^(.+?)\s+IS\s+(NOT\s+)?NULL$/i);
  if (isNullMatch) {
    const val = resolveColumn(row, isNullMatch[1]);
    return isNullMatch[2] ? val !== null : val === null;
  }

  // BETWEEN
  const betweenMatch = expr.match(/^(.+?)\s+BETWEEN\s+(.+?)\s+AND\s+(.+)$/i);
  if (betweenMatch) {
    const val = resolveColumn(row, betweenMatch[1]);
    const low = parseLiteral(betweenMatch[2]);
    const high = parseLiteral(betweenMatch[3]);
    return val !== null && compareValues(val, low) >= 0 && compareValues(val, high) <= 0;
  }

  // IN (...)
  const inMatch = expr.match(/^(.+?)\s+(NOT\s+)?IN\s*\((.+)\)$/i);
  if (inMatch) {
    const val = resolveColumn(row, inMatch[1]);
    const list = splitTopLevel(inMatch[3]).map(parseLiteral);
    const found = list.some((item) => item === val);
    return inMatch[2] ? !found : found;
  }

  // LIKE
  const likeRe = expr.match(/^(.+?)\s+(NOT\s+)?LIKE\s+(.+)$/i);
  if (likeRe) {
    const val = resolveColumn(row, likeRe[1]);
    const pattern = String(parseLiteral(likeRe[3]) ?? "");
    const matched = likeMatch(val, pattern);
    return likeRe[2] ? !matched : matched;
  }

  // Binary comparison
  const cmpMatch = expr.match(/^(.+?)\s*(!=|<>|<=|>=|=|<|>)\s*(.+)$/);
  if (cmpMatch) {
    const leftVal = resolveColumn(row, cmpMatch[1]);
    const op = cmpMatch[2];
    const rightToken = cmpMatch[3].trim();
    const rightVal =
      rightToken.startsWith("'") ||
      rightToken.startsWith('"') ||
      /^-?\d+(\.\d+)?$/.test(rightToken) ||
      /^NULL$/i.test(rightToken)
        ? parseLiteral(rightToken)
        : resolveColumn(row, rightToken);

    if (leftVal === null || rightVal === null) {
      return op === "!=" || op === "<>" ? leftVal !== rightVal : false;
    }
    const cmp = compareValues(leftVal, rightVal);
    switch (op) {
      case "=":
        return cmp === 0;
      case "!=":
      case "<>":
        return cmp !== 0;
      case "<":
        return cmp < 0;
      case ">":
        return cmp > 0;
      case "<=":
        return cmp <= 0;
      case ">=":
        return cmp >= 0;
      default:
        return false;
    }
  }

  throw new Error(`Could not understand WHERE condition: "${expr}"`);
}

interface SelectItem {
  raw: string;
  expr: string;
  alias: string;
  agg?: { fn: "COUNT" | "SUM" | "AVG" | "MIN" | "MAX"; arg: string; distinct?: boolean };
}

function parseSelectItems(selectClause: string): SelectItem[] {
  return splitTopLevel(selectClause).map((part) => {
    const asMatch = part.match(/^(.+?)\s+AS\s+([a-zA-Z_][a-zA-Z0-9_]*)$/i);
    const expr = (asMatch ? asMatch[1] : part).trim();
    const defaultAlias = expr.includes(".") ? expr.split(".").pop()! : expr;
    const alias = (asMatch ? asMatch[2] : defaultAlias).trim();
    const aggMatch = expr.match(/^(COUNT|SUM|AVG|MIN|MAX)\s*\(\s*(DISTINCT\s+)?(.+?)\s*\)$/i);
    if (aggMatch) {
      return {
        raw: part,
        expr,
        alias: asMatch ? alias : expr.replace(/\s+/g, ""),
        agg: {
          fn: aggMatch[1].toUpperCase() as "COUNT" | "SUM" | "AVG" | "MIN" | "MAX",
          distinct: Boolean(aggMatch[2]),
          arg: aggMatch[3].trim(),
        },
      };
    }
    return { raw: part, expr, alias };
  });
}

function computeAggregate(agg: NonNullable<SelectItem["agg"]>, rows: SqlRow[]): SqlValue {
  if (agg.fn === "COUNT" && agg.arg === "*") return rows.length;
  let values = rows
    .map((r) => resolveColumn(r, agg.arg))
    .filter((v) => v !== null && v !== undefined);
  if (agg.distinct) {
    values = [...new Set(values)];
  }
  if (agg.fn === "COUNT") return values.length;
  if (values.length === 0) return null;

  const nums = values.map((v) => Number(v)).filter((n) => !Number.isNaN(n));
  if (agg.fn === "SUM") return nums.reduce((a, b) => a + b, 0);
  if (agg.fn === "AVG") {
    if (nums.length === 0) return null;
    return Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 100) / 100;
  }
  if (agg.fn === "MIN") {
    return values.reduce((min, v) => (compareValues(v, min) < 0 ? v : min), values[0]);
  }
  if (agg.fn === "MAX") {
    return values.reduce((max, v) => (compareValues(v, max) > 0 ? v : max), values[0]);
  }
  return null;
}

function findKeywordOffsets(sql: string): Record<string, number> {
  const keywords = ["FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT"];
  const positions: Record<string, number> = {};
  let depth = 0;
  let quote: "'" | '"' | null = null;
  const upper = sql.toUpperCase();

  for (let i = 0; i < sql.length; i += 1) {
    const ch = sql[i];
    if (quote) {
      if (ch === quote && sql[i - 1] !== "\\") quote = null;
      continue;
    }
    if (ch === "'" || ch === '"') {
      quote = ch;
      continue;
    }
    if (ch === "(") depth += 1;
    else if (ch === ")") depth = Math.max(0, depth - 1);
    else if (depth === 0) {
      for (const kw of keywords) {
        if (upper.startsWith(kw, i)) {
          const before = i === 0 ? " " : sql[i - 1];
          const after = i + kw.length >= sql.length ? " " : sql[i + kw.length];
          if (/\s/.test(before) && (/\s/.test(after) || after === "")) {
            if (!(kw in positions)) positions[kw] = i;
          }
        }
      }
    }
  }
  return positions;
}

export function executeMiniSql(
  rawQuery: string,
  db: Record<string, SqlTable> = CEA_SAMPLE_DATABASE,
): SqlExecution {
  const started = typeof performance !== "undefined" ? performance.now() : Date.now();
  const cleaned = rawQuery
    .replace(/--.*$/gm, "")
    .trim()
    .replace(/;+\s*$/, "")
    .trim();

  if (!cleaned) {
    return {
      ok: false,
      error: "Query is empty.",
      hint: "Try: SELECT * FROM customers LIMIT 5;",
    };
  }

  if (/^SHOW\s+TABLES$/i.test(cleaned)) {
    const rows = Object.values(db).map((t) => ({
      table_name: t.name,
      rows: t.rows.length,
      description: t.description,
    }));
    return {
      ok: true,
      columns: ["table_name", "rows", "description"],
      rows,
      rowCount: rows.length,
      elapsedMs: Math.max(
        1,
        Math.round((typeof performance !== "undefined" ? performance.now() : Date.now()) - started),
      ),
    };
  }

  const descMatch = cleaned.match(/^(?:DESCRIBE|DESC)\s+([a-zA-Z_][a-zA-Z0-9_]*)$/i);
  if (descMatch) {
    const table = db[descMatch[1].toLowerCase()];
    if (!table) {
      return {
        ok: false,
        error: `Unknown table "${descMatch[1]}".`,
        hint: `Available tables: ${Object.keys(db).join(", ")}.`,
      };
    }
    const rows = table.columns.map((c) => ({
      column_name: c.name,
      data_type: c.type,
      notes: c.note,
    }));
    return {
      ok: true,
      columns: ["column_name", "data_type", "notes"],
      rows,
      rowCount: rows.length,
      elapsedMs: 1,
    };
  }

  if (!/^SELECT\s+/i.test(cleaned)) {
    return {
      ok: false,
      error:
        "Only read-only SELECT, SHOW TABLES, and DESCRIBE queries are supported in this sandbox.",
      hint: "Start your query with SELECT ... FROM <table>.",
    };
  }

  try {
    const offsets = findKeywordOffsets(cleaned);
    if (offsets.FROM === undefined) {
      return {
        ok: false,
        error: "Missing FROM clause.",
        hint: "Specify a table, e.g. SELECT * FROM orders;",
      };
    }

    const selectRaw = cleaned.slice(6, offsets.FROM).trim();
    const isDistinct = /^DISTINCT\s+/i.test(selectRaw);
    const selectListRaw = isDistinct ? selectRaw.replace(/^DISTINCT\s+/i, "").trim() : selectRaw;

    const orderedSections = [
      { kw: "FROM", pos: offsets.FROM },
      { kw: "WHERE", pos: offsets.WHERE },
      { kw: "GROUP BY", pos: offsets["GROUP BY"] },
      { kw: "HAVING", pos: offsets.HAVING },
      { kw: "ORDER BY", pos: offsets["ORDER BY"] },
      { kw: "LIMIT", pos: offsets.LIMIT },
    ]
      .filter((s): s is { kw: string; pos: number } => s.pos !== undefined)
      .sort((a, b) => a.pos - b.pos);

    const sectionText = (kw: string): string | undefined => {
      const idx = orderedSections.findIndex((s) => s.kw === kw);
      if (idx === -1) return undefined;
      const start = orderedSections[idx].pos + kw.length;
      const end = idx + 1 < orderedSections.length ? orderedSections[idx + 1].pos : cleaned.length;
      return cleaned.slice(start, end).trim();
    };

    const fromClause = sectionText("FROM")!;
    const whereClause = sectionText("WHERE");
    const groupByClause = sectionText("GROUP BY");
    const havingClause = sectionText("HAVING");
    const orderByClause = sectionText("ORDER BY");
    const limitClause = sectionText("LIMIT");

    const reJoin = /\s+(?:(?:INNER|LEFT)\s+)?JOIN\s+/gi;
    const joinMatches = [...fromClause.matchAll(reJoin)];
    const joinSegments: string[] =
      joinMatches.length === 0
        ? [fromClause.trim()]
        : [
            fromClause.slice(0, joinMatches[0].index!).trim(),
            ...joinMatches.map((m, idx) =>
              fromClause
                .slice(
                  m.index!,
                  idx + 1 < joinMatches.length ? joinMatches[idx + 1].index! : fromClause.length,
                )
                .trim(),
            ),
          ];
    const baseMatch = joinSegments[0].match(
      /^([a-zA-Z_][a-zA-Z0-9_]*)(?:\s+(?:AS\s+)?([a-zA-Z_][a-zA-Z0-9_]*))?$/i,
    );
    if (!baseMatch) {
      return { ok: false, error: `Invalid FROM clause: "${joinSegments[0]}"` };
    }
    const baseTableName = baseMatch[1].toLowerCase();
    const baseAlias = baseMatch[2] || baseTableName;
    const baseTable = db[baseTableName];
    if (!baseTable) {
      return {
        ok: false,
        error: `Table "${baseMatch[1]}" does not exist.`,
        hint: `Available tables: ${Object.keys(db).join(", ")}.`,
      };
    }

    let workingRows: SqlRow[] = baseTable.rows.map((row) => {
      const qualified: SqlRow = { ...row };
      for (const [k, v] of Object.entries(row)) {
        qualified[`${baseAlias}.${k}`] = v;
        qualified[`${baseTableName}.${k}`] = v;
      }
      return qualified;
    });
    const activeColumnNames = baseTable.columns.map((c) => c.name);

    for (let j = 1; j < joinSegments.length; j += 1) {
      const jm = joinSegments[j].match(
        /^(INNER\s+|LEFT\s+)?JOIN\s+([a-zA-Z_][a-zA-Z0-9_]*)(?:\s+(?:AS\s+)?([a-zA-Z_][a-zA-Z0-9_]*))?\s+ON\s+([a-zA-Z0-9_.]+)\s*=\s*([a-zA-Z0-9_.]+)$/i,
      );
      if (!jm) {
        return {
          ok: false,
          error: `Could not parse JOIN clause: "${joinSegments[j]}"`,
          hint: "Use: JOIN table_name alias ON left.col = right.col",
        };
      }
      const isLeft = /^LEFT/i.test(jm[1] || "");
      const joinTableName = jm[2].toLowerCase();
      const joinAlias = jm[3] || joinTableName;
      const joinTable = db[joinTableName];
      if (!joinTable) {
        return {
          ok: false,
          error: `Joined table "${jm[2]}" does not exist.`,
          hint: `Available tables: ${Object.keys(db).join(", ")}.`,
        };
      }
      const leftCol = jm[4];
      const rightCol = jm[5];

      const nextRows: SqlRow[] = [];
      for (const leftRow of workingRows) {
        const leftVal = resolveColumn(leftRow, leftCol);
        let matchedAny = false;
        for (const rightRaw of joinTable.rows) {
          const rightQualified: SqlRow = {};
          for (const [k, v] of Object.entries(rightRaw)) {
            rightQualified[`${joinAlias}.${k}`] = v;
            rightQualified[`${joinTableName}.${k}`] = v;
            if (!(k in leftRow)) rightQualified[k] = v;
          }
          const rightVal =
            resolveColumn(rightQualified, rightCol) ?? resolveColumn(leftRow, rightCol);
          const candidateLeftVal =
            leftVal !== undefined ? leftVal : resolveColumn(rightQualified, leftCol);
          if (candidateLeftVal !== null && candidateLeftVal === rightVal) {
            matchedAny = true;
            nextRows.push({ ...leftRow, ...rightQualified });
          }
        }
        if (!matchedAny && isLeft) {
          const nulls: SqlRow = {};
          for (const c of joinTable.columns) {
            nulls[`${joinAlias}.${c.name}`] = null;
            nulls[`${joinTableName}.${c.name}`] = null;
            if (!(c.name in leftRow)) nulls[c.name] = null;
          }
          nextRows.push({ ...leftRow, ...nulls });
        }
      }
      workingRows = nextRows;
      for (const c of joinTable.columns) {
        if (!activeColumnNames.includes(c.name)) activeColumnNames.push(c.name);
      }
    }

    // WHERE
    if (whereClause) {
      workingRows = workingRows.filter((row) => evalPredicate(row, whereClause));
    }

    const selectItems: SelectItem[] =
      selectListRaw === "*"
        ? activeColumnNames.map((name) => ({ raw: name, expr: name, alias: name }))
        : parseSelectItems(selectListRaw);

    const hasAggregates = selectItems.some((item) => Boolean(item.agg));
    let outputRows: SqlRow[] = [];

    if (groupByClause || hasAggregates) {
      const groupCols = groupByClause ? splitTopLevel(groupByClause) : [];
      const groups = new Map<string, SqlRow[]>();

      for (const row of workingRows) {
        const key =
          groupCols.length === 0
            ? "__ALL__"
            : JSON.stringify(groupCols.map((g) => resolveColumn(row, g)));
        const bucket = groups.get(key) ?? [];
        bucket.push(row);
        groups.set(key, bucket);
      }

      if (groups.size === 0 && groupCols.length === 0) {
        groups.set("__ALL__", []);
      }

      for (const [, groupRows] of groups) {
        const sample = groupRows[0] ?? {};
        const outRow: SqlRow = {};
        for (const item of selectItems) {
          outRow[item.alias] = item.agg
            ? computeAggregate(item.agg, groupRows)
            : resolveColumn(sample, item.expr);
        }
        if (havingClause) {
          // Evaluate HAVING against output aliases or aggregate expressions
          const havingRow: SqlRow = { ...outRow };
          for (const item of selectItems) {
            havingRow[item.expr] = outRow[item.alias];
          }
          if (!evalPredicate(havingRow, havingClause)) continue;
        }
        outputRows.push(outRow);
      }
    } else {
      outputRows = workingRows.map((row) => {
        const outRow: SqlRow = {};
        for (const item of selectItems) {
          const val = resolveColumn(row, item.expr);
          if (val === undefined) {
            throw new Error(`Unknown column "${item.expr}".`);
          }
          outRow[item.alias] = val;
        }
        return outRow;
      });
    }

    if (isDistinct) {
      const seen = new Set<string>();
      outputRows = outputRows.filter((row) => {
        const key = JSON.stringify(row);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    if (orderByClause) {
      const orders = splitTopLevel(orderByClause).map((part) => {
        const m = part.match(/^(.+?)(?:\s+(ASC|DESC))?$/i);
        return {
          col: (m ? m[1] : part).trim(),
          dir: m?.[2]?.toUpperCase() === "DESC" ? -1 : 1,
        };
      });
      outputRows.sort((a, b) => {
        for (const ord of orders) {
          const cmp = compareValues(resolveColumn(a, ord.col), resolveColumn(b, ord.col));
          if (cmp !== 0) return cmp * ord.dir;
        }
        return 0;
      });
    }

    if (limitClause !== undefined) {
      const limit = Number(limitClause);
      if (!Number.isInteger(limit) || limit < 0) {
        return { ok: false, error: `Invalid LIMIT value "${limitClause}".` };
      }
      outputRows = outputRows.slice(0, limit);
    }

    const columns = selectItems.map((i) => i.alias);
    const elapsedMs = Math.max(
      1,
      Math.round((typeof performance !== "undefined" ? performance.now() : Date.now()) - started),
    );
    return {
      ok: true,
      columns,
      rows: outputRows,
      rowCount: outputRows.length,
      elapsedMs,
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Could not execute SQL query.",
      hint: "Check column names with DESCRIBE orders; and string literals with single quotes e.g. 'Port Harcourt'.",
    };
  }
}
