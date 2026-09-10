/**
 * Canonical contact details for Cyber Elias Academy.
 * Single source of truth — every page, CTA and schema block should
 * reference these so phone/address/socials can never drift.
 */

export const CONTACT = {
  /** Display phone (also the WhatsApp line). */
  phoneDisplay: "+234 905 862 8386",
  /** tel: link target. */
  phoneHref: "tel:+2349058628386",
  /** WhatsApp number in international format without "+". */
  whatsappNumber: "2349058628386",
  email: "hello@cea.ng",
  admissionsEmail: "admissions@cea.ng",
  address: {
    street: "26 Ebony Road, Off Rumuola Road",
    city: "Port Harcourt",
    region: "Rivers State",
    country: "Nigeria",
  },
  hours: "Mon–Sat, 8:00–20:00 WAT",
} as const;

export const SOCIALS = {
  x: "https://x.com/cybeliasacademy",
  instagram: "https://www.instagram.com/cyberelias.tk/",
  youtube: "https://www.youtube.com/@CyberEliasAcademy",
  facebook: "https://www.facebook.com/cybereliasacademy/",
  linkedin: "https://www.linkedin.com/company/cyber-elias-academy",
} as const;

/** Build a wa.me deep link with a pre-filled message. */
export function whatsappUrl(message = "Hello CEA! I'd like to find out more about your programs.") {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_DEFAULT = whatsappUrl();

export const fullAddress = `${CONTACT.address.street}, ${CONTACT.address.city}, ${CONTACT.address.region}, ${CONTACT.address.country}`;

/** Google Maps search link for the campus address. */
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
