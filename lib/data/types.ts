import type {
  ProductDetail,
  Store,
  PublicStore,
  StoreDetail,
  StoreCollection,
  FeedItem,
  FeedItemType,
  Conversation,
  ChatMessage,
} from "@/lib/types";

/**
 * Contratos de la frontera de datos (LOOP de Fundación técnica, Bloque B).
 * El mock no puede hacer nada que Supabase no pueda. Y si Supabase va a
 * necesitar algo, el mock lo expone aunque no lo use.
 */

export interface ProductRepo {
  /** Devuelve el producto completo, con la tienda resuelta (ver ProductDetail.store) —
   *  no un catálogo mínimo. Todo consumidor real (grilla, búsqueda, detalle) necesita
   *  imagen/precio como mínimo, así que no hay una forma "liviana" separada. */
  list(params?: { category?: string; limit?: number; cursor?: string }): Promise<ProductDetail[]>;
  getById(id: string): Promise<ProductDetail | null>;
  listByStore(storeId: string): Promise<ProductDetail[]>;
}

export interface StoreRepo {
  /** Listado público. NUNCA incluye el número de WhatsApp. */
  list(params?: { city?: string }): Promise<PublicStore[]>;
  getById(id: string): Promise<StoreDetail | null>;
  getBySlug(slug: string): Promise<StoreDetail | null>;
}

export interface FeedRepo {
  list(params?: {
    types?: FeedItemType[];
    /** Adaptación sobre el contrato original: getStoreNovedades() de
     *  store-detail.ts filtraba el feed global por tienda — sin este
     *  parámetro no hay forma de expresar esa consulta. */
    storeId?: string;
    cursor?: string;
    limit?: number;
  }): Promise<FeedItem[]>;

  getCollection(id: string): Promise<StoreCollection | null>;
}

export interface ConversationRepo {
  list(): Promise<Conversation[]>;
  getById(id: string): Promise<Conversation | null>;

  /** Única puerta de entrada. El ID determinista (tienda + producto) se
   *  calcula ACÁ ADENTRO, nunca en un componente. productId ausente =
   *  conversación de tienda, separada de las de producto. */
  findOrCreate(params: { storeId: string; productId?: string }): Promise<Conversation>;

  listMessages(
    conversationId: string,
    params?: { before?: string; limit?: number }
  ): Promise<ChatMessage[]>;

  /** Devuelve el mensaje YA creado, con id y time puestos por el repo. */
  sendMessage(conversationId: string, text: string): Promise<ChatMessage>;

  markRead(conversationId: string): Promise<void>;

  /** Realtime. El mock devuelve una función vacía. */
  subscribe(conversationId: string, onMessage: (m: ChatMessage) => void): () => void;
}

export type { Store };
