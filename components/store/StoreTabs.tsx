"use client";

import { useState } from "react";
import type { StoreDetail, ProductDetail, FeedItem } from "@/lib/types";
import { ProductsGrid } from "./ProductsGrid";
import { NovedadesList } from "./NovedadesList";
import { CollectionsGrid } from "./CollectionsGrid";
import { InfoPanel } from "./InfoPanel";

const tabs = [
  { id: "productos", label: "Productos" },
  { id: "novedades", label: "Novedades" },
  { id: "colecciones", label: "Colecciones" },
  { id: "info", label: "Info" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function StoreTabs({
  store,
  products,
  novedades,
}: {
  store: StoreDetail;
  products: ProductDetail[];
  novedades: FeedItem[];
}) {
  const [active, setActive] = useState<TabId>("productos");

  return (
    <div>
      <div
        role="tablist"
        aria-label="Secciones de la tienda"
        className="sticky top-0 z-20 flex gap-1 border-b border-graphite-line/60 bg-void/90 px-4 backdrop-blur-xl"
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={`relative min-h-[44px] px-3 text-[13.5px] font-medium transition-colors ${
                isActive ? "text-ink" : "text-ink-faint"
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-pill bg-orbital" />
              )}
            </button>
          );
        })}
      </div>

      {active === "productos" && <ProductsGrid products={products} />}
      {active === "novedades" && <NovedadesList items={novedades} />}
      {active === "colecciones" && <CollectionsGrid collections={store.collections} />}
      {active === "info" && <InfoPanel store={store} />}
    </div>
  );
}
