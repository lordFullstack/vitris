"use client";

import { useEffect } from "react";

const SESSION_KEY = "vitris:ref";

/**
 * Captura ?ref=userId de la URL actual y lo guarda en sessionStorage.
 * No hace nada más con el valor todavía — el consumo llega en el LOOP 11.
 */
export function useCaptureRef() {
  useEffect(() => {
    try {
      const ref = new URLSearchParams(window.location.search).get("ref");
      if (ref) window.sessionStorage.setItem(SESSION_KEY, ref);
    } catch {
      // sessionStorage no disponible — no bloqueamos la UI por esto
    }
  }, []);
}
