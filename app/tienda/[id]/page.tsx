import Link from "next/link";
import { storeDetails, getStoreProducts, getStoreNovedades } from "@/lib/store-detail";
import { StoreHeader } from "@/components/store/StoreHeader";
import { StoreTabs } from "@/components/store/StoreTabs";

export default function TiendaPage({ params }: { params: { id: string } }) {
  const store = storeDetails[params.id];

  if (!store) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-void px-8 text-center">
        <p className="text-[15px] text-ink-soft">
          No encontramos esta tienda (ref. {params.id}).
        </p>
        <Link href="/feed" className="text-[14px] font-semibold text-orbital-soft">
          Volver al feed
        </Link>
      </div>
    );
  }

  const products = getStoreProducts(store.id);
  const novedades = getStoreNovedades(store.id);

  return (
    <div className="min-h-dvh bg-void pb-6">
      <StoreHeader store={store} />
      <StoreTabs store={store} products={products} novedades={novedades} />
    </div>
  );
}
