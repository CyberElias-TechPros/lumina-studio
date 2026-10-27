/**
 * ngadverts zone configuration.
 *
 * The network's snippet is a container div plus a script that fills it:
 *
 *   <div id="adm-container-13225"></div>
 *   <script src="//app.ngadverts.com/display/items.php?13225&5984&300&250&1&0&5&responsive=1">
 *
 * Two things about that snippet drive the implementation in
 * `src/components/marketing/ngadverts.tsx`:
 *
 * 1. The container id is derived from the zone id, so a page can only host one
 *    instance of this zone without producing duplicate element ids. One zone is
 *    therefore rendered per page — the highest-value position, chosen by the
 *    `primary` flag in `src/lib/ads/slots.ts`. To place a second unit on the same
 *    page you need a second zone id from ngadverts; add it here and give it its
 *    own slot declaration.
 * 2. The script is a direct download from a third party, so it is only injected
 *    after the visitor has granted optional-cookie consent, never on first paint.
 */

export type AdZone = {
  /** Numeric zone id from the network dashboard. */
  zone: string;
  /** Publisher/site id from the network dashboard. */
  site: string;
  width: number;
  height: number;
  /** Network label, used for the disclosure text. */
  network: string;
};

export const NGADVERTS: AdZone = {
  zone: "13225",
  site: "5984",
  width: 300,
  height: 250,
  network: "ngadverts",
};

/** HTTPS explicitly: the site is served over HTTPS and `//` inherits the scheme. */
export function zoneScriptSrc(adZone: AdZone = NGADVERTS): string {
  const params = [adZone.zone, adZone.site, adZone.width, adZone.height, 1, 0, 5].join("&");
  return `https://app.ngadverts.com/display/items.php?${params}&responsive=1`;
}

export function zoneContainerId(adZone: AdZone = NGADVERTS): string {
  return `adm-container-${adZone.zone}`;
}
