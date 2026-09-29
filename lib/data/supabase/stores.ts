import type { Store, StoreDetail, PublicStore } from "@/lib/types";
import type { StoreRepo } from "../types";
import { supabase } from "./client";
import type { Tables } from "./database.types";
import { isInvalidIdError } from "./errors";

// Columnas permitidas para anon/authenticated — whatsapp_number queda afuera
// a propósito (ver migración initial_schema: revoke + grant por columna).
// Pedirla acá sería un error en runtime, no un descuido silencioso.
const PUBLIC_COLUMNS =
  "id,slug,name,avatar_url,cover_image,bio,tags,address,hours,policies,verified,followers,created_at";

type PublicStoreRow = Pick<
  Tables<"stores">,
  | "id"
  | "slug"
  | "name"
  | "avatar_url"
  | "cover_image"
  | "bio"
  | "tags"
  | "address"
  | "hours"
  | "policies"
  | "verified"
  | "followers"
  | "created_at"
>;

function toPublicStore(row: PublicStoreRow): PublicStore {
  return {
    id: row.id,
    name: row.name,
    avatarUrl: row.avatar_url ?? "",
    verified: row.verified,
    followers: row.followers,
  };
}

/** Une la fila pública de la tienda con su WhatsApp, resuelto aparte por
 *  get_store_whatsapp — nunca vienen en la misma consulta. */
async function toStoreDetail(row: PublicStoreRow): Promise<StoreDetail> {
  const [{ data: collections }, { data: whatsappNumber }] = await Promise.all([
    supabase.from("collections").select("id,name,image,count").eq("store_id", row.id),
    supabase.rpc("get_store_whatsapp", { store_id: row.id }),
  ]);

  return {
    id: row.id,
    name: row.name,
    avatarUrl: row.avatar_url ?? "",
    verified: row.verified,
    followers: row.followers,
    whatsappNumber: whatsappNumber ?? "",
    coverImage: row.cover_image ?? "",
    bio: row.bio ?? "",
    tags: row.tags,
    address: row.address ?? undefined,
    hours: row.hours ?? undefined,
    policies: row.policies ?? undefined,
    collections: (collections ?? []).map((c) => ({
      id: c.id,
      name: c.name,
      image: c.image ?? "",
      count: c.count,
    })),
  };
}

export const supabaseStoreRepo: StoreRepo = {
  async list() {
    const { data, error } = await supabase
      .from("stores")
      .select(PUBLIC_COLUMNS)
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []).map(toPublicStore);
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("stores")
      .select(PUBLIC_COLUMNS)
      .eq("id", id)
      .eq("published", true)
      .maybeSingle();

    if (error) {
      if (isInvalidIdError(error)) return null;
      throw error;
    }
    if (!data) return null;
    return toStoreDetail(data);
  },

  async getBySlug(slug) {
    const { data, error } = await supabase
      .from("stores")
      .select(PUBLIC_COLUMNS)
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;
    return toStoreDetail(data);
  },
};

/** Trae el Store completo (con WhatsApp) para embeber en un producto.
 *  Uso interno de supabase/products.ts, no forma parte de StoreRepo. */
export async function getFullStoreById(id: string): Promise<Store | null> {
  const { data, error } = await supabase
    .from("stores")
    .select(PUBLIC_COLUMNS)
    .eq("id", id)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    if (isInvalidIdError(error)) return null;
    throw error;
  }
  if (!data) return null;

  const { data: whatsappNumber } = await supabase.rpc("get_store_whatsapp", {
    store_id: id,
  });

  return {
    id: data.id,
    name: data.name,
    avatarUrl: data.avatar_url ?? "",
    verified: data.verified,
    followers: data.followers,
    whatsappNumber: whatsappNumber ?? "",
  };
}

/** Batch de tiendas completas (con WhatsApp), una llamada RPC por tienda
 *  única — nunca una lista masiva. Uso interno para el feed/listados de
 *  productos que embeben varias tiendas distintas. */
export async function getFullStoresByIds(ids: string[]): Promise<Map<string, Store>> {
  const uniqueIds = [...new Set(ids)];
  const map = new Map<string, Store>();
  if (uniqueIds.length === 0) return map;

  const { data: rows, error } = await supabase
    .from("stores")
    .select(PUBLIC_COLUMNS)
    .in("id", uniqueIds)
    .eq("published", true);

  if (error) {
    if (isInvalidIdError(error)) return map;
    throw error;
  }

  const whatsappEntries = await Promise.all(
    (rows ?? []).map(async (row) => {
      const { data: whatsappNumber } = await supabase.rpc("get_store_whatsapp", {
        store_id: row.id,
      });
      return [row.id, whatsappNumber ?? ""] as const;
    })
  );
  const whatsappById = new Map(whatsappEntries);

  for (const row of rows ?? []) {
    map.set(row.id, {
      id: row.id,
      name: row.name,
      avatarUrl: row.avatar_url ?? "",
      verified: row.verified,
      followers: row.followers,
      whatsappNumber: whatsappById.get(row.id) ?? "",
    });
  }
  return map;
}
