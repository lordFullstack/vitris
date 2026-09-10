import { TopBar, TopBarAction } from "@/components/shell/TopBar";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { IconSearch, IconMapPin } from "@/components/icons";

export default function ExplorarPage() {
  return (
    <>
      <TopBar
        title="Explorar"
        actions={
          <>
            <TopBarAction href="/cerca-de-mi" label="Cerca de mí">
              <IconMapPin size={22} />
            </TopBarAction>
            <TopBarAction href="/buscar" label="Buscar">
              <IconSearch size={22} />
            </TopBarAction>
          </>
        }
      />
      <ComingSoon
        title="A ver qué hay"
        description="Categorías visuales, tendencias, novedades y tiendas cerca de ti. Este espacio se construye en el LOOP 06."
      />
    </>
  );
}
