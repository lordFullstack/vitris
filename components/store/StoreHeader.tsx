import Link from "next/link";
import type { StoreDetail } from "@/lib/types";
import { buildStoreWhatsAppLink } from "@/lib/whatsapp";
import { ShareButton } from "@/components/ui/ShareButton";
import { FollowButton } from "@/components/ui/FollowButton";
import { IconBack, IconWhatsapp, IconAsk } from "@/components/icons";

export function StoreHeader({ store }: { store: StoreDetail }) {
  return (
    <div>
      <div className="relative">
        <img
          src={store.coverImage}
          alt=""
          className="h-40 w-full object-cover"
        />
        <div className="safe-top absolute inset-x-0 top-0 flex items-center p-3">
          <Link
            href="/feed"
            aria-label="Volver"
            className="flex h-11 w-11 items-center justify-center rounded-pill bg-void/55 text-ink backdrop-blur-md"
          >
            <IconBack size={22} />
          </Link>
        </div>
        <div className="absolute bottom-3 right-3">
          <ShareButton title={store.name} overlay />
        </div>
      </div>

      <div className="px-4">
        <div className="mt-3 flex items-end gap-3">
          <img
            src={store.avatarUrl}
            alt=""
            className="h-[72px] w-[72px] rounded-pill border-2 border-graphite-line object-cover"
          />
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          <h1 className="font-display text-[19px] font-semibold text-ink">
            {store.name}
          </h1>
          {store.verified && (
            <span
              aria-label="Tienda verificada"
              className="flex h-[18px] w-[18px] items-center justify-center rounded-pill bg-orbital text-[10px] text-void"
            >
              ✓
            </span>
          )}
        </div>

        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="text-[12.5px] text-ink-faint">
            {store.rating && <span className="text-orbital-soft">★ {store.rating.toFixed(1)}</span>}
            {store.followers && ` · ${store.followers.toLocaleString("es-CO")} seguidores`}
            {typeof store.distanceKm === "number" &&
              ` · ${store.distanceKm < 1 ? `${Math.round(store.distanceKm * 1000)} m` : `${store.distanceKm.toFixed(1)} km`}`}
          </p>
          <FollowButton storeId={store.id} variant="compact" />
        </div>

        <p className="mt-2.5 text-[14px] leading-relaxed text-ink-soft">{store.bio}</p>

        <div className="mt-2.5 flex flex-wrap gap-2">
          {store.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-pill border border-graphite-line bg-graphite px-3 py-1 text-[12.5px] text-ink-soft"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 pb-1">
          <a
            href={buildStoreWhatsAppLink(store)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-pill bg-whats px-4 text-[13.5px] font-semibold text-void transition-transform active:scale-[0.98]"
          >
            <IconWhatsapp size={16} />
            Escribir por WhatsApp
          </a>
          <Link
            href={`/chat?tienda=${store.id}`}
            aria-label="Preguntar"
            className="flex h-11 w-11 items-center justify-center rounded-pill border border-graphite-line text-ink-soft transition-colors active:bg-graphite-elevated"
          >
            <IconAsk size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
