"use client";

import { useEffect, useState } from "react";

interface VersionedPayload<T> {
  v: number;
  data: T;
}

/**
 * Persiste estado en localStorage con formato versionado { v, data }.
 * Si `legacyKey` está presente y `key` no tiene datos todavía, migra el
 * valor viejo (JSON sin versión) al formato nuevo y borra la clave vieja.
 */
export function usePersistedState<T>(
  key: string,
  initial: T,
  version: number,
  legacyKey?: string
) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as VersionedPayload<T>;
        if (parsed && parsed.v === version) {
          setValue(parsed.data);
        }
      } else if (legacyKey) {
        const legacyRaw = window.localStorage.getItem(legacyKey);
        if (legacyRaw) {
          const legacyData = JSON.parse(legacyRaw) as T;
          setValue(legacyData);
          window.localStorage.setItem(
            key,
            JSON.stringify({ v: version, data: legacyData })
          );
          window.localStorage.removeItem(legacyKey);
        }
      }
    } catch {
      // localStorage no disponible o corrupto — seguimos con estado inicial
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify({ v: version, data: value }));
    } catch {
      // almacenamiento lleno o no disponible — no bloqueamos la UI por esto
    }
  }, [value, hydrated, key, version]);

  return { value, setValue, hydrated };
}
