import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { SearchView } from "@/components/explore/SearchView";
import { productRepo, storeRepo } from "@/lib/data";

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const [products, stores] = await Promise.all([productRepo.list(), storeRepo.list()]);

  return (
    <div className="flex min-h-dvh flex-col bg-void">
      <ScreenHeader title="Buscar" />
      <SearchView initialQuery={searchParams.q ?? ""} products={products} stores={stores} />
    </div>
  );
}
