"use client";

import { useFollow } from "@/lib/follow-context";

export function FollowButton({
  storeId,
  variant = "solid",
}: {
  storeId: string;
  variant?: "solid" | "compact";
}) {
  const { isFollowing, toggleFollow } = useFollow();
  const following = isFollowing(storeId);

  const base =
    "flex items-center justify-center rounded-pill border font-semibold transition-colors active:scale-[0.97]";
  const sizeClass =
    variant === "compact" ? "h-11 px-4 text-[12.5px]" : "h-11 px-5 text-[13.5px]";
  const colorClass = following
    ? "border-graphite-line bg-graphite text-ink-soft"
    : "border-orbital bg-orbital text-void";

  return (
    <button
      type="button"
      aria-pressed={following}
      aria-label={following ? "Dejar de seguir tienda" : "Seguir tienda"}
      onClick={() => toggleFollow(storeId)}
      className={`${base} ${sizeClass} ${colorClass}`}
    >
      {following ? "Siguiendo" : "Seguir"}
    </button>
  );
}
