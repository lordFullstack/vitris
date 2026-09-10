import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { ComingSoon } from "@/components/ui/ComingSoon";

export default function CercaDeMiPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-void">
      <ScreenHeader title="Cerca de mí" backHref="/explorar" />
      <ComingSoon
        title="Tiendas a tu alrededor"
        description="Cuando actives tu ubicación, aquí vas a ver tiendas y productos cercanos. Todavía no usamos tu ubicación real."
      />
    </div>
  );
}
