import type { StoreCollection } from "@/lib/types";

export function CollectionsGrid({ collections }: { collections: StoreCollection[] }) {
  if (collections.length === 0) {
    return (
      <p className="px-4 py-8 text-center text-[13.5px] text-ink-faint">
        Todavía no hay colecciones.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 px-4 py-3">
      {collections.map((c) => (
        <div key={c.id} className="relative aspect-square overflow-hidden rounded-card bg-graphite">
          <img src={c.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/90 to-transparent p-3">
            <p className="text-[13.5px] font-semibold text-ink">{c.name}</p>
            <p className="text-[12px] text-ink-soft">{c.count} productos</p>
          </div>
        </div>
      ))}
    </div>
  );
}
