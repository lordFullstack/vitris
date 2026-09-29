import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Línea roja del piloto: producción no cae en silencio a mocks. Si falta
  // config, falla explícito acá en vez de servir datos falsos.
  throw new Error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY en el entorno."
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
  global: {
    // Next.js cachea fetch() indefinidamente por default (Data Cache), y
    // acá los datos cambian con cada alta de comercio/producto — sin esto,
    // una tienda editada podía seguir mostrando la versión vieja hasta el
    // próximo deploy. Encontrado probando un update real en Supabase.
    fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
  },
});
