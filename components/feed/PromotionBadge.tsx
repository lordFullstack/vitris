export function PromotionBadge({ label }: { label: string }) {
  return (
    <div className="absolute left-0 top-4 z-10 rounded-r-pill bg-orbital py-1.5 pl-3 pr-4 text-[12.5px] font-bold uppercase tracking-wide text-void shadow-orbital">
      {label}
    </div>
  );
}
