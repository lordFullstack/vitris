import Link from "next/link";
import type { ReactNode } from "react";

export function TopBar({
  title,
  actions,
}: {
  title: string;
  actions?: ReactNode;
}) {
  return (
    <header className="safe-top sticky top-0 z-30 flex items-center justify-between bg-void/85 px-5 pb-3 pt-4 backdrop-blur-xl">
      <h1 className="font-display text-[22px] font-semibold text-ink">{title}</h1>
      <div className="flex items-center gap-1">{actions}</div>
    </header>
  );
}

export function TopBarAction({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-pill text-ink transition-colors active:bg-graphite-elevated"
    >
      {children}
    </Link>
  );
}
