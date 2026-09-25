/**
 * Shared transactional email layout. All dynamic values MUST go through
 * `escapeHtml` — names, messages and titles are user-controlled.
 */

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function emailLayout(opts: {
  heading: string;
  bodyHtml: string;
  cta?: { label: string; url: string };
  footnote?: string;
}): string {
  const cta = opts.cta
    ? `<p style="margin:24px 0"><a href="${escapeHtml(opts.cta.url)}" style="background:#4f46e5;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600">${escapeHtml(opts.cta.label)}</a></p>`
    : "";
  const foot = opts.footnote
    ? `<p style="color:#6b7280;font-size:12px;margin-top:24px">${opts.footnote}</p>`
    : "";
  return `<!doctype html><html><body style="margin:0;background:#f5f5f7;font-family:Arial,Helvetica,sans-serif;color:#111827">
<div style="max-width:560px;margin:0 auto;padding:32px 20px">
<div style="background:#fff;border-radius:12px;padding:28px">
<p style="font-weight:800;color:#4f46e5;margin:0 0 16px">Cyber Elias Academy</p>
<h1 style="font-size:20px;margin:0 0 12px">${escapeHtml(opts.heading)}</h1>
${opts.bodyHtml}${cta}${foot}
</div>
<p style="color:#9ca3af;font-size:11px;text-align:center;margin-top:16px">Cyber Elias Academy · cea.ng</p>
</div></body></html>`;
}
