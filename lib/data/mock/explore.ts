import { mockProductRepo } from "./products";

// Mock centralizado para Explorar. Antes lib/explore-data.ts.
// "Nuevos" y "Tendencias" son curados a mano — no hay motor de recomendación
// ni ranking real todavía (fuera de alcance del LOOP 06 original).
//
// No tiene contrato de repositorio propio (no es un dominio del Bloque B):
// categories/popularSearches son copy estático, y getNewArrivals/getTrending
// son listas curadas que resuelven contra ProductRepo.

export interface Category {
  id: string;
  label: string;
  image: string;
}

export const categories: Category[] = [
  { id: "moda", label: "Moda", image: "https://picsum.photos/seed/cat-moda/300/300" },
  { id: "perfumeria", label: "Perfumería", image: "https://picsum.photos/seed/cat-perfumeria/300/300" },
  { id: "belleza", label: "Belleza", image: "https://picsum.photos/seed/cat-belleza/300/300" },
  { id: "calzado", label: "Calzado", image: "https://picsum.photos/seed/cat-calzado/300/300" },
  { id: "tecnologia", label: "Tecnología", image: "https://picsum.photos/seed/cat-tecnologia/300/300" },
  { id: "hogar", label: "Hogar", image: "https://picsum.photos/seed/cat-hogar/300/300" },
  { id: "joyeria", label: "Joyería", image: "https://picsum.photos/seed/cat-joyeria/300/300" },
  { id: "regalos", label: "Regalos", image: "https://picsum.photos/seed/cat-regalos/300/300" },
];

const newArrivalIds = ["p1", "p4", "p6"];
const trendingIds = ["p3", "p1", "p2", "p4"];

export async function getNewArrivals() {
  const items = await Promise.all(newArrivalIds.map((id) => mockProductRepo.getById(id)));
  return items.filter((p) => p !== null);
}

export async function getTrending() {
  const items = await Promise.all(trendingIds.map((id) => mockProductRepo.getById(id)));
  return items.filter((p) => p !== null);
}

export const popularSearches = ["chaqueta", "perfume", "botas", "audífonos", "vela"];
