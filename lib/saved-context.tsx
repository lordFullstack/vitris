"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

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
const STORAGE_KEY = "social-commerce:saved";

export function SavedItemsProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<Record<string, SavedEntry>>({});
  const [hydrated, setHydrated] = useState(false);

  // Hidratamos desde localStorage solo en cliente para evitar mismatch de SSR.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch {
      // localStorage no disponible o corrupto — seguimos con estado vacío
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch {
      // almacenamiento lleno o no disponible — no bloqueamos la UI por esto
    }
  }, [saved, hydrated]);

  const isSaved = useCallback(
    (productId: string) => Boolean(saved[productId]),
    [saved]
  );

  const toggleSave = useCallback((productId: string) => {
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
  }, []);

  const setList = useCallback((productId: string, listId: string) => {
    setSaved((s) =>
      s[productId] ? { ...s, [productId]: { ...s[productId], listId } } : s
    );
  }, []);

  return (
    <SavedContext.Provider value={{ saved, hydrated, isSaved, toggleSave, setList }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSavedItems() {
  const ctx = useContext(SavedContext);
  if (!ctx) {
    throw new Error("useSavedItems debe usarse dentro de <SavedItemsProvider>");
  }
  return ctx;
}
