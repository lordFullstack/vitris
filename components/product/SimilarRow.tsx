import Link from "next/link";
import type { SimilarProduct } from "@/lib/types";
import { formatPrice } from "@/lib/whatsapp";

export function SimilarRow({
  items,
  title,
}: {
  items: SimilarProduct[];
  title: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className="py-2">
      <h3 className="mb-3 font-display text-[15px] font-semibold text-ink">{title}</h3>
      <div className="scrollbar-none flex gap-3 overflow-x-auto pb-1">
        {items.map((p) => (
          <Link
            key={p.id}
            href={`/producto/${p.id}`}
            className="w-32 flex-shrink-0"
          >
            <div className="aspect-[4/5] w-full overflow-hidden rounded-card bg-graphite">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
            </div>
            <p className="mt-1.5 line-clamp-1 text-[12.5px] text-ink-soft">{p.name}</p>
            <p className="text-[13px] font-semibold text-ink">
              {formatPrice(p.price, p.currency)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
