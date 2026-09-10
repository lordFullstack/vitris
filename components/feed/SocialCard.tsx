import Link from "next/link";
import type { FeedItem } from "@/lib/types";
import { formatPrice } from "@/lib/whatsapp";
import { StoreRow } from "./StoreRow";
import { LikeButton } from "@/components/ui/LikeButton";
import { ShareButton } from "@/components/ui/ShareButton";
import { IconSave } from "@/components/icons";

export function SocialCard({ item }: { item: FeedItem }) {
  return (
    <article className="px-4 py-3">
      <StoreRow store={item.store} />

      <div className="relative overflow-hidden rounded-card bg-graphite">
        <img
          src={item.images[0]}
          alt={item.caption ?? item.store.name}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover"
        />

        {/* Riel de acciones en el borde derecho, zona de alcance del pulgar */}
        <div className="absolute bottom-3 right-3 flex flex-col items-center gap-2.5">
          <LikeButton initialLikes={item.likes} overlay />
          <button
            type="button"
            aria-label="Guardar publicación"
            className="flex h-11 w-11 items-center justify-center rounded-pill bg-void/55 text-ink backdrop-blur-md transition-transform active:scale-90"
          >
            <IconSave size={19} />
          </button>
          <ShareButton title={item.caption ?? item.store.name} overlay />
        </div>
      </div>

      {item.caption && (
        <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
          {item.caption}
        </p>
      )}

      {item.product && (
        <Link
          href={`/producto/${item.product.id}`}
          className="mt-3 flex items-center justify-between rounded-pill border border-graphite-line bg-graphite px-4 py-2.5 transition-colors active:bg-graphite-elevated"
        >
          <span className="text-[13.5px] text-ink-soft">
            Ver producto — {item.product.name}
          </span>
          <span className="text-[13.5px] font-semibold text-ink">
            {formatPrice(item.product.price, item.product.currency)}
          </span>
        </Link>
      )}
    </article>
  );
}
