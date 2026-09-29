import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY en el entorno."
  );
}

/**
 * Cliente con sesión (cookies) para Server Components / Server Actions del
 * área de comercio (/comercio). Distinto del cliente plano en client.ts,
 * que es para lectura pública anónima y no necesita sesión.
 */
export function createServerSupabaseClient() {
  const cookieStore = cookies();
  return createServerClient<Database>(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Se llama desde un Server Component (sin permiso de escritura de
          // cookies) — el middleware ya refresca la sesión; esto es best-effort.
        }
      },
    },
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}
