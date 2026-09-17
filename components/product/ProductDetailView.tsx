"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ProductDetail, VariantGroup } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCaptureRef } from "@/lib/capture-ref";
import { ProductGallery } from "@/components/feed/ProductGallery";
import { ProductBadge, AvailabilityTag, Rating } from "@/components/feed/ProductMeta";
import { VariantPicker } from "./VariantPicker";
import { TrustRow } from "./TrustRow";
import { SimilarRow } from "./SimilarRow";
import { SaveButton } from "@/components/ui/SaveButton";
import { ShareButton } from "@/components/ui/ShareButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { QuickQuestion } from "@/components/ui/QuickQuestion";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { IconBack } from "@/components/icons";

function defaultSelection(variants: VariantGroup[] | undefined) {
  const initial: Record<string, string> = {};
  variants?.forEach((g) => {
    if (g.options[0]) initial[g.id] = g.options[0].id;
  });
  return initial;
}

function storeDistanceLabel(distanceKm: number | undefined) {
  if (typeof distanceKm !== "number") return null;
  return distanceKm < 1 ? `${Math.round(distanceKm * 1000)} m` : `${distanceKm.toFixed(1)} km`;
}

export function ProductDetailView({ detail }: { detail: ProductDetail }) {
  useCaptureRef();
  const [selection, setSelection] = useState(() => defaultSelection(detail.variants));
  const [sheetOpen, setSheetOpen] = useState(false);
  const distanceLabel = storeDistanceLabel(detail.store.distanceKm);

  const selectedLabels = useMemo(() => {
    const labels: Record<string, string> = {};
    detail.variants?.forEach((g) => {
      const optId = selection[g.id];
      const opt = g.options.find((o) => o.id === optId);
      if (opt) labels[g.id] = `${g.label}: ${opt.label}`;
    });
    return labels;
  }, [selection, detail.variants]);

  const askHref = useMemo(() => {
    const variantText = Object.values(selectedLabels).join(", ");
    const params = new URLSearchParams({ producto: detail.id });
    if (variantText) {
      params.set("mensaje", `Me interesa (${variantText}). `);
    }
    return `/chat?${params.toString()}`;
  }, [detail.id, selectedLabels]);

  return (
    <div className="flex min-h-dvh flex-col bg-void pb-24">
      <div className="relative">
        <ProductGallery images={detail.images} alt={detail.name} />

        <div className="safe-top absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <Link
            href="/feed"
            aria-label="Volver"
            className="flex h-11 w-11 items-center justify-center rounded-pill bg-void/55 text-ink backdrop-blur-md"
          >
            <IconBack size={22} />
          </Link>
        </div>

        {/* Riel de acciones en el borde derecho, zona de alcance del pulgar */}
        <div className="absolute bottom-4 right-3 flex flex-col items-center gap-2.5">
          <SaveButton productId={detail.id} />
          <ShareButton title={detail.name} overlay />
        </div>

        {detail.badge && <ProductBadge label={detail.badge} />}
      </div>

      <div className="flex flex-col gap-4 px-4 pt-4">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-display text-[19px] font-semibold leading-snug text-ink">
              {detail.name}
            </h1>
            {!!detail.rating && <Rating value={detail.rating} />}
          </div>
          {!!detail.reviewsCount && (
            <p className="mt-0.5 text-[12.5px] text-ink-faint">
              {detail.reviewsCount} reseñas
            </p>
          )}
          <Link
            href={`/tienda/${detail.store.id}`}
            className="mt-1.5 flex items-center gap-1.5"
          >
            <img
              src={detail.store.avatarUrl}
              alt=""
              className="h-6 w-6 rounded-pill object-cover"
            />
            <span className="text-[13px] font-medium text-ink">{detail.store.name}</span>
            {detail.store.verified && (
              <span
                aria-label="Tienda verificada"
                className="flex h-[15px] w-[15px] items-center justify-center rounded-pill bg-orbital text-[9px] text-void"
              >
                ✓
              </span>
            )}
            {distanceLabel && (
              <span className="text-[13px] text-ink-soft">· {distanceLabel}</span>
            )}
          </Link>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-display text-[20px] font-semibold text-ink">
              {formatPrice(detail.price, detail.currency)}
            </span>
            <AvailabilityTag availability={detail.availability} />
          </div>
        </div>

        {!!detail.variants?.length && (
          <div className="flex flex-col gap-4">
            {detail.variants.map((group) => (
              <VariantPicker
                key={group.id}
                group={group}
                selected={selection[group.id]}
                onSelect={(optId) =>
                  setSelection((s) => ({ ...s, [group.id]: optId }))
                }
              />
            ))}
            <p className="-mt-2 text-[12.5px] text-ink-soft">
              Tu selección se incluye en el mensaje.
            </p>
          </div>
        )}

        <div>
          <p className="line-clamp-2 text-[14px] leading-relaxed text-ink-soft">
            {detail.description}
          </p>
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="mt-1 text-[13.5px] font-semibold text-orbital-soft"
          >
            Ver detalles
          </button>
        </div>

        <TrustRow store={detail.store} />

        <SimilarRow items={detail.similar} title="Más de esta tienda" />
      </div>

      <div className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-graphite-line/60 bg-void/90 px-4 pb-3 pt-3 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <QuickQuestion href={askHref} />
          <WhatsAppButton
            store={detail.store}
            product={detail}
            selectedVariants={selectedLabels}
          />
        </div>
      </div>

      <BottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Detalles del producto"
      >
        <p>{detail.description}</p>
      </BottomSheet>
    </div>
  );
}
