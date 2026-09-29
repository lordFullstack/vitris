import type { ProductDetail, VariantGroup, SimilarProduct } from "@/lib/types";
import type { ProductRepo } from "../types";
import { supabase } from "./client";
import type { Tables } from "./database.types";
import { getFullStoreById, getFullStoresByIds } from "./stores";
import { isInvalidIdError } from "./errors";

type ProductRow = Tables<"products"> & {
  categories: { label: string } | null;
};

const PRODUCT_COLUMNS =
  "id,store_id,name,description,price,currency,availability,badge,images,variants,category_id,created_at,categories(label)";

async function similarProducts(storeId: string, excludeId: string): Promise<SimilarProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select("id,name,price,currency,images")
    .eq("store_id", storeId)
    .eq("published", true)
    .neq("id", excludeId)
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) throw error;
  return (data ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    currency: p.currency,
    image: p.images[0] ?? "",
  }));
}

async function toProductDetail(row: ProductRow): Promise<ProductDetail | null> {
  const store = await getFullStoreById(row.store_id);
  if (!store) return null;

  return {
    id: row.id,
    name: row.name,
    category: row.categories?.label ?? "",
    price: row.price,
    currency: row.currency,
    availability: row.availability as ProductDetail["availability"],
    // Sin sistema de reseñas real todavía — 0, no un número inventado
    // (misma decisión que LOOP V, V4).
    rating: 0,
    reviewsCount: 0,
    badge: row.badge ?? undefined,
    images: row.images,
    description: row.description ?? "",
    variants: (row.variants as unknown as VariantGroup[] | null) ?? undefined,
    store,
    similar: await similarProducts(row.store_id, row.id),
  };
}

export const supabaseProductRepo: ProductRepo = {
  async list(params) {
    let query = supabase
      .from("products")
      .select(PRODUCT_COLUMNS)
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (params?.category) query = query.eq("category_id", params.category);
    if (params?.cursor) query = query.lt("id", params.cursor);
    if (params?.limit) query = query.limit(params.limit);

    const { data, error } = await query;
    if (error) throw error;

    const rows = (data ?? []) as unknown as ProductRow[];
    const stores = await getFullStoresByIds(rows.map((r) => r.store_id));
    const results: ProductDetail[] = [];
    for (const row of rows) {
      const store = stores.get(row.store_id);
      if (!store) continue;
      results.push({
        id: row.id,
        name: row.name,
        category: row.categories?.label ?? "",
        price: row.price,
        currency: row.currency,
        availability: row.availability as ProductDetail["availability"],
        rating: 0,
        reviewsCount: 0,
        badge: row.badge ?? undefined,
        images: row.images,
        description: row.description ?? "",
        variants: (row.variants as unknown as VariantGroup[] | null) ?? undefined,
        store,
        similar: await similarProducts(row.store_id, row.id),
      });
    }
    return results;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_COLUMNS)
      .eq("id", id)
      .eq("published", true)
      .maybeSingle();

    if (error) {
      if (isInvalidIdError(error)) return null;
      throw error;
    }
    if (!data) return null;
    return toProductDetail(data as unknown as ProductRow);
  },

  async listByStore(storeId) {
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_COLUMNS)
      .eq("store_id", storeId)
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const rows = (data ?? []) as unknown as ProductRow[];
    const store = await getFullStoreById(storeId);
    if (!store) return [];

    const results: ProductDetail[] = [];
    for (const row of rows) {
      results.push({
        id: row.id,
        name: row.name,
        category: row.categories?.label ?? "",
        price: row.price,
        currency: row.currency,
        availability: row.availability as ProductDetail["availability"],
        rating: 0,
        reviewsCount: 0,
        badge: row.badge ?? undefined,
        images: row.images,
        description: row.description ?? "",
        variants: (row.variants as unknown as VariantGroup[] | null) ?? undefined,
        store,
        similar: await similarProducts(row.store_id, row.id),
      });
    }
    return results;
  },
};
