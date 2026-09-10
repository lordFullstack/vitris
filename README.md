# Social Commerce — LOOP 00 a 05

"No vienes a buscar. Vienes a vitrinear."

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre http://localhost:3000 (redirige a /feed).

## Qué incluye

### LOOP 00 — Esqueleto
App Shell dark, Bottom Navigation flotante, rutas placeholder "Pronto", iconos propios, manifest PWA.

### LOOP 01 — Inicio / Feed
Feed vertical con Product Cards y Social Cards, mocks tipados, galería con scroll-snap.

### LOOP 02 — Product Detail
Hero gallery, variantes dinámicas, Bottom Sheet de detalle, fila de confianza, "Más de esta tienda".

### LOOP 03 — Store Profile
Portada + avatar, bio, tags, tabs Productos/Novedades/Colecciones/Info.

**Refactor de ergonomía (post-LOOP 03):** acciones de alta frecuencia (guardar,
preguntar, compartir, me gusta) viven en un riel vertical en el borde derecho de
las imágenes — zona de mayor alcance del pulgar. "Volver" se queda arriba-izquierda
por convención universal.

### LOOP 04 — Lo quiero / Guardados
`lib/saved-context.tsx` — guardado real (Context + localStorage interino).
Tabs Todos/Lo necesito/Diciembre/Verano/Comparar/Esperando stock, listas
personalizadas, comparación de 2+ productos.

### LOOP 05 — Chat / Preguntar
- `lib/chat-data.ts` — conversaciones mock (activa/respondida/archivada) y las
  7 preguntas rápidas exactas del LOOP
- `components/chat/ConversationList.tsx` — lista con tabs por estado
- `components/chat/ChatThread.tsx` — hilo de conversación:
  - Header con tienda y estado
  - Tarjeta de contexto del producto cuando la conversación nace desde uno
    (toca "Preguntar" en un producto)
  - Mensajes (burbujas), preguntas rápidas tocables, input de texto libre
  - CTA "Continuar por WhatsApp" que arma el mensaje con producto, referencia
    y la última pregunta — el mismo patrón de `buildWhatsAppLink` ya usado
    en Product Detail
- `/chat` decide entre lista o hilo según query params:
  `?conv=id` (conversación existente), `?producto=id` (nueva, con contexto de
  producto — así llega desde el riel de pulgar y desde Product Detail),
  `?tienda=id` (nueva o existente, así llega desde Store Profile)

**No implementado (según el LOOP):** chat con IA autónoma, pagos, checkout,
backend conversacional real (los mensajes enviados en el hilo son locales,
no persisten al recargar).

## Estructura
- `app/(main)/` — feed, explorar, lo-quiero, chat, perfil (con bottom nav)
- `app/producto/[id]`, `app/tienda/[id]` — Product Detail y Store Profile reales
- `app/cerca-de-mi`, `app/buscar`, `app/notificaciones`, `app/ajustes` — "Pronto"
- `components/feed/`, `components/product/`, `components/store/`, `components/saved/`, `components/chat/`
- `components/ui/` — SaveButton, LikeButton, ShareButton, QuickQuestion, WhatsAppButton, BottomSheet, ComingSoon, ScreenHeader
- `lib/` — types.ts, mock-data.ts, product-detail.ts, store-detail.ts, chat-data.ts,
  whatsapp.ts, saved-context.tsx, format.ts

## Pendiente
- LOOP 06 — Explorar / Categorías / Cerca de mí / Búsqueda
- Conexión a Supabase (reemplaza mocks y localStorage)
- Analytics (PostHog)
- Alertas reales de precio/stock, notificaciones push
