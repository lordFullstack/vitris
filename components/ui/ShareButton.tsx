"use client";

import { IconShare } from "@/components/icons";

export function ShareButton({
  title,
  overlay = false,
}: {
  title: string;
  overlay?: boolean;
}) {
  async function handleShare() {
    const shareData = {
      title,
      text: `Mira esto en VITRIS: ${title}`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // el usuario canceló el share nativo, no es un error a mostrar
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(shareData.url);
    }
  }

  return (
    <button
      type="button"
      aria-label="Compartir"
      onClick={handleShare}
      className={
        overlay
          ? "flex h-11 w-11 items-center justify-center rounded-pill bg-void/55 text-ink backdrop-blur-md transition-transform active:scale-90"
          : "flex h-11 w-11 items-center justify-center rounded-pill text-ink-soft transition-colors active:bg-graphite-elevated"
      }
    >
      <IconShare size={overlay ? 19 : 20} />
    </button>
  );
}
