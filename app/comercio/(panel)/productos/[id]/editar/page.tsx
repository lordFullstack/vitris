import { notFound, redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/data/supabase/server-client";
import { getCategories } from "@/lib/data/supabase/explore";
import { isInvalidIdError } from "@/lib/data/supabase/errors";
import { updateProduct } from "../../product-actions";
import { ProductForm } from "../../ProductForm";

export const dynamic = "force-dynamic";

export default async function EditarProductoPage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/comercio/login");

  const { data: product, error } = await supabase
    .from("products")
    .select("id,name,description,price,category_id,availability,published,images")
    .eq("id", params.id)
    .maybeSingle();

  if (error) {
    if (isInvalidIdError(error)) notFound();
    throw error;
  }
  if (!product) notFound();

  const categories = await getCategories();
  const boundUpdate = updateProduct.bind(null, product.id);

  return (
    <div>
      <h1 className="font-display text-[18px] font-semibold text-ink">Editar producto</h1>
      <div className="mt-5">
        <ProductForm
          categories={categories}
          action={boundUpdate}
          initial={{
            name: product.name,
            description: product.description ?? "",
            price: product.price,
            category_id: product.category_id,
            availability: product.availability,
            published: product.published,
            images: product.images,
          }}
        />
      </div>
    </div>
  );
}
