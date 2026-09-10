export function PlaceholderSection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mx-4 flex items-center gap-3 rounded-card border border-graphite-line bg-graphite px-4 py-4">
      <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center">
        <span className="absolute h-9 w-9 rounded-full bg-orbital/20 animate-pulse-orbit" />
        <span className="relative h-2.5 w-2.5 rounded-full bg-orbital shadow-orbital" />
      </div>
      <div>
        <p className="text-[13.5px] font-semibold text-ink">{title}</p>
        <p className="text-[12.5px] leading-relaxed text-ink-faint">{description}</p>
      </div>
    </div>
  );
}
