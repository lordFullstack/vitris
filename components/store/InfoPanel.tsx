import type { StoreDetail } from "@/lib/types";
import { IconMapPin } from "@/components/icons";

export function InfoPanel({ store }: { store: StoreDetail }) {
  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      {store.address && (
        <div className="flex items-start gap-3">
          <IconMapPin size={20} className="mt-0.5 shrink-0 text-ink-soft" />
          <div>
            <p className="text-[13px] font-medium text-ink">Ubicación</p>
            <p className="text-[13.5px] text-ink-soft">{store.address}</p>
          </div>
        </div>
      )}
      {store.hours && (
        <div>
          <p className="text-[13px] font-medium text-ink">Horario</p>
          <p className="text-[13.5px] text-ink-soft">{store.hours}</p>
        </div>
      )}
      {store.policies && (
        <div>
          <p className="text-[13px] font-medium text-ink">Cambios y garantía</p>
          <p className="text-[13.5px] leading-relaxed text-ink-soft">{store.policies}</p>
        </div>
      )}
      {!store.address && !store.hours && !store.policies && (
        <p className="text-[13.5px] text-ink-faint">
          Esta tienda todavía no completa su información.
        </p>
      )}
    </div>
  );
}
