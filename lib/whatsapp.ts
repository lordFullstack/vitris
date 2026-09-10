import type { Product, Store } from "./types";

export function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function buildStoreWhatsAppLink(store: Store) {
  const message = `Hola ${store.name}, te escribo desde Social Commerce, ¿me puedes ayudar con una pregunta?`;
  return `https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildChatWhatsAppLink(
  store: Store,
  questionText: string,
  product?: Product
) {
  const base = product
    ? `Hola ${store.name}, tengo una pregunta sobre "${product.name}" (ref. ${product.id})`
    : `Hola ${store.name}`;
  const message = questionText ? `${base}: ${questionText}` : `${base}, ¿me puedes ayudar?`;
  return `https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppLink(
  store: Store,
  product: Product,
  selectedVariants?: Record<string, string>
) {
  const variantText =
    selectedVariants && Object.keys(selectedVariants).length > 0
      ? ` (${Object.values(selectedVariants).join(", ")})`
      : "";
  const message = `Hola ${store.name}, vi "${product.name}"${variantText} (ref. ${product.id}) en Social Commerce y quiero preguntar por disponibilidad.`;
  return `https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
