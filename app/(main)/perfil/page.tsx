import { TopBar, TopBarAction } from "@/components/shell/TopBar";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { IconMore } from "@/components/icons";

export default function PerfilPage() {
  return (
    <>
      <TopBar
        title="Perfil"
        actions={
          <TopBarAction href="/ajustes" label="Más opciones">
            <IconMore size={22} />
          </TopBarAction>
        }
      />
      <ComingSoon
        title="Tu perfil"
        description="Tus datos, tus tiendas favoritas y el historial de lo que has vitrineado. Se construye junto con el resto de la experiencia social."
      />
    </>
  );
}
