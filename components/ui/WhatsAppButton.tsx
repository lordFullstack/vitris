import { IconWhatsapp } from "@/components/icons";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { Product, Store } from "@/lib/types";

export function WhatsAppButton({
  store,
  product,
  selectedVariants,
  overlay = false,
}: {
  store: Store;
  product: Product;
  selectedVariants?: Record<string, string>;
  overlay?: boolean;
}) {
  const disabled = product.availability === "out_of_stock";

  if (overlay) {
    if (disabled) return null;
    return (
      <a
        href={buildWhatsAppLink(store, product, selectedVariants)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
        data-event="WHATSAPP_FALLBACK"
        className="flex h-11 w-11 items-center justify-center rounded-pill bg-void/55 text-whats backdrop-blur-md transition-transform active:scale-90"
      >
        <IconWhatsapp size={19} />
      </a>
    );
  }

  if (disabled) {
    return (
      <span className="flex h-11 items-center justify-center gap-2 rounded-pill border border-graphite-line px-4 text-[13.5px] font-semibold text-ink-faint">
        <IconWhatsapp size={16} />
        Sin stock
      </span>
    );
  }

  return (
    <a
      href={buildWhatsAppLink(store, product, selectedVariants)}
      target="_blank"
      rel="noopener noreferrer"
      data-event="WHATSAPP_FALLBACK"
      className="flex h-11 items-center justify-center gap-2 rounded-pill border border-whats px-4 text-[13.5px] font-semibold text-whats transition-transform active:scale-[0.98]"
    >
      <IconWhatsapp size={16} />
      WhatsApp
    </a>
  );
}
