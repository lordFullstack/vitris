import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { ComingSoon } from "@/components/ui/ComingSoon";

export default function NotificacionesPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-void">
      <ScreenHeader title="Notificaciones" />
      <ComingSoon
        title="Novedades sin ruido"
        description="Alertas de precio, stock y respuestas de tiendas, sin saturarte. Se activa junto con Lo quiero y Chat."
      />
    </div>
  );
}
