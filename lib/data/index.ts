import { mockProductRepo } from "./mock/products";
import { mockStoreRepo } from "./mock/stores";
import { mockFeedRepo } from "./mock/feed";
import { mockConversationRepo } from "./mock/conversations";
import type { ProductRepo, StoreRepo, FeedRepo, ConversationRepo } from "./types";

// EL archivo que cambia en el LOOP 08. En Supabase, estas cuatro líneas
// pasan a apuntar a las implementaciones reales y nada más cambia — ese es
// el examen de este bloque.

export const productRepo: ProductRepo = mockProductRepo;
export const storeRepo: StoreRepo = mockStoreRepo;
export const feedRepo: FeedRepo = mockFeedRepo;
export const conversationRepo: ConversationRepo = mockConversationRepo;

// Contenido estático que no pasa por la frontera de repositorios — no es
// dato persistido, es copy/curaduría (Explorar, preguntas rápidas del
// chat). Se re-exporta desde acá para que los componentes tengan un único
// lugar de dónde importar todo lo relacionado a datos.
export { categories, popularSearches, getNewArrivals, getTrending } from "./mock/explore";
export type { Category } from "./mock/explore";
export { quickQuestions } from "./mock/conversations";

export type { ProductRepo, StoreRepo, FeedRepo, ConversationRepo } from "./types";
