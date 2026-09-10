import Link from "next/link";
import type { Category } from "@/lib/explore-data";

export function CategoryRow({ categories }: { categories: Category[] }) {
  return (
    <div className="scrollbar-none flex gap-3 overflow-x-auto px-4 py-1">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/buscar?q=${encodeURIComponent(cat.label)}`}
          className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-card"
        >
          <img src={cat.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/10 to-transparent" />
          <span className="absolute inset-x-0 bottom-2 px-2 text-center text-[12.5px] font-semibold text-ink">
            {cat.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
