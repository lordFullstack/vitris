"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { usePersistedState } from "./use-persisted-state";

interface FollowContextValue {
  following: Record<string, true>;
  hydrated: boolean;
  isFollowing: (storeId: string) => boolean;
  toggleFollow: (storeId: string) => void;
}

const FollowContext = createContext<FollowContextValue | null>(null);
const STORAGE_KEY = "vitris:follow";
const LEGACY_KEY = "social-commerce:following";

export function FollowProvider({ children }: { children: React.ReactNode }) {
  const {
    value: following,
    setValue: setFollowing,
    hydrated,
  } = usePersistedState<Record<string, true>>(STORAGE_KEY, {}, 1, LEGACY_KEY);

  const isFollowing = useCallback(
    (storeId: string) => Boolean(following[storeId]),
    [following]
  );

  const toggleFollow = useCallback(
    (storeId: string) => {
      setFollowing((f) => {
        if (f[storeId]) {
          const next = { ...f };
          delete next[storeId];
          return next;
        }
        return { ...f, [storeId]: true };
      });
    },
    [setFollowing]
  );

  const value = useMemo(
    () => ({ following, hydrated, isFollowing, toggleFollow }),
    [following, hydrated, isFollowing, toggleFollow]
  );

  return <FollowContext.Provider value={value}>{children}</FollowContext.Provider>;
}

export function useFollow() {
  const ctx = useContext(FollowContext);
  if (!ctx) {
    throw new Error("useFollow debe usarse dentro de <FollowProvider>");
  }
  return ctx;
}
