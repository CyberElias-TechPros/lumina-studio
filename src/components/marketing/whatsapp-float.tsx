import { MessageCircle } from "lucide-react";
import { WHATSAPP_DEFAULT } from "@/lib/contact";

/**
 * Floating WhatsApp chat button — visible on every public page.
 * WhatsApp is the academy's preferred contact channel.
 */
export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_DEFAULT}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 left-5 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] py-3 pr-5 pl-4 text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(37,211,102,0.55)] motion-reduce:transition-none"
    >
      <MessageCircle className="size-5" />
      <span className="text-sm font-bold">Chat with us</span>
    </a>
  );
}
