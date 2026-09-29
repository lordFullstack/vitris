"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/data/supabase/server-client";
import type { TablesUpdate } from "@/lib/data/supabase/database.types";
import { uploadMerchantImage, validateImageFile } from "@/lib/data/supabase/upload";
import {
  STORE_ADDRESS_MAX,
  STORE_BIO_MAX,
  STORE_HOURS_MAX,
  STORE_NAME_MAX,
  STORE_NAME_MIN,
  STORE_POLICIES_MAX,
} from "@/lib/merchant-limits";

export async function updateStore(formData: FormData): Promise<{ error?: string; ok?: boolean }> {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Tu sesión expiró. Volvé a ingresar." };

  const { data: store } = await supabase
    .from("stores")
    .select("id")
    .eq("owner_user_id", user.id)
    .maybeSingle();
  if (!store) return { error: "Tu cuenta no está vinculada a ninguna tienda." };

  const name = String(formData.get("name") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const hours = String(formData.get("hours") ?? "").trim();
  const policies = String(formData.get("policies") ?? "").trim();
  const tagsRaw = String(formData.get("tags") ?? "").trim();
  const whatsapp = String(formData.get("whatsapp_number") ?? "").trim();
  const published = formData.get("published") === "on";

  if (name.length < STORE_NAME_MIN || name.length > STORE_NAME_MAX) {
    return { error: `El nombre debe tener entre ${STORE_NAME_MIN} y ${STORE_NAME_MAX} caracteres.` };
  }
  if (bio.length > STORE_BIO_MAX) {
    return { error: `La descripción no puede superar ${STORE_BIO_MAX} caracteres.` };
  }
  if (address.length > STORE_ADDRESS_MAX) {
    return { error: `La ubicación no puede superar ${STORE_ADDRESS_MAX} caracteres.` };
  }
  if (hours.length > STORE_HOURS_MAX) {
    return { error: `El horario no puede superar ${STORE_HOURS_MAX} caracteres.` };
  }
  if (policies.length > STORE_POLICIES_MAX) {
    return { error: `Las políticas no pueden superar ${STORE_POLICIES_MAX} caracteres.` };
  }
  if (!/^[0-9]{10,15}$/.test(whatsapp)) {
    return { error: "El WhatsApp debe ser solo números, formato internacional (ej: 573001234567)." };
  }

  const tags = tagsRaw
    ? tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const update: TablesUpdate<"stores"> = {
    name,
    bio: bio || null,
    address: address || null,
    hours: hours || null,
    policies: policies || null,
    tags,
    whatsapp_number: whatsapp,
    published,
  };

  const avatarFile = formData.get("avatar");
  if (avatarFile instanceof File && avatarFile.size > 0) {
    const err = validateImageFile(avatarFile);
    if (err) return { error: err };
    update.avatar_url = await uploadMerchantImage(supabase, avatarFile, `stores/${store.id}`);
  }

  const coverFile = formData.get("cover");
  if (coverFile instanceof File && coverFile.size > 0) {
    const err = validateImageFile(coverFile);
    if (err) return { error: err };
    update.cover_image = await uploadMerchantImage(supabase, coverFile, `stores/${store.id}`);
  }

  const { error } = await supabase.from("stores").update(update).eq("id", store.id);
  if (error) return { error: "No se pudo guardar. Intentá de nuevo." };

  revalidatePath("/comercio");
  revalidatePath(`/tienda/${store.id}`);
  return { ok: true };
}
