import { mockProductRepo } from "./mock/products";
import { mockStoreRepo } from "./mock/stores";
import type { ProductRepo, StoreRepo } from "./types";

// EL archivo que cambia en el LOOP 08. En Supabase, estas líneas pasan a
// apuntar a las implementaciones reales y nada más cambia — ese es el
// examen de este bloque.
//
// Paso 1 de 3: solo Product+Store. feedRepo/conversationRepo se suman acá
// mismo en los próximos commits (Paso 2 y Paso 3) — no se separan en un
// archivo aparte porque este es EL punto único de cambio del bloque.

export const productRepo: ProductRepo = mockProductRepo;
export const storeRepo: StoreRepo = mockStoreRepo;

// Contenido estático que no pasa por la frontera de repositorios — no es
// dato persistido, es copy/curaduría (Explorar). Se re-exporta desde acá
// para que los componentes tengan un único lugar de dónde importar todo lo
// relacionado a datos.
export { categories, popularSearches, getNewArrivals, getTrending } from "./mock/explore";
export type { Category } from "./mock/explore";

export type { ProductRepo, StoreRepo } from "./types";
