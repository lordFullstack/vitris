import { supabaseProductRepo } from "./supabase/products";
import { supabaseStoreRepo } from "./supabase/stores";
import { supabaseFeedRepo } from "./supabase/feed";
import { mockConversationRepo } from "./mock/conversations";
import type { ProductRepo, StoreRepo, FeedRepo, ConversationRepo } from "./types";

// EL archivo que decide de dónde salen los datos (LOOP 07 — Fundación
// técnica). Product/Store/Feed pasan a Supabase en el LOOP 08.
//
// ConversationRepo se queda en el mock a propósito: S1 del sprint piloto
// dice que Preguntar es un handoff a WhatsApp, sin chat interno con
// respuesta del comercio — no hay (ni debe haber) tabla de conversaciones
// en este schema. La implementación completa que ya construimos (Bloque B)
// se mantiene como la experiencia de "preguntar" dentro de la sesión.

export const productRepo: ProductRepo = supabaseProductRepo;
export const storeRepo: StoreRepo = supabaseStoreRepo;
export const feedRepo: FeedRepo = supabaseFeedRepo;
export const conversationRepo: ConversationRepo = mockConversationRepo;

// Contenido estático/curado que no pasa por la frontera de repositorios.
// categories ahora tiene fuente real (tabla categories) — por eso es
// getCategories() async, ya no un array importado directo. popularSearches
// y quickQuestions siguen siendo copy editorial sin tabla propia.
export { getCategories, popularSearches, getNewArrivals, getTrending } from "./supabase/explore";
export { quickQuestions } from "./quick-questions";
export type { Category } from "@/lib/types";

export type { ProductRepo, StoreRepo, FeedRepo, ConversationRepo } from "./types";
