export type Availability = "in_stock" | "low_stock" | "out_of_stock";

export interface Store {
  id: string;
  name: string;
  avatarUrl: string;
  verified?: boolean;
  distanceKm?: number;
  whatsappNumber: string; // formato internacional sin '+', ej: '573001234567'
  rating?: number;
  followers?: number;
}

/** Forma segura para listados públicos (StoreRepo.list): nunca lleva
 *  whatsappNumber. Un listado de tiendas es, sin esto, un directorio de
 *  números listo para scraping — ver LOOP 07, B.7. */
export type PublicStore = Omit<Store, "whatsappNumber">;

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  availability: Availability;
  rating?: number;
}

export type FeedItemType =
  | "PRODUCT_POST"
  | "INSPIRATIONAL_POST"
  | "PROMOTION"
  | "COLLECTION"
  | "STORE_STORY";

export interface Promotion {
  label: string;
  conditions?: string;
}

export interface FeedItem {
  id: string;
  type: FeedItemType;
  category: string;
  store: Store;
  images: string[];
  caption?: string;
  product?: Product;
  badge?: string;
  likes: number;
  /** INSPIRATIONAL_POST / COLLECTION / STORE_STORY */
  title?: string;
  /** solo PROMOTION */
  promotion?: Promotion;
  /** solo COLLECTION — referencia a StoreCollection.id dentro de store-detail.ts */
  collectionId?: string;
}

export interface VariantOption {
  id: string;
  label: string;
  swatch?: string; // hex, para variantes de color
}

export interface VariantGroup {
  id: string;
  label: string;
  options: VariantOption[];
}

export interface SimilarProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
}

export interface ChatMessage {
  id: string;
  from: "user" | "store";
  text: string;
  time: string;
}

export type ConversationStatus = "activa" | "respondida" | "archivada";

export interface Conversation {
  id: string;
  storeId: string;
  status: ConversationStatus;
  productId?: string;
  unread?: boolean;
  lastMessage: string;
  lastMessageAt: string;
  messages: ChatMessage[];
}

export interface StoreCollection {
  id: string;
  name: string;
  image: string;
  count: number;
}

export interface StoreDetail extends Store {
  coverImage: string;
  bio: string;
  tags: string[];
  address?: string;
  hours?: string;
  policies?: string;
  collections: StoreCollection[];
}

export interface ProductDetail {
  id: string;
  name: string;
  price: number;
  currency: string;
  availability: Availability;
  category: string;
  rating?: number;
  reviewsCount?: number;
  badge?: string;
  images: string[];
  description: string;
  variants?: VariantGroup[];
  /** Se renderiza en el detalle de producto (LOOP V, V3): la tienda no
   *  es un dato secundario. ProductRepo.getById (Bloque B) debe devolver
   *  el producto con la tienda ya resuelta acá adentro — nunca un
   *  storeId pelado que obligue a una segunda llamada desde el componente. */
  store: Store;
  similar: SimilarProduct[];
}
