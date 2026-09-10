export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-16 text-center">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute h-16 w-16 rounded-full bg-orbital/20 animate-pulse-orbit" />
        <span className="absolute h-9 w-9 rounded-full bg-orbital/30" />
        <span className="relative h-3 w-3 rounded-full bg-orbital shadow-orbital" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-[19px] font-semibold text-ink">{title}</h2>
        <p className="max-w-[280px] text-[14.5px] leading-relaxed text-ink-soft">
          {description}
        </p>
      </div>
      <span className="rounded-pill border border-graphite-line bg-graphite px-4 py-1.5 text-[13px] font-medium text-orbital-soft">
        Pronto
      </span>
    </div>
  );
}
