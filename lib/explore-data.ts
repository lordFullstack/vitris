import { productDetails } from "./product-detail";

// Mock centralizado para Explorar (LOOP 06).
// "Nuevos" y "Tendencias" son curados a mano — no hay motor de recomendación
// ni ranking real todavía (fuera de alcance de este LOOP).

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

export function getNewArrivals() {
  return newArrivalIds.map((id) => productDetails[id]).filter(Boolean);
}

export function getTrending() {
  return trendingIds.map((id) => productDetails[id]).filter(Boolean);
}

export const popularSearches = ["chaqueta", "perfume", "botas", "audífonos", "vela"];
