import type { Category } from "@/lib/types";
import { supabase } from "./client";
import { supabaseProductRepo } from "./products";

// Contraparte real de lib/data/mock/explore.ts. Sin contrato de repositorio
// propio — mismo motivo que la versión mock: categories/popularSearches son
// copy/catálogo, no dominio del Bloque B.

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id,label,image")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data ?? []).map((c) => ({
    id: c.id,
    label: c.label,
    image: c.image ?? undefined,
  }));
}

/**
 * Sin motor de recomendación ni señales de vistas/ventas todavía (S2, LOOP
 * 12 diferido). "Nuevos" son los productos reales más recientes — eso sí es
 * honesto. "Tendencias" NO tiene una señal real que lo respalde hoy: en vez
 * de inventar un ranking, muestra el segundo bloque de productos recientes
 * (no se repite con "Nuevos", pero tampoco pretende ser "tendencia" de
 * verdad). Ver REGLAS_CLAUDE_PILOTO #20 — no prometer lo que no existe.
 */
export async function getNewArrivals() {
  return supabaseProductRepo.list({ limit: 4 });
}

export async function getTrending() {
  const all = await supabaseProductRepo.list({ limit: 8 });
  return all.slice(4, 8);
}

export const popularSearches = ["chaqueta", "perfume", "botas", "audífonos", "vela"];
