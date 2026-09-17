import Link from "next/link";
import type { FeedItem } from "@/lib/types";
import { formatPrice } from "@/lib/format";

export function NovedadesList({ items }: { items: FeedItem[] }) {
  if (items.length === 0) {
    return (
      <p className="px-4 py-8 text-center text-[13.5px] text-ink-faint">
        Todavía no hay novedades.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-3">
      {items.map((item) => (
        <div key={item.id}>
          <div className="overflow-hidden rounded-card bg-graphite">
            <img
              src={item.images[0]}
              alt={item.caption ?? ""}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          {item.caption && (
            <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
              {item.caption}
            </p>
          )}
          {item.product && (
            <Link
              href={`/producto/${item.product.id}`}
              className="mt-2 flex items-center justify-between rounded-pill border border-graphite-line bg-graphite px-4 py-2.5"
            >
              <span className="text-[13.5px] text-ink-soft">
                Ver producto — {item.product.name}
              </span>
              <span className="text-[13.5px] font-semibold text-ink">
                {formatPrice(item.product.price, item.product.currency)}
              </span>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
