import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/data/supabase/server-client";
import { formatPrice } from "@/lib/format";
import { toggleProductPublished } from "./product-actions";

export const dynamic = "force-dynamic";

const AVAILABILITY_LABEL: Record<string, string> = {
  in_stock: "Disponible",
  low_stock: "Poco stock",
  out_of_stock: "Agotado",
};

export default async function ComercioProductosPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/comercio/login");

  const { data: store } = await supabase
    .from("stores")
    .select("id")
    .eq("owner_user_id", user.id)
    .maybeSingle();

  if (!store) {
    return (
      <p className="text-[14px] text-ink-soft">
        Tu cuenta no está vinculada a ninguna tienda.
      </p>
    );
  }

  const { data: products } = await supabase
    .from("products")
    .select("id,name,price,currency,availability,published,images")
    .eq("store_id", store.id)
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/comercio/productos/nuevo"
        className="flex h-11 items-center justify-center rounded-pill bg-orbital text-[14px] font-semibold text-ink transition-transform active:scale-[0.98]"
      >
        + Nuevo producto
      </Link>

      {(!products || products.length === 0) && (
        <p className="text-[14px] text-ink-soft">Todavía no cargaste productos.</p>
      )}

      <ul className="flex flex-col gap-3">
        {products?.map((p) => (
          <li key={p.id} className="flex items-center gap-3 rounded-2xl border border-graphite-line p-3">
            <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-graphite">
              {p.images[0] && <img src={p.images[0]} alt="" className="h-full w-full object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-ink">{p.name}</p>
              <p className="text-[13px] text-ink-soft">
                {formatPrice(p.price, p.currency)} · {AVAILABILITY_LABEL[p.availability] ?? p.availability}
              </p>
              <p className={`text-[12px] ${p.published ? "text-ink-faint" : "text-signal-danger"}`}>
                {p.published ? "Publicado" : "Oculto"}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <Link
                href={`/comercio/productos/${p.id}/editar`}
                className="rounded-pill border border-graphite-line px-3 py-1.5 text-[12.5px] font-semibold text-ink transition-colors active:bg-graphite-elevated"
              >
                Editar
              </Link>
              <form action={toggleProductPublished.bind(null, p.id, !p.published)}>
                <button
                  type="submit"
                  className="rounded-pill border border-graphite-line px-3 py-1.5 text-[12.5px] font-semibold text-ink-soft transition-colors active:bg-graphite-elevated"
                >
                  {p.published ? "Ocultar" : "Publicar"}
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
