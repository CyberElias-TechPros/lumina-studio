import { isoNow, newId } from "./ids.ts";

/**
 * Stock movement helpers.
 *
 * `stock_movements` is the append-only ledger; `products.quantity` is a cached
 * running total. Both are written together so the cache can never silently drift
 * from the ledger, and the ledger lets us answer "how did we get to 3 left?"
 *
 * Business rule: invoicing moves stock only once the invoice is **sent**. Drafts
 * are stock-neutral so a half-finished quote never reserves real inventory, and
 * voiding an invoice returns the units.
 */

export interface StockDelta {
  productId: string;
  quantity: number; // positive count of units moving out (sale) or in (receipt)
  unitCost: number; // kobo; used for 'in'
  note?: string;
}

/**
 * Statements that write movements for a document and re-derive `products.quantity`
 * from the ledger for exactly the products touched. Intended to run inside the
 * caller's `db.batch([...])`.
 *
 * `referenceType`/`referenceId` scope the recompute, so a concurrent movement on
 * the same product cannot be double-counted.
 */
export function stockStatements(
  db: D1Database,
  opts: {
    referenceType: string;
    referenceId: string;
    createdById: string | null;
    movements: Array<StockDelta & { direction: "in" | "out" }>;
  },
): D1PreparedStatement[] {
  const now = isoNow();
  const stmts: D1PreparedStatement[] = [];

  for (const m of opts.movements) {
    if (!m.productId || m.quantity <= 0) continue;
    stmts.push(
      db
        .prepare(
          `INSERT INTO stock_movements
             (id, product_id, direction, quantity, unit_cost, reference_type, reference_id, note, created_by, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(
          newId(),
          m.productId,
          m.direction,
          m.quantity,
          m.unitCost ?? 0,
          opts.referenceType,
          opts.referenceId,
          m.note ?? null,
          opts.createdById,
          now,
        ),
    );
  }

  if (stmts.length > 0) {
    // One aggregate statement re-derives the cache for every product this
    // document touched, rather than one UPDATE per line item.
    stmts.push(
      db
        .prepare(
          `UPDATE products
              SET quantity = MAX(0, quantity - COALESCE((
                    SELECT SUM(m.quantity) FROM stock_movements m
                     WHERE m.product_id = products.id
                       AND m.direction = 'out'
                       AND m.reference_type = ?
                       AND m.reference_id = ?), 0)
                  + COALESCE((
                    SELECT SUM(m.quantity) FROM stock_movements m
                     WHERE m.product_id = products.id
                       AND m.direction = 'in'
                       AND m.reference_type = ?
                       AND m.reference_id = ?), 0)),
                  updated_at = ?
            WHERE id IN (
                    SELECT DISTINCT product_id FROM stock_movements
                     WHERE reference_type = ? AND reference_id = ? AND product_id IS NOT NULL)`,
        )
        .bind(opts.referenceType, opts.referenceId, opts.referenceType, opts.referenceId, now, opts.referenceType, opts.referenceId),
    );
  }

  return stmts;
}

/**
 * Reverse every stock effect of a document by inserting compensating movements
 * (never by deleting history) and re-deriving the cache.
 */
export function reversalStatements(
  db: D1Database,
  opts: { referenceType: string; referenceId: string; createdById: string | null; note: string },
): D1PreparedStatement[] {
  const now = isoNow();
  const reversalRef = `${opts.referenceType}:reversal`;
  return [
    db
      .prepare(
        `INSERT INTO stock_movements
           (id, product_id, direction, quantity, unit_cost, reference_type, reference_id, note, created_by, created_at)
         SELECT ?, product_id,
                CASE WHEN direction = 'out' THEN 'in' ELSE 'out' END,
                quantity, unit_cost, ?, ?, ?, ?, ?
           FROM stock_movements
          WHERE reference_type = ? AND reference_id = ?
            AND product_id IS NOT NULL
            AND reference_type NOT LIKE '%:reversal'`,
      )
      .bind(newId(), reversalRef, opts.referenceId, opts.note, opts.createdById, now, opts.referenceType, opts.referenceId),
    db
      .prepare(
        `UPDATE products
            SET quantity = MAX(0, quantity - COALESCE((
                  SELECT SUM(m.quantity) FROM stock_movements m
                   WHERE m.product_id = products.id AND m.direction = 'out'
                     AND m.reference_type = ? AND m.reference_id = ?), 0)
                + COALESCE((
                  SELECT SUM(m.quantity) FROM stock_movements m
                   WHERE m.product_id = products.id AND m.direction = 'in'
                     AND m.reference_type = ? AND m.reference_id = ?), 0)),
                updated_at = ?
          WHERE id IN (SELECT DISTINCT product_id FROM stock_movements
                        WHERE reference_type = ? AND reference_id = ? AND product_id IS NOT NULL)`,
      )
      .bind(reversalRef, opts.referenceId, reversalRef, opts.referenceId, now, reversalRef, opts.referenceId),
  ];
}
