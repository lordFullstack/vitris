"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSavedItems } from "@/lib/saved-context";
import type { SavedEntry } from "@/lib/saved-context";
import type { ProductDetail } from "@/lib/types";
import { productDetails } from "@/lib/product-detail";
import { SavedItemRow } from "./SavedItemRow";
import { CompareView } from "./CompareView";
import { ListPickerSheet } from "./ListPickerSheet";
import { IconHeart } from "@/components/icons";

const presetTabs = [
  { id: "todos", label: "Todos" },
  { id: "lo-necesito", label: "Lo necesito" },
  { id: "diciembre", label: "Diciembre" },
  { id: "verano", label: "Verano" },
  { id: "comparar", label: "Comparar" },
  { id: "esperando-stock", label: "Esperando stock" },
];

export function SavedListView() {
  const { saved, hydrated } = useSavedItems();
  const [activeTab, setActiveTab] = useState("todos");
  const [customLists, setCustomLists] = useState<string[]>([]);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const items = useMemo(() => {
    const list: { entry: SavedEntry; product: ProductDetail }[] = [];
    Object.values(saved).forEach((entry) => {
      const product = productDetails[entry.productId];
      if (product) list.push({ entry, product });
    });
    return list.sort((a, b) => (a.entry.savedAt < b.entry.savedAt ? 1 : -1));
  }, [saved]);

  const filtered = useMemo(() => {
    if (activeTab === "todos" || activeTab === "comparar") return items;
    if (activeTab === "esperando-stock") {
      return items.filter((x) => x.product.availability === "out_of_stock");
    }
    return items.filter((x) => x.entry.listId === activeTab);
  }, [items, activeTab]);

  const allTabs = [...presetTabs, ...customLists.map((l) => ({ id: l, label: l }))];

  // Evitamos parpadeo antes de hidratar localStorage (SSR siempre arranca vacío)
  if (!hydrated) return null;

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-orbital-dim">
          <IconHeart size={26} className="text-orbital-soft" />
        </span>
        <div>
          <h2 className="font-display text-[17px] font-semibold text-ink">
            Todavía no guardas nada
          </h2>
          <p className="mt-1 max-w-[260px] text-[14px] leading-relaxed text-ink-soft">
            Toca el corazón en cualquier producto del feed para empezar tu lista de deseos.
          </p>
        </div>
        <Link
          href="/feed"
          className="rounded-pill bg-orbital px-5 py-2.5 text-[14px] font-semibold text-void"
        >
          Ir a vitrinear
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="scrollbar-none sticky top-0 z-20 flex gap-2 overflow-x-auto border-b border-graphite-line/60 bg-void/90 px-4 py-2.5 backdrop-blur-xl">
        {allTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 rounded-pill border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              activeTab === tab.id
                ? "border-orbital bg-orbital-dim text-orbital-soft"
                : "border-graphite-line bg-graphite text-ink-soft"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "comparar" ? (
        <CompareView
          items={items}
          selected={compareIds}
          onToggle={(id) =>
            setCompareIds((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]))
          }
        />
      ) : filtered.length === 0 ? (
        <p className="px-4 py-10 text-center text-[13.5px] text-ink-faint">
          Nada en esta lista todavía.
        </p>
      ) : (
        <div className="flex flex-col">
          {filtered.map(({ entry, product }) => (
            <SavedItemRow
              key={entry.productId}
              entry={entry}
              product={product}
              onMove={() => setEditingProductId(entry.productId)}
            />
          ))}
        </div>
      )}

      <ListPickerSheet
        open={editingProductId !== null}
        onClose={() => setEditingProductId(null)}
        productId={editingProductId}
        customLists={customLists}
        onCreateList={(name) => setCustomLists((l) => (l.includes(name) ? l : [...l, name]))}
      />
    </div>
  );
}
