"use client";

import { useRef, useState } from "react";

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    const el = trackRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActive(index);
  }

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-graphite">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="scrollbar-none flex h-full w-full snap-x snap-mandatory overflow-x-auto"
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${alt} — foto ${i + 1} de ${images.length}`}
            loading={i === 0 ? "eager" : "lazy"}
            className="h-full w-full flex-shrink-0 snap-center object-cover"
          />
        ))}
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-pill transition-all ${
                i === active ? "w-4 bg-ink" : "w-1.5 bg-ink/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
