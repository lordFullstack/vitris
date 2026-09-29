/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Fotos reales de tienda/producto (Storage de Supabase).
      { protocol: "https", hostname: "aqtvqnametpjejwslzha.supabase.co", pathname: "/storage/v1/object/public/**" },
      // Datos mock que siguen usándose mientras no hay fotos reales cargadas.
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
};

module.exports = nextConfig;
