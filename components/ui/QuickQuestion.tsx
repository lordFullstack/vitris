import Link from "next/link";
import { IconChat } from "@/components/icons";

export function QuickQuestion({
  productId,
  overlay = false,
}: {
  productId: string;
  overlay?: boolean;
}) {
  return (
    <Link
      href={`/chat?producto=${productId}`}
      aria-label="Preguntar"
      className={
        overlay
          ? "flex h-11 w-11 items-center justify-center rounded-pill bg-void/55 text-ink backdrop-blur-md transition-transform active:scale-90"
          : "flex h-11 w-11 items-center justify-center rounded-pill text-ink-soft transition-colors active:bg-graphite-elevated"
      }
    >
      <IconChat size={overlay ? 19 : 20} />
    </Link>
  );
}
