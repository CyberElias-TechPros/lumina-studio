/**
 * Pure-TypeScript browser spreadsheet formula engine for CEA Spreadsheet & Formula Lab.
 *
 * Supports A1-style grid references, ranges (B2:B7), arithmetic (+, -, *, /),
 * comparisons (=, !=, <>, <, >, <=, >=), and core Excel functions:
 *   SUM, AVERAGE, COUNT, COUNTA, MIN, MAX, ROUND, IF, SUMIF, COUNTIF, VLOOKUP
 */

export type CellMap = Record<string, string>;

export interface EvaluatedCell {
  raw: string;
  value: string | number;
  display: string;
  error?: string;
}

const COLS = ["A", "B", "C", "D", "E", "F"] as const;

export function colIndex(letter: string): number {
  return COLS.indexOf(letter.toUpperCase() as (typeof COLS)[number]);
}

export function expandRange(rangeExpr: string): string[] {
  const m = rangeExpr.trim().match(/^([A-F])(\d+):([A-F])(\d+)$/i);
  if (!m) return [];
  const c1 = colIndex(m[1]);
  const r1 = Number(m[2]);
  const c2 = colIndex(m[3]);
  const r2 = Number(m[4]);
  if (c1 < 0 || c2 < 0) return [];
  const startC = Math.min(c1, c2);
  const endC = Math.max(c1, c2);
  const startR = Math.min(r1, r2);
  const endR = Math.max(r1, r2);
  const refs: string[] = [];
  for (let r = startR; r <= endR; r += 1) {
    for (let c = startC; c <= endC; c += 1) {
      refs.push(`${COLS[c]}${r}`);
    }
  }
  return refs;
}

function splitArgs(raw: string): string[] {
  const args: string[] = [];
  let depth = 0;
  let quote: '"' | "'" | null = null;
  let start = 0;

  for (let i = 0; i < raw.length; i += 1) {
    const ch = raw[i];
    if (quote) {
      if (ch === quote && raw[i - 1] !== "\\") quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (ch === "(") depth += 1;
    else if (ch === ")") depth = Math.max(0, depth - 1);
    else if (depth === 0 && ch === ",") {
      args.push(raw.slice(start, i).trim());
      start = i + 1;
    }
  }
  const tail = raw.slice(start).trim();
  if (tail) args.push(tail);
  return args;
}

function toNumber(v: string | number): number | null {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  const cleaned = v.replace(/[₦,\s]/g, "");
  if (cleaned === "") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function matchesCriterion(val: string | number, criterionRaw: string): boolean {
  const crit = criterionRaw.replace(/^["']|["']$/g, "").trim();
  const cmpMatch = crit.match(/^(<=|>=|<>|!=|=|<|>)(.+)$/);
  if (cmpMatch) {
    const op = cmpMatch[1];
    const targetNum = toNumber(cmpMatch[2]);
    const valNum = toNumber(val);
    if (targetNum !== null && valNum !== null) {
      switch (op) {
        case "=":
          return valNum === targetNum;
        case "<>":
        case "!=":
          return valNum !== targetNum;
        case "<":
          return valNum < targetNum;
        case ">":
          return valNum > targetNum;
        case "<=":
          return valNum <= targetNum;
        case ">=":
          return valNum >= targetNum;
      }
    }
    const a = String(val).toLowerCase();
    const b = cmpMatch[2].trim().toLowerCase();
    return op === "<>" || op === "!=" ? a !== b : a === b;
  }
  const valNum = toNumber(val);
  const critNum = toNumber(crit);
  if (valNum !== null && critNum !== null) return valNum === critNum;
  return String(val).trim().toLowerCase() === crit.toLowerCase();
}

export function evaluateSheet(cells: CellMap): Record<string, EvaluatedCell> {
  const cache: Record<string, EvaluatedCell> = {};
  const visiting = new Set<string>();

  function evalCell(ref: string): EvaluatedCell {
    const key = ref.toUpperCase();
    if (cache[key]) return cache[key];
    const raw = (cells[key] ?? "").trim();

    if (!raw.startsWith("=")) {
      const num =
        raw !== "" && /^-?[\d,]+(\.\d+)?$/.test(raw) ? Number(raw.replace(/,/g, "")) : null;
      const res: EvaluatedCell = {
        raw,
        value: num !== null ? num : raw,
        display: raw,
      };
      cache[key] = res;
      return res;
    }

    if (visiting.has(key)) {
      return { raw, value: "#CYCLE!", display: "#CYCLE!", error: "Circular reference detected" };
    }
    visiting.add(key);

    try {
      const val = evalFormula(raw.slice(1).trim());
      if (typeof val === "string" && val.startsWith("#")) {
        const res: EvaluatedCell = { raw, value: val, display: val, error: val };
        cache[key] = res;
        return res;
      }
      const display =
        typeof val === "number"
          ? Number.isInteger(val)
            ? val.toLocaleString("en-NG")
            : val.toLocaleString("en-NG", { maximumFractionDigits: 2 })
          : String(val);
      const res: EvaluatedCell = { raw, value: val, display };
      cache[key] = res;
      return res;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "#ERROR!";
      const code = msg.startsWith("#") ? msg : "#VALUE!";
      const res: EvaluatedCell = { raw, value: code, display: code, error: msg };
      cache[key] = res;
      return res;
    } finally {
      visiting.delete(key);
    }
  }

  function collectRangeValues(arg: string): (string | number)[] {
    if (/^[A-F]\d+:[A-F]\d+$/i.test(arg.trim())) {
      return expandRange(arg.trim()).map((r) => evalCell(r).value);
    }
    if (/^[A-F]\d+$/i.test(arg.trim())) {
      return [evalCell(arg.trim()).value];
    }
    return [evalFormula(arg)];
  }

  function evalCondition(cond: string): boolean {
    const m = cond.match(/^(.+?)(<=|>=|<>|!=|=|<|>)(.+)$/);
    if (!m) {
      const v = evalFormula(cond);
      return Boolean(v && v !== 0 && String(v).toLowerCase() !== "false");
    }
    const left = evalFormula(m[1].trim());
    const right = evalFormula(m[3].trim());
    const op = m[2];
    const ln = toNumber(left);
    const rn = toNumber(right);
    if (ln !== null && rn !== null) {
      switch (op) {
        case "=":
          return ln === rn;
        case "<>":
        case "!=":
          return ln !== rn;
        case "<":
          return ln < rn;
        case ">":
          return ln > rn;
        case "<=":
          return ln <= rn;
        case ">=":
          return ln >= rn;
      }
    }
    const ls = String(left).toLowerCase();
    const rs = String(right).toLowerCase();
    return op === "<>" || op === "!=" ? ls !== rs : ls === rs;
  }

  function evalFormula(expr: string): string | number {
    const trimmed = expr.trim();
    if (!trimmed) return "";

    if (
      (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
      return trimmed.slice(1, -1);
    }

    if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);

    // Replace function calls iteratively from innermost/top-level
    const fnMatch = trimmed.match(/^([A-Z]+)\(([\s\S]*)\)$/i);
    if (fnMatch) {
      // Ensure the outer parens actually match the function call (not e.g. SUM(A1:A3)+SUM(B1:B3))
      let depth = 0;
      let quote: '"' | "'" | null = null;
      let isSingleCall = true;
      const startParen = trimmed.indexOf("(");
      for (let i = startParen; i < trimmed.length; i += 1) {
        const ch = trimmed[i];
        if (quote) {
          if (ch === quote) quote = null;
          continue;
        }
        if (ch === '"' || ch === "'") {
          quote = ch;
          continue;
        }
        if (ch === "(") depth += 1;
        else if (ch === ")") {
          depth -= 1;
          if (depth === 0 && i < trimmed.length - 1) {
            isSingleCall = false;
            break;
          }
        }
      }

      if (isSingleCall) {
        const fn = fnMatch[1].toUpperCase();
        const args = splitArgs(fnMatch[2]);

        if (fn === "SUM") {
          const nums = args
            .flatMap(collectRangeValues)
            .map(toNumber)
            .filter((n): n is number => n !== null);
          return nums.reduce((a, b) => a + b, 0);
        }
        if (fn === "AVERAGE") {
          const nums = args
            .flatMap(collectRangeValues)
            .map(toNumber)
            .filter((n): n is number => n !== null);
          if (nums.length === 0) throw new Error("#DIV/0!");
          return nums.reduce((a, b) => a + b, 0) / nums.length;
        }
        if (fn === "COUNT") {
          return args.flatMap(collectRangeValues).filter((v) => toNumber(v) !== null).length;
        }
        if (fn === "COUNTA") {
          return args.flatMap(collectRangeValues).filter((v) => String(v).trim() !== "").length;
        }
        if (fn === "MIN") {
          const nums = args
            .flatMap(collectRangeValues)
            .map(toNumber)
            .filter((n): n is number => n !== null);
          return nums.length ? Math.min(...nums) : 0;
        }
        if (fn === "MAX") {
          const nums = args
            .flatMap(collectRangeValues)
            .map(toNumber)
            .filter((n): n is number => n !== null);
          return nums.length ? Math.max(...nums) : 0;
        }
        if (fn === "ROUND") {
          const num = toNumber(evalFormula(args[0] ?? "0"));
          const digits = toNumber(evalFormula(args[1] ?? "0")) ?? 0;
          if (num === null) throw new Error("#VALUE!");
          const factor = 10 ** digits;
          return Math.round(num * factor) / factor;
        }
        if (fn === "IF") {
          if (args.length < 2) throw new Error("#VALUE!");
          return evalCondition(args[0])
            ? evalFormula(args[1])
            : args[2] !== undefined
              ? evalFormula(args[2])
              : "FALSE";
        }
        if (fn === "COUNTIF") {
          if (args.length < 2) throw new Error("#VALUE!");
          const vals = collectRangeValues(args[0]);
          const crit = String(evalFormula(args[1]));
          return vals.filter((v) => matchesCriterion(v, crit)).length;
        }
        if (fn === "SUMIF") {
          if (args.length < 2) throw new Error("#VALUE!");
          const rangeRefs = expandRange(args[0]);
          const crit = String(evalFormula(args[1]));
          const sumRefs = args[2] ? expandRange(args[2]) : rangeRefs;
          let sum = 0;
          for (let i = 0; i < rangeRefs.length; i += 1) {
            const testVal = evalCell(rangeRefs[i]).value;
            if (matchesCriterion(testVal, crit)) {
              const addNum = toNumber(evalCell(sumRefs[i] ?? rangeRefs[i]).value);
              if (addNum !== null) sum += addNum;
            }
          }
          return sum;
        }
        if (fn === "VLOOKUP") {
          if (args.length < 3) throw new Error("#VALUE!");
          const needle = evalFormula(args[0]);
          const m = args[1].trim().match(/^([A-F])(\d+):([A-F])(\d+)$/i);
          const colIdx = toNumber(evalFormula(args[2]));
          if (!m || !colIdx || colIdx < 1) throw new Error("#REF!");
          const startC = colIndex(m[1]);
          const startR = Number(m[2]);
          const endC = colIndex(m[3]);
          const endR = Number(m[4]);
          const targetCol = startC + colIdx - 1;
          if (targetCol > endC || targetCol >= COLS.length) throw new Error("#REF!");
          for (let r = startR; r <= endR; r += 1) {
            const firstVal = evalCell(`${COLS[startC]}${r}`).value;
            if (String(firstVal).trim().toLowerCase() === String(needle).trim().toLowerCase()) {
              return evalCell(`${COLS[targetCol]}${r}`).value;
            }
          }
          return "#N/A";
        }
        throw new Error(`#NAME? (${fn})`);
      }
    }

    if (/^[A-F]\d+$/i.test(trimmed)) {
      const v = evalCell(trimmed).value;
      if (typeof v === "string" && v.startsWith("#")) throw new Error(v);
      return v === "" ? 0 : v;
    }

    // Arithmetic evaluator: resolve function calls and cell refs first, then parse + - * /
    const resolvedExpr = resolveInlineTokens(trimmed);
    return evalArithmetic(resolvedExpr);
  }

  function resolveInlineTokens(expr: string): string {
    let out = "";
    let i = 0;
    let quote: '"' | "'" | null = null;
    while (i < expr.length) {
      const ch = expr[i];
      if (quote) {
        out += ch;
        if (ch === quote) quote = null;
        i += 1;
        continue;
      }
      if (ch === '"' || ch === "'") {
        quote = ch;
        out += ch;
        i += 1;
        continue;
      }
      // Function call token: WORD(...)
      const fnStart = expr.slice(i).match(/^([A-Z]+)\(/i);
      if (fnStart) {
        let depth = 0;
        let q: '"' | "'" | null = null;
        let end = i + fnStart[1].length;
        for (; end < expr.length; end += 1) {
          const c = expr[end];
          if (q) {
            if (c === q) q = null;
            continue;
          }
          if (c === '"' || c === "'") {
            q = c;
            continue;
          }
          if (c === "(") depth += 1;
          else if (c === ")") {
            depth -= 1;
            if (depth === 0) break;
          }
        }
        const callStr = expr.slice(i, end + 1);
        const val = evalFormula(callStr);
        const num = toNumber(val);
        out += num !== null ? String(num) : JSON.stringify(String(val));
        i = end + 1;
        continue;
      }
      // Cell ref token: A1..F99
      const cellMatch = expr.slice(i).match(/^([A-F]\d+)(?![A-Z0-9_])/i);
      if (cellMatch) {
        const val = evalCell(cellMatch[1]).value;
        if (typeof val === "string" && val.startsWith("#")) throw new Error(val);
        const num = toNumber(val);
        out += num !== null ? String(num) : "0";
        i += cellMatch[1].length;
        continue;
      }
      out += ch;
      i += 1;
    }
    return out;
  }

  function evalArithmetic(expr: string): number {
    let pos = 0;
    const s = expr.replace(/\s+/g, "");

    function parseExpr(): number {
      let left = parseTerm();
      while (pos < s.length && (s[pos] === "+" || s[pos] === "-")) {
        const op = s[pos++];
        const right = parseTerm();
        left = op === "+" ? left + right : left - right;
      }
      return left;
    }

    function parseTerm(): number {
      let left = parseFactor();
      while (pos < s.length && (s[pos] === "*" || s[pos] === "/")) {
        const op = s[pos++];
        const right = parseFactor();
        if (op === "/") {
          if (right === 0) throw new Error("#DIV/0!");
          left /= right;
        } else {
          left *= right;
        }
      }
      return left;
    }

    function parseFactor(): number {
      if (s[pos] === "+") {
        pos += 1;
        return parseFactor();
      }
      if (s[pos] === "-") {
        pos += 1;
        return -parseFactor();
      }
      if (s[pos] === "(") {
        pos += 1;
        const val = parseExpr();
        if (s[pos] !== ")") throw new Error("#VALUE!");
        pos += 1;
        return val;
      }
      const numMatch = s.slice(pos).match(/^\d+(\.\d+)?/);
      if (!numMatch) throw new Error("#VALUE!");
      pos += numMatch[0].length;
      return Number(numMatch[0]);
    }

    const result = parseExpr();
    if (pos < s.length) throw new Error("#VALUE!");
    return Math.round(result * 10000) / 10000;
  }

  for (const key of Object.keys(cells)) {
    evalCell(key);
  }
  return cache;
}
