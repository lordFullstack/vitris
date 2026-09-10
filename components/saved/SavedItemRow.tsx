import Link from "next/link";
import type { ProductDetail } from "@/lib/types";
import type { SavedEntry } from "@/lib/saved-context";
import { formatPrice } from "@/lib/whatsapp";
import { formatRelativeDate } from "@/lib/format";
import { AvailabilityTag } from "@/components/feed/ProductMeta";
import { SaveButton } from "@/components/ui/SaveButton";
import { IconMore } from "@/components/icons";

export function SavedItemRow({
  entry,
  product,
  onMove,
}: {
  entry: SavedEntry;
  product: ProductDetail;
  onMove: () => void;
}) {
  const distance =
    typeof product.store.distanceKm === "number"
      ? product.store.distanceKm < 1
        ? `${Math.round(product.store.distanceKm * 1000)} m`
        : `${product.store.distanceKm.toFixed(1)} km`
      : null;

  return (
    <div className="flex gap-3 border-b border-graphite-line/40 px-4 py-3">
      <Link href={`/producto/${product.id}`} className="flex-shrink-0">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-24 w-20 rounded-card object-cover"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <Link href={`/producto/${product.id}`}>
          <p className="line-clamp-2 text-[14px] font-medium leading-snug text-ink">
            {product.name}
          </p>
        </Link>
        <p className="mt-0.5 text-[12.5px] text-ink-faint">
          {product.store.name}
          {distance && ` · ${distance}`}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-[14px] font-semibold text-ink">
            {formatPrice(product.price, product.currency)}
          </span>
          <AvailabilityTag availability={product.availability} />
        </div>
        <p className="mt-1 text-[11.5px] text-ink-faint">
          Guardado {formatRelativeDate(entry.savedAt)}
        </p>
      </div>
      <div className="flex flex-shrink-0 flex-col items-center gap-1">
        <SaveButton productId={product.id} variant="plain" />
        <button
          type="button"
          aria-label="Mover a lista"
          onClick={onMove}
          className="flex h-9 w-9 items-center justify-center rounded-pill text-ink-faint transition-colors active:bg-graphite-elevated"
        >
          <IconMore size={18} />
        </button>
      </div>
    </div>
  );
}
