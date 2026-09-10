import Link from "next/link";
import type { Store } from "@/lib/types";

export function StoreRow({ store }: { store: Store }) {
  return (
    <Link
      href={`/tienda/${store.id}`}
      className="flex items-center gap-2.5 py-2.5 transition-opacity active:opacity-70"
    >
      <img
        src={store.avatarUrl}
        alt=""
        className="h-8 w-8 rounded-pill object-cover"
      />
      <span className="text-[14px] font-semibold text-ink">{store.name}</span>
      {store.verified && (
        <span
          aria-label="Tienda verificada"
          className="flex h-4 w-4 items-center justify-center rounded-pill bg-orbital text-[10px] text-void"
        >
          ✓
        </span>
      )}
      {typeof store.distanceKm === "number" && (
        <span className="ml-auto text-[12.5px] text-ink-faint">
          {store.distanceKm < 1
            ? `${Math.round(store.distanceKm * 1000)} m`
            : `${store.distanceKm.toFixed(1)} km`}
        </span>
      )}
    </Link>
  );
}
