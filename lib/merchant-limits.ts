// Límites del panel de comercio (LOOP 10B). Valores propuestos como default
// razonable (D-10-05) mientras Jorge no defina otros — no vienen de ninguna
// fuente externa, así que si hace falta ajustarlos es solo cambiar acá.
export const PRODUCT_NAME_MIN = 3;
export const PRODUCT_NAME_MAX = 60;
export const PRODUCT_DESCRIPTION_MAX = 500;
export const PRODUCT_PRICE_MIN = 100;
export const PRODUCT_PRICE_MAX = 50_000_000;
export const PRODUCT_IMAGES_MAX = 5;

export const STORE_NAME_MIN = 3;
export const STORE_NAME_MAX = 60;
export const STORE_BIO_MAX = 300;
export const STORE_ADDRESS_MAX = 120;
export const STORE_HOURS_MAX = 120;
export const STORE_POLICIES_MAX = 500;

// D-10-06: sin compresión — solo límite de peso y mensaje claro.
export const IMAGE_MAX_BYTES = 5 * 1024 * 1024;
export const IMAGE_ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
