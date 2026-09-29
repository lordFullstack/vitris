import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/data/supabase/server-client";
import { updateStore } from "./store-actions";
import { StoreForm } from "./StoreForm";

export const dynamic = "force-dynamic";

export default async function ComercioTiendaPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/comercio/login");
  }

  const { data: store } = await supabase
    .from("stores")
    .select(
      "id,name,bio,address,hours,policies,tags,whatsapp_number,avatar_url,cover_image,published"
    )
    .eq("owner_user_id", user.id)
    .maybeSingle();

  if (!store) {
    return (
      <p className="text-[14px] text-ink-soft">
        Tu cuenta todavía no está vinculada a ninguna tienda. Hablá con VITRIS para
        completar el alta.
      </p>
    );
  }

  return <StoreForm store={store} action={updateStore} />;
}
