import Link from "next/link";
import { productRepo } from "@/lib/data";
import { ProductDetailView } from "@/components/product/ProductDetailView";

export default async function ProductoPage({ params }: { params: { id: string } }) {
  const detail = await productRepo.getById(params.id);

  if (!detail) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-void px-8 text-center">
        <p className="text-[15px] text-ink-soft">
          No encontramos este producto (ref. {params.id}).
        </p>
        <Link href="/feed" className="text-[14px] font-semibold text-orbital-soft">
          Volver al feed
        </Link>
      </div>
    );
  }

  return <ProductDetailView detail={detail} />;
}
