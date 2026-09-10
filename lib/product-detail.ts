import type { ProductDetail } from "./types";
import { stores } from "./mock-data";

// Mock centralizado para Product Detail (LOOP 02).
// Reutiliza los mismos IDs de producto que aparecen en el feed (LOOP 01)
// para que la navegación feed → detalle sea coherente.

export const productDetails: Record<string, ProductDetail> = {
  p1: {
    id: "p1",
    name: "Chaqueta oversize acolchada",
    category: "Moda",
    price: 189000,
    currency: "COP",
    availability: "in_stock",
    rating: 4.8,
    reviewsCount: 62,
    badge: "Nuevo",
    images: [
      "https://picsum.photos/seed/nova-jacket-1/900/1125",
      "https://picsum.photos/seed/nova-jacket-2/900/1125",
      "https://picsum.photos/seed/nova-jacket-3/900/1125",
    ],
    description:
      "Chaqueta acolchada de corte oversize, forro interno cálido y cierre frontal. Pensada para uso diario en clima frío, con caída relajada y bolsillos funcionales.",
    variants: [
      {
        id: "talla",
        label: "Talla",
        options: [
          { id: "xs", label: "XS" },
          { id: "s", label: "S" },
          { id: "m", label: "M" },
          { id: "l", label: "L" },
          { id: "xl", label: "XL" },
        ],
      },
      {
        id: "color",
        label: "Color",
        options: [
          { id: "negro", label: "Negro", swatch: "#1A1A1E" },
          { id: "beige", label: "Beige", swatch: "#D9C9AE" },
          { id: "orbital", label: "Violeta", swatch: "#7C5CFF" },
        ],
      },
    ],
    store: stores.nova,
    similar: [
      { id: "p6", name: "Bolso mini estructurado", price: 156000, currency: "COP", image: "https://picsum.photos/seed/nova-bag-1/500/620" },
    ],
  },
  p2: {
    id: "p2",
    name: "Eau de Parfum Ámbar 50ml",
    category: "Perfumería",
    price: 132000,
    currency: "COP",
    availability: "in_stock",
    rating: 4.9,
    reviewsCount: 34,
    images: [
      "https://picsum.photos/seed/luma-perfume-1/900/1125",
      "https://picsum.photos/seed/luma-perfume-2/900/1125",
    ],
    description:
      "Fragancia amaderada con notas de ámbar, vainilla y un toque cítrico de salida. Larga duración, ideal para uso diario o noche.",
    variants: [
      {
        id: "tamano",
        label: "Tamaño",
        options: [
          { id: "30", label: "30 ml" },
          { id: "50", label: "50 ml" },
          { id: "100", label: "100 ml" },
        ],
      },
    ],
    store: stores.luma,
    similar: [],
  },
  p3: {
    id: "p3",
    name: "Botas urbanas cuero",
    category: "Calzado",
    price: 245000,
    currency: "COP",
    availability: "low_stock",
    rating: 4.6,
    reviewsCount: 51,
    badge: "Pocas unidades",
    images: [
      "https://picsum.photos/seed/terra-shoes-1/900/1125",
      "https://picsum.photos/seed/terra-shoes-2/900/1125",
      "https://picsum.photos/seed/terra-shoes-3/900/1125",
    ],
    description:
      "Botas en cuero genuino con suela de goma antideslizante. Corte urbano, cómodas para caminar todo el día sin sacrificar estilo.",
    variants: [
      {
        id: "talla",
        label: "Talla",
        options: [
          { id: "36", label: "36" },
          { id: "37", label: "37" },
          { id: "38", label: "38" },
          { id: "39", label: "39" },
          { id: "40", label: "40" },
          { id: "41", label: "41" },
        ],
      },
    ],
    store: stores.terra,
    similar: [],
  },
  p4: {
    id: "p4",
    name: "Audífonos inalámbricos ANC",
    category: "Tecnología",
    price: 310000,
    currency: "COP",
    availability: "in_stock",
    rating: 4.7,
    reviewsCount: 128,
    images: [
      "https://picsum.photos/seed/orbe-tech-1/900/1125",
      "https://picsum.photos/seed/orbe-tech-2/900/1125",
    ],
    description:
      "Cancelación activa de ruido, hasta 30 horas de batería y estuche de carga rápida. Conexión Bluetooth 5.3 y modo transparencia.",
    variants: [
      {
        id: "color",
        label: "Color",
        options: [
          { id: "negro", label: "Negro", swatch: "#1A1A1E" },
          { id: "blanco", label: "Blanco", swatch: "#F2F1F7" },
        ],
      },
    ],
    store: stores.orbe,
    similar: [],
  },
  p5: {
    id: "p5",
    name: "Vela artesanal ámbar y vainilla",
    category: "Hogar",
    price: 48000,
    currency: "COP",
    availability: "in_stock",
    rating: 4.9,
    reviewsCount: 19,
    images: ["https://picsum.photos/seed/casa-social-1/900/1050"],
    description:
      "Vela de cera de soya hecha a mano, con mecha de madera. Tiempo de combustión aproximado de 40 horas.",
    variants: [
      {
        id: "aroma",
        label: "Aroma",
        options: [
          { id: "ambar", label: "Ámbar y vainilla" },
          { id: "sandalo", label: "Sándalo" },
        ],
      },
    ],
    store: stores.casa,
    similar: [],
  },
  p6: {
    id: "p6",
    name: "Bolso mini estructurado",
    category: "Moda",
    price: 156000,
    currency: "COP",
    availability: "out_of_stock",
    rating: 4.9,
    reviewsCount: 27,
    images: [
      "https://picsum.photos/seed/nova-bag-1/900/1125",
      "https://picsum.photos/seed/nova-bag-2/900/1125",
    ],
    description:
      "Bolso mini en cuero sintético estructurado, correa ajustable y compartimento interno con bolsillo para tarjetas.",
    variants: [
      {
        id: "color",
        label: "Color",
        options: [
          { id: "negro", label: "Negro", swatch: "#1A1A1E" },
          { id: "camel", label: "Camel", swatch: "#B5804A" },
        ],
      },
    ],
    store: stores.nova,
    similar: [
      { id: "p1", name: "Chaqueta oversize acolchada", price: 189000, currency: "COP", image: "https://picsum.photos/seed/nova-jacket-1/500/620" },
    ],
  },
};
