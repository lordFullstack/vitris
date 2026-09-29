"use client";

import { useState } from "react";
import type { Category } from "@/lib/types";
import { PRODUCT_DESCRIPTION_MAX, PRODUCT_IMAGES_MAX, PRODUCT_NAME_MAX } from "@/lib/merchant-limits";

export function ProductForm({
  categories,
  action,
  initial,
}: {
  categories: Category[];
  action: (formData: FormData) => Promise<{ error?: string } | void>;
  initial?: {
    name: string;
    description: string;
    price: number;
    category_id: string | null;
    availability: string;
    published: boolean;
    images: string[];
  };
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keptImages, setKeptImages] = useState<string[]>(initial?.images ?? []);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  const totalCount = keptImages.length + newPreviews.length;

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    const result = await action(formData);
    setPending(false);
    if (result?.error) setError(result.error);
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className="block text-[12.5px] font-semibold text-ink-soft">
          Fotos ({totalCount}/{PRODUCT_IMAGES_MAX})
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {keptImages.map((url) => (
            <div key={url} className="relative h-16 w-16">
              <img src={url} alt="" className="h-full w-full rounded-xl object-cover" />
              <input type="hidden" name="keptImages" value={url} />
              <button
                type="button"
                onClick={() => setKeptImages((prev) => prev.filter((u) => u !== url))}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-pill bg-void text-[11px] text-ink"
              >
                ×
              </button>
            </div>
          ))}
          {newPreviews.map((url, i) => (
            <img key={i} src={url} alt="" className="h-16 w-16 rounded-xl object-cover" />
          ))}
        </div>
        {totalCount < PRODUCT_IMAGES_MAX && (
          <input
            type="file"
            name="images"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []).slice(0, PRODUCT_IMAGES_MAX - totalCount);
              setNewPreviews(files.map((f) => URL.createObjectURL(f)));
            }}
            className="mt-2 text-[13px] text-ink-soft"
          />
        )}
      </div>

      <div>
        <label className="block text-[12.5px] font-semibold text-ink-soft">Nombre</label>
        <input
          name="name"
          required
          maxLength={PRODUCT_NAME_MAX}
          defaultValue={initial?.name}
          className="mt-1.5 h-11 w-full rounded-2xl border border-graphite-line bg-graphite px-4 text-[14px] text-ink outline-none"
        />
      </div>

      <div>
        <label className="block text-[12.5px] font-semibold text-ink-soft">Descripción</label>
        <textarea
          name="description"
          rows={3}
          maxLength={PRODUCT_DESCRIPTION_MAX}
          defaultValue={initial?.description}
          className="mt-1.5 w-full rounded-2xl border border-graphite-line bg-graphite px-4 py-2.5 text-[14px] text-ink outline-none"
        />
      </div>

      <div>
        <label className="block text-[12.5px] font-semibold text-ink-soft">Precio (COP)</label>
        <input
          name="price"
          type="number"
          required
          min={100}
          step={1}
          defaultValue={initial?.price}
          className="mt-1.5 h-11 w-full rounded-2xl border border-graphite-line bg-graphite px-4 text-[14px] text-ink outline-none"
        />
      </div>

      <div>
        <label className="block text-[12.5px] font-semibold text-ink-soft">Categoría</label>
        <select
          name="category_id"
          defaultValue={initial?.category_id ?? ""}
          className="mt-1.5 h-11 w-full rounded-2xl border border-graphite-line bg-graphite px-4 text-[14px] text-ink outline-none"
        >
          <option value="">Sin categoría</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[12.5px] font-semibold text-ink-soft">Disponibilidad</label>
        <select
          name="availability"
          defaultValue={initial?.availability ?? "in_stock"}
          className="mt-1.5 h-11 w-full rounded-2xl border border-graphite-line bg-graphite px-4 text-[14px] text-ink outline-none"
        >
          <option value="in_stock">Disponible</option>
          <option value="low_stock">Poco stock</option>
          <option value="out_of_stock">Agotado</option>
        </select>
      </div>

      <label className="flex items-center gap-2 text-[13.5px] text-ink">
        <input
          type="checkbox"
          name="published"
          defaultChecked={initial?.published ?? true}
          className="h-4 w-4 accent-orbital"
        />
        Publicado (visible al público)
      </label>

      {error && <p className="text-[13px] text-signal-danger">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="flex h-11 items-center justify-center rounded-pill bg-orbital text-[14px] font-semibold text-ink transition-transform active:scale-[0.98] disabled:opacity-60"
      >
        {pending ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
