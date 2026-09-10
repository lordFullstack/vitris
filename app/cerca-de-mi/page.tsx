import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { NearbyView } from "@/components/explore/NearbyView";

export default function CercaDeMiPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-void">
      <ScreenHeader title="Cerca de mí" backHref="/explorar" />
      <NearbyView />
    </div>
  );
}
