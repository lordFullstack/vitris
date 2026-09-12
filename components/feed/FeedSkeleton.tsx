export function FeedSkeleton() {
  return (
    <div className="flex flex-col" aria-busy="true" aria-live="polite">
      {[0, 1, 2].map((i) => (
        <div key={i} className="px-4 py-3">
          <div className="aspect-[4/5] w-full animate-pulse rounded-card bg-graphite" />
          <div className="mt-3 h-4 w-24 animate-pulse rounded-pill bg-graphite" />
          <div className="mt-2 h-4 w-40 animate-pulse rounded-pill bg-graphite" />
          <div className="mt-3 h-11 w-full animate-pulse rounded-pill bg-graphite" />
        </div>
      ))}
    </div>
  );
}
