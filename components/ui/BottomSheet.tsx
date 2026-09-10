"use client";

import { useEffect } from "react";
import { IconClose } from "@/components/icons";

export function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-void/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="safe-bottom relative w-full max-w-md rounded-t-sheet border-t border-graphite-line bg-graphite-elevated px-5 pb-6 pt-3 shadow-soft"
      >
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-pill bg-graphite-line" />
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-[16px] font-semibold text-ink">{title}</h2>
          <button
            aria-label="Cerrar"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-pill text-ink-soft transition-colors active:bg-graphite"
          >
            <IconClose size={18} />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto text-[14px] leading-relaxed text-ink-soft">
          {children}
        </div>
      </div>
    </div>
  );
}
