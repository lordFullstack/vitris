import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { IMAGE_ALLOWED_TYPES, IMAGE_MAX_BYTES } from "@/lib/merchant-limits";

export function validateImageFile(file: File): string | null {
  if (!IMAGE_ALLOWED_TYPES.includes(file.type)) {
    return "Formato no admitido. Usá JPG, PNG o WEBP.";
  }
  if (file.size > IMAGE_MAX_BYTES) {
    return "La imagen pesa más de 5MB.";
  }
  return null;
}

/**
 * Sube al bucket vitris-media bajo `folder` (p.ej. "stores/{id}" o
 * "products/{id}") con un nombre generado — así nunca choca con el nombre
 * original del archivo del usuario. Las policies de Storage exigen que
 * `folder` corresponda a una tienda/producto del dueño autenticado (ver
 * migración vitris_media_owner_write_*), así que `supabase` debe ser un
 * cliente con sesión (createServerSupabaseClient), no el cliente público.
 */
export async function uploadMerchantImage(
  supabase: SupabaseClient<Database>,
  file: File,
  folder: string
): Promise<string> {
  const ext = (file.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("vitris-media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });
  if (error) throw new Error(`No se pudo subir la imagen: ${error.message}`);

  const { data } = supabase.storage.from("vitris-media").getPublicUrl(path);
  return data.publicUrl;
}
