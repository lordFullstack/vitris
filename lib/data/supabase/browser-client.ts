"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY en el entorno."
  );
}

/** Cliente para el navegador — lo usa el formulario de login para llamar
 *  signInWithPassword(). Persiste la sesión en cookies (vía @supabase/ssr),
 *  compartida con el cliente de servidor en server-client.ts. */
export function createBrowserSupabaseClient() {
  return createBrowserClient<Database>(supabaseUrl!, supabaseAnonKey!);
}
