"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-void px-8 text-center">
      <p className="text-[15px] text-ink-soft">Algo salió mal. Intentá de nuevo.</p>
      <button
        type="button"
        onClick={() => reset()}
        className="text-[14px] font-semibold text-orbital-soft"
      >
        Reintentar
      </button>
    </div>
  );
}
