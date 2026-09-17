import type { Store, StoreDetail, PublicStore } from "@/lib/types";
import type { StoreRepo } from "../types";

// Mock centralizado de tiendas. Antes vivía repartido entre lib/mock-data.ts
// (stores) y lib/store-detail.ts (storeDetails) — ahora detrás de la frontera.

export const stores: Record<string, Store> = {
  nova: {
    id: "nova",
    name: "Nova Studio",
    avatarUrl: "https://i.pravatar.cc/64?img=32",
    verified: true,
    distanceKm: 1.2,
    whatsappNumber: "573001234567",
    rating: 0,
    followers: 3200,
  },
  luma: {
    id: "luma",
    name: "Luma Perfumería",
    avatarUrl: "https://i.pravatar.cc/64?img=47",
    verified: true,
    distanceKm: 3.8,
    whatsappNumber: "573007654321",
    rating: 0,
    followers: 5100,
  },
  terra: {
    id: "terra",
    name: "Terra Calzado",
    avatarUrl: "https://i.pravatar.cc/64?img=15",
    distanceKm: 0.6,
    whatsappNumber: "573009988776",
    rating: 0,
    followers: 1800,
  },
  orbe: {
    id: "orbe",
    name: "Órbita Tech",
    avatarUrl: "https://i.pravatar.cc/64?img=60",
    verified: true,
    whatsappNumber: "573005544332",
    rating: 0,
    followers: 6400,
  },
  casa: {
    id: "casa",
    name: "Casa Cálida",
    avatarUrl: "https://i.pravatar.cc/64?img=25",
    distanceKm: 5.4,
    whatsappNumber: "573002211334",
    rating: 0,
    followers: 940,
  },
};

export const storeDetails: Record<string, StoreDetail> = {
  nova: {
    ...stores.nova,
    coverImage: "https://picsum.photos/seed/nova-cover/1000/560",
    bio: "Ropa y accesorios de diseño local, piezas atemporales pensadas para durar. Producción en pequeños lotes.",
    tags: ["Moda", "Accesorios", "Diseño local"],
    address: "Cra 14 #85-32, Bogotá",
    hours: "Lun a sáb, 10:00 a.m. – 7:00 p.m.",
    policies: "Cambios dentro de los 8 días con etiqueta y factura. No hacemos devoluciones en efectivo.",
    collections: [
      { id: "c1", name: "Temporada Fría", image: "https://picsum.photos/seed/nova-col-1/500/500", count: 12 },
      { id: "c2", name: "Esenciales", image: "https://picsum.photos/seed/nova-col-2/500/500", count: 8 },
    ],
  },
  luma: {
    ...stores.luma,
    coverImage: "https://picsum.photos/seed/luma-cover/1000/560",
    bio: "Perfumería de nicho. Fragancias importadas y línea propia formulada en Colombia.",
    tags: ["Perfumería", "Belleza"],
    address: "Calle 93 #11-27, Bogotá",
    hours: "Todos los días, 11:00 a.m. – 8:00 p.m.",
    collections: [
      { id: "c1", name: "Línea Ámbar", image: "https://picsum.photos/seed/luma-col-1/500/500", count: 5 },
    ],
  },
  terra: {
    ...stores.terra,
    coverImage: "https://picsum.photos/seed/terra-cover/1000/560",
    bio: "Calzado en cuero hecho a mano por talleres artesanales de Bucaramanga.",
    tags: ["Calzado", "Cuero"],
    address: "Cra 27 #45-10, Bucaramanga",
    hours: "Lun a sáb, 9:00 a.m. – 6:30 p.m.",
    policies: "Garantía de 6 meses por defectos de fabricación.",
    collections: [
      { id: "c1", name: "Urbana", image: "https://picsum.photos/seed/terra-col-1/500/500", count: 9 },
      { id: "c2", name: "Trabajo", image: "https://picsum.photos/seed/terra-col-2/500/500", count: 6 },
    ],
  },
  orbe: {
    ...stores.orbe,
    coverImage: "https://picsum.photos/seed/orbe-cover/1000/560",
    bio: "Tecnología personal seleccionada: audio, wearables y accesorios, con soporte postventa real.",
    tags: ["Tecnología", "Audio"],
    hours: "Lun a vie, 9:00 a.m. – 6:00 p.m.",
    policies: "1 año de garantía directa con la tienda, sin trámites con el fabricante.",
    collections: [
      { id: "c1", name: "Audio", image: "https://picsum.photos/seed/orbe-col-1/500/500", count: 14 },
    ],
  },
  casa: {
    ...stores.casa,
    coverImage: "https://picsum.photos/seed/casa-cover/1000/560",
    bio: "Velas, aromas y objetos para el hogar hechos a mano en pequeños lotes.",
    tags: ["Hogar", "Aromas"],
    address: "Cra 45 #63-12, Medellín",
    hours: "Mar a dom, 10:00 a.m. – 6:00 p.m.",
    collections: [
      { id: "c1", name: "Diciembre", image: "https://picsum.photos/seed/casa-col-1/500/500", count: 7 },
    ],
  },
};

function toPublicStore(store: Store): PublicStore {
  const { whatsappNumber, ...rest } = store;
  void whatsappNumber;
  return rest;
}

export const mockStoreRepo: StoreRepo = {
  async list(params) {
    void params; // no hay dato de ciudad en el mock todavía; Supabase sí filtrará
    return Object.values(stores).map(toPublicStore);
  },

  async getById(id) {
    return storeDetails[id] ?? null;
  },

  async getBySlug(slug) {
    // Hoy el id ya funciona como slug — no hay un campo separado.
    return storeDetails[slug] ?? null;
  },
};
