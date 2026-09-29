import type { FeedItem, StoreCollection, Availability } from "@/lib/types";
import type { FeedRepo } from "../types";
import { supabase } from "./client";
import type { Tables } from "./database.types";
import { getFullStoresByIds } from "./stores";
import { isInvalidIdError } from "./errors";

type ProductRow = Tables<"products"> & {
  categories: { label: string } | null;
};

const PRODUCT_COLUMNS =
  "id,store_id,name,price,currency,availability,badge,images,category_id,created_at,categories(label)";

/**
 * El feed real se arma solo con productos publicados (S2 del piloto: "el
 * descubrimiento sale de productos reales publicados; sin Post ni
 * contenido editorial"). Todo item real es PRODUCT_POST — los otros
 * cuatro tipos (PROMOTION, COLLECTION, STORE_STORY, INSPIRATIONAL_POST)
 * siguen existiendo en el tipo FeedItemType para no romper el feed mock
 * de social-discovery, pero esta implementación nunca los produce: no
 * hay tabla que los respalde y no se va a inventar contenido.
 */
export const supabaseFeedRepo: FeedRepo = {
  async list(params) {
    // Si piden tipos y ninguno es PRODUCT_POST, la respuesta real es
    // vacía — no hay nada más que servir, y no es un error.
    if (params?.types?.length && !params.types.includes("PRODUCT_POST")) {
      return [];
    }

    let query = supabase
      .from("products")
      .select(PRODUCT_COLUMNS)
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (params?.storeId) query = query.eq("store_id", params.storeId);
    if (params?.cursor) query = query.lt("id", params.cursor);
    if (params?.limit) query = query.limit(params.limit);

    const { data, error } = await query;
    if (error) throw error;

    const rows = (data ?? []) as unknown as ProductRow[];
    const stores = await getFullStoresByIds(rows.map((r) => r.store_id));

    const items: FeedItem[] = [];
    for (const row of rows) {
      const store = stores.get(row.store_id);
      if (!store) continue;
      items.push({
        id: row.id,
        type: "PRODUCT_POST",
        category: row.categories?.label ?? "",
        store,
        images: row.images,
        badge: row.badge ?? undefined,
        product: {
          id: row.id,
          name: row.name,
          price: row.price,
          currency: row.currency,
          availability: row.availability as Availability,
        },
        // Sin sistema de likes real todavía — 0 real, no inventado.
        likes: 0,
      });
    }
    return items;
  },

  async getCollection(id) {
    const { data, error } = await supabase
      .from("collections")
      .select("id,name,image,count")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      if (isInvalidIdError(error)) return null;
      throw error;
    }
    if (!data) return null;
    const collection: StoreCollection = {
      id: data.id,
      name: data.name,
      image: data.image ?? "",
      count: data.count,
    };
    return collection;
  },
};
