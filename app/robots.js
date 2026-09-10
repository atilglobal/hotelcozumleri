import { siteConfig } from "@/config/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/api/", "/api", "/hesabim", "/hesabim/", "/odeme", "/odeme/", "/sepet", "/giris", "/kayit", "/sifremi-unuttum"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
