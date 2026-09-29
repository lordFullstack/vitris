"use client";

import { useState } from "react";
import Link from "next/link";
import {
  STORE_ADDRESS_MAX,
  STORE_BIO_MAX,
  STORE_HOURS_MAX,
  STORE_NAME_MAX,
  STORE_NAME_MIN,
  STORE_POLICIES_MAX,
} from "@/lib/merchant-limits";

type StoreFormData = {
  id: string;
  name: string;
  bio: string | null;
  address: string | null;
  hours: string | null;
  policies: string | null;
  tags: string[];
  whatsapp_number: string;
  avatar_url: string | null;
  cover_image: string | null;
  published: boolean;
};

export function StoreForm({
  store,
  action,
}: {
  store: StoreFormData;
  action: (formData: FormData) => Promise<{ error?: string; ok?: boolean }>;
}) {
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(store.avatar_url);
  const [coverPreview, setCoverPreview] = useState(store.cover_image);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setFeedback(null);
    const result = await action(formData);
    setPending(false);
    setFeedback(
      result.error ? { type: "error", text: result.error } : { type: "ok", text: "Guardado." }
    );
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      <Link
        href={`/tienda/${store.id}`}
        className="self-start rounded-pill border border-graphite-line px-4 py-2 text-[13px] font-semibold text-ink transition-colors active:bg-graphite-elevated"
      >
        Ver mi tienda pública
      </Link>

      <div>
        <label className="block text-[12.5px] font-semibold text-ink-soft">Portada</label>
        {coverPreview && (
          <img src={coverPreview} alt="" className="mt-2 h-28 w-full rounded-2xl object-cover" />
        )}
        <input
          type="file"
          name="cover"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setCoverPreview(URL.createObjectURL(f));
          }}
          className="mt-2 text-[13px] text-ink-soft"
        />
      </div>

      <div>
        <label className="block text-[12.5px] font-semibold text-ink-soft">Foto de perfil</label>
        {avatarPreview && (
          <img
            src={avatarPreview}
            alt=""
            className="mt-2 h-20 w-20 rounded-pill border-2 border-orbital object-cover"
          />
        )}
        <input
          type="file"
          name="avatar"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setAvatarPreview(URL.createObjectURL(f));
          }}
          className="mt-2 text-[13px] text-ink-soft"
        />
      </div>

      <Field
        label="Nombre"
        name="name"
        defaultValue={store.name}
        maxLength={STORE_NAME_MAX}
        minLength={STORE_NAME_MIN}
        required
      />
      <TextArea label="Descripción" name="bio" defaultValue={store.bio ?? ""} maxLength={STORE_BIO_MAX} />
      <Field
        label="Ubicación (texto)"
        name="address"
        defaultValue={store.address ?? ""}
        maxLength={STORE_ADDRESS_MAX}
      />
      <Field label="Horario" name="hours" defaultValue={store.hours ?? ""} maxLength={STORE_HOURS_MAX} />
      <TextArea
        label="Políticas (cambios, devoluciones)"
        name="policies"
        defaultValue={store.policies ?? ""}
        maxLength={STORE_POLICIES_MAX}
      />
      <Field
        label="Etiquetas (separadas por coma)"
        name="tags"
        defaultValue={store.tags.join(", ")}
      />
      <Field
        label="WhatsApp (formato internacional, ej: 573001234567)"
        name="whatsapp_number"
        defaultValue={store.whatsapp_number}
        pattern="[0-9]{10,15}"
        required
      />

      <label className="flex items-center gap-2 text-[13.5px] text-ink">
        <input
          type="checkbox"
          name="published"
          defaultChecked={store.published}
          className="h-4 w-4 accent-orbital"
        />
        Tienda visible al público
      </label>

      {feedback && (
        <p className={`text-[13px] ${feedback.type === "error" ? "text-signal-danger" : "text-ink-soft"}`}>
          {feedback.text}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex h-11 items-center justify-center rounded-pill bg-orbital text-[14px] font-semibold text-ink transition-transform active:scale-[0.98] disabled:opacity-60"
      >
        {pending ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  ...rest
}: { label: string; name: string; defaultValue: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-[12.5px] font-semibold text-ink-soft">{label}</label>
      <input
        name={name}
        defaultValue={defaultValue}
        {...rest}
        className="mt-1.5 h-11 w-full rounded-2xl border border-graphite-line bg-graphite px-4 text-[14px] text-ink outline-none placeholder:text-ink-faint"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  maxLength,
}: {
  label: string;
  name: string;
  defaultValue: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="block text-[12.5px] font-semibold text-ink-soft">{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        maxLength={maxLength}
        rows={3}
        className="mt-1.5 w-full rounded-2xl border border-graphite-line bg-graphite px-4 py-2.5 text-[14px] text-ink outline-none placeholder:text-ink-faint"
      />
    </div>
  );
}
