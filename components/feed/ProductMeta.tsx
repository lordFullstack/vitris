import type { Availability } from "@/lib/types";

export function ProductBadge({ label }: { label: string }) {
  return (
    <span className="absolute left-3 top-3 rounded-pill bg-void/70 px-3 py-1 text-[12px] font-medium text-ink backdrop-blur-md">
      {label}
    </span>
  );
}

export function AvailabilityTag({ availability }: { availability: Availability }) {
  if (availability === "in_stock") return null;
  const label = availability === "low_stock" ? "Pocas unidades" : "Sin stock";
  return (
    <span
      className={`rounded-pill px-2.5 py-0.5 text-[12px] font-medium ${
        availability === "low_stock"
          ? "bg-orbital-dim text-orbital-soft"
          : "bg-graphite text-ink-faint"
      }`}
    >
      {label}
    </span>
  );
}

export function Rating({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-1 text-[12.5px] text-ink-soft">
      <span aria-hidden className="text-orbital-soft">★</span>
      {value.toFixed(1)}
    </span>
  );
}
