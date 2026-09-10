import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { SearchView } from "@/components/explore/SearchView";

export default function BuscarPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-void">
      <ScreenHeader title="Buscar" />
      <SearchView initialQuery={searchParams.q ?? ""} />
    </div>
  );
}
