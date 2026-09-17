import type { FeedItem, StoreCollection } from "@/lib/types";
import type { FeedRepo } from "../types";
import { stores, storeDetails } from "./stores";

// Mock centralizado del feed. Antes vivía en lib/mock-data.ts.

export const feedItems: FeedItem[] = [
  {
    id: "f1",
    type: "PRODUCT_POST",
    category: "Moda",
    store: stores.nova,
    images: [
      "https://picsum.photos/seed/nova-jacket-1/800/1000",
      "https://picsum.photos/seed/nova-jacket-2/800/1000",
    ],
    badge: "Nuevo",
    product: {
      id: "p1",
      name: "Chaqueta oversize acolchada",
      price: 189000,
      currency: "COP",
      availability: "in_stock",
      rating: 0,
    },
    likes: 214,
  },
  {
    id: "f2",
    type: "INSPIRATIONAL_POST",
    category: "Perfumería",
    store: stores.luma,
    images: ["https://picsum.photos/seed/luma-social-1/800/900"],
    caption:
      "Así se ve nuestro rincón de fragancias en la tienda física esta semana.",
    product: {
      id: "p2",
      name: "Eau de Parfum Ámbar 50ml",
      price: 132000,
      currency: "COP",
      availability: "in_stock",
    },
    likes: 96,
  },
  {
    id: "f3",
    type: "PRODUCT_POST",
    category: "Calzado",
    store: stores.terra,
    images: [
      "https://picsum.photos/seed/terra-shoes-1/800/1000",
      "https://picsum.photos/seed/terra-shoes-2/800/1000",
      "https://picsum.photos/seed/terra-shoes-3/800/1000",
    ],
    badge: "Pocas unidades",
    product: {
      id: "p3",
      name: "Botas urbanas cuero",
      price: 245000,
      currency: "COP",
      availability: "low_stock",
      rating: 0,
    },
    likes: 158,
  },
  {
    id: "f4",
    type: "PRODUCT_POST",
    category: "Tecnología",
    store: stores.orbe,
    images: ["https://picsum.photos/seed/orbe-tech-1/800/1000"],
    product: {
      id: "p4",
      name: "Audífonos inalámbricos ANC",
      price: 310000,
      currency: "COP",
      availability: "in_stock",
      rating: 0,
    },
    likes: 341,
  },
  {
    id: "f5",
    type: "INSPIRATIONAL_POST",
    category: "Hogar",
    store: stores.casa,
    images: ["https://picsum.photos/seed/casa-social-1/800/900"],
    caption: "Nueva colección de velas para diciembre, huelen increíble.",
    product: {
      id: "p5",
      name: "Vela artesanal ámbar y vainilla",
      price: 48000,
      currency: "COP",
      availability: "in_stock",
    },
    likes: 72,
  },
  {
    id: "f6",
    type: "PRODUCT_POST",
    category: "Moda",
    store: stores.nova,
    images: ["https://picsum.photos/seed/nova-bag-1/800/1000"],
    product: {
      id: "p6",
      name: "Bolso mini estructurado",
      price: 156000,
      currency: "COP",
      availability: "out_of_stock",
      rating: 0,
    },
    likes: 289,
  },
  {
    id: "f7",
    type: "PROMOTION",
    category: "Moda",
    store: stores.nova,
    images: ["https://picsum.photos/seed/nova-promo-1/800/1000"],
    promotion: {
      label: "20% OFF",
      conditions: "Válido hasta el 30 de septiembre en toda la colección de temporada.",
    },
    product: {
      id: "p1",
      name: "Chaqueta oversize acolchada",
      price: 189000,
      currency: "COP",
      availability: "in_stock",
      rating: 0,
    },
    likes: 47,
  },
  {
    id: "f8",
    type: "PROMOTION",
    category: "Calzado",
    store: stores.terra,
    images: ["https://picsum.photos/seed/terra-promo-1/800/1000"],
    promotion: {
      label: "2x1 en accesorios",
      conditions: "Este fin de semana, en tienda física y por WhatsApp.",
    },
    likes: 31,
  },
  {
    id: "f9",
    type: "COLLECTION",
    category: "Moda",
    store: stores.nova,
    images: ["https://picsum.photos/seed/nova-col-1/800/1000"],
    title: "Temporada Fría",
    collectionId: "c1",
    likes: 58,
  },
  {
    id: "f10",
    type: "COLLECTION",
    category: "Calzado",
    store: stores.terra,
    images: ["https://picsum.photos/seed/terra-col-1/800/1000"],
    title: "Urbana",
    collectionId: "c1",
    likes: 22,
  },
  {
    id: "f11",
    type: "STORE_STORY",
    category: "Tecnología",
    store: stores.orbe,
    images: ["https://picsum.photos/seed/orbe-story-1/800/1000"],
    title: "Conoce nuestro nuevo espacio",
    caption: "Así se ve nuestro punto de soporte técnico esta semana, listo para resolver tus dudas en persona.",
    likes: 64,
  },
  {
    id: "f12",
    type: "STORE_STORY",
    category: "Hogar",
    store: stores.casa,
    images: ["https://picsum.photos/seed/casa-story-1/800/1000"],
    title: "Así trabajamos",
    caption: "Cada vela se vierte y etiqueta a mano en nuestro taller de Medellín, en lotes pequeños.",
    likes: 39,
  },
];

export const mockFeedRepo: FeedRepo = {
  async list(params) {
    let items = feedItems;
    if (params?.types?.length) {
      items = items.filter((f) => params.types!.includes(f.type));
    }
    if (params?.storeId) {
      items = items.filter((f) => f.store.id === params.storeId);
    }
    if (params?.cursor) {
      const idx = items.findIndex((f) => f.id === params.cursor);
      if (idx >= 0) items = items.slice(idx + 1);
    }
    if (params?.limit) {
      items = items.slice(0, params.limit);
    }
    return items;
  },

  async getCollection(id) {
    for (const store of Object.values(storeDetails)) {
      const found = store.collections.find((c) => c.id === id);
      if (found) return found as StoreCollection;
    }
    return null;
  },
};
