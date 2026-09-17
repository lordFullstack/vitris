"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { productDetails } from "@/lib/product-detail";
import { stores } from "@/lib/mock-data";
import { categories, popularSearches } from "@/lib/explore-data";
import { formatPrice } from "@/lib/format";
import { IconSearch, IconClose } from "@/components/icons";

export function SearchView({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const q = query.trim().toLowerCase();

  const matchedProducts = useMemo(() => {
    if (!q) return [];
    return Object.values(productDetails).filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [q]);

  const matchedStores = useMemo(() => {
    if (!q) return [];
    return Object.values(stores).filter((s) => s.name.toLowerCase().includes(q));
  }, [q]);

  const hasResults = matchedProducts.length > 0 || matchedStores.length > 0;

  return (
    <div>
      <div className="sticky top-0 z-20 bg-void/90 px-4 pb-3 backdrop-blur-xl">
        <div className="flex h-11 items-center gap-2 rounded-pill border border-graphite-line bg-graphite px-4">
          <IconSearch size={18} className="text-ink-faint" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca productos, tiendas o categorías..."
            className="h-full flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-faint"
          />
          {query && (
            <button
              type="button"
              aria-label="Limpiar búsqueda"
              onClick={() => setQuery("")}
              className="flex h-6 w-6 items-center justify-center rounded-pill text-ink-faint"
            >
              <IconClose size={14} />
            </button>
          )}
        </div>
      </div>

      {!q ? (
        <div className="flex flex-col gap-6 px-4 py-2">
          <div>
            <p className="mb-2 text-[13px] font-medium text-ink-soft">Búsquedas populares</p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="rounded-pill border border-graphite-line bg-graphite px-3.5 py-1.5 text-[13px] text-ink-soft"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-[13px] font-medium text-ink-soft">Categorías</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setQuery(cat.label)}
                  className="rounded-pill border border-graphite-line bg-graphite px-3.5 py-1.5 text-[13px] text-ink-soft"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : !hasResults ? (
        <p className="px-4 py-10 text-center text-[13.5px] text-ink-faint">
          No encontramos nada para &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="flex flex-col gap-5 px-4 py-2">
          {matchedStores.length > 0 && (
            <div>
              <p className="mb-2 text-[13px] font-medium text-ink-soft">Tiendas</p>
              <div className="flex flex-col gap-1">
                {matchedStores.map((s) => (
                  <Link
                    key={s.id}
                    href={`/tienda/${s.id}`}
                    className="flex items-center gap-3 rounded-card px-2 py-2 transition-colors active:bg-graphite-elevated"
                  >
                    <img src={s.avatarUrl} alt="" className="h-10 w-10 rounded-pill object-cover" />
                    <span className="text-[14px] font-medium text-ink">{s.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {matchedProducts.length > 0 && (
            <div>
              <p className="mb-2 text-[13px] font-medium text-ink-soft">Productos</p>
              <div className="grid grid-cols-2 gap-3">
                {matchedProducts.map((p) => (
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
            </div>
          )}
        </div>
      )}
    </div>
  );
}
