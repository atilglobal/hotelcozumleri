/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/urunler", destination: "/tedarik", permanent: true },
      { source: "/urunler/:slug", destination: "/tedarik", permanent: true },
      { source: "/sepet", destination: "/tedarik", permanent: true },
      { source: "/teklif-sepeti", destination: "/tedarik", permanent: true },
      { source: "/kategori/:slug", destination: "/tedarik", permanent: true },
      { source: "/odeme", destination: "/teklif-al", permanent: true },
      { source: "/odeme/:path*", destination: "/teklif-al", permanent: true },
      {
        source: "/cozumler/sarf-malzemeleri",
        destination: "/cozumler/sarf-temizlik",
        permanent: true,
      },
      {
        source: "/mesafeli-satis",
        destination: "/mesafeli-satis-sozlesmesi",
        permanent: true,
      },
      {
        source: "/iade-ve-iptal",
        destination: "/iade-ve-iptal-politikasi",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      ...(process.env.NODE_ENV === "production"
        ? [{
            source: "/(.*)",
            headers: [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }],
          }]
        : []),
    ];
  },
};

export default nextConfig;
