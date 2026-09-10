import type { Conversation } from "./types";

// Mock centralizado para Chat / Preguntar (LOOP 05).
// Sin backend conversacional real todavía — la UX es real, los datos son mock.

export const quickQuestions = [
  "¿Tienen mi talla?",
  "¿Está disponible?",
  "¿Qué colores tienen?",
  "¿Hacen envíos?",
  "¿Dónde están?",
  "¿Es original?",
  "¿Cuánto demora?",
];

export const conversations: Conversation[] = [
  {
    id: "c1",
    storeId: "nova",
    status: "respondida",
    productId: "p1",
    unread: false,
    lastMessage: "Sí, nos queda en talla M. ¿Te la reservo?",
    lastMessageAt: "2026-09-08T15:20:00.000Z",
    messages: [
      {
        id: "m1",
        from: "user",
        text: "Hola, ¿tienen la chaqueta oversize en talla M?",
        time: "2026-09-08T15:10:00.000Z",
      },
      {
        id: "m2",
        from: "store",
        text: "¡Hola! Sí, nos queda en talla M. ¿Te la reservo?",
        time: "2026-09-08T15:20:00.000Z",
      },
    ],
  },
  {
    id: "c2",
    storeId: "terra",
    status: "activa",
    productId: "p3",
    unread: true,
    lastMessage: "¿Cuánto demora el envío a Bucaramanga?",
    lastMessageAt: "2026-09-09T10:05:00.000Z",
    messages: [
      {
        id: "m1",
        from: "user",
        text: "¿Cuánto demora el envío a Bucaramanga?",
        time: "2026-09-09T10:05:00.000Z",
      },
    ],
  },
  {
    id: "c3",
    storeId: "luma",
    status: "archivada",
    unread: false,
    lastMessage: "Perfecto, gracias por tu compra 🌿",
    lastMessageAt: "2026-08-30T18:00:00.000Z",
    messages: [
      {
        id: "m1",
        from: "user",
        text: "¿La 50ml alcanza para un viaje de una semana?",
        time: "2026-08-30T17:40:00.000Z",
      },
      {
        id: "m2",
        from: "store",
        text: "Sí, con dos aplicaciones al día te alcanza sin problema.",
        time: "2026-08-30T17:55:00.000Z",
      },
      {
        id: "m3",
        from: "store",
        text: "Perfecto, gracias por tu compra 🌿",
        time: "2026-08-30T18:00:00.000Z",
      },
    ],
  },
];

export function getConversation(id: string) {
  return conversations.find((c) => c.id === id);
}

export function findConversationByStore(storeId: string) {
  return conversations.find((c) => c.storeId === storeId);
}
