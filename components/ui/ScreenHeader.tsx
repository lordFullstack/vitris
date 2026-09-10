import Link from "next/link";
import { IconBack } from "@/components/icons";

export function ScreenHeader({
  title,
  backHref = "/feed",
}: {
  title: string;
  backHref?: string;
}) {
  return (
    <header className="safe-top sticky top-0 z-30 flex items-center gap-3 border-b border-graphite-line/60 bg-void/85 px-4 py-3.5 backdrop-blur-xl">
      <Link
        href={backHref}
        aria-label="Volver"
        className="flex h-11 w-11 items-center justify-center rounded-pill text-ink transition-colors active:bg-graphite-elevated"
      >
        <IconBack size={22} />
      </Link>
      <h1 className="font-display text-[17px] font-semibold text-ink">{title}</h1>
    </header>
  );
}
