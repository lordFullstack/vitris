"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconExplore, IconHeart, IconProfile } from "@/components/icons";

const items = [
  { href: "/feed", label: "Inicio", Icon: IconHome },
  { href: "/explorar", label: "Explorar", Icon: IconExplore },
  { href: "/lo-quiero", label: "Lo quiero", Icon: IconHeart },
  { href: "/perfil", label: "Perfil", Icon: IconProfile },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[calc(var(--safe-bottom)+16px)]"
    >
      <div className="flex items-center gap-1 rounded-pill border border-graphite-line/80 bg-graphite-elevated/90 px-2 py-2 shadow-soft backdrop-blur-xl">
        {items.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className="relative flex min-h-[44px] min-w-[64px] flex-col items-center justify-center gap-1 rounded-pill px-3 py-1.5 transition-colors active:scale-95"
            >
              {active && (
                <span className="absolute inset-0 rounded-pill bg-orbital-dim" />
              )}
              <Icon
                active={active}
                size={22}
                className={`relative transition-colors ${
                  active ? "text-orbital-soft" : "text-ink-soft"
                }`}
              />
              <span
                className={`relative text-[11px] leading-none transition-colors ${
                  active ? "font-semibold text-orbital-soft" : "text-ink-faint"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
