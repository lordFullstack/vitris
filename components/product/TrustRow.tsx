import Link from "next/link";
import type { Store } from "@/lib/types";

export function TrustRow({ store }: { store: Store }) {
  const metaParts: string[] = [];
  if (store.followers) metaParts.push(`${store.followers.toLocaleString("es-CO")} seguidores`);
  if (typeof store.distanceKm === "number") {
    metaParts.push(
      store.distanceKm < 1
        ? `${Math.round(store.distanceKm * 1000)} m`
        : `${store.distanceKm.toFixed(1)} km`
    );
  }

  return (
    <Link
      href={`/tienda/${store.id}`}
      className="flex items-center gap-3 rounded-card border border-graphite-line bg-graphite px-4 py-3 transition-colors active:bg-graphite-elevated"
    >
      <img src={store.avatarUrl} alt="" className="h-10 w-10 rounded-pill object-cover" />
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[14px] font-semibold text-ink">{store.name}</span>
          {store.verified && (
            <span
              aria-label="Tienda verificada"
              className="flex h-4 w-4 items-center justify-center rounded-pill bg-orbital text-[10px] text-void"
            >
              ✓
            </span>
          )}
        </div>
        <p className="text-[12.5px] text-ink-faint">
          {!!store.rating && <span className="text-orbital-soft">★ {store.rating.toFixed(1)}</span>}
          {!!store.rating && metaParts.length > 0 && " · "}
          {metaParts.join(" · ")}
        </p>
      </div>
      <span className="text-[13px] font-medium text-orbital-soft">Ver tienda</span>
    </Link>
  );
}
