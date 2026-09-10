import { siteConfig } from "@/config/site";
import { mainNavigation, footerSolutions, footerCorporate, footerLegal } from "@/config/navigation";
import { serviceSlugs } from "@/config/services";
import { hotelioModules } from "@/config/hotelio";
import { getAllProductSlugs, getCategories } from "@/lib/catalog";
import { getAllPublishedSlugs } from "@/lib/blog";

const EXCLUDED = new Set([
  "/sepet", "/teklif-sepeti", "/odeme", "/giris", "/kayit", "/sifremi-unuttum",
  "/hesabim", "/admin",
]);

export default async function sitemap() {
  const serviceRoutes = serviceSlugs.map((slug) => `/cozumler/${slug}`);
  const hotelioModuleRoutes = hotelioModules.map((m) => `/hotelio/moduller/${m.slug}`);
  const productSlugs = await getAllProductSlugs();
  const productRoutes = productSlugs.map((slug) => `/urunler/${slug}`);
  const categories = await getCategories();
  const categoryRoutes = categories.filter((c) => c.status === "active").map((c) => `/kategori/${c.slug}`);
  const blogSlugs = await getAllPublishedSlugs();
  const blogRoutes = blogSlugs.map((slug) => `/blog/${slug}`);

  const staticRoutes = [
    "/",
    ...mainNavigation.map((item) => item.href),
    ...footerSolutions.map((item) => item.href),
    ...footerCorporate.map((item) => item.href),
    ...footerLegal.map((item) => item.href),
    ...serviceRoutes,
    "/hotelio/moduller",
    ...hotelioModuleRoutes,
    "/teklif-al",
    "/hotelio-demo",
    "/blog",
    "/kullanim-kosullari",
    ...productRoutes,
    ...categoryRoutes,
    ...blogRoutes,
  ];

  const uniqueRoutes = [...new Set(staticRoutes)].filter((route) => !EXCLUDED.has(route));

  return uniqueRoutes.map((route) => ({
    url: `${siteConfig.url}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : route.startsWith("/blog") ? "weekly" : route.startsWith("/urunler") ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/cozumler") ? 0.8 : route.startsWith("/urunler") ? 0.75 : route.startsWith("/blog") ? 0.7 : 0.6,
  }));
}
