import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { ComingSoon } from "@/components/ui/ComingSoon";

export default function AjustesPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-void">
      <ScreenHeader title="Más" backHref="/perfil" />
      <ComingSoon
        title="Ajustes de tu cuenta"
        description="Preferencias, privacidad y notificaciones vivirán aquí cuando exista autenticación real."
      />
    </div>
  );
}
