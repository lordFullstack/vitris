"use client";

import type { VariantGroup } from "@/lib/types";

export function VariantPicker({
  group,
  selected,
  onSelect,
}: {
  group: VariantGroup;
  selected: string | undefined;
  onSelect: (optionId: string) => void;
}) {
  return (
    <div className="py-2">
      <p className="mb-2 text-[13px] font-medium text-ink-soft">{group.label}</p>
      <div className="flex flex-wrap gap-2">
        {group.options.map((opt) => {
          const active = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(opt.id)}
              className={`flex min-h-[40px] items-center gap-2 rounded-pill border px-3.5 text-[13.5px] font-medium transition-colors ${
                active
                  ? "border-orbital bg-orbital-dim text-orbital-soft"
                  : "border-graphite-line bg-graphite text-ink-soft"
              }`}
            >
              {opt.swatch && (
                <span
                  className="h-4 w-4 rounded-pill border border-graphite-line"
                  style={{ backgroundColor: opt.swatch }}
                  aria-hidden
                />
              )}
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
