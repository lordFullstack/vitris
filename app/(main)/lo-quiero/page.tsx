import { TopBar } from "@/components/shell/TopBar";
import { SavedListView } from "@/components/saved/SavedListView";
import { ShareButton } from "@/components/ui/ShareButton";
import { productRepo } from "@/lib/data";

// Datos reales que cambian con cada producto publicado — nunca estático.
export const dynamic = "force-dynamic";

export default async function LoQuieroPage() {
  const products = await productRepo.list();

  return (
    <>
      <TopBar title="Lo quiero" actions={<ShareButton title="Mi lista Lo quiero" />} />
      <SavedListView products={products} />
    </>
  );
}
