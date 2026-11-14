/** Reject large count mismatches and duplicate image references. The tolerated
 * one/two count gap reflects a known 87/88 supplier discrepancy and is not a
 * claim that the source is complete. Never infer an unseen item's stock. */
export function validateCompleteObservation(cards, total, ended) {
  if (
    !ended ||
    !Number.isSafeInteger(total) ||
    total < 1 ||
    total > 500 ||
    cards.length > total ||
    total - cards.length > 2 ||
    cards.length < Math.ceil(total * 0.97) ||
    new Set(cards.map((c) => c.imageUrl)).size !== cards.length
  )
    throw new Error(`Incomplete or duplicate snapshot (${cards.length}/${total}); no update sent.`);
}
export function normalizeCards(cards) {
  return cards.map((card) => ({
    imageUrl: card.imageUrl,
    title: card.title,
    condition: /^(UK Used|Brand New)$/i.test(card.condition ?? "")
      ? card.condition.toLowerCase() === "uk used"
        ? "UK Used"
        : "Brand New"
      : null,
    quantity: card.quantity === null ? null : Number(card.quantity),
    pricesKobo: card.prices.map((p) => {
      if (!/^(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{1,2})?$/.test(p))
        throw new Error("Invalid supplier price; no update sent.");
      const [whole, decimal = ""] = p.replace(/,/g, "").split(".");
      const amount = Number(whole) * 100 + Number((decimal + "00").slice(0, 2));
      if (!Number.isSafeInteger(amount) || amount < 1 || amount > 100_000_000_000)
        throw new Error("Supplier price out of range; no update sent.");
      return amount;
    }),
  }));
}

/** Bounded pagination followed by stability checks; caller supplies all I/O. */
export async function collectSnapshot(read, wait) {
  let total = null,
    first = null,
    last = null,
    lastPage = 0,
    ended = false;
  const cards = [];
  for (let n = 1; n <= 26; n++) {
    const result = await read(n);
    if (
      !Number.isSafeInteger(result.total) ||
      result.total < 1 ||
      result.total > 500 ||
      (total !== null && total !== result.total)
    )
      throw new Error("Inconsistent supplier total; no update sent.");
    total = result.total;
    if (!result.cards.length) {
      if (n === 1) throw new Error("First page is empty.");
      ended = true;
      break;
    }
    if (n === 1) first = JSON.stringify(result.cards);
    last = JSON.stringify(result.cards);
    lastPage = n;
    cards.push(...result.cards);
    if (cards.length > total) throw new Error("Supplier pages overlap or exceed total.");
    await wait();
  }
  validateCompleteObservation(cards, total, ended);
  await wait();
  const checkFirst = await read(1),
    checkLast = await read(lastPage);
  if (
    checkFirst.total !== total ||
    checkLast.total !== total ||
    JSON.stringify(checkFirst.cards) !== first ||
    JSON.stringify(checkLast.cards) !== last
  )
    throw new Error("Supplier listing changed during collection; no update sent.");
  return { total, cards: normalizeCards(cards) };
}
