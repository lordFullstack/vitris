import { TopBar, TopBarAction } from "@/components/shell/TopBar";
import { IconSearch, IconMapPin } from "@/components/icons";
import { CategoryRow } from "@/components/explore/CategoryRow";
import { PlaceholderSection } from "@/components/explore/PlaceholderSection";
import { SimilarRow } from "@/components/product/SimilarRow";
import { categories, getNewArrivals, getTrending } from "@/lib/data";

export default async function ExplorarPage() {
  const [newArrivals, trending] = await Promise.all([getNewArrivals(), getTrending()]);

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

      <div className="flex flex-col gap-6 pb-4">
        <CategoryRow categories={categories} />

        <div className="px-4">
          <SimilarRow
            title="Nuevos"
            items={newArrivals.map((p) => ({
              id: p.id,
              name: p.name,
              price: p.price,
              currency: p.currency,
              image: p.images[0],
            }))}
          />
        </div>

        <div className="px-4">
          <SimilarRow
            title="Tendencias"
            items={trending.map((p) => ({
              id: p.id,
              name: p.name,
              price: p.price,
              currency: p.currency,
              image: p.images[0],
            }))}
          />
        </div>

        <PlaceholderSection
          title="Para ti"
          description="Todavía no tenemos un motor de recomendaciones — esto llega cuando haya suficiente actividad real en la plataforma."
        />
      </div>
    </>
  );
}
