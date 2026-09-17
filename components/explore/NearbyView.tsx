"use client";

import { useState } from "react";
import Link from "next/link";
import type { PublicStore } from "@/lib/types";
import { IconMapPin } from "@/components/icons";

type Status = "idle" | "requesting" | "granted" | "denied" | "unsupported";

export function NearbyView({ stores }: { stores: PublicStore[] }) {
  const [status, setStatus] = useState<Status>("idle");

  function requestLocation() {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unsupported");
      return;
    }
    setStatus("requesting");
    navigator.geolocation.getCurrentPosition(
      () => setStatus("granted"),
      () => setStatus("denied"),
      { timeout: 8000 }
    );
  }

  if (status === "granted") {
    const nearby = stores
      .filter((s) => typeof s.distanceKm === "number")
      .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));

    return (
      <div className="flex flex-col">
        <div className="mx-4 mt-3 rounded-card border border-orbital/40 bg-orbital-dim px-4 py-3">
          <p className="text-[12.5px] leading-relaxed text-orbital-soft">
            Todavía no conectamos tiendas por ubicación real — estas son de ejemplo
            mientras terminamos esa integración.
          </p>
        </div>
        <div className="mt-2 flex flex-col">
          {nearby.map((store) => (
            <Link
              key={store.id}
              href={`/tienda/${store.id}`}
              className="flex items-center gap-3 border-b border-graphite-line/40 px-4 py-3 transition-colors active:bg-graphite-elevated"
            >
              <img
                src={store.avatarUrl}
                alt=""
                className="h-12 w-12 rounded-pill object-cover"
              />
              <div className="flex-1">
                <p className="text-[14px] font-semibold text-ink">{store.name}</p>
                <p className="text-[12.5px] text-ink-faint">
                  {store.distanceKm! < 1
                    ? `${Math.round(store.distanceKm! * 1000)} m`
                    : `${store.distanceKm!.toFixed(1)} km`}{" "}
                  · ejemplo
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-orbital-dim">
        <IconMapPin size={26} className="text-orbital-soft" />
      </span>
      <div>
        <h2 className="font-display text-[17px] font-semibold text-ink">
          Activa tu ubicación
        </h2>
        <p className="mt-1 max-w-[260px] text-[14px] leading-relaxed text-ink-soft">
          {status === "denied"
            ? "No pudimos acceder a tu ubicación. Actívala desde los permisos del navegador e inténtalo de nuevo."
            : status === "unsupported"
            ? "Tu navegador no soporta geolocalización."
            : "Así podemos mostrarte tiendas cerca de ti."}
        </p>
      </div>
      {status !== "unsupported" && (
        <button
          onClick={requestLocation}
          disabled={status === "requesting"}
          className="rounded-pill bg-orbital px-5 py-2.5 text-[14px] font-semibold text-void disabled:opacity-60"
        >
          {status === "requesting" ? "Buscando..." : "Activar ubicación"}
        </button>
      )}
    </div>
  );
}
