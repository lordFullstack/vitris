import { TopBar, TopBarAction } from "@/components/shell/TopBar";
import { FeedList } from "@/components/feed/FeedList";
import { IconSearch, IconBell, IconChat } from "@/components/icons";

export default function FeedPage() {
  return (
    <>
      <TopBar
        title="Inicio"
        actions={
          <>
            <TopBarAction href="/buscar" label="Buscar">
              <IconSearch size={22} />
            </TopBarAction>
            <TopBarAction href="/chat" label="Preguntas">
              <IconChat size={22} />
            </TopBarAction>
            <TopBarAction href="/notificaciones" label="Notificaciones">
              <IconBell size={22} />
            </TopBarAction>
          </>
        }
      />
      <FeedList />
    </>
  );
}
