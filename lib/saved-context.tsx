"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { usePersistedState } from "./use-persisted-state";

export interface SavedEntry {
  productId: string;
  listId: string; // 'general' por defecto; o el id de una lista (preset o personalizada)
  savedAt: string; // ISO
}

interface SavedContextValue {
  saved: Record<string, SavedEntry>;
  hydrated: boolean;
  isSaved: (productId: string) => boolean;
  toggleSave: (productId: string) => void;
  setList: (productId: string, listId: string) => void;
}

const SavedContext = createContext<SavedContextValue | null>(null);
const STORAGE_KEY = "vitris:saved";
const LEGACY_KEY = "social-commerce:saved";

export function SavedItemsProvider({ children }: { children: React.ReactNode }) {
  const {
    value: saved,
    setValue: setSaved,
    hydrated,
  } = usePersistedState<Record<string, SavedEntry>>(STORAGE_KEY, {}, 1, LEGACY_KEY);

  const isSaved = useCallback(
    (productId: string) => Boolean(saved[productId]),
    [saved]
  );

  const toggleSave = useCallback(
    (productId: string) => {
      setSaved((s) => {
        if (s[productId]) {
          const next = { ...s };
          delete next[productId];
          return next;
        }
        return {
          ...s,
          [productId]: {
            productId,
            listId: "general",
            savedAt: new Date().toISOString(),
          },
        };
      });
    },
    [setSaved]
  );

  const setList = useCallback(
    (productId: string, listId: string) => {
      setSaved((s) =>
        s[productId] ? { ...s, [productId]: { ...s[productId], listId } } : s
      );
    },
    [setSaved]
  );

  const value = useMemo(
    () => ({ saved, hydrated, isSaved, toggleSave, setList }),
    [saved, hydrated, isSaved, toggleSave, setList]
  );

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSavedItems() {
  const ctx = useContext(SavedContext);
  if (!ctx) {
    throw new Error("useSavedItems debe usarse dentro de <SavedItemsProvider>");
  }
  return ctx;
}
