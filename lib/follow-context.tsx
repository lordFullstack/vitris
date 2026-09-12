"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface FollowContextValue {
  following: Record<string, true>;
  hydrated: boolean;
  isFollowing: (storeId: string) => boolean;
  toggleFollow: (storeId: string) => void;
}

const FollowContext = createContext<FollowContextValue | null>(null);
const STORAGE_KEY = "social-commerce:following";

export function FollowProvider({ children }: { children: React.ReactNode }) {
  const [following, setFollowing] = useState<Record<string, true>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setFollowing(JSON.parse(raw));
    } catch {
      // localStorage no disponible o corrupto — seguimos con estado vacío
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(following));
    } catch {
      // almacenamiento lleno o no disponible — no bloqueamos la UI por esto
    }
  }, [following, hydrated]);

  const isFollowing = useCallback(
    (storeId: string) => Boolean(following[storeId]),
    [following]
  );

  const toggleFollow = useCallback((storeId: string) => {
    setFollowing((f) => {
      if (f[storeId]) {
        const next = { ...f };
        delete next[storeId];
        return next;
      }
      return { ...f, [storeId]: true };
    });
  }, []);

  return (
    <FollowContext.Provider value={{ following, hydrated, isFollowing, toggleFollow }}>
      {children}
    </FollowContext.Provider>
  );
}

export function useFollow() {
  const ctx = useContext(FollowContext);
  if (!ctx) {
    throw new Error("useFollow debe usarse dentro de <FollowProvider>");
  }
  return ctx;
}
