import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { NearbyView } from "@/components/explore/NearbyView";
import { storeRepo } from "@/lib/data";

export default async function CercaDeMiPage() {
  const stores = await storeRepo.list();

  return (
    <div className="flex min-h-dvh flex-col bg-void">
      <ScreenHeader title="Cerca de mí" backHref="/explorar" />
      <NearbyView stores={stores} />
    </div>
  );
}
