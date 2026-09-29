import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/data/supabase/server-client";
import { signOutMerchant } from "./actions";

export const dynamic = "force-dynamic";

export default async function ComercioPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/comercio/login");
  }

  const { data: store } = await supabase
    .from("stores")
    .select("id,slug,name,avatar_url")
    .eq("owner_user_id", user.id)
    .maybeSingle();

  return (
    <div className="flex min-h-dvh flex-col bg-void px-6 py-8">
      <div className="flex-1">
        {store ? (
          <>
            <div className="flex items-center gap-3">
              {store.avatar_url && (
                <img
                  src={store.avatar_url}
                  alt=""
                  className="h-14 w-14 rounded-pill border-2 border-orbital object-cover"
                />
              )}
              <div>
                <p className="text-[13px] text-ink-soft">Bienvenido</p>
                <h1 className="font-display text-[20px] font-semibold text-ink">
                  {store.name}
                </h1>
              </div>
            </div>

            <Link
              href={`/tienda/${store.id}`}
              className="mt-6 flex h-11 items-center justify-center rounded-pill border border-graphite-line px-4 text-[13.5px] font-semibold text-ink transition-colors active:bg-graphite-elevated"
            >
              Ver mi tienda pública
            </Link>

            <p className="mt-4 text-[12.5px] text-ink-faint">
              Editar productos y datos de la tienda desde acá todavía no está
              disponible — llega en el siguiente LOOP.
            </p>
          </>
        ) : (
          <p className="text-[14px] text-ink-soft">
            Tu cuenta todavía no está vinculada a ninguna tienda. Hablá con VITRIS
            para completar el alta.
          </p>
        )}
      </div>

      <form action={signOutMerchant}>
        <button
          type="submit"
          className="flex h-11 w-full items-center justify-center rounded-pill border border-graphite-line text-[13.5px] font-semibold text-ink-soft transition-colors active:bg-graphite-elevated"
        >
          Cerrar sesión
        </button>
      </form>
    </div>
  );
}
