import Link from "next/link";
import { storeRepo, productRepo } from "@/lib/data";
import { feedItems } from "@/lib/mock-data";
import { StoreHeader } from "@/components/store/StoreHeader";
import { StoreTabs } from "@/components/store/StoreTabs";

export default async function TiendaPage({ params }: { params: { id: string } }) {
  const store = await storeRepo.getById(params.id);

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

  const products = await productRepo.listByStore(store.id);
  // Novedades sigue filtrando el feed mock directo hasta el Paso 2, que
  // mueve feedItems detrás de FeedRepo y esto pasa a feedRepo.list(...).
  const novedades = feedItems.filter(
    (f) => f.store.id === store.id && f.type === "INSPIRATIONAL_POST"
  );

  return (
    <div className="min-h-dvh bg-void pb-6">
      <StoreHeader store={store} />
      <StoreTabs store={store} products={products} novedades={novedades} />
    </div>
  );
}
