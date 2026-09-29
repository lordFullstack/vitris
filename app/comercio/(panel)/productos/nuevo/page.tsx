import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/data/supabase/server-client";
import { getCategories } from "@/lib/data/supabase/explore";
import { createProduct } from "../product-actions";
import { ProductForm } from "../ProductForm";

export const dynamic = "force-dynamic";

export default async function NuevoProductoPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/comercio/login");

  const categories = await getCategories();

  return (
    <div>
      <h1 className="font-display text-[18px] font-semibold text-ink">Nuevo producto</h1>
      <div className="mt-5">
        <ProductForm categories={categories} action={createProduct} />
      </div>
    </div>
  );
}
