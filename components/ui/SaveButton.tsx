"use client";

import { IconHeart } from "@/components/icons";
import { useSavedItems } from "@/lib/saved-context";

export function SaveButton({
  productId,
  variant = "overlay",
}: {
  productId: string;
  variant?: "overlay" | "plain";
}) {
  const { isSaved, toggleSave } = useSavedItems();
  const saved = isSaved(productId);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? "Quitar de Lo quiero" : "Guardar en Lo quiero"}
      onClick={() => toggleSave(productId)}
      className={
        variant === "overlay"
          ? "flex h-11 w-11 items-center justify-center rounded-pill bg-void/55 text-ink backdrop-blur-md transition-transform active:scale-90"
          : "flex h-11 w-11 items-center justify-center rounded-pill text-ink-soft transition-colors active:bg-graphite-elevated"
      }
    >
      <IconHeart
        active={saved}
        size={22}
        className={saved ? "text-orbital-soft" : variant === "overlay" ? "text-ink" : "text-ink-soft"}
      />
    </button>
  );
}
