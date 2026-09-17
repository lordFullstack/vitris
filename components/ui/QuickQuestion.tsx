import Link from "next/link";
import { IconChat } from "@/components/icons";

export function QuickQuestion({
  href,
  overlay = false,
}: {
  href: string;
  overlay?: boolean;
}) {
  if (overlay) {
    return (
      <Link
        href={href}
        aria-label="Preguntar"
        data-event="ASK"
        className="flex h-11 w-11 items-center justify-center rounded-pill bg-void/55 text-ink backdrop-blur-md transition-transform active:scale-90"
      >
        <IconChat size={19} />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      data-event="ASK"
      className="flex h-11 flex-1 items-center justify-center gap-2 rounded-pill bg-orbital px-4 text-[13.5px] font-semibold text-ink transition-transform active:scale-[0.98]"
    >
      <IconChat size={18} />
      Preguntar
    </Link>
  );
}
