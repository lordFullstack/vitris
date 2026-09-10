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

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  availability: Availability;
  rating?: number;
}

export type FeedItemType = "product" | "social";

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
  rating?: number;
  reviewsCount?: number;
  badge?: string;
  images: string[];
  description: string;
  variants?: VariantGroup[];
  store: Store;
  similar: SimilarProduct[];
}
