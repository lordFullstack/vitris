import Link from "next/link";
import type { FeedItem } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { StoreRow } from "./StoreRow";
import { PromotionBadge } from "./PromotionBadge";
import { LikeButton } from "@/components/ui/LikeButton";
import { ShareButton } from "@/components/ui/ShareButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { FollowButton } from "@/components/ui/FollowButton";
import { IconSave, IconStore } from "@/components/icons";

/**
 * Social Card — LOOP 07
 * Un solo componente reutilizable (AC-02) que soporta los 5 tipos de contenido
 * del sistema de descubrimiento social. PRODUCT_POST se renderiza con
 * ProductCard (ya cumplía la spec); los otros 4 despachan aquí por `item.type`.
 */
export function SocialCard({ item }: { item: FeedItem }) {
  switch (item.type) {
    case "PROMOTION":
      return <PromotionCard item={item} />;
    case "COLLECTION":
      return <CollectionCard item={item} />;
    case "STORE_STORY":
      return <StoreStoryCard item={item} />;
    default:
      return <InspirationalCard item={item} />;
  }
}

// ---- INSPIRATIONAL_POST ----
function InspirationalCard({ item }: { item: FeedItem }) {
  return (
    <article className="px-4 py-3">
      <StoreRow store={item.store} />

      <div className="relative overflow-hidden rounded-card bg-graphite">
        <img
          src={item.images[0]}
          alt={item.caption ?? item.store.name}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover"
        />

        {/* Riel de acciones en el borde derecho, zona de alcance del pulgar */}
        <div className="absolute bottom-3 right-3 flex flex-col items-center gap-2.5">
          <LikeButton initialLikes={item.likes} overlay />
          <button
            type="button"
            aria-label="Guardar publicación"
            className="flex h-11 w-11 items-center justify-center rounded-pill bg-void/55 text-ink backdrop-blur-md transition-transform active:scale-90"
          >
            <IconSave size={19} />
          </button>
          <ShareButton title={item.caption ?? item.store.name} overlay />
        </div>
      </div>

      {item.caption && (
        <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
          {item.caption}
        </p>
      )}

      {item.product && (
        <Link
          href={`/producto/${item.product.id}`}
          className="mt-3 flex items-center justify-between rounded-pill border border-graphite-line bg-graphite px-4 py-2.5 transition-colors active:bg-graphite-elevated"
        >
          <span className="text-[13.5px] text-ink-soft">
            Ver producto — {item.product.name}
          </span>
          <span className="text-[13.5px] font-semibold text-ink">
            {formatPrice(item.product.price, item.product.currency)}
          </span>
        </Link>
      )}
    </article>
  );
}

// ---- PROMOTION ----
function PromotionCard({ item }: { item: FeedItem }) {
  const promo = item.promotion;

  return (
    <article className="px-4 py-3">
      <StoreRow store={item.store} />

      <div className="relative overflow-hidden rounded-card ring-2 ring-orbital/70">
        <img
          src={item.images[0]}
          alt={promo?.label ?? "Promoción"}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover"
        />
        {promo && <PromotionBadge label={promo.label} />}
      </div>

      {(promo?.conditions || item.product) && (
        <div className="mt-3 rounded-card border border-orbital/40 bg-orbital-dim px-4 py-3">
          {promo?.conditions && (
            <p className="text-[12.5px] leading-relaxed text-orbital-soft">
              {promo.conditions}
            </p>
          )}
          {item.product && (
            <div className="mt-1.5 flex items-center justify-between">
              <span className="text-[14px] font-medium text-ink">
                {item.product.name}
              </span>
              <span className="text-[14px] font-semibold text-ink">
                {formatPrice(item.product.price, item.product.currency)}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="mt-3 flex">
        {item.product ? (
          <WhatsAppButton store={item.store} product={item.product} />
        ) : (
          <Link
            href={`/tienda/${item.store.id}`}
            className="flex h-11 flex-1 items-center justify-center rounded-pill bg-orbital text-[13.5px] font-semibold text-void transition-transform active:scale-[0.98]"
          >
            Ver oferta en la tienda
          </Link>
        )}
      </div>
    </article>
  );
}

// ---- COLLECTION ----
// Reutiliza las colecciones ya existentes de Store Profile (LOOP 03) — no crea
// un sistema editorial nuevo. Abre la tienda; el usuario llega a la tab
// "Colecciones" con un toque adicional dentro de esa misma pantalla.
function CollectionCard({ item }: { item: FeedItem }) {
  return (
    <article className="px-4 py-3">
      <StoreRow store={item.store} />

      <Link
        href={`/tienda/${item.store.id}`}
        className="relative block overflow-hidden rounded-card"
      >
        <img
          src={item.images[0]}
          alt={item.title ?? "Colección"}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/90 to-transparent p-4">
          <p className="font-display text-[17px] font-semibold text-ink">
            {item.title}
          </p>
          <p className="mt-0.5 text-[12.5px] text-ink-soft">
            Colección de {item.store.name}
          </p>
        </div>
      </Link>

      <Link
        href={`/tienda/${item.store.id}`}
        className="mt-3 flex h-11 items-center justify-center rounded-pill border border-graphite-line bg-graphite text-[13.5px] font-semibold text-ink transition-colors active:bg-graphite-elevated"
      >
        Ver colección
      </Link>
    </article>
  );
}

// ---- STORE_STORY ----
// Formato editorial de tienda, NO Stories efímeras (sin círculos, sin 24h, sin viewer).
function StoreStoryCard({ item }: { item: FeedItem }) {
  return (
    <article className="px-4 py-3">
      <StoreRow store={item.store} />

      <div className="relative overflow-hidden rounded-card">
        <img
          src={item.images[0]}
          alt={item.title ?? item.store.name}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/95 via-void/40 to-transparent p-4">
          <p className="font-display text-[18px] font-semibold leading-snug text-ink">
            {item.title}
          </p>
          {item.caption && (
            <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">
              {item.caption}
            </p>
          )}
        </div>

        <div className="absolute bottom-3 right-3 flex flex-col items-center gap-2.5">
          <LikeButton initialLikes={item.likes} overlay />
          <ShareButton title={item.title ?? item.store.name} overlay />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Link
          href={`/tienda/${item.store.id}`}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-pill bg-graphite-elevated text-[13.5px] font-semibold text-ink transition-colors active:bg-graphite"
        >
          <IconStore size={16} />
          Conocer tienda
        </Link>
        <FollowButton storeId={item.store.id} variant="compact" />
      </div>
    </article>
  );
}
