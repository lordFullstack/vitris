"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/data/supabase/server-client";
import { uploadMerchantImage, validateImageFile } from "@/lib/data/supabase/upload";
import {
  PRODUCT_DESCRIPTION_MAX,
  PRODUCT_IMAGES_MAX,
  PRODUCT_NAME_MAX,
  PRODUCT_NAME_MIN,
  PRODUCT_PRICE_MAX,
  PRODUCT_PRICE_MIN,
} from "@/lib/merchant-limits";

async function requireOwnStore() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Tu sesión expiró. Volvé a ingresar." as const };

  const { data: store } = await supabase
    .from("stores")
    .select("id")
    .eq("owner_user_id", user.id)
    .maybeSingle();
  if (!store) return { error: "Tu cuenta no está vinculada a ninguna tienda." as const };

  return { supabase, storeId: store.id };
}

function readProductFields(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "").trim();
  const category_id = String(formData.get("category_id") ?? "").trim() || null;
  const availability = String(formData.get("availability") ?? "in_stock");
  const published = formData.get("published") === "on";
  const price = Number(priceRaw);

  if (name.length < PRODUCT_NAME_MIN || name.length > PRODUCT_NAME_MAX) {
    return {
      error: `El nombre debe tener entre ${PRODUCT_NAME_MIN} y ${PRODUCT_NAME_MAX} caracteres.`,
    } as const;
  }
  if (description.length > PRODUCT_DESCRIPTION_MAX) {
    return { error: `La descripción no puede superar ${PRODUCT_DESCRIPTION_MAX} caracteres.` } as const;
  }
  if (
    !Number.isFinite(price) ||
    !Number.isInteger(price) ||
    price < PRODUCT_PRICE_MIN ||
    price > PRODUCT_PRICE_MAX
  ) {
    return {
      error: `El precio debe ser un número entero entre ${PRODUCT_PRICE_MIN} y ${PRODUCT_PRICE_MAX}.`,
    } as const;
  }
  if (!["in_stock", "low_stock", "out_of_stock"].includes(availability)) {
    return { error: "Disponibilidad inválida." } as const;
  }

  return {
    fields: { name, description: description || null, price, category_id, availability, published },
  } as const;
}

export async function createProduct(formData: FormData): Promise<{ error?: string } | void> {
  const ctx = await requireOwnStore();
  if ("error" in ctx) return { error: ctx.error };
  const { supabase, storeId } = ctx;

  const parsed = readProductFields(formData);
  if ("error" in parsed) return { error: parsed.error };

  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) return { error: "Subí al menos una foto." };
  if (files.length > PRODUCT_IMAGES_MAX) return { error: `Máximo ${PRODUCT_IMAGES_MAX} fotos.` };
  for (const f of files) {
    const err = validateImageFile(f);
    if (err) return { error: err };
  }

  const { data: inserted, error: insertError } = await supabase
    .from("products")
    .insert({ store_id: storeId, images: [], ...parsed.fields })
    .select("id")
    .single();

  if (insertError || !inserted) return { error: "No se pudo crear el producto." };

  const images: string[] = [];
  for (const file of files) {
    images.push(await uploadMerchantImage(supabase, file, `products/${inserted.id}`));
  }

  await supabase.from("products").update({ images }).eq("id", inserted.id);

  revalidatePath("/comercio/productos");
  redirect("/comercio/productos");
}

export async function updateProduct(id: string, formData: FormData): Promise<{ error?: string } | void> {
  const ctx = await requireOwnStore();
  if ("error" in ctx) return { error: ctx.error };
  const { supabase } = ctx;

  const parsed = readProductFields(formData);
  if ("error" in parsed) return { error: parsed.error };

  const keptImages = formData.getAll("keptImages").map(String);
  const newFiles = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  if (keptImages.length + newFiles.length === 0) return { error: "Subí al menos una foto." };
  if (keptImages.length + newFiles.length > PRODUCT_IMAGES_MAX) {
    return { error: `Máximo ${PRODUCT_IMAGES_MAX} fotos.` };
  }
  for (const f of newFiles) {
    const err = validateImageFile(f);
    if (err) return { error: err };
  }

  const uploaded: string[] = [];
  for (const file of newFiles) {
    uploaded.push(await uploadMerchantImage(supabase, file, `products/${id}`));
  }

  const { error } = await supabase
    .from("products")
    .update({ ...parsed.fields, images: [...keptImages, ...uploaded] })
    .eq("id", id);

  if (error) return { error: "No se pudo guardar. Intentá de nuevo." };

  revalidatePath("/comercio/productos");
  redirect("/comercio/productos");
}

// D-10-04: nunca borrar, solo ocultar — no existe acción de delete a propósito
// (y la policy de Storage/RLS de productos tampoco tiene permiso de DELETE).
export async function toggleProductPublished(id: string, published: boolean) {
  const ctx = await requireOwnStore();
  if ("error" in ctx) return;
  await ctx.supabase.from("products").update({ published }).eq("id", id);
  revalidatePath("/comercio/productos");
}
