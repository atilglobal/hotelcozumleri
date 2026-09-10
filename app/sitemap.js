import { siteConfig } from "@/config/site";
import { mainNavigation, footerSolutions, footerTedarik, footerCorporate, footerLegal } from "@/config/navigation";
import { serviceSlugs } from "@/config/services";
import { hotelioModules } from "@/config/hotelio";
import { getAllPublishedSlugs } from "@/lib/blog";

const EXCLUDED = new Set([
  "/sepet", "/teklif-sepeti", "/odeme", "/giris", "/kayit", "/sifremi-unuttum",
  "/hesabim", "/admin", "/urunler",
]);

export default async function sitemap() {
  const serviceRoutes = serviceSlugs.map((slug) => `/cozumler/${slug}`);
  const hotelioModuleRoutes = hotelioModules.map((m) => `/hotelio/moduller/${m.slug}`);
  const blogSlugs = await getAllPublishedSlugs();
  const blogRoutes = blogSlugs.map((slug) => `/blog/${slug}`);

  const staticRoutes = [
    "/",
    ...mainNavigation.map((item) => item.href),
    ...footerSolutions.map((item) => item.href),
    ...footerTedarik.map((item) => item.href),
    ...footerCorporate.map((item) => item.href),
    ...footerLegal.map((item) => item.href),
    ...serviceRoutes,
    "/hotelio/moduller",
    ...hotelioModuleRoutes,
    "/teklif-al",
    "/hotelio-demo",
    "/tedarik",
    "/blog",
    "/kullanim-kosullari",
    ...blogRoutes,
  ];

  const uniqueRoutes = [...new Set(staticRoutes)].filter((route) => !EXCLUDED.has(route));

  return uniqueRoutes.map((route) => ({
    url: `${siteConfig.url}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : route.startsWith("/blog") ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/cozumler") || route === "/tedarik" ? 0.85 : route.startsWith("/blog") ? 0.7 : 0.6,
  }));
}
