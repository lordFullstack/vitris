// Copy editorial, sin dependencia de ningún repo. Vive en su propio archivo
// (no en lib/data/index.ts) a propósito: ChatThread.tsx es un client
// component y solo necesita esto — si lo importara del barril lib/data,
// webpack empaquetaría también @supabase/supabase-js y los repos enteros
// en el bundle del cliente (~68kB extra para una lista de 7 strings).
export const quickQuestions = [
  "¿Tienen mi talla?",
  "¿Está disponible?",
  "¿Qué colores tienen?",
  "¿Hacen envíos?",
  "¿Dónde están?",
  "¿Es original?",
  "¿Cuánto demora?",
];
