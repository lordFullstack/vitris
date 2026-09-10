import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { ComingSoon } from "@/components/ui/ComingSoon";

export default function BuscarPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-void">
      <ScreenHeader title="Buscar" />
      <ComingSoon
        title="Busca productos, tiendas y categorías"
        description="La búsqueda completa con filtros llega en el LOOP 06, junto con Explorar."
      />
    </div>
  );
}
