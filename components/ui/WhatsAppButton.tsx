import { IconWhatsapp } from "@/components/icons";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { Product, Store } from "@/lib/types";

export function WhatsAppButton({
  store,
  product,
  selectedVariants,
}: {
  store: Store;
  product: Product;
  selectedVariants?: Record<string, string>;
}) {
  const disabled = product.availability === "out_of_stock";

  if (disabled) {
    return (
      <span className="flex h-11 flex-1 items-center justify-center gap-2 rounded-pill bg-graphite px-4 text-[13.5px] font-semibold text-ink-faint">
        <IconWhatsapp size={16} />
        Sin stock por ahora
      </span>
    );
  }

  return (
    <a
      href={buildWhatsAppLink(store, product, selectedVariants)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 flex-1 items-center justify-center gap-2 rounded-pill bg-whats px-4 text-[13.5px] font-semibold text-void transition-transform active:scale-[0.98]"
    >
      <IconWhatsapp size={16} />
      Comprar por WhatsApp
    </a>
  );
}
