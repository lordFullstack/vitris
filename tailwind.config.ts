import type { Config } from "tailwindcss";

// Design System V1 — Social Commerce
// Dirección: Dark / premium / táctil. Soft Tech + Orbital.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#08080C", // fondo base de la app
          soft: "#0C0C12",
        },
        graphite: {
          DEFAULT: "#131318", // superficie de cards
          elevated: "#1C1C24", // bottom sheets, modales, nav
          line: "#26262F", // bordes hairline
        },
        orbital: {
          DEFAULT: "#7C5CFF", // acento primario
          soft: "#B9A6FF", // glow / hover
          dim: "#241B3D", // fondos tintados sutiles, pressed
        },
        whats: {
          DEFAULT: "#25D366", // exclusivo para WhatsApp / disponibilidad
          dim: "#123321",
        },
        ink: {
          DEFAULT: "#F2F1F7", // texto primario
          soft: "#8E8E9C", // texto secundario
          faint: "#5C5C68", // texto terciario / disabled
        },
        signal: {
          danger: "#FF5470",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        card: "20px",
        sheet: "28px",
        pill: "999px",
      },
      boxShadow: {
        orbital: "0 0 0 1px rgba(124,92,255,0.35), 0 8px 24px -8px rgba(124,92,255,0.45)",
        soft: "0 12px 32px -16px rgba(0,0,0,0.6)",
      },
      keyframes: {
        pulseOrbit: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.9" },
          "50%": { transform: "scale(1.4)", opacity: "0.35" },
        },
      },
      animation: {
        "pulse-orbit": "pulseOrbit 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
