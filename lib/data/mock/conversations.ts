import type { Conversation, ChatMessage } from "@/lib/types";
import type { ConversationRepo } from "../types";

// Mock centralizado de conversaciones. Antes lib/chat-data.ts.

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

let nextConversationSeq = conversations.length + 1;
let nextMessageSeq = 1;

export const mockConversationRepo: ConversationRepo = {
  async list() {
    return conversations;
  },

  async getById(id) {
    return conversations.find((c) => c.id === id) ?? null;
  },

  async findOrCreate({ storeId, productId }) {
    const existing = conversations.find(
      (c) => c.storeId === storeId && c.productId === productId
    );
    if (existing) return existing;

    const now = new Date().toISOString();
    const created: Conversation = {
      id: `local-conv-${nextConversationSeq++}`,
      storeId,
      productId,
      status: "activa",
      unread: false,
      lastMessage: "",
      lastMessageAt: now,
      messages: [],
    };
    // En memoria del módulo — alcanza para este bloque. La persistencia real
    // (sobrevivir a un refresh, sincronizar entre pestañas) es del LOOP 09.
    conversations.push(created);
    return created;
  },

  async listMessages(conversationId, params) {
    const conv = conversations.find((c) => c.id === conversationId);
    if (!conv) return [];
    let messages = conv.messages;
    if (params?.before) {
      const idx = messages.findIndex((m) => m.id === params.before);
      if (idx >= 0) messages = messages.slice(0, idx);
    }
    if (params?.limit) {
      messages = messages.slice(-params.limit);
    }
    return messages;
  },

  async sendMessage(conversationId, text) {
    const conv = conversations.find((c) => c.id === conversationId);
    const message: ChatMessage = {
      id: `local-msg-${nextMessageSeq++}`,
      from: "user",
      text,
      time: new Date().toISOString(),
    };
    if (conv) {
      conv.messages.push(message);
      conv.lastMessage = text;
      conv.lastMessageAt = message.time;
    }
    return message;
  },

  async markRead(conversationId) {
    const conv = conversations.find((c) => c.id === conversationId);
    if (conv) conv.unread = false;
  },

  subscribe() {
    return () => {};
  },
};
