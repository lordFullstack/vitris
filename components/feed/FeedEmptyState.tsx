export function FeedEmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 py-20 text-center">
      <p className="font-display text-[16px] font-semibold text-ink">
        Todavía no hay mucho que descubrir aquí
      </p>
      <p className="max-w-[260px] text-[13.5px] leading-relaxed text-ink-soft">
        Vuelve pronto — estamos sumando tiendas y productos nuevos todo el tiempo.
      </p>
    </div>
  );
}
