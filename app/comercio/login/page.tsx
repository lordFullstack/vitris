"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/data/supabase/browser-client";

export default function ComercioLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createBrowserSupabaseClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(
        signInError.message === "Invalid login credentials"
          ? "Correo o contraseña incorrectos."
          : `No se pudo iniciar sesión (${signInError.message}). Avisá a VITRIS.`
      );
      return;
    }

    router.push("/comercio");
    router.refresh();
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-void px-6">
      <div className="w-full max-w-[360px]">
        <h1 className="font-display text-[22px] font-semibold text-ink">
          Ingresá a tu tienda
        </h1>
        <p className="mt-1 text-[14px] text-ink-soft">
          Con el correo y la contraseña que te dieron al darte de alta en VITRIS.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-pill border border-graphite-line bg-graphite px-4 text-[14px] text-ink outline-none placeholder:text-ink-faint"
          />
          <input
            type="password"
            required
            autoComplete="current-password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 rounded-pill border border-graphite-line bg-graphite px-4 text-[14px] text-ink outline-none placeholder:text-ink-faint"
          />

          {error && <p className="text-[13px] text-signal-danger">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 flex h-11 items-center justify-center rounded-pill bg-orbital text-[14px] font-semibold text-ink transition-transform active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="mt-4 text-[12.5px] text-ink-faint">
          ¿Todavía no tenés cuenta de comercio? Se crea de forma asistida — hablá con
          VITRIS.
        </p>
      </div>
    </div>
  );
}
