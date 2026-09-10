import type { ProductDetail } from "@/lib/types";
import type { SavedEntry } from "@/lib/saved-context";
import { formatPrice } from "@/lib/whatsapp";

export function CompareView({
  items,
  selected,
  onToggle,
}: {
  items: { entry: SavedEntry; product: ProductDetail }[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const selectedProducts = items.filter((x) => selected.includes(x.entry.productId));

  return (
    <div className="px-4 py-3">
      <p className="mb-3 text-[13px] text-ink-faint">
        Elige 2 o más productos guardados para comparar precio y tienda.
      </p>
      <div className="flex flex-col gap-2">
        {items.map(({ entry, product }) => {
          const checked = selected.includes(entry.productId);
          return (
            <button
              key={entry.productId}
              onClick={() => onToggle(entry.productId)}
              className={`flex items-center gap-3 rounded-card border px-3 py-2.5 text-left transition-colors ${
                checked ? "border-orbital bg-orbital-dim" : "border-graphite-line bg-graphite"
              }`}
            >
              <img src={product.images[0]} alt="" className="h-12 w-12 rounded-card object-cover" />
              <span className="flex-1 text-[13.5px] text-ink">{product.name}</span>
              <span
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-pill border text-[11px] ${
                  checked
                    ? "border-orbital bg-orbital text-void"
                    : "border-graphite-line text-transparent"
                }`}
              >
                ✓
              </span>
            </button>
          );
        })}
      </div>

      {selectedProducts.length >= 2 && (
        <div className="mt-4 overflow-hidden rounded-card border border-graphite-line">
          <table className="w-full text-left text-[12.5px]">
            <thead>
              <tr className="bg-graphite text-ink-faint">
                <th className="px-3 py-2 font-medium">Producto</th>
                <th className="px-3 py-2 font-medium">Precio</th>
                <th className="px-3 py-2 font-medium">Tienda</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map(({ product }) => (
                <tr key={product.id} className="border-t border-graphite-line/60">
                  <td className="px-3 py-2 text-ink">{product.name}</td>
                  <td className="px-3 py-2 text-ink">
                    {formatPrice(product.price, product.currency)}
                  </td>
                  <td className="px-3 py-2 text-ink-soft">{product.store.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
