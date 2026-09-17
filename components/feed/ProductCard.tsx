import Link from "next/link";
import type { FeedItem } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { ProductGallery } from "./ProductGallery";
import { StoreRow } from "./StoreRow";
import { ProductBadge, AvailabilityTag, Rating } from "./ProductMeta";
import { SaveButton } from "@/components/ui/SaveButton";
import { ShareButton } from "@/components/ui/ShareButton";
import { QuickQuestion } from "@/components/ui/QuickQuestion";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function ProductCard({ item }: { item: FeedItem }) {
  if (!item.product) return null;
  const { product, store } = item;

  return (
    <article className="px-4 py-3">
      <div className="relative">
        <ProductGallery images={item.images} alt={product.name} />
        {item.badge && <ProductBadge label={item.badge} />}

        {/* Riel de acciones en el borde derecho, zona de alcance del pulgar */}
        <div className="absolute bottom-3 right-3 flex flex-col items-center gap-2.5">
          <SaveButton productId={product.id} />
          <QuickQuestion href={`/chat?producto=${product.id}`} overlay />
          <WhatsAppButton store={store} product={product} overlay />
          <ShareButton title={product.name} overlay />
        </div>
      </div>

      <StoreRow store={store} />

      <Link href={`/producto/${product.id}`} className="block">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[15px] font-medium leading-snug text-ink">
            {product.name}
          </h3>
          {!!product.rating && <Rating value={product.rating} />}
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-display text-[16px] font-semibold text-ink">
            {formatPrice(product.price, product.currency)}
          </span>
          <AvailabilityTag availability={product.availability} />
        </div>
      </Link>
    </article>
  );
}
