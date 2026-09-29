import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/data/supabase/server-client";
import { signOutMerchant } from "../actions";

export default async function ComercioPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/comercio/login");
  }

  const { data: store } = await supabase
    .from("stores")
    .select("id")
    .eq("owner_user_id", user.id)
    .maybeSingle();

  return (
    <div className="flex min-h-dvh flex-col bg-void">
      {store && (
        <nav className="flex items-center gap-1 border-b border-graphite-line px-4 py-2">
          <Link
            href="/comercio"
            className="rounded-pill px-3 py-1.5 text-[13px] font-semibold text-ink-soft transition-colors active:bg-graphite-elevated"
          >
            Mi tienda
          </Link>
          <Link
            href="/comercio/productos"
            className="rounded-pill px-3 py-1.5 text-[13px] font-semibold text-ink-soft transition-colors active:bg-graphite-elevated"
          >
            Mis productos
          </Link>
        </nav>
      )}

      <div className="flex-1 px-6 py-6">{children}</div>

      <form action={signOutMerchant} className="px-6 pb-6">
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
