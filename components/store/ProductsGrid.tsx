import Link from "next/link";
import type { ProductDetail } from "@/lib/types";
import { formatPrice } from "@/lib/whatsapp";

export function ProductsGrid({ products }: { products: ProductDetail[] }) {
  if (products.length === 0) {
    return (
      <p className="px-4 py-8 text-center text-[13.5px] text-ink-faint">
        Todavía no hay productos publicados.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 px-4 py-3">
      {products.map((p) => (
        <Link key={p.id} href={`/producto/${p.id}`}>
          <div className="aspect-[4/5] w-full overflow-hidden rounded-card bg-graphite">
            <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
          </div>
          <p className="mt-1.5 line-clamp-1 text-[13px] text-ink-soft">{p.name}</p>
          <p className="text-[13.5px] font-semibold text-ink">
            {formatPrice(p.price, p.currency)}
          </p>
        </Link>
      ))}
    </div>
  );
}
