import type { Store } from "./types";

// Datos mock. Centralizados y tipados para reemplazo directo por Supabase
// cuando exista backend real (ver LOOP_01.md).
//
// feedItems ya se movió a lib/data/mock/feed.ts (Bloque B, Paso 2). Este
// archivo sobrevive solo por `stores`, que todavía usan
// components/chat/ConversationList.tsx y app/(main)/chat/page.tsx —
// desaparece del todo en el Paso 3.

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
