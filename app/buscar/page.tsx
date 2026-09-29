import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { SearchView } from "@/components/explore/SearchView";
import { productRepo, storeRepo, getCategories, popularSearches } from "@/lib/data";

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const [products, stores, categories] = await Promise.all([
    productRepo.list(),
    storeRepo.list(),
    getCategories(),
  ]);

  return (
    <div className="flex min-h-dvh flex-col bg-void">
      <ScreenHeader title="Buscar" />
      <SearchView
        initialQuery={searchParams.q ?? ""}
        products={products}
        stores={stores}
        categories={categories}
        popularSearches={popularSearches}
      />
    </div>
  );
}
