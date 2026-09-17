# VITRIS

"No vienes a buscar. Vienes a vitrinear."

Código implementado hasta el LOOP 06. Arquitectura y producto definidos hasta el LOOP 09.

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

**Refactor de ergonomía:** acciones de alta frecuencia en riel vertical derecho
(zona de pulgar). "Volver" arriba-izquierda por convención universal.

### LOOP 04 — Lo quiero / Guardados
Guardado real vía `lib/saved-context.tsx` (Context + localStorage interino).
Tabs, listas personalizadas, comparación.

### LOOP 05 — Chat / Preguntar
Lista de conversaciones + hilo con contexto de producto, preguntas rápidas,
hand-off a WhatsApp con el mensaje armado.

### LOOP 06 — Explorar / Categorías / Cerca de mí / Búsqueda
- `lib/explore-data.ts` — 8 categorías visuales, "Nuevos" y "Tendencias" (curados
  a mano, sin motor de recomendación real — eso es explícitamente fuera de alcance)
- `components/explore/CategoryRow.tsx` — tiles con foto + label, no menú administrativo
- `components/explore/PlaceholderSection.tsx` — "Para ti" queda como placeholder
  elegante, tal como lo permite el LOOP (no hay motor todavía)
- `components/explore/SearchView.tsx` — búsqueda real del lado del cliente sobre
  productos y tiendas (por nombre/categoría), con categorías y búsquedas
  populares como punto de partida cuando el campo está vacío
- `components/explore/NearbyView.tsx` — usa la **Geolocation API real** del
  navegador (permiso real, sin auto-solicitar al cargar). Como todavía no hay
  tiendas con coordenadas reales en el backend, si el permiso se concede
  mostramos las tiendas mock ordenadas por la distancia de ejemplo que ya
  existía, con un aviso explícito de que son datos de ejemplo — evitamos
  fingir ubicación real, tal como pide el LOOP
- `/explorar`, `/buscar`, `/cerca-de-mi` reemplazan sus placeholders "Pronto"

## Estructura
- `app/(main)/` — feed, explorar, lo-quiero, chat, perfil (con bottom nav)
- `app/producto/[id]`, `app/tienda/[id]` — Product Detail y Store Profile
- `app/cerca-de-mi`, `app/buscar` — reales (LOOP 06)
- `app/notificaciones`, `app/ajustes` — siguen en "Pronto" (no forman parte
  de ningún LOOP aprobado todavía)
- `components/feed/`, `components/product/`, `components/store/`, `components/saved/`, `components/chat/`, `components/explore/`
- `lib/` — types.ts, mock-data.ts, product-detail.ts, store-detail.ts, chat-data.ts,
  explore-data.ts, whatsapp.ts, saved-context.tsx, format.ts

## Pendiente (fuera de alcance del paquete actual)
- Conexión a Supabase (reemplaza todos los mocks y localStorage)
- Analytics (PostHog)
- Motor de recomendaciones real ("Tendencias"/"Para ti")
- Tiendas con coordenadas reales para "Cerca de mí"
- Filtros avanzados de búsqueda (precio, disponibilidad, etc.)
- Notificaciones, Ajustes/Más — pantallas placeholder no cubiertas por ningún LOOP
