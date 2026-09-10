"use client";

import { useState } from "react";
import { IconHeart } from "@/components/icons";

export function LikeButton({
  initialLikes,
  overlay = false,
}: {
  initialLikes: number;
  overlay?: boolean;
}) {
  const [liked, setLiked] = useState(false);
  const count = initialLikes + (liked ? 1 : 0);

  if (overlay) {
    return (
      <button
        type="button"
        aria-pressed={liked}
        aria-label={liked ? "Quitar me gusta" : "Me gusta"}
        onClick={() => setLiked((l) => !l)}
        className="flex flex-col items-center gap-1 transition-transform active:scale-90"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-pill bg-void/55 backdrop-blur-md">
          <IconHeart
            active={liked}
            size={22}
            className={liked ? "text-orbital-soft" : "text-ink"}
          />
        </span>
        <span className="rounded-pill bg-void/55 px-1.5 py-0.5 text-[11px] text-ink backdrop-blur-md">
          {count}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={liked}
      aria-label={liked ? "Quitar me gusta" : "Me gusta"}
      onClick={() => setLiked((l) => !l)}
      className="flex min-h-[44px] items-center gap-1.5 rounded-pill px-2 transition-transform active:scale-95"
    >
      <IconHeart
        active={liked}
        size={22}
        className={liked ? "text-orbital-soft" : "text-ink-soft"}
      />
      <span className={`text-[13px] ${liked ? "text-orbital-soft" : "text-ink-soft"}`}>
        {count}
      </span>
    </button>
  );
}
